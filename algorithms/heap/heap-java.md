# Heap_Java 源码

本文主要是读 java 源码，因为 java 使用的移动的方式交换数据。

| 语言 | 交换数据方式 | 性能 | 理解 |
| ---- | -----------: | ---: | ---: |
| Go   |         交换 |   低 | 容易 |
| Java |         移动 |   高 | 困难 |

## PriorityQueue 源码

```java
public class PriorityQueue<E> extends AbstractQueue<E>
    implements java.io.Serializable {

    // 序列化
    private static final long serialVersionUID = -7720805057305804111L;

    private static final int DEFAULT_INITIAL_CAPACITY = 11;

    // 存储数据，因为泛型会被擦除，所以这里直接是Object
    transient Object[] queue; // non-private to simplify nested class access
    // 数量
    private int size = 0;
    // 比较器
    private final Comparator<? super E> comparator;

    // 用于迭代器设计模式迭代数据时候用
    transient int modCount = 0; // non-private to simplify nested class access

    }
```

## 核心代码

### heapify

从最底层的最后一个父亲开始，都向下下沉就是堆话，其实这里最重要的就是找到最后 1 个父亲，也就是 `(size >>> 1) - 1 = (size / 2) - 1` 。

```java
private void heapify() {
    // 找到最后一个父亲，然后向前走，所有元素进行下沉
    for (int i = (size >>> 1) - 1; i >= 0; i--)
        siftDown(i, (E) queue[i]);
}
```

### offer

 java 这里对数组进行了扩容，所以扩容的事情就不需要外部关心了，而且这里兼容自然排序和排序器比较。

```java
public boolean offer(E e) {
    if (e == null)
        throw new NullPointerException();
    modCount++;
    // 拿到当前size
    int i = size;
    // 如果数组满了进行扩容，这里不是重点，请自行查看
    if (i >= queue.length)
        grow(i + 1);
    size = i + 1;
    // 如果还没有插入数据，放在堆顶，不需要上浮
    if (i == 0)
        queue[0] = e;
    else
    //  上浮数据
        siftUp(i, e);
    return true;
}
```

### poll

1. 删除元素
   - 删除第 0 个元素，所有数据全部向前移动，这样方案不好，因为移动的数据过多，因为弱序，第 1 个位置的数据不一定比第 2 个位置的数据更适合做顶堆。
   - 删除第 0 个元素，并将最后一个数据放置到索引 0 处，进行下沉。

```java
public E poll() {
      // 没有元素
      if (size == 0)
          return null;
      int s = --size;
      modCount++;
      // 拿到结果
      E result = (E) queue[0];
      // 拿到最后一个元素
      E x = (E) queue[s];
      // 清除最后一个元素
      queue[s] = null;
      if (s != 0)
      // 下沉
          siftDown(0, x);
      return result;
}
```

### removeAt

1. 删除特定位置元素为什么要先下沉在上浮呢？因为大多数在下沉排序期间重新插入堆的元素会被直接加入到堆底。

```java
 private E removeAt(int i) {
    // assert i >= 0 && i < size;
    modCount++;
    int s = --size;
    // 如果需要删除的位置是最后一个元素直接删除
    if (s == i) // removed last element
        queue[i] = null;
    else {
        // 查找最后一个元素
        E moved = (E) queue[s];
        // 清除
        queue[s] = null;
        // 下沉，一般情况下删除元素和堆化都用下沉
        siftDown(i, moved);
        // 如果下沉不下去
        if (queue[i] == moved) {
            // 进行上浮 大多数在下沉排序期间重新插入堆的元素会被直接加入到堆底
            siftUp(i, moved);
            // 如果上浮成功了，则说明元素到了i-n的位置，这里主要是为了解决迭代器问题的
            // 如果没有迭代器问题，下面两行可以删除
            if (queue[i] != moved)
                return moved;
            // 整体就是先下沉在上浮
        }
    }
    return null;
 }
```

### siftUp

```java
// 这里只是排序器选择不重要
private void siftUp(int k, E x) {
    if (comparator != null)
        // 排序器
        siftUpUsingComparator(k, x);
    else
        // 自然排序
        siftUpComparable(k, x);
}

private void siftUpUsingComparator(int k, E x) {
    while (k > 0) {
        // 找到父亲
        int parent = (k - 1) >>> 1;
        // 父亲数据
        Object e = queue[parent];
        // 数据比较
        if (comparator.compare(x, (E) e) >= 0)
            break;
        // 父亲数据下移动
        queue[k] = e;
        // 设置需要继续上浮的位置
        k = parent;
    }
    // 最终位置放数据
    queue[k] = x;
}
```

### siftDown

```java
// 这里只是排序器选择不重要
private void siftDown(int k, E x) {
    if (comparator != null)
        siftDownUsingComparator(k, x);
    else
        siftDownComparable(k, x);
}

 private void siftDownUsingComparator(int k, E x) {
        // 找到堆中间最低一层的父亲节点
        int half = size >>> 1;
        // 还没到最后一层父亲节点
        while (k < half) {
            // 2n+1查找左节点
            int child = (k << 1) + 1;
            // 左节点为比较值
            Object c = queue[child];
            // 2n+2右节点，右节点不一定存在
            int right = child + 1;
            // 右节点存在，并且左节点大于右节点，从这里看出数据的弱序性
            if (right < size && comparator.compare((E) c, (E) queue[right]) > 0)
            // 设置最小孩子，并且修正索引
                c = queue[child = right];
            // 如果找到合适位置了跳出，直接设置数据
            if (comparator.compare(x, (E) c) <= 0)
                break;
            // 数据上浮上去，但是索引下沉下来
            queue[k] = c;
            // 设置数据想要放置索引
            k = child;
        }
        // 将数据放到正确位置
        queue[k] = x;
}
```

## 总结

代码主要为 `Josh Bloch, Doug Lea` 两位大神写的，性能很高，使用左移，右移，移动提高性能，所以读起来会有写晦涩，如果想读通俗易懂的建议读《算法 4》或者 `Go` 。

核心的 `api` 如下：

- `siftUp`上浮
- `siftDown`下沉
- `堆话heapify`其主要在初始化集合时候使用，核心还是`siftDown`
