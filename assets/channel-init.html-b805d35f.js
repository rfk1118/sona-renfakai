const n=JSON.parse('{"key":"v-26f71eec","path":"/middleware/netty/nio/channels/channel-init.html","title":"Channel-Init","lang":"zh-CN","frontmatter":{"description":"Channel-Init 设置属性 设置属性，并且设置handler初始化任务 void init(Channel channel) throws Exception { // 为channel设置Optio final Map&lt;ChannelOption&lt;?&gt;, Object&gt; options = options0(); // 这里使用了最小锁原则 synchronized (options) { setChannelOptions(channel, options, logger); } // 设置属性 final Map&lt;AttributeKey&lt;?&gt;, Object&gt; attrs = attrs0(); synchronized (attrs) { for (Entry&lt;AttributeKey&lt;?&gt;, Object&gt; e: attrs.entrySet()) { @SuppressWarnings(\\"unchecked\\") AttributeKey&lt;Object&gt; key = (AttributeKey&lt;Object&gt;) e.getKey(); channel.attr(key).set(e.getValue()); } } // 这里在AbstractChannel时候初始化过了 ChannelPipeline p = channel.pipeline(); // 为孩子设置属性 final EventLoopGroup currentChildGroup = childGroup; final ChannelHandler currentChildHandler = childHandler; final Entry&lt;ChannelOption&lt;?&gt;, Object&gt;[] currentChildOptions; final Entry&lt;AttributeKey&lt;?&gt;, Object&gt;[] currentChildAttrs; synchronized (childOptions) { currentChildOptions = childOptions.entrySet().toArray(newOptionArray(0)); } synchronized (childAttrs) { currentChildAttrs = childAttrs.entrySet().toArray(newAttrArray(0)); } // 为pipeline处理handlers ChannelInitializer会将上面属性带过去 p.addLast(new ChannelInitializer&lt;Channel&gt;() { @Override public void initChannel(final Channel ch) throws Exception { final ChannelPipeline pipeline = ch.pipeline(); ChannelHandler handler = config.handler(); if (handler != null) { pipeline.addLast(handler); } ch.eventLoop().execute(new Runnable() { @Override public void run() { pipeline.addLast(new ServerBootstrapAcceptor( ch, currentChildGroup, currentChildHandler, currentChildOptions, currentChildAttrs)); } }); } }); }","head":[["meta",{"property":"og:url","content":"https://renfakai.com/middleware/netty/nio/channels/channel-init.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"Channel-Init"}],["meta",{"property":"og:description","content":"Channel-Init 设置属性 设置属性，并且设置handler初始化任务 void init(Channel channel) throws Exception { // 为channel设置Optio final Map&lt;ChannelOption&lt;?&gt;, Object&gt; options = options0(); // 这里使用了最小锁原则 synchronized (options) { setChannelOptions(channel, options, logger); } // 设置属性 final Map&lt;AttributeKey&lt;?&gt;, Object&gt; attrs = attrs0(); synchronized (attrs) { for (Entry&lt;AttributeKey&lt;?&gt;, Object&gt; e: attrs.entrySet()) { @SuppressWarnings(\\"unchecked\\") AttributeKey&lt;Object&gt; key = (AttributeKey&lt;Object&gt;) e.getKey(); channel.attr(key).set(e.getValue()); } } // 这里在AbstractChannel时候初始化过了 ChannelPipeline p = channel.pipeline(); // 为孩子设置属性 final EventLoopGroup currentChildGroup = childGroup; final ChannelHandler currentChildHandler = childHandler; final Entry&lt;ChannelOption&lt;?&gt;, Object&gt;[] currentChildOptions; final Entry&lt;AttributeKey&lt;?&gt;, Object&gt;[] currentChildAttrs; synchronized (childOptions) { currentChildOptions = childOptions.entrySet().toArray(newOptionArray(0)); } synchronized (childAttrs) { currentChildAttrs = childAttrs.entrySet().toArray(newAttrArray(0)); } // 为pipeline处理handlers ChannelInitializer会将上面属性带过去 p.addLast(new ChannelInitializer&lt;Channel&gt;() { @Override public void initChannel(final Channel ch) throws Exception { final ChannelPipeline pipeline = ch.pipeline(); ChannelHandler handler = config.handler(); if (handler != null) { pipeline.addLast(handler); } ch.eventLoop().execute(new Runnable() { @Override public void run() { pipeline.addLast(new ServerBootstrapAcceptor( ch, currentChildGroup, currentChildHandler, currentChildOptions, currentChildAttrs)); } }); } }); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://renfakai.com/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-14T08:38:02.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"Channel-Init"}],["meta",{"property":"article:modified_time","content":"2023-06-14T08:38:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Channel-Init\\",\\"image\\":[\\"https://renfakai.com/\\"],\\"dateModified\\":\\"2023-06-14T08:38:02.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"设置属性","slug":"设置属性","link":"#设置属性","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1686731882000,"updatedTime":1686731882000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":1.8,"words":540},"filePathRelative":"middleware/netty/nio/channels/channel-init.md","localizedDate":"2023年6月14日","excerpt":"<h1> Channel-Init</h1>\\n<h3> 设置属性</h3>\\n<ol>\\n<li>设置属性，并且设置<code>handler</code>初始化任务</li>\\n</ol>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">init</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Channel</span> channel<span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">Exception</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// 为channel设置Optio</span>\\n        <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Map</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">ChannelOption</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">&gt;</span></span> options <span class=\\"token operator\\">=</span> <span class=\\"token function\\">options0</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">// 这里使用了最小锁原则</span>\\n        <span class=\\"token keyword\\">synchronized</span> <span class=\\"token punctuation\\">(</span>options<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token function\\">setChannelOptions</span><span class=\\"token punctuation\\">(</span>channel<span class=\\"token punctuation\\">,</span> options<span class=\\"token punctuation\\">,</span> logger<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token comment\\">// 设置属性</span>\\n        <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Map</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">AttributeKey</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">&gt;</span></span> attrs <span class=\\"token operator\\">=</span> <span class=\\"token function\\">attrs0</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">synchronized</span> <span class=\\"token punctuation\\">(</span>attrs<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Entry</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">AttributeKey</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">&gt;</span></span> e<span class=\\"token operator\\">:</span> attrs<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">entrySet</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                <span class=\\"token annotation punctuation\\">@SuppressWarnings</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"unchecked\\"</span><span class=\\"token punctuation\\">)</span>\\n                <span class=\\"token class-name\\">AttributeKey</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">&gt;</span></span> key <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">AttributeKey</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">)</span> e<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getKey</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                channel<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">attr</span><span class=\\"token punctuation\\">(</span>key<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">set</span><span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getValue</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span>\\n\\n        <span class=\\"token comment\\">// 这里在AbstractChannel时候初始化过了</span>\\n        <span class=\\"token class-name\\">ChannelPipeline</span> p <span class=\\"token operator\\">=</span> channel<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">pipeline</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">// 为孩子设置属性</span>\\n        <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">EventLoopGroup</span> currentChildGroup <span class=\\"token operator\\">=</span> childGroup<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">ChannelHandler</span> currentChildHandler <span class=\\"token operator\\">=</span> childHandler<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Entry</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">ChannelOption</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> currentChildOptions<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Entry</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">AttributeKey</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> currentChildAttrs<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">synchronized</span> <span class=\\"token punctuation\\">(</span>childOptions<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            currentChildOptions <span class=\\"token operator\\">=</span> childOptions<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">entrySet</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">newOptionArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token keyword\\">synchronized</span> <span class=\\"token punctuation\\">(</span>childAttrs<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            currentChildAttrs <span class=\\"token operator\\">=</span> childAttrs<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">entrySet</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">newAttrArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n\\n        <span class=\\"token comment\\">// 为pipeline处理handlers ChannelInitializer会将上面属性带过去</span>\\n        p<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">addLast</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ChannelInitializer</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Channel</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token annotation punctuation\\">@Override</span>\\n            <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">initChannel</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Channel</span> ch<span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">Exception</span> <span class=\\"token punctuation\\">{</span>\\n                <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">ChannelPipeline</span> pipeline <span class=\\"token operator\\">=</span> ch<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">pipeline</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token class-name\\">ChannelHandler</span> handler <span class=\\"token operator\\">=</span> config<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">handler</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>handler <span class=\\"token operator\\">!=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                    pipeline<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">addLast</span><span class=\\"token punctuation\\">(</span>handler<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token punctuation\\">}</span>\\n\\n                ch<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">eventLoop</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">execute</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Runnable</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                    <span class=\\"token annotation punctuation\\">@Override</span>\\n                    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">run</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                        pipeline<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">addLast</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ServerBootstrapAcceptor</span><span class=\\"token punctuation\\">(</span>\\n                                ch<span class=\\"token punctuation\\">,</span> currentChildGroup<span class=\\"token punctuation\\">,</span> currentChildHandler<span class=\\"token punctuation\\">,</span> currentChildOptions<span class=\\"token punctuation\\">,</span> currentChildAttrs<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                    <span class=\\"token punctuation\\">}</span>\\n                <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{n as data};
