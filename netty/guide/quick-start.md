# 参考资料

### 如何利用材料

* [如何阅读一本书](https://book.douban.com/subject/1013208/)

为什么推荐的第一本书不是技术类的书，而是《如何阅读一本书》，本书对如何阅读讲得很好，Netty 源码阅读需要大量基础知识，对于此类阅读，需要主题阅读，不可窥一斑而知全貌。

### 网络编程

* [Scalable IO in Java](https://github.com/sona0402/sona-renfakai/blob/master/netty/doug-lea/nio.pdf)

[Doug lea 资源文件地址](http://gee.cs.oswego.edu)

* [Netty 实战](https://book.douban.com/subject/27038538/)

整本书以 demo 和使用案例为基础，学习时看不明白 Netty，所以对着书籍抄了一边[代码](https://github.com/sona0402/netty)

* [深入理解计算机系统（原书第 3 版）](https://book.douban.com/subject/26912767/)

在深入学习时候，思考网络链接是怎么传递到子线程的? `ServerSocket` 和 `Socket` 有什么不同？在查看本书最后 3 章，当看到 `listenfd` 和 `connfd` 时，瞬间豁然开朗。

* [UNIX 环境高级编程](https://book.douban.com/subject/1788421/)
* [UNIX 网络编程 卷 1：套接字联网 API（第 3 版)](https://book.douban.com/subject/4859464/)

两本书主要是对 IO 和 NIO 进阶，可以更好地理解底层调用，如果时间不多的话，读完《深入理解计算机系统（原书第 3 版）》就可以了。

* [Netty 源码剖析与实战](https://time.geekbang.org/course/intro/100036701)

对 Netty 主干线和源码进行解析。

* [尚硅谷 Netty 教程（B 站最火，人气最高，好评如潮）](https://www.bilibili.com/video/BV1DJ411m7NR?from=search&seid=8064428655909716216)

整体设计和源码进行解析。

* [淦！真的有大佬能把 Netty 底层源码讲的这么清楚~~从前置知识：NIO/EPOILL 一直学到 Netty](https://www.bilibili.com/video/BV1SK4y1K7a3?from=search&seid=8064428655909716216)

使用 `Strace` 命令对底层 IO 进行追踪，对《UNIX 环境高级编程》和《UNIX 网络编程卷 1：套接字联网 API（第 3 版)》中的 `bind() listen() accept()` 函数进行追踪，讲知识串起来。

* [Netty 源码](https://github.com/netty/netty)

### 多线程

* [Java 并发编程的艺术](https://book.douban.com/subject/26591326/)
* [Java 并发编程实战](https://book.douban.com/subject/10484692/)

### 设计模式

* [敏捷软件开发](https://book.douban.com/subject/1140457/)
* [设计模式之美](https://time.geekbang.org/column/intro/250)
* [实现领域驱动设计](https://book.douban.com/subject/25844633/)

### 网络

* [《计算机网络》 谢希仁](https://book.douban.com/subject/2970300/)
* [TCP/IP 详解 卷 1：协议](https://book.douban.com/subject/1088054/)
