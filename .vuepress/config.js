module.exports = {
  head: [
    ['link', {
      rel: 'stylesheet',
      href: `https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css`
    }],
    [
      "link",
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: `/favicon.ico`
      }
    ]
  ],
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        // https://www.npmjs.com/package/vuepress-plugin-comment
        // https://www.cnblogs.com/quanxiaoha/p/10925401.html
        choosen: 'gitalk',
        options: {
          clientID: 'c4994329985f8361e330',
          clientSecret: '3ed0530c924181fc77b2099af79b60d40bf54e67',
          repo: 'sona-renfakai',
          owner: 'sona0402',
          admin: ['sona0402'],
          labels: ["Gitalk", "Comment"],
          id: '<%- ("renfakai.com" + (frontmatter.to.path || window.location.pathname)).slice(-50) %>',
          title: '「Comment」<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>',
          body: '<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>',
          distractionFreeMode: false,
          pagerDirection: 'last',
        }
      }
    ],
    ['@vuepress/back-to-top'],
    ['@vuepress/medium-zoom'],
    // https://github.com/eFrane/vuepress-plugin-mermaidjs
    ['vuepress-plugin-mermaidjs']
  ],
  markdown: {
    anchor: {
      permalink: false
    },
    toc: {
      includeLevel: [1, 2]
    },
    extendMarkdown: md => {
      // https://www.npmjs.com/
      // https://mermaid-js.github.io/mermaid/#/
      md.use(require('markdown-it-katex'));
    }
  },
  title: "智慧不可赐！",
  description: "因果不可改、智慧不可赐、真法不可说、无缘不能渡！",
  host: "localhost",
  port: 8080,
  dest: ".vuepress/dist",
  themeConfig: {
    sidebar: [{
        title: "作者",
        path: "/introduction/about-me"
      },
      {
        title: "Netty",
        children: [{
            title: "基础知识",
            collapsable: false,
            children: [
              "/netty/guide/read-source",
              "/netty/guide/base-knowledge",
              "/netty/guide/quick-start"
            ]
          },
          {
            title: "Reactor",
            collapsable: false,
            children: [
              "/netty/reactor/single",
              "/netty/reactor/multiple"
            ]
          },
          {
            title: "EventLoop",
            collapsable: false,
            children: [
              "/netty/nio/event-loop/nio-event-loop-group",
              "/netty/nio/event-loop/nio-event-loop"
            ]
          },
          {
            title: "Selectors",
            collapsable: false,
            children: [
              "/netty/nio/selectors/selector",
              "/netty/nio/selectors/open-selector",
              "/netty/nio/selectors/thread-factory",
              "/netty/nio/selectors/chooser-factory"
            ]
          },
          {
            title: "Bootstrap",
            collapsable: false,
            children: ["/netty/nio/bootstrap/bootstrap"]
          },
          {
            title: "Channel",
            collapsable: false,
            children: [
              "/netty/nio/channels/channel",
              "/netty/nio/channels/channel-init",
              "/netty/nio/channels/channel-register",
              "/netty/nio/channels/channel-handler",
              "/netty/nio/channels/channel-bind",
              "/netty/nio/channels/channel-unsafe",
              "/netty/nio/channels/channel-pipeline"
            ]
          },
          {
            title: "Codec",
            collapsable: false,
            children: ["/netty/nio/codec/codec"]
          }
        ]
      },
      {
        title: "算法",
        children: [{
            title: "排序",
            collapsable: false,
            children: [
              "/algorithms/sort/sort",
              "/algorithms/sort/bubble-sort",
              "/algorithms/sort/select-sort",
              "/algorithms/sort/insert-sort",
              "/algorithms/sort/merge-sort",
              "/algorithms/sort/quick-sort",
              "/algorithms/other/Edsger-Dijkstra"
            ]
          }, {
            title: "数据结构",
            collapsable: false,
            children: [
              "/algorithms/structure/union-find-structure",
            ]
          },
          {
            title: "Tree",
            collapsable: false,
            children: [
              "/algorithms/tree/binary-tree-concept",
              "/algorithms/tree/pre-order",
              "/algorithms/tree/binary-tree-algs4",
              "/algorithms/tree/balanced-search-trees",
              // "/algorithms/tree/rb-binary-tree-concept",
              "/algorithms/heap/heap",
            ]
          }, {
            title: "图",
            collapsable: false,
            children: [
              "/algorithms/graphs/read-source",
              "/algorithms/graphs/graph-concept",
              "/algorithms/graphs/directed-graph",
              "/algorithms/graphs/graph-search",
              "/algorithms/graphs/minimum-spanning-tree",
              "/algorithms/graphs/shortest-path-algnorithms",
            ]
          },
          {
            title: "Bit",
            collapsable: false,
            children: ["/algorithms/bit/xor"]
          }, {
            title: "其他",
            collapsable: false,
            children: [
              "/algorithms/other/binary-Search",
              "/algorithms/other/Top-down",
            ]
          }
        ]
      },
      {
        title: "设计模式",
        children: [{
            title: "基础知识",
            collapsable: false,
            children: ["/design-pattern/read-source"]
          },
          {
            title: "policy",
            collapsable: false,
            children: [
              "/design-pattern/policy/spring-error-demo",
              "/design-pattern/policy/spring-policy",
              "/design-pattern/policy/spring-fly-weight"
            ]
          },
          {
            title: "interpreter",
            collapsable: false,
            children: ["/design-pattern/interpreter/interpreter-pattern"]
          },
          {
            title: "decorator",
            collapsable: false,
            children: [
              "/design-pattern/structure/decorator/concept",
              "/design-pattern/structure/decorator/decorator-java",
              "/design-pattern/structure/decorator/decorator-netty",
              "/design-pattern/structure/decorator/decorator-hystrix"
            ]
          }
        ]
      },
      {
        title: "编程语言",
        children: [{
          title: "Java",
          collapsable: false,
          children: [
            "/languages/java/auto-box",
            "/languages/java/delay-queue",
            "/languages/java/introduction-to-java-bytecode",
            "/languages/java/heap-java",
          ]
        }, {
          title: "多线程",
          collapsable: false,
          children: [
            "/languages/java/juc/atomic",
            "/languages/java/juc/aos",
            "/languages/java/juc/aqs",
            "/languages/java/juc/blocking",
            "/languages/java/juc/daemon",
          ]
        }, {
          title: "go",
          collapsable: false,
          children: [
            "/languages/go/read-me",
            "/languages/go/heap-go",
          ]
        }]
      }, {
        title: "计算机网络",
        children: [
          "/tcp/tree-shake-hands",
          "/tcp/four-wave"
        ]
      }
    ]
  }
};
