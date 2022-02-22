# Sona

## 个人信息

### [我是谁？](./introduction/about-me.md#关于作者)

一个喜欢技术和金融的 `it` 人。

## 个人经历

### 58集团    （2020/05 ～ 至今）

负责58服务号平台搭建、首页金刚区和feed区稳定性设计和抽象，组内负责业务梳理、集群拆分（职责、稳定性）、脚手架搭建、业务设计、核心业务编码、组内插件定制化等。

#### 项目名称：58 服务号平台搭建    （2020/07 ～ 至今）

**项目描述：**

58服务号平台搭建目的是为各业务线（转转、租房、到家精选、招聘、58汽车、58二手车等）提供生态系统，支持多种消息类型（文本、视频、模板）触达能力，从而为各业务吸引精准流量，形成高用户留存。58服务号平台与公司内部多个系统（推荐、推送、IM、账户、BI等）打通。

**设计点：**

* 多种消息类型推送与IM打通，模版 + 策略设计模式保证消息类型支持水平扩展；
* 模版消息配置平台和消息填充引擎设计和编码，后台配置模版消息，业务线调用，无需二次开发，引擎各流程节点支持插件水平扩展；
* 模版消息上线流程引擎设计，使用状态机设计模式保证模版生命周期简短、清晰；
* 关注网关（鉴权、监控能力）、模版消息开放平台（支持公司外部系统http调用，内部调用内部自研框架）。

**难点：**

* 数据推送租户隔离进行探索和落地；
* 数据推送向高可用推进。

**个人成长：**

从 0～1 搭建服务号体系，实践了集群按照职责、稳定性等进行拆分，项目模块化保证模块间低耦合。带领2人小团队开发情况下，即保证了业务快速迭代又保证了后期扩展性性。在58第二季度就拿到了最高绩效。

#### 项目名称：58首页金刚位    （2021/05 ～ 至今）

**项目描述：**

为解决旧版58首页金刚位在多维度（城市、平台、版本）下配置困难、上线后与预期不一致、问题排查困难、测试流程繁琐等问题，现对金刚位模块拆分、流程进行重新设计，实现了抽象数据实体化、无Charles代理查看展示效果、自动化测试保证数据安全等，从而保证了系统稳定性。

**设计点：**

* 模块职责拆分，拆分后包含icon、模版、维度信息配置、测试流程、临时运营配置（图片、名称、协议、角标）、个性化；
* 模版校验引擎设计和编码，引擎保证模版配置正确性，引擎（插件组合不同）校验不同icon组合是否符合预期。例：某插件校验前n个不允许出现小icon；
* 测试流程引擎设计和编码，支持多模块接入测试，新增模块（维度信息配置、临时运营配置）情况下不需要改变引擎代码；
* App请求分组，现支持4个分组（正式、内置、效果测试、自动化测试），设计从接口分组局部重构成注解分组，保证对象的不被侵入性以支持对象复用；

**难点：**

* icon获取导致Redis服务器流量网卡达到瓶颈；
* 多维度上线数据安全问题；
* 版本配置使用线段与手机版本点之间不兼容问题。

**个人成长：**

自顶向下（维度配置）和自下而上（icon组合）冲突使用黏合层（模版）解决，版本号 + 备忘录模式保证上线流程数据安全、准确。作为58首页门户，2021年05月上线后项目稳定，并为组内成员拿到优秀员工。

### 沣邦融资租赁（上海）有限公司     （2019/09 ～ 2020/05）

负责贷后（扣款、个人账户、催收）业务设计和编码，在职期间由于扣款政策监管加严，为避免通道临时关闭导致公司无法对用户扣款从而产生回款慢、用户逾期等问题，扣款亟待需要支持动态切换三方进行扣款，为此搭建支付路由平台。为了让催收、财务清晰看到用户账户全链路信息搭建个人账户系统。

#### 项目名称：支付路由平台    （2018/10 ～ 2020/05）

**项目描述：**

