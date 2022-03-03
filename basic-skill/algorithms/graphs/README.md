# 导读

## 基础

### 图类型

* [无向图](./graph-concept.md)
  * 图中的边没有方向，只处理连接问题
* [有向图](./directed-graph.md)
  * 图中的边有方向

### 图权重

* 无权图
  * 所有权重相等
* 有权图
  * 每条边都有各自权重，后面会引出连接花费，最短路径问题等

### 搜索

* [DFS(深度优先搜索)](./graph-search.md#深度优先搜索)
  * 使用栈作为辅助内存空间，一条路走到黑，在返回机制
* [BFS(广度优先搜索)](./graph-search.md#广度优先搜索)
  * 使用队列作为辅助内存空间，就近原则处理

### 最小生成树

* [Kruskal’s algorithm](./minimum-spanning-tree.md#Kruskal)
* [Prim’s algorithm](./minimum-spanning-tree.md#Prim)

### 最短路径

* [Floyd-Warshall Algorithm](./shortest-path-algnorithms#Floyd-Warshall)
  * 解决所有顶点间的最短路径问题
* [Dijkstra’s Algorithm](./shortest-path-algnorithms#Dijkstra)
  * 解决单源最短路径问题

## 参考资料

* [算法4 Graphs](https://algs4.cs.princeton.edu/40graphs/)
  * 无向图，有向图，最小生成树，最短路径问题，这四章基本上已经表示出了图的核心所在。
  * 读中文版本时候发现译者会在原书基础上增加一些自己的思想，其初心是为了让大家更容易理解，但是有部分章节新增和修改会背离原作者的表达重心。
* [Java数据结构和算法第二版](https://book.douban.com/subject/1144007/)
  * 图和案例写的很好，翻译的有点晦涩，没找到英文版
* [数据结构与算法之美](https://time.geekbang.org/column/intro/100017301)
  * 王争 前Google工程师编写，国人编写，适合阅读
* [CS 97SI-basic-graph-algorithms](https://web.stanford.edu/class/cs97si/06-basic-graph-algorithms.pdf)
  * ppt做的特别棒，学习时候作为主线，英文概念比较晦涩，建议配合[数据结构与算法基础（青岛大学-王卓）](https://www.bilibili.com/video/BV1Ts411c7ZX?from=search&seid=229267902850184544&spm_id_from=333.337.0.0)视频进行学习
* [CS 97SI-shortest-path-algorithms](https://web.stanford.edu/class/cs97si/07-shortest-path-algorithms.pdf)
  * 最短路径问题
* [数据结构与算法基础（青岛大学-王卓）](https://www.bilibili.com/video/BV1Ts411c7ZX?from=search&seid=229267902850184544&spm_id_from=333.337.0.0)
  * 对于概念讲的深入浅出，ppt做的很好，对于没有时间的同学可以根据[CS 97SI]选择性观看视频
  * 视频和ppt基于[数据结构（C语言版）（第2版）严蔚敏 李冬梅 昊伟民](https://weread.qq.com/web/reader/b57320b071db572cb578fb5kc81322c012c81e728d9d180)编写
* [Algorithms Course - Graph Theory Tutorial from a Google Engineer](https://www.youtube.com/watch?v=09_LlHjoEiY)
  * William大神讲源码，王卓只讲了原理，这里看源码了解细节
* [算法导论](https://book.douban.com/subject/20432061/)
  * 神书
  * 读起来相当吃力(个人真实感受)
* [Neo4j_Graph_Algorithms](https://github.com/sona0402/books/blob/master/graphs/Neo4j_Graph_Algorithms.pdf)
  * 大概看了一眼，暂时还没精力看，后续做这一块时候在深入研究
