import{_ as e,V as i,W as n,$ as d}from"./framework-5793c714.js";const r={},l=d(`<h1 id="前序遍历" tabindex="-1"><a class="header-anchor" href="#前序遍历" aria-hidden="true">#</a> 前序遍历</h1><p>前序遍历（根，左，右）</p><ol><li>访问当前节点</li><li>调用当前节点左节点进行遍历</li><li>调用当前节点的右节点进行遍历</li></ol><h2 id="常用方式" tabindex="-1"><a class="header-anchor" href="#常用方式" aria-hidden="true">#</a> 常用方式</h2><ul><li>递归，方案比较简单，方式统一</li><li>loop，孔乙己茴字有几种写法</li></ul><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><h3 id="递归" tabindex="-1"><a class="header-anchor" href="#递归" aria-hidden="true">#</a> 递归</h3><p>递归方式处理比较简单，先处理当前节点，左，右</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func preOrder(head *BinaryTree) {
  if nil == head {
    return
  }
  // 访问当前节点
  fmt.Printf(&quot;key:%d,value:%d\\n&quot;, head.key, head.value)
  // 调用当前节点左节点进行遍历
  preOrder(head.leftNode)
  // 调用当前节点的右节点进行遍历
  preOrder(head.rightNode)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="loop" tabindex="-1"><a class="header-anchor" href="#loop" aria-hidden="true">#</a> loop</h3><ol><li>茴字的第一种写法</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func preOrderWithLoopV1(head *BinaryTree) {
  if nil == head {
    return
  }
  stack := []*BinaryTree{head}
  for len(stack) &gt; 0 {
    pop := stack[len(stack)-1]
    stack = stack[:len(stack)-1]
    fmt.Printf(&quot;key:%d,value:%d\\n&quot;, pop.key, pop.value)
    if nil != pop.rightNode {
      stack = append(stack, pop.rightNode)
    }
    if nil != pop.leftNode {
      stack = append(stack, pop.leftNode)
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>茴字的第二种写法，这种比较废人</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func preOrderWithLoopV2(head *BinaryTree) {
  var stack []*BinaryTree
  node := head
  for node != nil || len(stack) &gt; 0 {
    for node != nil {
      fmt.Printf(&quot;key:%d,value:%d\\n&quot;, node.key, node.value)
      stack = append(stack, node)
      node = node.leftNode
    }
    node = stack[len(stack)-1]
    node = node.rightNode
    stack = stack[:len(stack)-1]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="loop进阶版" tabindex="-1"><a class="header-anchor" href="#loop进阶版" aria-hidden="true">#</a> loop进阶版</h3><p>不使用递归，也不使用辅助栈，<code>Morris traversal for Preorder</code>方式进行前序遍历</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// 前序遍历，不使用递归和栈辅助
func preOrderWithLoopMorris(root *BinaryTree) {
  if nil == root {
    return
  }
  var predecessor *BinaryTree
  var current = root
  for current != nil {
    // 如果当前节点的左孩子为空，直接打印当前节点，并转向处理右节点
    if current.leftNode == nil {
      fmt.Printf(&quot;key:%d,value:%d\\n&quot;, current.key, current.value)
      current = current.rightNode
    } else {
      // 查找当前节点的前驱节点
      predecessor = current.leftNode
      for predecessor.rightNode != nil &amp;&amp; predecessor.rightNode != current {
        predecessor = predecessor.rightNode
      }

      // 第一次前驱节点的右节点肯为空，这里就是将前驱节点的后继指向当前节点，然后继续向下走
      if predecessor.rightNode == nil {
        predecessor.rightNode = current
        current = current.leftNode
      } else {
        // 如果回溯到当前节点，并且找前驱的时候，发现出了环，这个时候处理当前节点，并且向右移动
        fmt.Printf(&quot;key:%d,value:%d\\n&quot;, current.key, current.value)
        predecessor.rightNode = nil
        current = current.rightNode
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ol><li>一般情况下使用递归写法简单，写起来比较快</li><li>使用<code>loop</code>方式，会在特殊情况下会有奇效，比如求每层二叉树平均值</li><li>在要求空间为常数，并且不能使用递归的情况下使用<code>Morris</code>，基本属于<code>hard</code>级别</li></ol>`,19),s=[l];function a(c,v){return i(),n("div",null,s)}const u=e(r,[["render",a],["__file","pre-order.html.vue"]]);export{u as default};
