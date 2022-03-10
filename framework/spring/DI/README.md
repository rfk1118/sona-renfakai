# DI

DI 依赖反转是一种思想，无论 `is-a` 、 `has-a` 都会使用面向接口编程，接口实现后续如果有替换，如果没有 DI ，每次变更都需要修改多处代码，所以DI重要性就显得极其重要。

了解 DI 需要了解 bean 的生命周期，填充属性也就是 DI 依赖注入，在依赖注入时需要对对象进行查找，所以在设计时需要 Context 查找特定的 bean 。

## 常用组件

* Core
* Beans
* Context
* Expression
* Context Support

## Bean生命周期

::: center
<mermaid style="margin-bottom: 0px">
stateDiagram
    [*] --> 实例化
    实例化 --> 填充属性
    填充属性 --> BeanNameAware#setBeanName
    BeanNameAware#setBeanName --> BeanFactoryAware#setBeanFactory
    BeanFactoryAware#setBeanFactory --> ApplicationContextAware#setApplicationContext
    ApplicationContextAware#setApplicationContext --> BeanPostProcessor#postProcessBeforeInitialization
    BeanPostProcessor#postProcessBeforeInitialization --> InitializingBean#afterPropertiesSet
    InitializingBean#afterPropertiesSet --> 自定义初始化方法
    自定义初始化方法 --> BeanPostProcessor#postProcessAfterInitialization
    BeanPostProcessor#postProcessAfterInitialization --> Use
    Use --> DisposableBean#destroy
    DisposableBean#destroy --> 自定义摧毁方法
    自定义摧毁方法 --> [*]
</mermaid>
:::

## DI核心理论

1. [Bean填充属性](./di.md)，也就是DI核心基础，DI前置条件是里氏替换；
2. Bean在多线程下是否有副作用，这里引申出bean的作用域；
3. 元信息标签；
   1. xml
   2. 注解
   3. [接口](./initialize-bean.md)
   4. 泛型
