# 填充属性

## 为什么要有DI

如果没有 DI ，项目中在特定的位置就会出现下面的代码，后续需要修改默认策略怎么办？改代码。

```java
// 这里需要改
private static final RejectedExecutionHandler defaultHandler =
        new AbortPolicy();
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory) {
    this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
          threadFactory, defaultHandler);
}
```

如果代码在项目中被引用的位置很多怎么办？向Spring学习，不直接new，而是封装到一个方法中，修改范围更小。其实我们使用日志文件门面SLF4J也是相同原理，做到可插拔。

```java
public static <K, V> HashMap<K, V> newHashMap(int expectedSize) {
    return new HashMap<>((int) (expectedSize / DEFAULT_LOAD_FACTOR), DEFAULT_LOAD_FACTOR);
}
```

## Bean生命周期

在`has-a`中编程依赖的是接口，接口实现会使用反射进行初始化，在填充属性时，其实就是处理DI过程。

### 核心流程

下面代码就是bean整个生命周期模版方法。

```java
protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args)
    throws BeanCreationException {

  // Instantiate the bean.
  BeanWrapper instanceWrapper = null;
  if (mbd.isSingleton()) {
    instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);
  }
  // 如果没有创建创建bean，创建bean
  if (instanceWrapper == null) {
    instanceWrapper = createBeanInstance(beanName, mbd, args);
  }

  // wrap信息设置，这里是BeanWrapperImpl
  Object bean = instanceWrapper.getWrappedInstance();
  Class<?> beanType = instanceWrapper.getWrappedClass();
  if (beanType != NullBean.class) {
    mbd.resolvedTargetType = beanType;
  }

  synchronized (mbd.postProcessingLock) {
    if (!mbd.postProcessed) {
      try {
        applyMergedBeanDefinitionPostProcessors(mbd, beanType, beanName);
      }
      catch (Throwable ex) {
        throw new BeanCreationException(mbd.getResourceDescription(), beanName,
            "Post-processing of merged bean definition failed", ex);
      }
      mbd.postProcessed = true;
    }
  }

  // 提前暴露，循环依赖
  boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&
      isSingletonCurrentlyInCreation(beanName));
  if (earlySingletonExposure) {
    // 如果允许在未填充属性之前进行暴露，放到二级缓存中
    addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean));
  }

  // Initialize the bean instance.
  Object exposedObject = bean;
  try {
    // 进行属性填充
    populateBean(beanName, mbd, instanceWrapper);
    // 调用接口钩子
    exposedObject = initializeBean(beanName, exposedObject, mbd);
  }
  catch (Throwable ex) {
    // todo 忽略
  }

  if (earlySingletonExposure) {
    Object earlySingletonReference = getSingleton(beanName, false);
    if (earlySingletonReference != null) {
      if (exposedObject == bean) {
        exposedObject = earlySingletonReference;
      }
      else if (!this.allowRawInjectionDespiteWrapping && hasDependentBean(beanName)) {
        String[] dependentBeans = getDependentBeans(beanName);
        Set<String> actualDependentBeans = new LinkedHashSet<>(dependentBeans.length);
        for (String dependentBean : dependentBeans) {
          if (!removeSingletonIfCreatedForTypeCheckOnly(dependentBean)) {
            actualDependentBeans.add(dependentBean);
          }
        }
      }
    }
  }
  try {
    registerDisposableBeanIfNecessary(beanName, bean, mbd);
  }
  catch (BeanDefinitionValidationException ex) {
    // todo 忽略
  }
  return exposedObject;
}
```

### 实例化

实例化时支持`Constructor`注入。使用`Constructor`注入可以从是否循环依赖上排查接口设计是否合理。

```java
protected BeanWrapper createBeanInstance(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) {
  Class<?> beanClass = resolveBeanClass(mbd, beanName);
  if (beanClass != null && !Modifier.isPublic(beanClass.getModifiers()) && !mbd.isNonPublicAccessAllowed()) {
    throw new BeanCreationException(mbd.getResourceDescription(), beanName,
        "Bean class isn't public, and non-public access not allowed: " + beanClass.getName());
  }
  Supplier<?> instanceSupplier = mbd.getInstanceSupplier();
  if (instanceSupplier != null) {
    return obtainFromSupplier(instanceSupplier, beanName);
  }
  if (mbd.getFactoryMethodName() != null) {
    return instantiateUsingFactoryMethod(beanName, mbd, args);
  }
  boolean resolved = false;
  boolean autowireNecessary = false;
  if (args == null) {
    synchronized (mbd.constructorArgumentLock) {
      if (mbd.resolvedConstructorOrFactoryMethod != null) {
        resolved = true;
        autowireNecessary = mbd.constructorArgumentsResolved;
      }
    }
  }
  if (resolved) {
    if (autowireNecessary) {
      return autowireConstructor(beanName, mbd, null, null);
    }
    else {
      return instantiateBean(beanName, mbd);
    }
  }
  // 构造器注入
  Constructor<?>[] ctors = determineConstructorsFromBeanPostProcessors(beanClass, beanName);
  if (ctors != null || mbd.getResolvedAutowireMode() == AUTOWIRE_CONSTRUCTOR ||
      mbd.hasConstructorArgumentValues() || !ObjectUtils.isEmpty(args)) {
    return autowireConstructor(beanName, mbd, ctors, args);
  }

  ctors = mbd.getPreferredConstructors();
  if (ctors != null) {
    return autowireConstructor(beanName, mbd, ctors, null);
  }
  // 无参数实例化
  return instantiateBean(beanName, mbd);
}
```

