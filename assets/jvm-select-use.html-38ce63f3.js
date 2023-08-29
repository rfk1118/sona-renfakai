const e=JSON.parse('{"key":"v-7f6a42ee","path":"/languages/java/jvm/jvm-select-use.html","title":"生产使用","lang":"zh-CN","frontmatter":{"description":"生产使用 垃圾回收器的选择还是根据实际生产环境进行选择，选择主要根据两个指标最大吞吐量、最短回收停顿时间。 最大吞吐量使用的是标记-整理算法，整理过程中需要重新移动对象，所以耗时增加，但是堆内存空间不需要额外的空闲表进行记录，所以在分配对象时间比较快，其流程如下： 最短回收停顿时间使用标记-清除算法，由于没有对象的移动，仅仅需要将是释放空间记录到空闲表中，所以垃圾回收阶段停顿时间少，但是在对象分配的时候需要查找空闲表，所以在吞吐量降低 现以常用版本jdk1.8为案例进行讲解，现使用下图进行组合:","head":[["meta",{"property":"og:url","content":"https://renfakai.com/languages/java/jvm/jvm-select-use.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"生产使用"}],["meta",{"property":"og:description","content":"生产使用 垃圾回收器的选择还是根据实际生产环境进行选择，选择主要根据两个指标最大吞吐量、最短回收停顿时间。 最大吞吐量使用的是标记-整理算法，整理过程中需要重新移动对象，所以耗时增加，但是堆内存空间不需要额外的空闲表进行记录，所以在分配对象时间比较快，其流程如下： 最短回收停顿时间使用标记-清除算法，由于没有对象的移动，仅仅需要将是释放空间记录到空闲表中，所以垃圾回收阶段停顿时间少，但是在对象分配的时候需要查找空闲表，所以在吞吐量降低 现以常用版本jdk1.8为案例进行讲解，现使用下图进行组合:"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://renfakai.com/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-29T09:16:04.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"生产使用"}],["meta",{"property":"article:modified_time","content":"2023-08-29T09:16:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"生产使用\\",\\"image\\":[\\"https://renfakai.com/\\"],\\"dateModified\\":\\"2023-08-29T09:16:04.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1693300564000,"updatedTime":1693300564000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":2.04,"words":613},"filePathRelative":"languages/java/jvm/jvm-select-use.md","localizedDate":"2023年8月29日","excerpt":"<h1> 生产使用</h1>\\n<p>垃圾回收器的选择还是根据实际生产环境进行选择，选择主要根据两个指标<code>最大吞吐量、最短回收停顿时间</code>。</p>\\n<p>最大吞吐量使用的是<code>标记-整理</code>算法，整理过程中需要重新移动对象，所以耗时增加，但是堆内存空间不需要额外的空闲表进行记录，所以在分配对象时间比较快，其流程如下：</p>\\n<p>最短回收停顿时间使用<code>标记-清除</code>算法，由于没有对象的移动，仅仅需要将是释放空间记录到空闲表中，所以垃圾回收阶段停顿时间少，但是在对象分配的时候需要查找空闲表，所以在吞吐量降低</p>\\n<p>现以常用版本<code>jdk1.8</code>为案例进行讲解，现使用下图进行组合:</p>","copyright":{},"autoDesc":true}');export{e as data};