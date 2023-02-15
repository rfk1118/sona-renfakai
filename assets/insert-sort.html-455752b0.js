import{_ as s,V as a,W as l,Y as n,a1 as e,Z as d,a0 as r,F as t}from"./framework-1bd9c91b.js";const c={},u=r(`<h1 id="插入排序" tabindex="-1"><a class="header-anchor" href="#插入排序" aria-hidden="true">#</a> 插入排序</h1><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><p>“插入排序”不断地待排序（第i个元素）元素交换到<code>[0，i]</code>合适位置。实现主要包含两种：</p><ol><li>从后向前顺序比较</li><li>从前向后顺序比较</li></ol><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><p>从后向前顺序比较代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func insertSort(num []int) []int {
  // 总长度
  length := len(num)
  // 不能从0开始因为第一个元素要跟0对比
  for i := 1; i &lt; length; i++ {
    //  从当前元素查找，如果前面元素大于当前元素，进行交换
    for j := i; j &gt; 0 &amp;&amp; num[j] &lt; num[j-1]; j-- {
      num[j] = num[j] ^ num[j-1]
      num[j-1] = num[j] ^ num[j-1]
      num[j] = num[j] ^ num[j-1]
    }
  }
  return num
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从前向后顺序比较代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func insertSortWithFront(num []int) []int {
  length := len(num)
  for i := 0; i &lt; length; i++ {
    // 保存第i个值
    insertV := num[i]
    successIndex := i
    // 从前面开始迭代，找到正确位置
    for j := 0; j &lt; i; j++ {
      if num[j] &gt; num[i] {
        successIndex = j
        break
      }
    }
    // 已经查找到了正确位置，其正确位置是successIndex，将所有数据向后面进行转移
    for j := i; j &gt; successIndex; j-- {
      num[j] = num[j-1]
    }
    // 设置successIndex为正确的值
    num[successIndex] = insertV
  }
  return num
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h2>`,10),m={href:"https://book.douban.com/subject/3227098/",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),e(" 总结")],-1),o=n("ul",null,[n("li",null,[e("时间复杂度O("),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msup",null,[n("mi",null,"x"),n("mn",null,"2")])]),n("annotation",{encoding:"application/x-tex"},"x^2")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.8141em"}}),n("span",{class:"mord"},[n("span",{class:"mord mathnormal"},"x"),n("span",{class:"msupsub"},[n("span",{class:"vlist-t"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.8141em"}},[n("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},"2")])])])])])])])])])]),e(")")]),n("li",null,"稳定排序"),n("li",null,"原地排序"),n("li",null,"无额外存储")],-1);function h(b,p){const i=t("ExternalLinkIcon");return a(),l("div",null,[u,n("p",null,[e("使用移动代替交换进行优化，减少数据交换次数，参考"),n("a",m,[e("《编程珠玑》"),d(i)]),e("。")]),v,o])}const g=s(c,[["render",h],["__file","insert-sort.html.vue"]]);export{g as default};
