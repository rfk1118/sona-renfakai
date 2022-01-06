# LockSupport

在 `JSR166` 之前，没有 `Java API` 可用于阻塞和解除阻塞线程以创建不基于内置监视器的同步器。唯一的候选对象是 `Thread.suspend` 和 `Thread.resume`，它们无法使用，因为它们遇到了无法解决的竞争问题：如果解除阻塞的线程在阻塞线程执行 `suspend`之前调用了 `resume`，则恢复操作将无效。

`java.util.concurrent.locks` 包包含一个 `LockSupport` 类，其中包含解决此问题的方法。方法 `LockSupport.park` 阻塞当前线程，除非或直到发出 `LockSupport.unpark`。 （也允许虚假唤醒。）取消驻留的呼叫不“计数”，因此在驻留之前多次取消驻留只会解除对单个驻留的阻塞。此外，这适用于每个线程，而不是每个同步器。由于先前使用的“剩余” unpark，在新同步器上调用 park 的线程可能会立即返回。然而，在没有 unpark 的情况下，它的下一次调用将被阻塞。虽然可以明确清除此状态，但这样做是不值得的。在需要时多次调用 park 会更有效率。

## 概念

* park进行线程阻塞
* unpark解除线程阻塞

## 代码

```java
public class LockSupport {
    private LockSupport() {} // Cannot be instantiated.
    // 其他代码请自行查看
    // cas的一些属性
    // Hotspot implementation via intrinsics API
    private static final sun.misc.Unsafe UNSAFE;
    private static final long parkBlockerOffset;
    private static final long SEED;
    private static final long PROBE;
    private static final long SECONDARY;
    static {
        try {
            UNSAFE = sun.misc.Unsafe.getUnsafe();
            Class<?> tk = Thread.class;
            parkBlockerOffset = UNSAFE.objectFieldOffset
                (tk.getDeclaredField("parkBlocker"));
            SEED = UNSAFE.objectFieldOffset
                (tk.getDeclaredField("threadLocalRandomSeed"));
            PROBE = UNSAFE.objectFieldOffset
                (tk.getDeclaredField("threadLocalRandomProbe"));
            SECONDARY = UNSAFE.objectFieldOffset
                (tk.getDeclaredField("threadLocalRandomSecondarySeed"));
        } catch (Exception ex) { throw new Error(ex); }
    }

}

```

## 代码解释

从这个工具类来看，其底层依然调用的是unsafe类，核心调用有`putObject，unpark，park，getInt，objectFieldOffset`，我们主要看前3个

### park(Object blocker)

```java
/* 非许可可用，否则出于线程调度目的禁用当前线程。如果许可可用，则它被消耗并且调用立即返回；否则，当前线程会因线程调度目的而被禁用并处于休眠状态，直到发生以下三种情况之一： 某个其他线程以当前线程为目标调用 unpark；或其他一些线程中断当前线程；或 虚假调用（即无缘无故）返回。此方法不报告其中哪些导致方法返回。调用者应该首先重新检查导致线程停放的条件。例如，调用者还可以确定线程在返回时的中断状态。参数：阻塞器——负责这个线程停放的同步对象从：1.6 */
public static void park(Object blocker) {
    Thread t = Thread.currentThread();
    setBlocker(t, blocker);
    UNSAFE.park(false, 0L);
    setBlocker(t, null);
}

private static void setBlocker(Thread t, Object arg) {
    // Even though volatile, hotspot doesn't need a write barrier here.
    UNSAFE.putObject(t, parkBlockerOffset, arg);
}

// 在Thread类里面可以找到volatile Object parkBlocker;这样的一个属性值
public native void putObject(Object o, long offset, Object x);

// 阻塞当前线程
public native void park(boolean isAbsolute, long time);
```

### unpark(Thread thread)

```java
public static void unpark(Thread thread) {
    if (thread != null)
        UNSAFE.unpark(thread);
}
// 进行线程非阻塞
public native void unpark(Object thread);
```

## 总结

`JSR166`之后提供了新的`API`支持线程线程阻塞和非阻塞，对应了aqs设计文档中的`Blocking and unblocking threads`，从这里也学到了unsafe的第二个特性，支持线程阻塞非阻塞。
