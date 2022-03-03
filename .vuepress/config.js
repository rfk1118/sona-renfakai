module.exports = {
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: `https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css`
      }
    ],
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
      "vuepress-plugin-container",
      {
        type: "right",
        defaultTitle: ""
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "center",
        defaultTitle: ""
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "quote",
        before: info => `<div class="quote"><p class="title">${info}</p>`,
        after: "</div>"
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "not-print",
        defaultTitle: ""
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'G-VH6MYRZC4Z'
      }
    ],
    [
      "vuepress-plugin-comment",
      {
        choosen: "gitalk",
        options: {
          clientID: "c4994329985f8361e330",
          clientSecret: "3ed0530c924181fc77b2099af79b60d40bf54e67",
          repo: "sona-renfakai",
          owner: "sona0402",
          admin: ["sona0402"],
          labels: ["Gitalk", "Comment"],
          id: '<%- ("renfakai.com" + (frontmatter.to.path || window.location.pathname)).slice(-50) %>',
          title: "「Comment」<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>",
          body: "<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>",
          distractionFreeMode: false,
          pagerDirection: "last"
        }
      }
    ],
    ["@vuepress/back-to-top"]
  ],
  markdown: {
    anchor: {
      permalink: false
    },
    toc: {
      includeLevel: [1, 2]
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-mermaid').default);
      md.use(require('markdown-it-sub'));
      md.use(require('markdown-it-sup'));
      md.use(require('markdown-it-abbr'));
      md.use(require('markdown-it-ins'));
      md.use(require('markdown-it-figure'));
      md.use(require('markdown-it-smartarrows'));
      md.use(require('markdown-it-fontawesome'));
      md.use(require("markdown-it-katex"));
    }
  },
  title: "天道酬勤。",
  description: "天道酬勤",
  host: "localhost",
  port: 8080,
  dest: ".vuepress/dist",
  themeConfig: {
    sidebar: [{
        title: "前言",
        path: "/introduction/about-me"
      },
      {
        title: "中间件",
        collapsable: false,
        path: "/middleware/",
        children: [{
          title: "Netty",
          collapsable: false,
          path: "/middleware/netty/",
          children: [{
              title: "基础知识",
              collapsable: false,
              path: "/middleware/netty/guide/",
              children: [
                "/middleware/netty/guide/quick-start",
                "/middleware/netty/guide/read-source"
              ]
            },
            {
              title: "Reactor",
              collapsable: false,
              children: ["/middleware/netty/reactor/single", "/middleware/netty/reactor/multiple"]
            },
            {
              title: "EventLoop",
              collapsable: false,
              children: [
                "/middleware/netty/nio/event-loop/nio-event-loop-group",
                "/middleware/netty/nio/event-loop/nio-event-loop"
              ]
            },
            {
              title: "Selectors",
              collapsable: false,
              path: "/middleware/netty/nio/selectors/selector",
              children: [
                "/middleware/netty/nio/selectors/open-selector",
                "/middleware/netty/nio/selectors/thread-factory",
                "/middleware/netty/nio/selectors/chooser-factory"
              ]
            },
            {
              title: "Bootstrap",
              collapsable: false,
              path: "/middleware/netty/nio/bootstrap/bootstrap"
            },
            {
              title: "Channel",
              collapsable: false,
              path: "/middleware/netty/nio/channels/channel",
              children: [
                "/middleware/netty/nio/channels/channel-init",
                "/middleware/netty/nio/channels/channel-register",
                "/middleware/netty/nio/channels/channel-handler",
                "/middleware/netty/nio/channels/channel-bind",
                "/middleware/netty/nio/channels/channel-unsafe",
                "/middleware/netty/nio/channels/channel-pipeline"
              ]
            },
            {
              title: "Codec",
              collapsable: false,
              path: "/middleware/netty/nio/codec/codec"
            }
          ]
        }]
      },
      {
        title: "编程语言",
        collapsable: false,
        children: [{
            title: "Java",
            collapsable: false,
            children: [{
                title: "虚拟机",
                collapsable: false,
                children: [{
                    title: "内存布局",
                    collapsable: false,
                    path: "/languages/java/jvm/layout/run-time-data-areas",
                    children: [
                      "/languages/java/jvm/layout/pc-register",
                      "/languages/java/jvm/layout/stacks",
                      "/languages/java/jvm/layout/Frames",
                      "/languages/java/jvm/layout/share-data"
                    ]
                  },
                  {
                    title: "垃圾回收器",
                    collapsable: false,
                    children: [
                      "/languages/java/jvm/jvm-select",
                      "/languages/java/jvm/SerialHeap",
                      "/languages/java/jvm/safepoint",
                      "/languages/java/jvm/jvm-select-use"
                    ]
                  }
                ]
              },
              {
                title: "多线程编程",
                collapsable: false,
                path: "/languages/java/thread/java/juc/read-me",
                children: [{
                    title: "基础知识",
                    collapsable: false,
                    children: [
                      "/languages/java/thread/java/juc/aos",
                      "/languages/java/thread/java/juc/atomic",
                      "/languages/java/thread/java/juc/aqs",
                      "/languages/java/thread/java/juc/blocking",
                      "/languages/java/thread/java/juc/clh",
                      "/languages/java/thread/java/juc/condition",
                      "/languages/java/thread/java/juc/future",
                      "/languages/java/thread/java/juc/daemon"
                    ]
                  },
                  {
                    title: "应用",
                    collapsable: false,
                    children: [
                      "/languages/java/thread/java/juc/thread-factory",
                      "/languages/java/thread/java/juc/rejected-execution-handler",
                      "/languages/java/thread/java/juc/work",
                      "/languages/java/thread/java/juc/thread-pool-executor"
                    ]
                  }
                ]
              },
              {
                title: "其他",
                collapsable: false,
                children: [
                  "/languages/java/auto-box",
                  "/languages/java/delay-queue",
                  "/languages/java/introduction-to-java-bytecode",
                  "/languages/java/heap-java"
                ]
              }
            ]
          },
          {
            title: "go",
            collapsable: false,
            children: [
              "/languages/go/heap-go"
            ]
          }
        ]
      },
      {
        title: "基本功",
        collapsable: false,
        children: [{
            title: "算法",
            collapsable: false,
            children: [{
                title: "排序",
                collapsable: false,
                path: "/basic-skill/algorithms/sort/sort",
                children: [
                  "/basic-skill/algorithms/sort/bubble-sort",
                  "/basic-skill/algorithms/sort/select-sort",
                  "/basic-skill/algorithms/sort/insert-sort",
                  "/basic-skill/algorithms/sort/merge-sort",
                  "/basic-skill/algorithms/sort/quick-sort",
                  "/basic-skill/algorithms/other/Edsger-Dijkstra"
                ]
              },
              {
                title: "数据结构",
                collapsable: false,
                children: ["/basic-skill/algorithms/structure/union-find-structure"]
              },
              {
                title: "Tree",
                collapsable: false,
                path: "/basic-skill/algorithms/tree/binary-tree-concept",
                children: [
                  "/basic-skill/algorithms/tree/pre-order",
                  "/basic-skill/algorithms/tree/binary-tree-algs4",
                  "/basic-skill/algorithms/tree/balanced-search-trees",
                  // "/algorithms/tree/rb-binary-tree-concept",
                  "/basic-skill/algorithms/heap/heap"
                ]
              },
              {
                title: "图",
                collapsable: false,
                path: "/basic-skill/algorithms/graphs/",
                children: [
                  "/basic-skill/algorithms/graphs/graph-concept",
                  "/basic-skill/algorithms/graphs/directed-graph",
                  "/basic-skill/algorithms/graphs/graph-search",
                  "/basic-skill/algorithms/graphs/minimum-spanning-tree",
                  "/basic-skill/algorithms/graphs/shortest-path-algnorithms"
                ]
              },
              {
                title: "Bit",
                collapsable: false,
                children: ["/basic-skill/algorithms/bit/xor"]
              },
              {
                title: "其他",
                collapsable: false,
                children: [
                  "/basic-skill/algorithms/other/binary-Search",
                  "/basic-skill/algorithms/other/Top-down"
                ]
              }
            ]
          },
          {
            title: "设计模式",
            collapsable: false,
            path: "/basic-skill/design-pattern/",
            children: [{
                title: "policy",
                collapsable: false,
                children: [
                  "/basic-skill/design-pattern/policy/spring-error-demo",
                  "/basic-skill/design-pattern/policy/spring-policy",
                  "/basic-skill/design-pattern/policy/spring-fly-weight"
                ]
              },
              {
                title: "interpreter",
                collapsable: false,
                path: "/basic-skill/design-pattern/interpreter/interpreter-pattern"
              },
              {
                title: "decorator",
                collapsable: false,
                path: "/basic-skill/design-pattern/structure/decorator/concept",
                children: [
                  "/basic-skill/design-pattern/structure/decorator/decorator-java",
                  "/basic-skill/design-pattern/structure/decorator/decorator-netty",
                  "/basic-skill/design-pattern/structure/decorator/decorator-hystrix"
                ]
              }
            ]
          },
          {
            title: "计算机网络",
            collapsable: false,
            children: [
              "/basic-skill/network/tree-shake-hands",
              "/basic-skill/network/four-wave"
            ]
          }
        ]
      }, {
        title: "常用网站",
        collapsable: false,
        path: "/linked/"
      }
    ]
  }
};
