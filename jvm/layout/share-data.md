# 共享数据

## Heap

::: tip 官方文档

The Java Virtual Machine has a heap that is shared among all Java Virtual Machine threads. The heap is the run-time data area from which memory for all class instances and arrays is allocated.

The heap is created on virtual machine start-up. Heap storage for objects is reclaimed by an automatic storage management system (known as a garbage collector); objects are never explicitly deallocated. The Java Virtual Machine assumes no particular type of automatic storage management system, and the storage management technique may be chosen according to the implementor's system requirements. The heap may be of a fixed size or may be expanded as required by the computation and may be contracted if a larger heap becomes unnecessary. The memory for the heap does not need to be contiguous.

A Java Virtual Machine implementation may provide the programmer or the user control over the initial size of the heap, as well as, if the heap can be dynamically expanded or contracted, control over the maximum and minimum heap size.

The following exceptional condition is associated with the heap:
• If a computation requires more heap than can be made available by the automatic storage management system, the Java Virtual Machine throws an OutOfMemoryError.

:::

Java虚拟机有一个堆，在所有Java虚拟机线程之间共享。堆是运行时数据区域，从中分配所有类实例和数组的内存。

堆是在[虚拟机启动时](../jvm-select.md)创建的。对象的堆存储由自动存储管理系统（称为垃圾收集器）回收；对象从未显式分配。Java虚拟机不承担特定类型的自动存储管理系统，可以根据实现者的系统要求选择存储管理技术。堆可以是固定的大小，也可以根据计算要求进行扩展，如果不需要更大的堆，则可以收缩。堆的内存不需要是连续的。

Java虚拟机实现可以为程序员或用户提供对堆初始大小的控制，如果堆可以动态扩展或收缩，则控制最大和最小堆大小。

以下特殊情况与堆有关：
如果计算需要的堆积超过自动存储管理系统所能提供的堆，Java虚拟机将抛出内存错误。

::: tip 调优
一般情况下为了防止堆扩展和收缩对服务器性能产生影响，会让`-Xms = -Xmx`
:::

## Method-Area

::: tip 官方文档

The Java Virtual Machine has a method area that is shared among all Java Virtual Machine threads. The method area is analogous to the storage area for compiled code of a conventional language or analogous to the "text" segment in an operating system process. It stores per-class structures such as the run-time constant pool, field and method data, and the code for methods and constructors, including the special methods used in class and interface initialization and in instance initialization (§2.9).

The method area is created on virtual machine start-up. Although the method area is logically part of the heap, simple implementations may choose not to either garbage collect or compact it. This specification does not mandate the location of the method area or the policies used to manage compiled code. The method area may be of a fixed size or may be expanded as required by the computation and may be contracted if a larger method area becomes unnecessary. The memory for the method area does not need to be contiguous.

A Java Virtual Machine implementation may provide the programmer or the user control over the initial size of the method area, as well as, in the case of a varying-size method area, control over the maximum and minimum method area size.

The following exceptional condition is associated with the method area:
• If memory in the method area cannot be made available to satisfy an allocation
request, the Java Virtual Machine throws an OutOfMemoryError.

:::

Java虚拟机有一个方法区域，在所有Java虚拟机线程之间共享。方法区域类似于传统语言编译代码的存储区域，或类似于操作系统进程中的“文本”段。它存储每类结构，如运行时常量池、字段和方法数据，以及方法和构造函数的代码，包括类和接口初始化以及实例初始化中使用的特殊方法（§2.9）。

方法区域是在虚拟机启动时创建的。虽然方法区域在逻辑上是堆的一部分，但简单的实现可以选择不垃圾收集或压缩它。本规范不规定方法区域的位置或用于管理编译代码的策略。方法区域可以是固定的大小，也可以根据计算要求进行扩展，如果不需要更大的方法区域，则可以收缩。方法区域的内存不需要连续。

Java虚拟机实现可以为程序员或用户提供对方法区域初始大小的控制，并在不同大小的方法区域的情况下，对最大和最小方法区域大小的控制。

以下特殊情况与方法区域相关：

* 如果方法区域中的内存无法用于满足分配请求，Java虚拟机抛出内存错误。

## Run-Time-Constant-Pool

::: tip 官方文档

A run-time constant pool is a per-class or per-interface run-time representation of the constant_pool table in a class file (§4.4). It contains several kinds of constants, ranging from numeric literals known at compile-time to method and field references that must be resolved at run-time. The run-time constant pool serves a function similar to that of a symbol table for a conventional programming language, although it contains a wider range of data than a typical symbol table.

Each run-time constant pool is allocated from the Java Virtual Machine's method area (§2.5.4). The run-time constant pool for a class or interface is constructed when the class or interface is created (§5.3) by the Java Virtual Machine.

The following exceptional condition is associated with the construction of the run- time constant pool for a class or interface:

• When creating a class or interface, if the construction of the run-time constant pool requires more memory than can be made available in the method area of the Java Virtual Machine, the Java Virtual Machine throws an OutOfMemoryError.
See §5 (Loading, Linking, and Initializing) for information about the construction of the run-time constant pool.

:::

运行时常量池是类文件中常量池表的每类或每接口运行时表示（§4.4）。它包含几种常量，从编译时已知的数字文本到必须在运行时解析的方法和字段引用。运行时常量池的服务函数类似于传统编程语言的符号表，尽管它包含的数据范围比典型的符号表更广。

每个运行时常量池都从Java虚拟机的方法区域（§2.5.4）分配。当Java虚拟机创建类或接口（§5.3）时，构建类或接口的运行时常量池。

以下特殊条件与构建类或接口的运行时常量池相关联：

* 在创建类或接口时，如果运行时常量池的构建需要的内存超过Java虚拟机的方法区域，Java虚拟机将抛出内存错误。

有关构建运行时常量池的信息，请参阅§5（加载、链接和初始化）。

```java
Constant pool:
   #1 = Methodref          #8.#17         // java/lang/Object."<init>":()V
   #2 = Long               30l
   #4 = Fieldref           #18.#19        // java/lang/System.out:Ljava/io/PrintStream;
   #5 = Methodref          #20.#21        // java/io/PrintStream.println:(I)V
   #6 = Methodref          #20.#22        // java/io/PrintStream.println:(J)V
   #7 = Class              #23            // Main
   #8 = Class              #24            // java/lang/Object
   #9 = Utf8               <init>
  #10 = Utf8               ()V
  #11 = Utf8               Code
  #12 = Utf8               LineNumberTable
  #13 = Utf8               main
  #14 = Utf8               ([Ljava/lang/String;)V
  #15 = Utf8               SourceFile
  #16 = Utf8               Main.java
  #17 = NameAndType        #9:#10         // "<init>":()V
  #18 = Class              #25            // java/lang/System
  #19 = NameAndType        #26:#27        // out:Ljava/io/PrintStream;
  #20 = Class              #28            // java/io/PrintStream
  #21 = NameAndType        #29:#30        // println:(I)V
  #22 = NameAndType        #29:#31        // println:(J)V
  #23 = Utf8               Main
  #24 = Utf8               java/lang/Object
  #25 = Utf8               java/lang/System
  #26 = Utf8               out
  #27 = Utf8               Ljava/io/PrintStream;
  #28 = Utf8               java/io/PrintStream
  #29 = Utf8               println
  #30 = Utf8               (I)V
  #31 = Utf8               (J)V
```

## 总结

堆的创建和垃圾回收主要为数据共享区域。
