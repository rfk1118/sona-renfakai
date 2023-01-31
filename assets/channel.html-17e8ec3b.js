const e=JSON.parse('{"key":"v-3fac1c29","path":"/middleware/netty/nio/channels/channel.html","title":"Channle","lang":"zh-CN","frontmatter":{"description":"Channle 开放—封闭原则（OCP） 提示 A Channel can have a parent depending on how it was created. For instance, a SocketChannel, that was accepted by ServerSocketChannel, will return the ServerSocketChannel as its parent on parent(). 从 Channel 的文档中可以看出 SocketChannel 是由 ServerSocketChannel 产生的。 其实从《深入理解计算机系统》中我们知道 connectionfd 是从 listenfd 中产生而来的。","head":[["meta",{"property":"og:url","content":"https://renfakai.com/middleware/netty/nio/channels/channel.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"Channle"}],["meta",{"property":"og:description","content":"Channle 开放—封闭原则（OCP） 提示 A Channel can have a parent depending on how it was created. For instance, a SocketChannel, that was accepted by ServerSocketChannel, will return the ServerSocketChannel as its parent on parent(). 从 Channel 的文档中可以看出 SocketChannel 是由 ServerSocketChannel 产生的。 其实从《深入理解计算机系统》中我们知道 connectionfd 是从 listenfd 中产生而来的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://renfakai.com/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-31T16:40:15.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"Channle"}],["meta",{"property":"article:modified_time","content":"2023-01-31T16:40:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Channle\\",\\"image\\":[\\"https://renfakai.com/\\"],\\"dateModified\\":\\"2023-01-31T16:40:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"开放—封闭原则（OCP）","slug":"开放—封闭原则-ocp","link":"#开放—封闭原则-ocp","children":[]},{"level":3,"title":"ServerChannel 创建","slug":"serverchannel-创建","link":"#serverchannel-创建","children":[]}],"git":{"createdTime":1675183215000,"updatedTime":1675183215000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":2.15,"words":645},"filePathRelative":"middleware/netty/nio/channels/channel.md","localizedDate":"2023年2月1日","excerpt":"<h1> Channle</h1>\\n<h3> <a href=\\"https://book.douban.com/subject/1140457/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">开放—封闭原则（OCP）</a></h3>\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">提示</p>\\n<p>A Channel can have a parent depending on how it was created. For instance, a SocketChannel, that was accepted by ServerSocketChannel, will return the ServerSocketChannel as its parent on parent().</p>\\n<p>从 <code>Channel</code> 的文档中可以看出 <code>SocketChannel</code> 是由 <code>ServerSocketChannel</code> 产生的。\\n其实从《深入理解计算机系统》中我们知道 connectionfd 是从 listenfd 中产生而来的。</p>\\n</div>","copyright":{},"autoDesc":true}');export{e as data};
