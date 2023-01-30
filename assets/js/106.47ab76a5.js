(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{513:function(v,_,e){"use strict";e.r(_);var t=e(10),o=Object(t.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"中间件"}},[v._v("中间件")]),v._v(" "),_("p",[v._v("搭建项目时，按照敏捷规则不到万不得以不要使用中间件，使用中间件会增加代码层面成本（编写、维护）、中间件成本（搭建、维护）。\n有些中间件是必不可少的，比如服务器（"),_("code",[v._v("Jetty、Undertow、Tomcat")]),v._v("），下面按照必要、非必要对中间件进行梳理。")]),v._v(" "),_("h2",{attrs:{id:"必要"}},[v._v("必要")]),v._v(" "),_("h3",{attrs:{id:"服务器"}},[v._v("服务器")]),v._v(" "),_("p",[v._v("服务器一般都支持 "),_("code",[v._v("nio")]),v._v(" 和"),_("code",[v._v("阻塞io")]),v._v("，服务器启动时使用 "),_("code",[v._v("nio 模型")]),v._v("。"),_("code",[v._v("Netty、Jetty、Undertow、Tomcat")]),v._v("都实现了"),_("code",[v._v("Reactor")]),v._v("模型，所以了解"),_("code",[v._v("Reactor")]),v._v("模型就等于学会了服务器容器，大公司内部会自定义轻量级Rpc服务器(基于Netty)。")]),v._v(" "),_("h2",{attrs:{id:"非必要"}},[v._v("非必要")]),v._v(" "),_("h3",{attrs:{id:"redis"}},[v._v("Redis")]),v._v(" "),_("p",[_("code",[v._v("Reactor")]),v._v(" 中的 "),_("code",[v._v("acceptor")]),v._v(" 属于"),_("code",[v._v("CPU密集型")]),v._v("，"),_("code",[v._v("handler")]),v._v("包含以下三种："),_("code",[v._v("CPU密集型")]),v._v("、"),_("code",[v._v("IO 密集型")]),v._v("、"),_("code",[v._v("混合型")]),v._v("。\n"),_("code",[v._v("Redis")]),v._v(" 中的 "),_("code",[v._v("hanler")]),v._v(" 是 "),_("code",[v._v("CPU 密集型")]),v._v("，所以设计成单线程就很合理。\n对于服务器来讲，一般情况下 "),_("code",[v._v("handler")]),v._v(" 为 "),_("code",[v._v("IO 密集型")]),v._v("、"),_("code",[v._v("混合型")]),v._v("，所以使用 "),_("code",[v._v("Redis")]),v._v(" 是将 "),_("code",[v._v("IO 密集型")]),v._v("、"),_("code",[v._v("混合型")]),v._v("转换成 "),_("code",[v._v("CPU 密集型")]),v._v("，还有一种使用方式就是缓解 "),_("code",[v._v("CPU")]),v._v("压力而做缓存。")]),v._v(" "),_("div",{staticClass:"custom-block tip"},[_("p",{staticClass:"custom-block-title"},[v._v("提示")]),v._v(" "),_("p",[v._v("更加详细内容请参考 "),_("a",{attrs:{href:"http://icyfenix.cn/architect-perspective/general-architecture/diversion-system/cache-middleware.html",target:"_blank",rel:"noopener noreferrer"}},[v._v("周志明《凤凰架构 服务端缓存》"),_("OutboundLink")],1)])]),v._v(" "),_("h3",{attrs:{id:"mq"}},[v._v("MQ")]),v._v(" "),_("p",[v._v("MQ一般起到三个功能：解耦、异步、削峰填谷。")]),v._v(" "),_("ol",[_("li",[v._v("应用系统中调用三方系统，为了防止后面每增加一个三方系统都要修改代码，在解耦合方面 MQ 有点像观察者设计模式；")]),v._v(" "),_("li",[v._v("应用系统中调用三方系统，并不依赖三方系统（耗时长）结果，此时就可以使用 MQ 进行异步；")]),v._v(" "),_("li",[v._v("MQ 还可以做到“削峰填谷”的作用，如果全天只有一小段时间出现流量剧增，出现毛刺，就可以使用 MQ 进行应对。juc 内的 "),_("code",[v._v("BlockingQueue")]),v._v(" 也是一个 MQ，只不过这个"),_("code",[v._v("Queue")]),v._v("是基于任务的。")])])])}),[],!1,null,null,null);_.default=o.exports}}]);