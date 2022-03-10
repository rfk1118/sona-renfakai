# 接口回调

## initializeBean

```java
protected Object initializeBean(String beanName, Object bean, @Nullable RootBeanDefinition mbd) {
  if (System.getSecurityManager() != null) {
    AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
      invokeAwareMethods(beanName, bean);
      return null;
    }, getAccessControlContext());
  }
  else {
    invokeAwareMethods(beanName, bean);
  }

  Object wrappedBean = bean;
  if (mbd == null || !mbd.isSynthetic()) {
    wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
  }

  try {
    invokeInitMethods(beanName, wrappedBean, mbd);
  }
  catch (Throwable ex) {
    throw new BeanCreationException(
        (mbd != null ? mbd.getResourceDescription() : null),
        beanName, "Invocation of init method failed", ex);
  }
  if (mbd == null || !mbd.isSynthetic()) {
    wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
  }
  return wrappedBean;
}
```

## invokeAwareMethods

```java
private void invokeAwareMethods(String beanName, Object bean) {
  if (bean instanceof Aware) {
    if (bean instanceof BeanNameAware) {
      ((BeanNameAware) bean).setBeanName(beanName);
    }
    if (bean instanceof BeanClassLoaderAware) {
      ClassLoader bcl = getBeanClassLoader();
      if (bcl != null) {
        ((BeanClassLoaderAware) bean).setBeanClassLoader(bcl);
      }
    }
    if (bean instanceof BeanFactoryAware) {
      ((BeanFactoryAware) bean).setBeanFactory(AbstractAutowireCapableBeanFactory.this);
    }
  }
}
```

## postProcessBeforeInitialization

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

### invokeInitMethods

```java
protected void invokeInitMethods(String beanName, Object bean, @Nullable RootBeanDefinition mbd)
    throws Throwable {

  boolean isInitializingBean = (bean instanceof InitializingBean);
  if (isInitializingBean && (mbd == null || !mbd.isExternallyManagedInitMethod("afterPropertiesSet"))) {
    if (logger.isTraceEnabled()) {
      logger.trace("Invoking afterPropertiesSet() on bean with name '" + beanName + "'");
    }
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
      ((InitializingBean) bean).afterPropertiesSet();
    }
  }

  if (mbd != null && bean.getClass() != NullBean.class) {
    String initMethodName = mbd.getInitMethodName();
    if (StringUtils.hasLength(initMethodName) &&
        !(isInitializingBean && "afterPropertiesSet".equals(initMethodName)) &&
        !mbd.isExternallyManagedInitMethod(initMethodName)) {
      invokeCustomInitMethod(beanName, bean, mbd);
    }
  }
}
```

### invokeCustomInitMethod

```java
protected void invokeCustomInitMethod(String beanName, Object bean, RootBeanDefinition mbd)
    throws Throwable {

  String initMethodName = mbd.getInitMethodName();
  Assert.state(initMethodName != null, "No init method set");
  Method initMethod = (mbd.isNonPublicAccessAllowed() ?
      BeanUtils.findMethod(bean.getClass(), initMethodName) :
      ClassUtils.getMethodIfAvailable(bean.getClass(), initMethodName));

  if (initMethod == null) {
    if (mbd.isEnforceInitMethod()) {
      throw new BeanDefinitionValidationException("Could not find an init method named '" +
          initMethodName + "' on bean with name '" + beanName + "'");
    }
    else {
      if (logger.isTraceEnabled()) {
        logger.trace("No default init method named '" + initMethodName +
            "' found on bean with name '" + beanName + "'");
      }
      // Ignore non-existent default lifecycle methods.
      return;
    }
  }

  if (logger.isTraceEnabled()) {
    logger.trace("Invoking init method  '" + initMethodName + "' on bean with name '" + beanName + "'");
  }
  Method methodToInvoke = ClassUtils.getInterfaceMethodIfPossible(initMethod, bean.getClass());

  if (System.getSecurityManager() != null) {
    AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
      ReflectionUtils.makeAccessible(methodToInvoke);
      return null;
    });
    try {
      AccessController.doPrivileged((PrivilegedExceptionAction<Object>)
          () -> methodToInvoke.invoke(bean), getAccessControlContext());
    }
    catch (PrivilegedActionException pae) {
      InvocationTargetException ex = (InvocationTargetException) pae.getException();
      throw ex.getTargetException();
    }
  }
  else {
    try {
      ReflectionUtils.makeAccessible(methodToInvoke);
      methodToInvoke.invoke(bean);
    }
    catch (InvocationTargetException ex) {
      throw ex.getTargetException();
    }
  }
}
```

```java
protected void invokeCustomInitMethod(String beanName, Object bean, RootBeanDefinition mbd)
    throws Throwable {

  String initMethodName = mbd.getInitMethodName();
  Assert.state(initMethodName != null, "No init method set");
  Method initMethod = (mbd.isNonPublicAccessAllowed() ?
      BeanUtils.findMethod(bean.getClass(), initMethodName) :
      ClassUtils.getMethodIfAvailable(bean.getClass(), initMethodName));

  if (initMethod == null) {
    if (mbd.isEnforceInitMethod()) {
      throw new BeanDefinitionValidationException("Could not find an init method named '" +
          initMethodName + "' on bean with name '" + beanName + "'");
    }
    else {
      if (logger.isTraceEnabled()) {
        logger.trace("No default init method named '" + initMethodName +
            "' found on bean with name '" + beanName + "'");
      }
      // Ignore non-existent default lifecycle methods.
      return;
    }
  }

  if (logger.isTraceEnabled()) {
    logger.trace("Invoking init method  '" + initMethodName + "' on bean with name '" + beanName + "'");
  }
  Method methodToInvoke = ClassUtils.getInterfaceMethodIfPossible(initMethod, bean.getClass());

  if (System.getSecurityManager() != null) {
    AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
      ReflectionUtils.makeAccessible(methodToInvoke);
      return null;
    });
    try {
      AccessController.doPrivileged((PrivilegedExceptionAction<Object>)
          () -> methodToInvoke.invoke(bean), getAccessControlContext());
    }
    catch (PrivilegedActionException pae) {
      InvocationTargetException ex = (InvocationTargetException) pae.getException();
      throw ex.getTargetException();
    }
  }
  else {
    try {
      ReflectionUtils.makeAccessible(methodToInvoke);
      methodToInvoke.invoke(bean);
    }
    catch (InvocationTargetException ex) {
      throw ex.getTargetException();
    }
  }
}
```

## postProcessAfterInitialization

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

## 总结

todo
