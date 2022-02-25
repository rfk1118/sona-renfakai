# ExecutionPolicy

拒绝执行处理程序，从 `RejectedExecutionHandler` 实现子类命名 `Policy` 可以看出这里是策略设计模式，这也是我最喜欢设计模式之一

## 接口和实现

### 接口

```java
// 无法由ThreadPoolExecutor执行的任务的处理程序
public interface RejectedExecutionHandler {

    // 当execute无法接受任务时，可能由ThreadPoolExecutor调用的方法。这可能在没有更多线程或队列槽可用时发生，
    // 因为它们的界限将被超出，或者在 Executor 关闭时。在没有其他替代方案的情况下，该方法可能会抛出未经检查的RejectedExecutionException
    // 该RejectedExecutionException将传播给execute的调用者。
    void rejectedExecution(Runnable r, ThreadPoolExecutor executor);
}
```

### 实现

现在实现主要默认提供了4种策略，具体如下：

* `CallerRunsPolicy`，调用者运行策略

```java
public static class CallerRunsPolicy implements RejectedExecutionHandler {

    public CallerRunsPolicy() { }

    // 谁调用，谁来做处理，也就是运行在调用线程种
    public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
        if (!e.isShutdown()) {
            r.run();
        }
    }
}
```

* `AbortPolicy`终止策略，丢出异常

```java
public static class AbortPolicy implements RejectedExecutionHandler {

    public AbortPolicy() { }

    // 直接丢出拒绝异常
    public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
        throw new RejectedExecutionException("Task " + r.toString() +
                                              " rejected from " +
                                              e.toString());
    }
}
```

* `DiscardPolicy`，直接丢弃任务，而且无任何通知行为，其实和吞异常丢失异常现场性质一样

```java
public static class DiscardPolicy implements RejectedExecutionHandler {

    public DiscardPolicy() { }

    public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
      // 吞掉
    }
}
```

* `DiscardOldestPolicy`丢弃最旧的策略，从队列中丢弃最旧的，其实和上面`DiscardPolicy`形成对比，一个是丢弃最新的，一个是丢弃最旧的。

```java
public static class DiscardOldestPolicy implements RejectedExecutionHandler {
    public DiscardOldestPolicy() { }

    public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
        if (!e.isShutdown()) {
            // 推出最老的，将新的在塞进去
            e.getQueue().poll();
            e.execute(r);
        }
    }
}
```

## 总结

* 策略设计模式就是多态，例如`List<String> arrayList = new ArrayList<>();  List<String> linked = new LinkedList<>();`在执行`List.add("");`时候，会根据底层算法不同进行不同处理
* 构造线程池时可以传递执行策略，这样就支持自定义编写策略，降低耦合，支持扩展性

```java
RejectedExecutionHandler stdOutPolicy = (r, executor) -> System.err.println(r);
final ThreadPoolExecutor customThreadPoolExecutor = new ThreadPoolExecutor(10, 10, 10, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>(), Executors.defaultThreadFactory(), stdOutPolicy);
```
