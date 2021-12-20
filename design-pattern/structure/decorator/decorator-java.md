# Decorator-Java

### java 中的装饰者模式

1. 接口

```java
public interface List<E> extends Collection<E> {
  // ...
}
```

2. 实现，这里以`ArrayList`和`LinkedList`为例

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
        // ....
}

public class LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable
{
  // ....
}
```

3. 因为`ArrayList`和`LinkedList`是不支持数据同步的，如果想实现功能增强要怎么办？请使用`List<String> objects = Collections.synchronizedList(new ArrayList<String>());`，在来看一眼代码，产生的新对象会进行加锁，进行委托

```java
 // 其主要是使用同步器进行增强
 static class SynchronizedList<E>
        extends SynchronizedCollection<E>
        implements List<E> {
        private static final long serialVersionUID = -7754090372962971524L;

        final List<E> list;

        // 委托list,这里会进行增强
        SynchronizedList(List<E> list) {
            super(list);
            this.list = list;
        }
         // 委托list,这里会进行增强
        SynchronizedList(List<E> list, Object mutex) {
            super(list, mutex);
            this.list = list;
        }

        public boolean equals(Object o) {
            if (this == o)
                return true;
            synchronized (mutex) {return list.equals(o);}
        }
        public int hashCode() {
            synchronized (mutex) {return list.hashCode();}
        }

        public E get(int index) {
            synchronized (mutex) {return list.get(index);}
        }
        public E set(int index, E element) {
            synchronized (mutex) {return list.set(index, element);}
        }
        public void add(int index, E element) {
            synchronized (mutex) {list.add(index, element);}
        }
        public E remove(int index) {
            synchronized (mutex) {return list.remove(index);}
        }

        public int indexOf(Object o) {
            synchronized (mutex) {return list.indexOf(o);}
        }
        public int lastIndexOf(Object o) {
            synchronized (mutex) {return list.lastIndexOf(o);}
        }

        public boolean addAll(int index, Collection<? extends E> c) {
            synchronized (mutex) {return list.addAll(index, c);}
        }

        public ListIterator<E> listIterator() {
            return list.listIterator(); // Must be manually synched by user
        }

        public ListIterator<E> listIterator(int index) {
            return list.listIterator(index); // Must be manually synched by user
        }

        public List<E> subList(int fromIndex, int toIndex) {
            synchronized (mutex) {
                return new SynchronizedList<>(list.subList(fromIndex, toIndex),
                                            mutex);
            }
        }

        @Override
        public void replaceAll(UnaryOperator<E> operator) {
            synchronized (mutex) {list.replaceAll(operator);}
        }
        @Override
        public void sort(Comparator<? super E> c) {
            synchronized (mutex) {list.sort(c);}
        }

        private Object readResolve() {
            return (list instanceof RandomAccess
                    ? new SynchronizedRandomAccessList<>(list)
                    : this);
        }
    }

```

### 总结

使用委托可以在不修改原数据结构的情况下进行功能增强，其实《Java 并发编程实战》P62 有这一段的描述。
