import{_ as i,V as s,W as l,a0 as a,Y as n,a1 as e}from"./framework-1bd9c91b.js";const t={},d=a(`<h1 id="选择排序" tabindex="-1"><a class="header-anchor" href="#选择排序" aria-hidden="true">#</a> 选择排序</h1><p>“选择排序”不断地从<code>(i，n]</code>选择一个最小值插入到 <code>i</code>处。</p><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><ol><li>首先，找到数组中最小的那个元素；</li><li>其次，将它和数组的第一个元素交换位置（如果第一个元素就是最小元素那么它就和自己交换）；</li><li>再次，在剩下的元素中找到最小的元素，将它与数组的第二个元素交换位置；</li><li>如此往复，直到将整个数组排序。</li></ol><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func selectSort(num []int) []int {
  length := len(num)
  // 从第0开始查找最小的值
  for i := 0; i &lt; length; i++ {
    minIndex := i
    for j := i + 1; j &lt; length; j++ {
      if num[j] &lt; num[minIndex] {
        // 找到最小值
        minIndex = j
      }
    }
    // 交换
    temp := num[i]
    num[i] = num[minIndex]
    num[minIndex] = temp
  }
  return num
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>`,7),r=n("ul",null,[n("li",null,[e("时间复杂度O("),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msup",null,[n("mi",null,"x"),n("mn",null,"2")])]),n("annotation",{encoding:"application/x-tex"},"x^2")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.8141em"}}),n("span",{class:"mord"},[n("span",{class:"mord mathnormal"},"x"),n("span",{class:"msupsub"},[n("span",{class:"vlist-t"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.8141em"}},[n("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},"2")])])])])])])])])])]),e(")")]),n("li",null,"不稳定排序"),n("li",null,"原地排序"),n("li",null,"无额外存储")],-1),c=[d,r];function m(u,h){return s(),l("div",null,c)}const v=i(t,[["render",m],["__file","select-sort.html.vue"]]);export{v as default};
