import{_ as d,V as o,W as l,X as a,Y as e,Z as n,a0 as t,$ as s,F as i}from"./framework-fd210779.js";const c={},u=s('<h1 id="run-time-data-areas" tabindex="-1"><a class="header-anchor" href="#run-time-data-areas" aria-hidden="true">#</a> Run-Time-Data-Areas</h1><div class="hint-container tip"><p class="hint-container-title">官方文档</p><p>The Java Virtual Machine defines various run-time data areas that are used during execution of a program. Some of these data areas are created on Java Virtual Machine start-up and are destroyed only when the Java Virtual Machine exits. Other data areas are per thread. Per-thread data areas are created when a thread is created and destroyed when the thread exits.</p></div><p>Java虚拟机定义了在执行程序期间使用的各种运行时数据区域。其中一些数据区域是在Java虚拟机启动时创建的，只有在Java虚拟机退出时才会销毁。其他数据区域是每个线程。每线程数据区域在创建线程时创建，并在线程退出时销毁。</p><h2 id="线程私有" tabindex="-1"><a class="header-anchor" href="#线程私有" aria-hidden="true">#</a> 线程私有</h2>',4),m=s('<h2 id="共享" tabindex="-1"><a class="header-anchor" href="#共享" aria-hidden="true">#</a> 共享</h2><ul><li><a href="./share-data##heap">Heap</a></li><li><a href="./share-data##Method-Area">Method Area</a></li><li><a href="./share-data##Run-Time-Constant-Pool">Run-Time Constant Pool</a></li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>私有属性一般都是与线程绑定的，如果多个线程都需要使用的数据，就需要放到共享区域。</p><h2 id="参考材料" tabindex="-1"><a class="header-anchor" href="#参考材料" aria-hidden="true">#</a> 参考材料</h2>',5),p={href:"https://docs.oracle.com/javase/specs/jvms/se17/jvms17.pdf",target:"_blank",rel:"noopener noreferrer"};function v(_,f){const r=i("RouterLink"),h=i("ExternalLinkIcon");return o(),l("div",null,[u,a("ul",null,[a("li",null,[e(r,{to:"/languages/java/jvm/layout/pc-register.html"},{default:n(()=>[t("The pc Register")]),_:1})]),a("li",null,[e(r,{to:"/languages/java/jvm/layout/stacks.html##Java-Virtual-Machine-Stacks"},{default:n(()=>[t("Java Virtual Machine Stack")]),_:1})]),a("li",null,[e(r,{to:"/languages/java/jvm/layout/stacks.html##Native-Method-Stacks"},{default:n(()=>[t("Native Method Stacks")]),_:1})])]),m,a("ul",null,[a("li",null,[a("a",p,[t("The Java® VirtualMachine Specification"),e(h)])])])])}const k=d(c,[["render",v],["__file","run-time-data-areas.html.vue"]]);export{k as default};
