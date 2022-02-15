# Run-Time-Data-Areas

::: tip 官方文档
The Java Virtual Machine defines various run-time data areas that are used during execution of a program. Some of these data areas are created on Java Virtual Machine start-up and are destroyed only when the Java Virtual Machine exits. Other data areas are per thread. Per-thread data areas are created when a thread is created and destroyed when the thread exits.
:::

Java虚拟机定义了在执行程序期间使用的各种运行时数据区域。其中一些数据区域是在Java虚拟机启动时创建的，只有在Java虚拟机退出时才会销毁。其他数据区域是每个线程。每线程数据区域在创建线程时创建，并在线程退出时销毁。

## 线程私有

* [The pc Register](./pc-register.md)
* [Java Virtual Machine Stack](./stacks.md##Java-Virtual-Machine-Stacks)
* [Native Method Stacks](./stacks.md##Native-Method-Stacks)

## 共享

* [Heap](./share-data##heap)
* [Method Area](./share-data##Method-Area)
* [Run-Time Constant Pool](./share-data##Run-Time-Constant-Pool)

## 总结

私有属性一般都是与线程绑定的，如果多个线程都需要使用的数据，就需要放到共享区域。

## 参考材料

* [The Java® VirtualMachine Specification](https://docs.oracle.com/javase/specs/jvms/se17/jvms17.pdf)
