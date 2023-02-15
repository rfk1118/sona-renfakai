import{_ as e,V as p,W as t,Y as n,a1 as s,Z as o,a0 as c,F as l}from"./framework-1bd9c91b.js";const i={},u=c(`<h1 id="spring-flyweight-policy" tabindex="-1"><a class="header-anchor" href="#spring-flyweight-policy" aria-hidden="true">#</a> spring-flyweight-policy</h1><h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h3><p>本章使用 Spring 的容器管理 Service，在处理业务时候根据映射进行转换，从 ApplicationContext 中获取到策略，极大减少了手动编写代码管理 Bean 的问题。 来看一下目录:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token punctuation">.</span>
├── <span class="token class-name">ApplicationContextProvider</span><span class="token punctuation">.</span>java
└── <span class="token class-name">ApplicationContextProviderSetter</span><span class="token punctuation">.</span>java

<span class="token number">0</span> directories<span class="token punctuation">,</span> <span class="token number">2</span> files

<span class="token punctuation">.</span>
├── dict
│   └── <span class="token class-name">FourPolicyNameEnum</span><span class="token punctuation">.</span>java
├── service
│   ├── <span class="token class-name">FourPolicyService</span><span class="token punctuation">.</span>java
│   └── impl
│       ├── <span class="token class-name">HelloFourPolicyServiceImpl</span><span class="token punctuation">.</span>java
│       ├── <span class="token class-name">NilFourPolicyServiceImpl</span><span class="token punctuation">.</span>java
│       └── <span class="token class-name">WorldFourPolicyServiceImpl</span><span class="token punctuation">.</span>java
└── web
    ├── <span class="token class-name">FourPolicyController</span><span class="token punctuation">.</span>http
    └── <span class="token class-name">FourPolicyController</span><span class="token punctuation">.</span>java

<span class="token number">4</span> directories<span class="token punctuation">,</span> <span class="token number">7</span> file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我门来看一下 Controller 代码:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/four&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FourPolicyController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/policy&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">policy</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">FourPolicyService</span> fourPolicyService <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">FourPolicyService</span><span class="token punctuation">)</span> <span class="token class-name">ApplicationContextProvider</span><span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">FourPolicyNameEnum</span><span class="token punctuation">.</span><span class="token function">getPolicyName</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> print <span class="token operator">=</span> fourPolicyService<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;result:{}&quot;</span><span class="token punctuation">,</span> print<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> print<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我门来看一下 Service 代码:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FourPolicyService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@param</span> <span class="token parameter">helloRequest</span> 请求
     */</span>
    <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloFourPolicyServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">FourPolicyService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helloRequest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WorldFourPolicyServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">FourPolicyService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helloRequest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NilFourPolicyServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">FourPolicyService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span> helloRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">ThreePolicyManager</span><span class="token punctuation">.</span><span class="token constant">NIL</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Bean</code> 如果实现了 <code>BeanNameAware</code> ，在 <code>Bean</code> 生命周期中可以设定 Bean 的名称( <code>void setBeanName(String name)</code> )，这里不建议使用， 使用 Spring 规约(类似 <code>Springboot</code> 规约大于配置一样)，这样的话 Service 名称为 Class 名称第一个字母小写，根据这一规则创建映射:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">FourPolicyNameEnum</span> <span class="token punctuation">{</span>

    <span class="token function">HELLO</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;helloFourPolicyServiceImpl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token function">WORLD</span><span class="token punctuation">(</span><span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;worldFourPolicyServiceImpl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token function">NIL</span><span class="token punctuation">(</span><span class="token string">&quot;Nil&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nilFourPolicyServiceImpl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> code<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> policyName<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getPolicyName</span><span class="token punctuation">(</span><span class="token class-name">String</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token constant">NIL</span><span class="token punctuation">.</span><span class="token function">getPolicyName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">FourPolicyNameEnum</span> value <span class="token operator">:</span> <span class="token class-name">FourPolicyNameEnum</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">getPolicyName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token constant">NIL</span><span class="token punctuation">.</span><span class="token function">getPolicyName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ApplicationContext</code> 保存和获取方式如下:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextProvider</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token class-name">ApplicationContextProvider</span><span class="token punctuation">.</span>applicationContext <span class="token operator">=</span> applicationContext<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ApplicationContext</span> <span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> applicationContext<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">T</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> requiredType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span>requiredType<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextProviderSetter</span> <span class="token keyword">implements</span> <span class="token class-name">ApplicationContextAware</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token class-name">ApplicationContextProvider</span><span class="token punctuation">.</span><span class="token function">setApplicationContext</span><span class="token punctuation">(</span>applicationContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后进行测试:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
 <span class="token class-name">Testing</span> started at <span class="token number">09</span><span class="token operator">:</span><span class="token number">57</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

 <span class="token constant">HTTP</span><span class="token operator">/</span><span class="token number">1.1</span> <span class="token number">200</span>
 <span class="token class-name">Content</span><span class="token operator">-</span><span class="token class-name">Type</span><span class="token operator">:</span> text<span class="token operator">/</span>plain<span class="token punctuation">;</span>charset<span class="token operator">=</span><span class="token constant">UTF</span><span class="token operator">-</span><span class="token number">8</span>
 <span class="token class-name">Content</span><span class="token operator">-</span><span class="token class-name">Length</span><span class="token operator">:</span> <span class="token number">8</span>
 <span class="token class-name">Date</span><span class="token operator">:</span> <span class="token class-name">Sun</span><span class="token punctuation">,</span> <span class="token number">25</span> <span class="token class-name">Apr</span> <span class="token number">2020</span> <span class="token number">01</span><span class="token operator">:</span><span class="token number">57</span><span class="token operator">:</span><span class="token number">36</span> <span class="token constant">GMT</span>
 <span class="token class-name">Keep</span><span class="token operator">-</span><span class="token class-name">Alive</span><span class="token operator">:</span> timeout<span class="token operator">=</span><span class="token number">60</span>
 <span class="token class-name">Connection</span><span class="token operator">:</span> keep<span class="token operator">-</span>alive

 <span class="token operator">&gt;</span> <span class="token number">2020</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">26</span><span class="token constant">T095736</span><span class="token punctuation">.</span><span class="token number">200.</span>txt <span class="token operator">&gt;</span> renhello

 <span class="token class-name">Response</span> code<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">;</span> <span class="token class-name">Time</span><span class="token operator">:</span> <span class="token number">347</span>ms<span class="token punctuation">;</span> <span class="token class-name">Content</span> length<span class="token operator">:</span> <span class="token number">8</span> bytes
 <span class="token constant">HTTP</span><span class="token operator">/</span><span class="token number">1.1</span> <span class="token number">200</span>
 <span class="token class-name">Content</span><span class="token operator">-</span><span class="token class-name">Type</span><span class="token operator">:</span> text<span class="token operator">/</span>plain<span class="token punctuation">;</span>charset<span class="token operator">=</span><span class="token constant">UTF</span><span class="token operator">-</span><span class="token number">8</span>
 <span class="token class-name">Content</span><span class="token operator">-</span><span class="token class-name">Length</span><span class="token operator">:</span> <span class="token number">8</span>
 <span class="token class-name">Date</span><span class="token operator">:</span> <span class="token class-name">Sun</span><span class="token punctuation">,</span> <span class="token number">25</span> <span class="token class-name">Apr</span> <span class="token number">2020</span> <span class="token number">01</span><span class="token operator">:</span><span class="token number">57</span><span class="token operator">:</span><span class="token number">36</span> <span class="token constant">GMT</span>
 <span class="token class-name">Keep</span><span class="token operator">-</span><span class="token class-name">Alive</span><span class="token operator">:</span> timeout<span class="token operator">=</span><span class="token number">60</span>
 <span class="token class-name">Connection</span><span class="token operator">:</span> keep<span class="token operator">-</span>alive

 <span class="token operator">&gt;</span> <span class="token number">2020</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">26</span><span class="token constant">T095737</span><span class="token punctuation">.</span><span class="token number">200.</span>txt <span class="token operator">&gt;</span> renworld

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>优点: 不需要编写额外的代码对 Bean 进行保存，使用的时候按照规约从 ApplicationContext 获取。 缺点: 使用 BeanName 获取 Bean 的时候需要进行强转，不如自己编写容器获取看起来更加优雅。 需要在测试阶段测试出 BeanName-helloFourPolicyServiceImpl(HELLO(&quot;hello&quot;, &quot;helloFourPolicyServiceImpl&quot;))是否正确。</p><p>提示: 如果在创表初期，可以直接将 ServiceImpl 名称存到数据库，如果业务已经开展，多方使用，字断不可更改，而且不想增加字断的话，需要在代码中增加映射，请大家酌情处理。</p>`,17),r={id:"github-地址",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#github-地址","aria-hidden":"true"},"#",-1),d={href:"https://github.com/sona0402/Polymorphism",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const a=l("ExternalLinkIcon");return p(),t("div",null,[u,n("h3",r,[k,s(),n("a",d,[s("Github 地址"),o(a)])])])}const g=e(i,[["render",v],["__file","spring-fly-weight.html.vue"]]);export{g as default};
