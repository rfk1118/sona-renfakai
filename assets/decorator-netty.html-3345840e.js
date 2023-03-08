import{_ as n,V as s,W as a,a0 as e}from"./framework-e54e0297.js";const t={},p=e(`<h1 id="decorator-netty" tabindex="-1"><a class="header-anchor" href="#decorator-netty" aria-hidden="true">#</a> Decorator-Netty</h1><h3 id="netty-数据优化" tabindex="-1"><a class="header-anchor" href="#netty-数据优化" aria-hidden="true">#</a> netty 数据优化</h3><ol><li><code>SelectedSelectionKeySet</code>代码不在粘贴，其中大部分代码都没有修改，只对部分功能做了增强，例如<code>SelectedSelectionKeySetSelector#select</code></li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">SelectedSelectionKeySetSelector</span> <span class="token keyword">extends</span> <span class="token class-name">Selector</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">SelectedSelectionKeySet</span> selectionKeys<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Selector</span> delegate<span class="token punctuation">;</span>

    <span class="token class-name">SelectedSelectionKeySetSelector</span><span class="token punctuation">(</span><span class="token class-name">Selector</span> delegate<span class="token punctuation">,</span> <span class="token class-name">SelectedSelectionKeySet</span> selectionKeys<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>delegate <span class="token operator">=</span> delegate<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>selectionKeys <span class="token operator">=</span> selectionKeys<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">isOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">SelectorProvider</span> <span class="token function">provider</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">provider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SelectionKey</span><span class="token punctuation">&gt;</span></span> <span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SelectionKey</span><span class="token punctuation">&gt;</span></span> <span class="token function">selectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">selectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">selectNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        selectionKeys<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">selectNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeout<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 增强功能</span>
        selectionKeys<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 增强功能</span>
        selectionKeys<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Selector</span> <span class="token function">wakeup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">wakeup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        delegate<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="netty" tabindex="-1"><a class="header-anchor" href="#netty" aria-hidden="true">#</a> Netty</h3><ol><li>如何对线程进行增强</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DefaultThreadFactory</span> <span class="token keyword">implements</span> <span class="token class-name">ThreadFactory</span> <span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Thread</span> <span class="token function">newThread</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// FastThreadLocalRunnable.wrap(r) 会wrap任务</span>
        <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token function">newThread</span><span class="token punctuation">(</span><span class="token class-name">FastThreadLocalRunnable</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">,</span> prefix <span class="token operator">+</span> nextId<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">isDaemon</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> daemon<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                t<span class="token punctuation">.</span><span class="token function">setDaemon</span><span class="token punctuation">(</span>daemon<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">getPriority</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> priority<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                t<span class="token punctuation">.</span><span class="token function">setPriority</span><span class="token punctuation">(</span>priority<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ignored<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Doesn&#39;t matter even if failed to set.</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建线程时候，装饰成FastThreadLocalThread</span>
    <span class="token keyword">protected</span> <span class="token class-name">Thread</span> <span class="token function">newThread</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FastThreadLocalThread</span><span class="token punctuation">(</span>threadGroup<span class="token punctuation">,</span> r<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FastThreadLocalThread</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>
    <span class="token comment">// This will be set to true if we have a chance to wrap the Runnable.</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> cleanupFastThreadLocals<span class="token punctuation">;</span>

    <span class="token comment">// 这里会进行增强，通过ThreadLocal存放一些数据</span>
    <span class="token keyword">private</span> <span class="token class-name">InternalThreadLocalMap</span> threadLocalMap<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">FastThreadLocalThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cleanupFastThreadLocals <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>对任务的增强</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">FastThreadLocalRunnable</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Runnable</span> runnable<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">FastThreadLocalRunnable</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>runnable <span class="token operator">=</span> <span class="token class-name">ObjectUtil</span><span class="token punctuation">.</span><span class="token function">checkNotNull</span><span class="token punctuation">(</span>runnable<span class="token punctuation">,</span> <span class="token string">&quot;runnable&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            runnable<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 在执行完任务后会清理ThreadLocal</span>
            <span class="token class-name">FastThreadLocal</span><span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token class-name">Runnable</span> <span class="token function">wrap</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> runnable <span class="token keyword">instanceof</span> <span class="token class-name">FastThreadLocalRunnable</span> <span class="token operator">?</span> runnable <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">FastThreadLocalRunnable</span><span class="token punctuation">(</span>runnable<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>在不改变对象结构的强况下进行功能增强，这种可以有效的防止 <code>ThreadLocal</code> 内存泄露。</p>`,11),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","decorator-netty.html.vue"]]);export{k as default};
