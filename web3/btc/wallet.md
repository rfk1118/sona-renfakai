# atom walet

[代码](https://github.com/AstroxNetwork/extension)是[unisat](https://github.com/unisat-wallet/extension)分叉而来，进行审计并学习下。

## [总览](https://github.com/unisat-wallet/extension/compare/master...AstroxNetwork:extension:master)

### [remove window.unisat](https://github.com/unisat-wallet/extension/commit/8b605b4ac59e68cdb6f08ecaaf770bd9c0735564)

* gulpfile.js 修改了名称
* package.json 修改名称和版本号
* src/content-script/index.ts 修改了错误提示
* src/content-script/pageProvider/index.ts 移除了代理
* src/ui/pages/Approval/components/Connect.tsx 修改了button和head名称
* src/ui/pages/Approval/components/MultiSignPsbt/index.tsx  修改名称和button文案
* src/ui/pages/Approval/components/SignPsbt/index.tsx 修改buttona和文案
* src/ui/pages/Main/WalletTabScreen.tsx 修改弹框地址
* src/ui/pages/Wallet/MoonPayScreen.tsx 修改文案

### use http instead

* build/_raw/favicon.ico 修改图片
* build/_raw/images/logo/logo@128x.png 同上
* build/_raw/images/logo/logo@128x.png 同上
* build/_raw/images/logo/logo@32x.png  同上
* build/_raw/images/logo/logo@48x.png 同上
* build/_raw/images/logo/wallet-logo.png 同上
* build/_raw/index.html 修改图片链接
* build/_raw/notification.html 修改图片链接
