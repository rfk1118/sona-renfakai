# 交换还是移动？

## 交换

::: center
<mermaid style="margin-bottom: 0px">
sequenceDiagram
    A->>+Temp: 复制到临时结点
    B->>+A: B移动到A
    Temp->>+B:临时结点移动到B
    B->>+Temp: 复制到临时结点
    C->>+B: C移动B
    Temp->>+C:临时结点移动到C
</mermaid>
数据处理流程如图所示
:::

常用交换方式:

1. 三方变量
2. [异或交换](./../bit/xor.md)
   一般情况使用在非对象类型（内置数据）

### 优点

易理解、易维护，具体参考以下代码。

1. [Go-heap](https://cs.opensource.google/go/go/+/refs/tags/go1.17.8:src/container/heap/heap.go)

```Go
func up(h Interface, j int) {
  for {
    i := (j - 1) / 2 // parent
    if i == j || !h.Less(j, i) {
      break
    }
    // 使用交换原则
    h.Swap(i, j)
    j = i
  }
}
```

2. [算法4-heap](https://algs4.cs.princeton.edu/24pq/Heap.java.html)

```java
public static void sort(Comparable[] pq) {
    int n = pq.length;
    // 堆化
    for (int k = n/2; k >= 1; k--)
        sink(pq, k, n);
    int k = n;
    while (k > 1) {
        // 进行交换
        exch(pq, 1, k--);
        sink(pq, 1, k);
    }
}
// 三方变量
private static void exch(Object[] pq, int i, int j) {
    Object swap = pq[i-1];
    pq[i-1] = pq[j-1];
    pq[j-1] = swap;
}
```

### 缺点

性能低，n个元素交换，使用三方变量会进行 3(n-1）赋值，使用异或交换有需要 2(n-1）赋值。

## 移动

::: center
<mermaid style="margin-bottom: 0px">
sequenceDiagram
    A->>+Temp: 复制到临时结点
    B->>+A: 移动B数据到A
    C->>+B: 移动C数据到B
    D->>+C: 移动D数据到C
    Temp->>+D:移动临时数据到D
</mermaid>
数据（非对象类型）处理流程如图所示
:::

先移动其他数据到正确位置，在放置需要排序的数据

### 优点

性能高，数据交换、赋值次数少，使用 n+1次移动。

### 缺点

代码理解负责，维护成本高。

```java
public class PriorityQueue<E> extends AbstractQueue<E>
    implements java.io.Serializable {

  private void siftDownComparable(int k, E x) {
      Comparable<? super E> key = (Comparable<? super E>)x;
      int half = size >>> 1;        // loop while a non-leaf
      // 先移动数据
      while (k < half) {
          // 假定只有左孩子
          int child = (k << 1) + 1; // assume left child is least
          Object c = queue[child];
          int right = child + 1;
          // 如果有右孩子，并且右孩子还小于左孩子
          if (right < size &&
              // 弱序性
              ((Comparable<? super E>) c).compareTo((E) queue[right]) > 0)
              c = queue[child = right];
          if (key.compareTo((E) c) <= 0)
              break;
          // 移动策略
          queue[k] = c;
          k = child;
      }
      // 放到正确位置
      queue[k] = key;
  }

}
```

## 总结

如果项目没有特别高性能要求，建议使用交换编写代码，后期维护成本低。
