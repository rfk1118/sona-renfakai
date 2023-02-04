import{_ as l,V as d,W as t,X as n,a0 as i,Y as a,$ as e,F as c}from"./framework-5793c714.js";const r={},u=e('<h1 id="快速排序" tabindex="-1"><a class="header-anchor" href="#快速排序" aria-hidden="true">#</a> 快速排序</h1><h2 id="划分" tabindex="-1"><a class="header-anchor" href="#划分" aria-hidden="true">#</a> 划分</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>划分是快排的核心</p></div><p>划分算法使用双指针进行工作，初始时两个指针分别指向数组的两头（这里的指针其实是数组的角标，而不是引用），在左边的指针，向右移动，而右边的指针向左移动。 当<code>leftPtr</code>遇到比枢纽小的数据项时候，向右移动，因为这个数据已经在正确的位置了，当<code>rightPtr</code>遇到比枢纽大的数据项时候，向左移动，因为这个数据也已经在正确位置了。如果<code>leftPtr</code>大于了<code>rightPtr</code>说明已经处理完毕了。</p><h2 id="标准快排" tabindex="-1"><a class="header-anchor" href="#标准快排" aria-hidden="true">#</a> 标准快排</h2>',5),o={href:"https://algs4.cs.princeton.edu/23quicksort/Quick.java.html",target:"_blank",rel:"noopener noreferrer"},v=n("li",null,"使用最后一个元素作为切割点的，例如《编程珠玑》",-1),m=e(`<div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// QuickSort 标准快排，这里使用lo元素作为切割垫
func QuickSort(num []int) {
  QuickSortWithIndex(num, 0, len(num)-1)
}
// QuickSortWithIndex 对从low~high处的数据进行排序
func QuickSortWithIndex(num []int, low, high int) {
  if low &gt;= high {
    return
  }
  // 这里是排序的核心
  partition := partitionWithIndex(num, low, high)
  QuickSortWithIndex(num, low, partition-1)
  QuickSortWithIndex(num, partition+1, high)
}

//  核心代码在这里也就是进行双轴 partition
func partitionWithIndex(num []int, low int, high int) int {
  lowIndex := low + 1
  highIndex := high
  // 使用最小元素作为partition
  pV := num[low]
  // 双轴交换大小值
  for true {
    for num[lowIndex] &lt; pV {
      if lowIndex &gt;= high {
        break
      } else {
        lowIndex++
      }
    }

    for num[highIndex] &gt; pV {
      if highIndex &lt;= low {
        break
      } else {
        highIndex--
      }
    }
    // 如果已经相遇，则跳出总循环
    if lowIndex &gt;= highIndex {
      break
    }
    // 交换内层数据
    num[lowIndex], num[highIndex] = num[highIndex], num[lowIndex]
  }
  // 将partition放到正确位置
  num[low], num[highIndex] = num[highIndex], num[low]
  return highIndex
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="性能问题" tabindex="-1"><a class="header-anchor" href="#性能问题" aria-hidden="true">#</a> 性能问题</h2>`,2),p=n("ol",null,[n("li",null,[i("标准版本，对"),n("code",null,"[9,8,7,6,5,4,3,2,1]"),i("进行排序，每次的"),n("code",null,"partition"),i("都无法正确切割数组，导致性能降低到O("),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msup",null,[n("mi",null,"n"),n("mn",null,"2")])]),n("annotation",{encoding:"application/x-tex"},"n^2")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.8141em"}}),n("span",{class:"mord"},[n("span",{class:"mord mathnormal"},"n"),n("span",{class:"msupsub"},[n("span",{class:"vlist-t"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.8141em"}},[n("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},"2")])])])])])])])])])]),i(")；")]),n("li",null,[i("标准版本，对"),n("code",null,"[9,8,3,6,3,3,3,2,1]"),i("进行排序，性能也会降低，出现了大量相同元素。")])],-1),h=e(`<h2 id="优化方案" tabindex="-1"><a class="header-anchor" href="#优化方案" aria-hidden="true">#</a> 优化方案</h2><h3 id="切割数组" tabindex="-1"><a class="header-anchor" href="#切割数组" aria-hidden="true">#</a> 切割数组</h3><ul><li>二分方案，从被切割数组中随机获取一个数字，也就是 <code>pV := num[low]</code> 使用随机值。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token comment">// 随机出来一个大于lo,小于hi的整数</span>
 <span class="token keyword">int</span> m <span class="token operator">=</span> <span class="token function">random</span><span class="token punctuation">(</span>lo<span class="token punctuation">,</span> hi<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token function">exch</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> m<span class="token punctuation">,</span> lo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>三取样切分获取中位数，处理数据分布问题。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token comment">// 获取中位数</span>
 <span class="token keyword">int</span> m <span class="token operator">=</span> <span class="token function">median3</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> lo<span class="token punctuation">,</span> lo <span class="token operator">+</span> n<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">,</span> hi<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">// 将数放到low,这样排序的时候就用不到了</span>
 <span class="token function">exch</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> m<span class="token punctuation">,</span> lo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="相同元素" tabindex="-1"><a class="header-anchor" href="#相同元素" aria-hidden="true">#</a> 相同元素</h3><div class="hint-container tip"><p class="hint-container-title">提示</p><p>20世纪70年代，快速排序发布不久后三向切分的快速排序就出现了，但它并没有流行开来，因为在数组中重复元素不多的普通情况下它比标准的二分法多使用了很多次交换。</p></div>`,8),b={href:"https://algs4.cs.princeton.edu/23quicksort/Quick3way.java.html",target:"_blank",rel:"noopener noreferrer"},g=e(`<div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// QuickSort3Way 切割成 x&lt;T.....T&lt;y
func QuickSort3Way(num []int) {
  QuickSortWithIndex3Way(num, 0, len(num)-1)
}

// QuickSortWithIndex3Way 对从low~high处的数据进行排序
func QuickSortWithIndex3Way(num []int, low, high int) {
  if low &gt;= high {
    return
  }
  // 设置双轴
  lt := low
  gt := high
  pV := num[low]
  index := low + 1
  for index &lt;= gt {
    // index向下走
    if num[index] &lt; pV {
      num[lt], num[index] = num[index], num[lt]
      lt++
      index++
    } else if num[index] &gt; pV {
      num[gt], num[index] = num[index], num[gt]
      gt--
    } else {
      index++
    }
  }
  //partition := partitionWithIndex(num, low, high)
  QuickSortWithIndex3Way(num, low, lt-1)
  QuickSortWithIndex3Way(num, gt+1, high)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>时间复杂度O(nlogn)</li><li>不稳定排序</li><li>不是原地排序</li><li>空间负责度O(nlogn)</li></ul>`,3);function k(x,f){const s=c("ExternalLinkIcon");return d(),t("div",null,[u,n("ol",null,[n("li",null,[i("标准版排序比较简单，"),n("a",o,[i("《算法4》QuickSort"),a(s)]),i("中使用第一个元素作为切割点")]),v]),m,p,h,n("p",null,[i("三向分切，解决数据重复比较多的问题，"),n("a",b,[i("算法4代码"),a(s)])]),g])}const I=l(r,[["render",k],["__file","quick-sort.html.vue"]]);export{I as default};
