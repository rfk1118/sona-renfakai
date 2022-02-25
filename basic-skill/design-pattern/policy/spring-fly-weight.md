# spring-flyweight-policy

### 问题

本章使用 Spring 的容器管理 Service，在处理业务时候根据映射进行转换，从 ApplicationContext 中获取到策略，极大减少了手动编写代码管理 Bean 的问题。
来看一下目录:

```java
.
├── ApplicationContextProvider.java
└── ApplicationContextProviderSetter.java

0 directories, 2 files

.
├── dict
│   └── FourPolicyNameEnum.java
├── service
│   ├── FourPolicyService.java
│   └── impl
│       ├── HelloFourPolicyServiceImpl.java
│       ├── NilFourPolicyServiceImpl.java
│       └── WorldFourPolicyServiceImpl.java
└── web
    ├── FourPolicyController.http
    └── FourPolicyController.java

4 directories, 7 file
```

让我门来看一下 Controller 代码:

```java

@Slf4j
@RequestMapping("/four")
@RestController
public class FourPolicyController {

    @GetMapping("/policy")
    public String policy(HelloRequest request) {
        FourPolicyService fourPolicyService = (FourPolicyService) ApplicationContextProvider.getBean(FourPolicyNameEnum.getPolicyName(request.getPolicy()));
        String print = fourPolicyService.print(request);
        log.info("result:{}", print);
        return print;
    }

}

```

让我门来看一下 Service 代码:

```java
public interface FourPolicyService {

    /**
     * @param helloRequest 请求
     */
    String print(HelloRequest helloRequest);
}

@Service
public class HelloFourPolicyServiceImpl implements FourPolicyService {

    @Override
    public String print(HelloRequest helloRequest) {
        return helloRequest.getName() + "hello";
    }

}

@Service
public class WorldFourPolicyServiceImpl implements FourPolicyService {
    @Override
    public String print(HelloRequest helloRequest) {
        return helloRequest.getName() + "world";
    }
}

@Service
public class NilFourPolicyServiceImpl implements FourPolicyService {

    @Override
    public String print(HelloRequest helloRequest) {
        return ThreePolicyManager.NIL;
    }

}
```

`Bean` 如果实现了 `BeanNameAware` ，在 `Bean` 生命周期中可以设定 Bean 的名称( `void setBeanName(String name)` )，这里不建议使用，
使用 Spring 规约(类似 `Springboot` 规约大于配置一样)，这样的话 Service 名称为 Class 名称第一个字母小写，根据这一规则创建映射:

```java

@Getter
@AllArgsConstructor
public enum FourPolicyNameEnum {

    HELLO("hello", "helloFourPolicyServiceImpl"),

    WORLD("world", "worldFourPolicyServiceImpl"),

    NIL("Nil", "nilFourPolicyServiceImpl"),

    ;

    private final String code;
    private final String policyName;

    public static String getPolicyName(String code) {
        if (StringUtils.isEmpty(code)) {
            return NIL.getPolicyName();
        }

        for (FourPolicyNameEnum value : FourPolicyNameEnum.values()) {
            if (value.getCode().equals(code)) {
                return value.getPolicyName();
            }
        }

        return NIL.getPolicyName();
    }
}

```

`ApplicationContext` 保存和获取方式如下:

```java

public final class ApplicationContextProvider {

    private static ApplicationContext applicationContext;

    public static void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ApplicationContextProvider.applicationContext = applicationContext;
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static Object getBean(String beanName) {
        return applicationContext.getBean(beanName);
    }

    public static <T> T getBean(Class<T> requiredType) {
        return applicationContext.getBean(requiredType);
    }

}

@Component
public class ApplicationContextProviderSetter implements ApplicationContextAware {

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ApplicationContextProvider.setApplicationContext(applicationContext);
    }
}

```

然后进行测试:

```java

 Testing started at 09:57 ...

 HTTP/1.1 200
 Content-Type: text/plain;charset=UTF-8
 Content-Length: 8
 Date: Sun, 25 Apr 2020 01:57:36 GMT
 Keep-Alive: timeout=60
 Connection: keep-alive

 > 2020-04-26T095736.200.txt > renhello

 Response code: 200; Time: 347ms; Content length: 8 bytes
 HTTP/1.1 200
 Content-Type: text/plain;charset=UTF-8
 Content-Length: 8
 Date: Sun, 25 Apr 2020 01:57:36 GMT
 Keep-Alive: timeout=60
 Connection: keep-alive

 > 2020-04-26T095737.200.txt > renworld

```

### 总结

优点: 不需要编写额外的代码对 Bean 进行保存，使用的时候按照规约从 ApplicationContext 获取。
缺点: 使用 BeanName 获取 Bean 的时候需要进行强转，不如自己编写容器获取看起来更加优雅。
需要在测试阶段测试出 BeanName-helloFourPolicyServiceImpl(HELLO("hello", "helloFourPolicyServiceImpl"))是否正确。

提示: 如果在创表初期，可以直接将 ServiceImpl 名称存到数据库，如果业务已经开展，多方使用，字断不可更改，而且不想增加字断的话，需要在代码中增加映射，请大家酌情处理。

### [Github 地址](https://github.com/sona0402/Polymorphism)
