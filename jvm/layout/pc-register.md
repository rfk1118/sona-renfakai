# Pc Register

::: tip 官方文档
The Java Virtual Machine can support many threads of execution at once (JLS §17). Each Java Virtual Machine thread has its own pc (program counter) register. At any point, each Java Virtual Machine thread is executing the code of a single method, namely the current method (§2.6) for that thread. If that method is not native, the pc register contains the address of the Java Virtual Machine instruction currently being executed. If the method currently being executed by the thread is native, the value of the Java Virtual Machine's pc register is undefined. The Java Virtual Machine's pc register is wide enough to hold a returnAddress or a native pointer on the specific platform.
:::

Java虚拟机可以同时支持许多执行线程（JLS §17）。每个Java虚拟机线程都有自己的pc（程序计数器）寄存器。在任何时候，每个Java虚拟机线程都在执行单个方法的代码，即该线程的当前方法（§2.6）。如果该方法不是本机，pc寄存器包含当前正在执行的Java虚拟机指令的地址。如果线程当前执行的方法是本机，则Java虚拟机的pc寄存器的值未定义。Java虚拟机的pc寄存器足够宽，可以在特定平台上保存`returnAddress`或本机指针。

:::tip 官方文档
The returnAddress type is used by the Java Virtual Machine's jsr, ret, and jsr_w instructions (§jsr, §ret, §jsr_w). The values of the returnAddress type are pointers to the opcodes of Java Virtual Machine instructions. Unlike the numeric primitive
types, the returnAddress type does not correspond to any Java programming language type and cannot be modified by the running program.
:::

`returnAddress`为虚拟机操作码指针，并且不可被修改。

## CS IP

CPU想要进行数据读写，需要与三条总线进行交互：

1. 地址总线，根据地址总线指定存储单元、可以查找内存大小
2. 数据总线，数据的传输量大小
3. 控制总线，控制外部组件

根据程序执行不同对内存区域也有划分，例如读区域、写区域。

1. 数据区域可读可写，
2. 程序编译后仅可以读

经历高级语言发展，现在也不这么绝对了，例如Java支持字节码替换。对于控制总线中的寄存器最具有代表的就是`CS、IP`两个寄存器，其中`CS`为代码段寄存器，`IP`为指令指针寄存器。

假设`CS`内容为`某个 class`文件，`IP`内容为`第 n 行`，`CS + IP`代表调用某个类某个方法，由于`Java`中没有使用寄存器模型，而是栈模型（设计通用性)，上面假设仅仅为暗喻，`Jvm`设计代表就是`Pc Register`。

## 代码

编写常用代码`helloworld`，来查看`pc寄存器`

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("helloWorld");
    }
}
```

进行编译和反编译，执行命令如下：

```sh
// 编译class
 javac Main.java
// 反编译class
 javap -v Main 
```

对于整个`class`文件可以看做是`CS`，对于`main`方法中的`0、3、5、8`可以看作行号指示器，也就是`IP`，只不过虚拟机用`pc寄存器`进行统一处理。

```java
  // todo 其他省略
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=1, args_size=1
         // pc寄存器会记录运行到哪里
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String helloWorld
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 5: 0
        line 6: 8
```

## 源码

在`hotspot`源码中查找`frame.hpp`，具体情况如下：

```java
class frame {
 private:
  intptr_t* _sp; // stack pointer (from Thread::last_Java_sp)
  // pc寄存器，也就是程序计数器
  address   _pc; // program counter (the next instruction after the call)
  // todo 其他省略
  // pc：返回此帧将正常继续的pc。
  // 它必须指向下一条要执行的指令的开头
  address pc() const             { return _pc; }

  // debug使用，也就是未优化前跳转指针
  address raw_pc() const;

  // 设置新的处理opcode地址
  void set_pc( address   newpc );

  // patching operations
  void   patch_pc(Thread* thread, address pc);
   // todo 其他省略
}
```

## 总结

* `Pc Register`是`Java`指示当前线程运行到哪行`opcode`的指示器，与汇编，Go语言中的`CS、IP`等效。
* `Pc Register`是线程独有的，`Pc Register`不存在oom，其只占线程空间中最小内存
