const a=JSON.parse('{"key":"v-b6a3e9f8","path":"/languages/java/jvm/safepoint.html","title":"safepoint","lang":"zh-CN","frontmatter":{"description":"safepoint vmThread vmThread run()会一直loop任务处理任务，也就是处理Command，inner_execute(_next_vm_operation);支持的命令在vmOperation.hpp会有所体现。 Breakpoint reached: vmThread.cpp:429 Stack: VMThread::inner_execute(VM_Operation*) vmThread.cpp:429 VMThread::loop() vmThread.cpp:496 VMThread::run() vmThread.cpp:175 Thread::call_run() thread.cpp:358 thread_native_entry(Thread*) os_bsd.cpp:575 _pthread_start 0x00007ff81a3234f4 thread_start 0x00007ff81a31f00f","head":[["meta",{"property":"og:url","content":"https://renfakai.com/languages/java/jvm/safepoint.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"safepoint"}],["meta",{"property":"og:description","content":"safepoint vmThread vmThread run()会一直loop任务处理任务，也就是处理Command，inner_execute(_next_vm_operation);支持的命令在vmOperation.hpp会有所体现。 Breakpoint reached: vmThread.cpp:429 Stack: VMThread::inner_execute(VM_Operation*) vmThread.cpp:429 VMThread::loop() vmThread.cpp:496 VMThread::run() vmThread.cpp:175 Thread::call_run() thread.cpp:358 thread_native_entry(Thread*) os_bsd.cpp:575 _pthread_start 0x00007ff81a3234f4 thread_start 0x00007ff81a31f00f"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-09T13:02:26.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-09T13:02:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"safepoint\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-09T13:02:26.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"vmThread","slug":"vmthread","link":"#vmthread","children":[]},{"level":2,"title":"SafepointSynchronize","slug":"safepointsynchronize","link":"#safepointsynchronize","children":[{"level":3,"title":"inner_execute","slug":"inner-execute","link":"#inner-execute","children":[]},{"level":3,"title":"begin","slug":"begin","link":"#begin","children":[]},{"level":3,"title":"end","slug":"end","link":"#end","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1681045346000,"updatedTime":1681045346000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":6.12,"words":1837},"filePathRelative":"languages/java/jvm/safepoint.md","localizedDate":"2023年4月9日","excerpt":"<h1> safepoint</h1>\\n<h2> vmThread</h2>\\n<p><code>vmThread run()</code>会一直<code>loop</code>任务处理任务，也就是处理<code>Command</code>，<code>inner_execute(_next_vm_operation);</code>支持的命令在<code>vmOperation.hpp</code>会有所体现。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Breakpoint</span> reached<span class=\\"token operator\\">:</span> vmThread<span class=\\"token punctuation\\">.</span>cpp<span class=\\"token operator\\">:</span><span class=\\"token number\\">429</span>\\n<span class=\\"token class-name\\">Stack</span><span class=\\"token operator\\">:</span> \\n  <span class=\\"token class-name\\">VMThread</span><span class=\\"token operator\\">::</span><span class=\\"token function\\">inner_execute</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">VM_Operation</span><span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span> vmThread<span class=\\"token punctuation\\">.</span>cpp<span class=\\"token operator\\">:</span><span class=\\"token number\\">429</span>\\n  <span class=\\"token class-name\\">VMThread</span><span class=\\"token operator\\">::</span><span class=\\"token function\\">loop</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> vmThread<span class=\\"token punctuation\\">.</span>cpp<span class=\\"token operator\\">:</span><span class=\\"token number\\">496</span>\\n  <span class=\\"token class-name\\">VMThread</span><span class=\\"token operator\\">::</span><span class=\\"token function\\">run</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> vmThread<span class=\\"token punctuation\\">.</span>cpp<span class=\\"token operator\\">:</span><span class=\\"token number\\">175</span>\\n  <span class=\\"token class-name\\">Thread</span><span class=\\"token operator\\">::</span><span class=\\"token function\\">call_run</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> thread<span class=\\"token punctuation\\">.</span>cpp<span class=\\"token operator\\">:</span><span class=\\"token number\\">358</span>\\n  <span class=\\"token function\\">thread_native_entry</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Thread</span><span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span> os_bsd<span class=\\"token punctuation\\">.</span>cpp<span class=\\"token operator\\">:</span><span class=\\"token number\\">575</span>\\n  _pthread_start <span class=\\"token number\\">0x00007ff81a3234f4</span>\\n  thread_start <span class=\\"token number\\">0x00007ff81a31f00f</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{a as data};
