import{_ as a}from"./successor-f642132f.js";import{_ as i,V as t,W as l,X as s,a0 as n,Y as c,$ as r,F as o}from"./framework-fd210779.js";const d="/assets/bst-subtree-count-7f858ce7.png",p="/assets/successor-one-75b7edd4.png",u="/assets/successor-two-40342656.png",v="/assets/Successor-three-eea4f289.png",k={},m=s("h1",{id:"二叉树-算法4",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#二叉树-算法4","aria-hidden":"true"},"#"),n(" 二叉树-算法4")],-1),b={href:"https://algs4.cs.princeton.edu/32bst/",target:"_blank",rel:"noopener noreferrer"},h=r('<h3 id="树的所有节点个数" tabindex="-1"><a class="header-anchor" href="#树的所有节点个数" aria-hidden="true">#</a> 树的所有节点个数</h3><ol><li>使用二叉树套路计算树的节点个数，从图中我们可以看到一个二叉树可以分解成n个二叉树。</li></ol><p><img src="'+d+`" alt="An image"></p><ol start="2"><li>编写代码</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func binaryTreeSize(tree *BinaryTree) int {
	// 如果子树为空返回0
	if tree == nil {
		return 0
	}
	// 递归计算左子树
	lSize := binaryTreeSize(tree.leftNode)
	// 递归计算右子树
	rSize := binaryTreeSize(tree.rightNode)
	// 加上当前节点
	return rSize + lSize + 1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="floor" tabindex="-1"><a class="header-anchor" href="#floor" aria-hidden="true">#</a> Floor</h3><p>Floor and ceiling. If a given key key is less than the key at the root of a BST, then the floor of key (the largest key in the BST less than or equal to key) must be in the left subtree. If key is greater than the key at the root, then the floor of key could be in the right subtree, but only if there is a key smaller than or equal to key in the right subtree; if not (or if key is equal to the key at the root) then the key at the root is the floor of key. Finding the ceiling is similar, interchanging right and left.</p><ol><li>向下取整</li></ol><ul><li>如果当前子树根节点与给定的key相等，直接返回当前子树根节点</li><li>给定key比当前子树根节点小，向下取整的值一定在当前子树左子树。</li><li>给定key比当前子树根节点大，结果可能在当前子树右子树，前提是当前子树右子树有一个key小于等于要查找的key，如果没有的话，这个key向下取整就是当前子树根节点。</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func floor(b *BinaryTree, key int) *BinaryTree {
	// 如果找不到当前节点，直接返回空
	if b == nil {
		return nil
	}
	// 如果在左子树一定存在
	if key &lt; b.key {
		return floor(b.leftNode, key)
	}
	// 查询右子树
	if b.key &lt; key {
		tree := floor(b.rightNode, key)
		if nil == tree {
			// 返回为空的话就说明右节点没有小于等于key的节点
			return b
		} else {
			return tree
		}
	}
	return b
}
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ceiling" tabindex="-1"><a class="header-anchor" href="#ceiling" aria-hidden="true">#</a> Ceiling</h3><ol><li>向上取整，这个套路与刚才相反</li></ol><ul><li>如果当前子树根节点与给定的key相等，直接返回当前子树根节点</li><li>给定key比当前子树根节点大，结果一定在当前子树右子树上</li><li>给定key比当前子树根节点小，如果当前子树左子树有大于等于key的节点，结果在当前子树左子树上，否则当前子树的根节点就是取整的结果。</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func ceiling(b *BinaryTree, key int) *BinaryTree {
	// 子树为空，返回空
	if b == nil {
		return nil
	}
	//  key与子树的根节点相同
	if b.key == key {
		return b
	}
	// 如果在右子树上，一定存在
	if b.key &lt; key {
		return ceiling(b.rightNode, key)
	}
	// 左子树不一定存在，因为没有大于等于key的节点的话，根节点就是结果
	r := ceiling(b.leftNode, key)
	if nil != r {
		return r
	}
	return b
}
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="selection" tabindex="-1"><a class="header-anchor" href="#selection" aria-hidden="true">#</a> Selection</h3><p>Suppose that we seek the key of rank k (the key such that precisely k other keys in the BST are smaller). If the number of keys t in the left subtree is larger than k, we look (recursively) for the key of rank k in the left subtree; if t is equal to k, we return the key at the root; and if t is smaller than k, we look (recursively) for the key of rank k - t - 1 in the right subtree.</p><p>其实上面这句话就是查找二叉树第k个大的元素，其实使用一般排序或者堆排序都可以获得。</p><ul><li>如果当前左子树的节点数量大于k，说明一定在其左子树上</li><li>如果左子树的节点数等于k，返回根节点，</li><li>如果当前子树左子树的节点数量小于k，我们递归的从右子树里面找到(k-t-1)，因为从左子树计算了t个，根节点1个，所以需要从当前子树的右子树里面找到部分左子树</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func selection(b *BinaryTree, k int) *BinaryTree {
	size := binaryTreeSize(b.leftNode)
	if size &gt; k {
		// 如果在左边，一直向左边缩小
		return selection(b.leftNode, k)
	} else if size &lt; k {
		// 从右子树的左子树
		return selection(b.rightNode, k-size-1)
	} else {
		// 如果正好相等，则这个就是结果
		return b
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rank" tabindex="-1"><a class="header-anchor" href="#rank" aria-hidden="true">#</a> Rank</h3><p>If the given key is equal to the key at the root, we return the number of keys t in the left subtree; if the given key is less than the key at the root, we return the rank of the key in the left subtree; and if the given key is larger than the key at the root, we return t plus one (to count the key at the root) plus the rank of the key in the right subtree.</p><ul><li>给定一个key，等于当前子树的根节点，返回当前子树的左子树数量</li><li>给定的key小于当前子树的根，返回其在当前子树左孙树数量，这里可能找了好多次</li><li>给定的key大于当前子树的根，我们返回当前子树左子树总量 + 1 + 当前子树右子树下的左子树的数量</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func rank(b *BinaryTree, key int) int {
	// 如果为空，返回0
	if b == nil {
		return 0
	}
	// 如果这个key相等，返回左子树数量
	if b.key == key {
		return binaryTreeSize(b.leftNode)
	} else if b.key &gt; key {
		// 如果key小于子树的根，继续左子树查找
		return rank(b.leftNode, key)
	} else {
		// 如果在右子树，先加上所有左子树数量+根节点
		// 从右树上继续找左节点数量
		return 1 + binaryTreeSize(b.leftNode) + rank(b.rightNode, key)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> Delete</h3><p>之前写删除元素使用的递归写法，其思想来源于《Java数据结构和算法》一书，使用了父节点，个人代码编码不太好，这里使用非外部变量进行编写</p><ol><li>查找最小值，为什么要查找最小值呢？其实后继节点也就是要删除节点右孩子的最小节点</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func findMin(head *BinaryTree) *BinaryTree {
	if head == nil {
		return nil
	}
	if head.leftNode != nil {
		return findMin(head.leftNode)
	}
	return head
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>删除最小节点 <ol><li>查找最小节点的时候一直向左查找，所以被删除的节点肯定是某个子树根节点的左孩子</li><li>被删除节点肯定没有左节点，所以让被删除节点的父亲的左节点指向删除节点的右节点即可</li></ol></li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func deleteMin(b *BinaryTree) *BinaryTree {
	// 因为左边没节点了，当前节点就是最小节点
	if nil == b.leftNode {
		return b.rightNode
	}
	// 还有小节点继续处理
	b.leftNode = deleteMin(b.leftNode)
	return b
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>重新产生连接 <ol><li><p>如果后继节点为删除节点的右子节点，这时候 <code>uccessor.rightNode = head.rightNode.rightNode</code></p></li><li><p>如果后继节点是删除节点的右子左孙节点，这时候，这时候 <code>successor.rightNode = head.rightNode</code> ， <code>b.leftNode = deleteMin(b.leftNode)</code> 会把后继节点父亲的左节点连接到后继节点的右节点上。</p></li></ol></li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func deleteKeyFour(head *BinaryTree, key int) *BinaryTree {
	// 没找到元素，不进行处理
	if nil == head {
		return nil
	}
	if head.key &lt; key {
		// 如果要删除根节点的右节点，继续在右子树上查找
		head.rightNode = deleteKeyFour(head.rightNode, key)
	} else if head.key &gt; key {
		// 如果要删除根节点的左节点，继续在左子树上查找
		head.leftNode = deleteKeyFour(head.leftNode, key)
	} else {
		// 要删除节点
		// 两个都为空
		if head.leftNode == nil &amp;&amp; head.rightNode == nil {
			return nil
		}
		// 如果左节点为空，返回右节点
		if head.leftNode == nil {
			return head.rightNode
		}
		// 如果右节点为空，返回左节点
		if head.rightNode == nil {
			return head.leftNode
		}
		// 先查找到后继节点，也就是当前子树的右子树的最小节点
		successor := findMin(head.rightNode)
		// 因为后继节点可能是右子树的根节点，所以这时候的右节点就变成了原来的head.rightNode.rightNode
		// 1.如果后继节点为删除节点的右子节点，这时候，successor.rightNode = head.rightNode.rightNode
		// 2.如果后继节点为删除节点的右子左孙节点，这时候，递归会把后继节点的右孩子连接到后继节点父亲的左子树上，这时候successor.rightNode = head.rightNode
		successor.rightNode = deleteMin(head.rightNode)
		// 后继节点的左节点是删除节点的左节点
		successor.leftNode = head.leftNode
	}
	return head
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="后继节点" tabindex="-1"><a class="header-anchor" href="#后继节点" aria-hidden="true">#</a> 后继节点</h3><ol><li>当前节点有右节点，则其后继节点就是当前节点右子树的最小值，效果如图所示：</li></ol><p><img src="`+a+`" alt="An image"></p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func findBinaryTreeSuccessor(head *BinaryTreeSuccessor) *BinaryTreeSuccessor {
	// 当前节点的右节点不为空情况下
	if head.rightNode != nil {
		return findMinBinaryTreeSuccessor(head)
	}

	// 等待补充
	return  nil
}

// 右节点不为空的情况下，右子树不为空
func findMinBinaryTreeSuccessor(head *BinaryTreeSuccessor) *BinaryTreeSuccessor {
	for head.leftNode != nil {
		head = head.leftNode
	}
	return head
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>如果当前节点没有右节点，向上查找到其在链路上的第一个左链接，其父亲节点就是后继 <ol><li>第一种情况，需要向上找到节点C，就是其后继节点</li></ol></li></ol><p><img src="`+p+'" alt="An image"></p><ol start="2"><li>第二种情况，当前节点就是节点B的左节点，所以节点B就是当前节点后继节点</li></ol><p><img src="'+u+'" alt="An image"></p><ol start="3"><li>第三种情况，没有后继节点</li></ol><p><img src="'+v+`" alt="An image"></p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func findBinaryTreeSuccessor(head *BinaryTreeSuccessor) *BinaryTreeSuccessor {
	// 当前节点的右节点不为空情况下
	if head.rightNode != nil {
		return findMinBinaryTreeSuccessor(head)
	}

	// 第二种情况，当前节点就是节点B的左节点，所以节点B就是当前节点后继节点
	current := head
	currentParent := head.parent
	// 当前节点就是第情况2，直接就不循环了
	for currentParent.leftNode != current {
		current = currentParent
		currentParent = currentParent.parent
	}
	return currentParent
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46);function y(g,f){const e=o("ExternalLinkIcon");return t(),l("div",null,[m,s("p",null,[n("在读"),s("a",b,[n("算法4"),c(e)]),n("的时候发现了一些知识点遗漏，进行梳理补充。")]),h])}const T=i(k,[["render",y],["__file","binary-tree-algs4.html.vue"]]);export{T as default};
