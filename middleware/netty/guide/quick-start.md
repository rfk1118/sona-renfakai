# 参考资料

## 如何利用材料

* [如何阅读一本书](https://book.douban.com/subject/1013208/)为什么推荐的第一本书不是技术类的书，而是《如何阅读一本书》，主要包含以下几点：
  1. 本书教会我如何进行科学阅读
  2. 科学阅读方式可以事半功倍，节省大量精力，节省下的精力可以去提升生命价值
  3. `Netty` 源码阅读需要大量基础知识，对于此类阅读，需要主题阅读，不可窥一斑而知全貌

## 网络编程

* [Scalable IO in Java](https://github.com/sona0402/sona-renfakai/blob/master/netty/doug-lea/nio.pdf)  or
[Doug lea 资源文件地址](http://gee.cs.oswego.edu)
  1. 材料是 `NIO Reactor模型` 基础理论，也是 `Netty、Undertow、Tomcat、Jetty` 等设计基石
  2. `Netty、Undertow、Tomcat、Jetty`代码差异性为项目落地和实践者代码品味的差异
* [Netty 实战](https://book.douban.com/subject/27038538/)
  1. 作者[norman maurer](https://github.com/normanmaurer)是`Netty`项目的主要贡献者
  2. 整本书以 `demo` 和使用案例为主，其设计理论讲解很精准
  3. 本人在最初学习`Netty`时因看不明白其设计，所以对着书籍抄了一边[代码](https://github.com/sona0402/netty)，抄代码也是一种快速学习方式
* [深入理解计算机系统（原书第 3 版）](https://book.douban.com/subject/26912767/)
  1. 深入学习时，思考网络链接是怎么传递到子线程的?
  2. `ServerSocket` 和 `Socket` 有什么不同？
  3. 查看本书最后 3 章，看到 `listenfd` 和 `connfd` 时，问题 1 和 2 豁然开朗。
* [UNIX 环境高级编程](https://book.douban.com/subject/1788421/)
* [UNIX 网络编程 卷 1：套接字联网 API（第 3 版)](https://book.douban.com/subject/4859464/)
  1. 两本书主要是对 IO 和 NIO 进阶，更好地理解底层调用
  2. 时间精力不多的话，读完《深入理解计算机系统（原书第 3 版）》可以了
* [Netty 源码剖析与实战](https://time.geekbang.org/course/intro/100036701)
  1. `Netty` 主干线和源码进行解析
* [Netty 源码](https://github.com/netty/netty)

## 多线程

* [Java多线程编程实战指南](https://book.douban.com/subject/27034721/)
* [Java 并发编程的艺术](https://book.douban.com/subject/26591326/)
* [Java 并发编程实战](https://book.douban.com/subject/10484692/)

## 设计模式

* [敏捷软件开发](https://book.douban.com/subject/1140457/)
* [设计模式之美](https://time.geekbang.org/column/intro/250)
* [实现领域驱动设计](https://book.douban.com/subject/25844633/)
* [design-patterns](https://refactoringguru.cn/design-patterns/catalog)

## 网络

* [《计算机网络》 谢希仁](https://book.douban.com/subject/2970300/)
* [TCP/IP 详解 卷 1：协议](https://book.douban.com/subject/1088054/)
