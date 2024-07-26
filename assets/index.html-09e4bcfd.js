import{_ as i,V as r,W as t,Y as e,a1 as o,Z as n,a0 as c,F as l}from"./framework-e54e0297.js";const d="/assets/docker-lan-3c324eb2.png",s={},h=e("h1",{id:"docker支持语言一览",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker支持语言一览","aria-hidden":"true"},"#"),o(" docker支持语言一览")],-1),_=e("code",null,"docker",-1),p={href:"https://docs.docker.com/language/",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,[e("img",{src:d,alt:"An image"})],-1),k=e("p",null,"对于后端来讲，多种语言只需要暂时先熟悉一种即可，因为其总体结构分为单体无数据库应用打包部署，连接数据库应用打包和数据库打包。",-1),f={id:"java应用启动",tabindex:"-1"},m=e("a",{class:"header-anchor",href:"#java应用启动","aria-hidden":"true"},"#",-1),x={href:"https://docs.docker.com/language/java/",target:"_blank",rel:"noopener noreferrer"},g=c('<p>原文内容如下： Java 入门指南教您如何使用 Docker 创建容器化的 Spring Boot 应用程序。在本模块中，您将学习如何：</p><ul><li>使用 Maven 克隆并运行 Spring Boot 应用程序</li><li>创建一个新的 Dockerfile，其中包含构建 Java 映像所需的指令</li><li>将新建的镜像作为容器运行</li><li>设置本地开发环境以将数据库连接到容器</li><li>使用 Docker Compose 运行 Spring Boot 应用</li><li>使用 GitHub Actions 为您的应用程序配置 CI/CD 管道</li><li>将您的应用程序部署到云端 完成 Java 入门模块后，您应该能够根据本指南中提供的示例和说明将您自己的 Java 应用程序容器化。</li></ul><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><ol><li>解决查找<code>OpenJDK</code>问题，并在不同环境配置（win2012）不生效问题，本着客户需求之上原则，满足客户有的服务器是linux，有的是win2012。</li><li>解决<code>Mysql</code>安装缺失依赖问题，在之前部署服务器（win2012），缺少各种dll。</li><li>客户不提供linux环境，跳板机需要使用向日葵，mac使用向日葵打字不兼容问题。</li><li>服务器被攻击无法使用常规命令进行排查，需要查看win命令，并对top等兼容性不好问题。</li></ol><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>使用<code>docker</code>其实就是程序员为自己节省时间（上面问题浪费很多时间），减少出错的概率和排查错误耗费的时间。</p>',6);function v(b,B){const a=l("ExternalLinkIcon");return r(),t("div",null,[h,e("p",null,[_,o(" 现以支持多种语言部署，"),e("a",p,[o("官方文档"),n(a)]),o("，支持语言如图所示：")]),u,k,e("h2",f,[m,o(),e("a",x,[o("java应用启动"),n(a)])]),g])}const J=i(s,[["render",v],["__file","index.html.vue"]]);export{J as default};