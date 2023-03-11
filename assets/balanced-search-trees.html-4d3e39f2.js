import{_ as o,V as c,W as i,Y as n,a1 as a,Z as t,X as s,a0 as p,F as l}from"./framework-e54e0297.js";const u="/assets/23tree-anatomy-3f21ca2e.png",r="/assets/23tree-search-bd14bafe.png",k="/assets/23tree-insert2-bcd56f7d.png",d="/assets/23tree-insert3a-9c86c929.png",m="/assets/23tree-insert3b-24fad901.png",v="/assets/23tree-insert3c-c041d9f0.png",b="/assets/23tree-split-8129cb1d.png",h="/assets/23tree-random-d9c74cb2.png",y={},f={id:"_2-3-搜索树",tabindex:"-1"},w=n("a",{class:"header-anchor",href:"#_2-3-搜索树","aria-hidden":"true"},"#",-1),g={href:"https://algs4.cs.princeton.edu/33balanced/",target:"_blank",rel:"noopener noreferrer"},N=n("p",null,"在本节中，我们将介绍一种二叉搜索树，其中成本保证为对数。我们的树具有近乎完美的平衡，高度保证不超过2 lg N",-1),_=n("h3",{id:"_2-3-search-trees",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-3-search-trees","aria-hidden":"true"},"#"),a(" 2-3 search trees")],-1),I=n("p",null,"要获得保证搜索树平衡所需的灵活性，主要步骤是允许树中的节点持有多个key",-1),T=n("p",null,"定义一个2-3搜索树是一棵树或者是空的",-1),x=n("ul",null,[n("li",null,"一个2节点，具有一个键（和相关值）和两个链接，左链接到具有较小键的2-3搜索树，右链接到具有较大键的2-3搜索树"),n("li",null,"一个3节点，具有两个键（和关联值）和三个链接，左链接到具有较小键的2-3搜索树，中间链接到具有节点键之间键的2-3搜索树，右链接到具有较大键的2-3搜索树。")],-1),j=n("div",{style:{"text-align":"center"}},[n("p",null,[n("img",{src:u,alt:"An image"})])],-1),C=n("p",null,"一个完全平衡的2-3搜索树（简称2-3树）是指其空链接距离根相同的树。",-1),D=p('<ul><li>搜索，为了确定一个键是否在2-3树中，我们将它与根上的键进行比较：如果它等于其中任何一个，我们就有一个搜索命中；否则，我们遵循从根到子树的链接，该子树对应于可能包含搜索键的键值间隔，然后在该子树中递归搜索。</li></ul><div style="text-align:center;"><p><img src="'+r+'" alt="An image"></p></div><ul><li>插入到2节点中。要在2-3树中插入一个新节点，我们可能会执行一次不成功的搜索，然后在底部的节点上挂接，就像我们在BST中所做的那样，但新树不会保持完全平衡。如果搜索终止的节点是2节点，则很容易保持完美平衡：我们只需将节点替换为包含其key和要插入的key的3节点。</li></ul><div style="text-align:center;"><p><img src="'+k+'" alt="An image"></p></div><ul><li>插入到由单个3节点组成的树中。假设我们想插入一个只有一个3节点的2-3树。这样的树有两个键，但在其一个节点中没有空间放置新键。为了能够执行插入，我们临时将新键放入一个4节点，这是节点类型的自然扩展，具有三个键和四个链接。创建4节点很方便，因为很容易将其转换为由三个2节点组成的2-3树，一个具有中间键（在根处），一个具有三个键中最小的键（由根的左链接指向），另一个具有三个键中最大的键（由根的右链接指向）。</li></ul><div style="text-align:center;"><p><img src="'+d+'" alt="An image"></p></div><ul><li>插入到其父节点为2节点的3节点中。假设搜索结束于底部的3节点，其父节点为2节点。在这种情况下，我们仍然可以为新的关键点腾出空间，同时保持树中的完美平衡，方法是创建一个临时的4节点（如前所述），然后拆分4节点（如前所述），但不创建一个新节点来保存中间关键点，而是将中间关键点移动到父节点。</li></ul><div style="text-align:center;"><p><img src="'+m+'" alt="An image"></p></div><ul><li>插入到其父节点为3节点的3节点中。现在假设搜索在其父节点为3节点的节点处结束。同样，我们创建了一个临时的4节点，如前所述，然后将其拆分并将其中间键插入父节点。父节点是一个3节点，因此我们将其替换为一个临时的新4节点，其中包含来自4节点拆分的中间键。然后，我们在该节点上执行完全相同的转换。也就是说，我们拆分新的4节点，并将其中间键插入其父节点。扩展到一般情况是很清楚的：我们继续沿着树向上，拆分4个节点并将它们的中间键插入它们的父节点，直到到达2个节点，我们将其替换为不需要进一步拆分的3个节点，或者直到到达根节点的3个节点。</li></ul><div style="text-align:center;"><p><img src="'+v+'" alt="An image"></p></div><ul><li>切根。如果在从插入点到根的整个路径上有3个节点，那么最终在根上有一个临时4节点。在本例中，我们将临时4节点拆分为三个2节点。</li></ul><div style="text-align:center;"><p><img src="'+b+'" alt="An image"></p></div><ul><li><p>局部变换。2-3树插入算法的基础是所有这些转换都是纯局部的：除了指定的节点和链接之外，不需要检查或修改2-3树的任何部分。每个变换更改的链接数由一个小常量限定。每个转换都会将一个关键点从4节点向上传递到树中的父节点，然后相应地重新构造链接，而不会触及树的任何其他部分。</p></li><li><p>全局属性。这些局部转换保留了树的有序和平衡的全局属性：从根到任何空链接的路径上的链接数是相同的。</p></li></ul><p>提议。在具有N个键的2-3树中的搜索和插入操作保证最多访问lgn个节点。</p><div style="text-align:center;"><p><img src="'+h+'" alt="An image"></p></div><p>然而，我们只是实现的一部分。尽管可以编写代码，在表示2节点和3节点的不同数据类型上执行转换，但我们所描述的大多数任务都不便于在这种直接表示中实现。</p><h4 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h4>',17),A={class:"hint-container tip"},V=n("p",{class:"hint-container-title"},"提示",-1),B={href:"https://book.douban.com/subject/1144007/",target:"_blank",rel:"noopener noreferrer"},L=p(`<ol><li>自定义数据</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// DataItem 定义一个内部数据</span>
<span class="token keyword">type</span> DataItem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 val <span class="token builtin">int</span>
<span class="token punctuation">}</span>
<span class="token comment">// 打印数据时候使用</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>DataItem<span class="token punctuation">)</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>定义node节点和相应功能</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// TreeNode node节点</span>
<span class="token keyword">type</span> TreeNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 numItems   <span class="token builtin">int</span>
 parent     <span class="token operator">*</span>TreeNode
 childArray <span class="token punctuation">[</span>order<span class="token punctuation">]</span><span class="token operator">*</span>TreeNode
 dataItems  <span class="token punctuation">[</span>order <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">*</span>DataItem
<span class="token punctuation">}</span>

<span class="token comment">// 连接一个子节点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">connectionChild</span><span class="token punctuation">(</span>childNum <span class="token builtin">int</span><span class="token punctuation">,</span> child <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 r<span class="token punctuation">.</span>childArray<span class="token punctuation">[</span>childNum<span class="token punctuation">]</span> <span class="token operator">=</span> child
 <span class="token keyword">if</span> <span class="token boolean">nil</span> <span class="token operator">!=</span> child <span class="token punctuation">{</span>
  child<span class="token punctuation">.</span>parent <span class="token operator">=</span> r
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 删除一个子节点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">disConnectionChild</span><span class="token punctuation">(</span>childNum <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>TreeNode <span class="token punctuation">{</span>
 node <span class="token operator">:=</span> r<span class="token punctuation">.</span>childArray<span class="token punctuation">[</span>childNum<span class="token punctuation">]</span>
 r<span class="token punctuation">.</span>childArray<span class="token punctuation">[</span>childNum<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">nil</span>
 <span class="token keyword">return</span> node
<span class="token punctuation">}</span>

<span class="token comment">// 获取第n个位置的孩子</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">getChild</span><span class="token punctuation">(</span>childNum <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>TreeNode <span class="token punctuation">{</span>
 <span class="token keyword">return</span> r<span class="token punctuation">.</span>childArray<span class="token punctuation">[</span>childNum<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// 获取父亲</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">getParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>TreeNode <span class="token punctuation">{</span>
 <span class="token keyword">return</span> r<span class="token punctuation">.</span>parent
<span class="token punctuation">}</span>

<span class="token comment">// 是否为叶子节点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">isLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> r<span class="token punctuation">.</span>childArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">// 是否满了</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> r<span class="token punctuation">.</span>numItems <span class="token operator">==</span> <span class="token punctuation">(</span>order <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 获取节点数量</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">getNumItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> r<span class="token punctuation">.</span>numItems
<span class="token punctuation">}</span>

<span class="token comment">// 获取节点数据</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">getDataItem</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>DataItem <span class="token punctuation">{</span>
 <span class="token keyword">return</span> r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// 查找元素</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">findItem</span><span class="token punctuation">(</span>key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
 <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> order<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果这里还没有填充跳过</span>
  <span class="token keyword">if</span> r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
   <span class="token keyword">break</span>
   <span class="token comment">// 如果数组中有一个值等于key,返回位置</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>val <span class="token operator">==</span> key <span class="token punctuation">{</span>
   <span class="token keyword">return</span> i
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 没有找到相等的</span>
 <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">insertDataItem</span><span class="token punctuation">(</span>newItem <span class="token operator">*</span>DataItem<span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
 <span class="token comment">// 增加一个元素</span>
 r<span class="token punctuation">.</span>numItems<span class="token operator">++</span>
 <span class="token comment">// 元素的key</span>
 newVal <span class="token operator">:=</span> newItem<span class="token punctuation">.</span>val
 <span class="token comment">// 从右边开始</span>
 <span class="token keyword">for</span> j <span class="token operator">:=</span> order <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span> j <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">--</span> <span class="token punctuation">{</span>
  <span class="token comment">// 还没插入元素，因为这里如果是一个4节点的树，也就是0，1，2，3肯定会分裂，所以这里的树只可能到0，1，2</span>
  <span class="token keyword">if</span> r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
   <span class="token keyword">continue</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   <span class="token comment">// 拿到最后当前数值</span>
   v <span class="token operator">:=</span> r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>val
   <span class="token comment">// 还没找到正确位置，后面元素肯定比现在都大，向后移动</span>
   <span class="token keyword">if</span> newVal <span class="token operator">&lt;</span> v <span class="token punctuation">{</span>
    r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 现在j+1已经被移动到了j+2</span>
    <span class="token comment">// 现在j比当前元素小，插入到j+1</span>
    r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> newItem
    <span class="token keyword">return</span> j <span class="token operator">+</span> <span class="token number">1</span>
   <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 没找到大于newItem位置，则插入到0位置</span>
 r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> newItem
 <span class="token keyword">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment">// 删除最大元素</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">removeDataItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>DataItem <span class="token punctuation">{</span>
 <span class="token comment">// 查找最大元素</span>
 item <span class="token operator">:=</span> r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>r<span class="token punctuation">.</span>numItems<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
 <span class="token comment">// 删除引用</span>
 r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>r<span class="token punctuation">.</span>numItems<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">nil</span>
 <span class="token comment">// 元素个数减少</span>
 r<span class="token punctuation">.</span>numItems<span class="token operator">--</span>
 <span class="token comment">// 返回被移除的元素</span>
 <span class="token keyword">return</span> item
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token function">displayNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> r<span class="token punctuation">.</span>numItems<span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
  r<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>查找元素</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Tree234 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 root <span class="token operator">*</span>TreeNode
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t Tree234<span class="token punctuation">)</span> <span class="token function">find</span><span class="token punctuation">(</span>key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
 <span class="token comment">// 先拿到根节点</span>
 currentNode <span class="token operator">:=</span> t<span class="token punctuation">.</span>root
 <span class="token comment">// 先设置未找到</span>
 childNumber <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">1</span>
 <span class="token keyword">for</span> <span class="token boolean">true</span> <span class="token punctuation">{</span>
  <span class="token comment">// 从当前节点查找所有的item是否包含值</span>
  childNumber <span class="token operator">=</span> currentNode<span class="token punctuation">.</span><span class="token function">findItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token comment">// 找到了返回位置</span>
  <span class="token keyword">if</span> childNumber <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> childNumber
   <span class="token comment">// 如果是叶子节点，肯定不包含</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> currentNode<span class="token punctuation">.</span><span class="token function">isLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   <span class="token comment">// 找到下一个节点，然后在继续判断，也就是节点引用</span>
   currentNode <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">getNextNode</span><span class="token punctuation">(</span>currentNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">return</span> childNumber
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t Tree234<span class="token punctuation">)</span> <span class="token function">getNextNode</span><span class="token punctuation">(</span>node <span class="token operator">*</span>TreeNode<span class="token punctuation">,</span> key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>TreeNode <span class="token punctuation">{</span>
 i <span class="token operator">:=</span> <span class="token number">0</span>
 <span class="token comment">// 所有的元素</span>
 items <span class="token operator">:=</span> node<span class="token punctuation">.</span><span class="token function">getNumItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token comment">//  开始迭代，找到大于key的第一个节点，也就是最左边节点</span>
 <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> items<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> key <span class="token operator">&lt;</span> node<span class="token punctuation">.</span>dataItems<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>val <span class="token punctuation">{</span>
   <span class="token keyword">return</span> node<span class="token punctuation">.</span><span class="token function">getChild</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 走到这里说明全部走完，返回最右边的节点</span>
 <span class="token keyword">return</span> node<span class="token punctuation">.</span><span class="token function">getChild</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>插入元素</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">newDataItem</span><span class="token punctuation">(</span>key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>DataItem <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token operator">&amp;</span>DataItem<span class="token punctuation">{</span>
  val<span class="token punctuation">:</span> key<span class="token punctuation">,</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t Tree234<span class="token punctuation">)</span> <span class="token function">insert</span><span class="token punctuation">(</span>key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// 设置根节点</span>
 currentNode <span class="token operator">:=</span> t<span class="token punctuation">.</span>root
 <span class="token comment">// 创建一个数据节点</span>
 item <span class="token operator">:=</span> <span class="token function">newDataItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
 <span class="token keyword">for</span> <span class="token boolean">true</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果已经满了</span>
  <span class="token keyword">if</span> currentNode<span class="token punctuation">.</span><span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 分裂节点</span>
   t<span class="token punctuation">.</span><span class="token function">spilt</span><span class="token punctuation">(</span>currentNode<span class="token punctuation">)</span>
   <span class="token comment">// 找到父亲</span>
   parent <span class="token operator">:=</span> currentNode<span class="token punctuation">.</span><span class="token function">getParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token comment">// 找到正确节点</span>
   currentNode <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">getNextNode</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> currentNode<span class="token punctuation">.</span><span class="token function">isLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 叶子节点，跳出</span>
   <span class="token keyword">break</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   currentNode <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">getNextNode</span><span class="token punctuation">(</span>currentNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 当前节点插入数据</span>
 currentNode<span class="token punctuation">.</span><span class="token function">insertDataItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>Tree234<span class="token punctuation">)</span> <span class="token function">spilt</span><span class="token punctuation">(</span>node <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 itemIndex <span class="token operator">:=</span> <span class="token number">0</span>
 <span class="token comment">// 拿到最右边的数据</span>
 itemC <span class="token operator">:=</span> node<span class="token punctuation">.</span><span class="token function">removeDataItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token comment">// 中间节点数据</span>
 itemB <span class="token operator">:=</span> node<span class="token punctuation">.</span><span class="token function">removeDataItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token comment">// 右边数据的两个链接，这两个连接需要放到新node上</span>
 child2 <span class="token operator">:=</span> node<span class="token punctuation">.</span><span class="token function">disConnectionChild</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
 child3 <span class="token operator">:=</span> node<span class="token punctuation">.</span><span class="token function">disConnectionChild</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
 <span class="token comment">// 创建新的节点</span>
 newRight <span class="token operator">:=</span> <span class="token function">newTreeNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 parent <span class="token operator">:=</span> node
 <span class="token keyword">if</span> node <span class="token operator">==</span> t<span class="token punctuation">.</span>root <span class="token punctuation">{</span>
  <span class="token comment">// 创建新root</span>
  t<span class="token punctuation">.</span>root <span class="token operator">=</span> <span class="token function">newTreeNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  parent <span class="token operator">=</span> t<span class="token punctuation">.</span>root
  <span class="token comment">// 当前节点放到最左节点上，根节点与普通节点区别就是root设置和需要将当前节点放到最左边</span>
  t<span class="token punctuation">.</span>root<span class="token punctuation">.</span><span class="token function">connectionChild</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> node<span class="token punctuation">)</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  parent <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token function">getParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 中间数据上浮上去，这里itemIndex可能等于1或者2</span>
 itemIndex <span class="token operator">=</span> parent<span class="token punctuation">.</span><span class="token function">insertDataItem</span><span class="token punctuation">(</span>itemB<span class="token punctuation">)</span>
 <span class="token comment">// 总元素数量</span>
 items <span class="token operator">:=</span> parent<span class="token punctuation">.</span><span class="token function">getNumItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token comment">// 如果新插入的元素插入到了中间位置</span>
 <span class="token keyword">for</span> j <span class="token operator">:=</span> items <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&gt;</span> itemIndex<span class="token punctuation">;</span> j<span class="token operator">--</span> <span class="token punctuation">{</span>
  <span class="token comment">// 后面位置链接的数据需要向后移动</span>
  temp <span class="token operator">:=</span> parent<span class="token punctuation">.</span><span class="token function">disConnectionChild</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
  parent<span class="token punctuation">.</span><span class="token function">connectionChild</span><span class="token punctuation">(</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> temp<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 新节点，在其父亲的itemIndex+1处</span>
 parent<span class="token punctuation">.</span><span class="token function">connectionChild</span><span class="token punctuation">(</span>itemIndex<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> newRight<span class="token punctuation">)</span>
 <span class="token comment">// 新节点增加数据</span>
 newRight<span class="token punctuation">.</span><span class="token function">insertDataItem</span><span class="token punctuation">(</span>itemC<span class="token punctuation">)</span>
 <span class="token comment">// 连接数据</span>
 newRight<span class="token punctuation">.</span><span class="token function">connectionChild</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> child2<span class="token punctuation">)</span>
 newRight<span class="token punctuation">.</span><span class="token function">connectionChild</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> child3<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><ol><li>如果需要插入数据分配到叶子节点并且没有满的话，没有连接，直接插入数据即可</li><li>如果需要插入数据分配到不是叶子节点的话，继续递归下去找到叶子节点</li><li>如果在递归查找过程中遇到满节点，需要分裂 <ol><li>如果分裂的不是根节点 <ol><li>创建新节点，将最右边的数据和连接移动到新节点</li><li>将中间数据插入到父节点</li><li>最左侧节点保持不动</li></ol></li><li>如果分裂的不是根节点 <ol><li>创建新的节点1，并将根节点指向新节点1</li><li>将当前节点放到根节点左边</li><li>创建新节点2，将最右边的数据和连接移动到新节点2</li><li>将中间数据插入到父节点</li></ol></li></ol></li></ol>`,10);function P(R,S){const e=l("ExternalLinkIcon");return c(),i("div",null,[n("h1",f,[w,a(),n("a",g,[a("2-3-搜索树"),t(e)])]),s(" We introduce in this section a type of binary search tree where costs are guaranteed to be logarithmic. Our trees have near-perfect balance, where the height is guaranteed to be no larger than 2 lg N. "),N,_,s(" The primary step to get the flexibility that we need to guarantee balance in search trees is to allow the nodes in our trees to hold more than one key. "),I,s(` Definition. A 2-3 search tree is a tree that either is empty or
A 2-node, with one key (and associated value) and two links, a left link to a 2-3 search tree with smaller keys, and a right link to a 2-3 search tree with larger keys
A 3-node, with two keys (and associated values) and three links, a left link to a 2-3 search tree with smaller keys, a middle link to a 2-3 search tree with keys between the node's keys and a right link to a 2-3 search tree with larger keys. `),T,x,j,s(" A perfectly balanced 2-3 search tree (or 2-3 tree for short) is one whose null links are all the same distance from the root. "),C,s(" Search. To determine whether a key is in a 2-3 tree, we compare it against the keys at the root: If it is equal to any of them, we have a search hit; otherwise, we follow the link from the root to the subtree corresponding to the interval of key values that could contain the search key, and then recursively search in that subtree. "),D,n("div",A,[V,n("p",null,[a("代码出自"),n("a",B,[a("Java数据结构和算法"),t(e)])])]),L])}const E=o(y,[["render",P],["__file","balanced-search-trees.html.vue"]]);export{E as default};
