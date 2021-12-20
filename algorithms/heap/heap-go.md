# Heap_Go源码

本文主要读`Go`源码？其实`Go`在堆上的的设计和编码会让学习者很容易看到堆的本质。

## [文档地址](https://pkg.go.dev/container/heap)

文档地址给了`intHeap`和`PriorityQueue`两个demo，这是因为`Go`语言暴露的方法要比`java`多，所以需要我们能更准确的写出代码，现在进行对比。

| 语言 | 交换数据方式 | 性能 | 理解 |
| ---- | -----------: | ---: | ---: |
| Go   |         交换 |   低 | 容易 |
| Java |         移动 |   高 | 困难 |

## [基础功能排序](https://pkg.go.dev/sort)

排序下面的实现有`插入排序，堆排序，快排`等。

```Go
// 这个就是排序的接口
type Interface interface {
  // 返回集合的数量
  Len() int
  // 这里有传递性，自反性等原理
  // 判断两个值的大小
  Less(i, j int) bool
  // 这里是数据交换，也是整个设计的核心
  Swap(i, j int)
}
```

## [堆基础功能定义](https://pkg.go.dev/sort)

```go
type Interface interface {
  // 排序接口
  sort.Interface
  // 增加数据
  Push(x interface{}) // add x as element Len()
  // 从堆顶推出元素
  Pop() interface{}   // remove and return element Len() - 1.
}
```

## 核心代码

### 堆化

其实从最底层的父亲开始，都向下下沉就是堆话，其实这里最重要的就是找到最后一个父亲，也就是`h.Len()/2-1`。

```go
func Init(h Interface) {
  // heapify
  n := h.Len()
  for i := n/2 - 1; i >= 0; i-- {
    down(h, i, n)
  }
}
```

### Push

我们每次推入元素都将其放到最后一个位置，让后在进行上浮，上浮到合适的位置即可。

```go
// Push pushes the element x onto the heap.
// The complexity is O(log n) where n = h.Len().
func Push(h Interface, x interface{}) {
  // 推入到最后体格位置
  h.Push(x)
  up(h, h.Len()-1)
}
```

### Pop

对于大顶堆或者小顶堆，位置在0的就是我们要推出的元素，但是推出位置为0的元素后就会有一个空洞，我们就需要从后面位置拿一个元素，放到位置0，让其在下沉下去，为了让空间连续，拿最后一个元素最好。

```go
// Pop removes and returns the minimum element (according to Less) from the heap.
// The complexity is O(log n) where n = h.Len().
// Pop is equivalent to Remove(h, 0).
func Pop(h Interface) interface{} {
  n := h.Len() - 1
  h.Swap(0, n)
  // 下沉
  down(h, 0, n)
  return h.Pop()
}
```

### Remove

移除第i个位置的元素，这里为什么下沉不下去还要上浮呢？这是因为多线程问题，如果最后一个元素刚被插入，还没进行上浮，现在放到第i个位置，其实是下沉不下去的，所以这里要上浮，保证其堆的特征不被改变。

```go
// Remove removes and returns the element at index i from the heap.
// The complexity is O(log n) where n = h.Len().
func Remove(h Interface, i int) interface{} {
  n := h.Len() - 1
  if n != i {
    h.Swap(i, n)
    if !down(h, i, n) {
      up(h, i)
    }
  }
  return h.Pop()
}

```

### Fix

这个很容易理解，那就是第i个位置上的数据被修改了后，其结果可能大于修改前，也可能小于修改前，所以先下沉在上浮就好了，其实可以与之前的值做对比的，然后做处理的，不过现在的方式更安全。

```go
// Fix re-establishes the heap ordering after the element at index i has changed its value.
// Changing the value of the element at index i and then calling Fix is equivalent to,
// but less expensive than, calling Remove(h, i) followed by a Push of the new value.
// The complexity is O(log n) where n = h.Len().
func Fix(h Interface, i int) {
  if !down(h, i, h.Len()) {
    up(h, i)
  }
}
```

### Up

上浮这个是重头戏，其实也就是第j个位置跟其父亲，父亲的父亲进行对比，找到合适的位置。

```go
func up(h Interface, j int) {
  for {
    // 这里的i就是父亲
    i := (j - 1) / 2 // parent
    if i == j || !h.Less(j, i) {
      // i==j 说明找到了顶，也就是位置0处
      // !h.Less(j, i) 说明父亲已经不在比孩子小，跳出循环
      break
    }
    // 交换数据
    h.Swap(i, j)
    // 向上走
    j = i
  }
}
```

### down

下沉的时候需要注意，其与上浮是不一样的，因为上浮的时候只有一个父亲，所以直接对比就好，但是下沉的时候，会有多种情况。

* 没有孩子
* 有左孩子，有右孩子
* 有左孩子，无右孩子

::: tip
没有左孩子肯定没有右孩子，因为这是根据其完全二叉树特性而存在
:::

```go
func down(h Interface, i0, n int) bool {
  i := i0
  for {
    // 找到左孩子
    j1 := 2*i + 1
    // 如果没有左孩子，那就是没孩子
    // 或者整数溢出，则直接跳出
    if j1 >= n || j1 < 0 { // j1 < 0 after int overflow
      break
    }
    // 这就是左孩子
    j := j1 // left child
    // j2 := j1 + 1; j2 < n 看看有没有右孩子，
    // 因为其弱序性，所以这里还要进行h.Less(j2, j1)判断
    if j2 := j1 + 1; j2 < n && h.Less(j2, j1) {
      j = j2 // = 2*i + 2  // right child
    }
    // 在判断相应的位置是不是正确，因为弱序问题，所以被放到了这里
    // 例如左孩子不符合，但是右孩子可以交换
    if !h.Less(j, i) {
      break
    }
    // 交换数据
    h.Swap(i, j)
    // 向下走
    i = j
  }
  return i > i0
}
```

## 总结

想快速掌握`Heap`，就快点来看源码吧，其与算法4一样，更有利于学习，`doug lea`大神的代码注释比较少，性能比较高，学习起来难度大。

核心的`api`如下：

* `up`上浮
* `down`下沉
* `堆话heapify`其主要在初始化集合时候使用，核心还是`down`
