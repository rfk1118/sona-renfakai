# Bootstrap

### 这个类要解决什么问题？

`Bootstrap` 主要解决的是使用和组合问题。

* 使用要简单高效
* 组合支持正交性

### 方便使用详解

1. 在 58 做服务号时候，为公司内部做了一个类似微信模板消息功能，需要提供合适的 Api。
2. 使用领域拆解，将模版消息拆解成头信息，Body，跳转，通用信息。
3. 模拟代码如下：

```java
/**
 * 模版消息整体
 */
@Data
public class TemplateMessage {

    private Header header;

    private Body body;

    private Action action;

    private Common common;
}
/**
 * 通用比如模版ID和安全码
 */
@Data
public class Common {

    private String templateId;

    private String authCode;
}
/**
 * 头部信息
 */
@Data
public class Header {

    private String headName;

    private String headBody;
}
/**
 * body部分，使用bodyName匹配位置，保证数据结合
 */
@Data
public class Body {

    private List<Item> allItem;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Item {

        private String bodyName;

        private String bodyValue;
    }
}
/**
 * 跳转的url和位置
 */
@Data
public class Action {

    private String actionUrl;

    private String actionLocation;
}
```

4. 各个业务线要怎么用呢？使用案例可以参考下面代码：

```java
  TemplateMessage templateMessage = new TemplateMessage();
        Header header = new Header();
        header.setHeadName("renfakai");
        header.setHeadBody("renfakai");
        templateMessage.setHeader(header);

        Body body = new Body();
        List<Body.Item> list = new LinkedList<>();
        Body.Item  item01 = new  Body.Item();
        item01.setBodyName("a1");
        item01.setBodyValue("a1");
        Body.Item  item02 = new  Body.Item();
        item02.setBodyName("a2");
        item02.setBodyValue("a2");
        list.add(item01);
        list.add(item02);
        body.setAllItem(list);
        templateMessage.setBody(body);

        Common common = new Common();
        common.setTemplateId("TemplateIdaaaa01");
        common.setAuthCode("auth01");
        templateMessage.setCommon(common);

        Action action = new Action();
        action.setActionUrl("www.58.com");
        action.setActionLocation("left");
        templateMessage.setAction(action);

```

5. 如果让你这么用，估计会骂人吧，有没有好的解决方式呢当然有，对于复杂的对象创建应该使用`builder设计模式`。

```java
public class TemplateMessageBuilder {

    private String headName;

    private String headBody;

    private List<Body.Item> allItem;

    private String actionUrl;

    private String actionLocation;

    private String templateId;

    private String authCode;

    public TemplateMessageBuilder() {
        allItem = new LinkedList<>();
    }

    public TemplateMessageBuilder setHeadName(String headName) {
        this.headName = headName;
        return this;
    }

    public TemplateMessageBuilder setHeadBody(String headBody) {
        this.headBody = headBody;
        return this;
    }

    public TemplateMessageBuilder setAllItem(List<Body.Item> allItem) {
        this.allItem.addAll(allItem);
        return this;
    }

    public TemplateMessageBuilder addItem(Body.Item allItem) {
        this.allItem.add(allItem);
        return this;
    }

    public TemplateMessageBuilder setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
        return this;
    }

    public TemplateMessageBuilder setActionLocation(String actionLocation) {
        this.actionLocation = actionLocation;
        return this;
    }

    public TemplateMessageBuilder setTemplateId(String templateId) {
        this.templateId = templateId;
        return this;
    }

    public TemplateMessageBuilder setAuthCode(String authCode) {
        this.authCode = authCode;
        return this;
    }

    public static TemplateMessageBuilder builder(){
        return new TemplateMessageBuilder();
    }

    public TemplateMessage build() {
        if (allItem.isEmpty()) {
            throw new IllegalArgumentException("body item不能为空");
        }
        if (null == authCode || authCode.isEmpty()) {
            throw new IllegalArgumentException("安全码不能为空");
        }

        // todo 按照业务自己定义规则
        TemplateMessage result = new TemplateMessage();
        Header header = new Header();
        header.setHeadName(this.headName);
        header.setHeadBody(this.headBody);
        result.setHeader(header);

        Body body = new Body();
        body.setAllItem(this.allItem);
        result.setBody(body);

        Common common = new Common();
        common.setTemplateId(this.templateId);
        common.setAuthCode(this.authCode);
        result.setCommon(common);

        Action action = new Action();
        action.setActionUrl(this.actionUrl);
        action.setActionLocation(this.actionLocation);
        result.setAction(action);
        return result;
    }
}
```

