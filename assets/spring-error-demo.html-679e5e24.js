import{_ as e,V as t,W as l,Y as n,a1 as s,Z as p,a0 as i,F as o}from"./framework-e54e0297.js";const c={},u=i(`<h1 id="错误案例" tabindex="-1"><a class="header-anchor" href="#错误案例" aria-hidden="true">#</a> 错误案例</h1><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><p>我们是否中了 Spring 的毒，代码编程模式变成了 <code>Controller -&gt; Service -&gt; Dao</code> (1:1:1)编写。 贫血模型案例代码布局如下:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── <span class="token function">service</span>
│   ├── OtherService.java
│   └── impl
│       └── OtherServiceImpl.java
└── web
    ├── OtherController.http
    └── OtherController.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>先看一眼 dto</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloRequest</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> policy<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>在看一下 Controller 代码</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/other&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OtherController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">OtherService</span> otherService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> otherService<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>看一下 Service 代码:</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OtherService</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OtherServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">OtherService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>helloRequest<span class="token punctuation">.</span><span class="token function">getPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> helloRequest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> helloRequest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后进行测试，完全符合预期，测试结果如下:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Testing started at <span class="token number">10</span>:01 <span class="token punctuation">..</span>.

// 进行测试
GET http://localhost:8080/other/world?name<span class="token operator">=</span>ren<span class="token operator">&amp;</span><span class="token assign-left variable">policy</span><span class="token operator">=</span>hello

HTTP/1.1 <span class="token number">200</span>
Content-Type: text/plain<span class="token punctuation">;</span><span class="token assign-left variable">charset</span><span class="token operator">=</span>UTF-8
Content-Length: <span class="token number">8</span>
Date: Mon, <span class="token number">20</span> Apr <span class="token number">2020</span> 02:01:50 GMT
Keep-Alive: <span class="token assign-left variable">timeout</span><span class="token operator">=</span><span class="token number">60</span>
Connection: keep-alive

<span class="token operator">&gt;</span> <span class="token number">2020</span>-04-20T100150.200.txt <span class="token operator">&gt;</span> renhello

<span class="token comment">###</span>
GET http://localhost:8080/other/hello?name<span class="token operator">=</span>ren<span class="token operator">&amp;</span><span class="token assign-left variable">policy</span><span class="token operator">=</span>world
Response code: <span class="token number">200</span><span class="token punctuation">;</span> Time: 54ms<span class="token punctuation">;</span> Content length: <span class="token number">8</span> bytes
HTTP/1.1 <span class="token number">200</span>
Content-Type: text/plain<span class="token punctuation">;</span><span class="token assign-left variable">charset</span><span class="token operator">=</span>UTF-8
Content-Length: <span class="token number">8</span>
Date: Mon, <span class="token number">20</span> Apr <span class="token number">2020</span> 02:01:50 GMT
Keep-Alive: <span class="token assign-left variable">timeout</span><span class="token operator">=</span><span class="token number">60</span>
Connection: keep-alive

<span class="token operator">&gt;</span> <span class="token number">2020</span>-04-20T100150-1.200.txt <span class="token operator">&gt;</span> renworld

Response code: <span class="token number">200</span><span class="token punctuation">;</span> Time: 56ms<span class="token punctuation">;</span> Content length: <span class="token number">8</span> bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 Service 的实现，这里如果请求的 policy 为 hello，则进行 hello 处理，如果这里为 world 处理，则进行 world 返回， 未来进行扩展业务，我们也就编程了下面这个样子:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  <span class="token comment">// 这段代码完全违背了OCP原则，扩展和测试增加了很大的难度。</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>helloRequest<span class="token punctuation">.</span><span class="token function">getPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> helloRequest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// dosomething</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// dosomething ....</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> helloRequest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我怎么把 Java 的多态丢了，好像是这个样子，然后你进行了重构。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token punctuation">.</span>
├── service
│   ├── <span class="token class-name">SimpleService</span><span class="token punctuation">.</span>java
│   └── impl
│       ├── <span class="token class-name">HelloSimpleServiceImpl</span><span class="token punctuation">.</span>java
│       └── <span class="token class-name">WorldSimpleServiceImpl</span><span class="token punctuation">.</span>java
└── web
    ├── <span class="token class-name">SimpleController</span><span class="token punctuation">.</span>http
    └── <span class="token class-name">SimpleController</span><span class="token punctuation">.</span>java

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>让我们来看一下一个 Controller:</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/simple&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleController</span> <span class="token punctuation">{</span>
    <span class="token comment">// Resource = Autowired+Qualifier</span>
    <span class="token doc-comment comment">/**
     * style1 Autowired+Qualifier
     */</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;helloSimpleServiceImpl&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">SimpleService</span> helloService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     *  style2 Resource = Autowired+Qualifier
     */</span>
    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;worldSimpleServiceImpl&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">SimpleService</span> worldService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helloService<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/world&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">world</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> worldService<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>然后看一下 Service:</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">SimpleService</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@param</span> <span class="token parameter">helloRequest</span> 请求
     */</span>
    <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Service</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;helloSimpleServiceImpl&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloSimpleServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">SimpleService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helloRequest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Service</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;worldSimpleServiceImpl&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WorldSimpleServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">SimpleService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helloRequest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>进行测试:</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
Testing started at 10:08 ...

HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 8
Date: Mon, 20 Apr 2020 02:08:36 GMT
Keep-Alive: timeout=60
Connection: keep-alive

&gt; 2020-04-20T100836.200.txt &gt; renworld

Response code: 200; Time: 19ms; Content length: 8 bytes
HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 8
Date: Mon, 20 Apr 2020 02:08:36 GMT
Keep-Alive: timeout=60
Connection: keep-alive

&gt; 2020-04-20T100836-1.200.txt &gt; renhello

Response code: 200; Time: 53ms; Content length: 8 bytes

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们发现好像问题没有解决，只是把 Service 问题转移到了 Controller，添加一个策略我们都需要添加一个控制器，无法根据数据进行动态选择策略。 下一章我们将用策略(多态)+享元模式解决这个问题。</p>`,23),r={id:"github-地址",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#github-地址","aria-hidden":"true"},"#",-1),v={href:"https://github.com/sona0402/Polymorphism",target:"_blank",rel:"noopener noreferrer"};function k(m,b){const a=o("ExternalLinkIcon");return t(),l("div",null,[u,n("h2",r,[d,s(),n("a",v,[s("Github 地址"),p(a)])])])}const h=e(c,[["render",k],["__file","spring-error-demo.html.vue"]]);export{h as default};
