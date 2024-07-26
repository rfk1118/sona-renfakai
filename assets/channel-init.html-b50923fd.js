import{_ as n,V as s,W as a,a0 as t}from"./framework-e54e0297.js";const p="/assets/handler-c75756bb.png",e={},c=t(`<h1 id="channel-init" tabindex="-1"><a class="header-anchor" href="#channel-init" aria-hidden="true">#</a> Channel-Init</h1><h3 id="设置属性" tabindex="-1"><a class="header-anchor" href="#设置属性" aria-hidden="true">#</a> 设置属性</h3><ol><li>设置属性，并且设置<code>handler</code>初始化任务</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">Channel</span> channel<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 为channel设置Optio</span>
        <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ChannelOption</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> options <span class="token operator">=</span> <span class="token function">options0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 这里使用了最小锁原则</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">setChannelOptions</span><span class="token punctuation">(</span>channel<span class="token punctuation">,</span> options<span class="token punctuation">,</span> logger<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 设置属性</span>
        <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AttributeKey</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> attrs <span class="token operator">=</span> <span class="token function">attrs0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>attrs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AttributeKey</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> e<span class="token operator">:</span> attrs<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
                <span class="token class-name">AttributeKey</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> key <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">AttributeKey</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> e<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                channel<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 这里在AbstractChannel时候初始化过了</span>
        <span class="token class-name">ChannelPipeline</span> p <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">pipeline</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 为孩子设置属性</span>
        <span class="token keyword">final</span> <span class="token class-name">EventLoopGroup</span> currentChildGroup <span class="token operator">=</span> childGroup<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">ChannelHandler</span> currentChildHandler <span class="token operator">=</span> childHandler<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ChannelOption</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> currentChildOptions<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AttributeKey</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> currentChildAttrs<span class="token punctuation">;</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>childOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            currentChildOptions <span class="token operator">=</span> childOptions<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token function">newOptionArray</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>childAttrs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            currentChildAttrs <span class="token operator">=</span> childAttrs<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token function">newAttrArray</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 为pipeline处理handlers ChannelInitializer会将上面属性带过去</span>
        p<span class="token punctuation">.</span><span class="token function">addLast</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ChannelInitializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Channel</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initChannel</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Channel</span> ch<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
                <span class="token keyword">final</span> <span class="token class-name">ChannelPipeline</span> pipeline <span class="token operator">=</span> ch<span class="token punctuation">.</span><span class="token function">pipeline</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">ChannelHandler</span> handler <span class="token operator">=</span> config<span class="token punctuation">.</span><span class="token function">handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>handler <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    pipeline<span class="token punctuation">.</span><span class="token function">addLast</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                ch<span class="token punctuation">.</span><span class="token function">eventLoop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        pipeline<span class="token punctuation">.</span><span class="token function">addLast</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ServerBootstrapAcceptor</span><span class="token punctuation">(</span>
                                ch<span class="token punctuation">,</span> currentChildGroup<span class="token punctuation">,</span> currentChildHandler<span class="token punctuation">,</span> currentChildOptions<span class="token punctuation">,</span> currentChildAttrs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>ChannelInitializer 会将上面属性带过去</li></ol><p><img src="`+p+`" alt="An image"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">ChannelPipeline</span> <span class="token function">addLast</span><span class="token punctuation">(</span><span class="token class-name">EventExecutorGroup</span> group<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">ChannelHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">AbstractChannelHandlerContext</span> newCtx<span class="token punctuation">;</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 检查被多次添加过</span>
            <span class="token function">checkMultiplicity</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 创建一个上下文 在上下文中设置pipeline，执行器，处理inbound还是outbound</span>
            newCtx <span class="token operator">=</span> <span class="token function">newContext</span><span class="token punctuation">(</span>group<span class="token punctuation">,</span> <span class="token function">filterName</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 修正链路，双向链表修正上下文</span>
            <span class="token function">addLast0</span><span class="token punctuation">(</span>newCtx<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>registered<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 没注册过，设置ININ到ADD_PENDING</span>
                newCtx<span class="token punctuation">.</span><span class="token function">setAddPending</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 回调任务</span>
                <span class="token function">callHandlerCallbackLater</span><span class="token punctuation">(</span>newCtx<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token class-name">EventExecutor</span> executor <span class="token operator">=</span> newCtx<span class="token punctuation">.</span><span class="token function">executor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>executor<span class="token punctuation">.</span><span class="token function">inEventLoop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                newCtx<span class="token punctuation">.</span><span class="token function">setAddPending</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                executor<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">callHandlerAdded0</span><span class="token punctuation">(</span>newCtx<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">callHandlerAdded0</span><span class="token punctuation">(</span>newCtx<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">checkMultiplicity</span><span class="token punctuation">(</span><span class="token class-name">ChannelHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>handler <span class="token keyword">instanceof</span> <span class="token class-name">ChannelHandlerAdapter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ChannelHandlerAdapter</span> h <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ChannelHandlerAdapter</span><span class="token punctuation">)</span> handler<span class="token punctuation">;</span>
            <span class="token comment">// 如果handler不是共享的，并且添加过则丢出异常</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>h<span class="token punctuation">.</span><span class="token function">isSharable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> h<span class="token punctuation">.</span>added<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ChannelPipelineException</span><span class="token punctuation">(</span>
                        h<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>
                        <span class="token string">&quot; is not a @Sharable handler, so can&#39;t be added or removed multiple times.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 设置已经被添加过，这里很好，每个对象自己管理状态，不需要统一管理</span>
            h<span class="token punctuation">.</span>added <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">callHandlerCallbackLater</span><span class="token punctuation">(</span><span class="token class-name">AbstractChannelHandlerContext</span> ctx<span class="token punctuation">,</span> <span class="token keyword">boolean</span> added<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">assert</span> <span class="token operator">!</span>registered<span class="token punctuation">;</span>

    <span class="token comment">// 如果标记位为true，则新增，否则移除</span>
    <span class="token class-name">PendingHandlerCallback</span> task <span class="token operator">=</span> added <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">PendingHandlerAddedTask</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">PendingHandlerRemovedTask</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">PendingHandlerCallback</span> pending <span class="token operator">=</span> pendingHandlerCallbackHead<span class="token punctuation">;</span>
    <span class="token comment">// 如有头回调为空，则使用PendingHandlerAddedTask任务处理，这里也就是把自己设置成了头</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pending <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pendingHandlerCallbackHead <span class="token operator">=</span> task<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// Find the tail of the linked-list.</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>pending<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pending <span class="token operator">=</span> pending<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        pending<span class="token punctuation">.</span>next <span class="token operator">=</span> task<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>在初始化时候主要是产生了 <code>ChannelInitializer</code> 的 <code>handler</code> ，并将任务设置到 <code>DefaultChannelPipeline</code> 中，后面会在注册完毕后对 <code>handler</code> 进行初始化。</p>`,9),o=[c];function l(i,u){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","channel-init.html.vue"]]);export{d as default};