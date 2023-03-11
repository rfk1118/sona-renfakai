import{_ as e}from"./successor-f642132f.js";import{_ as t,V as p,W as o,Y as s,a1 as n,Z as l,a0 as c,F as i}from"./framework-e54e0297.js";const u="/assets/bst-subtree-count-7f858ce7.png",r="/assets/successor-one-75b7edd4.png",k="/assets/successor-two-40342656.png",d="/assets/Successor-three-eea4f289.png",v={},m=s("h1",{id:"二叉树-算法4",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#二叉树-算法4","aria-hidden":"true"},"#"),n(" 二叉树-算法4")],-1),b={href:"https://algs4.cs.princeton.edu/32bst/",target:"_blank",rel:"noopener noreferrer"},y=c('<h3 id="树的所有节点个数" tabindex="-1"><a class="header-anchor" href="#树的所有节点个数" aria-hidden="true">#</a> 树的所有节点个数</h3><ol><li>使用二叉树套路计算树的节点个数，从图中我们可以看到一个二叉树可以分解成n个二叉树。</li></ol><p><img src="'+u+`" alt="An image"></p><ol start="2"><li>编写代码</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">binaryTreeSize</span><span class="token punctuation">(</span>tree <span class="token operator">*</span>BinaryTree<span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
 <span class="token comment">// 如果子树为空返回0</span>
 <span class="token keyword">if</span> tree <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">0</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 递归计算左子树</span>
 lSize <span class="token operator">:=</span> <span class="token function">binaryTreeSize</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>leftNode<span class="token punctuation">)</span>
 <span class="token comment">// 递归计算右子树</span>
 rSize <span class="token operator">:=</span> <span class="token function">binaryTreeSize</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>rightNode<span class="token punctuation">)</span>
 <span class="token comment">// 加上当前节点</span>
 <span class="token keyword">return</span> rSize <span class="token operator">+</span> lSize <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="floor" tabindex="-1"><a class="header-anchor" href="#floor" aria-hidden="true">#</a> Floor</h3><p>Floor and ceiling. If a given key key is less than the key at the root of a BST, then the floor of key (the largest key in the BST less than or equal to key) must be in the left subtree. If key is greater than the key at the root, then the floor of key could be in the right subtree, but only if there is a key smaller than or equal to key in the right subtree; if not (or if key is equal to the key at the root) then the key at the root is the floor of key. Finding the ceiling is similar, interchanging right and left.</p><ol><li>向下取整</li></ol><ul><li>如果当前子树根节点与给定的key相等，直接返回当前子树根节点</li><li>给定key比当前子树根节点小，向下取整的值一定在当前子树左子树。</li><li>给定key比当前子树根节点大，结果可能在当前子树右子树，前提是当前子树右子树有一个key小于等于要查找的key，如果没有的话，这个key向下取整就是当前子树根节点。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">floor</span><span class="token punctuation">(</span>b <span class="token operator">*</span>BinaryTree<span class="token punctuation">,</span> key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTree <span class="token punctuation">{</span>
 <span class="token comment">// 如果找不到当前节点，直接返回空</span>
 <span class="token keyword">if</span> b <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">nil</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 如果在左子树一定存在</span>
 <span class="token keyword">if</span> key <span class="token operator">&lt;</span> b<span class="token punctuation">.</span>key <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">floor</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>leftNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 查询右子树</span>
 <span class="token keyword">if</span> b<span class="token punctuation">.</span>key <span class="token operator">&lt;</span> key <span class="token punctuation">{</span>
  tree <span class="token operator">:=</span> <span class="token function">floor</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>rightNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token boolean">nil</span> <span class="token operator">==</span> tree <span class="token punctuation">{</span>
   <span class="token comment">// 返回为空的话就说明右节点没有小于等于key的节点</span>
   <span class="token keyword">return</span> b
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> tree
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">return</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><code>TreeMap#getFloorEntry</code>源码</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">getFloorEntry</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当前节点</span>
    <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> p <span class="token operator">=</span> root<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> cmp <span class="token operator">=</span> <span class="token function">compare</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> p<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 如果大于当前节点，并且右节点还有值，继续向右走</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                p <span class="token operator">=</span> p<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
            <span class="token comment">// 因为右边没节点了，向下取整就是当前节点</span>
                <span class="token keyword">return</span> p<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果小于当前节点，并且还有比它小的值，一定在左子树</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                p <span class="token operator">=</span> p<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 查找当前节点的前驱节点</span>
                <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> parent <span class="token operator">=</span> p<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
                <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> ch <span class="token operator">=</span> p<span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>parent <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> ch <span class="token operator">==</span> parent<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    ch <span class="token operator">=</span> parent<span class="token punctuation">;</span>
                    parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> parent<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span>
            <span class="token keyword">return</span> p<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
    <span class="token comment">// 如果头节点为空的话，返回空</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ceiling" tabindex="-1"><a class="header-anchor" href="#ceiling" aria-hidden="true">#</a> Ceiling</h3><ol><li>向上取整，这个套路与刚才相反</li></ol><ul><li>如果当前子树根节点与给定的key相等，直接返回当前子树根节点</li><li>给定key比当前子树根节点大，结果一定在当前子树右子树上</li><li>给定key比当前子树根节点小，如果当前子树左子树有大于等于key的节点，结果在当前子树左子树上，否则当前子树的根节点就是取整的结果。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ceiling</span><span class="token punctuation">(</span>b <span class="token operator">*</span>BinaryTree<span class="token punctuation">,</span> key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTree <span class="token punctuation">{</span>
 <span class="token comment">// 子树为空，返回空</span>
 <span class="token keyword">if</span> b <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">nil</span>
 <span class="token punctuation">}</span>
 <span class="token comment">//  key与子树的根节点相同</span>
 <span class="token keyword">if</span> b<span class="token punctuation">.</span>key <span class="token operator">==</span> key <span class="token punctuation">{</span>
  <span class="token keyword">return</span> b
 <span class="token punctuation">}</span>
 <span class="token comment">// 如果在右子树上，一定存在</span>
 <span class="token keyword">if</span> b<span class="token punctuation">.</span>key <span class="token operator">&lt;</span> key <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">ceiling</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>rightNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 左子树不一定存在，因为没有大于等于key的节点的话，根节点就是结果</span>
 r <span class="token operator">:=</span> <span class="token function">ceiling</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>leftNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
 <span class="token keyword">if</span> <span class="token boolean">nil</span> <span class="token operator">!=</span> r <span class="token punctuation">{</span>
  <span class="token keyword">return</span> r
 <span class="token punctuation">}</span>
 <span class="token keyword">return</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><code>TreeMap#getCeilingEntry</code>源码</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">final</span> <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">getCeilingEntry</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> cmp <span class="token operator">=</span> <span class="token function">compare</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> p<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 如果左边没节点了，相上取整就是当前节点</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    p <span class="token operator">=</span> p<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    <span class="token keyword">return</span> p<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 如果右边还有右孩子，继续迭代</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    p <span class="token operator">=</span> p<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 如果右边没孩子，查找当前节点后继节点</span>
                    <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> parent <span class="token operator">=</span> p<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
                    <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> ch <span class="token operator">=</span> p<span class="token punctuation">;</span>
                    <span class="token keyword">while</span> <span class="token punctuation">(</span>parent <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> ch <span class="token operator">==</span> parent<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        ch <span class="token operator">=</span> parent<span class="token punctuation">;</span>
                        parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// 返回结果</span>
                    <span class="token keyword">return</span> parent<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span>
            <span class="token comment">// 节点相等直接返回</span>
                <span class="token keyword">return</span> p<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 如果整个tree为空，不存在</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="selection" tabindex="-1"><a class="header-anchor" href="#selection" aria-hidden="true">#</a> Selection</h3><p>Suppose that we seek the key of rank k (the key such that precisely k other keys in the BST are smaller). If the number of keys t in the left subtree is larger than k, we look (recursively) for the key of rank k in the left subtree; if t is equal to k, we return the key at the root; and if t is smaller than k, we look (recursively) for the key of rank k - t - 1 in the right subtree.</p><p>其实上面这句话就是查找二叉树第k个大的元素，其实使用一般排序或者堆排序都可以获得。</p><ul><li>如果当前左子树的节点数量大于k，说明一定在其左子树上</li><li>如果左子树的节点数等于k，返回根节点，</li><li>如果当前子树左子树的节点数量小于k，我们递归的从右子树里面找到(k-t-1)，因为从左子树计算了t个，根节点1个，所以需要从当前子树的右子树里面找到部分左子树</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">selection</span><span class="token punctuation">(</span>b <span class="token operator">*</span>BinaryTree<span class="token punctuation">,</span> k <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTree <span class="token punctuation">{</span>
 size <span class="token operator">:=</span> <span class="token function">binaryTreeSize</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>leftNode<span class="token punctuation">)</span>
 <span class="token keyword">if</span> size <span class="token operator">&gt;</span> k <span class="token punctuation">{</span>
  <span class="token comment">// 如果在左边，一直向左边缩小</span>
  <span class="token keyword">return</span> <span class="token function">selection</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>leftNode<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> size <span class="token operator">&lt;</span> k <span class="token punctuation">{</span>
  <span class="token comment">// 从右子树的左子树</span>
  <span class="token keyword">return</span> <span class="token function">selection</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>rightNode<span class="token punctuation">,</span> k<span class="token operator">-</span>size<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果正好相等，则这个就是结果</span>
  <span class="token keyword">return</span> b
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rank" tabindex="-1"><a class="header-anchor" href="#rank" aria-hidden="true">#</a> Rank</h3><p>If the given key is equal to the key at the root, we return the number of keys t in the left subtree; if the given key is less than the key at the root, we return the rank of the key in the left subtree; and if the given key is larger than the key at the root, we return t plus one (to count the key at the root) plus the rank of the key in the right subtree.</p><ul><li>给定一个key，等于当前子树的根节点，返回当前子树的左子树数量</li><li>给定的key小于当前子树的根，返回其在当前子树左孙树数量，这里可能找了好多次</li><li>给定的key大于当前子树的根，我们返回当前子树左子树总量 + 1 + 当前子树右子树下的左子树的数量</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">rank</span><span class="token punctuation">(</span>b <span class="token operator">*</span>BinaryTree<span class="token punctuation">,</span> key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
 <span class="token comment">// 如果为空，返回0</span>
 <span class="token keyword">if</span> b <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">0</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 如果这个key相等，返回左子树数量</span>
 <span class="token keyword">if</span> b<span class="token punctuation">.</span>key <span class="token operator">==</span> key <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">binaryTreeSize</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>leftNode<span class="token punctuation">)</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> b<span class="token punctuation">.</span>key <span class="token operator">&gt;</span> key <span class="token punctuation">{</span>
  <span class="token comment">// 如果key小于子树的根，继续左子树查找</span>
  <span class="token keyword">return</span> <span class="token function">rank</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>leftNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果在右子树，先加上所有左子树数量+根节点</span>
  <span class="token comment">// 从右树上继续找左节点数量</span>
  <span class="token keyword">return</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token function">binaryTreeSize</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>leftNode<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">rank</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>rightNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> Delete</h3><p>之前写删除元素使用的递归写法，其思想来源于《Java数据结构和算法》一书，使用了父节点，个人代码编码不太好，这里使用非外部变量进行编写</p><ol><li>查找最小值，为什么要查找最小值呢？其实后继节点也就是要删除节点右孩子的最小节点</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">findMin</span><span class="token punctuation">(</span>head <span class="token operator">*</span>BinaryTree<span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTree <span class="token punctuation">{</span>
 <span class="token keyword">if</span> head <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">nil</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">if</span> head<span class="token punctuation">.</span>leftNode <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">findMin</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>leftNode<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">return</span> head
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>删除最小节点 <ol><li>查找最小节点的时候一直向左查找，所以被删除的节点肯定是某个子树根节点的左孩子</li><li>被删除节点肯定没有左节点，所以让被删除节点的父亲的左节点指向删除节点的右节点即可</li></ol></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">deleteMin</span><span class="token punctuation">(</span>b <span class="token operator">*</span>BinaryTree<span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTree <span class="token punctuation">{</span>
 <span class="token comment">// 因为左边没节点了，当前节点就是最小节点</span>
 <span class="token keyword">if</span> <span class="token boolean">nil</span> <span class="token operator">==</span> b<span class="token punctuation">.</span>leftNode <span class="token punctuation">{</span>
  <span class="token keyword">return</span> b<span class="token punctuation">.</span>rightNode
 <span class="token punctuation">}</span>
 <span class="token comment">// 还有小节点继续处理</span>
 b<span class="token punctuation">.</span>leftNode <span class="token operator">=</span> <span class="token function">deleteMin</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>leftNode<span class="token punctuation">)</span>
 <span class="token keyword">return</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>重新产生连接 <ol><li><p>如果后继节点为删除节点的右子节点，这时候 <code>uccessor.rightNode = head.rightNode.rightNode</code></p></li><li><p>如果后继节点是删除节点的右子左孙节点，这时候，这时候 <code>successor.rightNode = head.rightNode</code> ， <code>b.leftNode = deleteMin(b.leftNode)</code> 会把后继节点父亲的左节点连接到后继节点的右节点上。</p></li></ol></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">deleteKeyFour</span><span class="token punctuation">(</span>head <span class="token operator">*</span>BinaryTree<span class="token punctuation">,</span> key <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTree <span class="token punctuation">{</span>
 <span class="token comment">// 没找到元素，不进行处理</span>
 <span class="token keyword">if</span> <span class="token boolean">nil</span> <span class="token operator">==</span> head <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">nil</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">if</span> head<span class="token punctuation">.</span>key <span class="token operator">&lt;</span> key <span class="token punctuation">{</span>
  <span class="token comment">// 如果要删除根节点的右节点，继续在右子树上查找</span>
  head<span class="token punctuation">.</span>rightNode <span class="token operator">=</span> <span class="token function">deleteKeyFour</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>rightNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> head<span class="token punctuation">.</span>key <span class="token operator">&gt;</span> key <span class="token punctuation">{</span>
  <span class="token comment">// 如果要删除根节点的左节点，继续在左子树上查找</span>
  head<span class="token punctuation">.</span>leftNode <span class="token operator">=</span> <span class="token function">deleteKeyFour</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>leftNode<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 要删除节点</span>
  <span class="token comment">// 两个都为空</span>
  <span class="token keyword">if</span> head<span class="token punctuation">.</span>leftNode <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> head<span class="token punctuation">.</span>rightNode <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token boolean">nil</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果左节点为空，返回右节点</span>
  <span class="token keyword">if</span> head<span class="token punctuation">.</span>leftNode <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> head<span class="token punctuation">.</span>rightNode
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果右节点为空，返回左节点</span>
  <span class="token keyword">if</span> head<span class="token punctuation">.</span>rightNode <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> head<span class="token punctuation">.</span>leftNode
  <span class="token punctuation">}</span>
  <span class="token comment">// 先查找到后继节点，也就是当前子树的右子树的最小节点</span>
  successor <span class="token operator">:=</span> <span class="token function">findMin</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>rightNode<span class="token punctuation">)</span>
  <span class="token comment">// 因为后继节点可能是右子树的根节点，所以这时候的右节点就变成了原来的head.rightNode.rightNode</span>
  <span class="token comment">// 1.如果后继节点为删除节点的右子节点，这时候，successor.rightNode = head.rightNode.rightNode</span>
  <span class="token comment">// 2.如果后继节点为删除节点的右子左孙节点，这时候，递归会把后继节点的右孩子连接到后继节点父亲的左子树上，这时候successor.rightNode = head.rightNode</span>
  successor<span class="token punctuation">.</span>rightNode <span class="token operator">=</span> <span class="token function">deleteMin</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>rightNode<span class="token punctuation">)</span>
  <span class="token comment">// 后继节点的左节点是删除节点的左节点</span>
  successor<span class="token punctuation">.</span>leftNode <span class="token operator">=</span> head<span class="token punctuation">.</span>leftNode
 <span class="token punctuation">}</span>
 <span class="token keyword">return</span> head
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="后继节点" tabindex="-1"><a class="header-anchor" href="#后继节点" aria-hidden="true">#</a> 后继节点</h3><ol><li>当前节点有右节点，则其后继节点就是当前节点右子树的最小值，效果如图所示：</li></ol><p><img src="`+e+`" alt="An image"></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">findBinaryTreeSuccessor</span><span class="token punctuation">(</span>head <span class="token operator">*</span>BinaryTreeSuccessor<span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTreeSuccessor <span class="token punctuation">{</span>
 <span class="token comment">// 当前节点的右节点不为空情况下</span>
 <span class="token keyword">if</span> head<span class="token punctuation">.</span>rightNode <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">findMinBinaryTreeSuccessor</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>

 <span class="token comment">// 等待补充</span>
 <span class="token keyword">return</span>  <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">// 右节点不为空的情况下，右子树不为空</span>
