const n=JSON.parse('{"key":"v-b4a03b5c","path":"/basic-skill/algorithms/graphs/weights-graph.html","title":"","lang":"zh-CN","frontmatter":{"description":"","head":[["meta",{"property":"og:url","content":"https://renfakai.com/basic-skill/algorithms/graphs/weights-graph.html"}],["meta",{"property":"og:site_name","content":"天道酬勤"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://renfakai.com/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-14T08:38:02.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"property":"article:modified_time","content":"2023-06-14T08:38:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"https://renfakai.com/\\"],\\"dateModified\\":\\"2023-06-14T08:38:02.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1686731882000,"updatedTime":1686731882000,"contributors":[{"name":"renfakai","email":"rfk1118@gmail.com","commits":1}]},"readingTime":{"minutes":2.13,"words":640},"filePathRelative":"basic-skill/algorithms/graphs/weights-graph.md","localizedDate":"2023年6月14日","excerpt":"<!-- # 带权图\\n\\n## 导读\\n\\n* 最小生成树\\n* 最短路径\\n\\n## 使用场景\\n\\n* 城市之间路程\\n* 飞机之间的航班\\n* 高速公路流量\\n* 好友的亲密度\\n\\n## 带权图最小生成树\\n\\n当所有的边权重相等时，可以随意选择一边生成最小生成树，但是权重不一样的时候，需要一些算法策略生成最小生成树。\\n\\n### 案例\\n\\n对于6个城市，`Ajo,Bordo,Colina,Danza,Erizo和Flor`需要搭建有限电视网，应该如何选择边，使得整体造价最低。\\n\\n由于地形原因会导致距离太远，所以一些边是不必要的，例如`Ajo-Colina,Danza-Flor`，所以这些边被忽略掉。\\n\\n![An image](./image/14-1.png)\\n\\n#### 问题\\n\\n计算机算法不能一次知道给定问题的所有数据，所以只能一点点的处理数据，并且可能会使用到回溯，修正问题结果。\\n\\n1. Ajo开始，按照价值排序，生成Ajo-Danza连接\\n   + Ajo-Danza  4\\n\\n   + Ajo-Bordo  6\\n\\n``` mermaid\\ngraph LR\\n    Ajo ---|4| Danza\\n```\\n\\n2. 回溯判断，如果现在在未知城市比Ajo-Danza更省钱，其必然经过了Bordo，但是现在Ajo-Danza比Ajo-Bordo省钱，这里就不需要回溯。\\n![An image](./image/14-4.jpeg)\\n\\n3. 从当前节点Danza或者Ajo出发，现在需要处理三个顶点，分别为`Bordo,Colina,Erizo`，这时候最小值为Ajo-Bordo，对Ajo-Bordo进行连接\\n   + Ajo-Bordo  6\\n\\n   + Danza-Bordo  7\\n\\n   + Danza-Colina  8\\n\\n   + Danza-Erizo  12\\n\\n``` mermaid\\ngraph LR\\n    Ajo ---|4|Danza\\n    Ajo ---|6|Bordo\\n```\\n\\n4. 对城市进行分类\\n   + 类别1，已经有连接，并且已经处理过的城市，例如：`Ajo,Bordo,Danza`\\n\\n   + 类别2，有连接还没处理过的城市，例如：`Colina,Erizo`\\n\\n   + 类别3，无连接还没处理的城市，例如：`Flor`\\n\\n5. 对类别1数据进一步处理，选择Bordo-Erizo\\n   + Bordo-Erizo  7\\n\\n   + Danza-Colina  8\\n\\n   + Bordo-Colina  10\\n\\n   + Danza-Erizo  12\\n\\n``` mermaid\\ngraph LR\\n    Ajo ---|4|Danza\\n    Ajo ---|6|Bordo\\n    Bordo---|7|Erizo\\n```\\n\\n6. 对类别1数据进一步处理，选择Erizo-Colina\\n   + Erizo-Colina  5\\n\\n   + Erizo-Flor  7\\n\\n   + Danza-Colina  8\\n\\n   + Bordo-Colina  10\\n\\n``` mermaid\\ngraph LR\\n    Ajo ---|4|Danza\\n    Ajo ---|6|Bordo\\n    Bordo ---|7|Erizo\\n    Erizo ---|5|Colina\\n```\\n\\n7. 处理Flor\\n   + Colina-Flor  6\\n\\n   + Erizo-Flor  7\\n\\n``` mermaid\\ngraph LR\\n    Ajo ---|4|Danza\\n    Ajo ---|6|Bordo\\n    Bordo ---|7|Erizo\\n    Erizo ---|5|Colina\\n    Colina---|6|Flor\\n```\\n\\n#### 算法\\n\\n1. 从一个顶点开始，把它放到树的集合中，然后重复做下面事情\\n\\n2. 找到从最新的顶点到其他顶点的所有的边，这些顶点不能在树的集合里，把这些边放到优先级队列\\n\\n3. 找出权值最小的边，把它和它到达的顶点放到树的集合里 -->","copyright":{},"autoDesc":true}');export{n as data};
