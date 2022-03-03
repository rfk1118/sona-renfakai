# Condition

## 概念

同步器框架提供了一个`ConditionObject`类，提供排他同步并遵循`Lock`接口同步器使用。

```java
public abstract class AbstractQueuedSynchronizer
  // 内部类
  public class ConditionObject implements Condition, java.io.Serializable {

  }
  // 这里会返回
  final ConditionObject newCondition() {
        return new ConditionObject();
  }
}
```

任何数量的条件对象都可以连接到锁对象上，提供经典的监视器式`await、signal、signalAll`操作，包括超时操作，以及一些检查和监测方法。
从下面源码中可以看出，其主要都是提供了`wait、signal`功能，那为什么有了`Object#wait`还要产生`Condition`接口呢？这里的设计主要设计涉及到分组的概念，可以让更细粒度的管理等待条件，可以参考[Objects in Groups](http://gee.cs.oswego.edu/dl/groups/groups.html)，如果没有分组，如果使用`signalAll`就会唤醒所有等待，加剧队列竞争，在分组情况下，会根据类型进不同条件队列，竞争少，性能好。

```java
public interface Condition {

    void await() throws InterruptedException;

    void awaitUninterruptibly();

    long awaitNanos(long nanosTimeout) throws InterruptedException;

    boolean await(long time, TimeUnit unit) throws InterruptedException;

    boolean awaitUntil(Date deadline) throws InterruptedException;

    void signal();

    void signalAll();
}
public class Object {

    @HotSpotIntrinsicCandidate
    public final native void notify();

    @HotSpotIntrinsicCandidate
    public final native void notifyAll();

    public final void wait() throws InterruptedException {
        wait(0L);
    }

    public final native void wait(long timeoutMillis) throws InterruptedException;


    public final void wait(long timeoutMillis, int nanos) throws InterruptedException {
        if (timeoutMillis < 0) {
            throw new IllegalArgumentException("timeoutMillis value is negative");
        }

        if (nanos < 0 || nanos > 999999) {
            throw new IllegalArgumentException(
                                "nanosecond timeout value out of range");
        }
        if (nanos > 0) {
            timeoutMillis++;
        }
        wait(timeoutMillis);
    }
}
```

`ConditionObject`类再次通过修复一些设计决策，使条件能够有效地与其他同步操作集成。此类仅支持`Java`风格的监视器访问规则，其中条件操作仅在拥有条件的锁由当前线程持有时才合法（有关替代方案的讨论，请参阅[4]）。因此，附加到`ReentrantLock`的`ConditionObject`与内置监视器（通过`Object.wait`等）的行为方式相同，仅在方法名称、额外功能和用户可以声明每个锁多个条件的事实方面有所不同。

`ConditionObject`使用与同步器相同的内部队列节点，但将它们维护在单独的条件队列上。信号操作作为从条件队列到锁队列的队列传输来实现，而不必在重新获取锁之前唤醒信令线程。

基本的等待操作是：

```java
create and add new node to condition queue;
release lock;
block until node is on lock queue;
re-acquire lock;
```

唤醒信号操作是：

```java
transfer the first node from condition queue to lock queue;
```

由于这些操作仅在锁定保持时执行，它们可以使用顺序链接队列操作（在节点中使用`nextWaiter`字段）来维护条件队列。传输操作只需从条件队列中取消第一个节点的链接，然后使用CLH插入将其附加到锁定队列中。

实现这些操作的主要复杂功能是处理因超时或`Thread.interrupt`而取消条件等待的问题。大约同时发生的取消和信号会遇到结果符合内置显示器规格的比赛。正如JSR133修订的那样，这些要求，如果中断发生在信号之前，那么等待的方法必须在重新获得锁后抛出中断异常。但是，如果它在信号后中断，则方法必须返回而不抛出异常，但要设置线程中断状态。

为了保持适当的顺序，队列节点状态中的位记录节点是否已经（或正在）传输。信令代码和取消代码都试图比较并设置此状态。如果信号操作丢失此竞态，则会转移队列上的下一个节点（如果有的话）。如果取消失败，它必须中止转让，然后等待锁定重新收购。后一种情况引入了潜在的无界旋转。在节点成功插入锁队列之前，取消的等待无法开始锁重新获取，因此必须旋转等待信令线程执行的CLH队列插入比较和集才能成功。这里很少需要旋转，并使用`Thread.yield`来提供调度提示，即其他线程，最好是做信号的线程，应该运行。虽然这里可以实施一个帮助策略来插入节点，但这种情况太罕见了，无法证明这将带来的额外开销是合理的。在所有其他情况下，这里和其他地方的基本力学不使用自旋或屈服，这在单处理器上保持了合理的性能。

## 案例

本案例从`Condition`接口文档中进行获取，`notFull、notEmpty`进行分组，对不同的线程在不同的队列条件上进行等待和唤醒。其也是`BlockQueue`核心基础概念。

```java
class BoundedBuffer<E> {
  final Lock lock = new ReentrantLock();
  final Condition notFull  = lock.newCondition();
  final Condition notEmpty = lock.newCondition();

  final Object[] items = new Object[100];
  int putptr, takeptr, count;

  public void put(E x) throws InterruptedException {
    lock.lock();
    try {
      // 满了，等待不满时候的唤醒
      while (count == items.length)
        notFull.await();
      items[putptr] = x;
      if (++putptr == items.length) putptr = 0;
      ++count;
      // 唤醒非空队列
      notEmpty.signal();
    } finally {
      lock.unlock();
    }
  }

  public E take() throws InterruptedException {
    lock.lock();
    try {
      while (count == 0)
        // 在非空队列进行等待
        notEmpty.await();
      E x = (E) items[takeptr];
      if (++takeptr == items.length) takeptr = 0;
      --count;
      // 设置成功数据，唤醒非满条件
      notFull.signal();
      return x;
    } finally {
      lock.unlock();
    }
  }
}
```

## awit

<mermaid style="margin-bottom: 0px">
graph LR
    A[创建condition node] --> B[释放锁]
    B --> C[如果处在锁队列阻塞]
    C --> D[重新获取锁]
</mermaid>

核心概念如下：

```java
create and add new node to condition queue;
release lock;
block until node is on lock queue;
re-acquire lock;
```

实际代码：

```java
public final void await() throws InterruptedException {
    // 如果线程已经被中断，丢出中断异常
    if (Thread.interrupted())
        throw new InterruptedException();
    // create and add new node to condition queue
    // 创建一个新节点并且放到条件队列
    Node node = addConditionWaiter();
    int savedState = fullyRelease(node);
    int interruptMode = 0;
    while (!isOnSyncQueue(node)) {
        // 设置阻塞点，观察点
        LockSupport.park(this);
        if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)
            break;
    }
    // 如果自旋成功拿到锁，并且没有跑出中断异常
    // 模式意味着退出等待时重新中断
    if (acquireQueued(node, savedState) && interruptMode != THROW_IE)
        interruptMode = REINTERRUPT;
    // 清楚取消节点
    if (node.nextWaiter != null) // clean up if cancelled
        unlinkCancelledWaiters();
    if (interruptMode != 0)
        // REINTERRUPT
        reportInterruptAfterWait(interruptMode);
}
```

`addConditionWaiter`代码主要是增加新节点到条件队列，并清除非等待节点

```java
private Node addConditionWaiter() {
    Node t = lastWaiter;
    // If lastWaiter is cancelled, clean out.
    // 如果最后一个节点不是等待条件
    if (t != null && t.waitStatus != Node.CONDITION) {
        // 清除取消节点
        unlinkCancelledWaiters();
        t = lastWaiter;
    }
    // 创建新节点
    Node node = new Node(Thread.currentThread(), Node.CONDITION);
    // 如果尾巴为空，整个队列都是空的
    if (t == null)
        firstWaiter = node;
    else
        t.nextWaiter = node;
    // 增加新节点
    lastWaiter = node;
    return node;
}
```

`unlinkCancelledWaiters`清除非等待节点，这里使用了双指针，快指针进行迭代，慢指针保持最后一个未被取消的节点

```java
private void unlinkCancelledWaiters() {
  // 第一个节点
  Node t = firstWaiter;
  // 踪迹
  Node trail = null;
  while (t != null) {
      Node next = t.nextWaiter;
      if (t.waitStatus != Node.CONDITION) {
          t.nextWaiter = null;
          // 主要解决从头开始一直被取消
          if (trail == null)
              firstWaiter = next;
          else
              // 中间节点被取消，使用上一次非的链接到next
              trail.nextWaiter = next;
          // 主要解决从某个节点开始到尾巴一直被取消
          if (next == null)
              lastWaiter = trail;
      }
      else
          // 保留上一次等待条件节点
          trail = t;
      t = next;
  }
}
```

`fullyRelease`主要是一次性释放所有状态，当前线程持有锁，所以全释放，并且支持可重入锁

```java
final int fullyRelease(Node node) {
    boolean failed = true;
    try {
        // 这里使用getState，主要是支持可重入锁
        // 如果不需要支持重入的话那就是release(1)就可以了
        int savedState = getState();
        if (release(savedState)) {
            failed = false;
            return savedState;
        } else {
            throw new IllegalMonitorStateException();
        }
    } finally {
        if (failed)
            node.waitStatus = Node.CANCELLED;
    }
}
```

`isOnSyncQueue`是否在同步队列中

```java
final boolean isOnSyncQueue(Node node) {
    // 如果状态没有变，并且前驱为空，未在同步队列
    if (node.waitStatus == Node.CONDITION || node.prev == null)
        return false;
        // 有后驱肯定在同步队列
    if (node.next != null) // If has successor, it must be on queue
        return true;
    return findNodeFromTail(node);
}
private boolean findNodeFromTail(Node node) {
    // 从后向前迭代
    for (Node p = tail;;) {
        // 如果相等，在队列中
        if (p == node)
            return true;
        // 如果尾巴为空，那么头一定为空，不在队列里面
        // 查找到头，头没有前驱，也就是整个队列不包含该节点
        if (p == null)
            return false;
        p = p.prev;
    }
}
```

`checkInterruptWhileWaiting`判断线程是否在等待时被阻断了，如果没阻断返回0，否则判断阻断类型

```java
private int checkInterruptWhileWaiting(Node node) {
    return Thread.interrupted() ?
        (transferAfterCancelledWait(node) ? THROW_IE : REINTERRUPT) :
        0;
}
// 如有必要，在取消等待后将节点转移到同步队列。 如果线程在发出信号之前被取消，则返回 true。
final boolean transferAfterCancelledWait(Node node) {
    if (compareAndSetWaitStatus(node, Node.CONDITION, 0)) {
        enq(node);
        return true;
    }
    // 如果我们输给了一个signal()，那么在它完成enq()之前我们不能继续。在不完整的传输期间取消既罕见又短暂，所以只需旋转
    while (!isOnSyncQueue(node))
        Thread.yield();
    return false;
}
```

`reportInterruptAfterWait`根据模式处理不同的中断异常

```java
private void reportInterruptAfterWait(int interruptMode)
    throws InterruptedException {
    // 直接丢出异常
    if (interruptMode == THROW_IE)
        throw new InterruptedException();
    else if (interruptMode == REINTERRUPT)
        selfInterrupt();
}
```

## signal

核心概念如下：

```java
transfer the first node from condition queue to lock queue;
```

唤醒的时候主要是将条件队列首节点放到同步队列

```java
public final void signal() {
    // 如果没有持有锁，异常
    if (!isHeldExclusively())
        throw new IllegalMonitorStateException();
    // 条件队列首节点
    Node first = firstWaiter;
    // 不为空的话进行唤醒，如果为空，那就是没有等待
    if (first != null)
        doSignal(first);
}
```

`doSignal`真实唤醒

```java
private void doSignal(Node first) {
    do {
        if ( (firstWaiter = first.nextWaiter) == null)
            lastWaiter = null;
        first.nextWaiter = null;
    } while (!transferForSignal(first) &&
              (first = firstWaiter) != null);
}
final boolean transferForSignal(Node node) {
    // 如果节点不能修改状态，那么该节点已经取消过了
    if (!node.compareAndSetWaitStatus(Node.CONDITION, 0))
        return false;

    // 拼接到队列上并尝试设置前任的waitStatus以指示线程（可能）正在等待。
    // 如果取消或尝试设置 waitStatus 失败，唤醒以重新同步（在这种情况下，waitStatus 可能是暂时且无害的错误）
    Node p = enq(node);
    int ws = p.waitStatus;
    if (ws > 0 || !p.compareAndSetWaitStatus(ws, Node.SIGNAL))
        LockSupport.unpark(node.thread);
    return true;
}
```

## 总结

* 提供颗粒更细的条件队列
* 条件队列大幅度降低了竞争
* `Condition`在`wait、signal`时进行队列转换
* 为`BlockQueue、BlockingDeque`提供了基石
