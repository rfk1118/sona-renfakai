# 多线程编程

## aqs

aqs设计理念推荐看[文档](http://gee.cs.oswego.edu/dl/papers/aqs.pdf)，论文中很容易看出设计围绕四个方向(`synchronized、Thread.suspend、等待集、Object.wait、Object.signal`，设计实现细节，推荐看源码。
整体来讲`juc`是把`java`内置锁从底层`jvm`层面拿到代码层面进行优化。

* `cas`修改状态代替`synchronized`的获取
* `LockSupport`代替阻塞
* `clh`锁代替等待集，自旋代替上下文切换
* 条件队列颗粒度优化`Object.wait、signal`

### [synchronize state](./aqs.md)

`synchronize state = synchronized`，`monitorenter、monitorexit`使用状态协议字段替换，例如以下代码：

```java
public class Sy {
    private static final Lock lock = new ReentrantLock();

    void testSynchronized() {
        synchronized (Sy.class) {
            System.out.println("test sy");
        }
    }

    void testLock() {
        lock.lock();
        try {
            System.out.println("test sy");
        } finally {
            lock.unlock();
        }
    }
}
```

代码编译和查看字节码，从字节码可以看出`synchronized`使用`jvm`内置锁，也就是`monitorenter、monitorexit`，而`juc`中的`lock`并没有使用内置锁

```java
javac Sy.java
javap -v Sy

void testSynchronized();
    descriptor: ()V
    flags: (0x0000)
    Code:
      stack=2, locals=3, args_size=1
         0: ldc           #2                  // class com/sona/juc/Sy
         2: dup
         3: astore_1
         // 内置锁进入
         4: monitorenter
         5: getstatic     #3                  // Field java/lang/System.out:Ljava/io/PrintStream;
         8: ldc           #4                  // String test sy
        10: invokevirtual #5                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        13: aload_1
        // 内置锁退出
        14: monitorexit
        15: goto          23
        18: astore_2
        19: aload_1
        // 内置锁退出
        20: monitorexit
        21: aload_2
        22: athrow
        23: return
      Exception table:
         from    to  target type
             5    15    18   any
            18    21    18   any
      LineNumberTable:
        line 10: 0
        line 11: 5
        line 12: 13
        line 13: 23
      StackMapTable: number_of_entries = 2
        frame_type = 255 /* full_frame */
          offset_delta = 18
          locals = [ class com/sona/juc/Sy, class java/lang/Object ]
          stack = [ class java/lang/Throwable ]
        frame_type = 250 /* chop */
          offset_delta = 4

  void testLock();
    descriptor: ()V
    flags: (0x0000)
    Code:
      stack=2, locals=2, args_size=1
         0: getstatic     #6                  // Field lock:Ljava/util/concurrent/locks/Lock;
         3: invokeinterface #7,  1            // InterfaceMethod java/util/concurrent/locks/Lock.lock:()V
         8: getstatic     #3                  // Field java/lang/System.out:Ljava/io/PrintStream;
        11: ldc           #4                  // String test sy
        13: invokevirtual #5                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        16: getstatic     #6                  // Field lock:Ljava/util/concurrent/locks/Lock;
        19: invokeinterface #8,  1            // InterfaceMethod java/util/concurrent/locks/Lock.unlock:()V
        24: goto          38
        27: astore_1
        28: getstatic     #6                  // Field lock:Ljava/util/concurrent/locks/Lock;
        31: invokeinterface #8,  1            // InterfaceMethod java/util/concurrent/locks/Lock.unlock:()V
        36: aload_1
        37: athrow
        38: return
      Exception table:
         from    to  target type
             8    16    27   any
      LineNumberTable:
        line 16: 0
        line 18: 8
        line 20: 16
        line 21: 24
        line 20: 27
        line 21: 36
        line 22: 38
      StackMapTable: number_of_entries = 2
        frame_type = 91 /* same_locals_1_stack_item */
          stack = [ class java/lang/Throwable ]
        frame_type = 10 /* same */

```

`lock`使用`cas`方式更新`aqs`内的一个状态`state`为契约代表锁的获取，释放，详情可以看[aqs](./aqs.md)

### Block

阻塞是代替`Thread.suspend、Thread.resume`，使用是`LockSupport.park、LockSupport.unpark`，详情可以看[LockSupport](./blocking.md)

### clh锁

`clh锁`代替内置等待集，并且每个节点不通信，减少通信带来的复杂程度，使用自旋减少上下文切换。详情可以看[clh](./clh.md)，自旋代码可以查看`AbstractQueuedSynchronizer.acquireQueued`。

### 条件队列

条件队列颗粒度优化`Object.wait、signal`，详情见[condition](./condition.md)

## 应用

如果把`aqs`当作基石，在其基础上构建的应用主要分为两种，一是基于数据的，另外一个是基于任务的

* 基于数据：`BlockingDeque、BlockingQueue`等
* 基于任务：`ThreadPoolExecutor、ScheduledThreadPoolExecutor、ForkJoinPool`等

### 数据类型

关于数据类型应用，可以参考[condition](./condition.md)

### 基于任务

关于数据类型应用，可以参考[PoolExecutor](./)

## 总结

`aqs`构建了底层基石，在此基础上构建了数据类型`Queue`和任务类型应用`PoolExecutor`，如果把`aqs`当作服务端，那么`Queue`和`PoolExecutor`相对而言属于客户端。
