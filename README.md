---
comment: false
---

# Sona

## 个人信息

### [我是谁？](./introduction/about-me.md#关于作者)

一个喜欢技术的 `it` 人。

- 擅长行业
  - 支付: 2018 ～ 2020，汽车租赁行业
  - 互联网: 2020 ～ 至今，58 平台
- 擅长工作内容
  - 宏观: 项目分析和模块职责拆分，设计模式选择，保持项目健壮性和可扩展性
  - 微观: 选择合适算法，局部性能最优
  - 项目: 脚手架搭建
  - 技术: 技术选型

## 领域

### 支付行业

- 扣款体系支付路由搭建
  - 批量扣款
  - 单比实时扣款
  - 扫码支付
  - 对公账户处理
  - 其他等
- 个人账户搭建
  - 还款账单冲抵
  - 逾期罚息生成
  - 三方资方对接
  - 日间，日末文件 `ETL` 标准化处理
  - 其他等
- 对账系统和凭证系统搭建

### 互联网

- 58 服务号，从 `0～1` 搭建 58 体系
  - 粉丝关注/取消关注
  - 服务号文章发布/菜单管理
  - 业务线场景通知(下单/取消订单)，包含 `app` 内通知和渠道通知
  - 场景模版配置平台，保证模版高增长性和低开发
  - 与转转 `app` 打通
  - 服务号直播
  - BI数据分析打通
- 58 首页 `icon` 系统重构，稳定性保证
  - icon 模块设计
  - 模版固化 icon，保证数据组合抽象向实体转换，为自动化检查和测试提供保证
  - 维度化 `城市*平台*版本` 模版匹配
  - 运营信息拆分，对 `icon` 各属性支持替换或包装
  - 测试流程(状态机+享元+策略)，保证主流程不变的情况下，其他模块接入的方便性
  - 使用分组(`jsr303`)方式，对手机 app 请求进行分流，例如正式，测试，内置等流程，保证 object 的低耦合性，第一版本使用接口继承方式，其分组性进行局部修正
- 58 首页 Feed 流设计
  - 编写 `handler` 插件，一个插件代表一个业务线
  - 按照 `read write`流程制定请求响应
  - 使用 `netty-pipeline` 领域设计 Feed 流程，后台配置 `pipeline`插件组合

## 博客

### 工程语言

- [VuePress](https://vuepress.vuejs.org/zh/)
  - md 文档编译成 html，样式不会出现本地和部署不一致问题
  - [插件](https://github.com/vuepress/awesome-vuepress#plugins)

### 文本编辑器

- [Visual Studio Code](https://code.visualstudio.com)md，js 编写，轻量

### 插件

- [markdown-all-in-one](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

  针对 `md` 进行 `format`
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

  检查 `md` 格式
- [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

  格式化 `js，json` 等
