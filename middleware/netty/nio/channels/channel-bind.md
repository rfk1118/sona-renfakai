# Channel-bind

### 端口绑定

1. 如果这个时候`Channel`已经注册完毕了，则直接`doBind0`。

```java
if (regFuture.isDone()) {
    ChannelPromise promise = channel.newPromise();
    doBind0(regFuture, channel, localAddress, promise);
    return promise;
}
```

2. 如果注册主流程还没有完成，则增加观察者到注册事件中。

```java
final PendingRegistrationPromise promise = new PendingRegistrationPromise(channel);
regFuture.addListener(new ChannelFutureListener() {
    @Override
    public void operationComplete(ChannelFuture future) throws Exception {
        Throwable cause = future.cause();
        if (cause != null) {
            promise.setFailure(cause);
        } else {
            //
            promise.registered();
            doBind0(regFuture, channel, localAddress, promise);
        }
    }
});
```

3. 通知观察者是那里呢？在注册流程的`safeSetSuccess(promise);`中。

```java
public boolean trySuccess(V result) {
    if (setSuccess0(result)) {
        // 设置成功时候会回调listener
        notifyListeners();
        return true;
    }
    return false;
}

// 保证只唤醒自己loop的观察者
private void notifyListeners() {
    EventExecutor executor = executor();
    if (executor.inEventLoop()) {
        final InternalThreadLocalMap threadLocals = InternalThreadLocalMap.get();
        final int stackDepth = threadLocals.futureListenerStackDepth();
        if (stackDepth < MAX_LISTENER_STACK_DEPTH) {
            threadLocals.setFutureListenerStackDepth(stackDepth + 1);
            try {
                // 通知所有的观察者
                notifyListenersNow();
            } finally {
                threadLocals.setFutureListenerStackDepth(stackDepth);
            }
            return;
        }
    }
    safeExecute(executor, new Runnable() {
        @Override
        public void run() {
            notifyListenersNow();
        }
    });
}

 private void notifyListenersNow() {
        Object listeners;
        synchronized (this) {
            //  如果是主线程绑定端口，这里一般不会有观察者
            if (notifyingListeners || this.listeners == null) {
                return;
            }
            notifyingListeners = true;
            listeners = this.listeners;
            this.listeners = null;
        }
        for (;;) {
            if (listeners instanceof DefaultFutureListeners) {
                notifyListeners0((DefaultFutureListeners) listeners);
            } else {
                // 进行通知，这里就会调用到刚才设定的listener了
                notifyListener0(this, (GenericFutureListener<?>) listeners);
            }
            synchronized (this) {
                if (this.listeners == null) {
                    notifyingListeners = false;
                    return;
                }
                listeners = this.listeners;
                this.listeners = null;
            }
        }
    }
```

4. 向`eventLoop`提交一个绑定端口的任务。

```java
private static void doBind0(
        final ChannelFuture regFuture, final Channel channel,
        final SocketAddress localAddress, final ChannelPromise promise) {
    // 这里会想eventLoop提交一个任务
    channel.eventLoop().execute(new Runnable() {
        @Override
        public void run() {
           //
            if (regFuture.isSuccess()) {
                // 进行端口绑定
                channel.bind(localAddress, promise).addListener(ChannelFutureListener.CLOSE_ON_FAILURE);
            } else {
                promise.setFailure(regFuture.cause());
            }
        }
    });
}

// 这个任务就是 channel.bind(localAddress, promise).addListener(ChannelFutureListener.CLOSE_ON_FAILURE);
Breakpoint reached at io.netty.bootstrap.AbstractBootstrap$2.run(AbstractBootstrap.java:365)
Breakpoint reached
	at io.netty.bootstrap.AbstractBootstrap$2.run(AbstractBootstrap.java:365)
	at io.netty.util.concurrent.AbstractEventExecutor.safeExecute$$$capture(AbstractEventExecutor.java:163)
	at io.netty.util.concurrent.AbstractEventExecutor.safeExecute(AbstractEventExecutor.java:-1)
	at io.netty.util.concurrent.SingleThreadEventExecutor.runAllTasks(SingleThreadEventExecutor.java:404)
	at io.netty.channel.nio.NioEventLoop.run(NioEventLoop.java:462)
	at io.netty.util.concurrent.SingleThreadEventExecutor$5.run(SingleThreadEventExecutor.java:897)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.lang.Thread.run(Thread.java:748)
```

5. 绑定

