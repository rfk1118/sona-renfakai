# 前序遍历

前序遍历（根，左，右）

  1. 访问当前节点
  2. 调用当前节点左节点进行遍历
  3. 调用当前节点的右节点进行遍历

## 常用方式

* 递归，方案比较简单，方式统一
* loop，孔乙己茴字有几种写法

## 代码

### 递归

递归方式处理比较简单，先处理当前节点，左，右

```go
func preOrder(head *BinaryTree) {
  if nil == head {
    return
  }
  // 访问当前节点
  fmt.Printf("key:%d,value:%d\n", head.key, head.value)
  // 调用当前节点左节点进行遍历
  preOrder(head.leftNode)
  // 调用当前节点的右节点进行遍历
  preOrder(head.rightNode)
}
```

### loop

1. 茴字的第一种写法

```go
func preOrderWithLoopV1(head *BinaryTree) {
  if nil == head {
    return
  }
  stack := []*BinaryTree{head}
  for len(stack) > 0 {
    pop := stack[len(stack)-1]
    stack = stack[:len(stack)-1]
    fmt.Printf("key:%d,value:%d\n", pop.key, pop.value)
    if nil != pop.rightNode {
      stack = append(stack, pop.rightNode)
    }
    if nil != pop.leftNode {
      stack = append(stack, pop.leftNode)
    }
  }
}
```

1. 茴字的第二种写法，这种比较废人

```go
func preOrderWithLoopV2(head *BinaryTree) {
  var stack []*BinaryTree
  node := head
  for node != nil || len(stack) > 0 {
    for node != nil {
      fmt.Printf("key:%d,value:%d\n", node.key, node.value)
      stack = append(stack, node)
      node = node.leftNode
    }
    node = stack[len(stack)-1]
    node = node.rightNode
    stack = stack[:len(stack)-1]
  }
}
```

### loop进阶版

不使用递归，也不使用辅助栈，`Morris traversal for Preorder`方式进行前序遍历

```go
// 前序遍历，不使用递归和栈辅助
func preOrderWithLoopMorris(root *BinaryTree) {
  if nil == root {
    return
  }
  var predecessor *BinaryTree
  var current = root
  for current != nil {
    // 如果当前节点的左孩子为空，直接打印当前节点，并转向处理右节点
    if current.leftNode == nil {
      fmt.Printf("key:%d,value:%d\n", current.key, current.value)
      current = current.rightNode
    } else {
      // 查找当前节点的前驱节点
      predecessor = current.leftNode
      for predecessor.rightNode != nil && predecessor.rightNode != current {
        predecessor = predecessor.rightNode
      }

      // 第一次前驱节点的右节点肯为空，这里就是将前驱节点的后继指向当前节点，然后继续向下走
      if predecessor.rightNode == nil {
        predecessor.rightNode = current
        current = current.leftNode
      } else {
        // 如果回溯到当前节点，并且找前驱的时候，发现出了环，这个时候处理当前节点，并且向右移动
        fmt.Printf("key:%d,value:%d\n", current.key, current.value)
        predecessor.rightNode = nil
        current = current.rightNode
      }
    }
  }
}
```

## 总结

1. 一般情况下使用递归写法简单，写起来比较快
2. 使用`loop`方式，会在特殊情况下会有奇效，比如求每层二叉树平均值
3. 在要求空间为常数，并且不能使用递归的情况下使用`Morris`，基本属于`hard`级别
