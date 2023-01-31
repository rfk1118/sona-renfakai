const e=JSON.parse('{"key":"v-b9cc19de","path":"/basic-skill/algorithms/tree/pre-order.html","title":"前序遍历","lang":"zh-CN","frontmatter":{"description":"前序遍历 前序遍历（根，左，右） 访问当前节点 调用当前节点左节点进行遍历 调用当前节点的右节点进行遍历 常用方式 递归，方案比较简单，方式统一 loop，孔乙己茴字有几种写法 代码 递归 递归方式处理比较简单，先处理当前节点，左，右 func preOrder(head *BinaryTree) { if nil == head { return } // 访问当前节点 fmt.Printf(\\"key:%d,value:%d\\\\n\\", head.key, head.value) // 调用当前节点左节点进行遍历 preOrder(head.leftNode) // 调用当前节点的右节点进行遍历 preOrder(head.rightNode) }","head":[["meta",{"property":"og:url","content":"https://renfakai.com/basic-skill/algorithms/tree/pre-order.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"前序遍历"}],["meta",{"property":"og:description","content":"前序遍历 前序遍历（根，左，右） 访问当前节点 调用当前节点左节点进行遍历 调用当前节点的右节点进行遍历 常用方式 递归，方案比较简单，方式统一 loop，孔乙己茴字有几种写法 代码 递归 递归方式处理比较简单，先处理当前节点，左，右 func preOrder(head *BinaryTree) { if nil == head { return } // 访问当前节点 fmt.Printf(\\"key:%d,value:%d\\\\n\\", head.key, head.value) // 调用当前节点左节点进行遍历 preOrder(head.leftNode) // 调用当前节点的右节点进行遍历 preOrder(head.rightNode) }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-31T16:40:15.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-31T16:40:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前序遍历\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-01-31T16:40:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"常用方式","slug":"常用方式","link":"#常用方式","children":[]},{"level":2,"title":"代码","slug":"代码","link":"#代码","children":[{"level":3,"title":"递归","slug":"递归","link":"#递归","children":[]},{"level":3,"title":"loop","slug":"loop","link":"#loop","children":[]},{"level":3,"title":"loop进阶版","slug":"loop进阶版","link":"#loop进阶版","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1675183215000,"updatedTime":1675183215000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":1.89,"words":568},"filePathRelative":"basic-skill/algorithms/tree/pre-order.md","localizedDate":"2023年2月1日","excerpt":"<h1> 前序遍历</h1>\\n<p>前序遍历（根，左，右）</p>\\n<ol>\\n<li>访问当前节点</li>\\n<li>调用当前节点左节点进行遍历</li>\\n<li>调用当前节点的右节点进行遍历</li>\\n</ol>\\n<h2> 常用方式</h2>\\n<ul>\\n<li>递归，方案比较简单，方式统一</li>\\n<li>loop，孔乙己茴字有几种写法</li>\\n</ul>\\n<h2> 代码</h2>\\n<h3> 递归</h3>\\n<p>递归方式处理比较简单，先处理当前节点，左，右</p>\\n<div class=\\"language-Go line-numbers-mode\\" data-ext=\\"Go\\"><pre class=\\"language-Go\\"><code>func preOrder(head *BinaryTree) {\\n  if nil == head {\\n    return\\n  }\\n  // 访问当前节点\\n  fmt.Printf(\\"key:%d,value:%d\\\\n\\", head.key, head.value)\\n  // 调用当前节点左节点进行遍历\\n  preOrder(head.leftNode)\\n  // 调用当前节点的右节点进行遍历\\n  preOrder(head.rightNode)\\n}\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{e as data};