项目意在解决沣邦用户要素验证、协议签约、放款、回款、自动化对账等功能散落在多个项目维护成本高、扣款政策频繁变更导致扣款失败问题。要素验证为贷前风控系统提供用户属性校验以降低后期违约率。协议签约保证提高回款率。放款使用上下文记录不同错误，以支持网络故障、备付金不足提供补偿功能，提升放款效率。回款支持多方（通联、银联、中金、宝付、邮储直联、滴滴钱包）划扣和中金便捷支付。自动化对账（T+1）保证数据正确和异常报警监控。

**设计点：**

* 使用 Fork/join 框架拆分批量扣款任务，加快匹配三方通道效率，将旧版的扣款从1h降低至5min；
* 模版设计模式编写扣款请求/扣款结果查询主流程，主流程不变情况下使用策略模式支持三方快速接入；
* 分布式锁解决放款订单重复校验、放款订单发送、用户扣款等互斥事件问题；
* 使用 ByteBuddy 更改中金字节码，解决单进程内中金不支持商户动态切换问题。

**难点：**

* 分钟级放款，对于故障问题需支持幂等、补偿机制等。

**个人成长：**

金融安全和稳定性认知体系搭建，从扣款流量（灰度）按照比例递增迁移到新平台、两套系统共存期间进行表双同步等困难问题中意识到维护成本、模块解耦合重要性。

**相关技术：**

SpringBoot、SpringMvc、Mybatis、Oracle、Redis 、Kafka、Maven、Git

#### 项目名称：个人账户系统    （2018/10 ～ 2020/05）

**项目描述：**

个人账户系统设计是为了解决个人账户入账/出账，以及资方（微众银行、工行、中关村银行、江苏金租银行、华瑞银行）对接。个人账户包含可用余额、保证金、退款、代偿余额等，系统支持还款计划表扣款订单生成、逾期罚息产生、代偿余额标准化、提前结清等。

**设计点：**

* 还款计划表月账单订单生成引擎支持批量扣款、单笔实时、便捷支付等多种类型订单生成，享元设计模式管理引擎节点；
* 账户锁使用乐观锁，支持多种业务场景（批量扣款、单笔实时、便捷支付、对公打款、提前结清等）；
* 逾期罚息计算，支持黑名单、白名单、减免等，资方代偿余额ETL数据标准化；
* 责任链设计模式支持账户出/入账（扣款、保证金、退款、提前结清等）校验和处理；
* 提前结清各资方金额计算逻辑抽象和编写，用户提前结清数据权限位图设计，操作人员多角色权限支持或运算合并权限；

**难点：**

* 不同部门（销售、催收、业务）人员可操作用户类型不同，例：催收仅能操作逾期用户提前结清

**个人成长：**

业务复杂且生命周期较长，初次在项目中使用设计模式，体验到了面向对象编程对复杂业务的易维护性，为未来阅读框架源码事半功倍提供了基础。

**相关技术：**

SpringBoot、SpringMvc、Mybatis、Oracle、Redis 、Maven、Git

## 逸途（北京）科技有限公司    （2015/08 ～ 2018/07）

负责公司智能问答机器人、翻译机项目、逸途电商系统编码和维护。

## 技能清单

* **开发语言：** 精通 Java、了解 Golang、汇编
* **后端框架：** 精通 Spring、SpringMvc、Mybatis、SpringBoot、熟悉 SpringData、Struts2、Hibernate 了解 SpringCloud
* **数据库：** 精通 Oracle、Mysql 熟悉 Redis
* **中间件：** 熟悉 Netty、 Kafka  了解 Zookeeper、Tidb
* **服务器：** 熟悉 Jetty、Undertow、Tomcat
* **构建工具：** 熟悉 Maven 了解 Ant
* **项目管理工具：** 熟悉 Git
* **脚本语言：** 熟悉 Shell
* **设计模式：** 精通 23 种设计模式
* **网络：** 了解 Wireshark
