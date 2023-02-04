import{_ as n,V as s,W as a,$ as e}from"./framework-5793c714.js";const t={},p=e(`<h1 id="归并排序" tabindex="-1"><a class="header-anchor" href="#归并排序" aria-hidden="true">#</a> 归并排序</h1><p><code>Arrays#sort</code> 包含三种常见排序，双轴快排，归并排序，插入排序，“归并排序”是分治思想，涉及到两项操作：拆分、合并。</p><ul><li>基本类型排序可以忽略稳定性，可以使用双轴快排；</li><li>归并排序可以保证排序的稳定性，对非基本类型比较好；</li><li>插入排序在小空间排序性能特别好。</li></ul><h2 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> 优势</h2><ol><li>数据包含<code>age，class</code>字段，先按照<code>age</code>进行排序，在按照<code>class</code>进行排序， 如果使用稳定性算法进行排序，结果是班级相同的在一起，并且按照年龄大小排序；</li><li><code>Arrays#sort</code>基本类型的排序，因为不包含状态，所以使用快排就挺好。</li></ol><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><h3 id="自顶而下" tabindex="-1"><a class="header-anchor" href="#自顶而下" aria-hidden="true">#</a> 自顶而下</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">INSERTIONSORT_THRESHOLD</span> <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">legacyMergeSort</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span>
                                        <span class="token keyword">int</span> fromIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> toIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 辅助空间</span>
        <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> aux <span class="token operator">=</span> <span class="token function">copyOfRange</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> fromIndex<span class="token punctuation">,</span> toIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 归并排序</span>
        <span class="token function">mergeSort</span><span class="token punctuation">(</span>aux<span class="token punctuation">,</span> a<span class="token punctuation">,</span> fromIndex<span class="token punctuation">,</span> toIndex<span class="token punctuation">,</span> <span class="token operator">-</span>fromIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> src<span class="token punctuation">,</span>
                                <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dest<span class="token punctuation">,</span>
                                <span class="token keyword">int</span> low<span class="token punctuation">,</span>
                                <span class="token keyword">int</span> high<span class="token punctuation">,</span>
                                <span class="token keyword">int</span> off<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">int</span> length <span class="token operator">=</span> high <span class="token operator">-</span> low<span class="token punctuation">;</span>
      <span class="token comment">// 排序数据特别小使用插入排序</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">&lt;</span> <span class="token constant">INSERTIONSORT_THRESHOLD</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span>low<span class="token punctuation">;</span> i<span class="token operator">&lt;</span>high<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
              <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j<span class="token operator">=</span>i<span class="token punctuation">;</span> j<span class="token operator">&gt;</span>low <span class="token operator">&amp;&amp;</span>
                        <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">)</span> dest<span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>dest<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span>
                  <span class="token function">swap</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span> j<span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">int</span> destLow  <span class="token operator">=</span> low<span class="token punctuation">;</span>
      <span class="token keyword">int</span> destHigh <span class="token operator">=</span> high<span class="token punctuation">;</span>
      low  <span class="token operator">+=</span> off<span class="token punctuation">;</span>
      high <span class="token operator">+=</span> off<span class="token punctuation">;</span>
      <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>low <span class="token operator">+</span> high<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token comment">// 递归调用</span>
      <span class="token function">mergeSort</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span> src<span class="token punctuation">,</span> low<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> <span class="token operator">-</span>off<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">mergeSort</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span> src<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> high<span class="token punctuation">,</span> <span class="token operator">-</span>off<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 这里是优化 我们可以添加一个判断条件，如果a[mid]小于等于a[mid+1]，我们就认为数组已经是有序的并跳过merge()方法。这个改动不影响排序的递归调用，但是任意有序的子数组算法的运行时间就变为线性的了</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">)</span>src<span class="token punctuation">[</span>mid<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> low<span class="token punctuation">,</span> dest<span class="token punctuation">,</span> destLow<span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// copy辅助数组到原数组</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> destLow<span class="token punctuation">,</span> p <span class="token operator">=</span> low<span class="token punctuation">,</span> q <span class="token operator">=</span> mid<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> destHigh<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>q <span class="token operator">&gt;=</span> high <span class="token operator">||</span> p <span class="token operator">&lt;</span> mid <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">)</span>src<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>q<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span>
              dest<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> src<span class="token punctuation">[</span>p<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
          <span class="token keyword">else</span>
              dest<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> src<span class="token punctuation">[</span>q<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 交换两个元素</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Object</span> t <span class="token operator">=</span> x<span class="token punctuation">[</span>a<span class="token punctuation">]</span><span class="token punctuation">;</span>
      x<span class="token punctuation">[</span>a<span class="token punctuation">]</span> <span class="token operator">=</span> x<span class="token punctuation">[</span>b<span class="token punctuation">]</span><span class="token punctuation">;</span>
      x<span class="token punctuation">[</span>b<span class="token punctuation">]</span> <span class="token operator">=</span> t<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Go版本</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func mergeTopDownSort(nums []int, aux []int, low, high int) {
  // 如果就一个元素，直接返回
  if low &gt;= high {
    return
  }
  // 查找中点
  mid := low + (high-low)/2
  // 左边进行切割
  mergeTopDownSort(nums, aux, low, mid)
  // 右边进行切割
  mergeTopDownSort(nums, aux, mid+1, high)
  // 合并s
  mergeTopDown(nums, aux, low, mid, high)
}

func mergeTopDown(nums []int, aux []int, low, mid, high int) {
  // 复制数据到辅助数组
  for i := low; i &lt;= high; i++ {
    aux[i] = nums[i]
  }
  // 设置最低的index
  lowIndex := low
  // 设置高index
  highIndex := mid + 1
  for i := low; i &lt;= high; i++ {
    if lowIndex &gt; mid {
      //  左边获取完毕
      nums[i] = aux[highIndex]
      highIndex = highIndex + 1
    } else if highIndex &gt; high {
      // 右边获取完毕
      nums[i] = aux[lowIndex]
      lowIndex = lowIndex + 1
    } else if aux[lowIndex] &lt; aux[highIndex] {
      // 都没获取完毕，并且左边小于右边
      nums[i] = aux[lowIndex]
      lowIndex = lowIndex + 1
    } else {
      // 都没获取完毕，并且右边小于左边
      nums[i] = aux[highIndex]
      highIndex = highIndex + 1
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自底而上" tabindex="-1"><a class="header-anchor" href="#自底而上" aria-hidden="true">#</a> 自底而上</h3><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func mergeDownTopSort(num []int) {
  length := len(num)
  aux := make([]int, length)
  for sz := 1; sz &lt; length; sz = sz + sz { //sz 子数组大小
    //  因为每次合并的都是2sz,所以下次处理的位置是2sz
    // 1 2 4 8 16
    for low := 0; low &lt; length-sz; low += sz + sz { //子数组索引
      high := low
      if low+sz+sz-1 &gt; length-1 {
        high = length - 1
      } else {
        high = low + sz + sz - 1
      }
      mergeTopDown(num, aux, low, low+sz-1, high)
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>时间复杂度O(NlogN)</li><li>稳定排序</li><li>不是原地排序</li><li>空间负责度O(N)</li></ul>`,14),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(t,[["render",i],["__file","merge-sort.html.vue"]]);export{d as default};
