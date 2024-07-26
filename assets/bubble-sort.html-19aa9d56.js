import{_ as s,V as a,W as l,a0 as i,Y as e,a1 as n}from"./framework-e54e0297.js";const t={},r=i(`<h1 id="冒泡排序" tabindex="-1"><a class="header-anchor" href="#冒泡排序" aria-hidden="true">#</a> 冒泡排序</h1><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><p>”冒泡排序“（Bubble Sort）是一种最简单的交换排序方法，它通过两两比较相邻记录的关键字，如果发生逆序，则进行交换，从而使关键字小的记录如气泡一般逐渐往上“漂浮”（左移），或者使关键字大的记录如石块一样逐渐向下“坠落”（右移）。</p><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func bubbleSort(num []int) []int {
  length := len(num)
  for i := 0; i &lt; length; i++ {
    for j := 0; j &lt; length-i-1; j++ {
      if num[j] &gt; num[j+1] {
        num[j], num[j+1] = num[j+1], num[j]
      }
    }
  }
  return num
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>每冒一次泡，数据最大的值都会排到<code>length-i</code>处。</p>`,7),d=e("ul",null,[e("li",null,[n("时间复杂度O("),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("msup",null,[e("mi",null,"x"),e("mn",null,"2")])]),e("annotation",{encoding:"application/x-tex"},"x^2")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8141em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8141em"}},[e("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},"2")])])])])])])])])])]),n(")")]),e("li",null,"稳定排序"),e("li",null,"原地排序"),e("li",null,"无额外存储")],-1),c=[r,d];function u(m,h){return a(),l("div",null,c)}const p=s(t,[["render",u],["__file","bubble-sort.html.vue"]]);export{p as default};