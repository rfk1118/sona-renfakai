const e=JSON.parse('{"key":"v-3baea0d2","path":"/languages/java/thread/java/juc/future.html","title":"FutureTask","lang":"zh-CN","frontmatter":{"description":"FutureTask Future表示异步计算的结果。 提供了检查计算是否完成、等待其完成以及检索计算结果的方法。结果只能在计算完成后使用方法get检索，必要时阻塞，直到它准备好。取消是通过cancel方法执行的。提供了额外的方法来确定任务是正常完成还是被取消。一旦计算完成，就不能取消计算。如果您想使用Future来取消可取消性但不提供可用的结果，您可以声明Future&lt;?&gt;形式的类型并返回null作为底层任务的结果·。","head":[["meta",{"property":"og:url","content":"https://renfakai.com/languages/java/thread/java/juc/future.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:title","content":"FutureTask"}],["meta",{"property":"og:description","content":"FutureTask Future表示异步计算的结果。 提供了检查计算是否完成、等待其完成以及检索计算结果的方法。结果只能在计算完成后使用方法get检索，必要时阻塞，直到它准备好。取消是通过cancel方法执行的。提供了额外的方法来确定任务是正常完成还是被取消。一旦计算完成，就不能取消计算。如果您想使用Future来取消可取消性但不提供可用的结果，您可以声明Future&lt;?&gt;形式的类型并返回null作为底层任务的结果·。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://renfakai.com/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-31T16:40:15.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"FutureTask"}],["meta",{"property":"article:modified_time","content":"2023-01-31T16:40:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"FutureTask\\",\\"image\\":[\\"https://renfakai.com/\\"],\\"dateModified\\":\\"2023-01-31T16:40:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[{"level":3,"title":"Runnable","slug":"runnable","link":"#runnable","children":[]},{"level":3,"title":"Future","slug":"future","link":"#future","children":[]},{"level":3,"title":"装饰者","slug":"装饰者","link":"#装饰者","children":[]},{"level":3,"title":"核心代码","slug":"核心代码","link":"#核心代码","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1675183215000,"updatedTime":1675183215000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1116},"filePathRelative":"languages/java/thread/java/juc/future.md","localizedDate":"2023年2月1日","excerpt":"<h1> FutureTask</h1>\\n<p><code>Future</code>表示异步计算的结果。 提供了检查计算是否完成、等待其完成以及检索计算结果的方法。结果只能在计算完成后使用方法<code>get</code>检索，必要时阻塞，直到它准备好。取消是通过<code>cancel</code>方法执行的。提供了额外的方法来确定任务是正常完成还是被取消。一旦计算完成，就不能取消计算。如果您想使用<code>Future</code>来取消可取消性但不提供可用的结果，您可以声明<code>Future&lt;?&gt;</code>形式的类型并返回null作为底层任务的结果·。</p>","copyright":{},"autoDesc":true}');export{e as data};
