import{_ as i,V as d,W as s,Y as l,a1 as e,Z as a,$ as r,a0 as v,F as c}from"./framework-e54e0297.js";const u={},o=v(`<h1 id="奇偶互换" tabindex="-1"><a class="header-anchor" href="#奇偶互换" aria-hidden="true">#</a> 奇偶互换</h1><p>58面试时候面的算法题，就是一个数组，奇数放前面，偶数放后面。</p><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// 面试题，将奇数放到前面 偶数放到后面
// 时间复杂度为O(n) 空间复杂度为 i , length
func swap(p []int) []int {
  lowIndex := 0
  highIndex := len(p) - 1

  for true {
    // 如果当前是奇数一直走，走到一个偶数暂停
    for p[lowIndex]%2 != 0 {
      if lowIndex &gt;= highIndex {
        break
      } else {
        lowIndex++
      }
    }
    // 如果当前是偶数一直走，走到一个偶数暂停
    for p[highIndex]%2 == 0 {
      if lowIndex &gt;= highIndex {
        break
      } else {
        highIndex--
      }
    }
    // 如果两个值相遇不在走了
    if lowIndex &gt;= highIndex {
      break
    }
        // 找到了奇数和偶数，交换
    p[lowIndex], p[highIndex] = p[highIndex], p[lowIndex]

  }
  return p
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h2>`,5);function t(m,h){const n=c("RouterLink");return d(),s("div",null,[o,l("p",null,[e("数据交换时候可以不借用三方变量吗？请查看"),a(n,{to:"/basic-skill/algorithms/other/xor.html"},{default:r(()=>[e("Xor")]),_:1})])])}const x=i(u,[["render",t],["__file","odd-even.html.vue"]]);export{x as default};
