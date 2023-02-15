const n=JSON.parse('{"key":"v-aa74e4c8","path":"/framework/spring/di.html","title":"DI实现","lang":"zh-CN","frontmatter":{"description":"DI实现 在has-a中编程依赖的是接口，接口实现会使用反射进行初始化，构造器填充、属性填充时，其实就是处理 DI 过程。 Bean生命周期 下面代码是 bean 整个生命周期模版方法。 protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) throws BeanCreationException { // todo 忽略一些代码 BeanWrapper instanceWrapper = null; if (mbd.isSingleton()) { instanceWrapper = this.factoryBeanInstanceCache.remove(beanName); } // 如果没有创建创建bean，创建bean if (instanceWrapper == null) { instanceWrapper = createBeanInstance(beanName, mbd, args); } // wrap信息设置，这里是BeanWrapperImpl Object bean = instanceWrapper.getWrappedInstance(); Class&lt;?&gt; beanType = instanceWrapper.getWrappedClass(); if (beanType != NullBean.class) { mbd.resolvedTargetType = beanType; } // 提前暴露，循环依赖 boolean earlySingletonExposure = (mbd.isSingleton() &amp;&amp; this.allowCircularReferences &amp;&amp; isSingletonCurrentlyInCreation(beanName)); if (earlySingletonExposure) { // 如果允许在未填充属性之前进行暴露，放到二级缓存中 addSingletonFactory(beanName, () -&gt; getEarlyBeanReference(beanName, mbd, bean)); } Object exposedObject = bean; try { // 进行属性填充 populateBean(beanName, mbd, instanceWrapper); // 调用接口钩子 exposedObject = initializeBean(beanName, exposedObject, mbd); } catch (Throwable ex) { } return exposedObject; }","head":[["meta",{"property":"og:url","content":"https://renfakai.com/framework/spring/di.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"DI实现"}],["meta",{"property":"og:description","content":"DI实现 在has-a中编程依赖的是接口，接口实现会使用反射进行初始化，构造器填充、属性填充时，其实就是处理 DI 过程。 Bean生命周期 下面代码是 bean 整个生命周期模版方法。 protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) throws BeanCreationException { // todo 忽略一些代码 BeanWrapper instanceWrapper = null; if (mbd.isSingleton()) { instanceWrapper = this.factoryBeanInstanceCache.remove(beanName); } // 如果没有创建创建bean，创建bean if (instanceWrapper == null) { instanceWrapper = createBeanInstance(beanName, mbd, args); } // wrap信息设置，这里是BeanWrapperImpl Object bean = instanceWrapper.getWrappedInstance(); Class&lt;?&gt; beanType = instanceWrapper.getWrappedClass(); if (beanType != NullBean.class) { mbd.resolvedTargetType = beanType; } // 提前暴露，循环依赖 boolean earlySingletonExposure = (mbd.isSingleton() &amp;&amp; this.allowCircularReferences &amp;&amp; isSingletonCurrentlyInCreation(beanName)); if (earlySingletonExposure) { // 如果允许在未填充属性之前进行暴露，放到二级缓存中 addSingletonFactory(beanName, () -&gt; getEarlyBeanReference(beanName, mbd, bean)); } Object exposedObject = bean; try { // 进行属性填充 populateBean(beanName, mbd, instanceWrapper); // 调用接口钩子 exposedObject = initializeBean(beanName, exposedObject, mbd); } catch (Throwable ex) { } return exposedObject; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-15T08:14:39.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-15T08:14:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DI实现\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-15T08:14:39.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Bean生命周期","slug":"bean生命周期","link":"#bean生命周期","children":[]},{"level":2,"title":"实例化","slug":"实例化","link":"#实例化","children":[]},{"level":2,"title":"属性填充","slug":"属性填充","link":"#属性填充","children":[]},{"level":2,"title":"三级缓存","slug":"三级缓存","link":"#三级缓存","children":[]}],"git":{"createdTime":1676448879000,"updatedTime":1676448879000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":2.58,"words":773},"filePathRelative":"framework/spring/di.md","localizedDate":"2023年2月15日","excerpt":"<h1> DI实现</h1>\\n<p>在<code>has-a</code>中编程依赖的是接口，接口实现会使用反射进行初始化，构造器填充、属性填充时，其实就是处理 <code>DI</code> 过程。</p>\\n<h2> Bean生命周期</h2>\\n<p>下面代码是 <code>bean</code> 整个生命周期模版方法。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">protected</span> <span class=\\"token class-name\\">Object</span> <span class=\\"token function\\">doCreateBean</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> beanName<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">RootBeanDefinition</span> mbd<span class=\\"token punctuation\\">,</span> <span class=\\"token annotation punctuation\\">@Nullable</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> args<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">BeanCreationException</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// todo 忽略一些代码</span>\\n  <span class=\\"token class-name\\">BeanWrapper</span> instanceWrapper <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>mbd<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isSingleton</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    instanceWrapper <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>factoryBeanInstanceCache<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">remove</span><span class=\\"token punctuation\\">(</span>beanName<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token comment\\">// 如果没有创建创建bean，创建bean</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>instanceWrapper <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    instanceWrapper <span class=\\"token operator\\">=</span> <span class=\\"token function\\">createBeanInstance</span><span class=\\"token punctuation\\">(</span>beanName<span class=\\"token punctuation\\">,</span> mbd<span class=\\"token punctuation\\">,</span> args<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token comment\\">// wrap信息设置，这里是BeanWrapperImpl</span>\\n  <span class=\\"token class-name\\">Object</span> bean <span class=\\"token operator\\">=</span> instanceWrapper<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getWrappedInstance</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token class-name\\">Class</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">&gt;</span></span> beanType <span class=\\"token operator\\">=</span> instanceWrapper<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getWrappedClass</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>beanType <span class=\\"token operator\\">!=</span> <span class=\\"token class-name\\">NullBean</span><span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">class</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    mbd<span class=\\"token punctuation\\">.</span>resolvedTargetType <span class=\\"token operator\\">=</span> beanType<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token comment\\">// 提前暴露，循环依赖</span>\\n  <span class=\\"token keyword\\">boolean</span> earlySingletonExposure <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>mbd<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isSingleton</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>allowCircularReferences <span class=\\"token operator\\">&amp;&amp;</span>\\n      <span class=\\"token function\\">isSingletonCurrentlyInCreation</span><span class=\\"token punctuation\\">(</span>beanName<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>earlySingletonExposure<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 如果允许在未填充属性之前进行暴露，放到二级缓存中</span>\\n    <span class=\\"token function\\">addSingletonFactory</span><span class=\\"token punctuation\\">(</span>beanName<span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-&gt;</span> <span class=\\"token function\\">getEarlyBeanReference</span><span class=\\"token punctuation\\">(</span>beanName<span class=\\"token punctuation\\">,</span> mbd<span class=\\"token punctuation\\">,</span> bean<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token class-name\\">Object</span> exposedObject <span class=\\"token operator\\">=</span> bean<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 进行属性填充</span>\\n    <span class=\\"token function\\">populateBean</span><span class=\\"token punctuation\\">(</span>beanName<span class=\\"token punctuation\\">,</span> mbd<span class=\\"token punctuation\\">,</span> instanceWrapper<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 调用接口钩子</span>\\n    exposedObject <span class=\\"token operator\\">=</span> <span class=\\"token function\\">initializeBean</span><span class=\\"token punctuation\\">(</span>beanName<span class=\\"token punctuation\\">,</span> exposedObject<span class=\\"token punctuation\\">,</span> mbd<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Throwable</span> ex<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">return</span> exposedObject<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{n as data};
