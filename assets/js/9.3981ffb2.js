(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{430:function(t,s,a){t.exports=a.p+"assets/img/atomicInteger.ae275594.png"},431:function(t,s,a){t.exports=a.p+"assets/img/atom.b5ad72ba.jpg"},432:function(t,s,a){t.exports=a.p+"assets/img/atom-w1.b62347c3.png"},433:function(t,s,a){t.exports=a.p+"assets/img/atom-w2.37c9012d.png"},434:function(t,s,a){t.exports=a.p+"assets/img/atom-w3.50573e92.png"},435:function(t,s,a){t.exports=a.p+"assets/img/atom-w4.ffed63bc.png"},436:function(t,s,a){t.exports=a.p+"assets/img/atom-getAndSetInt.83036dad.png"},560:function(t,s,a){"use strict";a.r(s);var n=a(13),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"cas"}},[t._v("cas")]),t._v(" "),n("p",[t._v("本文章主要使用"),n("code",[t._v("java.util.concurrent.atomic")]),t._v("下的"),n("code",[t._v("AtomicInteger")]),t._v("来探索"),n("code",[t._v("cas")]),t._v("，由于包下大部分代码都符合ocp原则，所以使用"),n("code",[t._v("AtomicInteger")]),t._v("进行讲解。")]),t._v(" "),n("table",[n("thead",[n("tr",[n("th",[t._v("分组")]),t._v(" "),n("th",{staticStyle:{"text-align":"right"}},[t._v("类")])])]),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("基础数据型")]),t._v(" "),n("td",{staticStyle:{"text-align":"right"}},[t._v("AtomicInteger AtomicBoolean AtomicLong")])]),t._v(" "),n("tr",[n("td",[t._v("数组型")]),t._v(" "),n("td",{staticStyle:{"text-align":"right"}},[t._v("AtomicIntegerArray  AtomicLongArray  AtomicReferenceArray")])]),t._v(" "),n("tr",[n("td",[t._v("字段更新器")]),t._v(" "),n("td",{staticStyle:{"text-align":"right"}},[t._v("AtomicIntegerFieldUpdater AtomicLongFieldUpdater AtomicReferenceFieldUpdater")])]),t._v(" "),n("tr",[n("td",[t._v("引用型")]),t._v(" "),n("td",{staticStyle:{"text-align":"right"}},[t._v("AtomicReference AtomicMarkableReference AtomicStampedReference")])])])]),t._v(" "),n("h2",{attrs:{id:"对象布局"}},[t._v("对象布局")]),t._v(" "),n("ol",[n("li",[t._v("查看一下"),n("code",[t._v("AtomicInteger")]),t._v("代码，这个时候我们会产生疑惑，"),n("code",[t._v("unsafe,valueOffset")]),t._v("这都是什么东西？")])]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Number")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("implements")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("java"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("io"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")])]),t._v("Serializable")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 序列化，这个没什么好讲的")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" serialVersionUID "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("6214790243416807050L")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这个是干什么的呢？不知道")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// setup to use Unsafe.compareAndSwapInt for updates")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Unsafe")]),t._v(" unsafe "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Unsafe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUnsafe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这又是什么呢？")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" valueOffset"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            valueOffset "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" unsafe"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("objectFieldOffset\n                "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getDeclaredField")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"value"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Exception")]),t._v(" ex"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ex"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("volatile")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" value"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 方法暂时忽略")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[t._v("使用一段代码来解释"),n("code",[t._v("unsafe,valueOffset")]),t._v("到底是什么？先引入"),n("code",[t._v("pom")]),t._v("文件。")])]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("dependency"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("groupId"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("org"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("openjdk"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jol"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("groupId"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("artifactId"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("jol"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("core"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("artifactId"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("version"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.9")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("version"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("dependency"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[t._v("编写代码查看"),n("code",[t._v("AtomicInteger")]),t._v("对象的布局。")])]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicIntegerTest")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),t._v(" atomicInteger "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ClassLayout")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInstance")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("atomicInteger"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("toPrintable")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ol",{attrs:{start:"4"}},[n("li",[t._v("输出数据，从数据中可以看到AtomicInteger.value在对象布局的OFFSET=12处，现在是使用"),n("code",[t._v("jol-core")]),t._v("进行打印的，如果我们想在代码中使用要怎么使用呢？")])]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token class-name"}},[n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("java"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("util"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("concurrent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("atomic"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")])]),t._v("AtomicInteger")]),t._v(" object internals"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n OFFSET  SIZE   TYPE DESCRIPTION                               VALUE\n      "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("object header"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                           "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("01")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000001")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000000")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000000")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000000")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("object header"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                           "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000000")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000000")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000000")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000000")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v("     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("object header"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                           bc "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3d")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00")]),t._v(" f8 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10111100")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00111101")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("00000000")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("11111000")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("134201924")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),t._v("     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value                       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Instance")]),t._v(" size"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),t._v(" bytes\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Space")]),t._v(" losses"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" bytes internal "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" bytes external "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" bytes total\n")])])]),n("ol",{attrs:{start:"5"}},[n("li",[t._v("debug下上面的代码，从图中可以看到"),n("code",[t._v("valueOffset=12")]),t._v("，由于对象内存布局是一样的，所以这个值在初始化的时候已经被设置到"),n("code",[t._v("valueOffset")]),t._v("上面了。\n"),n("img",{attrs:{src:a(430),alt:"An image"}})])]),t._v(" "),n("h2",{attrs:{id:"数据结构布局"}},[t._v("数据结构布局")]),t._v(" "),n("ol",[n("li",[n("a",{attrs:{href:"https://book.douban.com/subject/26912767/",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入理解计算机系统（原书第 3 版）3.9 异质的数据结构"),n("OutboundLink")],1)])]),t._v(" "),n("p",[n("img",{attrs:{src:a(431),alt:"An image"}})]),t._v(" "),n("ol",{attrs:{start:"2"}},[n("li",[n("a",{attrs:{href:"https://book.douban.com/subject/25726019/",target:"_blank",rel:"noopener noreferrer"}},[t._v("汇编语言（第3版）8.6 寻址方式的综合应用"),n("OutboundLink")],1),t._v(" "),n("img",{attrs:{src:a(432),alt:"An image"}}),t._v(" "),n("img",{attrs:{src:a(433),alt:"An image"}}),t._v(" "),n("img",{attrs:{src:a(434),alt:"An image"}}),t._v(" "),n("img",{attrs:{src:a(435),alt:"An image"}})])]),t._v(" "),n("h2",{attrs:{id:"常用方法"}},[t._v("常用方法")]),t._v(" "),n("p",[t._v("对于"),n("code",[t._v("unsafe,valueOffset")]),t._v("的困惑已经解开，看一下常用的方法")]),t._v(" "),n("h3",{attrs:{id:"unsafe-getandsetint"}},[t._v("unsafe.getAndSetInt")]),t._v(" "),n("ol",[n("li",[t._v("进行debug这段代码，这里主要涉及到两个方法的调用"),n("code",[t._v("getIntVolatile")]),t._v("和"),n("code",[t._v("compareAndSwapInt")])])]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[t._v("     "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAndSetInt")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),t._v(" var1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" var2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" var4"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" var5"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("do")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            var5 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getIntVolatile")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("var1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" var2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("compareAndSwapInt")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("var1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" var2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" var5"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" var4"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" var5"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[t._v("查看调用的参数，可以看到这里拿到了对象，也就是"),n("code",[t._v("基地址")]),t._v("，var2就是偏移地址")])]),t._v(" "),n("p",[n("img",{attrs:{src:a(436),alt:"An image"}})]),t._v(" "),n("ol",{attrs:{start:"3"}},[n("li",[n("p",[n("code",[t._v("getIntVolatile")]),t._v("方法的形容如下，大概的讲解和上面数据结构布局一致，这里支持volatile语意，也就是可见性的解释，一个volatile变量的读，总是能看到（任意线程）对这个volatile变量最后的写入。")])]),t._v(" "),n("li",[n("p",[t._v("代码注释讲解和上面"),n("RouterLink",{attrs:{to:"/languages/java/juc/atomic.html#数据结构布局"}},[t._v("数据结构布局")]),t._v("基本一致，只是对于数组使用"),n("code",[t._v("基地址+类型*n")]),t._v("也就是"),n("code",[t._v("B+N*S")]),t._v("，可以参考"),n("a",{attrs:{href:"https://book.douban.com/subject/26912767/",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入理解计算机系统（原书第 3 版）3.8数组分配和访问"),n("OutboundLink")],1)],1)])]),t._v(" "),n("h3",{attrs:{id:"unsafe-compareandswapint"}},[t._v("unsafe.compareAndSwapInt")]),t._v(" "),n("ol",[n("li",[t._v("这个方法调用的是native方法，对于方法的形容是支持原子操作，也就是"),n("code",[t._v("cmpxchg")]),t._v("指令")])]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[t._v("    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("native")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("compareAndSwapInt")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),t._v(" o"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" offset"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" expected"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("h2",{attrs:{id:"总结"}},[t._v("总结")]),t._v(" "),n("p",[t._v("暂时只讲到了cas相关，其底层是直接操作内存地址，并且使用"),n("code",[t._v("cmpxchg")]),t._v("指令，关于其他unsafe相关功能，等到用到时在进行解释。")]),t._v(" "),n("h2",{attrs:{id:"参考"}},[t._v("参考")]),t._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"http://hg.openjdk.java.net/jdk7/jdk7/jdk/file/9b8c96f96a0f/src/share/classes/sun/misc/Unsafe.java",target:"_blank",rel:"noopener noreferrer"}},[t._v("Unsafe"),n("OutboundLink")],1)]),t._v(" "),n("li",[n("a",{attrs:{href:"https://book.douban.com/subject/26912767/",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入理解计算机系统（原书第 3 版）"),n("OutboundLink")],1)]),t._v(" "),n("li",[n("a",{attrs:{href:"https://book.douban.com/subject/25726019/",target:"_blank",rel:"noopener noreferrer"}},[t._v("汇编语言（第3版）"),n("OutboundLink")],1)]),t._v(" "),n("li",[n("a",{attrs:{href:"https://book.douban.com/subject/27034721/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Java多线程编程实战指南（核心篇）"),n("OutboundLink")],1)]),t._v(" "),n("li",[n("a",{attrs:{href:"https://book.douban.com/subject/26591326/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Java并发编程的艺术"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=e.exports}}]);