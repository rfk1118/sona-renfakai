const n=JSON.parse('{"key":"v-7d8de25d","path":"/languages/java/thread/java/juc/condition.html","title":"Condition","lang":"zh-CN","frontmatter":{"description":"Condition 概念 同步器框架提供了一个ConditionObject类，提供排他同步并遵循Lock接口同步器使用。 public abstract class AbstractQueuedSynchronizer // 内部类 public class ConditionObject implements Condition, java.io.Serializable { } // 这里会返回 final ConditionObject newCondition() { return new ConditionObject(); } }","head":[["meta",{"property":"og:url","content":"https://renfakai.com/languages/java/thread/java/juc/condition.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"Condition"}],["meta",{"property":"og:description","content":"Condition 概念 同步器框架提供了一个ConditionObject类，提供排他同步并遵循Lock接口同步器使用。 public abstract class AbstractQueuedSynchronizer // 内部类 public class ConditionObject implements Condition, java.io.Serializable { } // 这里会返回 final ConditionObject newCondition() { return new ConditionObject(); } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-22T03:48:14.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-22T03:48:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Condition\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-08-22T03:48:14.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"案例","slug":"案例","link":"#案例","children":[]},{"level":2,"title":"awit","slug":"awit","link":"#awit","children":[]},{"level":2,"title":"signal","slug":"signal","link":"#signal","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1692676094000,"updatedTime":1692676094000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":8.18,"words":2455},"filePathRelative":"languages/java/thread/java/juc/condition.md","localizedDate":"2023年8月22日","excerpt":"<h1> Condition</h1>\\n<h2> 概念</h2>\\n<p>同步器框架提供了一个<code>ConditionObject</code>类，提供排他同步并遵循<code>Lock</code>接口同步器使用。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">abstract</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">AbstractQueuedSynchronizer</span>\\n  <span class=\\"token comment\\">// 内部类</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">ConditionObject</span> <span class=\\"token keyword\\">implements</span> <span class=\\"token class-name\\">Condition</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\"><span class=\\"token namespace\\">java<span class=\\"token punctuation\\">.</span>io<span class=\\"token punctuation\\">.</span></span>Serializable</span> <span class=\\"token punctuation\\">{</span>\\n\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token comment\\">// 这里会返回</span>\\n  <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">ConditionObject</span> <span class=\\"token function\\">newCondition</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ConditionObject</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{n as data};