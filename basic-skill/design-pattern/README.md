# 设计模式

## 如何学习设计模式

学习设计模式时需要有两个动作：使用设计模式、阅读源码。

::: tip 提示
六大原则请参考[敏捷软件开发](https://book.douban.com/subject/1140457/)
:::

### 使用设计模式

设计模式要在项目中常用(《刻意练习：如何从新手到大师》)，才能体会到各个模式的好坏，才能在合适的场景下将不同的设计模式组合起来，但是也不要为了设计而设计，这里有一个度，只有真正的把握了，才会不过度设计。如果过度设计了，需要及时修正，就像`ConcurrentHashMap`在`JDK1.8`之前、之后版本实现有所修正一样。

### 阅读源码

很多源码使用的设计模式都不是标准格式，是在原基础上产生了变种，所以懂了设计模式，在看源码会产生事半功倍的效果。

## 设计模式连接

### 创建型模式

* Factory
* Abstract Factory
* Builder
* Prototype
* Singleton

### 结构型模式

* Adapter
* Bridge
* Composite
* Decorator
* Facade
* Flyweight
* Proxy

### 行为模式

* Chain of Responsibility
* Command
* Iterator
* Mediator
* Memento
* Observer
* State
* Strategy
* Template Method
* Visitor

### 组合篇

先写完基础知识和简单应用，这里补充组合应用。

## 推荐书籍

* [设计模式](https://book.douban.com/subject/1052241/)
本书以`C++`编写，被别人誉为经典，其实本人读的不多。
* [敏捷软件开发](https://book.douban.com/subject/1140457/)
本书给了大量`Demo`，本人设计模式主要是从这本书中学习而来的。
* [架构整洁之道](https://book.douban.com/subject/30333919/)
本书与《敏捷软件开发》中有部分重叠，会有一些设计模式应用补充，比如三方对接使用适配器模式开发，其核心还是架构设计思想。
* [Dive Into DESIGN PATTERNS](.)
本书案例比较好，后面文章以此为基础进行二次梳理，如有侵权，请邮件`rfk1118@icloud.com`联系到我，我会按照版权进行删除。书籍请自行查找
* [设计模式之美](https://time.geekbang.org/column/intro/100039001)
前Google工程师手把手教你写高质量代码，这个讲的也不错，我印象最深的是接口隔离。
* [实现领域驱动设计](https://book.douban.com/subject/25844633/)
* [领域驱动设计](https://book.douban.com/subject/26819666/)
设计模式后面就是领域驱动开发，用设计模式+领域驱动开发可以让项目更好维护，可以降低设计的复杂度，才能真正的将DDD进行落地，空谈DDD其实很空洞。
