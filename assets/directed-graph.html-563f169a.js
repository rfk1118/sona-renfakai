import{_ as a,V as s,W as c,X as e,a0 as n,Y as i,$ as r,F as t}from"./framework-5793c714.js";const o={},v=r('<h1 id="有向图" tabindex="-1"><a class="header-anchor" href="#有向图" aria-hidden="true">#</a> 有向图</h1><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><h3 id="有向图表示" tabindex="-1"><a class="header-anchor" href="#有向图表示" aria-hidden="true">#</a> 有向图表示</h3>',3),u={class:"hint-container tip"},h=e("p",{class:"hint-container-title"},"提示",-1),m={href:"https://book.douban.com/subject/1144007/",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"为了获取学位，需要学会写作和研讨会，高级研讨会需要先学习解析几何，解析几何又需要几何和代数知识。",-1),g=e("h3",{id:"有向图与无向图的区别",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#有向图与无向图的区别","aria-hidden":"true"},"#"),n(" 有向图与无向图的区别")],-1),x=e("p",null,"需要在边上增加方向",-1),f=e("ul",null,[e("li",null,"有向图")],-1),_=e("ul",null,[e("li",null,"无向图")],-1),p=r('<h2 id="存储方式" tabindex="-1"><a class="header-anchor" href="#存储方式" aria-hidden="true">#</a> 存储方式</h2><h3 id="邻接矩阵" tabindex="-1"><a class="header-anchor" href="#邻接矩阵" aria-hidden="true">#</a> 邻接矩阵</h3><p>在邻接矩阵中行A列B是连通的，但是列B行A是非连通的</p><table><thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>A</td><td>0</td><td>1</td><td>0</td></tr><tr><td>B</td><td>0</td><td>0</td><td>1</td></tr><tr><td>C</td><td>0</td><td>0</td><td>0</td></tr></tbody></table><h3 id="邻接表" tabindex="-1"><a class="header-anchor" href="#邻接表" aria-hidden="true">#</a> 邻接表</h3><p>在邻接表中A中包含了B，但是B中没有包含A</p><table><thead><tr><th>顶点</th><th style="text-align:center;">包含邻接顶点的链表</th></tr></thead><tbody><tr><td>A</td><td style="text-align:center;">B</td></tr><tr><td>B</td><td style="text-align:center;">C</td></tr><tr><td>C</td><td style="text-align:center;"></td></tr></tbody></table><h3 id="拓扑排序" tabindex="-1"><a class="header-anchor" href="#拓扑排序" aria-hidden="true">#</a> 拓扑排序</h3><ol><li>找到一个没有后继的顶点</li><li>从图中删除这个顶点，在列表的前面插入顶点的标记</li></ol><h3 id="环和树" tabindex="-1"><a class="header-anchor" href="#环和树" aria-hidden="true">#</a> 环和树</h3>',10),V=e("code",null,"B-C-D-B",-1),w=e("code",null,"maven",-1),A={href:"https://book.douban.com/subject/30333919/",target:"_blank",rel:"noopener noreferrer"},B=r(`<p>计算无向图是否存在环，仅仅需要判断边是否等于顶点个数-1，看到这里我在想如何判断有向图是否有环呢？</p><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><ol><li>找到一个没有后继的顶点，如果有一条边A指向B，那么B是A的后继</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// 查找后继续节点
func (g *Graph) noSuccessors() int {
  var isEdge bool
  vertex := g.nVertex
  for row := 0; row &lt; vertex; row++ {
    isEdge = false
    for col := 0; col &lt; vertex; col++ {
      if g.adjMat[row][col] &gt; 0 {
        isEdge = true
        break
      }
    }
    if !isEdge {
      return row
    }
  }
  return -1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>删除顶点</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (g *Graph) deleteVertex(delVel int) {
  if delVel != g.nVertex-1 {
    // 删除节点
    for j := delVel; j &lt; g.nVertex-1; j++ {
      g.vertexList[j] = g.vertexList[j+1]
    }
    // 删除连接，主要处理行
    for row := delVel; row &lt; g.nVertex-1; row++ {
      g.moveRowUp(row, g.nVertex)
    }
    // 删除连接，处理列
    for col := delVel; col &lt; g.nVertex-1; col++ {
      g.moveColLeft(col, g.nVertex)
    }
  }
  g.nVertex = g.nVertex - 1
}

// 行向上移动
func (g *Graph) moveRowUp(row int, length int) {
  for col := 0; col &lt; length; col++ {
    g.adjMat[row][col] = g.adjMat[row+1][col]
  }
}
// 列向左移动
func (g *Graph) moveColLeft(col int, length int) {
  for row := 0; row &lt; length; row++ {
    g.adjMat[row][col] = g.adjMat[row][col+1]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>拓扑排序</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (g *Graph) topo() {
  var st [MaxVertex]rune
  vertex := g.nVertex
  for vertex &gt; 0 {
    currentNode := g.noSuccessors()
    // 有环
    if currentNode == vertex-1 {
      fmt.Println(&quot;error graph have cycles&quot;)
      return
    }
    st[g.nVertex-1] = g.vertexList[currentNode].label
    g.deleteVertex(currentNode)
  }

  // 打印要处理的数据
  fmt.Println(&quot;sort order&quot;)
  for _, r := range st {
    fmt.Println(r)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function C(G,y){const l=t("ExternalLinkIcon"),d=t("Mermaid");return s(),c("div",null,[v,e("div",u,[h,e("p",null,[n("案例来自"),e("a",m,[n("《Java数据结构和算法第二版》"),i(l)])])]),b,i(d,{id:"mermaid-17",code:"eJxLy8kvT85ILCpR8AniUgACRw3HJ7sXP5u6QVNBV9dOwUXD5eXqGc/XdgJFnq5dpglW46Th9LR9wZO9UyFqXDVcXyxf/GzeBKggxByIFJjtAma7a7hDjHq+YMqLdSue7JkFUekKkQWznTWcX3RvfDat/WnbzCd752iCZNw03J6tn/JiXzNIGOYEd7AmDw0PoMiTvb0QQTeIIBcAXHlSmA=="}),g,x,f,i(d,{id:"mermaid-31",code:"eJxLy8kvT85ILCpR8AniUgACRwVdXTsFJzDbCcx25gIAwKIIXw=="}),_,i(d,{id:"mermaid-39",code:"eJxLy8kvT85ILCpR8AniUgACRwVdXV0FJzDbCcx25gIAv04IPQ=="}),p,e("p",null,[V,n("就是一个环，其实在"),w,n("里面就是循环依赖(可参考"),e("a",A,[n("《架构整洁之道》消除循环依赖"),i(l)]),n(")，在架构里是不允许出现的一种形态。")]),i(d,{id:"mermaid-176",code:"eJxLy8kvT85ILCpR8AniUgACRwVdXTsFJyS2M5jthMR2BrNdwGwXqHoAVrEOFg=="}),B])}const k=a(o,[["render",C],["__file","directed-graph.html.vue"]]);export{k as default};
