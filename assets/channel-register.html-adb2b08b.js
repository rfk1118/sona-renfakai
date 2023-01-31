const e=JSON.parse('{"key":"v-8719e08e","path":"/middleware/netty/nio/channels/channel-register.html","title":"Channel-register","lang":"zh-CN","frontmatter":{"description":"Channel-register Channel 注册 因为EventLoop对于ServerChannel还是普通channel是无差异的，所以其注册流程如图所示。 提示 有差异的是分组不同，一般 Boss EventLoopGroup 负责接收，Work EventLoopGroup 负责业务处理。","head":[["meta",{"property":"og:url","content":"https://renfakai.com/middleware/netty/nio/channels/channel-register.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"Channel-register"}],["meta",{"property":"og:description","content":"Channel-register Channel 注册 因为EventLoop对于ServerChannel还是普通channel是无差异的，所以其注册流程如图所示。 提示 有差异的是分组不同，一般 Boss EventLoopGroup 负责接收，Work EventLoopGroup 负责业务处理。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://renfakai.com/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-31T16:40:15.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"Channel-register"}],["meta",{"property":"article:modified_time","content":"2023-01-31T16:40:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Channel-register\\",\\"image\\":[\\"https://renfakai.com/\\"],\\"dateModified\\":\\"2023-01-31T16:40:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"Channel 注册","slug":"channel-注册","link":"#channel-注册","children":[]},{"level":3,"title":"ServerChannel 注册","slug":"serverchannel-注册","link":"#serverchannel-注册","children":[]},{"level":3,"title":"第一个任务","slug":"第一个任务","link":"#第一个任务","children":[]},{"level":3,"title":"核心代码","slug":"核心代码","link":"#核心代码","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1675183215000,"updatedTime":1675183215000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":3.57,"words":1071},"filePathRelative":"middleware/netty/nio/channels/channel-register.md","localizedDate":"2023年2月1日","excerpt":"<h1> Channel-register</h1>\\n<h3> Channel 注册</h3>\\n<ol>\\n<li>因为<code>EventLoop</code>对于<code>ServerChannel</code>还是普通<code>channel</code>是无差异的，所以其注册流程如图所示。</li>\\n</ol>\\n<p></p>\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">提示</p>\\n<p>有差异的是分组不同，一般 Boss EventLoopGroup 负责接收，Work EventLoopGroup 负责业务处理。</p>\\n</div>","copyright":{},"autoDesc":true}');export{e as data};
