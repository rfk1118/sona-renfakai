(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{607:function(l,t,v){"use strict";v.r(t);var _=v(13),n=Object(_.a)({},(function(){var l=this,t=l.$createElement,v=l._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[v("h1",{attrs:{id:"multiple"}},[l._v("Multiple")]),l._v(" "),v("ul",[v("li",[l._v("开启1个端口\n"),v("ul",[v("li",[l._v("1个线程处理请求，n个线程处理数据")]),l._v(" "),v("li",[l._v("1个线程处理请求和处理数据，n个线程处理数据")])])]),l._v(" "),v("li",[l._v("开启多个端口\n"),v("ul",[v("li",[l._v("1个线程开启多个端口，处理请求，n个线程处理数据")]),l._v(" "),v("li",[l._v("1个线程开启一个端口和处理数据，n个线程处理数据")]),l._v(" "),v("li",[l._v("1个线程开启多个端口，处理请求，1个线程处理数据")]),l._v(" "),v("li",[l._v("1个线程开启一个端口和处理数据，1个线程处理数据")])])])]),l._v(" "),v("h2",{attrs:{id:"总结"}},[l._v("总结")]),l._v(" "),v("ul",[v("li",[l._v("处理请求一般为CPU密集型，处理数据一般为CPU密集，IO密集型，混合密集型，多线程版本可以有很多种组合，请根据业务酌情选择")]),l._v(" "),v("li",[l._v("需要考虑连接在线程之间传递安全、设计成本、维护成本、效率等问题")]),l._v(" "),v("li",[l._v("常见使用方式为使用1个线程(Boss线程组，1个线程)处理请求，n个线程(Work线程组，1~n个线程)处理数据，详情见Netty，"),v("code",[l._v("Boss Work NioEventGroup")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);