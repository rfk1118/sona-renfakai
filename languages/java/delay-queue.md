# 锁局部变量

为什么 Doug Lea 喜欢将不可变锁引用放到局部变量表中?

## 源码

本文章使用 `java.util.concurrent.DelayQueue` 为例

```java
public class DelayQueue<E extends Delayed> extends AbstractQueue<E>
  implements BlockingQueue<E> {

  private final transient ReentrantLock lock = new ReentrantLock();
  private final PriorityQueue<E> q = new PriorityQueue<E>();
  // 其他代码暂时忽略......
  // 仅仅这一段代码进行展示
  public int size() {
    // 成员变量内存地址存到局部变量表中
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        return q.size();
    } finally {
        lock.unlock();
    }
  }
}
```

## 字节码优化

1. 编写 demo，减少字节码指令集，查看起来会简单一些

```java
public class Queue {

    private final transient ReentrantLock rt = new ReentrantLock();

    public void t() {
        rt.lock();
        try {
            System.out.println(1);
        } finally {
            rt.unlock();
        }
    }
}
```

2. 使用编译器进行编译，查看未优化之前字节码。

```java
// 编译class
// javac Queue.java
// 查看字节码
// javap -p -v Queue
public void t();
descriptor: ()V
flags: ACC_PUBLIC
Code:
  stack=2, locals=2, args_size=1
    0: aload_0
    1: getfield      #4                  // Field rt:Ljava/util/concurrent/locks/ReentrantLock;
    4: invokevirtual #5                  // Method java/util/concurrent/locks/ReentrantLock.lock:()V
    7: getstatic     #6                  // Field java/lang/System.out:Ljava/io/PrintStream;
    10: iconst_1
    11: invokevirtual #7                  // Method java/io/PrintStream.println:(I)V
    14: aload_0
    15: getfield      #4                  // Field rt:Ljava/util/concurrent/locks/ReentrantLock;
    18: invokevirtual #8                  // Method java/util/concurrent/locks/ReentrantLock.unlock:()V
    21: goto          34
    24: astore_1
    25: aload_0
    26: getfield      #4                  // Field rt:Ljava/util/concurrent/locks/ReentrantLock;
    29: invokevirtual #8                  // Method java/util/concurrent/locks/ReentrantLock.unlock:()V
    32: aload_1
    33: athrow
    34: return
  Exception table:
    from    to  target type
        7    14    24   any
  LineNumberTable:
    line 15: 0
    line 17: 7
    line 19: 14
    line 20: 21
    line 19: 24
    line 20: 32
    line 21: 34
  StackMapTable: number_of_entries = 2
    frame_type = 88 /* same_locals_1_stack_item */
      stack = [ class java/lang/Throwable ]
    frame_type = 9 /* same */
```

3. 从字节码可以看到每次获取锁的时候，都先从局部变量表里面获取` index=0 的 this `推入栈后，在获取锁，内容如下

```java
  0: aload_0
  1: getfield      #4                  // Field rt:Ljava/util/concurrent/locks/ReentrantLock;
```

4. 修改代码，进行指令集优化

```java
public class Queue {

  private final transient ReentrantLock r = new ReentrantLock();

  public void t() {
      ReentrantLock rt = r;
      rt.lock();
      try {
          System.out.println(1);
      } finally {
          rt.unlock();
      }
  }
}
```

5. 编译和反编译查看字节码

