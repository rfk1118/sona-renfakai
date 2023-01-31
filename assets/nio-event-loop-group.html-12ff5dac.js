const e=JSON.parse('{"key":"v-6977112b","path":"/middleware/netty/nio/event-loop/nio-event-loop-group.html","title":"EventLoopGroup","lang":"zh-CN","frontmatter":{"description":"EventLoopGroup Boss 选择 Boss EventLoopGroup 要处理的是 acceptor，也就是 listenfd ，所以如果需要开启一个端口，使用一个 EventLoop 即可，如果需要开启多个端口，则需要多个 EventLoop 。 绑定一个端口 对于程序来说，开启一个 listen 端口，就是为EventLoop开启一个线程， boss 使用 new NioEventLoopGroup(1) 会好一些，即使使用默认策略也没多大关系，没有端口开启就不会有 channel 提交到其他 EventLoop 里面，也就不会开启相应的线程。","head":[["meta",{"property":"og:url","content":"https://renfakai.com/middleware/netty/nio/event-loop/nio-event-loop-group.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"EventLoopGroup"}],["meta",{"property":"og:description","content":"EventLoopGroup Boss 选择 Boss EventLoopGroup 要处理的是 acceptor，也就是 listenfd ，所以如果需要开启一个端口，使用一个 EventLoop 即可，如果需要开启多个端口，则需要多个 EventLoop 。 绑定一个端口 对于程序来说，开启一个 listen 端口，就是为EventLoop开启一个线程， boss 使用 new NioEventLoopGroup(1) 会好一些，即使使用默认策略也没多大关系，没有端口开启就不会有 channel 提交到其他 EventLoop 里面，也就不会开启相应的线程。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://renfakai.com/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-31T16:40:15.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"EventLoopGroup"}],["meta",{"property":"article:modified_time","content":"2023-01-31T16:40:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"EventLoopGroup\\",\\"image\\":[\\"https://renfakai.com/\\"],\\"dateModified\\":\\"2023-01-31T16:40:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"Boss 选择","slug":"boss-选择","link":"#boss-选择","children":[]},{"level":3,"title":"绑定一个端口","slug":"绑定一个端口","link":"#绑定一个端口","children":[]},{"level":3,"title":"绑定多个端口","slug":"绑定多个端口","link":"#绑定多个端口","children":[]},{"level":3,"title":"Group","slug":"group","link":"#group","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1675183215000,"updatedTime":1675183215000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":2.35,"words":704},"filePathRelative":"middleware/netty/nio/event-loop/nio-event-loop-group.md","localizedDate":"2023年2月1日","excerpt":"<h1> EventLoopGroup</h1>\\n<h3> Boss 选择</h3>\\n<p>Boss EventLoopGroup 要处理的是 acceptor，也就是 <code>listenfd</code> ，所以如果需要开启一个端口，使用一个 <code>EventLoop</code> 即可，如果需要开启多个端口，则需要多个 <code>EventLoop</code> 。</p>\\n<h3> 绑定一个端口</h3>\\n<p>对于程序来说，开启一个 <code>listen</code> 端口，就是为<code>EventLoop</code>开启一个线程， <code>boss</code> 使用 <code>new NioEventLoopGroup(1)</code> 会好一些，即使使用默认策略也没多大关系，没有端口开启就不会有 <code>channel</code> 提交到其他 <code>EventLoop</code> 里面，也就不会开启相应的线程。</p>","copyright":{},"autoDesc":true}');export{e as data};