```java
// AbstractChannel进行绑定
public ChannelFuture bind(SocketAddress localAddress, ChannelPromise promise) {
  // 这里的pipeline也是在Channel中初始化的那个
  return pipeline.bind(localAddress, promise);
}

//   这里设置的boud不一样
//   tail = new TailContext(this);
//   super(pipeline, null, TAIL_NAME, true, false);
//   head = new HeadContext(this);
//   super(pipeline, null, HEAD_NAME, false, true);
@Override
public final ChannelFuture bind(SocketAddress localAddress, ChannelPromise promise) {
    return tail.bind(localAddress, promise);
}

@Override
public ChannelFuture bind(final SocketAddress localAddress, final ChannelPromise promise) {
  if (localAddress == null) {
      throw new NullPointerException("localAddress");
  }
  if (isNotValidPromise(promise, false)) {
      // cancelled
      return promise;
  }

  // 从上下文中找到合适的AbstractChannelHandlerContext，现在找到的是HeadContext
  final AbstractChannelHandlerContext next = findContextOutbound();
  // 这里拿到了eventloop
  EventExecutor executor = next.executor();
  if (executor.inEventLoop()) {
      next.invokeBind(localAddress, promise);
  } else {
      // 如果当前线程与channel绑定的不是一个线程，委托给channle线程去处理
      safeExecute(executor, new Runnable() {
          @Override
          public void run() {
              next.invokeBind(localAddress, promise);
          }
      }, promise, null);
  }
  return promise;
  }

// 这里找到的是HeadContext
private AbstractChannelHandlerContext findContextOutbound() {
      AbstractChannelHandlerContext ctx = this;
      do {
          ctx = ctx.prev;
      } while (!ctx.outbound);
      return ctx;
}

@Override
public void bind(
        ChannelHandlerContext ctx, SocketAddress localAddress, ChannelPromise promise)
        throws Exception {
    // class io.netty.channel.nio.AbstractNioMessageChannel$NioMessageUnsafe
    // unsafe是在HeadContext中从channel拿到的
    unsafe.bind(localAddress, promise);
}

@Override
public final void bind(final SocketAddress localAddress, final ChannelPromise promise) {
    // ...
    try {
        doBind(localAddress);
    } catch (Throwable t) {
        safeSetFailure(promise, t);
        closeIfClosed();
        return;
    }

    if (!wasActive && isActive()) {
        invokeLater(new Runnable() {
            @Override
            public void run() {
                // 又会提交一个任务到eventGroup
                pipeline.fireChannelActive();
            }
        });
    }
    // 这里又会调用观察者
    safeSetSuccess(promise);
}

// 这里的channel为ServerSocketChannel绑定了端口
@Override
protected void doBind(SocketAddress localAddress) throws Exception {
    if (PlatformDependent.javaVersion() >= 7) {
        javaChannel().bind(localAddress, config.getBacklog());
    } else {
        javaChannel().socket().bind(localAddress, config.getBacklog());
    }
}
```

### 设置 read 事件

1. 查看链路事件

```java
Breakpoint reached
  // 开始设置事件
	at io.netty.channel.nio.AbstractNioChannel.doBeginRead(AbstractNioChannel.java:411)
	at io.netty.channel.nio.AbstractNioMessageChannel.doBeginRead(AbstractNioMessageChannel.java:55)
	at io.netty.channel.AbstractChannel$AbstractUnsafe.beginRead(AbstractChannel.java:847)
  // HeadContext
	at io.netty.channel.DefaultChannelPipeline$HeadContext.read(DefaultChannelPipeline.java:1386)
	at io.netty.channel.AbstractChannelHandlerContext.invokeRead(AbstractChannelHandlerContext.java:693)
	at io.netty.channel.AbstractChannelHandlerContext.read(AbstractChannelHandlerContext.java:673)
	at io.netty.channel.DefaultChannelPipeline.read(DefaultChannelPipeline.java:1050)
	at io.netty.channel.AbstractChannel.read(AbstractChannel.java:284)
	at io.netty.channel.DefaultChannelPipeline$HeadContext.readIfIsAutoRead(DefaultChannelPipeline.java:1446)
	at io.netty.channel.DefaultChannelPipeline$HeadContext.channelActive(DefaultChannelPipeline.java:1424)
	at io.netty.channel.AbstractChannelHandlerContext.invokeChannelActive(AbstractChannelHandlerContext.java:213)
	at io.netty.channel.AbstractChannelHandlerContext.invokeChannelActive(AbstractChannelHandlerContext.java:199)
	at io.netty.channel.DefaultChannelPipeline.fireChannelActive(DefaultChannelPipeline.java:941)
	at io.netty.channel.AbstractChannel$AbstractUnsafe$2.run(AbstractChannel.java:569)
	at io.netty.util.concurrent.AbstractEventExecutor.safeExecute$$$capture(AbstractEventExecutor.java:163)
	at io.netty.util.concurrent.AbstractEventExecutor.safeExecute(AbstractEventExecutor.java:-1)
	at io.netty.util.concurrent.SingleThreadEventExecutor.runAllTasks(SingleThreadEventExecutor.java:404)
	at io.netty.channel.nio.NioEventLoop.run(NioEventLoop.java:462)
	at io.netty.util.concurrent.SingleThreadEventExecutor$5.run(SingleThreadEventExecutor.java:897)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.lang.Thread.run(Thread.java:748)
```

2. 开始 Active，`readIfIsAutoRead();`会设置关注的事件。

```java
private void invokeRead() {
  if (invokeHandler()) {
      try {
          // 从头部开始处理
          // this.read(this)
          ((ChannelOutboundHandler) handler()).read(this);
      } catch (Throwable t) {
          notifyHandlerException(t);
      }
  } else {
      read();
  }
}

protected void doBeginRead() throws Exception {
  final SelectionKey selectionKey = this.selectionKey;
  if (!selectionKey.isValid()) {
      return;
  }
  final int interestOps = selectionKey.interestOps();
    if ((interestOps & readInterestOp) == 0) {
        selectionKey.interestOps(interestOps | readInterestOp);
    }
  }
}
```

### 总结

先绑定端口在处理事件，这个时候整个流程才算初始化完了， `EventLoop` 才会有读事件产生。
