# Decorator-Netty

### netty 数据优化

1. `SelectedSelectionKeySet`代码不在粘贴，其中大部分代码都没有修改，只对部分功能做了增强，例如`SelectedSelectionKeySetSelector#select`

```java
final class SelectedSelectionKeySetSelector extends Selector {
    private final SelectedSelectionKeySet selectionKeys;
    private final Selector delegate;

    SelectedSelectionKeySetSelector(Selector delegate, SelectedSelectionKeySet selectionKeys) {
        this.delegate = delegate;
        this.selectionKeys = selectionKeys;
    }

    @Override
    public boolean isOpen() {
        return delegate.isOpen();
    }

    @Override
    public SelectorProvider provider() {
        return delegate.provider();
    }

    @Override
    public Set<SelectionKey> keys() {
        return delegate.keys();
    }

    @Override
    public Set<SelectionKey> selectedKeys() {
        return delegate.selectedKeys();
    }

    @Override
    public int selectNow() throws IOException {
        selectionKeys.reset();
        return delegate.selectNow();
    }

    @Override
    public int select(long timeout) throws IOException {
        // 增强功能
        selectionKeys.reset();
        return delegate.select(timeout);
    }

    @Override
    public int select() throws IOException {
        // 增强功能
        selectionKeys.reset();
        return delegate.select();
    }

    @Override
    public Selector wakeup() {
        return delegate.wakeup();
    }

    @Override
    public void close() throws IOException {
        delegate.close();
    }
}
```

### Netty

1. 如何对线程进行增强

```java
public class DefaultThreadFactory implements ThreadFactory {
   @Override
    public Thread newThread(Runnable r) {
        // FastThreadLocalRunnable.wrap(r) 会wrap任务
        Thread t = newThread(FastThreadLocalRunnable.wrap(r), prefix + nextId.incrementAndGet());
        try {
            if (t.isDaemon() != daemon) {
                t.setDaemon(daemon);
            }

            if (t.getPriority() != priority) {
                t.setPriority(priority);
            }
        } catch (Exception ignored) {
            // Doesn't matter even if failed to set.
        }
        return t;
    }

    // 创建线程时候，装饰成FastThreadLocalThread
    protected Thread newThread(Runnable r, String name) {
        return new FastThreadLocalThread(threadGroup, r, name);
    }
}

public class FastThreadLocalThread extends Thread {
    // This will be set to true if we have a chance to wrap the Runnable.
    private final boolean cleanupFastThreadLocals;

    // 这里会进行增强，通过ThreadLocal存放一些数据
    private InternalThreadLocalMap threadLocalMap;

    public FastThreadLocalThread() {
        cleanupFastThreadLocals = false;
    }
}
```

2. 对任务的增强

```java
final class FastThreadLocalRunnable implements Runnable {
    private final Runnable runnable;

    private FastThreadLocalRunnable(Runnable runnable) {
        this.runnable = ObjectUtil.checkNotNull(runnable, "runnable");
    }

    @Override
    public void run() {
        try {
            runnable.run();
        } finally {
            // 在执行完任务后会清理ThreadLocal
            FastThreadLocal.removeAll();
        }
    }

    static Runnable wrap(Runnable runnable) {
        return runnable instanceof FastThreadLocalRunnable ? runnable : new FastThreadLocalRunnable(runnable);
    }
}
```

### 总结

在不改变对象结构的强况下进行功能增强，这种可以有效的防止 `ThreadLocal` 内存泄露。
