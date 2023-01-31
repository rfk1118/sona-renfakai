const n=JSON.parse('{"key":"v-feb91f9c","path":"/languages/java/delay-queue.html","title":"锁局部变量","lang":"zh-CN","frontmatter":{"description":"锁局部变量 为什么 Doug Lea 喜欢将不可变锁引用放到局部变量表中? 源码 本文章使用 java.util.concurrent.DelayQueue 为例 public class DelayQueue&lt;E extends Delayed&gt; extends AbstractQueue&lt;E&gt; implements BlockingQueue&lt;E&gt; { private final transient ReentrantLock lock = new ReentrantLock(); private final PriorityQueue&lt;E&gt; q = new PriorityQueue&lt;E&gt;(); // 其他代码暂时忽略...... // 仅仅这一段代码进行展示 public int size() { // 成员变量内存地址存到局部变量表中 final ReentrantLock lock = this.lock; lock.lock(); try { return q.size(); } finally { lock.unlock(); } } }","head":[["meta",{"property":"og:url","content":"https://renfakai.com/languages/java/delay-queue.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"锁局部变量"}],["meta",{"property":"og:description","content":"锁局部变量 为什么 Doug Lea 喜欢将不可变锁引用放到局部变量表中? 源码 本文章使用 java.util.concurrent.DelayQueue 为例 public class DelayQueue&lt;E extends Delayed&gt; extends AbstractQueue&lt;E&gt; implements BlockingQueue&lt;E&gt; { private final transient ReentrantLock lock = new ReentrantLock(); private final PriorityQueue&lt;E&gt; q = new PriorityQueue&lt;E&gt;(); // 其他代码暂时忽略...... // 仅仅这一段代码进行展示 public int size() { // 成员变量内存地址存到局部变量表中 final ReentrantLock lock = this.lock; lock.lock(); try { return q.size(); } finally { lock.unlock(); } } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-31T16:40:15.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-31T16:40:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"锁局部变量\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-01-31T16:40:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"源码","slug":"源码","link":"#源码","children":[]},{"level":2,"title":"字节码优化","slug":"字节码优化","link":"#字节码优化","children":[{"level":3,"title":"猜想","slug":"猜想","link":"#猜想","children":[]}]},{"level":2,"title":"版权","slug":"版权","link":"#版权","children":[]}],"git":{"createdTime":1675183215000,"updatedTime":1675183215000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":4.02,"words":1205},"filePathRelative":"languages/java/delay-queue.md","localizedDate":"2023年2月1日","excerpt":"<h1> 锁局部变量</h1>\\n<p>为什么 Doug Lea 喜欢将不可变锁引用放到局部变量表中?</p>\\n<h2> 源码</h2>\\n<p>本文章使用 <code>java.util.concurrent.DelayQueue</code> 为例</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">DelayQueue</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">E</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Delayed</span><span class=\\"token punctuation\\">&gt;</span></span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">AbstractQueue</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">E</span><span class=\\"token punctuation\\">&gt;</span></span>\\n  <span class=\\"token keyword\\">implements</span> <span class=\\"token class-name\\">BlockingQueue</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">E</span><span class=\\"token punctuation\\">&gt;</span></span> <span class=\\"token punctuation\\">{</span>\\n\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">transient</span> <span class=\\"token class-name\\">ReentrantLock</span> lock <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ReentrantLock</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">PriorityQueue</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">E</span><span class=\\"token punctuation\\">&gt;</span></span> q <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">PriorityQueue</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">E</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token comment\\">// 其他代码暂时忽略......</span>\\n  <span class=\\"token comment\\">// 仅仅这一段代码进行展示</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 成员变量内存地址存到局部变量表中</span>\\n    <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">ReentrantLock</span> lock <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>lock<span class=\\"token punctuation\\">;</span>\\n    lock<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">lock</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> q<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">finally</span> <span class=\\"token punctuation\\">{</span>\\n        lock<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">unlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{n as data};
