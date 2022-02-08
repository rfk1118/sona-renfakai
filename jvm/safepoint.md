# safepoint

## vmThread

`vmThread run()`会一直`loop`任务处理任务，也就是处理`Command`，`inner_execute(_next_vm_operation);`支持的命令在`vmOperation.hpp`会有所体现。

```java
Breakpoint reached: vmThread.cpp:429
Stack: 
  VMThread::inner_execute(VM_Operation*) vmThread.cpp:429
  VMThread::loop() vmThread.cpp:496
  VMThread::run() vmThread.cpp:175
  Thread::call_run() thread.cpp:358
  thread_native_entry(Thread*) os_bsd.cpp:575
  _pthread_start 0x00007ff81a3234f4
  thread_start 0x00007ff81a31f00f
```

`vmOperation.hpp`部分展示

```java
#define VM_OPS_DO(template)                       \
  template(None)                                  \
  template(Cleanup)                               \
  template(ThreadDump)                            \
  template(PrintThreads)                          \
  template(FindDeadlocks)                         \
  template(ClearICs)                              \
  template(ForceSafepoint)                        \
  template(ForceAsyncSafepoint)                   \
  template(DeoptimizeFrame)                       \
  template(DeoptimizeAll)                         \
  template(ZombieAll)                             \
  template(Verify)                                \
// 其他忽略，请自行查看
```

线程在一直`loop`时会进行安全点初始化，然后进行自旋转，然后处理`command`，并且在`commad`前后设置了安全点开始和关闭，其逻辑是否执行是根据命令是否需要进行的。

```java
void VMThread::loop() {
  // 如果命令为空异常
  SafepointSynchronize::init(_vm_thread);
  // 设置当前线程到一些操作上
  cleanup_op.set_calling_thread(_vm_thread);
  safepointALot_op.set_calling_thread(_vm_thread);
  
  while (true) {
    // 如果需要被中断
    if (should_terminate()) break;
    // 等待操作
    wait_for_operation();
    if (should_terminate()) break;
    assert(_next_vm_operation != NULL, "Must have one");
    inner_execute(_next_vm_operation);
  }
}

void SafepointSynchronize::init(Thread* vmthread) {
  // 等待barrier
  _wait_barrier = new WaitBarrier(vmthread);
  SafepointTracing::init();
}

// 设置轨迹开始时间
void SafepointTracing::init() {
  _last_safepoint_end_time_ns = os::javaTimeNanos();
}

void VMThread::wait_for_operation() {
  // 创建一个锁这里就是 MonitorLocker ml_op_lock = new MonitorLocker(...)
  MonitorLocker ml_op_lock(VMOperation_lock, Mutex::_no_safepoint_check_flag);
  // 清除之前状态
  // 在第一次调用时，这会清除一个虚拟占位符，我也不太明白这句话是什么意思
  _next_vm_operation = NULL;
  // 通知操作完成，并且唤醒下一个操作可以执行
  ml_op_lock.notify_all();
  // 还是判断状态，如果线程没被中断，一直循环
  while (!should_terminate()) {
    // 必要时销毁线程
    self_destruct_if_needed();
    // 下一个指令为空跳出自旋
    if (_next_vm_operation != NULL) {
      return;
    }
    if (handshake_alot()) {
      {
        MutexUnlocker mul(VMOperation_lock);
        HandshakeALotClosure hal_cl;
        Handshake::execute(&hal_cl);
      }
      if (_next_vm_operation != NULL) {
        return;
      }
    }
    // 在这里会设置周期
    setup_periodic_safepoint_if_needed();
    if (_next_vm_operation != NULL) {
      return;
    }
    // 没发现任何任务需要执行，唤醒后面节点
    ml_op_lock.notify_all();
    // 等待保证安全点间隔
    ml_op_lock.wait(GuaranteedSafepointInterval);
  }
}

static void self_destruct_if_needed() {
  // 销毁的条件
  if ((SelfDestructTimer != 0) && !VMError::is_error_reported() &&
      (os::elapsedTime() > (double)SelfDestructTimer * 60.0)) {
    tty->print_cr("VM self-destructed");
    exit(-1);
  }
}
```

