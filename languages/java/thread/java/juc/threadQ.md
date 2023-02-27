# 线程池面试题

## 线程池都有哪些参数？

这个问题是很好回答的，只要自己画过流程图，都能说出来，今天使用不同角度写一下每个参数的意义和容易错的点。

* 核心线程
* 最大线程
* 设置队列
* 拒绝策略
* 回收时间限制

## core

核心线程，在接收请求时处理问题核心，当线程小于核心线程时，直接增加线程，一般情况下不会设置很大。

## max

最大数量线程，当队列满的时候创建的最大线程，如果线程满了，处理任务数据还解决不了的话就需要考虑如何丢失任务策略。
而max不要使用Integer.MAX_VALUE。

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}
```

1. xss设置了大小，当线程数量很多的时候也会导致oom;
2. 线程数量很多的时候，队列加锁情况下会导致竞态加剧，参考非公平锁性能比公平锁要高。

## 丢弃任务策略

丢弃策略是为了保护服务可用，来看下redis最新也支持了内存淘汰策略，其实这里一样，都是为了保护服务而创建的，其实这里的淘汰策略和redis目的是一致的。

::: tip
以下内容[参考JavaGuide(Java面试+学习指南)](https://javaguide.cn/database/redis/redis-questions-01.html#%E8%BF%87%E6%9C%9F%E7%9A%84%E6%95%B0%E6%8D%AE%E7%9A%84%E5%88%A0%E9%99%A4%E7%AD%96%E7%95%A5%E4%BA%86%E8%A7%A3%E4%B9%88)
:::

1. volatile-lru（least recently used）：从已设置过期时间的数据集（server.db[i].expires）中挑选最近最少使用的数据淘汰
2. volatile-ttl：从已设置过期时间的数据集（server.db[i].expires）中挑选将要过期的数据淘汰
3. volatile-random：从已设置过期时间的数据集（server.db[i].expires）中任意选择数据淘汰
4. allkeys-lru（least recently used）：当内存不足以容纳新写入数据时，在键空间中，移除最近最少使用的 key（这个是最常用的）
5. allkeys-random：从数据集（server.db[i].dict）中任意选择数据淘汰no-eviction：禁止驱逐数据，也就是说当内存不足以容纳新写入数据时，新写入操作会报错。这个应该没人使用吧！

4.0 版本后增加以下两种：

1. volatile-lfu（least frequently used）：从已设置过期时间的数据集（server.db[i].expires）中挑选最不经常使用的数据淘汰
2. allkeys-lfu（least frequently used）：当内存不足以容纳新写入数据时，在键空间中，移除最不经常使用的 key

## 队列

我们知道线程最主要的作用就是削峰填谷，kafka也是，队列很重要。

1. 考虑如果队列可以无限扩张，一直扩张到无法分配内存，这时候服务会怎么样，会oom；
2. 考虑如果队列可以无限扩展，一直打不满，则就不会扩张到max，削峰填谷的能力被大大削弱。

## 回收时间

资源回收。

## 结论

1. 回收机制
   1. 线程资源回收
   2. 任务策略拒绝
2. 内存管理
   1. 线程数量保证不会oom（xss * count > heap)
   2. 队列不会无限扩张导致oom
3. 削峰填谷
   1. 队列
   2. 处理任务能力，线程数量不可太小，也不可太大
