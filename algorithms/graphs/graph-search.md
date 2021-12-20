# 搜索

* 按一定顺序访问图中节点的基本算法
* 在许多其他算法中用作子程序

## 搜索方式

* [深度优先搜索](./graph-search.md#深度优先搜索)
* [广度优先搜索](./graph-search.md#广度优先搜索)

## 深度优先搜索

::: tip
Depth-First Search (DFS): uses recursion (stack)
:::

1. 如果可能，访问一个邻接的未访问节点，标记它，并把它放到栈内
2. 当不能执行规则1时，如果栈不为空，就从栈内中弹出一个顶点
3. 如果不能执行规则1和规则2，就完成了整个搜索过程

### 深度优先搜索代码

1. 使用辅助栈

```Go
type StackX struct {
  st       [MaxVertex]int
  topIndex int
}

func newStackX() *StackX {
  return &StackX{
    topIndex: -1,
  }
}

func (s *StackX) push(item int) {
  s.topIndex = s.topIndex + 1
  s.st[s.topIndex] = item
}

func (s *StackX) pop() int {
  r := s.st[s.topIndex]
  s.topIndex = s.topIndex - 1
  return r
}

func (s *StackX) peek() int {
  r := s.st[s.topIndex]
  return r
}

func (s *StackX) isEmpty() bool {
  return s.topIndex == -1
}
```

2. 图中新增打印

```Go
// 打印第n个数据
func (g *Graph) displayVertex(v int) {
  fmt.Println(g.vertexList[v].label)
}
```

3. 深度优先搜索

```Go
// 深度优先搜索
func (g *Graph) dfs() {
  // 辅助栈
  stackX := newStackX()
  // 找到第一个节点
  g.vertexList[0].wasVisited = true
  g.displayVertex(0)
  stackX.push(0)
  for !stackX.isEmpty() {
    // 能找到其他连接，继续向下走
    currentNode := g.getAdjUnvisitedVertex(stackX.peek())
    if currentNode == -1 {
      // 找不到的话进行回朔
      // 步骤二
      stackX.pop()
    } else {
      g.vertexList[currentNode].wasVisited = true
      g.displayVertex(currentNode)
      // 步骤一
      stackX.push(currentNode)
    }
  }
  // 重置标记
  for _, itemValue := range g.vertexList {
    itemValue.wasVisited = false
  }
}
```

## 广度优先搜索

::: tip
Breadth-First Search (BFS): uses queue
:::

1. 访问下一个未来访问的邻接点（如果存在），这个顶点必须是当前顶点的邻接点，标记它，并将它插入到队列中
2. 如果因为已经没有未访问节点而不能执行规则1，那么从队列头取一个顶点（如果存在），并使其成为当前节点
3. 如果因为队列为空而不能执行规则2，则搜索结束

### 广度优先搜索代码

1. 创建辅助队列

```Go
type QueueX struct {
  q     [MaxVertex]int
  front int
  rear  int
}

func newQueueX() *QueueX {
  return &QueueX{
    front: 0,
    rear:  -1,
  }
}

func (r *QueueX) insert(item int) {
  if r.rear == len(r.q)-1 {
    r.rear = -1
  }
  r.q[r.rear] = item
}

func (r *QueueX) remove() int {
  r.front++
  temp := r.q[r.front]
  if r.front == len(r.q) {
    r.front = 0
  }
  return temp
}

func (r *QueueX) isEmpty() bool {
  return r.rear+1 == r.front || (r.front+len(r.q)-1 == r.rear)
}
```

2. 广度优先搜索代码

```Go
func (g *Graph) bfs() {
  queueX := newQueueX()
  // 设置第一个节点
  g.vertexList[0].wasVisited = true
  // 打印
  g.displayVertex(0)
  // 插入
  queueX.insert(0)
  for !queueX.isEmpty() {
    // 拿到这个节点后，先迭代完这个节点所有节点，在向深度迭代
    remove := queueX.remove()
    vertex := g.getAdjUnvisitedVertex(remove)
    // 等到找不到的时候，从队列中拿出最新放进的元素
    for vertex != -1 {
      // 找到一个节点就进行处理
      g.vertexList[vertex].wasVisited = true
      g.displayVertex(vertex)
      queueX.insert(vertex)
      vertex = g.getAdjUnvisitedVertex(vertex)
    }
  }
  // 重置数据
  for _, itemValue := range g.vertexList {
    itemValue.wasVisited = false
  }
}
```
