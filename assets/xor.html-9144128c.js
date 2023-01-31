import{_ as o,V as p,W as r,X as a,a0 as n,Y as t,$ as s,F as l}from"./framework-fd210779.js";const c={},i=s(`<h1 id="xor" tabindex="-1"><a class="header-anchor" href="#xor" aria-hidden="true">#</a> Xor</h1><h2 id="异或运算" tabindex="-1"><a class="header-anchor" href="#异或运算" aria-hidden="true">#</a> 异或运算</h2><p>之前看过很多书籍和视频，会使用异或运算进行数据交换，也将数据转换成二进制进行计算过，比如a=1，b=3，标准操作如下:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>a <span class="token operator">=</span> <span class="token number">1</span>  <span class="token comment">// 01</span>
b <span class="token operator">=</span> <span class="token number">3</span>  <span class="token comment">// 11</span>

a <span class="token operator">=</span> a <span class="token operator">^</span> b <span class="token operator">=</span> <span class="token number">01</span> <span class="token operator">^</span> <span class="token number">11</span> <span class="token operator">=</span> <span class="token number">10</span>
b <span class="token operator">=</span> a <span class="token operator">^</span> b <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">^</span> <span class="token number">11</span> <span class="token operator">=</span> <span class="token number">01</span>
a <span class="token operator">=</span> a <span class="token operator">^</span> b <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">^</span> <span class="token number">01</span> <span class="token operator">=</span> <span class="token number">11</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结合律" tabindex="-1"><a class="header-anchor" href="#结合律" aria-hidden="true">#</a> 结合律</h2><ol><li>相同的数异或为 0 ：n ^ n = 0</li><li>任何数于 0 异或为任何数： 0 ^ n = n</li><li>a ^ b ^ c = a ^ c ^ b</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>a <span class="token operator">=</span> a
b <span class="token operator">=</span> b

a <span class="token operator">=</span> a <span class="token operator">^</span> b
<span class="token comment">// 此时 a = a ^ b</span>
b <span class="token operator">=</span> a <span class="token operator">^</span> b <span class="token operator">=</span> a <span class="token operator">^</span> b  <span class="token operator">^</span> b <span class="token operator">=</span> a <span class="token operator">^</span> <span class="token number">0</span> <span class="token operator">=</span> a
<span class="token comment">// 因为这时a = a ^ b</span>
a <span class="token operator">=</span> a <span class="token operator">^</span> b <span class="token operator">=</span> a <span class="token operator">^</span> b <span class="token operator">^</span> a <span class="token operator">=</span> a <span class="token operator">^</span> a <span class="token operator">^</span> b <span class="token operator">=</span> <span class="token number">0</span> <span class="token operator">^</span> b <span class="token operator">=</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2>`,8),d={href:"https://leetcode-cn.com/problems/single-number/",target:"_blank",rel:"noopener noreferrer"},u=s(`<p>说明：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>示例 <span class="token number">1</span><span class="token operator">:</span>
输入<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span>
输出<span class="token operator">:</span> <span class="token number">1</span>

示例 <span class="token number">2</span><span class="token operator">:</span>
输入<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span>
输出<span class="token operator">:</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>其实上面的题可以把出现一次变成出现奇数次，其他都是偶数</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func singleNumber(nums []int) int {
  result := 0
  for _, num := range nums {
    result = result ^ num
  }
  return result
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function b(k,m){const e=l("ExternalLinkIcon");return p(),r("div",null,[i,a("p",null,[a("a",d,[n("136. 只出现一次的数字"),t(e)]),n("给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。")]),u])}const h=o(c,[["render",b],["__file","xor.html.vue"]]);export{h as default};
