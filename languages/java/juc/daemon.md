# daemon线程

Java中的线程主要分为两种，用户线程，daemon线程。

```java
     /**
     * 标记当前线程是daemon线程还是用户线程
     * Marks this thread as either a {@linkplain #isDaemon daemon} thread
     * 虚拟机会在所有的线程都是daemon线程的时候退出
     * or a user thread. The Java Virtual Machine exits when the only
     * threads running are all daemon threads.
     *  这个方法必须在线程启动前进行设置
     * <p> This method must be invoked before the thread is started.
     *
     * 如果设置成true,代表其为daemon线程
     * @param  on
     *         if {@code true}, marks this thread as a daemon thread
     *
     * @throws  IllegalThreadStateException
     *          if this thread is {@linkplain #isAlive alive}
     *
     * @throws  SecurityException
     *          if {@link #checkAccess} determines that the current
     *          thread cannot modify this thread
     */
    public final void setDaemon(boolean on) {
        checkAccess();
        if (isAlive()) {
            throw new IllegalThreadStateException();
        }
        daemon = on;
    }
```

## 用户线程测试

1. 编写测试代码

```java
public class UserThread {

    public static void main(String[] args) {
        Thread userThread = new Thread(() -> {
            while (true) {
                System.out.println("UserThread");
            }
        });
        userThread.setName("UserThread");
        userThread.start();
    }
}
```

2. 在启动后，发现在控制台一直打印`UserThread`,并且程序没有退出，查看线程状况

```java
➜  juc  jps -l | grep 'UserThread'

// 从这里可以找到UserThread的虚拟机
49501 com.sona.juc.daemon.UserThread

// 查看线程情况
➜  juc jstack 48718

// 这里这个就是我们的用户线程
"UserThread" #11 prio=5 os_prio=31 tid=0x00007f988788d800 nid=0x600b runnable [0x00000003074d2000]
   java.lang.Thread.State: RUNNABLE
        at java.io.FileOutputStream.writeBytes(Native Method)
        at java.io.FileOutputStream.write(FileOutputStream.java:326)
        at java.io.BufferedOutputStream.flushBuffer(BufferedOutputStream.java:82)
        at java.io.BufferedOutputStream.flush(BufferedOutputStream.java:140)
        - locked <0x00000006c0050f90> (a java.io.BufferedOutputStream)
        at java.io.PrintStream.write(PrintStream.java:482)
        - locked <0x00000006c00088e0> (a java.io.PrintStream)
        at sun.nio.cs.StreamEncoder.writeBytes(StreamEncoder.java:221)
        at sun.nio.cs.StreamEncoder.implFlushBuffer(StreamEncoder.java:291)
        at sun.nio.cs.StreamEncoder.flushBuffer(StreamEncoder.java:104)
        - locked <0x00000006c00088a0> (a java.io.OutputStreamWriter)
        at java.io.OutputStreamWriter.flushBuffer(OutputStreamWriter.java:185)
        at java.io.PrintStream.write(PrintStream.java:527)
        - eliminated <0x00000006c00088e0> (a java.io.PrintStream)
        at java.io.PrintStream.print(PrintStream.java:669)
        at java.io.PrintStream.println(PrintStream.java:806)
        - locked <0x00000006c00088e0> (a java.io.PrintStream)
        at com.sona.juc.daemon.UserThread.lambda$main$0(UserThread.java:8)
        at com.sona.juc.daemon.UserThread$$Lambda$1/1828972342.run(Unknown Source)
        at java.lang.Thread.run(Thread.java:748)
```

## daemon测试

1. 编写测试代码

```java
public class DaemonThread {

    public static void main(String[] args) throws Exception {
        Thread daemonThread = new Thread(() -> {
            while (true) {
                System.out.println("DaemonThread");
            }
        });
        daemonThread.setDaemon(true);
        daemonThread.setName("DaemonThread");
        daemonThread.start();
        // 防止线程退出无法jstack
        TimeUnit.SECONDS.sleep(100);
    }
}
```

2. 在启动后，发现控制台打印一会`DaemonThread`，程序退出，在退出前查看线程状况

