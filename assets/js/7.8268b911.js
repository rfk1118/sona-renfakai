(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{381:function(t,s,e){t.exports=e.p+"assets/img/components.334d6816.png"},382:function(t,s,e){t.exports=e.p+"assets/img/netty-git-history.a2ef4767.jpg"},383:function(t,s,e){t.exports=e.p+"assets/img/commit-template.808135bd.jpg"},384:function(t,s,e){t.exports=e.p+"assets/img/40-nettyapi.015934d0.jpg"},385:function(t,s,e){t.exports=e.p+"assets/img/41-nettyapi.64759c91.jpg"},386:function(t,s,e){t.exports=e.p+"assets/img/AbstractBootstrapConfig.76fe18ec.jpg"},387:function(t,s,e){t.exports=e.p+"assets/img/issues.0fa28a92.jpg"},388:function(t,s,e){t.exports=e.p+"assets/img/bootconfig.bbf23801.jpg"},517:function(t,s,e){"use strict";e.r(s);var a=e(10),n=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"如何读源码"}},[t._v("如何读源码")]),t._v(" "),s("h2",{attrs:{id:"为什么要会读源码"}},[t._v("为什么要会读源码？")]),t._v(" "),s("ul",[s("li",[t._v("书上讲的都是理论知识，无法直接使用到项目中，空有理论知识，不能落地，学过的知识很快就忘记了；")]),t._v(" "),s("li",[t._v("视频里都是讲案例和部分源码，看过之后犹如沙子上画画，风一吹就没了；")])]),t._v(" "),s("h2",{attrs:{id:"查看官网"}},[t._v("查看官网")]),t._v(" "),s("p",[t._v("打开"),s("a",{attrs:{href:"https://netty.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("官网"),s("OutboundLink")],1),t._v("，查看架构设计，这一步很重要，其可以快速了解项目设计理念和应用。")]),t._v(" "),s("div",{staticClass:"custom-block center"},[s("p",[s("img",{attrs:{src:e(381),alt:"An image"}})])]),t._v(" "),s("p",[s("a",{attrs:{href:"https://netty.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("Netty"),s("OutboundLink")],1),t._v(" 是一款异步事件驱动的网络应用程序框架，支持快速地开发可维护的、高性能的、面向协议的服务器和客户端。")]),t._v(" "),s("h2",{attrs:{id:"为什么要看源码历史"}},[t._v("为什么要看源码历史？")]),t._v(" "),s("h3",{attrs:{id:"为什么"}},[t._v("为什么？")]),t._v(" "),s("ul",[s("li",[t._v("根据提交历史记录拨丝抽茧找到代码核心底层逻辑；")]),t._v(" "),s("li",[t._v("根据历史提交追根溯源，知道代码为什么要这么写。")])]),t._v(" "),s("h3",{attrs:{id:"怎么做"}},[t._v("怎么做？")]),t._v(" "),s("p",[t._v("按照下面流程进行操作：")]),t._v(" "),s("mermaid",{staticStyle:{"margin-bottom":"0px"}},[t._v("\nflowchart LR\n    A(克隆代码) --\x3e B(查看提交历史)\n    B --\x3e C(查看Git commit template)\n")]),t._v(" "),s("h3",{attrs:{id:"详细流程"}},[t._v("详细流程")]),t._v(" "),s("p",[t._v("打开"),s("a",{attrs:{href:"https://github.com/netty/netty",target:"_blank",rel:"noopener noreferrer"}},[t._v("netty github"),s("OutboundLink")],1),t._v("，找到仓库地址，"),s("code",[t._v("git clone")]),t._v("或者"),s("code",[t._v("IDE")]),t._v("拉取代码，查看 Git 提交历史，这个东西到底该怎么用呢？")]),t._v(" "),s("div",{staticClass:"custom-block center"},[s("p",[s("img",{attrs:{src:e(382),alt:"An image"}})])]),t._v(" "),s("p",[t._v("每个提交点都提交了什么东西呢？")]),t._v(" "),s("p",[s("img",{attrs:{src:e(383),alt:"An image"}})]),t._v(" "),s("h3",{attrs:{id:"如何使用历史提交记录呢"}},[t._v("如何使用历史提交记录呢？")]),t._v(" "),s("p",[t._v("如何看明白一段或者一行代码呢？其主流程如下：")]),t._v(" "),s("mermaid",{staticStyle:{"margin-bottom":"0px"}},[t._v("\nflowchart LR\n    A(查看某个类或者某行代码) --\x3e B(找到提交点)\n    B --\x3e C(查看Git commit template)\n    C --\x3e D(Git issues 改动背景)\n    D --\x3e E(代码改动)\n")]),t._v(" "),s("h4",{attrs:{id:"案例"}},[t._v("案例")]),t._v(" "),s("p",[t._v("以"),s("code",[t._v("Netty AbstractBootstrapConfig")]),t._v("为例查看为什么它会出现？让我们对比 4.0 版本和 4.1 版本"),s("code",[t._v("io.netty.bootstrap")]),t._v("包的区别。")]),t._v(" "),s("div",{staticClass:"custom-block center"},[s("p",[s("img",{attrs:{src:e(384),alt:"An image"}}),t._v(" "),s("img",{attrs:{src:e(385),alt:"An image"}})])]),t._v(" "),s("p",[t._v("对比发现 4.1 版本的包比 4.0 版本的包多了"),s("code",[t._v("BootstrapConfig")]),t._v("，为什么会出现这个类呢？不用多想肯定是有需求才会有产生这样变化。需求是什么呢？打开"),s("code",[t._v("AbstractBootstrapConfig")]),t._v("查看这个代码的提交点。")]),t._v(" "),s("p",[s("img",{attrs:{src:e(386),alt:"An image"}})]),t._v(" "),s("p",[t._v("查看提交点"),s("code",[t._v("Git template")]),t._v("提交了什么信息？")]),t._v(" "),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[t._v("暴露Bootstrap数据数据获取方法\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#5174] Expose Bootstrap getter methods and add some additional ones")]),t._v("\n\n动机"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("因为Bootstrap暴露的获取数量的方法过少\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Motivation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("  The Bootstrap class (applies also to AbstractBootstrap and ServerBootstrap) has a few package private getter methods and some things such as "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#attr() and #options() aren't exposed at all.")]),t._v("\n变更"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("使用更安全的管理方式暴露配置数据\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Modifications")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v('  Expose "getters" for configured things in a safe'),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("manner via the config() method.\n结果"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("更简单的检查配置好的启动程序\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Result")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("  Easier for the user to check what is configured for a Bootstrap/ServerBootstrap.\n")])])]),s("p",[t._v("产生这次变动的"),s("a",{attrs:{href:"https://github.com/netty/netty/issues/5174",target:"_blank",rel:"noopener noreferrer"}},[t._v("动机"),s("OutboundLink")],1),t._v("是什么？")]),t._v(" "),s("div",{staticClass:"custom-block center"},[s("p",[s("img",{attrs:{src:e(387),alt:"An image"}})])]),t._v(" "),s("p",[t._v("在 3 处输入 5174，就可以看到结果。")]),t._v(" "),s("div",{staticClass:"custom-block center"},[s("p",[s("img",{attrs:{src:e(388),alt:"An image"}})])]),t._v(" "),s("p",[t._v("译文：我们的程序使用 "),s("code",[t._v("Java")]),t._v(" 开发，但是我们用"),s("code",[t._v("Clojure")]),t._v("代替了普通配置文件，但是我们无法测试远程地址是否未配置，这时候我们就理解了"),s("code",[t._v("AbstractBootstrapConfig")]),t._v("为什么会出现以及它的职责。")]),t._v(" "),s("h2",{attrs:{id:"总结"}},[t._v("总结")]),t._v(" "),s("ul",[s("li",[t._v("使用上述方式可以快速查看代码历史背景和需求推动；")]),t._v(" "),s("li",[s("code",[t._v("Netty")]),t._v("很值得学习的一点就是关于背景、动机、结果描述的很清晰，让后面参与的维护者可以通过 "),s("code",[t._v("Git")]),t._v(" 提交记录感知到历史上下文，降低口口传递成本。")])])],1)}),[],!1,null,null,null);s.default=n.exports}}]);