6. 让我们来看看结果:

```java
  TemplateMessageBuilder builder = TemplateMessageBuilder.builder();
     builder.setHeadName("renfakai")
            .setHeadBody("renfakai")
            .setActionUrl("www.58.com")
            .setActionLocation("left")
            .setAuthCode("auth01")
            .setTemplateId("TemplateIdaaaa01")
            .addItem(new Body.Item("item01", "item01"))
            .addItem(new Body.Item("item02", "item02"))
            .addItem(new Body.Item("item03", "item03"));
  TemplateMessage build = builder.build();
```

### build 设计模式 netty 使用

1. `build设计模式`在`netty`中的使用，让我们看看是否与上面的`demo`一致。

```java
        EventLoopGroup boss = new NioEventLoopGroup();
        EventLoopGroup work = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(boss, work).channel(NioServerSocketChannel.class)
                    .localAddress(new InetSocketAddress(port))
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline().addLast(echoServerHandler);
                        }
                    });
            ChannelFuture sync = b.bind().sync();
            sync.channel().closeFuture().sync();
        } finally {
            boss.shutdownGracefully().sync();
            work.shutdownGracefully().sync();
        }
```

2. 方法内部代码：

```java
     public ServerBootstrap group(EventLoopGroup parentGroup, EventLoopGroup childGroup) {
        super.group(parentGroup);
        if (childGroup == null) {
            throw new NullPointerException("childGroup");
        }
        if (this.childGroup != null) {
            throw new IllegalStateException("childGroup set already");
        }
        this.childGroup = childGroup;
        return this;
    }

    public <T> ServerBootstrap childOption(ChannelOption<T> childOption, T value) {
        if (childOption == null) {
            throw new NullPointerException("childOption");
        }
        if (value == null) {
            synchronized (childOptions) {
                childOptions.remove(childOption);
            }
        } else {
            synchronized (childOptions) {
                childOptions.put(childOption, value);
            }
        }
        return this;
    }
```

### 正交性问题

* [码农翻身 日志文件的设计正交性 170](https://book.douban.com/subject/30231515/)
* [UNIX 编程艺术 4.2.2 正交性 89](https://book.douban.com/subject/5387401/)

| 轴  |               X |                 Y |                Y |       Z |
| --- | --------------: | ----------------: | ---------------: | ------: |
| 1   | ServerBootstrap | NioEventLoopGroup | NioSocketChannel | handler |
| 2   |       Bootstrap | OioEventLoopGroup | OioSocketChannel | handler |

* `Bootstrap`可以选择客户端或者服务端。
* `EventLoopGroup`可以选择`nio, oio, aio`，但是`channel`要与之对应。
* 处理器可以随意组合
  按照上面理论就可以产生 `x*y*z` 中组合，其理论与日志的设计一致。

```java
    Logger logger = Logger.getLogger("log");
    Handler consoleHandler = new ConsoleHandler();
    consoleHandler.setFormatter(new XMLFormatter());
    logger.addHandler(consoleHandler);

    Logger logger2 = Logger.getLogger("log");
    Handler fileHandler= new FileHandler("a.log");
    fileHandler.setFormatter(new SimpleFormatter());
    logger2.addHandler(fileHandler);
```

* `Handler`可以使用`SimpleFormatter, XMLFormatter`为格式化方式。
* `Handler`底层可以为`ConsoleHandler, FileHandler`。
* 日志暂时只使用了`Logger`，如果后面使用`slf4j`日志底层也是可替换的，大大增加了灵活性。

### 接口隔离

不应该强迫客户依赖它们不用的方法
`Bootstrap` 和 `BootstrapConfig` 使用了接口隔离的方式，让用户使用更简单。

* [敏捷软件开发 第十二章 接口隔离原则（ISP）](https://book.douban.com/subject/1140457/)