```java
➜  juc jps -lm | grep 'DaemonThread'
50329 com.sona.juc.daemon.DaemonThread
➜  juc jstack 50329

// 其他忽略
// 从这里可以看出线程被设置成了daemon
"DaemonThread" #11 daemon prio=5 os_prio=31 tid=0x00007f7f621b1000 nid=0xa22b runnable [0x000000030a8fe000]
   java.lang.Thread.State: RUNNABLE
        at java.io.FileOutputStream.writeBytes(Native Method)
        at java.io.FileOutputStream.write(FileOutputStream.java:326)
        at java.io.BufferedOutputStream.flushBuffer(BufferedOutputStream.java:82)
        at java.io.BufferedOutputStream.flush(BufferedOutputStream.java:140)
        - locked <0x00000006c004a0f0> (a java.io.BufferedOutputStream)
        at java.io.PrintStream.write(PrintStream.java:482)
        - locked <0x00000006c000a8a0> (a java.io.PrintStream)
        at sun.nio.cs.StreamEncoder.writeBytes(StreamEncoder.java:221)
        at sun.nio.cs.StreamEncoder.implFlushBuffer(StreamEncoder.java:291)
        at sun.nio.cs.StreamEncoder.flushBuffer(StreamEncoder.java:104)
        - locked <0x00000006c000a860> (a java.io.OutputStreamWriter)
        at java.io.OutputStreamWriter.flushBuffer(OutputStreamWriter.java:185)
        at java.io.PrintStream.write(PrintStream.java:527)
        - eliminated <0x00000006c000a8a0> (a java.io.PrintStream)
        at java.io.PrintStream.print(PrintStream.java:669)
        at java.io.PrintStream.println(PrintStream.java:806)
        - locked <0x00000006c000a8a0> (a java.io.PrintStream)
        at com.sona.juc.daemon.DaemonThread.lambda$main$0(DaemonThread.java:10)
        at com.sona.juc.daemon.DaemonThread$$Lambda$1/1828972342.run(Unknown Source)
        at java.lang.Thread.run(Thread.java:748)
```

## daemon错误使用

1. 在线程启动后，重新设置线程类型

```java
public class DaemonThreadError {

    public static void main(String[] args) throws Exception {
        Thread daemonThread = new Thread(() -> {
            while (true) {
                System.out.println("DaemonThread");
                try {
                    TimeUnit.SECONDS.sleep(1);
                }catch (Exception e){

                }
            }
        });

        daemonThread.setName("DaemonThreadError");
        daemonThread.start();
        System.out.println(daemonThread.isAlive());
        daemonThread.setDaemon(true);
        TimeUnit.SECONDS.sleep(100);
    }
}
```

2. 如果线程存活，会进行阻断，所以类型也不会设置上去

```java
public final void setDaemon(boolean on) {
      checkAccess();
      if (isAlive()) {
          throw new IllegalThreadStateException();
      }
      daemon = on;
}

Exception in thread "main" java.lang.IllegalThreadStateException
  at java.lang.Thread.setDaemon(Thread.java:1359)
  at com.sona.juc.daemon.DaemonThreadError.main(DaemonThreadError.java:22)
```

3. 查看类型，依然是用户线程

```java
"DaemonThreadError" #11 prio=5 os_prio=31 tid=0x00007fddf4a08800 nid=0x6027 runnable [0x0000000306faa000]
   java.lang.Thread.State: RUNNABLE
        at java.io.FileOutputStream.writeBytes(Native Method)
        at java.io.FileOutputStream.write(FileOutputStream.java:326)
        at java.io.BufferedOutputStream.flushBuffer(BufferedOutputStream.java:82)
        at java.io.BufferedOutputStream.flush(BufferedOutputStream.java:140)
        - locked <0x00000006c002f9d0> (a java.io.BufferedOutputStream)
        at java.io.PrintStream.write(PrintStream.java:482)
        - locked <0x00000006c00068e8> (a java.io.PrintStream)
        at sun.nio.cs.StreamEncoder.writeBytes(StreamEncoder.java:221)
        at sun.nio.cs.StreamEncoder.implFlushBuffer(StreamEncoder.java:291)
        at sun.nio.cs.StreamEncoder.flushBuffer(StreamEncoder.java:104)
        - locked <0x00000006c00068a8> (a java.io.OutputStreamWriter)
        at java.io.OutputStreamWriter.flushBuffer(OutputStreamWriter.java:185)
        at java.io.PrintStream.newLine(PrintStream.java:546)
        - eliminated <0x00000006c00068e8> (a java.io.PrintStream)
        at java.io.PrintStream.println(PrintStream.java:807)
        - locked <0x00000006c00068e8> (a java.io.PrintStream)
        at com.sona.juc.daemon.DaemonThreadError.lambda$main$0(DaemonThreadError.java:10)
        at com.sona.juc.daemon.DaemonThreadError$$Lambda$1/1828972342.run(Unknown Source)
        at java.lang.Thread.run(Thread.java:748)
```

### 总结

java线程分为用户线程和daemon线程，jvm常见的daemon线程有`attach,CompilerThread,Monitor Ctrl-Break,Signal Dispatcher,Finalizer,Reference Handler`等等。

