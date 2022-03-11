# DI实现

在`has-a`中编程依赖的是接口，接口实现会使用反射进行初始化，构造器填充、属性填充时，其实就是处理 `DI` 过程。

## Bean生命周期

下面代码是 `bean` 整个生命周期模版方法。

```java
protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args)
    throws BeanCreationException {
  // todo 忽略一些代码
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
  // 提前暴露，循环依赖
  boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&
      isSingletonCurrentlyInCreation(beanName));
  if (earlySingletonExposure) {
    // 如果允许在未填充属性之前进行暴露，放到二级缓存中
    addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean));
  }
  Object exposedObject = bean;
  try {
    // 进行属性填充
    populateBean(beanName, mbd, instanceWrapper);
    // 调用接口钩子
    exposedObject = initializeBean(beanName, exposedObject, mbd);
  }
  catch (Throwable ex) {

  }
  return exposedObject;
}
```

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

## 实例化

实例化时支持`Constructor`注入。关于优缺点详情请参考[《Expert One-on-One J2EE Development without EJB》P134](https://book.douban.com/subject/1426848/)，除此之外使用`Constructor`注入可以从是否循环依赖上排查接口设计是否合理。

```java
protected BeanWrapper createBeanInstance(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) {
  Class<?> beanClass = resolveBeanClass(mbd, beanName);
  // todo 忽略一些代码
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

## 属性填充

```java
protected void populateBean(String beanName, RootBeanDefinition mbd, @Nullable BeanWrapper bw) {
  // todo 忽略一些代码
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

1. 可以直接拿到已经初始化完的`bean`，直接返回；
2. 不能拿到初始化完的bean，去拿未填充属性的`bean`；
3. 如果还拿到不到，使用工厂初始化一个未填充属性的`bean`；

```java
protected Object getSingleton(String beanName, boolean allowEarlyReference) {
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
