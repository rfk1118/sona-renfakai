# 中间件

搭建项目时，按照敏捷规则不到万不得以不要使用中间件，使用中间件会增加代码层面成本（编写、维护）、中间件成本（搭建、维护）。
有些中间件是必不可少的，比如服务器（`Jetty、Undertow、Tomcat`），下面按照必要、非必要对中间件进行梳理。

## 必要

使用`docker compose`部署项目。

### nginx

nginx是工作中常用的中间件，实际工作中前端、后端项目都由专业人员进行开发、部署，大概率不会部署到到一块，就会使用nginx反向代理，需要查看相关内容可以[参考](https://bbs.huaweicloud.com/blogs/298643)。
对于nginx常用功能涉及到三个方向：

1. 代理（正向，反）
2. [负载均衡](https://nginx.org/en/docs/http/load_balancing.html)，Netty也提供了相应[策略](/middleware/netty/nio/selectors/chooser-factory)，举一反三，在需要负载均衡时就有了参考。
::: tip
更多均衡策略可以参考[均衡策略与实现](http://icyfenix.cn/architect-perspective/general-architecture/diversion-system/load-balancing.html)
:::
3. 动静分离，在高并发情况下，需要考虑相关内容，可以参考[周老师的透明多级分流系统](http://icyfenix.cn/architect-perspective/general-architecture/diversion-system/)

### 服务器

服务器一般都支持 `nio` 和`阻塞io`，服务器启动时使用 `nio 模型`。`Netty、Jetty、Undertow、Tomcat`都实现了`Reactor`模型，所以了解`Reactor`模型就等于学会了服务器容器，大公司内部会自定义轻量级Rpc服务器(基于Netty)。

## 非必要

### Redis

`Reactor` 中的 `acceptor` 属于`CPU密集型`，`handler`包含以下三种：`CPU密集型`、`IO 密集型`、`混合型`。
`Redis` 中的 `hanler` 是 `CPU 密集型`，所以设计成单线程就很合理。
对于服务器来讲，一般情况下 `handler` 为 `IO 密集型`、`混合型`，所以使用 `Redis` 是将 `IO 密集型`、`混合型`转换成 `CPU 密集型`，还有一种使用方式就是缓解 `CPU`压力而做缓存。

::: tip 提示
更加详细内容请参考 [周志明《凤凰架构 服务端缓存》](http://icyfenix.cn/architect-perspective/general-architecture/diversion-system/cache-middleware.html)
:::

### MQ

MQ一般起到三个功能：解耦、异步、削峰填谷。

1. 应用系统中调用三方系统，为了防止后面每增加一个三方系统都要修改代码，在解耦合方面 MQ 有点像观察者设计模式；
2. 应用系统中调用三方系统，并不依赖三方系统（耗时长）结果，此时就可以使用 MQ 进行异步；
3. MQ 还可以做到“削峰填谷”的作用，如果全天只有一小段时间出现流量剧增，出现毛刺，就可以使用 MQ 进行应对。juc 内的 `BlockingQueue` 也是一个 MQ，只不过这个`Queue`是基于任务的。

### OSS文件系统

项目开发中需要解决不同系统之间问题，兼容`FreeBSD、Linux、Windows`等问题，使用公有云安全系数比较高，也少了运维成本，但是有些项目是不能访问互联网的，这时需要考虑私有化或存到本地磁盘。