<span class="token keyword">func</span> <span class="token function">findMinBinaryTreeSuccessor</span><span class="token punctuation">(</span>head <span class="token operator">*</span>BinaryTreeSuccessor<span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTreeSuccessor <span class="token punctuation">{</span>
 <span class="token keyword">for</span> head<span class="token punctuation">.</span>leftNode <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  head <span class="token operator">=</span> head<span class="token punctuation">.</span>leftNode
 <span class="token punctuation">}</span>
 <span class="token keyword">return</span> head
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>如果当前节点没有右节点，向上查找到其在链路上的第一个左链接，其父亲节点就是后继 <ol><li>第一种情况，需要向上找到节点C，就是其后继节点</li></ol></li></ol><p><img src="`+r+'" alt="An image"></p><ol start="2"><li>第二种情况，当前节点就是节点B的左节点，所以节点B就是当前节点后继节点</li></ol><p><img src="'+k+'" alt="An image"></p><ol start="3"><li>第三种情况，没有后继节点</li></ol><p><img src="'+d+`" alt="An image"></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">findBinaryTreeSuccessor</span><span class="token punctuation">(</span>head <span class="token operator">*</span>BinaryTreeSuccessor<span class="token punctuation">)</span> <span class="token operator">*</span>BinaryTreeSuccessor <span class="token punctuation">{</span>
 <span class="token comment">// 当前节点的右节点不为空情况下</span>
 <span class="token keyword">if</span> head<span class="token punctuation">.</span>rightNode <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">findMinBinaryTreeSuccessor</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>

 <span class="token comment">// 第二种情况，当前节点就是节点B的左节点，所以节点B就是当前节点后继节点</span>
 current <span class="token operator">:=</span> head
 currentParent <span class="token operator">:=</span> head<span class="token punctuation">.</span>parent
 <span class="token comment">// 当前节点就是第情况2，直接就不循环了</span>
 <span class="token keyword">for</span> currentParent<span class="token punctuation">.</span>leftNode <span class="token operator">!=</span> current <span class="token punctuation">{</span>
  current <span class="token operator">=</span> currentParent
  currentParent <span class="token operator">=</span> currentParent<span class="token punctuation">.</span>parent
 <span class="token punctuation">}</span>
 <span class="token keyword">return</span> currentParent
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46);function h(f,g){const a=i("ExternalLinkIcon");return p(),o("div",null,[m,s("p",null,[n("在读"),s("a",b,[n("算法4"),l(a)]),n("的时候发现了一些知识点遗漏，进行梳理补充。")]),y])}const T=t(v,[["render",h],["__file","binary-tree-algs4.html.vue"]]);export{T as default};
