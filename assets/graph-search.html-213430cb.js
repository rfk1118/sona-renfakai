import{_ as d,V as r,W as a,Y as e,Z as s,$ as l,a1 as i,a0 as v,F as u}from"./framework-1bd9c91b.js";const c={},t=e("h1",{id:"搜索",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#搜索","aria-hidden":"true"},"#"),i(" 搜索")],-1),m=e("ul",null,[e("li",null,"按一定顺序访问图中节点的基本算法"),e("li",null,"在许多其他算法中用作子程序")],-1),b=e("h2",{id:"搜索方式",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#搜索方式","aria-hidden":"true"},"#"),i(" 搜索方式")],-1),o=v(`<h2 id="深度优先搜索" tabindex="-1"><a class="header-anchor" href="#深度优先搜索" aria-hidden="true">#</a> 深度优先搜索</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Depth-First Search (DFS): uses recursion (stack)</p></div><ol><li>如果可能，访问一个邻接的未访问节点，标记它，并把它放到栈内</li><li>当不能执行规则1时，如果栈不为空，就从栈内中弹出一个顶点</li><li>如果不能执行规则1和规则2，就完成了整个搜索过程</li></ol><h3 id="深度优先搜索代码" tabindex="-1"><a class="header-anchor" href="#深度优先搜索代码" aria-hidden="true">#</a> 深度优先搜索代码</h3><ol><li>使用辅助栈</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>type StackX struct {
  st       [MaxVertex]int
  topIndex int
}

func newStackX() *StackX {
  return &amp;StackX{
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>图中新增打印</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// 打印第n个数据
func (g *Graph) displayVertex(v int) {
  fmt.Println(g.vertexList[v].label)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>深度优先搜索</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// 深度优先搜索
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="广度优先搜索" tabindex="-1"><a class="header-anchor" href="#广度优先搜索" aria-hidden="true">#</a> 广度优先搜索</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Breadth-First Search (BFS): uses queue</p></div><ol><li>访问下一个未来访问的邻接点（如果存在），这个顶点必须是当前顶点的邻接点，标记它，并将它插入到队列中</li><li>如果因为已经没有未访问节点而不能执行规则1，那么从队列头取一个顶点（如果存在），并使其成为当前节点</li><li>如果因为队列为空而不能执行规则2，则搜索结束</li></ol><h3 id="广度优先搜索代码" tabindex="-1"><a class="header-anchor" href="#广度优先搜索代码" aria-hidden="true">#</a> 广度优先搜索代码</h3><ol><li>创建辅助队列</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>type QueueX struct {
  q     [MaxVertex]int
  front int
  rear  int
}

func newQueueX() *QueueX {
  return &amp;QueueX{
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>广度优先搜索代码</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (g *Graph) bfs() {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18);function h(p,x){const n=u("RouterLink");return r(),a("div",null,[t,m,b,e("ul",null,[e("li",null,[s(n,{to:"/basic-skill/algorithms/graphs/graph-search.html#%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2"},{default:l(()=>[i("深度优先搜索")]),_:1})]),e("li",null,[s(n,{to:"/basic-skill/algorithms/graphs/graph-search.html#%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2"},{default:l(()=>[i("广度优先搜索")]),_:1})])]),o])}const f=d(c,[["render",h],["__file","graph-search.html.vue"]]);export{f as default};