```java
Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.281-b09 mixed mode):

// 该进程主要负责远程attach，包括远程debug
"Attach Listener" #13 daemon prio=9 os_prio=31 tid=0x00007f9d52810800 nid=0x6803 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"DestroyJavaVM" #12 prio=5 os_prio=31 tid=0x00007f9d7280b800 nid=0x1b03 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE


"Service Thread" #10 daemon prio=9 os_prio=31 tid=0x00007f98850a2000 nid=0xa40f runnable [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

// 编译器线程 c1
// c1编译器
"C1 CompilerThread3" #9 daemon prio=9 os_prio=31 tid=0x00007f9845018800 nid=0xa603 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

// c2编译器
"C2 CompilerThread2" #8 daemon prio=9 os_prio=31 tid=0x00007f9886826800 nid=0x5703 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread1" #7 daemon prio=9 os_prio=31 tid=0x00007f9886825800 nid=0xa803 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread0" #6 daemon prio=9 os_prio=31 tid=0x00007f9886825000 nid=0xa903 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

// 中断监听器
"Monitor Ctrl-Break" #5 daemon prio=5 os_prio=31 tid=0x00007f9886822800 nid=0x4047 runnable [0x0000000306dbd000]
   java.lang.Thread.State: RUNNABLE
        at java.net.SocketInputStream.socketRead0(Native Method)
        at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
        at java.net.SocketInputStream.read(SocketInputStream.java:171)
        at java.net.SocketInputStream.read(SocketInputStream.java:141)
        at sun.nio.cs.StreamDecoder.readBytes(StreamDecoder.java:284)
        at sun.nio.cs.StreamDecoder.implRead(StreamDecoder.java:326)
        at sun.nio.cs.StreamDecoder.read(StreamDecoder.java:178)
        - locked <0x00000006c000af28> (a java.io.InputStreamReader)
        at java.io.InputStreamReader.read(InputStreamReader.java:184)
        at java.io.BufferedReader.fill(BufferedReader.java:161)
        at java.io.BufferedReader.readLine(BufferedReader.java:324)
        - locked <0x00000006c000af28> (a java.io.InputStreamReader)
        at java.io.BufferedReader.readLine(BufferedReader.java:389)
        at com.intellij.rt.execution.application.AppMainV2$1.run(AppMainV2.java:49)

"Signal Dispatcher" #4 daemon prio=9 os_prio=31 tid=0x00007f9886058800 nid=0x3f03 runnable [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Finalizer" #3 daemon prio=8 os_prio=31 tid=0x00007f9887008800 nid=0x4a1f in Object.wait() [0x0000000306aa9000]
   java.lang.Thread.State: WAITING (on object monitor)
        at java.lang.Object.wait(Native Method)
        - waiting on <0x00000006c0008b90> (a java.lang.ref.ReferenceQueue$Lock)
        at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:144)
        - locked <0x00000006c0008b90> (a java.lang.ref.ReferenceQueue$Lock)
        at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:165)
        at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:216)

"Reference Handler" #2 daemon prio=10 os_prio=31 tid=0x00007f988500e000 nid=0x4c23 in Object.wait() [0x00000003069a6000]
   java.lang.Thread.State: WAITING (on object monitor)
        at java.lang.Object.wait(Native Method)
        - waiting on <0x00000006c0008c38> (a java.lang.ref.Reference$Lock)
        at java.lang.Object.wait(Object.java:502)
        at java.lang.ref.Reference.tryHandlePending(Reference.java:191)
        - locked <0x00000006c0008c38> (a java.lang.ref.Reference$Lock)
        at java.lang.ref.Reference$ReferenceHandler.run(Reference.java:153)

"VM Thread" os_prio=31 tid=0x00007f9886053000 nid=0x3703 runnable

"GC task thread#0 (ParallelGC)" os_prio=31 tid=0x00007f9886012000 nid=0x534f runnable

"GC task thread#1 (ParallelGC)" os_prio=31 tid=0x00007f9886012800 nid=0x2e03 runnable

"GC task thread#2 (ParallelGC)" os_prio=31 tid=0x00007f9886013000 nid=0x3003 runnable

"GC task thread#3 (ParallelGC)" os_prio=31 tid=0x00007f9886013800 nid=0x5203 runnable

"GC task thread#4 (ParallelGC)" os_prio=31 tid=0x00007f9886014800 nid=0x3303 runnable

"GC task thread#5 (ParallelGC)" os_prio=31 tid=0x00007f9886015000 nid=0x5003 runnable

"GC task thread#6 (ParallelGC)" os_prio=31 tid=0x00007f9886015800 nid=0x3403 runnable

"GC task thread#7 (ParallelGC)" os_prio=31 tid=0x00007f9886016000 nid=0x3503 runnable

"VM Periodic Task Thread" os_prio=31 tid=0x00007f9886823800 nid=0xa213 waiting on condition

JNI global references: 214
```
