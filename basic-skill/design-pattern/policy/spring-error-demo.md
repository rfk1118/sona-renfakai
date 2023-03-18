# 错误案例

## 问题

我们是否中了 Spring 的毒，代码编程模式变成了 `Controller -> Service -> Dao` (1:1:1)编写。
贫血模型案例代码布局如下:

```shell
.
├── service
│   ├── OtherService.java
│   └── impl
│       └── OtherServiceImpl.java
└── web
    ├── OtherController.http
    └── OtherController.java
```

1. 先看一眼 dto

```java
@Data
public class HelloRequest {

    private String policy;

    private String name;
}
```

2. 在看一下 Controller 代码

```java
@RequestMapping("/other")
@RestController
public class OtherController {

    @Autowired
    private OtherService otherService;

    @GetMapping("/hello")
    public String hello(HelloRequest request) {
        return otherService.print(request);
    }
}
```

3. 看一下 Service 代码:

```java
public interface OtherService {

    String print(HelloRequest helloRequest);
}

@Service
public class OtherServiceImpl implements OtherService {
    @Override
    public String print(HelloRequest helloRequest) {
        if ("hello".equalsIgnoreCase(helloRequest.getPolicy())) {
            return helloRequest.getName() + "hello";
        }
        return helloRequest.getName() + "world";
    }
}
```

然后进行测试，完全符合预期，测试结果如下:

```shell
Testing started at 10:01 ...

// 进行测试
GET http://localhost:8080/other/world?name=ren&policy=hello

HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 8
Date: Mon, 20 Apr 2020 02:01:50 GMT
Keep-Alive: timeout=60
Connection: keep-alive

> 2020-04-20T100150.200.txt > renhello

###
GET http://localhost:8080/other/hello?name=ren&policy=world
Response code: 200; Time: 54ms; Content length: 8 bytes
HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 8
Date: Mon, 20 Apr 2020 02:01:50 GMT
Keep-Alive: timeout=60
Connection: keep-alive

> 2020-04-20T100150-1.200.txt > renworld

Response code: 200; Time: 56ms; Content length: 8 bytes
```

注意 Service 的实现，这里如果请求的 policy 为 hello，则进行 hello 处理，如果这里为 world 处理，则进行 world 返回，
未来进行扩展业务，我们也就编程了下面这个样子:

```java
  // 这段代码完全违背了OCP原则，扩展和测试增加了很大的难度。
  if ("hello".equalsIgnoreCase(helloRequest.getPolicy())) {
            return helloRequest.getName() + "hello";
        } else if () {
            // dosomething
        } else if () {
            // dosomething ....
        }

        return helloRequest.getName() + "world";
```

我怎么把 Java 的多态丢了，好像是这个样子，然后你进行了重构。

```java
.
├── service
│   ├── SimpleService.java
│   └── impl
│       ├── HelloSimpleServiceImpl.java
│       └── WorldSimpleServiceImpl.java
└── web
    ├── SimpleController.http
    └── SimpleController.java

```

4. 让我们来看一下一个 Controller:

```java

@RequestMapping("/simple")
@RestController
public class SimpleController {
    // Resource = Autowired+Qualifier
    /**
     * style1 Autowired+Qualifier
     */
    @Autowired
    @Qualifier("helloSimpleServiceImpl")
    private SimpleService helloService;

    /**
     *  style2 Resource = Autowired+Qualifier
     */
    @Resource(name = "worldSimpleServiceImpl")
    private SimpleService worldService;

    @GetMapping("/hello")
    public String hello(HelloRequest request) {
        return helloService.print(request);
    }

    @GetMapping("/world")
    public String world(HelloRequest request) {
        return worldService.print(request);
    }
}

```

5. 然后看一下 Service:

```java

public interface SimpleService {
    /**
     * @param helloRequest 请求
     */
    String print(HelloRequest helloRequest);
}

@Service(value = "helloSimpleServiceImpl")
public class HelloSimpleServiceImpl implements SimpleService {

    @Override
    public String print(HelloRequest helloRequest) {
        return helloRequest.getName() + "hello";
    }
}
@Service(value = "worldSimpleServiceImpl")
public class WorldSimpleServiceImpl implements SimpleService {

    @Override
    public String print(HelloRequest helloRequest) {
        return helloRequest.getName() + "world";
    }
}
```

6. 进行测试:

```

Testing started at 10:08 ...

HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 8
Date: Mon, 20 Apr 2020 02:08:36 GMT
Keep-Alive: timeout=60
Connection: keep-alive

> 2020-04-20T100836.200.txt > renworld

Response code: 200; Time: 19ms; Content length: 8 bytes
HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 8
Date: Mon, 20 Apr 2020 02:08:36 GMT
Keep-Alive: timeout=60
Connection: keep-alive

> 2020-04-20T100836-1.200.txt > renhello

Response code: 200; Time: 53ms; Content length: 8 bytes

```

但是我们发现好像问题没有解决，只是把 Service 问题转移到了 Controller，添加一个策略我们都需要添加一个控制器，无法根据数据进行动态选择策略。
下一章我们将用策略(多态)+享元模式解决这个问题。

## [Github 地址](https://github.com/sona0402/Polymorphism)