```java
public void t();
  descriptor: ()V
  flags: ACC_PUBLIC
  Code:
    stack=2, locals=3, args_size=1
        0: aload_0
        1: getfield      #4                  // Field r:Ljava/util/concurrent/locks/ReentrantLock;
        4: astore_1
        // 获取到锁
        5: aload_1
        // 将锁放到index = 1  局部变量表 locals
        6: invokevirtual #5                  // Method java/util/concurrent/locks/ReentrantLock.lock:()V
        9: getstatic     #6                  // Field java/lang/System.out:Ljava/io/PrintStream;
      12: iconst_1
      13: invokevirtual #7                  // Method java/io/PrintStream.println:(I)V
      16: aload_1
      17: invokevirtual #8                  // Method java/util/concurrent/locks/ReentrantLock.unlock:()V
      20: goto          30
      23: astore_2
      24: aload_1
      25: invokevirtual #8                  // Method java/util/concurrent/locks/ReentrantLock.unlock:()V
      28: aload_2
      29: athrow
      30: return
    Exception table:
        from    to  target type
            9    16    23   any
    LineNumberTable:
      line 14: 0
      line 15: 5
      line 17: 9
      line 19: 16
      line 20: 20
      line 19: 23
      line 20: 28
      line 21: 30
    StackMapTable: number_of_entries = 2
      frame_type = 255 /* full_frame */
        offset_delta = 23
        // index = 1 这里放了锁
        locals = [ class com/example/zk/Queue, class java/util/concurrent/locks/ReentrantLock ]
        stack = [ class java/lang/Throwable ]
      frame_type = 6 /* same */
```

6. 这里发现指令集发生了变化，每次获取锁的时候都使用 `aload_1`从局部变量表里面获取，这里是 Doug lea 对指令集的优化。
::: tip 提示
`HiKariCP` 也是靠字节码优化提升速度的, 可自行查看源码。
:::

```java
  0: aload_0
  1: getfield      #4                  // Field r:Ljava/util/concurrent/locks/ReentrantLock;
  4: astore_1
  // 获取到锁
  5: aload_1
```

7. `locals` 的变化，多占用了一个局部变量表。

```java
  // 优化前
  stack=2, locals=3, args_size=1
  // 优化后
  stack=2, locals=2, args_size=1
```

### 猜想

#### 为何 Doug Lea 会将锁在方法体内写为 final，而数据却未写为 final？

```java
  // 这里为什么会是final
  final ReentrantLock lock = this.lock;
  lock.lock();
  try {
      // 这里的q也是final的，为啥不放到局部变量表中
      return q.size();
  } finally {
      lock.unlock();
  }
```

* 局部变量表重复利用问题，可以参考深入理解虚拟机或[JVM Anatomy Quark #8()](https://shipilev.net/jvm/anatomy-quarks/8-local-var-reachability/)
Google 查到如果局部变量为 final, 权限变成了 ReadOnly access, 为了防止局部向量嘈被重复利用问题。

* 为何这里`private final PriorityQueue<E> q = new PriorityQueue<E>();` 也是 final 为啥不在局部变量也命名为 final, 原因`PriorityQueue`不可变，但是其底层数据 `transient Object[] queue` 在扩容时候会变地址(数组特性)。

```java
// 对象地址不会变，但是内部数据汇编
public class PriorityQueue<E> extends AbstractQueue<E>
  implements java.io.Serializable {

  private static final long serialVersionUID = -7720805057305804111L;

  private static final int DEFAULT_INITIAL_CAPACITY = 11;

  // 这里内存地址会变
  transient Object[] queue; // non-private to simplify nested class access
}

// 内部数据不会变
public class ReentrantLock implements Lock, java.io.Serializable {
  private static final long serialVersionUID = 7373984872572414699L;
  // 不会改变内存地址
  private final Sync sync;
}
```

* ~~从这里猜，使用了 final 可能会减少线程缓存数据和主内存数据比较及拉取主内存数据到线程缓存中，也就是经典的内存模型。~~
* 《深入理解虚拟机》P365 中对下面两段代码进行了分析，并推断 final 对局部变量在运行期没影响。

```java
// 方法1带有final修饰
public void  foo(final int arg){
  final int var = 0;
  // do something
}
// 方法2没有final修饰
public void foo(int arg){
  int var = 0;
  // do something
}
```

## 版权

著作权归作者所有，商业转载请联系作者获得授权，非商业转载请注明出处。
