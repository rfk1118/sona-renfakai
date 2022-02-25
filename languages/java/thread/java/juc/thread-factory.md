# ThreadFactory

按需创建新线程的对象。 使用线程工厂消除了对`new Thread`调用的直接生成，使应用程序能够使用特殊的线程子类、优先级等。

这个接口最简单的实现就是：

```java
class SimpleThreadFactory implements ThreadFactory {
  public Thread newThread(Runnable r) {
      return new Thread(r);
  }
}
```

## 接口

```java
public interface ThreadFactory {

    // 构造一个新的Thread实现还可以初始化优先级、名称、守护进程状态、ThreadGroup等。
    Thread newThread(Runnable r);
}
```

### 实现

```java
static class DefaultThreadFactory implements ThreadFactory {
    private static final AtomicInteger poolNumber = new AtomicInteger(1);
    private final ThreadGroup group;
    private final AtomicInteger threadNumber = new AtomicInteger(1);
    // 线程名称前缀
    private final String namePrefix;

    DefaultThreadFactory() {
        SecurityManager s = System.getSecurityManager();
        group = (s != null) ? s.getThreadGroup() :
                              Thread.currentThread().getThreadGroup();
        namePrefix = "pool-" +
                      poolNumber.getAndIncrement() +
                      "-thread-";
    }

    public Thread newThread(Runnable r) {

        // 设置group
        Thread t = new Thread(group, r,
                              namePrefix + threadNumber.getAndIncrement(),
                              0);
        // 守护
        if (t.isDaemon())
            t.setDaemon(false);
        // 初始化优先级
        if (t.getPriority() != Thread.NORM_PRIORITY)
            t.setPriority(Thread.NORM_PRIORITY);
        return t;
    }
}
```

编写一段代码，进行测试，从测试结果中可以看出线程名称为`pool-1-thread-1`，优先级为5

```java
"pool-1-thread-1" #11 prio=5 os_prio=31 tid=0x00007fb7f70c3000 nid=0xa327 waiting on condition [0x00000003076ee000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for  <0x000000076ac3aaf8> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
        at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2039)
        at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
        at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1074)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1134)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
        at java.lang.Thread.run(Thread.java:748)
```

## 总结

使用工厂模式创建出线程，并为其设定初始化优先级、名称、守护进程状态、`ThreadGroup`等，服务端屏蔽创建细节，减少客户端代码
