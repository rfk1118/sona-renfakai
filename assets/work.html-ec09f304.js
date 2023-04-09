const e=JSON.parse('{"key":"v-7ff7696e","path":"/languages/java/thread/java/juc/work.html","title":"Worker","lang":"zh-CN","frontmatter":{"description":"Worker Worker是线程池中真实干活的线程，继承AbstractQueuedSynchronizer和实现了Runnable，使用接口隔离。 private final class Worker extends AbstractQueuedSynchronizer implements Runnable{ // todo 其他省略 }","head":[["meta",{"property":"og:url","content":"https://renfakai.com/languages/java/thread/java/juc/work.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"Worker"}],["meta",{"property":"og:description","content":"Worker Worker是线程池中真实干活的线程，继承AbstractQueuedSynchronizer和实现了Runnable，使用接口隔离。 private final class Worker extends AbstractQueuedSynchronizer implements Runnable{ // todo 其他省略 }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-09T13:02:26.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-09T13:02:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Worker\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-09T13:02:26.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"核心代码","slug":"核心代码","link":"#核心代码","children":[{"level":3,"title":"创建Worker","slug":"创建worker","link":"#创建worker","children":[]},{"level":3,"title":"Worker运行","slug":"worker运行","link":"#worker运行","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1681045346000,"updatedTime":1681045346000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":1.71,"words":514},"filePathRelative":"languages/java/thread/java/juc/work.md","localizedDate":"2023年4月9日","excerpt":"<h1> Worker</h1>\\n<p><code>Worker</code>是线程池中真实干活的线程，继承<code>AbstractQueuedSynchronizer</code>和实现了<code>Runnable</code>，使用接口隔离。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Worker</span>\\n    <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">AbstractQueuedSynchronizer</span>\\n    <span class=\\"token keyword\\">implements</span> <span class=\\"token class-name\\">Runnable</span><span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// todo 其他省略</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{e as data};
