(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{613:function(s,t,a){"use strict";a.r(t);var n=a(19),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"多线程编程"}},[s._v("多线程编程")]),s._v(" "),a("h2",{attrs:{id:"aqs"}},[s._v("aqs")]),s._v(" "),a("p",[s._v("aqs设计理念推荐看"),a("a",{attrs:{href:"http://gee.cs.oswego.edu/dl/papers/aqs.pdf",target:"_blank",rel:"noopener noreferrer"}},[s._v("文档"),a("OutboundLink")],1),s._v("，论文中很容易看出设计围绕四个方向("),a("code",[s._v("synchronized、Thread.suspend、等待集、Object.wait、Object.signal")]),s._v("，设计实现细节，推荐看源码。\n整体来讲"),a("code",[s._v("juc")]),s._v("是把"),a("code",[s._v("java")]),s._v("内置锁从底层"),a("code",[s._v("jvm")]),s._v("层面拿到代码层面进行优化。")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("cas")]),s._v("修改状态代替"),a("code",[s._v("synchronized")]),s._v("的获取")]),s._v(" "),a("li",[a("code",[s._v("LockSupport")]),s._v("代替阻塞")]),s._v(" "),a("li",[a("code",[s._v("clh")]),s._v("锁代替等待集，自旋代替上下文切换")]),s._v(" "),a("li",[s._v("条件队列颗粒度优化"),a("code",[s._v("Object.wait、signal")])])]),s._v(" "),a("h3",{attrs:{id:"synchronize-state"}},[a("RouterLink",{attrs:{to:"/languages/java/thread/java/juc/aqs.html"}},[s._v("synchronize state")])],1),s._v(" "),a("p",[a("code",[s._v("synchronize state = synchronized")]),s._v("，"),a("code",[s._v("monitorenter、monitorexit")]),s._v("使用状态协议字段替换，例如以下代码：")]),s._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sy")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("final")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Lock")]),s._v(" lock "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ReentrantLock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("testSynchronized")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("synchronized")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"test sy"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("testLock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        lock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("lock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"test sy"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("finally")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            lock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unlock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("代码编译和查看字节码，从字节码可以看出"),a("code",[s._v("synchronized")]),s._v("使用"),a("code",[s._v("jvm")]),s._v("内置锁，也就是"),a("code",[s._v("monitorenter、monitorexit")]),s._v("，而"),a("code",[s._v("juc")]),s._v("中的"),a("code",[s._v("lock")]),s._v("并没有使用内置锁")]),s._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[s._v("javac "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("java\njavap "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("v "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sy")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("testSynchronized")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    descriptor"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("V")]),s._v("\n    flags"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0x0000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Code")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("\n      stack"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" locals"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" args_size"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" ldc           #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// class com/sona/juc/Sy")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" dup\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" astore_1\n         "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 内置锁进入")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" monitorenter\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" getstatic     #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Field java/lang/System.out:Ljava/io/PrintStream;")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" ldc           #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// String test sy")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" invokevirtual #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Method java/io/PrintStream.println:(Ljava/lang/String;)V")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" aload_1\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 内置锁退出")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" monitorexit\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("15")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("goto")]),s._v("          "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("23")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" astore_2\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("19")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" aload_1\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 内置锁退出")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" monitorexit\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" aload_2\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" athrow\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("23")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Exception")]),s._v(" table"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("\n         from    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("to")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("target")]),s._v(" type\n             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("15")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v("   any\n            "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v("   any\n      "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("LineNumberTable")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("12")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("23")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("StackMapTable")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" number_of_entries "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n        frame_type "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* full_frame */")]),s._v("\n          offset_delta "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v("\n          locals "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" com"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("sona"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("juc"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" java"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("lang"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Object")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n          stack "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" java"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("lang"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Throwable")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n        frame_type "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("250")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* chop */")]),s._v("\n          offset_delta "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("testLock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    descriptor"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("V")]),s._v("\n    flags"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0x0000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Code")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("\n      stack"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" locals"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" args_size"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" getstatic     #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Field lock:Ljava/util/concurrent/locks/Lock;")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" invokeinterface #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// InterfaceMethod java/util/concurrent/locks/Lock.lock:()V")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" getstatic     #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Field java/lang/System.out:Ljava/io/PrintStream;")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" ldc           #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// String test sy")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" invokevirtual #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Method java/io/PrintStream.println:(Ljava/lang/String;)V")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" getstatic     #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Field lock:Ljava/util/concurrent/locks/Lock;")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("19")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" invokeinterface #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// InterfaceMethod java/util/concurrent/locks/Lock.unlock:()V")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("goto")]),s._v("          "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("38")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("27")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" astore_1\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("28")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" getstatic     #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Field lock:Ljava/util/concurrent/locks/Lock;")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("31")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" invokeinterface #"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// InterfaceMethod java/util/concurrent/locks/Lock.unlock:()V")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("36")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" aload_1\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("37")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" athrow\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("38")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Exception")]),s._v(" table"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("\n         from    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("to")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("target")]),s._v(" type\n             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("27")]),s._v("   any\n      "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("LineNumberTable")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("27")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("36")]),s._v("\n        line "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("38")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("StackMapTable")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" number_of_entries "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n        frame_type "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("91")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* same_locals_1_stack_item */")]),s._v("\n          stack "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" java"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("lang"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Throwable")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n        frame_type "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* same */")]),s._v("\n\n")])])]),a("p",[a("code",[s._v("lock")]),s._v("使用"),a("code",[s._v("cas")]),s._v("方式更新"),a("code",[s._v("aqs")]),s._v("内的一个状态"),a("code",[s._v("state")]),s._v("为契约代表锁的获取，释放，详情可以看"),a("RouterLink",{attrs:{to:"/languages/java/thread/java/juc/aqs.html"}},[s._v("aqs")])],1),s._v(" "),a("h3",{attrs:{id:"block"}},[s._v("Block")]),s._v(" "),a("p",[s._v("阻塞是代替"),a("code",[s._v("Thread.suspend、Thread.resume")]),s._v("，使用是"),a("code",[s._v("LockSupport.park、LockSupport.unpark")]),s._v("，详情可以看"),a("RouterLink",{attrs:{to:"/languages/java/thread/java/juc/blocking.html"}},[s._v("LockSupport")])],1),s._v(" "),a("h3",{attrs:{id:"clh锁"}},[s._v("clh锁")]),s._v(" "),a("p",[a("code",[s._v("clh锁")]),s._v("代替内置等待集，并且每个节点不通信，减少通信带来的复杂程度，使用自旋减少上下文切换。详情可以看"),a("RouterLink",{attrs:{to:"/languages/java/thread/java/juc/clh.html"}},[s._v("clh")]),s._v("，自旋代码可以查看"),a("code",[s._v("AbstractQueuedSynchronizer.acquireQueued")]),s._v("。")],1),s._v(" "),a("h3",{attrs:{id:"条件队列"}},[s._v("条件队列")]),s._v(" "),a("p",[s._v("条件队列颗粒度优化"),a("code",[s._v("Object.wait、signal")]),s._v("，详情见"),a("RouterLink",{attrs:{to:"/languages/java/thread/java/juc/condition.html"}},[s._v("condition")])],1),s._v(" "),a("h2",{attrs:{id:"应用"}},[s._v("应用")]),s._v(" "),a("p",[s._v("如果把"),a("code",[s._v("aqs")]),s._v("当作基石，在其基础上构建的应用主要分为两种，一是基于数据的，另外一个是基于任务的")]),s._v(" "),a("ul",[a("li",[s._v("基于数据："),a("code",[s._v("BlockingDeque、BlockingQueue")]),s._v("等")]),s._v(" "),a("li",[s._v("基于任务："),a("code",[s._v("ThreadPoolExecutor、ScheduledThreadPoolExecutor、ForkJoinPool")]),s._v("等")])]),s._v(" "),a("h3",{attrs:{id:"数据类型"}},[s._v("数据类型")]),s._v(" "),a("p",[s._v("关于数据类型应用，可以参考"),a("RouterLink",{attrs:{to:"/languages/java/thread/java/juc/condition.html"}},[s._v("condition")])],1),s._v(" "),a("h3",{attrs:{id:"基于任务"}},[s._v("基于任务")]),s._v(" "),a("p",[s._v("关于数据类型应用，可以参考"),a("RouterLink",{attrs:{to:"/languages/java/thread/java/juc/"}},[s._v("PoolExecutor")])],1),s._v(" "),a("h2",{attrs:{id:"总结"}},[s._v("总结")]),s._v(" "),a("p",[a("code",[s._v("aqs")]),s._v("构建了底层基石，在此基础上构建了数据类型"),a("code",[s._v("Queue")]),s._v("和任务类型应用"),a("code",[s._v("PoolExecutor")]),s._v("，如果把"),a("code",[s._v("aqs")]),s._v("当作服务端，那么"),a("code",[s._v("Queue")]),s._v("和"),a("code",[s._v("PoolExecutor")]),s._v("相对而言属于客户端。")])])}),[],!1,null,null,null);t.default=e.exports}}]);