### 属性填充

```java
protected void populateBean(String beanName, RootBeanDefinition mbd, @Nullable BeanWrapper bw) {
    if (bw == null) {
      if (mbd.hasPropertyValues()) {
        throw new BeanCreationException(
            mbd.getResourceDescription(), beanName, "Cannot apply property values to null instance");
      }
      else {
        // 跳过空实例的属性填充阶段
        return;
      }
    }

    // 让任何 InstantiationAwareBeanPostProcessors 有机会在设置属性之前修改 bean 的状态。例如，这可以用于支持字段注入的样式。
    if (!mbd.isSynthetic() && hasInstantiationAwareBeanPostProcessors()) {
      for (InstantiationAwareBeanPostProcessor bp : getBeanPostProcessorCache().instantiationAware) {
        if (!bp.postProcessAfterInstantiation(bw.getWrappedInstance(), beanName)) {
          return;
        }
      }
    }

    PropertyValues pvs = (mbd.hasPropertyValues() ? mbd.getPropertyValues() : null);

    int resolvedAutowireMode = mbd.getResolvedAutowireMode();
    // 注入的两种常用方式
    if (resolvedAutowireMode == AUTOWIRE_BY_NAME || resolvedAutowireMode == AUTOWIRE_BY_TYPE) {
      MutablePropertyValues newPvs = new MutablePropertyValues(pvs);
      // 使用name注入
      if (resolvedAutowireMode == AUTOWIRE_BY_NAME) {
        autowireByName(beanName, mbd, bw, newPvs);
      }
      // 使用type注入
      if (resolvedAutowireMode == AUTOWIRE_BY_TYPE) {
        autowireByType(beanName, mbd, bw, newPvs);
      }
      pvs = newPvs;
    }

    boolean hasInstAwareBpps = hasInstantiationAwareBeanPostProcessors();
    boolean needsDepCheck = (mbd.getDependencyCheck() != AbstractBeanDefinition.DEPENDENCY_CHECK_NONE);

    PropertyDescriptor[] filteredPds = null;
    if (hasInstAwareBpps) {
      if (pvs == null) {
        pvs = mbd.getPropertyValues();
      }
      for (InstantiationAwareBeanPostProcessor bp : getBeanPostProcessorCache().instantiationAware) {
        PropertyValues pvsToUse = bp.postProcessProperties(pvs, bw.getWrappedInstance(), beanName);
        if (pvsToUse == null) {
          if (filteredPds == null) {
            filteredPds = filterPropertyDescriptorsForDependencyCheck(bw, mbd.allowCaching);
          }
          pvsToUse = bp.postProcessPropertyValues(pvs, filteredPds, bw.getWrappedInstance(), beanName);
          if (pvsToUse == null) {
            return;
          }
        }
        pvs = pvsToUse;
      }
    }
    if (needsDepCheck) {
      if (filteredPds == null) {
        filteredPds = filterPropertyDescriptorsForDependencyCheck(bw, mbd.allowCaching);
      }
      checkDependencies(beanName, mbd, filteredPds, pvs);
    }
    if (pvs != null) {
      applyPropertyValues(beanName, mbd, bw, pvs);
    }
  }
```

## 三级缓存

1. 可以直接拿到已经初始化完的bean，直接返回；
2. 不能拿到初始化完的bean，去拿未填充属性的bean；
3. 如果还拿到不到，使用工厂初始化一个未填充属性的bean；

```java
protected Object getSingleton(String beanName, boolean allowEarlyReference) {
  // Quick check for existing instance without full singleton lock
  Object singletonObject = this.singletonObjects.get(beanName);
  // 如果对象为空，并且在创建中
  if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
    // 拿未全部初始化
    singletonObject = this.earlySingletonObjects.get(beanName);
    if (singletonObject == null && allowEarlyReference) {
      synchronized (this.singletonObjects) {
        singletonObject = this.singletonObjects.get(beanName);
        if (singletonObject == null) {
          singletonObject = this.earlySingletonObjects.get(beanName);
          if (singletonObject == null) {
            // 获取到工厂，进行工厂创建
            ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
            if (singletonFactory != null) {
              singletonObject = singletonFactory.getObject();
              this.earlySingletonObjects.put(beanName, singletonObject);
              this.singletonFactories.remove(beanName);
            }
          }
        }
      }
    }
  }
  return singletonObject;
}
```

## 总结

* 从三级缓存中可以看出，`BeanFactory`其实是一个大的享元设计模式，保存着所有的`bean`，而`FactoryBean`只是为了初始化某一个类的工厂设计模式。