## SafepointSynchronize

### inner_execute

```java
void VMThread::inner_execute(VM_Operation* op) {
  assert(Thread::current()->is_VM_thread(), "Must be the VM thread");

  VM_Operation* prev_vm_operation = NULL;
  if (_cur_vm_operation != NULL) {
    if (!_cur_vm_operation->allow_nested_vm_operations()) {
      fatal("Unexpected nested VM operation %s requested by operation %s",
            op->name(), _cur_vm_operation->name());
    }
    op->set_calling_thread(_cur_vm_operation->calling_thread());
    prev_vm_operation = _cur_vm_operation;
  }

  _cur_vm_operation = op;

  HandleMark hm(VMThread::vm_thread());
  EventMarkVMOperation em("Executing %sVM operation: %s", prev_vm_operation != NULL ? "nested " : "", op->name());

  log_debug(vmthread)("Evaluating %s %s VM operation: %s",
                       prev_vm_operation != NULL ? "nested" : "",
                      _cur_vm_operation->evaluate_at_safepoint() ? "safepoint" : "non-safepoint",
                      _cur_vm_operation->name());
  // 上面是一系列的基础校验
  bool end_safepoint = false;
  bool has_timeout_task = (_timeout_task != nullptr);
  // 在这路使用了一个环绕，类似切面，根据command指令类型判断是否需要开启该切面
  if (_cur_vm_operation->evaluate_at_safepoint() &&
      !SafepointSynchronize::is_at_safepoint()) {
    SafepointSynchronize::begin();
    if (has_timeout_task) {
      _timeout_task->arm(_cur_vm_operation->name());
    }
    end_safepoint = true;
  }

  evaluate_operation(_cur_vm_operation);

  // 安全点关闭
  if (end_safepoint) {
    if (has_timeout_task) {
      _timeout_task->disarm();
    }
    SafepointSynchronize::end();
  }

  _cur_vm_operation = prev_vm_operation;
}

```

### begin

将所有线程向前滚动到安全点。必须由`VMThread`调用。

```java
void SafepointSynchronize::begin() {
  // 必须由 VMThread 调用。
  assert(Thread::current()->is_VM_thread(), "Only VM thread may execute a safepoint");
  EventSafepointBegin begin_event;
  // 根据类型进行归集追踪
  SafepointTracing::begin(VMThread::vm_op_type());
  // 安全点开始
  Universe::heap()->safepoint_synchronize_begin();
  // 通过获取 Threads_lock，我们确保没有线程将要启动或退出。它在 SafepointSynchronize::end() 中再次释放。
  Threads_lock->lock();
  // 获取所有线程数量
  int nof_threads = Threads::number_of_threads();

  _nof_threads_hit_polling_page = 0;
  // 重置活动 JNI 关键线程的计数
  _current_jni_active_count = 0;

  // 设置要等待的线程数
  _waiting_to_block = nof_threads;

  jlong safepoint_limit_time = 0;
  if (SafepointTimeout) {
    // 设置限制时间，以便进行比较，看看这是否花费了太长时间才能完成。
    safepoint_limit_time = SafepointTracing::start_of_safepoint() + (jlong)SafepointTimeoutDelay * (NANOUNITS / MILLIUNITS);
    timeout_error_printed = false;
  }

  EventSafepointStateSynchronization sync_event;
  int initial_running = 0;
  arm_safepoint();
  // 将旋转直到所有线程都安全。
  int iterations = synchronize_threads(safepoint_limit_time, nof_threads, &initial_running);

#ifndef PRODUCT
  if (VerifyCrossModifyFence) {
    JavaThreadIteratorWithHandle jtiwh;
    for (; JavaThread *cur = jtiwh.next(); ) {
      cur->set_requires_cross_modify_fence(true);
    }
  }
#endif
  // 记录状态
  _state = _synchronized;
  OrderAccess::fence();
  ++_safepoint_id;

#ifdef ASSERT
  for (JavaThreadIteratorWithHandle jtiwh; JavaThread *cur = jtiwh.next(); ) {
    assert(cur->was_visited_for_critical_count(_safepoint_counter), "missed a thread");
  }
#endif // ASSERT
  GCLocker::set_jni_lock_count(_current_jni_active_count);

  post_safepoint_synchronize_event(sync_event,
                                   _safepoint_id,
                                   initial_running,
                                   _waiting_to_block, iterations);

  SafepointTracing::synchronized(nof_threads, initial_running, _nof_threads_hit_polling_page);
  EventSafepointCleanup cleanup_event;
  do_cleanup_tasks();
  post_safepoint_cleanup_event(cleanup_event, _safepoint_id);
  post_safepoint_begin_event(begin_event, _safepoint_id, nof_threads, _current_jni_active_count);
  SafepointTracing::cleanup();
}
```

