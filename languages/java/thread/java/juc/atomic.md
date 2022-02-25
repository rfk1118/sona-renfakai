# cas

使用`java.util.concurrent.atomic`包下的`AtomicInteger`探索`cas`，包下代码符合ocp原则，使用`AtomicInteger`进行梳理即可。

| 分组       |                                                                           类 |
| ---------- | ---------------------------------------------------------------------------: |
| 基础数据型 |                                       AtomicInteger AtomicBoolean AtomicLong |
| 数组型     |                    AtomicIntegerArray  AtomicLongArray  AtomicReferenceArray |
| 字段更新器 | AtomicIntegerFieldUpdater AtomicLongFieldUpdater AtomicReferenceFieldUpdater |
| 引用型     |               AtomicReference AtomicMarkableReference AtomicStampedReference |

## 内存布局

查看`AtomicInteger`源码，我们会产生疑惑，`unsafe,valueOffset`是什么东西？

```java
public class AtomicInteger extends Number implements java.io.Serializable {

    // 这个是干什么的呢？不知道
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    // 这又是什么呢？
    private static final long valueOffset;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }

    private volatile int value;
    // 方法暂时忽略
}
```

使用一段代码来解释`unsafe,valueOffset`到底是什么？先引入`pom`文件。

```java
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.9</version>
</dependency>
```

编写代码输出`AtomicInteger`对象内存布局。

```java
public class AtomicIntegerTest {

    public static void main(String[] args) {
        AtomicInteger atomicInteger = new AtomicInteger(0);
        System.out.println(ClassLayout.parseInstance(atomicInteger).toPrintable());
    }
}
```

从输出数据中可以看到`AtomicInteger.value`在对象布局的`OFFSET = 12`处，现在是使用`jol-core`进行打印的，如果我们想在代码中使用`OFFSET`要怎么使用呢？

```java
java.util.concurrent.atomic.AtomicInteger object internals:
 OFFSET  SIZE   TYPE DESCRIPTION                               VALUE
      0     4        (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)
      4     4        (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4        (object header)                           bc 3d 00 f8 (10111100 00111101 00000000 11111000) (-134201924)
     12     4    int AtomicInteger.value                       0
Instance size: 16 bytes
Space losses: 0 bytes internal + 0 bytes external = 0 bytes total
```

`debug`上面代码，从图中看到`valueOffset=12`，与对象内存布局是一样的，所以这个值在初始化时经被设置到`valueOffset`。
![An image](./image/atomicInteger.png)

## 基地址+偏移地址

* [深入理解计算机系统（原书第 3 版）3.9 异质的数据结构](https://book.douban.com/subject/26912767/)

![An image](./image/atom.jpg)

* [汇编语言（第3版）8.6 寻址方式的综合应用](https://book.douban.com/subject/25726019/)
![An image](./image/atom-w1.png)
![An image](./image/atom-w2.png)
![An image](./image/atom-w3.png)
![An image](./image/atom-w4.png)

## 常用方法

`unsafe,valueOffset`困惑已经解开，对象存储为一个基地址，在其`基地址+偏移量`为需要更新值的内存地址，下面看一下常用方法

### unsafe.getAndSetInt

debug代码，发现主要涉及到两个方法调用`getIntVolatile`和`compareAndSwapInt`。

```java
     public final int getAndSetInt(Object var1, long var2, int var4) {
        int var5;
        do {
            var5 = this.getIntVolatile(var1, var2);
        } while(!this.compareAndSwapInt(var1, var2, var5, var4));

        return var5;
    }
```

查看调用的参数，可以看到这里拿到了对象，也就是`基地址`，var2就是偏移地址

![An image](./image/atom-getAndSetInt.png)

`getIntVolatile`方法的形容如下，支持volatile语意和内存地址值获取，也就是可见性，volatile变量读，总是能看到（任意线程）对这个volatile变量最后的写入。代码注释讲解和上面[数据结构布局](./atomic.md#数据结构布局)基本一致，只是对于数组使用`基地址 + 类型 * n`也就是`B + N * S`，可以参考[深入理解计算机系统（原书第 3 版）3.8数组分配和访问](https://book.douban.com/subject/26912767/)

### unsafe.compareAndSwapInt

这个方法调用的是native方法，对于方法的形容是支持原子操作，也就是`cmpxchg`指令

```java
    public final native boolean compareAndSwapInt(Object o,long offset,int expected,int x);
```

## 总结

暂时只讲到了cas相关api，底层是直接操作内存地址，使用`cmpxchg`指令，关于其他unsafe相关功能，等到用到时在进行解释。

## 参考

* [Unsafe](http://hg.openjdk.java.net/jdk7/jdk7/jdk/file/9b8c96f96a0f/src/share/classes/sun/misc/Unsafe.java)
* [深入理解计算机系统（原书第 3 版）](https://book.douban.com/subject/26912767/)
* [汇编语言（第3版）](https://book.douban.com/subject/25726019/)
* [Java多线程编程实战指南（核心篇）](https://book.douban.com/subject/27034721/)
* [Java并发编程的艺术](https://book.douban.com/subject/26591326/)
