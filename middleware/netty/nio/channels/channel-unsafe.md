# Channel-Unsafe

### Unsafe 初始化

1. Unsafe 的初始化都是在`Channel`初始化的时候进行初始化的，并且使用的是模版设计模式。

```java
protected AbstractChannel(Channel parent) {
      this.parent = parent;
      id = newId();
      // 这里会进行初始化
      unsafe = newUnsafe();
      pipeline = newChannelPipeline();
}

protected abstract AbstractUnsafe newUnsafe();
```

### AbstractNioMessageChannel

1. `NioServerSocketChannel`其初始化时，`newUnsafe()`调用的是其父亲`AbstractNioMessageChannel`的
`newUnsafe()` 方法。

```java
public NioServerSocketChannel(ServerSocketChannel channel) {
    // 只关心 SelectionKey.OP_ACCEPT事件
    // 这里一直调用到AbstractChannel，然后AbstractChannel#newUnsafe在回调到AbstractNioMessageChannel
    super(null, channel, SelectionKey.OP_ACCEPT);
    config = new NioServerSocketChannelConfig(this, javaChannel().socket());
}

// AbstractNioMessageChannel
protected AbstractNioUnsafe newUnsafe() {
    return new NioMessageUnsafe();
}
```

2. `AbstractNioMessageChannel#read()`方法会在`pipeline.fireChannelRead(readBuf.get(i));`中使用
`ServerBootstrapAcceptor` 产生 `NioSocketChannel` 。

### AbstractNioByteChannel

1. `NioSocketChannel`其初始化时，`newUnsafe()`调用的是其父亲`AbstractNioByteChannel`的
`newUnsafe()` 方法。

```java
protected AbstractNioByteChannel(Channel parent, SelectableChannel ch) {
   // 只关心 SelectionKey.OP_READ
  // 这里一直调用到AbstractChannel，然后AbstractChannel#newUnsafe在回调到AbstractNioByteChannel
   super(parent, ch, SelectionKey.OP_READ);
}

// AbstractNioByteChannel
protected AbstractNioUnsafe newUnsafe() {
        return new NioByteUnsafe();
}
```

2. `NioByteUnsafe`进行`read()`时候是进行数据处理。

### 为什么要拆分呢？

```yml
Split AbstractNioChannel into two subtypes
- AbstractNioMessageChannel and AbstractNioStreamChannel
- Better performance
- Replaced 'if' checks with polymorphism
```

1. 从上面看`AbstractNioChannel`用策略+模版设计模式进行处理主要是为了性能和扩展。

### TIPS

Unsafe operations that should never be called from user-code. These methods are only provided to implement the actual transport, and must be invoked from an I/O thread except for the following methods:

* localAddress()
* remoteAddress()
* closeForcibly()
* register(EventLoop, ChannelPromise)
* deregister(ChannelPromise)
* voidPromise()

除了上面的方法，不应该从用户代码中调用的不安全操作，这些方法仅用于实现实际传输，并且必须从 I/O 线程调用。