主动式中断的思想是当垃圾收集需要中断线程的时候，不直接对线程操作，仅仅简单地设置一个标志位，对应的代码为`arm_safepoint()`

```c
void SafepointSynchronize::arm_safepoint() {
  // 开始将系统带到安全点的过程。 Java 线程可以处于几种不同的状态，并被不同的机制停止：
  //  1. 运行中断 当执行分支返回字节码解释器检查轮询是否被中断，如果是在 SS::block() 中的块。
  //  2. 在本机代码中运行当从本机代码返回时，Java线程必须检查安全点_state以查看是否必须阻塞。如果 VM 线程在本机中看到 Java 线程，它不会等待该线程阻塞。安全点状态和 Java 线程状态的内存写入和读取顺序至关重要。为了保证内存写入相对于彼此串行化，VM线程发出内存屏障指令
  //  3. 运行编译的代码  如果我们试图到达安全点，编译后的代码会读取设置为错误的本地轮询页面。
  //  4. 阻塞 在安全点操作完成之前，被阻塞的线程将不允许从阻塞状态返回。
  //  5. 如果 Java 线程当前正在 VM 中运行或在状态之间转换，则安全点代码将轮询线程状态，直到线程在尝试转换到新状态或锁定安全点检查监视器时自行阻塞。
 
  // 设置屏障信号
  _wait_barrier->arm(static_cast<int>(_safepoint_counter + 1));

  Atomic::release_store(&_safepoint_counter, _safepoint_counter + 1);

  OrderAccess::storestore(); // Ordered with _safepoint_counter
  _state = _synchronizing;

  OrderAccess::storestore(); // storestore, global state -> local state
  for (JavaThreadIteratorWithHandle jtiwh; JavaThread *cur = jtiwh.next(); ) {
    // Make sure the threads start polling, it is time to yield.
    SafepointMechanism::arm_local_poll(cur);
  }
  OrderAccess::fence(); // storestore|storeload, global state -> local state
}
```

等待所有线程都在安全点，代码可以查看`synchronize_threads(safepoint_limit_time, nof_threads, &initial_running)`

