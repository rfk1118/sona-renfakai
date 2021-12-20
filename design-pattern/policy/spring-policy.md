# spring-policy

### 问题

本章节主要是解决 Controller 和 Service 代码爆炸问题，在原有基础上进行了重构

```java
.
├── service
│   ├── TwoPolicyService.java
│   ├── impl
│   │   ├── HelloTwoPolicyServiceImpl.java
│   │   ├── NilTwoPolicyServiceImpl.java
│   │   └── WorldTwoPolicyServiceImpl.java
│   └── manager
│       └── TwoPolicyManager.java
└── web
    ├── TwoPolicyController.http
    └── TwoPolicyController.java
```

看一下 Controller 代码

```java
@RequestMapping("/two")
@RestController
public class TwoPolicyController {

    @GetMapping("/policy")
    public String policy(HelloRequest request) {
        return ThreePolicyManager.getPolicy(request.getPolicy()).print(request);
    }
}
```

看一下 Service 代码

```java
public interface TwoPolicyService extends InitializingBean {
    /**
     * @param helloRequest 请求
     */
    String print(HelloRequest helloRequest);
}
@Service
public class HelloTwoPolicyServiceImpl implements ThreePolicyService {

    @Override
    public String print(HelloRequest helloRequest) {
        return helloRequest.getName() + "hello";
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        ThreePolicyManager.register("hello", this);
    }
}

@Service
public class WorldTwoPolicyServiceImpl implements ThreePolicyService {
    @Override
    public String print(HelloRequest helloRequest) {
        return helloRequest.getName() + "world";
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        ThreePolicyManager.register("world", this);
    }
}
@Service
public class NilTwoPolicyServiceImpl implements ThreePolicyService {

    @Override
    public String print(HelloRequest helloRequest) {
        return ThreePolicyManager.NIL;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        ThreePolicyManager.register(ThreePolicyManager.NIL, this);
    }

}
```

这里需要加一个管理器，TwoPolicyManager(享元):

```java
public final class TwoPolicyManager {

    public static final String NIL = "Nil";

    private static final Map<String, ThreePolicyService> CONTAINER = new HashMap<>();

    public static boolean register(String key, ThreePolicyService service) {
        return CONTAINER.put(key, service) != null;
    }

    public static ThreePolicyService getPolicy(String channel) {
        ThreePolicyService policyService = CONTAINER.get(channel);
        if (Objects.isNull(policyService)) {
            return CONTAINER.get(NIL);
        }
        return policyService;
    }

}
```

然后进行测试:

```java

 Testing started at 10:25 ...

 HTTP/1.1 200
 Content-Type: text/plain;charset=UTF-8
 Content-Length: 8
 Date: Mon, 20 Apr 2020 02:25:34 GMT
 Keep-Alive: timeout=60
 Connection: keep-alive

 > 2020-04-20T102534.200.txt > renhello

 Response code: 200; Time: 22ms; Content length: 8 bytes
 HTTP/1.1 200
 Content-Type: text/plain;charset=UTF-8
 Content-Length: 8
 Date: Mon, 20 Apr 2020 02:25:34 GMT
 Keep-Alive: timeout=60
 Connection: keep-alive

 > 2020-04-20T102534-1.200.txt >renworld

 Response code: 200; Time: 46ms; Content length: 8 bytes
```

如果 HelloRequest 是从数据库获取的，你可以在 Service 层调用，可以返回特定结果，你发现好像一切都变好了，
但是你发现 `ThreePolicyManager.register("world", this);` 好像每个实现类都需要写一遍，好累赘，
是不是有好方法解决它呢，想了想注解+枚举+适配器是个不错的方案，可以解决 key 冲突问题和减少代码量。
枚举代码和注解如下:

```java
@Getter
@AllArgsConstructor
public enum PolicyEnum {

    HELLO("hello", "helloPolicy"),

    WORLD("world", "worldPolicy"),

    NIL("Nil", "NilPolicy"),

    ;

    private final String code;
    private final String desc;
}

@Component
@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public  @interface PolicyType {

    @NonNull
    PolicyEnum value();

}
```

代码中间加一层适配器:

```java
public abstract class ThreePolicyAdapt implements ThreePolicyService {

    @Override
    public void afterPropertiesSet() throws Exception {
        PolicyType annotation = this.getClass().getAnnotation(PolicyType.class);
        if (Objects.nonNull(annotation)) {
            ThreePolicyManager.register(annotation.value().getCode(), this);
        }
    }
}
```

实现类变成了下面的样子：

```java
@PolicyType(PolicyEnum.HELLO)
public class HelloThreePolicyServiceImpl extends ThreePolicyAdapt  {

    @Override
    public String print(HelloRequest helloRequest) {
        return helloRequest.getName() + "hello";
    }

}

@PolicyType(PolicyEnum.WORLD)
public class WorldThreePolicyServiceImpl extends ThreePolicyAdapt {
    @Override
    public String print(HelloRequest helloRequest) {
        return helloRequest.getName() + "world";
    }
}

@PolicyType(PolicyEnum.NIL)
public class NilThreePolicyServiceImpl extends ThreePolicyAdapt {

    @Override
    public String print(HelloRequest helloRequest) {
        return ThreePolicyManager.NIL;
    }
}
```

现在需要增加策略, 只需要增加一个类，继承 ThreePolicyAdapt，并在实现上增加一个注解，就 ok。
缺点: 每次都需要在枚举类中增加一个类型 HELLO("hello", "helloPolicy")。
如果不想增加适配器，使用 Spring 特性又如何解决上面的问题呢？使用 Spring 初始化 bean 的钩子。

```java
@Component
public class SpringThreePolicyManager implements BeanPostProcessor {

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        PolicyType policyType = AnnotationUtils.findAnnotation(bean.getClass(), PolicyType.class);
        if (Objects.nonNull(policyType)) {
            PolicyEnum policyEnum = policyType.value();
            ThreePolicyManager.register(policyEnum.getCode(), (ThreePolicyService) bean);
        }
        return bean;
    }

}
```

缺点: 如果上面管理器很多，需要很多钩子，然后给你个眼神你体会一下吧，怎么抉择取决于你。

### [Github 地址](https://github.com/sona0402/Polymorphism)
