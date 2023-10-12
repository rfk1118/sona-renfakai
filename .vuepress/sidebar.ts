import { sidebar } from "vuepress-theme-hope";
export const sidebarConfig = sidebar({
  "/": [
    {
      text: "工作经历",
      link: "/introduction/",
    },
    {
      text: "web3",
      collapsible: false,
      link: "/web3/",
      children: [
        "/web3/solitify/ierc20",
        "/web3/solitify/IUniswapV2Factory",
        "/web3/solitify/UniswapV2Pair",
        "/web3/convert-abi",
        "/web3/flashloan",
        "/web3/flashloanV3",
        "/web3/8e55",
        "/web3/UniswapV2Router01",
        "/web3/atomical",
        "/web3/disperse",
        "/web3/arb",
        "/web3/LIQUIDITY",
      ],
    },
    {
      text: "股票",
      collapsible: false,
      link: "/terminology/",
      children: [
        "/terminology/1A0001",
        "/terminology/601919",
        "/terminology/601515",
        "/eth/hook",
      ],
    },
    {
      text: "国学",
      collapsible: false,
      link: "/thousand/",
      children: ["/thousand/tree"],
    },
    {
      text: "中间件",
      collapsible: false,
      link: "/middleware/",
      children: [
        {
          text: "Netty",
          collapsible: false,
          link: "/middleware/netty/",
          children: [
            {
              text: "基础知识",
              collapsible: false,
              link: "/middleware/netty/knowledge/",
              children: [
                "/middleware/netty/knowledge/reference",
                "/middleware/netty/knowledge/read-source",
                "/middleware/netty/knowledge/quick-start",
              ],
            },
            {
              text: "EventLoop",
              collapsible: false,
              children: [
                "/middleware/netty/nio/event-loop/nio-event-loop-group",
                "/middleware/netty/nio/event-loop/nio-event-loop",
              ],
            },
            {
              text: "Selectors",
              collapsible: false,
              link: "/middleware/netty/nio/selectors/selector",
              children: [
                "/middleware/netty/nio/selectors/open-selector",
                "/middleware/netty/nio/selectors/thread-factory",
                "/middleware/netty/nio/selectors/chooser-factory",
              ],
            },
            {
              text: "Bootstrap",
              collapsible: false,
              link: "/middleware/netty/nio/bootstrap/bootstrap",
            },
            {
              text: "Channel",
              collapsible: false,
              link: "/middleware/netty/nio/channels/channel",
              children: [
                "/middleware/netty/nio/channels/channel-init",
                "/middleware/netty/nio/channels/channel-register",
                "/middleware/netty/nio/channels/channel-handler",
                "/middleware/netty/nio/channels/channel-bind",
                "/middleware/netty/nio/channels/channel-unsafe",
                "/middleware/netty/nio/channels/channel-pipeline",
              ],
            },
            {
              text: "Codec",
              collapsible: false,
              link: "/middleware/netty/nio/codec/codec",
            },
          ],
        },
        {
          text: "nginx",
          collapsible: false,
          link: "/middleware/nginx/",
        },
        {
          text: "Spring",
          collapsible: false,
          link: "/framework/spring/",
          children: [
            "/framework/spring/di-concept",
            "/framework/spring/di",
            "/framework/spring/initialize-bean",
          ],
        },
      ],
    },
    {
      text: "编程语言",
      collapsible: false,
      children: [
        {
          text: "Java",
          collapsible: false,
          children: [
            {
              text: "虚拟机",
              collapsible: false,
              children: [
                "/languages/java/jvm/jvm",
                "/languages/java/jvm/layout/run-time-data-areas",
                "/languages/java/jvm/layout/pc-register",
                "/languages/java/jvm/layout/stacks",
                "/languages/java/jvm/layout/Frames",
                "/languages/java/jvm/layout/share-data",
                "/languages/java/jvm/jvm-select",
                "/languages/java/jvm/SerialHeap",
                "/languages/java/jvm/safepoint",
                "/languages/java/jvm/jvm-select-use",
              ],
            },
            {
              text: "多线程编程",
              collapsible: false,
              children: [
                "/languages/java/thread/java/juc/read-me",
                "/languages/java/thread/java/juc/aos",
                "/languages/java/thread/java/juc/atomic",
                "/languages/java/thread/java/juc/aqs",
                "/languages/java/thread/java/juc/blocking",
                "/languages/java/thread/java/juc/clh",
                "/languages/java/thread/java/juc/condition",
                "/languages/java/thread/java/juc/future",
                "/languages/java/thread/java/juc/daemon",
                "/languages/java/thread/java/juc/thread-factory",
                "/languages/java/thread/java/juc/rejected-execution-handler",
                "/languages/java/thread/java/juc/work",
                "/languages/java/thread/java/juc/thread-pool-executor",
                "/languages/java/thread/java/juc/threadQ",
              ],
            },
            {
              text: "其他",
              collapsible: false,
              children: [
                "/languages/java/auto-box",
                "/languages/java/delay-queue",
                "/languages/java/introduction-to-java-bytecode",
                "/languages/java/heap-java",
              ],
            },
          ],
        },
        {
          text: "go",
          collapsible: false,
          children: ["/languages/go/heap-go"],
        },
      ],
    },
    {
      text: "基本功",
      collapsible: false,
      children: [
        {
          text: "算法",
          collapsible: false,
          link: "/basic-skill/algorithms",
          children: [
            {
              text: "排序",
              collapsible: false,
              link: "/basic-skill/algorithms/sort/sort",
              children: [
                "/basic-skill/algorithms/sort/bubble-sort",
                "/basic-skill/algorithms/sort/select-sort",
                "/basic-skill/algorithms/sort/insert-sort",
                "/basic-skill/algorithms/sort/merge-sort",
                "/basic-skill/algorithms/sort/quick-sort",
              ],
            },
            {
              text: "数据结构",
              collapsible: false,
              children: [
                "/basic-skill/algorithms/structure/union-find-structure",
              ],
            },
            {
              text: "Tree",
              collapsible: false,
              link: "/basic-skill/algorithms/tree/binary-tree-concept",
              children: [
                "/basic-skill/algorithms/tree/pre-order",
                "/basic-skill/algorithms/tree/binary-tree-algs4",
                "/basic-skill/algorithms/tree/balanced-search-trees",
                "/basic-skill/algorithms/heap/heap",
              ],
            },
            {
              text: "图",
              collapsible: false,
              link: "/basic-skill/algorithms/graphs/",
              children: [
                "/basic-skill/algorithms/graphs/graph-concept",
                "/basic-skill/algorithms/graphs/directed-graph",
                "/basic-skill/algorithms/graphs/graph-search",
                "/basic-skill/algorithms/graphs/minimum-spanning-tree",
                "/basic-skill/algorithms/graphs/shortest-path-algnorithms",
              ],
            },
            {
              text: "其他",
              collapsible: false,
              children: [
                "/basic-skill/algorithms/other/Edsger-Dijkstra",
                "/basic-skill/algorithms/other/binary-Search",
                "/basic-skill/algorithms/other/swap-or-exchange",
                "/basic-skill/algorithms/other/xor",
              ],
            },
          ],
        },
        {
          text: "设计模式",
          collapsible: false,
          link: "/basic-skill/design-pattern/",
          children: [
            {
              text: "Reactor",
              collapsible: false,
              link: "/basic-skill/design-pattern/reactor",
              children: [
                "/basic-skill/design-pattern/reactor/single",
                "/basic-skill/design-pattern/reactor/multiple",
              ],
            },
            {
              text: "单例",
              collapsible: false,
              children: [
                "/basic-skill/design-pattern/create/singleton/",
                "/basic-skill/design-pattern/create/singleton/singleton",
              ],
            },
            {
              text: "策略",
              collapsible: false,
              children: [
                "/basic-skill/design-pattern/policy/spring-error-demo",
                "/basic-skill/design-pattern/policy/spring-policy",
                "/basic-skill/design-pattern/policy/spring-fly-weight",
              ],
            },
            {
              text: "interpreter",
              collapsible: false,
              link: "/basic-skill/design-pattern/interpreter/interpreter-pattern",
            },
            {
              text: "装饰者",
              collapsible: false,
              link: "/basic-skill/design-pattern/structure/decorator/concept",
              children: [
                "/basic-skill/design-pattern/structure/decorator/decorator-java",
                "/basic-skill/design-pattern/structure/decorator/decorator-netty",
                "/basic-skill/design-pattern/structure/decorator/decorator-hystrix",
              ],
            },
          ],
        },
        {
          text: "计算机网络",
          collapsible: false,
          children: [
            "/basic-skill/network/tree-shake-hands",
            "/basic-skill/network/four-wave",
          ],
        },
      ],
    },
    {
      text: "项目",
      collapsible: false,
      children: [
        "/project/selectAll/rbac/",
        "/project/selectAll/nextflow",
        "/project/cicd/docker/",
        "/project/cicd/docker/buildimage",
      ],
    },
    {
      text: "工具篇",
      collapsible: false,
      link: "/tools/",
      children: ["/tools/draw", "/tools/flowable", "/tools/linked/"],
    },
  ],
});