```c
int SafepointSynchronize::synchronize_threads(jlong safepoint_limit_time, int nof_threads, int* initial_running)
{
  JavaThreadIteratorWithHandle jtiwh;
#ifdef ASSERT
  for (; JavaThread *cur = jtiwh.next(); ) {
    assert(cur->safepoint_state()->is_running(), "Illegal initial state");
  }
  jtiwh.rewind();
#endif // ASSERT
  // 如果没有线程仍在运行，我们已经完成了。
  int still_running = nof_threads;
  ThreadSafepointState *tss_head = NULL;
  ThreadSafepointState **p_prev = &tss_head;
  for (; JavaThread *cur = jtiwh.next(); ) {
    ThreadSafepointState *cur_tss = cur->safepoint_state();
    assert(cur_tss->get_next() == NULL, "Must be NULL");
    if (thread_not_running(cur_tss)) {
      --still_running;
    } else {
      *p_prev = cur_tss;
      p_prev = cur_tss->next_ptr();
    }
  }
  *p_prev = NULL;
  DEBUG_ONLY(assert_list_is_valid(tss_head, still_running);)
  *initial_running = still_running;
  // 如果没有线程仍在运行，我们已经完成了
  if (still_running <= 0) {
    assert(tss_head == NULL, "Must be empty");
    return 1;
  }

  // 迭代了多少次
  int iterations = 1; // The first iteration is above.
  int64_t start_time = os::javaTimeNanos();
  do {
    if (SafepointTimeout && safepoint_limit_time < os::javaTimeNanos()) {
      print_safepoint_timeout();
    }
    p_prev = &tss_head;
    ThreadSafepointState *cur_tss = tss_head;
    while (cur_tss != NULL) {
      assert(cur_tss->is_running(), "Illegal initial state");
      if (thread_not_running(cur_tss)) {
        --still_running;
        *p_prev = NULL;
        ThreadSafepointState *tmp = cur_tss;
        cur_tss = cur_tss->get_next();
        tmp->set_next(NULL);
      } else {
        *p_prev = cur_tss;
        p_prev = cur_tss->next_ptr();
        cur_tss = cur_tss->get_next();
      }
    }
    DEBUG_ONLY(assert_list_is_valid(tss_head, still_running);)
    if (still_running > 0) {
      back_off(start_time);
    }
    iterations++;
  // 如果运行线程大于0，一直loop
  } while (still_running > 0);
  assert(tss_head == NULL, "Must be empty");
  return iterations;
}
```

### end

重新启动所有挂起的线程

```C
void SafepointSynchronize::end() {
  // 必须由 VMThread 调用。
  assert(Threads_lock->owned_by_self(), "must hold Threads_lock");
  EventSafepointEnd event;
  assert(Thread::current()->is_VM_thread(), "Only VM thread can execute a safepoint");

  disarm_safepoint();

  Universe::heap()->safepoint_synchronize_end();

  SafepointTracing::end();
  // 发送安全点结束事件
  post_safepoint_end_event(event, safepoint_id());
}

void SafepointSynchronize::disarm_safepoint() {
  uint64_t active_safepoint_counter = _safepoint_counter;
  {
    JavaThreadIteratorWithHandle jtiwh;
#ifdef ASSERT
    for (; JavaThread *cur = jtiwh.next(); ) {
      assert (!(cur->has_pending_exception() &&
                cur->safepoint_state()->is_at_poll_safepoint()),
              "safepoint installed a pending exception");
    }
#endif // ASSERT
    OrderAccess::fence(); // keep read and write of _state from floating up
    assert(_state == _synchronized, "must be synchronized before ending safepoint synchronization");

    // Change state first to _not_synchronized.
    // No threads should see _synchronized when running.
    _state = _not_synchronized;

    // Set the next dormant (even) safepoint id.
    assert((_safepoint_counter & 0x1) == 1, "must be odd");
    Atomic::release_store(&_safepoint_counter, _safepoint_counter + 1);

    OrderAccess::fence(); // Keep the local state from floating up.

    jtiwh.rewind();
    for (; JavaThread *current = jtiwh.next(); ) {
      // Clear the visited flag to ensure that the critical counts are collected properly.
      DEBUG_ONLY(current->reset_visited_for_critical_count(active_safepoint_counter);)
      ThreadSafepointState* cur_state = current->safepoint_state();
      assert(!cur_state->is_running(), "Thread not suspended at safepoint");
      cur_state->restart(); // TSS _running
      assert(cur_state->is_running(), "safepoint state has not been reset");
    }
  } // ~JavaThreadIteratorWithHandle

  // 释放线程锁，这样线程就可以被再次创建销毁
  Threads_lock->unlock();

  // 在安全点的线程被唤醒
  _wait_barrier->disarm();
}
```

## 总结

安全点开启使用了锁机制，开启后设置标记位，等待线程进入安全点。
