# DefaultThreadFactory

### 装饰器优化线程

```java
    if (nThreads <= 0) {
        throw new IllegalArgumentException(String.format("nThreads: %d (expected: > 0)", nThreads));
   }

   if (executor == null) {
            executor = new ThreadPerTaskExecutor(newDefaultThreadFactory());
   }

   children = new EventExecutor[nThreads];

   // 线程池工厂
   protected ThreadFactory newDefaultThreadFactory() {
            return new DefaultThreadFactory(getClass());
  }
```

在这里线程池工厂用的 `DefaultThreadFactory` ，它有什么作呢？比较核心的代码如下：

```java
  @Override
    public Thread newThread(Runnable r) {
        //  这里创建线程时候会装饰一层
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

    protected Thread newThread(Runnable r, String name) {
        // 这里也会转换成FastThreadLocalThread
        return new FastThreadLocalThread(threadGroup, r, name);
    }
```

### FastThreadLocalThread 有什么用呢？

```java
  public FastThreadLocalThread(ThreadGroup group, Runnable target, String name) {
        super(group, FastThreadLocalRunnable.wrap(target), name);
        cleanupFastThreadLocals = true;
  }

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
               // 功能增强在这里
              FastThreadLocal.removeAll();
          }
      }

      static Runnable wrap(Runnable runnable) {
          return runnable instanceof FastThreadLocalRunnable ? runnable : new FastThreadLocalRunnable(runnable);
      }
  }
```

`FastThreadLocalThread` 负责将所有任务 `Runnable` 装饰成 `FastThreadLocalRunnable` ，这样在任务执行完毕后会执行 `FastThreadLocal.removeAll(); ` ，将 `ThreadLocal` 里面的数据进行清除。

### 其他常用

* 比如我们写代码时候不想让分布式锁耦合到代码中，可以直接实现接口，然后在 wrap 一层，效果如下所示:

```java
   static class SynchronizedCollection<E> implements Collection<E>, Serializable {
        private static final long serialVersionUID = 3053995032091335093L;

        final Collection<E> c;  // Backing Collection
        // 这里有一个锁对象，在后面功能处理时候都进行了锁增强
        final Object mutex;     // Object on which to synchronize

        SynchronizedCollection(Collection<E> c) {
            this.c = Objects.requireNonNull(c);
            mutex = this;
        }

        SynchronizedCollection(Collection<E> c, Object mutex) {
            this.c = Objects.requireNonNull(c);
            this.mutex = Objects.requireNonNull(mutex);
        }

        public int size() {
            synchronized (mutex) {return c.size();}
        }
        public boolean isEmpty() {
            synchronized (mutex) {return c.isEmpty();}
        }
        public boolean contains(Object o) {
            synchronized (mutex) {return c.contains(o);}
        }
        public Object[] toArray() {
            synchronized (mutex) {return c.toArray();}
        }
        public <T> T[] toArray(T[] a) {
            synchronized (mutex) {return c.toArray(a);}
        }

        public Iterator<E> iterator() {
            return c.iterator(); // Must be manually synched by user!
        }

        public boolean add(E e) {
            synchronized (mutex) {return c.add(e);}
        }
        public boolean remove(Object o) {
            synchronized (mutex) {return c.remove(o);}
        }

        public boolean containsAll(Collection<?> coll) {
            synchronized (mutex) {return c.containsAll(coll);}
        }
        public boolean addAll(Collection<? extends E> coll) {
            synchronized (mutex) {return c.addAll(coll);}
        }
        public boolean removeAll(Collection<?> coll) {
            synchronized (mutex) {return c.removeAll(coll);}
        }
        public boolean retainAll(Collection<?> coll) {
            synchronized (mutex) {return c.retainAll(coll);}
        }
        public void clear() {
            synchronized (mutex) {c.clear();}
        }
        public String toString() {
            synchronized (mutex) {return c.toString();}
        }
        // Override default methods in Collection
        @Override
        public void forEach(Consumer<? super E> consumer) {
            synchronized (mutex) {c.forEach(consumer);}
        }
        @Override
        public boolean removeIf(Predicate<? super E> filter) {
            synchronized (mutex) {return c.removeIf(filter);}
        }
        @Override
        public Spliterator<E> spliterator() {
            return c.spliterator(); // Must be manually synched by user!
        }
        @Override
        public Stream<E> stream() {
            return c.stream(); // Must be manually synched by user!
        }
        @Override
        public Stream<E> parallelStream() {
            return c.parallelStream(); // Must be manually synched by user!
        }
        private void writeObject(ObjectOutputStream s) throws IOException {
            synchronized (mutex) {s.defaultWriteObject();}
        }
    }

```

### 总结

* [装饰者设计模式](https://www.oodesign.com/decorator-pattern.html)
* 装饰者设计模式与静态代理区别，装饰者对原协议功能有增强，而静态代码只是日志，安全，权限代理，对原函数无增强 ，但是代码边写起来，看起来一样
