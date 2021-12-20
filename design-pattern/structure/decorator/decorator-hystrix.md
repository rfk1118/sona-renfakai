# Decorator-Hystrix

### 元数据标记选型

java 编程，对于元信息标记一般有 3 种方式

01.  接口标记 实现某种接口，然后转换成接口编程
02.  注解标记 拿到注解，获取注解的值
03.  泛型标记 因为类型擦除后依然会有部分信息放到元信息中，获取比较困难，可以参考《深入理解 java 虚拟机》，其中讲了泛型妥协和语法糖问题。

::: tip 提示
代码可以参考 `io.netty.util.internal. TypeParameterMatcher`

:::

### 部门内 Hystrix 改造

* 场景
  01.  部门同事希望熔断数据能够上报到不同的消息队列主题
  02.  不希望写`fallback`方法
* 编写代码
  01.  原`HystrixCommandAspect`做增强，也就是在这个新增切面，能够包裹这个切面

```java
@Aspect
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HystrixCommandEnhanceAspect {

    // 如果Method已经有了FallBackEvent，直接拿数据上报就行，已经上报的数据是无状态的
    private final Map<Method, FallBackEvent> concurrentHashMap = new ConcurrentHashMap<>();
    // 如果方法的FallbackReport设置错误，则不上报
    private final Map<Method, Method> error = new ConcurrentHashMap<>();
    private final ApplicationEventPublisher applicationEventPublisher;

    public HystrixCommandEnhanceAspect(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    // 3个切面
    @Pointcut("@annotation(com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand)")
    public void hystrixCommandAnnotationPointcut() {
    }

    @Pointcut("@annotation(com.netflix.hystrix.contrib.javanica.annotation.HystrixCollapser)")
    public void hystrixCollapserAnnotationPointcut() {
    }

    @Pointcut("@annotation(com.sona.rfk.util.report.annotation.FallbackReport)")
    public void fallbackReportAnnotationPointcut() {
    }

    @Around("(hystrixCommandAnnotationPointcut() || hystrixCollapserAnnotationPointcut()) && fallbackReportAnnotationPointcut()")
    public Object methodsAnnotatedWithHystrixCommand(final ProceedingJoinPoint joinPoint) throws Throwable {
        Object result;
        // 获取到切入方法
        Method method = getMethodFromTarget(joinPoint);
        Optional<FallBackEvent> event = Optional.empty();
        // 开启上报功能
        if (method.isAnnotationPresent(FallbackReport.class)) {
            event = getEvent(method);
        }
        try {
            result = joinPoint.proceed();
            // 如果是异步，则使用装饰者
            if (event.isPresent() && result instanceof Future) {
                result = new FutureDelegate((Future) result, event.get(), applicationEventPublisher);
            }
            return result;
        } catch (Exception e) {
            try {
                // 出现异常直接上报
                event.ifPresent(applicationEventPublisher::publishEvent);
            } catch (Exception ignore) {
            }
            throw e;
        }
    }

    private Optional<FallBackEvent> getEvent(Method method) {
        try {
            //设置错误，不在向下解析
            if (error.containsKey(method)) {
                return Optional.empty();
            }
            // 查找是否已经生成event，如果有则不在进行反射处理
            FallBackEvent event = concurrentHashMap.get(method);
            if (null != event) {
                return Optional.of(event);
            }

            // 处理注解
            FallbackReport annotation = method.getDeclaredAnnotation(FallbackReport.class);
            if (null != annotation && annotation.reportId() != 0) {
                int reportId = annotation.reportId();
                int increment = annotation.reportIncrement();
                event = new FallBackEvent(this, reportId, increment, annotation.errorMessage());
                concurrentHashMap.put(method, event);
                return Optional.of(event);
            } else {
                error.put(method, method);
                return Optional.empty();
            }
        } catch (Exception ignore) {
            return Optional.empty();
        }
    }
}

```

02.  查看注解信息

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
@Documented
public @interface FallbackReport {

    // 上报主题ID
    int reportId() default 0;

     // 每次上报增长数量
    int reportIncrement() default 1;

    // 需要提示的信息
    String errorMessage() default "";

}
```

03.  装饰者对异步结果进行装饰`new FutureDelegate((Future) result, event.get(), applicationEventPublisher);`

```java
public class FutureDelegate<R> implements Future<R> {

    private final Future<R> delegate;

    private final FallBackEvent event;

    private final ApplicationEventPublisher applicationEventPublisher;

