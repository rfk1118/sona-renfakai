import{_ as e,V as i,W as a,a0 as n}from"./framework-e54e0297.js";const d="/assets/docker-down-java-99c6761e.png",s="/assets/spring-boot-run-29df1a61.png",l="/assets/docker-mvn-down-6c1ea1ff.png",r="/assets/docker-build-fail-7d114e5b.png",t={},c=n(`<h1 id="docker镜像构建" tabindex="-1"><a class="header-anchor" href="#docker镜像构建" aria-hidden="true">#</a> docker镜像构建</h1><h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h2><p>学习docker基本概念、dockerfile语法和机器上启动了BuildKit。</p><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>要部署一个java项目，需要java二进制文件、需要的依赖、系统文件等。</p><ol><li>docker，打包使用。</li><li>Git客户端，拉取代码使用。</li><li>文本编译器，编写代码使用。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 这里是你要保存项目的文件夹
<span class="token builtin class-name">cd</span> /path/to/working/directory
// 克隆项目
<span class="token function">git</span> clone https://github.com/spring-projects/spring-petclinic.git
// 切换文件夹
<span class="token builtin class-name">cd</span> spring-petclinic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试项目" tabindex="-1"><a class="header-anchor" href="#测试项目" aria-hidden="true">#</a> 测试项目</h2><p>本地不使用docker进行测试，项目要求使用OpenJDK15或者15以后版本，可以官网下载，官网需要登陆，很麻烦，直接使用idea提供的工具进行下载。</p><p><img src="`+d+`" alt="An image"></p><p>使用了mvn-wrapper，此方案好处在于不需要配置mvn环境，缺点在于每次都需要将依赖拉取一遍，比较耗时，解决此问题的方案可以搭建私服。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 运行项目
./mvnw spring-boot:run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+s+`" alt="An image"></p><h2 id="创建dockerfile" tabindex="-1"><a class="header-anchor" href="#创建dockerfile" aria-hidden="true">#</a> 创建Dockerfile</h2><ol><li>拉取基础镜像，这里需要拉取OpenJDK；</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># syntax=docker/dockerfile:1
FROM eclipse-temurin:17-jdk-jammy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建工作文件夹；</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WORKDIR /app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>解决依赖问题，将依赖关系pom文件和mvn-wrap复制到容器中；</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>COPY .mvn/ .mvn
COPY mvnw pom.xml ./
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>下载依赖；</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>RUN ./mvnw dependency:resolve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从图中看到下载依赖时间很长，建议使用私服解决此问题。 <img src="`+l+`" alt="An image"></p><ol start="5"><li>复制源代码</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>COPY src ./src
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6"><li>启动服务</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CMD [&quot;./mvnw&quot;, &quot;spring-boot:run&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="7"><li>查看完整的dockerfile</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># syntax=docker/dockerfile:1

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:resolve

COPY src ./src

CMD [&quot;./mvnw&quot;, &quot;spring-boot:run&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用" tabindex="-1"><a class="header-anchor" href="#常用" aria-hidden="true">#</a> 常用</h2><p>使用上述方案打包处理，会出现耗时长，并且打包失败问题。</p><p><img src="`+r+`" alt="An image"></p><p>打镜像的时候，都是本地打好包，然后添加到镜像中，并用<code>java -jar</code>启动，在启动时添加<code>jvm</code>参数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 拉取基础镜像
FROM openjdk:12-alpine
// 复制可启动包
ADD /target/*.jar /app.jar
// 进行启动
ENTRYPOINT [&quot;sh&quot;, &quot;-c&quot;, &quot;java  -jar /app.jar]

EXPOSE 8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="镜像打tag" tabindex="-1"><a class="header-anchor" href="#镜像打tag" aria-hidden="true">#</a> 镜像打tag</h2><p>此问题主要是解决线上版本有问题，可以快速回滚上一版本镜像保证服务可用。</p>`,36),v=[c];function o(u,m){return i(),a("div",null,v)}const b=e(t,[["render",o],["__file","buildimage.html.vue"]]);export{b as default};
