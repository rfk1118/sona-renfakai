
# Fair

多线程公平锁和非公平锁，代码很简单，但是其涉及到的`Michael-Scott算法`理论知识很经典

## 释放锁

1. `release`释放锁，从这里看主流程为释放锁，唤醒后继

```java
public final boolean release(int arg) {
      // 修改状态，释放锁
      if (tryRelease(arg)) {
          Node h = head;
          if (h != null && h.waitStatus != 0)
              // 唤醒后继
              unparkSuccessor(h);
          return true;
      }
      return false;
  }
```

1. `tryRelease`，锁释放移除线程所有权，并把状态设置成0

```java
abstract static class Sync extends AbstractQueuedSynchronizer {
        private static final long serialVersionUID = -5179523762034025860L;

        @ReservedStackAccess
        protected final boolean tryRelease(int releases) {
            int c = getState() - releases;
            if (Thread.currentThread() != getExclusiveOwnerThread())
                throw new IllegalMonitorStateException();
            boolean free = false;
            // 如果重入计数为0的时候
            if (c == 0) {
                free = true;
                // 修改所有权
                setExclusiveOwnerThread(null);
            }
            setState(c);
            return free;
        }

    }
```

3. 唤醒后继节点，也许后继节点无阻塞，只是在自旋

```java
     private void unparkSuccessor(Node node) {
        int ws = node.waitStatus;
        if (ws < 0)
            node.compareAndSetWaitStatus(ws, 0);
        // 找到后继
        Node s = node.next;
        if (s == null || s.waitStatus > 0) {
            s = null;
            for (Node p = tail; p != node && p != null; p = p.prev)
                if (p.waitStatus <= 0)
                    s = p;
        }
        // 唤醒后继节点
        if (s != null)
            LockSupport.unpark(s.thread);
    }
```

## 获取锁

1. 主要流程，先获取锁，获取不到的话进队列

```java
public final void acquire(int arg) {
    if (!tryAcquire(arg) &&
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
        selfInterrupt();
}
```

2. `acquireQueued`自旋或者阻塞

```java
final boolean acquireQueued(final Node node, int arg) {
    boolean interrupted = false;
    try {
        for (;;) {
            // 查找前驱节点，
            // 看看是否为头节点，可能在自旋的时候前驱已经变成了头
            final Node p = node.predecessor();
            if (p == head && tryAcquire(arg)) {
                // 当前线程如果拿到了锁，负责队列的推进
                setHead(node);
                p.next = null; // help GC
                return interrupted;
            }
            if (shouldParkAfterFailedAcquire(p, node))
                interrupted |= parkAndCheckInterrupt();
        }
    } catch (Throwable t) {
        cancelAcquire(node);
        if (interrupted)
            selfInterrupt();
        throw t;
    }
}
```

## FairSync

1. 从公平锁中可以看出，先判断队列是否有节点`hasQueuedPredecessors`，如果是的话，直接进队列

```java
static final class FairSync extends Sync {
    private static final long serialVersionUID = -3000897897090466540L;

    @ReservedStackAccess
    protected final boolean tryAcquire(int acquires) {
        final Thread current = Thread.currentThread();
        int c = getState();
        if (c == 0) {
            // 这一行判断是否有排队
            if (!hasQueuedPredecessors() &&
                compareAndSetState(0, acquires)) {
                setExclusiveOwnerThread(current);
                return true;
            }
        }
        else if (current == getExclusiveOwnerThread()) {
            int nextc = c + acquires;
            if (nextc < 0)
                throw new Error("Maximum lock count exceeded");
            setState(nextc);
            return true;
        }
        return false;
    }
}
```

2. `hasQueuedPredecessors`，从这里可以看到分别从头和尾巴找未取消的节点，如果找到的话，就说明有线程在排队

```java
public final boolean hasQueuedPredecessors() {
    Node h, s;
    if ((h = head) != null) {
        if ((s = h.next) == null || s.waitStatus > 0) {
            s = null; // traverse in case of concurrent cancellation
            for (Node p = tail; p != h && p != null; p = p.prev) {
                if (p.waitStatus <= 0)
                    s = p;
            }
        }
        if (s != null && s.thread != Thread.currentThread())
            return true;
    }
    return false;
}
```

3. 进入队列后开始自旋，或者在特定情况下进行阻塞`shouldParkAfterFailedAcquire`，后来的线程都会进入队列中

## NonfairSync

1. 这个代码很简单，那就是无需判断队列是否有排队线程，可以直接对锁进行抢占，如果抢占到了，是不需要进队列的，`!tryAcquire(arg)`处就阻断了后面的流程

```java
final boolean nonfairTryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        // 直接进行抢占
        if (compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0) // overflow
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```

2. 这个时候好玩的场景出现了，例如现在队列为ABCDE，A刚解除了锁状态，会出现两种情况
   * A线程在唤醒B的流程中
   * B自旋（被唤醒或者无阻塞），在请求锁状态
3. 在step:2的基础上来了线程F，那么B和F抢占锁，其结果有两种
   * B抢到锁，F进队列
   * F抢到锁，不进队列，B依然自旋

## 疑惑

锁队列如何推进队列的？

1. 公平锁，公平锁在头节点释放状态的时候，唤醒了后继节点，由于是公平锁，所以在自旋的过程中，只有后继`if (p == head && tryAcquire(arg))`能拿到锁
2. 非公平锁，如果新来的线程拿到锁，队列中的线程没有拿到锁，新来线程没有进队列，唤醒还是使用的`head,tail`进行查找要唤醒的节点，然后唤醒节点，B节点在自旋很久后一定能拿到锁，将自己设置成头
3. 自旋过程中，如果发现自己的前驱就是头节点，并且自己还拿到了锁状态，就可以将自己设置成头

```java
final boolean acquireQueued(final Node node, int arg) {
    boolean interrupted = false;
    try {
        for (;;) {
            // 前驱是头节点
            final Node p = node.predecessor();
            // 自己拿到了锁，
            if (p == head && tryAcquire(arg)) {
                setHead(node);
                p.next = null; // help GC
                return interrupted;
            }
            if (shouldParkAfterFailedAcquire(p, node))
                interrupted |= parkAndCheckInterrupt();
        }
    } catch (Throwable t) {
        cancelAcquire(node);
        if (interrupted)
            selfInterrupt();
        throw t;
    }
}
```

## 总结

* 线程协作，当前持有锁的线程在释放锁的时候，唤醒后继节点
* 后继线程节点负责推进队列

## 参考材料

* [Michael-Scott](.)

本算法主要是将线程如何协作的

* [Java并发编程实战 P273](https://book.douban.com/subject/10484692/)
