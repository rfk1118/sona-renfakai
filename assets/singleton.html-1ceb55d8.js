import{_ as o,V as c,W as l,Y as n,a1 as s,Z as a,$ as i,a0 as u,F as e}from"./framework-1bd9c91b.js";const r="/assets/question-34a60d78.png",k={},d=u('<h1 id="spring单例bean对jvm的影响" tabindex="-1"><a class="header-anchor" href="#spring单例bean对jvm的影响" aria-hidden="true">#</a> Spring单例bean对jvm的影响</h1><p>问题是朋友在面试遇到的，自己从知识框架里找到了相关的知识点，写个文章记录一下。 <img src="'+r+`" alt="An image"></p><h2 id="单例设计模式" tabindex="-1"><a class="header-anchor" href="#单例设计模式" aria-hidden="true">#</a> 单例设计模式</h2><p>单例设计模式大家都会写，不管是懒汉式还是饿汉式，只要单例被初始化后基本上都会随着虚拟机生命周期销毁而销毁，即然是这样，那在虚拟机中必然会从新生代晋级到老年代。</p><h3 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h3><p>如果在工作中需要多个单例的bean，还不想被spring生命周期管理，可以使用下面方式进行编写。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// hashcode and eq方法省略</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">StudentPredicateE</span> <span class="token punctuation">{</span>

    <span class="token function">NAME_SUPPLIER</span><span class="token punctuation">(</span>student <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> student <span class="token operator">||</span> student<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> student<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token function">AGE_SUPPLIER</span><span class="token punctuation">(</span>student <span class="token operator">-&gt;</span> student<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token punctuation">;</span>

    <span class="token class-name">StudentPredicateE</span><span class="token punctuation">(</span><span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>p <span class="token operator">=</span> p<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 这里一定设置成final，并且不提供set方法</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span> p<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span> <span class="token function">getP</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> p<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// todo 省略查询和添加过程</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span> l <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 判断年龄符合条件</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span> ageS <span class="token operator">=</span> l<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">StudentPredicateE</span><span class="token punctuation">.</span><span class="token constant">AGE_SUPPLIER</span><span class="token punctuation">.</span><span class="token function">getP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 判断姓名符合条件</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span> nameS <span class="token operator">=</span> l<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">StudentPredicateE</span><span class="token punctuation">.</span><span class="token constant">NAME_SUPPLIER</span><span class="token punctuation">.</span><span class="token function">getP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 查找年龄和姓名都不符合条件，这里使用了negate</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span> negate <span class="token operator">=</span> l<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">StudentPredicateE</span><span class="token punctuation">.</span><span class="token constant">NAME_SUPPLIER</span><span class="token punctuation">.</span><span class="token function">getP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">negate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token class-name">StudentPredicateE</span><span class="token punctuation">.</span><span class="token constant">AGE_SUPPLIER</span><span class="token punctuation">.</span><span class="token function">getP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">negate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring单例bean" tabindex="-1"><a class="header-anchor" href="#spring单例bean" aria-hidden="true">#</a> Spring单例bean</h2>`,8),m={href:"https://www.geeksforgeeks.org/singleton-and-prototype-bean-scopes-in-java-spring/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://refactoringguru.cn/design-patterns/prototype",target:"_blank",rel:"noopener noreferrer"},b=n("h2",{id:"影响",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#影响","aria-hidden":"true"},"#"),s(" 影响")],-1),g=n("li",null,"跳过虚拟机加载和验证机制，因为能力问题暂时先写到这里；",-1),h=n("li",null,"复制算法，因为新生代总是朝生夕死，所以新生代基本上都是复制算法，单例bean对此方法产生不大。",-1),f={href:"https://leetcode.cn/problems/copy-list-with-random-pointer/solution/",target:"_blank",rel:"noopener noreferrer"},_=n("li",null,[s("标记清除，如果老年代对象都是大对象，并且在极致情况下空余空间无法分配给新晋级的对象，依然会产生标记整理方法，这也就是为什么"),n("code",null,"CMS"),s("垃圾回收需要"),n("code",null,"Serial Old"),s("作为兜底。")],-1),y=n("h2",{id:"进阶",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#进阶","aria-hidden":"true"},"#"),s(" 进阶")],-1),w={href:"https://book.douban.com/subject/26821357/",target:"_blank",rel:"noopener noreferrer"},S=n("h2",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),s(" 参考")],-1),P={href:"https://www.geeksforgeeks.org/singleton-and-prototype-bean-scopes-in-java-spring/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://docs.oracle.com/javase/specs/jvms/se17/jvms17.pdf",target:"_blank",rel:"noopener noreferrer"},x={href:"https://refactoringguru.cn/design-patterns/prototype",target:"_blank",rel:"noopener noreferrer"},L={href:"https://book.douban.com/subject/26821357/",target:"_blank",rel:"noopener noreferrer"},j={href:"https://leetcode.cn/problems/copy-list-with-random-pointer/solution/",target:"_blank",rel:"noopener noreferrer"};function A(N,R){const t=e("ExternalLinkIcon"),p=e("RouterLink");return c(),l("div",null,[d,n("ol",null,[n("li",null,[s("SpringBean包含多种范围(Singleton、Prototype、Request、Session、Global-Session)，相关详细内容可以"),n("a",m,[s("参考"),a(t)]),s("；")]),n("li",null,[s("一般情况下单例bean都是无副作用的，即成员变量不会在高并发下产生错误影响，如果会产生错误影响就不建议使用单例bean，在现实工作中也会将结果数据封闭到方法内，即Frames中，可以"),a(p,{to:"/languages/java/jvm/layout/Frames.html"},{default:i(()=>[s("参考")]),_:1}),s("；")]),n("li",null,[s("单例Bean可以跳过虚拟机加载、验证、准备、解析等类加载和校验机制，性能特别高、原型设计模式也是此方法跳过类加载机制的，可以"),n("a",v,[s("参考"),a(t)]),s("，小提醒，个人对xxx没有观点，只是该网站设计模式写的比较清晰才推荐。")])]),b,n("ol",null,[g,n("li",null,[s("对象从新生代晋升到老年代，即然对象不会被清除，这时候对虚拟机调优时需要考虑虚拟机最大吞吐量、最短回收停顿时间那个优先，以此从垃圾回收算法上考虑产生的影响。 "),n("ul",null,[h,n("li",null,[s("标记整理，标记整理需要移动对象，所以需要复制之前的对象，并将其整理到一起，可以写一下"),n("a",f,[s("此算法"),a(t)]),s("感受下复杂程度，Java对象引用实际上是有向图，复杂程度要比刚才算法高很多，还要考虑数据在内存中分页以提高性能等。")]),_])])]),y,n("p",null,[s("标记整理算法需要考虑对象之间的引用尽量放到同一个内存页内，也是就是安排对象位置，与Mysql查询数据优化一致，这也是对标记整理算法的进阶，可以参考"),n("a",w,[s("垃圾回收的算法与实现 作者: 中村成洋 / 相川光"),a(t)]),s("中的第4.5 近似深度优先搜索方法。")]),S,n("ul",null,[n("li",null,[n("a",P,[s("Singleton and Prototype Bean Scopes in Java Spring"),a(t)])]),n("li",null,[n("a",E,[s("虚拟机 Frames"),a(t)])]),n("li",null,[n("a",x,[s("原型模式"),a(t)])]),n("li",null,[n("a",L,[s("垃圾回收的算法与实现 作者: 中村成洋 / 相川光"),a(t)])]),n("li",null,[n("a",j,[s("138. 复制带随机指针的链表"),a(t)])])])])}const B=o(k,[["render",A],["__file","singleton.html.vue"]]);export{B as default};
