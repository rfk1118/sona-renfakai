const e=JSON.parse('{"key":"v-df26a7ce","path":"/languages/java/thread/java/juc/clh.html","title":"clh锁","lang":"zh-CN","frontmatter":{"description":"clh锁 框架的核心是维护被阻止线程的队列，这些队列在这里仅限于FIFO队列。因此，该框架不支持基于优先级的同步。 如今，几乎没有争议，同步队列最合适的选择是非阻塞数据结构，这些结构本身不需要使用较低级别的锁构建。其中，有两个主要候选者：Mellor-Crummey和Scott（MCS）锁的变体[9]，以及Craig、Landin和Hagersten（CLH）锁的变体[5][8][10]。从历史上看，CLH锁只用于自旋锁。然而，它们似乎比MCS更适合在同步器框架中使用，因为它们更容易适应处理取消和超时，因此被选为基础。由此产生的设计与原始CLH结构相去甚远，需要解释。","head":[["meta",{"property":"og:url","content":"https://renfakai.com/languages/java/thread/java/juc/clh.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"clh锁"}],["meta",{"property":"og:description","content":"clh锁 框架的核心是维护被阻止线程的队列，这些队列在这里仅限于FIFO队列。因此，该框架不支持基于优先级的同步。 如今，几乎没有争议，同步队列最合适的选择是非阻塞数据结构，这些结构本身不需要使用较低级别的锁构建。其中，有两个主要候选者：Mellor-Crummey和Scott（MCS）锁的变体[9]，以及Craig、Landin和Hagersten（CLH）锁的变体[5][8][10]。从历史上看，CLH锁只用于自旋锁。然而，它们似乎比MCS更适合在同步器框架中使用，因为它们更容易适应处理取消和超时，因此被选为基础。由此产生的设计与原始CLH结构相去甚远，需要解释。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://renfakai.com/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-31T16:40:15.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"clh锁"}],["meta",{"property":"article:modified_time","content":"2023-01-31T16:40:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"clh锁\\",\\"image\\":[\\"https://renfakai.com/\\"],\\"dateModified\\":\\"2023-01-31T16:40:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"节点信息","slug":"节点信息","link":"#节点信息","children":[]},{"level":2,"title":"进队列","slug":"进队列","link":"#进队列","children":[]},{"level":2,"title":"出队列","slug":"出队列","link":"#出队列","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考材料","slug":"参考材料","link":"#参考材料","children":[]}],"git":{"createdTime":1675183215000,"updatedTime":1675183215000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":7.98,"words":2393},"filePathRelative":"languages/java/thread/java/juc/clh.md","localizedDate":"2023年2月1日","excerpt":"<h1> clh锁</h1>\\n<p>框架的核心是维护被阻止线程的队列，这些队列在这里仅限于FIFO队列。因此，该框架不支持基于优先级的同步。</p>\\n<p>如今，几乎没有争议，同步队列最合适的选择是非阻塞数据结构，这些结构本身不需要使用较低级别的锁构建。其中，有两个主要候选者：Mellor-Crummey和Scott（MCS）锁的变体[9]，以及Craig、Landin和Hagersten（CLH）锁的变体[5][8][10]。从历史上看，CLH锁只用于自旋锁。然而，它们似乎比MCS更适合在同步器框架中使用，因为它们更容易适应处理取消和超时，因此被选为基础。由此产生的设计与原始CLH结构相去甚远，需要解释。</p>","copyright":{},"autoDesc":true}');export{e as data};
