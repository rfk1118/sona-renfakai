import{_ as p,V as c,W as o,Y as e,X as n,a0 as s,$ as a,F as i}from"./framework-fd210779.js";const u="/assets/graph-wiki-f6799d46.png",r="/assets/graph-con-cf5d9dfc.jpg",d="/assets/graph-list-a7e074d1.png",k="/assets/graph-array-69ca6481.jpg",v={},m=a('<h1 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h1><ul><li>一种抽象的方式表达节点(也叫顶点)和边的连接方式</li><li>我们使用1～n标记节点</li><li>m条边连接一些节点 <ul><li>边可以是单向（有向）或双向</li></ul></li><li>节点和边可以有一些辅助信息</li></ul><p><img src="'+u+'" alt="An image"></p><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2><ul><li>最短路径问题</li><li>网络流量问题</li><li>匹配问题</li><li><code>2-SAT</code>问题</li><li>图着色问题</li><li>旅行商问题（TSP）：仍未解决！</li><li>其他等等</li></ul><h2 id="术语" tabindex="-1"><a class="header-anchor" href="#术语" aria-hidden="true">#</a> 术语</h2><h3 id="顶点" tabindex="-1"><a class="header-anchor" href="#顶点" aria-hidden="true">#</a> 顶点</h3><p>顶点，也就是节点</p><h3 id="度" tabindex="-1"><a class="header-anchor" href="#度" aria-hidden="true">#</a> 度</h3><ul><li>顶点的入度，表示有多少条边指向这个顶点</li><li>顶点的出度，表示有多少条边是以这个顶点为起点指向其他顶点</li></ul><h3 id="邻接" tabindex="-1"><a class="header-anchor" href="#邻接" aria-hidden="true">#</a> 邻接</h3><p>邻接，如果两个顶点被同一个边连接，就称这两个顶点是邻接的。</p><h3 id="路径" tabindex="-1"><a class="header-anchor" href="#路径" aria-hidden="true">#</a> 路径</h3><p>路径，边的序列，例如图中显示了一条从 B 到顶点 J 的路径，这条路径通过了顶点 A 和顶点 E，这条路径叫做 BAEJ。这两个顶点之间还有其他路径，从 B 到 J 的另外一个路径是 BCDJ。</p><p><img src="'+r+'" alt="An image"></p><h3 id="连通图" tabindex="-1"><a class="header-anchor" href="#连通图" aria-hidden="true">#</a> 连通图</h3><p>连通图，如果至少有一条路径可以连接起所有的顶点，那么这个图就被称为连通的。如果没有这样一条路径，就被称为非连通的。</p><ul><li>非连通的子图可以是连通的。</li><li>连通</li></ul>',18),b=n("ul",null,[n("li",null,"非连通")],-1),h=a('<ul><li>连通无环图 <ul><li>一类最重要的特殊图 <ul><li>许多问题在树上更容易解决</li></ul></li><li>其他等效定义： <ul><li>连通图需要n-1条边</li><li>连通无环图需要n-1条边</li><li>每对节点之间只有一条路径</li><li>连通无环图增加一条边就会有环</li><li>连通图去掉一条边就不再连通</li></ul></li></ul></li><li>有向连通无环图 <ul><li>有向连通无环图(DAG):名字已经说的很清楚 <ul><li>等价于节点的有序</li></ul></li></ul></li><li>二部图 <ul><li>节点可以分为两组S和T，这样边只存在于S和T之间（S内或T内没有边）</li></ul></li></ul><h3 id="有向图和无向图" tabindex="-1"><a class="header-anchor" href="#有向图和无向图" aria-hidden="true">#</a> 有向图和无向图</h3><ol><li>可以任意一边到另一边，比如公路上没有设定方向，可以从 <code>A-&gt;B，B-&gt;A</code></li><li>有向图就像公路上的双向道</li></ol><ul><li>设定 <code>A-&gt;B , B-&gt;A</code> ，等价于无向图</li><li>设定 <code>A-&gt;B</code> ，则 <code>B-&gt;A</code> 等于在单行道上逆行</li><li>设定 <code>B-&gt;A</code> ，则 <code>A-&gt;B</code> 等于在单行道上逆行</li></ul><h3 id="有权图和无权图" tabindex="-1"><a class="header-anchor" href="#有权图和无权图" aria-hidden="true">#</a> 有权图和无权图</h3><ul><li>有权图代表着每一条边都不一样，例如不同距离高速收费不同</li><li>无权图代表每条边都是等价的</li></ul><h2 id="存储方式" tabindex="-1"><a class="header-anchor" href="#存储方式" aria-hidden="true">#</a> 存储方式</h2><ul><li>保存集合节点V和集合边E <ul><li>节点可以存储到数组中</li><li>边必须使用其他方式存储</li></ul></li><li>需要支持的操作 <ul><li>检索与特定节点关联的所有边</li><li>检验两个节点是否可以连接</li></ul></li><li>使用邻接矩阵或者邻接列表存储边</li></ul><h3 id="邻接矩阵" tabindex="-1"><a class="header-anchor" href="#邻接矩阵" aria-hidden="true">#</a> 邻接矩阵</h3>',9),g=n("ul",null,[n("li",null,[s("一种简单的方式存储连接信息 "),n("ul",null,[n("li",null,"检验两个基点是否连接的时间负责度:O(1)")])]),n("li",null,[s("使用 n * n 矩阵 A "),n("ul",null,[n("li",null,[n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msub",null,[n("mi",null,"a"),n("mrow",null,[n("mi",null,"i"),n("mi",null,"j")])])]),n("annotation",{encoding:"application/x-tex"},"a_{ij}")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.7167em","vertical-align":"-0.2861em"}}),n("span",{class:"mord"},[n("span",{class:"mord mathnormal"},"a"),n("span",{class:"msupsub"},[n("span",{class:"vlist-t vlist-t2"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.3117em"}},[n("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},[n("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05724em"}},"ij")])])])]),n("span",{class:"vlist-s"},"​")]),n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.2861em"}},[n("span")])])])])])])])]),s("= 1 代表从i到j有边")]),n("li",null,[n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msub",null,[n("mi",null,"a"),n("mrow",null,[n("mi",null,"i"),n("mi",null,"j")])])]),n("annotation",{encoding:"application/x-tex"},"a_{ij}")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.7167em","vertical-align":"-0.2861em"}}),n("span",{class:"mord"},[n("span",{class:"mord mathnormal"},"a"),n("span",{class:"msupsub"},[n("span",{class:"vlist-t vlist-t2"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.3117em"}},[n("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},[n("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05724em"}},"ij")])])])]),n("span",{class:"vlist-s"},"​")]),n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.2861em"}},[n("span")])])])])])])])]),s("= 0 代表从i到j无边")])])]),n("li",null,[s("使用空间O("),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msup",null,[n("mi",null,"n"),n("mn",null,"2")])]),n("annotation",{encoding:"application/x-tex"},"n^2")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.8141em"}}),n("span",{class:"mord"},[n("span",{class:"mord mathnormal"},"n"),n("span",{class:"msupsub"},[n("span",{class:"vlist-t"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.8141em"}},[n("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},"2")])])])])])])])])])]),s(")内存 "),n("ul",null,[n("li",null,"当n比较小的时候适合使用"),n("li",null,"稠密图比较适合")])])],-1),w=a('<table><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th style="text-align:right;">D</th></tr></thead><tbody><tr><td>A</td><td>0</td><td>1</td><td>1</td><td style="text-align:right;">1</td></tr><tr><td>B</td><td>1</td><td>0</td><td>0</td><td style="text-align:right;">0</td></tr><tr><td>C</td><td>1</td><td>0</td><td>0</td><td style="text-align:right;">0</td></tr><tr><td>D</td><td>1</td><td>1</td><td>0</td><td style="text-align:right;">0</td></tr></tbody></table><h3 id="邻接表" tabindex="-1"><a class="header-anchor" href="#邻接表" aria-hidden="true">#</a> 邻接表</h3><ul><li>每一个节点都有向外的边 <ul><li>容易迭代某个顶点上的边</li><li>列表长度可变</li><li>空间使用O(n + m)</li></ul></li></ul><p><img src="'+d+'" alt="An image"></p><h4 id="邻接表实现" tabindex="-1"><a class="header-anchor" href="#邻接表实现" aria-hidden="true">#</a> 邻接表实现</h4><ol><li>使用链表 <ol><li>内存/时间开销过大</li><li>使用动态分配内存或指针性能好不好</li></ol></li><li>使用矢量数组 <ol><li>易于编码，没有内存问题</li><li>但是很慢</li></ol></li><li>使用数组(!) <ol><li>假定总边是知道的</li><li>速度非常快，内存效率也很高</li></ol></li></ol><h4 id="邻接表数组优化" tabindex="-1"><a class="header-anchor" href="#邻接表数组优化" aria-hidden="true">#</a> 邻接表数组优化</h4><p><img src="'+k+`" alt="An image"></p><h4 id="邻接表数组实现" tabindex="-1"><a class="header-anchor" href="#邻接表数组实现" aria-hidden="true">#</a> 邻接表数组实现</h4><ul><li>使用两个数组，并且数组E的长度问m，数组LE的长度为n <ul><li>E包含所有的边</li><li>LE包含开始的顶点和边列表</li></ul></li><li>对于数组全部初始化初始化<code>LE[i]= -1</code><ul><li><code>LE[i]=0</code> 如果数组是1索引也可以</li></ul></li><li>插入一个边从u-&gt;v，并使用ID=k <ul><li>E[k].to = v</li><li>E[k].nextID = LE[u]</li><li>LE[u] = k</li></ul></li><li>迭代从u开始的所有边</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token constant">ID</span> <span class="token operator">=</span> <span class="token constant">LE</span><span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token constant">ID</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token constant">ID</span> <span class="token operator">=</span> <span class="token class-name">E</span><span class="token punctuation">[</span><span class="token constant">ID</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nextID<span class="token punctuation">)</span>
       <span class="token comment">// E[ID] is an edge starting from u</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>一旦构建，就很难修改边 <ul><li>图必须是静态的</li><li>增加边很难</li></ul></li></ul><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><h3 id="邻接矩阵代码" tabindex="-1"><a class="header-anchor" href="#邻接矩阵代码" aria-hidden="true">#</a> 邻接矩阵代码</h3><ol><li>编写顶点</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>type Vertex struct {
  // 这里是数据，后面可以转换成对象
  label rune
  // 是否访问过，在遍历的时候很有用
  wasVisited bool
}

func newVertex(label rune) *Vertex {
  return &amp;Vertex{label: label, wasVisited: false}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>图结构和初始化图</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">const</span> <span class="token class-name">MaxVertex</span> <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">20</span>
<span class="token keyword">const</span> <span class="token class-name">LINK</span> <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">1</span>

type <span class="token class-name">Graph</span> struct <span class="token punctuation">{</span>
  vertexList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token class-name">Vertex</span>
  adjMat     <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">int</span>
  nVertex    <span class="token keyword">int</span>
<span class="token punctuation">}</span>

func <span class="token function">newGraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span><span class="token class-name">Graph</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&amp;</span><span class="token class-name">Graph</span><span class="token punctuation">{</span>
    vertexList<span class="token operator">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token class-name">Vertex</span><span class="token punctuation">,</span> <span class="token class-name">MaxVertex</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    adjMat<span class="token operator">:</span>     <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token class-name">MaxVertex</span><span class="token punctuation">,</span> <span class="token class-name">MaxVertex</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    nVertex<span class="token operator">:</span>    <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>新增顶点</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (g *Graph) addVertex(label rune) {
  g.nVertex++
  g.vertexList[g.nVertex] = newVertex(label)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>连接边</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (g *Graph) addEdge(start, end int) {
  g.adjMat[start][end] = LINK
  g.adjMat[end][start] = LINK
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="邻接表代码" tabindex="-1"><a class="header-anchor" href="#邻接表代码" aria-hidden="true">#</a> 邻接表代码</h3>`,23),y={class:"hint-container tip"},x=n("p",{class:"hint-container-title"},"提示",-1),f={href:"https://algs4.cs.princeton.edu/41graph/Graph.java.html",target:"_blank",rel:"noopener noreferrer"},j=a(`<ol><li>数据表现</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token operator">*</span>  <span class="token operator">%</span> java <span class="token class-name">Graph</span> tinyG<span class="token punctuation">.</span>txt
 <span class="token operator">*</span>  <span class="token number">13</span> vertices<span class="token punctuation">,</span> <span class="token number">13</span> edges
 <span class="token operator">*</span>  <span class="token number">0</span><span class="token operator">:</span> <span class="token number">6</span> <span class="token number">2</span> <span class="token number">1</span> <span class="token number">5</span>
 <span class="token operator">*</span>  <span class="token number">1</span><span class="token operator">:</span> <span class="token number">0</span>
 <span class="token operator">*</span>  <span class="token number">2</span><span class="token operator">:</span> <span class="token number">0</span>
 <span class="token operator">*</span>  <span class="token number">3</span><span class="token operator">:</span> <span class="token number">5</span> <span class="token number">4</span>
 <span class="token operator">*</span>  <span class="token number">4</span><span class="token operator">:</span> <span class="token number">5</span> <span class="token number">6</span> <span class="token number">3</span>
 <span class="token operator">*</span>  <span class="token number">5</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">0</span>
 <span class="token operator">*</span>  <span class="token number">6</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token number">4</span>
 <span class="token operator">*</span>  <span class="token number">7</span><span class="token operator">:</span> <span class="token number">8</span>
 <span class="token operator">*</span>  <span class="token number">8</span><span class="token operator">:</span> <span class="token number">7</span>
 <span class="token operator">*</span>  <span class="token number">9</span><span class="token operator">:</span> <span class="token number">11</span> <span class="token number">10</span> <span class="token number">12</span>
 <span class="token operator">*</span>  <span class="token number">10</span><span class="token operator">:</span> <span class="token number">9</span>
 <span class="token operator">*</span>  <span class="token number">11</span><span class="token operator">:</span> <span class="token number">9</span> <span class="token number">12</span>
 <span class="token operator">*</span>  <span class="token number">12</span><span class="token operator">:</span> <span class="token number">11</span> <span class="token number">9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),I={start:"2"},V={href:"https://algs4.cs.princeton.edu/13stacks/Bag.java.html",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"List",-1),E=a(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bag</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> first<span class="token punctuation">;</span>    <span class="token comment">// beginning of bag</span>
  <span class="token keyword">private</span> <span class="token keyword">int</span> n<span class="token punctuation">;</span>               <span class="token comment">// number of elements in bag</span>

  <span class="token comment">// helper linked list class</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
      <span class="token keyword">private</span> <span class="token class-name">Item</span> item<span class="token punctuation">;</span>
      <span class="token keyword">private</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Bag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      first <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> first <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 数量</span>
  <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> n<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 增加元素</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Item</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> oldfirst <span class="token operator">=</span> first<span class="token punctuation">;</span>
      first <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      first<span class="token punctuation">.</span>item <span class="token operator">=</span> item<span class="token punctuation">;</span>
      first<span class="token punctuation">.</span>next <span class="token operator">=</span> oldfirst<span class="token punctuation">;</span>
      n<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> <span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">LinkedIterator</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 迭代器设计模式</span>
  <span class="token comment">// an iterator, doesn&#39;t implement remove() since it&#39;s optional</span>
  <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">LinkedIterator</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
      <span class="token keyword">private</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> current<span class="token punctuation">;</span>

      <span class="token keyword">public</span> <span class="token class-name">LinkedIterator</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span> first<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          current <span class="token operator">=</span> first<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span> <span class="token keyword">return</span> current <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>                     <span class="token punctuation">}</span>
      <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>      <span class="token punctuation">{</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token punctuation">}</span>

      <span class="token keyword">public</span> <span class="token class-name">Item</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token class-name">Item</span> item <span class="token operator">=</span> current<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
          current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
          <span class="token keyword">return</span> item<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>无向图的顶点命名从0～n（n = V-1)</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Graph</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NEWLINE</span> <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 命名从0～n，顶点</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token class-name">V</span><span class="token punctuation">;</span>
  <span class="token comment">// 边</span>
  <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token class-name">E</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">Bag</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> adj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>无向图有两个主要的操作 <ol><li>增加一个边到图中</li></ol></li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addEdge</span><span class="token punctuation">(</span><span class="token keyword">int</span> v<span class="token punctuation">,</span> <span class="token keyword">int</span> w<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">validateVertex</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">validateVertex</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">E</span><span class="token operator">++</span><span class="token punctuation">;</span>
  adj<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">;</span>
  adj<span class="token punctuation">[</span>w<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>从一个顶点迭代所有相邻的顶点</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> <span class="token function">adj</span><span class="token punctuation">(</span><span class="token keyword">int</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">validateVertex</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> adj<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>返回顶点的度</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">degree</span><span class="token punctuation">(</span><span class="token keyword">int</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">validateVertex</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> adj<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>查看顶点数量</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
* 返回这个图中顶点的数量
* Returns the number of vertices in this graph.
*
* <span class="token keyword">@return</span> the number of vertices in this graph
*/</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token class-name">V</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token class-name">V</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>查看边数量</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
  * Returns the number of edges in this graph.
  *
  * <span class="token keyword">@return</span> the number of edges in this graph
  */</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token class-name">E</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token class-name">E</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>初始化图</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>public Graph(int V) {
  if (V &lt; 0) throw new IllegalArgumentException(&quot;Number of vertices must be non-negative&quot;);
  this.V = V;
  this.E = 0;
  // 数组长度为V
  adj = (Bag&lt;Integer&gt;[]) new Bag[V];
  // 数组全部初始化
  for (int v = 0; v &lt; V; v++) {
      adj[v] = new Bag&lt;Integer&gt;();
  }
}

public Graph(In in) {
  if (in == null) throw new IllegalArgumentException(&quot;argument is null&quot;);
  try {
      // 数组数量
      this.V = in.readInt();
      if (V &lt; 0) throw new IllegalArgumentException(&quot;number of vertices in a Graph must be non-negative&quot;);
      // 初始化
      adj = (Bag&lt;Integer&gt;[]) new Bag[V];
      for (int v = 0; v &lt; V; v++) {
          adj[v] = new Bag&lt;Integer&gt;();
      }
      // 图的边
      int E = in.readInt();
      if (E &lt; 0) throw new IllegalArgumentException(&quot;number of edges in a Graph must be non-negative&quot;);
      for (int i = 0; i &lt; E; i++) {
          // 连通两个边
          int v = in.readInt();
          int w = in.readInt();
          validateVertex(v);
          validateVertex(w);
          // v w 连通
          addEdge(v, w);
      }
  }
  catch (NoSuchElementException e) {
      throw new IllegalArgumentException(&quot;invalid input format in Graph constructor&quot;, e);
  }
}

// 原型设计模式，深克隆
public Graph(Graph G) {
  this.V = G.V();
  this.E = G.E();
  if (V &lt; 0) throw new IllegalArgumentException(&quot;Number of vertices must be non-negative&quot;);

  // 初始化
  // update adjacency lists
  adj = (Bag&lt;Integer&gt;[]) new Bag[V];
  for (int v = 0; v &lt; V; v++) {
      adj[v] = new Bag&lt;Integer&gt;();
  }

  for (int v = 0; v &lt; G.V(); v++) {
      // reverse so that adjacency list is in same order as original
      // 反转原来数据
      Stack&lt;Integer&gt; reverse = new Stack&lt;Integer&gt;();
      for (int w : G.adj[v]) {
          reverse.push(w);
      }
      // 数据增加到bag中
      for (int w : reverse) {
          adj[v].add(w);
      }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15);function B(G,A){const t=i("Mermaid"),l=i("ExternalLinkIcon");return c(),o("div",null,[m,e(t,{id:"mermaid-132",code:"eJxLL0osyFDwCeJSAIJEBQVdXV0FhSQwLwnKSwHzUqC8RBSVyVwAuMQMMQ=="}),b,e(t,{id:"mermaid-140",code:"eJxLL0osyFDwCeJSAIJEBQVdXV0FhSQwLxnKS+ECAKNBB4c="}),h,g,w,n("div",y,[x,n("p",null,[s("代码来源于"),n("a",f,[s("算法4"),e(l)]),s("，源码使用邻接表方式编写。")])]),j,n("ol",I,[n("li",null,[s("基础代码，后面使用的"),n("a",V,[s("Bag"),e(l)]),s("其实也就是"),_,s("。")])]),E])}const N=p(v,[["render",B],["__file","graph-concept.html.vue"]]);export{N as default};
