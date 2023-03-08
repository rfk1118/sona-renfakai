import{_ as d,V as s,W as c,Y as e,a1 as i,Z as a,a0 as l,F as r}from"./framework-e54e0297.js";const v="/assets/IncludedGC0-fb4ce383.png",o="/assets/IncludedGC3-0bd37ebf.png",t={},u=e("h1",{id:"jvm-select",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#jvm-select","aria-hidden":"true"},"#"),i(" jvm-select")],-1),m=e("p",null,[i("启动虚拟机时增加 "),e("code",null,"-XX:"),i(" 参数可以选择不同类型的垃圾回收器，垃圾回收器主要分为两大类：吞吐量、最大停顿时间。不同版本"),e("code",null,"jvm"),i("下可以选择的垃圾回收有所变化。 现在查看不同版本怎么选择垃圾回收器。")],-1),_={href:"https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/collectors.html#sthref27",target:"_blank",rel:"noopener noreferrer"},g=l("<ul><li>如果应用程序的数据集很小（最高可达100MB），那么选择单线程序列收集器，使用参数<code>-XX:+UseSerialGC</code></li><li>如果应用程序将在单个处理器上运行，并且没有暂停时间要求，则让<code>VM</code>选择收集器，或选择具有<code>-XX:+UseSerialGC</code>选项的单线程收集器</li><li>如果峰值应用程序性能是第一个优先级，并且没有暂停时间要求或暂停1秒或更长时间是可以接受的，那么让VM选择集器，或选择带有<code>-XX:+UseParallelGC</code>的并行集器</li><li>如果响应时间比整体吞吐量更重要，并且垃圾收集暂停时间必须缩短约1秒，请选择具有<code>-XX:+UseConcMarkSweepGC</code>或<code>-XX:+UseG1GC</code>的并发收集器</li></ul><p>其他版本省略...</p>",2),p={href:"https://docs.oracle.com/en/java/javase/17/gctuning/available-collectors.html#GUID-F215A508-9E58-40B4-90A5-74E29BF3BD3C",target:"_blank",rel:"noopener noreferrer"},b=l(`<ul><li>如果应用程序的数据集很小（最高可达100MB），那么选择单线程序列收集器，使用参数<code>-XX:+UseSerialGC</code></li><li>如果应用程序将在单个处理器上运行，并且没有暂停时间要求，则让VM选择收集器，或选择具有<code>-XX:+UseSerialGC</code>选项的单线程收集器</li><li>如果响应时间比整体吞吐量更重要，并且垃圾收集暂停时间必须缩短，那么请选择主要并发的收集器与<code>-XX:+UseG1GC</code></li><li>如果响应时间是高优先级，请选择一个具有<code>-XX:UseZGC</code>的完全并发集器。</li></ul><h2 id="启动顺序" tabindex="-1"><a class="header-anchor" href="#启动顺序" aria-hidden="true">#</a> 启动顺序</h2><p>使用<code>-XX:+UseSerialGC</code>启动<code>jvm</code>查看垃圾回收器的启动顺序，垃圾回收器启动对配置文件<code>config = gcConfig</code>初始化，调用栈关系如下：</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>Breakpoint reached: gcConfig.cpp:144
Stack: 
  GCConfig::select_gc() gcConfig.cpp:146
  GCConfig::initialize() gcConfig.cpp:179
  Arguments::set_ergonomics_flags() arguments.cpp:1610
  Arguments::apply_ergo() arguments.cpp:4053
  Threads::create_vm(JavaVMInitArgs*, bool*) thread.cpp:2714
  ::JNI_CreateJavaVM(JavaVM **, void **, void *) jni.cpp:3613
  ::JNI_CreateJavaVM(JavaVM **, void **, void *) jni.cpp:3701
  JavaMain java.c:1459
  JavaMain java.c:411
  ThreadJavaMain java_md_macosx.m:722
  _pthread_start 0x00007ff8121814f4
  thread_start 0x00007ff81217d00f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>GCConfig</code>初始化时候会选择一个垃圾回收器类型，从<code>GCConfig::initialize</code>方法中可以看出。</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>void GCConfig::initialize() {
  // 选择gc
  _arguments = select_gc();
}

GCArguments* GCConfig::select_gc() {
  fail_if_non_included_gc_is_selected();
  // 异常退出
  if (is_no_gc_selected()) {
    select_gc_ergonomically();
    if (is_no_gc_selected()) {
      vm_exit_during_initialization(&quot;Garbage collector not selected &quot;
                                    &quot;(default collector explicitly disabled)&quot;, NULL);
    }
    _gc_selected_ergonomically = true;
  }
  // 异常退出
  if (!is_exactly_one_gc_selected()) {
    vm_exit_during_initialization(&quot;Multiple garbage collectors selected&quot;, NULL);
  }
  
  // 这里会选择垃圾回收器
  FOR_EACH_INCLUDED_GC(gc) {
    // 如果开启返回结果
    if (gc-&gt;_flag) {
      return &amp;gc-&gt;_arguments;
    }
  }
  // 没有找到，应用程序启动失败
  fatal(&quot;Should have found the selected GC&quot;);
  return NULL;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>FOR_EACH_INCLUDED_GC</code>会调用宏代码，代码如下：</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>#define FOR_EACH_INCLUDED_GC(var)                                            \\
  for (const IncludedGC* var = &amp;IncludedGCs[0]; var &lt; &amp;IncludedGCs[ARRAY_SIZE(IncludedGCs)]; var++)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>整个数组的情况如下，并且从<code>IncludedGC</code>结构中可以看到参数分别为<code>flag、name、arguments、hs_err_name</code>，这里的<code>flag</code>是否开启标记根据<code>command line flag</code>设置的。<code>flag = true</code>就是<code>-XX:</code>设置选择的垃圾回收器。</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>// Table of included GCs, for translating between command
// line flag, CollectedHeap::Name and GCArguments instance.
static const IncludedGC IncludedGCs[] = {
   EPSILONGC_ONLY_ARG(IncludedGC(UseEpsilonGC,       CollectedHeap::Epsilon,    epsilonArguments,    &quot;epsilon gc&quot;))
        G1GC_ONLY_ARG(IncludedGC(UseG1GC,            CollectedHeap::G1,         g1Arguments,         &quot;g1 gc&quot;))
  PARALLELGC_ONLY_ARG(IncludedGC(UseParallelGC,      CollectedHeap::Parallel,   parallelArguments,   &quot;parallel gc&quot;))
    SERIALGC_ONLY_ARG(IncludedGC(UseSerialGC,        CollectedHeap::Serial,     serialArguments,     &quot;serial gc&quot;))
SHENANDOAHGC_ONLY_ARG(IncludedGC(UseShenandoahGC,    CollectedHeap::Shenandoah, shenandoahArguments, &quot;shenandoah gc&quot;))
         ZGC_ONLY_ARG(IncludedGC(UseZGC,             CollectedHeap::Z,          zArguments,          &quot;z gc&quot;))
};

struct IncludedGC {
  bool&amp;               _flag;
  CollectedHeap::Name _name;
  GCArguments&amp;        _arguments;
  const char*         _hs_err_name;

  IncludedGC(bool&amp; flag, CollectedHeap::Name name, GCArguments&amp; arguments, const char* hs_err_name) :
      _flag(flag), _name(name), _arguments(arguments), _hs_err_name(hs_err_name) {}
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>jvm</code>启动时，使用的参数为<code>-XX:+UseSerialGC</code>，可以从下图中看到<code>SerialGC</code>的<code>flag = true</code>，其他垃圾回收器为<code>flag = false</code>。</p><p><img src="`+v+'" alt="An image"><img src="'+o+`" alt="An image"></p><p><code>GCConfig::initialize</code>会将<code>_arguments</code>设置成<code>SerialArguments</code>，这里是工厂设计模式，<code>SerialArguments</code>代码如下：</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>class CollectedHeap;

class SerialArguments : public GenArguments {
private:
  virtual CollectedHeap* create_heap();
};
// 工厂设计模式
CollectedHeap* SerialArguments::create_heap() {
  return new SerialHeap();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工厂创建对象进行初始化，这里已经指定了初始化堆<code>SerialHeap</code>的类型。</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>Breakpoint reached: serialHeap.cpp:53
Stack: 
  SerialHeap::initialize_serviceability() serialHeap.cpp:57
  // 模版方法
  GenCollectedHeap::post_initialize() genCollectedHeap.cpp:195
  universe_post_init() universe.cpp:1019
  // 初始化全局
  init_globals() init.cpp:156
  Threads::create_vm(JavaVMInitArgs*, bool*) thread.cpp:2813
  ::JNI_CreateJavaVM(JavaVM **, void **, void *) jni.cpp:3613
  ::JNI_CreateJavaVM(JavaVM **, void **, void *) jni.cpp:3701
  JavaMain java.c:1459
  JavaMain java.c:411
  ThreadJavaMain java_md_macosx.m:722
  _pthread_start 0x00007ff8121814f4
  thread_start 0x00007ff81217d00f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>post_initialize</code>模版方法会调用底层实现策略，进行堆垃圾回收设定，关于<a href="./SerialHeap">SerialHeap</a></p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>void GenCollectedHeap::post_initialize() {
  // 会进行策略分发
  CollectedHeap::post_initialize();
  ref_processing_init();
  // 新生代使用DefNewGeneration
  DefNewGeneration* def_new_gen = (DefNewGeneration*)_young_gen;
  initialize_size_policy(def_new_gen-&gt;eden()-&gt;capacity(),
                         _old_gen-&gt;capacity(),
                         def_new_gen-&gt;from()-&gt;capacity());
  MarkSweep::initialize();
  ScavengableNMethods::initialize(&amp;_is_scavengable);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>虚拟机在创建虚拟机时会根据参数选择不同虚拟机垃圾回收进行启动，并在<code>post_initialize</code>调用策略进行初始化。</p>`,20);function C(f,G){const n=r("ExternalLinkIcon");return s(),c("div",null,[u,m,e("p",null,[e("a",_,[i("javase8"),a(n)])]),g,e("p",null,[e("a",p,[i("javase17"),a(n)])]),b])}const A=d(t,[["render",C],["__file","jvm-select.html.vue"]]);export{A as default};