    public FutureDelegate(Future<R> future, FallBackEvent event, ApplicationEventPublisher applicationEventPublisher) {
        this.delegate = future;
        this.event = event;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    @Override
    public boolean cancel(boolean mayInterruptIfRunning) {
        return delegate.cancel(mayInterruptIfRunning);
    }

    @Override
    public boolean isCancelled() {
        return delegate.isCancelled();
    }

    @Override
    public boolean isDone() {
        return delegate.isDone();
    }

    @Override
    public R get() throws InterruptedException, ExecutionException {
        try {
            return delegate.get();
        } catch (InterruptedException | ExecutionException e) {
            fallBack();
            throw e;
        }
    }

    @Override
    public R get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException {
        try {
            return delegate.get(timeout, unit);
        } catch (InterruptedException | ExecutionException | TimeoutException e) {
            fallBack();
            throw e;
        }
    }

     public void fallBack() {
        log.error(event.getMessage());
        try {
            System.out.println(Thread.currentThread().getName() + "上报" + event.getMessage() + "到主题" + event.getK() + "数量" + event.getV());
        } catch (Exception e) {
            log.warn("数据上报到报警平台失败");
        }
    }
}
```

04.  提高性能揭耦合，修改`FutureDelegate#fallBack`方法，使用观察者设计模式，观察者设计模式很多，比如`Guava EventBus , Spring ApplicationEvent , java8 Observable, Java9 Flow.Publisher, Zookeeper节点变化通知`

```java
 public void fallBack() {
        applicationEventPublisher.publishEvent(event);
 }
```

05.  事件代码，相当于一个通知消息

```java
public class FallBackEvent extends ApplicationEvent {

    // 上报主题ID
    private final Integer k;

    //增长数量
    private final Integer v;

    // 错误信息
    private final String message;

    public FallBackEvent(Object source, Integer k, Integer v, String message) {
        super(source);
        this.k = k;
        this.v = v;
        this.message = message;
    }

    public Integer getK() {
        return k;
    }

    public Integer getV() {
        return v;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FallBackEvent event = (FallBackEvent) o;
        return Objects.equals(k, event.k) && Objects.equals(v, event.v) && Objects.equals(message, event.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(k, v, message);
    }

    @Override
    public String toString() {
        return "FallBackEvent{" +
                "k=" + k +
                ", v=" + v +
                ", message='" + message + '\'' +
                '}';
    }
}

```

06.  编写观察者，这样的话可以解耦合

```java
@Component
public class FallBackEventListener implements ApplicationListener<FallBackEvent> {

    private static final Logger log = LoggerFactory.getLogger(FallBackEventListener.class);

    @Override
    public void onApplicationEvent(FallBackEvent event) {
        log.error(event.getMessage());
        try {
            // WMonitor.sum(event.getK(), event.getV());
            System.out.println(Thread.currentThread().getName() + "上报" + event.getMessage() + "到主题" + event.getK() + "数量" + event.getV());
        } catch (Exception e) {
            log.warn("数据上报WMonitor平台失败");
        }
    }
}
```

07.  提高性能使用异步观察者

```java
@Component
public class BeanConfig {

    private final static String THREAD_NAME_PREFIX ="ApplicationEventMulticaster-";

    private final static int workCount;

    static {
        workCount = Runtime.getRuntime().availableProcessors() * 2;
    }

    //  设置上报线程池
    @Bean
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setAllowCoreThreadTimeOut(true);
        taskExecutor.setCorePoolSize(workCount);
        taskExecutor.setMaxPoolSize(workCount);
        taskExecutor.setRejectedExecutionHandler(new ThreadPoolExecutor.DiscardOldestPolicy());
        taskExecutor.setThreadFactory(new CustomizableThreadFactory(THREAD_NAME_PREFIX));
        return taskExecutor;
    }

    //  设置上报EventApplication使用的线程池
    @Bean
    public SimpleApplicationEventMulticaster applicationEventMulticaster(ConfigurableListableBeanFactory beanFactory, ThreadPoolTaskExecutor taskExecutor) {
        SimpleApplicationEventMulticaster multicaster = new SimpleApplicationEventMulticaster(beanFactory);
        multicaster.setTaskExecutor(taskExecutor);
        return multicaster;
    }
}
```

08.  编写测试接口

```java
public interface BreakerTestService {

    Future<String> delay(long  time, TimeUnit unit);
}
```

09.  测试接口实现

```java
@Service
public class BreakerTestServiceImpl implements BreakerTestService {

    @Override
    @HystrixCommand(commandProperties = {
            @HystrixProperty(name = HystrixPropertiesManager.EXECUTION_ISOLATION_THREAD_TIMEOUT_IN_MILLISECONDS, value = "50"),
            @HystrixProperty(name = HystrixPropertiesManager.EXECUTION_TIMEOUT_ENABLED, value = "true")})
    @FallbackReport(reportId = 299792458, reportIncrement = 2, errorMessage = "进行测试demo上报")
    public Future<String> delay(long time, TimeUnit unit) {
        return new AsyncResult<String>() {
            @Override
            public String invoke() {
                try {
                    if (unit.equals(TimeUnit.SECONDS)) {
                        unit.sleep(time);
                    }
                } catch (Exception e) {

                }
                return "helloWorld";
            }
        };
    }
}
```

10. 测试用例

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class BreakerTestServiceImplTest {

    @Autowired
    private BreakerTestService breakerTestService;

    @Test
    public void delay() throws Exception{
        Future<String> delay = breakerTestService.delay(20, TimeUnit.MILLISECONDS);
        String s = delay.get();
        System.out.println(s);
    }

    @Test
    public void delayTime() throws Exception{
        try {
            Future<String> delay = breakerTestService.delay(10, TimeUnit.SECONDS);
            String s = delay.get();
            System.out.println(s);
        }catch (Exception e){
            e.printStackTrace();
        }
        TimeUnit.SECONDS.sleep(15);
    }
}
```

11. 核心代码，因为熔断框架使用的都是异步机制，所以需要对原有功能进行增强。

```java
    @Override
    public R get() throws InterruptedException, ExecutionException {
        try {
            return delegate.get();
        } catch (InterruptedException | ExecutionException e) {
            fallBack();
            throw e;
        }
    }

    @Override
    public R get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException {
        try {
            return delegate.get(timeout, unit);
        } catch (InterruptedException | ExecutionException | TimeoutException e) {
            fallBack();
            throw e;
        }
    }

    public void fallBack() {
        applicationEventPublisher.publishEvent(event);
    }
```

### 总结

因为时间比较紧，整个 `Hystrix` 源码还没看完，暂时使用装饰者对原功能做了增强。
