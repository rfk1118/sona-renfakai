import{_ as o,V as p,W as l,Y as s,a1 as n,Z as e,a0 as t,F as c}from"./framework-e54e0297.js";const i="/assets/arc_npm-fetch-88489c82.png",r="/assets/arc20_02-4a202771.png",u="/assets/broadcastWithRetries-3bcfaa21.png",d={},k=s("h1",{id:"atomical",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#atomical","aria-hidden":"true"},"#"),n(" atomical")],-1),v={href:"https://twitter.com/atomicalsxyz",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/atomicals",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.npmjs.com/package/atomical",target:"_blank",rel:"noopener noreferrer"},h=t('<p>关于arc20叙事不在叙述，本文章主要是为了做测试和完善一些流程。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><ol><li>创建文件夹<code>npm_fetch</code></li></ol><p><img src="'+i+`" alt="An image"></p><ol start="2"><li>创建<code>package.json</code>，输入内容:</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 运行的cli脚本</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;cli&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cross-env ELECTRUMX_WSS=wss://electrumx.atomicals.xyz:50012 node node_modules/atomicals/dist/cli.js&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// cli包</span>
  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;atomicals&quot;</span><span class="token operator">:</span> <span class="token string">&quot;latest&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;cross-env&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.0.3&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里为什么要使用<code>atomicals</code>，其实整个圈就是个黑暗森林，有了官方包，就会有钓鱼包，所以一切以官方和下载量为准，或者自行审计代码。</p><p><img src="`+r+`" alt="An image"></p><h2 id="执行" tabindex="-1"><a class="header-anchor" href="#执行" aria-hidden="true">#</a> 执行</h2><ol><li>进行安装，执行<code>npm i</code>，会安装依赖，生成<code>node_modules</code>和<code>package-lock</code>的json文件。</li><li>进行钱包初始化，使用<code>npm run cli wallet-init</code>，生成文件<code>wallet.json</code>，并输出</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> cli
<span class="token operator">&gt;</span> cross-env <span class="token assign-left variable">ELECTRUMX_WSS</span><span class="token operator">=</span>wss://electrumx.atomicals.xyz:50012 <span class="token function">node</span> node_modules/atomicals/dist/cli.js wallet-init

Wallet created at wallet.json
phrase: speed wish funny job <span class="token keyword">case</span> honey exhibit ozone pledge soft sentence sign
Primary address <span class="token punctuation">(</span>P2TR<span class="token punctuation">)</span>: bc1pde8qfdp75yxwmp6hkl4t6kuqska2ac3pu6kl4z2htunflm6zc53smnaf84
Primary address WIF: KxHHNDUcBma4ymK2yu2MwzumBRQhb2WwDwYcaBBWXuvvP22bCogu
Primary address path: m/44<span class="token string">&#39;/0&#39;</span>/0<span class="token string">&#39;/0/0
Funding address (P2TR): bc1phrh5yckajcx4kjstyk595puenntsz24rzf7qaussu9p76rm20vzqknk3hx
Funding address WIF: L2e216oagUXtVSCTS3cEb5n2nX2edjuW7zit369Fj6jvTFugrkPW
Funding address path: m/44&#39;</span>/0<span class="token string">&#39;/0&#39;</span>/1/0
------------------------------------------------------


<span class="token punctuation">{</span>
  // 助记词
  <span class="token string">&quot;phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;speed wish funny job case honey exhibit ozone pledge soft sentence sign&quot;</span>,
  <span class="token string">&quot;primary&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    // 存款地址
    <span class="token string">&quot;address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bc1pde8qfdp75yxwmp6hkl4t6kuqska2ac3pu6kl4z2htunflm6zc53smnaf84&quot;</span>,
    <span class="token string">&quot;path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;m/44&#39;/0&#39;/0&#39;/0/0&quot;</span>,
    // 私钥
    <span class="token string">&quot;WIF&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;KxHHNDUcBma4ymK2yu2MwzumBRQhb2WwDwYcaBBWXuvvP22bCogu&quot;</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;funding&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bc1phrh5yckajcx4kjstyk595puenntsz24rzf7qaussu9p76rm20vzqknk3hx&quot;</span>,
    <span class="token string">&quot;path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;m/44&#39;/0&#39;/0&#39;/1/0&quot;</span>,
    <span class="token string">&quot;WIF&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;L2e216oagUXtVSCTS3cEb5n2nX2edjuW7zit369Fj6jvTFugrkPW&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>进行其他地址进行转账后，就可以打铭文了，执行命令<code>npm run cli mint-dft pepe</code>。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token operator">&gt;</span> cli
<span class="token operator">&gt;</span> cross-env <span class="token assign-left variable">ELECTRUMX_WSS</span><span class="token operator">=</span>wss://electrumx.atomicals.xyz:50012 <span class="token function">node</span> node_modules/atomicals/dist/cli.js mint-dft pepe

Args <span class="token punctuation">{</span> mint_ticker: <span class="token string">&#39;pepe&#39;</span> <span class="token punctuation">}</span>
Meta undefined
Ctx undefined
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
Mint Interactive FT <span class="token punctuation">(</span>Decentralized<span class="token punctuation">)</span>
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
Atomical type: FUNGIBLE <span class="token punctuation">(</span>decentralized<span class="token punctuation">)</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    name: <span class="token string">&#39;args&#39;</span>,
    contentType: <span class="token string">&#39;object&#39;</span>,
    data: <span class="token punctuation">{</span> mint_ticker: <span class="token string">&#39;pepe&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span> pepe
Mint <span class="token keyword">for</span> ticker:  pepe
<span class="token punctuation">{</span>
  coin: <span class="token string">&#39;Bitcoin&#39;</span>,
  network: <span class="token string">&#39;mainnet&#39;</span>,
  height: <span class="token number">809172</span>,
  block_tip: <span class="token string">&#39;00000000000000000003530198552e0bce3ca2e23f40d0040ec1e84c5da596d0&#39;</span>,
  server_time: <span class="token string">&#39;2023-09-24T16:14:31.764855&#39;</span>,
  atomicals_block_tip: <span class="token string">&#39;42fc0d35eeb1c943510fa71c6126d8afa2fd757d49d7f4a708938b8497a33c97&#39;</span>,
  atomical_count: <span class="token number">5017</span>
<span class="token punctuation">}</span> <span class="token punctuation">{</span>
  // 其他省略
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>查询余额，在钱包下会输出</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Atomical number: <span class="token number">791</span>
Atomical type: FT
Atomical subtype: decentralized
Requested ticker: pepe
Requested ticker status: verified
Ticker: pepe
Confirmed balance: <span class="token number">56000</span>
UTXOs <span class="token keyword">for</span> Atomical: <span class="token number">28</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="广播出错" tabindex="-1"><a class="header-anchor" href="#广播出错" aria-hidden="true">#</a> 广播出错</h2><p>在算力算出结果进行广播的时候会经常网络重试，主要是RPC节点被打满了，当天晚上<code>comeon</code>大佬对代码进行了改造。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token string">&#39;https://blockstream.info/api/tx&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> rawtx<span class="token punctuation">;</span>
config <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/plain&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token literal-property property">response</span><span class="token operator">:</span> AxiosResponse <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> data<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span> <span class="token operator">||</span> response<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">201</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交易已成功广播&#39;</span><span class="token punctuation">,</span> response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    result <span class="token operator">=</span> response<span class="token punctuation">.</span>data
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;广播交易失败:&#39;</span><span class="token punctuation">,</span> response<span class="token punctuation">.</span>status<span class="token punctuation">,</span> response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改广播<code>broadcastWithRetries</code>，效率提高不少。</p><p><img src="`+u+'" alt="An image"></p><h2 id="安全" tabindex="-1"><a class="header-anchor" href="#安全" aria-hidden="true">#</a> 安全</h2>',21),g=s("code",null,"Docker",-1),f={href:"https://github.com/lucky2077/atomicals-image",target:"_blank",rel:"noopener noreferrer"},q=s("code",null,"Dockerfile",-1),_=t('<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>一定在关键时期换节点，不要使用公用节点</li><li>对于算数算的比较久的话，一定要修改源码中的重试次数</li><li>关于utxo一次打完问题，有人在<code>icals</code>上100刀打了一张问题，需要对utxo基础知识深入理解，如何使用utxo解决双花</li><li>关于<code>cpfp加速</code>和<code>RBF</code>加速问题</li><li>惯性思维，在处理自动化的时候误入脚本思维定式，没有第一时间想着改源码</li></ul>',2);function y(x,w){const a=c("ExternalLinkIcon");return p(),l("div",null,[k,s("ul",null,[s("li",null,[s("a",v,[n("推特"),e(a)])]),s("li",null,[s("a",m,[n("Github"),e(a)])]),s("li",null,[s("a",b,[n("npm"),e(a)])])]),h,s("p",null,[n("在运行时审计代码太过耗时，可能会错过行情，一般大家喜欢上云处理，但是上云要解决梯子和安全问题，但是在本地又不放心，这时候使用"),g,n("就是最优选择，因为宿主机器不能拿到外部机器资源。 有老哥在"),s("a",f,[n("Github"),e(a)]),n("上面给了"),q,n("项目，这里就不在改造了。")]),_])}const z=o(d,[["render",y],["__file","atomical.html.vue"]]);export{z as default};
