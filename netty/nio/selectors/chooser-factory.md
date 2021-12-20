# ChooserFactory

### ChooserFactory 是什么？

从线程池中选择线程的计算方式，可以让用户自定义算法选择下一个线程，更灵活的 Api。</br>
::: tip 提示
这里应该说时选择 eventloop 更合适，因为任务都是加到 eventloop 的 queue 里面，然后由 eventloop 自己拉取任务进行处理。
:::
Allow to specify a custom EventExecutorChooserFactory. Related to [#1230]

```java
   interface EventExecutorChooser {

        /**
         * Returns the new {@link EventExecutor} to use.
         */
        EventExecutor next();
    }

    if (isPowerOfTwo(executors.length)) {
            // 是2的n次幂，使用&进行计算更高效
            return new PowerOfTwoEventExecutorChooser(executors);
    } else {
            // 使用除法进行计算
            return new GenericEventExecutorChooser(executors);
    }
```

### PowerOfTwoEventExecutorChooser

计算性能更高效，2 的 n 次幂，使用&进行计算更高效

```java
  private static final class PowerOfTwoEventExecutorChooser implements EventExecutorChooser {
        private final AtomicInteger idx = new AtomicInteger();
        private final EventExecutor[] executors;

        PowerOfTwoEventExecutorChooser(EventExecutor[] executors) {
            this.executors = executors;
        }

        @Override
        public EventExecutor next() {
            return executors[idx.getAndIncrement() & executors.length - 1];
        }
    }
```

### GenericEventExecutorChooser

更通用，使用除法进行计算。

```java
  private static final class GenericEventExecutorChooser implements EventExecutorChooser {
        private final AtomicInteger idx = new AtomicInteger();
        private final EventExecutor[] executors;

        GenericEventExecutorChooser(EventExecutor[] executors) {
            this.executors = executors;
        }

        @Override
        public EventExecutor next() {
            return executors[Math.abs(idx.getAndIncrement() % executors.length)];
        }
    }
```
