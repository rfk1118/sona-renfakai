# DI概念

`DI` 依赖反转是一种思想，无论 `is-a` 、 `has-a` 都会使用面向接口编程，接口实现后续如果有替换，如果没有 `DI` ，每次变更都需要修改多处代码，所以DI重要性就显得极其重要。

了解 `DI` 需要了解 `bean` 的生命周期，构造器注入、填充属性也就是 `DI` 依赖注入，在依赖注入时需要对对象进行查找，所以在设计时需要 `Context` 查找特定的 `bean` 。

## 为什么要有DI

如果没有 `DI` ，项目中在特定的位置就会出现下面的代码，后续需要修改默认策略怎么办？改代码。

```java
// 这里需要改
private static final RejectedExecutionHandler defaultHandler =
        new AbortPolicy();
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory) {
    this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
          // 这里需要改defaultHandler
          threadFactory, defaultHandler);
}
```

如果代码在项目中被引用的位置很多怎么办？向 `Spring` 学习，不直接 `new` ，而是封装到一个方法中，修改范围更小。其实我们使用日志文件门面 `SLF4J` 也是相同原理，做到可插拔。

```java
public static <K, V> HashMap<K, V> newHashMap(int expectedSize) {
    return new HashMap<>((int) (expectedSize / DEFAULT_LOAD_FACTOR), DEFAULT_LOAD_FACTOR);
}
```
<!-- ## 常用组件

* Core 核心包
* Beans
* Context
* Expression
* Context Support -->
## DI核心理论

1. [Bean填充属性](./di.md)，也就是DI核心基础，DI前置条件是里氏替换；
2. Bean在多线程下是否有副作用，这里引申出bean的作用域；
3. 元信息标签；
   1. xml
   2. 注解
   3. [接口](./initialize-bean.md)
   4. 泛型
