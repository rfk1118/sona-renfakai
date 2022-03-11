# 扩展点

扩展点都是用`instanceof`判断，然后强转进行增强的，主要包含三方面：

1. `Spring`定义的`bean`，一般为`Aware`
2. 用户定义的`bean`，使用`InitMethod`方法
3. 扩展点（BeanPostProcessor）修改`bean`属性

## initializeBean

代码是属性填充后进行扩展点调用，主要包含：

1. invokeAwareMethods `Spring`定义的`Bean`回调
2. applyBeanPostProcessorsBeforeInitialization 扩展点前置回调
3. invokeInitMethods `bean`初始化后的钩子，用户资源校验、初始化
4. applyBeanPostProcessorsAfterInitialization 扩展点前后置回调

```java
protected Object initializeBean(String beanName, Object bean, @Nullable RootBeanDefinition mbd) {
  if (System.getSecurityManager() != null) {
    AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
      invokeAwareMethods(beanName, bean);
      return null;
    }, getAccessControlContext());
  }
  else {
    // 调用Spring定义的bean
    invokeAwareMethods(beanName, bean);
  }
  Object wrappedBean = bean;
  if (mbd == null || !mbd.isSynthetic()) {
    // 扩展点前置扩展
    wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
  }
  try {
    // 初始化后的调用，一般用户资源处理
    invokeInitMethods(beanName, wrappedBean, mbd);
  }
  catch (Throwable ex) {
    // ...
  }
  if (mbd == null || !mbd.isSynthetic()) {
    // 扩展点后置扩展
    wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
  }
  return wrappedBean;
}
```

## invokeAwareMethods

为什么这里没有使用一个`总接口+适配器设计模式`，设计使用接口隔离原则。

* BeanNameAware 传递`beanName`给自己的`bean`
* BeanClassLoaderAware 传递`BeanClassLoader`给自己的`bean`
* BeanFactoryAware 传递`BeanFactory`给自己的`bean`

```java
private void invokeAwareMethods(String beanName, Object bean) {
  // 功能性接口的Aware
  if (bean instanceof Aware) {
    // 回调传递name
    if (bean instanceof BeanNameAware) {
      ((BeanNameAware) bean).setBeanName(beanName);
    }
    if (bean instanceof BeanClassLoaderAware) {
      ClassLoader bcl = getBeanClassLoader();
      if (bcl != null) {
        // 传递BeanClassLoader给自己的bean
        ((BeanClassLoaderAware) bean).setBeanClassLoader(bcl);
      }
    }
    if (bean instanceof BeanFactoryAware) {
      // 传递BeanFactory给自己的bean
      ((BeanFactoryAware) bean).setBeanFactory(AbstractAutowireCapableBeanFactory.this);
    }
  }
}
```

## postProcessBeforeInitialization

允许自定义修改新`bean`实例的工厂挂钩，每个`bean`都会过所有的`BeanPostProcessor`，相当于切面的前置处理。

```java
public Object applyBeanPostProcessorsBeforeInitialization(Object existingBean, String beanName)
    throws BeansException {
  Object result = existingBean;
  for (BeanPostProcessor processor : getBeanPostProcessors()) {
    Object current = processor.postProcessBeforeInitialization(result, beanName);
    if (current == null) {
      return result;
    }
    result = current;
  }
  return result;
}
```

## InitMethod

为了减少接口对实现的侵入性，对于回调支持接口实现和自定义。

### invokeInitMethods

```java
protected void invokeInitMethods(String beanName, Object bean, @Nullable RootBeanDefinition mbd)
    throws Throwable {

  boolean isInitializingBean = (bean instanceof InitializingBean);
  if (isInitializingBean && (mbd == null || !mbd.isExternallyManagedInitMethod("afterPropertiesSet"))) {
    // 安全管理
    if (System.getSecurityManager() != null) {
      try {
        AccessController.doPrivileged((PrivilegedExceptionAction<Object>) () -> {
          ((InitializingBean) bean).afterPropertiesSet();
          return null;
        }, getAccessControlContext());
      }
      catch (PrivilegedActionException pae) {
        throw pae.getException();
      }
    }
    else {
      // 可以参考实现，一般都是资源校验，钩子初始化
      ((InitializingBean) bean).afterPropertiesSet();
    }
  }

  if (mbd != null && bean.getClass() != NullBean.class) {
    String initMethodName = mbd.getInitMethodName();
    if (StringUtils.hasLength(initMethodName) &&
        !(isInitializingBean && "afterPropertiesSet".equals(initMethodName)) &&
        !mbd.isExternallyManagedInitMethod(initMethodName)) {
      // 调用自定义初始化
      invokeCustomInitMethod(beanName, bean, mbd);
    }
  }
}

// AbstractFactoryBean 对bean初始化的处理
public void afterPropertiesSet() throws Exception {
  if (isSingleton()) {
    this.initialized = true;
    this.singletonInstance = createInstance();
    this.earlySingletonInstance = null;
  }
}
```

### invokeCustomInitMethod

解决接口侵入性问题，常用两种配置方式：配置文件、注解。

```java
protected void invokeCustomInitMethod(String beanName, Object bean, RootBeanDefinition mbd)
    throws Throwable {
  // 从bean中拿到自定义方法
  String initMethodName = mbd.getInitMethodName();
  Method initMethod = (mbd.isNonPublicAccessAllowed() ?
      BeanUtils.findMethod(bean.getClass(), initMethodName) :
      ClassUtils.getMethodIfAvailable(bean.getClass(), initMethodName));
  Method methodToInvoke = ClassUtils.getInterfaceMethodIfPossible(initMethod, bean.getClass());
  try {
    ReflectionUtils.makeAccessible(methodToInvoke);
    // 调用自定义初始化方法
    methodToInvoke.invoke(bean);
  }
  catch (InvocationTargetException ex) {
    throw ex.getTargetException();
  }
}
```

## postProcessAfterInitialization

允许自定义修改新`bean`实例的工厂挂钩，每个`bean`都会过所有的`BeanPostProcessor`，相当于切面的后置处理。

```java
@Override
public Object applyBeanPostProcessorsAfterInitialization(Object existingBean, String beanName)
    throws BeansException {
  Object result = existingBean;
  for (BeanPostProcessor processor : getBeanPostProcessors()) {
    Object current = processor.postProcessAfterInitialization(result, beanName);
    if (current == null) {
      return result;
    }
    result = current;
  }
  return result;
}
```
