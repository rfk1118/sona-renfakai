const n=JSON.parse('{"key":"v-5eed6979","path":"/languages/java/thread/java/juc/thread-pool-executor.html","title":"ThreadPoolExecutor","lang":"zh-CN","frontmatter":{"description":"ThreadPoolExecutor 概念 减少了每个任务的调用开销，它们通常在执行大量异步任务时提供改进的性能，并且它们提供了一种限制和管理资源的方法，包括执行集合时消耗的线程。 每个ThreadPoolExecutor还维护一些基本的统计信息，例如完成任务的数量。 线程池的初始化，最终都会调用到这个方法，核心参数如下文。 public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue&lt;Runnable&gt; workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler) { // 必要校验 if (corePoolSize &lt; 0 || maximumPoolSize &lt;= 0 || maximumPoolSize &lt; corePoolSize || keepAliveTime &lt; 0) throw new IllegalArgumentException(); if (workQueue == null || threadFactory == null || handler == null) throw new NullPointerException(); this.acc = System.getSecurityManager() == null ? null : AccessController.getContext(); // 核心线程数量 this.corePoolSize = corePoolSize; // 最大线程数量 this.maximumPoolSize = maximumPoolSize; // 任务保存队列 this.workQueue = workQueue; // 存活时间 this.keepAliveTime = unit.toNanos(keepAliveTime); // 创建线程的工厂 this.threadFactory = threadFactory; // 拒绝策略 this.handler = handler; }","head":[["meta",{"property":"og:url","content":"https://renfakai.com/languages/java/thread/java/juc/thread-pool-executor.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"ThreadPoolExecutor"}],["meta",{"property":"og:description","content":"ThreadPoolExecutor 概念 减少了每个任务的调用开销，它们通常在执行大量异步任务时提供改进的性能，并且它们提供了一种限制和管理资源的方法，包括执行集合时消耗的线程。 每个ThreadPoolExecutor还维护一些基本的统计信息，例如完成任务的数量。 线程池的初始化，最终都会调用到这个方法，核心参数如下文。 public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue&lt;Runnable&gt; workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler) { // 必要校验 if (corePoolSize &lt; 0 || maximumPoolSize &lt;= 0 || maximumPoolSize &lt; corePoolSize || keepAliveTime &lt; 0) throw new IllegalArgumentException(); if (workQueue == null || threadFactory == null || handler == null) throw new NullPointerException(); this.acc = System.getSecurityManager() == null ? null : AccessController.getContext(); // 核心线程数量 this.corePoolSize = corePoolSize; // 最大线程数量 this.maximumPoolSize = maximumPoolSize; // 任务保存队列 this.workQueue = workQueue; // 存活时间 this.keepAliveTime = unit.toNanos(keepAliveTime); // 创建线程的工厂 this.threadFactory = threadFactory; // 拒绝策略 this.handler = handler; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-24T16:43:40.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-24T16:43:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ThreadPoolExecutor\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-24T16:43:40.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[{"level":3,"title":"核心和最大池大小","slug":"核心和最大池大小","link":"#核心和最大池大小","children":[]},{"level":3,"title":"创建新线程","slug":"创建新线程","link":"#创建新线程","children":[]},{"level":3,"title":"存活","slug":"存活","link":"#存活","children":[]},{"level":3,"title":"队列","slug":"队列","link":"#队列","children":[]},{"level":3,"title":"拒绝策略","slug":"拒绝策略","link":"#拒绝策略","children":[]},{"level":3,"title":"数量和线程池状态","slug":"数量和线程池状态","link":"#数量和线程池状态","children":[]}]},{"level":2,"title":"代码","slug":"代码","link":"#代码","children":[{"level":3,"title":"执行任务","slug":"执行任务","link":"#执行任务","children":[]},{"level":3,"title":"创建Worker","slug":"创建worker","link":"#创建worker","children":[]},{"level":3,"title":"reject","slug":"reject","link":"#reject","children":[]},{"level":3,"title":"getTask","slug":"gettask","link":"#gettask","children":[]},{"level":3,"title":"processWorkerExit","slug":"processworkerexit","link":"#processworkerexit","children":[]},{"level":3,"title":"tryTerminate","slug":"tryterminate","link":"#tryterminate","children":[]}]},{"level":2,"title":"shutdown","slug":"shutdown","link":"#shutdown","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1695573820000,"updatedTime":1695573820000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":7.45,"words":2234},"filePathRelative":"languages/java/thread/java/juc/thread-pool-executor.md","localizedDate":"2023年9月25日","excerpt":"<h1> ThreadPoolExecutor</h1>\\n<h2> 概念</h2>\\n<ul>\\n<li>减少了每个任务的调用开销，它们通常在执行大量异步任务时提供改进的性能，并且它们提供了一种限制和管理资源的方法，包括执行集合时消耗的线程。</li>\\n<li>每个<code>ThreadPoolExecutor</code>还维护一些基本的统计信息，例如完成任务的数量。</li>\\n</ul>\\n<p>线程池的初始化，最终都会调用到这个方法，核心参数如下文。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">ThreadPoolExecutor</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> corePoolSize<span class=\\"token punctuation\\">,</span>\\n                          <span class=\\"token keyword\\">int</span> maximumPoolSize<span class=\\"token punctuation\\">,</span>\\n                          <span class=\\"token keyword\\">long</span> keepAliveTime<span class=\\"token punctuation\\">,</span>\\n                          <span class=\\"token class-name\\">TimeUnit</span> unit<span class=\\"token punctuation\\">,</span>\\n                          <span class=\\"token class-name\\">BlockingQueue</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Runnable</span><span class=\\"token punctuation\\">&gt;</span></span> workQueue<span class=\\"token punctuation\\">,</span>\\n                          <span class=\\"token class-name\\">ThreadFactory</span> threadFactory<span class=\\"token punctuation\\">,</span>\\n                          <span class=\\"token class-name\\">RejectedExecutionHandler</span> handler<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 必要校验</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>corePoolSize <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">0</span> <span class=\\"token operator\\">||</span>\\n        maximumPoolSize <span class=\\"token operator\\">&lt;=</span> <span class=\\"token number\\">0</span> <span class=\\"token operator\\">||</span>\\n        maximumPoolSize <span class=\\"token operator\\">&lt;</span> corePoolSize <span class=\\"token operator\\">||</span>\\n        keepAliveTime <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">IllegalArgumentException</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>workQueue <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">||</span> threadFactory <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">||</span> handler <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">NullPointerException</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>acc <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getSecurityManager</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">?</span>\\n            <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">:</span>\\n            <span class=\\"token class-name\\">AccessController</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getContext</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 核心线程数量</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>corePoolSize <span class=\\"token operator\\">=</span> corePoolSize<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 最大线程数量</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>maximumPoolSize <span class=\\"token operator\\">=</span> maximumPoolSize<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 任务保存队列</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>workQueue <span class=\\"token operator\\">=</span> workQueue<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 存活时间</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>keepAliveTime <span class=\\"token operator\\">=</span> unit<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toNanos</span><span class=\\"token punctuation\\">(</span>keepAliveTime<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 创建线程的工厂</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>threadFactory <span class=\\"token operator\\">=</span> threadFactory<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 拒绝策略</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>handler <span class=\\"token operator\\">=</span> handler<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{n as data};
