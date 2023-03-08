import{_ as n,V as s,W as a,a0 as t}from"./framework-e54e0297.js";const p={},e=t(`<h1 id="safepoint" tabindex="-1"><a class="header-anchor" href="#safepoint" aria-hidden="true">#</a> safepoint</h1><h2 id="vmthread" tabindex="-1"><a class="header-anchor" href="#vmthread" aria-hidden="true">#</a> vmThread</h2><p><code>vmThread run()</code>会一直<code>loop</code>任务处理任务，也就是处理<code>Command</code>，<code>inner_execute(_next_vm_operation);</code>支持的命令在<code>vmOperation.hpp</code>会有所体现。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Breakpoint</span> reached<span class="token operator">:</span> vmThread<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">429</span>
<span class="token class-name">Stack</span><span class="token operator">:</span> 
  <span class="token class-name">VMThread</span><span class="token operator">::</span><span class="token function">inner_execute</span><span class="token punctuation">(</span><span class="token class-name">VM_Operation</span><span class="token operator">*</span><span class="token punctuation">)</span> vmThread<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">429</span>
  <span class="token class-name">VMThread</span><span class="token operator">::</span><span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> vmThread<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">496</span>
  <span class="token class-name">VMThread</span><span class="token operator">::</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> vmThread<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">175</span>
  <span class="token class-name">Thread</span><span class="token operator">::</span><span class="token function">call_run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> thread<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">358</span>
  <span class="token function">thread_native_entry</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token operator">*</span><span class="token punctuation">)</span> os_bsd<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">575</span>
  _pthread_start <span class="token number">0x00007ff81a3234f4</span>
  thread_start <span class="token number">0x00007ff81a31f00f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>vmOperation.hpp</code>部分展示</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>#define <span class="token function">VM_OPS_DO</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span>                       \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">None</span><span class="token punctuation">)</span>                                  \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">Cleanup</span><span class="token punctuation">)</span>                               \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">ThreadDump</span><span class="token punctuation">)</span>                            \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">PrintThreads</span><span class="token punctuation">)</span>                          \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">FindDeadlocks</span><span class="token punctuation">)</span>                         \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">ClearICs</span><span class="token punctuation">)</span>                              \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">ForceSafepoint</span><span class="token punctuation">)</span>                        \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">ForceAsyncSafepoint</span><span class="token punctuation">)</span>                   \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">DeoptimizeFrame</span><span class="token punctuation">)</span>                       \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">DeoptimizeAll</span><span class="token punctuation">)</span>                         \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">ZombieAll</span><span class="token punctuation">)</span>                             \\
  <span class="token function">template</span><span class="token punctuation">(</span><span class="token class-name">Verify</span><span class="token punctuation">)</span>                                \\
<span class="token comment">// 其他忽略，请自行查看</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>线程在一直<code>loop</code>时会进行安全点初始化，然后进行自旋转，然后处理<code>command</code>，并且在<code>commad</code>前后设置了安全点开始和关闭，其逻辑是否执行是根据命令是否需要进行的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token class-name">VMThread</span><span class="token operator">::</span><span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果命令为空异常</span>
  <span class="token class-name">SafepointSynchronize</span><span class="token operator">::</span><span class="token function">init</span><span class="token punctuation">(</span>_vm_thread<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 设置当前线程到一些操作上</span>
  cleanup_op<span class="token punctuation">.</span><span class="token function">set_calling_thread</span><span class="token punctuation">(</span>_vm_thread<span class="token punctuation">)</span><span class="token punctuation">;</span>
  safepointALot_op<span class="token punctuation">.</span><span class="token function">set_calling_thread</span><span class="token punctuation">(</span>_vm_thread<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果需要被中断</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">should_terminate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token comment">// 等待操作</span>
    <span class="token function">wait_for_operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">should_terminate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>_next_vm_operation <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Must have one&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">inner_execute</span><span class="token punctuation">(</span>_next_vm_operation<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token class-name">SafepointSynchronize</span><span class="token operator">::</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token operator">*</span> vmthread<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 等待barrier</span>
  _wait_barrier <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WaitBarrier</span><span class="token punctuation">(</span>vmthread<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">SafepointTracing</span><span class="token operator">::</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 设置轨迹开始时间</span>
<span class="token keyword">void</span> <span class="token class-name">SafepointTracing</span><span class="token operator">::</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  _last_safepoint_end_time_ns <span class="token operator">=</span> os<span class="token operator">::</span><span class="token function">javaTimeNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token class-name">VMThread</span><span class="token operator">::</span><span class="token function">wait_for_operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建一个锁这里就是 MonitorLocker ml_op_lock = new MonitorLocker(...)</span>
  <span class="token class-name">MonitorLocker</span> <span class="token function">ml_op_lock</span><span class="token punctuation">(</span><span class="token class-name">VMOperation_lock</span><span class="token punctuation">,</span> <span class="token class-name">Mutex</span><span class="token operator">::</span><span class="token function">_no_safepoint_check_flag</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 清除之前状态</span>
  <span class="token comment">// 在第一次调用时，这会清除一个虚拟占位符，我也不太明白这句话是什么意思</span>
  _next_vm_operation <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
  <span class="token comment">// 通知操作完成，并且唤醒下一个操作可以执行</span>
  ml_op_lock<span class="token punctuation">.</span><span class="token function">notify_all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 还是判断状态，如果线程没被中断，一直循环</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">should_terminate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 必要时销毁线程</span>
    <span class="token function">self_destruct_if_needed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 下一个指令为空跳出自旋</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>_next_vm_operation <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">handshake_alot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token punctuation">{</span>
        <span class="token class-name">MutexUnlocker</span> <span class="token function">mul</span><span class="token punctuation">(</span><span class="token class-name">VMOperation_lock</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HandshakeALotClosure</span> hal_cl<span class="token punctuation">;</span>
        <span class="token class-name">Handshake</span><span class="token operator">::</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hal_cl<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>_next_vm_operation <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 在这里会设置周期</span>
    <span class="token function">setup_periodic_safepoint_if_needed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>_next_vm_operation <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 没发现任何任务需要执行，唤醒后面节点</span>
    ml_op_lock<span class="token punctuation">.</span><span class="token function">notify_all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 等待保证安全点间隔</span>
    ml_op_lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token class-name">GuaranteedSafepointInterval</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">self_destruct_if_needed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 销毁的条件</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">SelfDestructTimer</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token class-name">VMError</span><span class="token operator">::</span><span class="token function">is_error_reported</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token punctuation">(</span>os<span class="token operator">::</span><span class="token function">elapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span><span class="token class-name">SelfDestructTimer</span> <span class="token operator">*</span> <span class="token number">60.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    tty<span class="token operator">-&gt;</span><span class="token function">print_cr</span><span class="token punctuation">(</span><span class="token string">&quot;VM self-destructed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="safepointsynchronize" tabindex="-1"><a class="header-anchor" href="#safepointsynchronize" aria-hidden="true">#</a> SafepointSynchronize</h2><h3 id="inner-execute" tabindex="-1"><a class="header-anchor" href="#inner-execute" aria-hidden="true">#</a> inner_execute</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token class-name">VMThread</span><span class="token operator">::</span><span class="token function">inner_execute</span><span class="token punctuation">(</span><span class="token class-name">VM_Operation</span><span class="token operator">*</span> op<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token operator">::</span><span class="token function">current</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">is_VM_thread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Must be the VM thread&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token class-name">VM_Operation</span><span class="token operator">*</span> prev_vm_operation <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>_cur_vm_operation <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>_cur_vm_operation<span class="token operator">-&gt;</span><span class="token function">allow_nested_vm_operations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">fatal</span><span class="token punctuation">(</span><span class="token string">&quot;Unexpected nested VM operation %s requested by operation %s&quot;</span><span class="token punctuation">,</span>
            op<span class="token operator">-&gt;</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> _cur_vm_operation<span class="token operator">-&gt;</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    op<span class="token operator">-&gt;</span><span class="token function">set_calling_thread</span><span class="token punctuation">(</span>_cur_vm_operation<span class="token operator">-&gt;</span><span class="token function">calling_thread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    prev_vm_operation <span class="token operator">=</span> _cur_vm_operation<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  _cur_vm_operation <span class="token operator">=</span> op<span class="token punctuation">;</span>

  <span class="token class-name">HandleMark</span> <span class="token function">hm</span><span class="token punctuation">(</span><span class="token class-name">VMThread</span><span class="token operator">::</span><span class="token function">vm_thread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">EventMarkVMOperation</span> <span class="token function">em</span><span class="token punctuation">(</span><span class="token string">&quot;Executing %sVM operation: %s&quot;</span><span class="token punctuation">,</span> prev_vm_operation <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token operator">?</span> <span class="token string">&quot;nested &quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> op<span class="token operator">-&gt;</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">log_debug</span><span class="token punctuation">(</span>vmthread<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">&quot;Evaluating %s %s VM operation: %s&quot;</span><span class="token punctuation">,</span>
                       prev_vm_operation <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token operator">?</span> <span class="token string">&quot;nested&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                      _cur_vm_operation<span class="token operator">-&gt;</span><span class="token function">evaluate_at_safepoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">&quot;safepoint&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;non-safepoint&quot;</span><span class="token punctuation">,</span>
                      _cur_vm_operation<span class="token operator">-&gt;</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 上面是一系列的基础校验</span>
  bool end_safepoint <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  bool has_timeout_task <span class="token operator">=</span> <span class="token punctuation">(</span>_timeout_task <span class="token operator">!=</span> nullptr<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 在这路使用了一个环绕，类似切面，根据command指令类型判断是否需要开启该切面</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>_cur_vm_operation<span class="token operator">-&gt;</span><span class="token function">evaluate_at_safepoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span><span class="token class-name">SafepointSynchronize</span><span class="token operator">::</span><span class="token function">is_at_safepoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SafepointSynchronize</span><span class="token operator">::</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>has_timeout_task<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      _timeout_task<span class="token operator">-&gt;</span><span class="token function">arm</span><span class="token punctuation">(</span>_cur_vm_operation<span class="token operator">-&gt;</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    end_safepoint <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">evaluate_operation</span><span class="token punctuation">(</span>_cur_vm_operation<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 安全点关闭</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>end_safepoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>has_timeout_task<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      _timeout_task<span class="token operator">-&gt;</span><span class="token function">disarm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">SafepointSynchronize</span><span class="token operator">::</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  _cur_vm_operation <span class="token operator">=</span> prev_vm_operation<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="begin" tabindex="-1"><a class="header-anchor" href="#begin" aria-hidden="true">#</a> begin</h3><p>将所有线程向前滚动到安全点。必须由<code>VMThread</code>调用。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token class-name">SafepointSynchronize</span><span class="token operator">::</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 必须由 VMThread 调用。</span>
  <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token operator">::</span><span class="token function">current</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">is_VM_thread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Only VM thread may execute a safepoint&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">EventSafepointBegin</span> begin_event<span class="token punctuation">;</span>
  <span class="token comment">// 根据类型进行归集追踪</span>
  <span class="token class-name">SafepointTracing</span><span class="token operator">::</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token class-name">VMThread</span><span class="token operator">::</span><span class="token function">vm_op_type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 安全点开始</span>
  <span class="token class-name">Universe</span><span class="token operator">::</span><span class="token function">heap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">safepoint_synchronize_begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 通过获取 Threads_lock，我们确保没有线程将要启动或退出。它在 SafepointSynchronize::end() 中再次释放。</span>
  <span class="token class-name">Threads_lock</span><span class="token operator">-&gt;</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 获取所有线程数量</span>
  <span class="token keyword">int</span> nof_threads <span class="token operator">=</span> <span class="token class-name">Threads</span><span class="token operator">::</span><span class="token function">number_of_threads</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  _nof_threads_hit_polling_page <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token comment">// 重置活动 JNI 关键线程的计数</span>
  _current_jni_active_count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token comment">// 设置要等待的线程数</span>
  _waiting_to_block <span class="token operator">=</span> nof_threads<span class="token punctuation">;</span>

  jlong safepoint_limit_time <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">SafepointTimeout</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 设置限制时间，以便进行比较，看看这是否花费了太长时间才能完成。</span>
    safepoint_limit_time <span class="token operator">=</span> <span class="token class-name">SafepointTracing</span><span class="token operator">::</span><span class="token function">start_of_safepoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>jlong<span class="token punctuation">)</span><span class="token class-name">SafepointTimeoutDelay</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token constant">NANOUNITS</span> <span class="token operator">/</span> <span class="token constant">MILLIUNITS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    timeout_error_printed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">EventSafepointStateSynchronization</span> sync_event<span class="token punctuation">;</span>
  <span class="token keyword">int</span> initial_running <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token function">arm_safepoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 将旋转直到所有线程都安全。</span>
  <span class="token keyword">int</span> iterations <span class="token operator">=</span> <span class="token function">synchronize_threads</span><span class="token punctuation">(</span>safepoint_limit_time<span class="token punctuation">,</span> nof_threads<span class="token punctuation">,</span> <span class="token operator">&amp;</span>initial_running<span class="token punctuation">)</span><span class="token punctuation">;</span>

#ifndef <span class="token class-name">PRODUCT</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">VerifyCrossModifyFence</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JavaThreadIteratorWithHandle</span> jtiwh<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> <span class="token class-name">JavaThread</span> <span class="token operator">*</span>cur <span class="token operator">=</span> jtiwh<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      cur<span class="token operator">-&gt;</span><span class="token function">set_requires_cross_modify_fence</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
#endif
  <span class="token comment">// 记录状态</span>
  _state <span class="token operator">=</span> _synchronized<span class="token punctuation">;</span>
  <span class="token class-name">OrderAccess</span><span class="token operator">::</span><span class="token function">fence</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">++</span>_safepoint_id<span class="token punctuation">;</span>

#ifdef <span class="token class-name">ASSERT</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">JavaThreadIteratorWithHandle</span> jtiwh<span class="token punctuation">;</span> <span class="token class-name">JavaThread</span> <span class="token operator">*</span>cur <span class="token operator">=</span> jtiwh<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>cur<span class="token operator">-&gt;</span><span class="token function">was_visited_for_critical_count</span><span class="token punctuation">(</span>_safepoint_counter<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;missed a thread&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
#endif <span class="token comment">// ASSERT</span>
  <span class="token class-name">GCLocker</span><span class="token operator">::</span><span class="token function">set_jni_lock_count</span><span class="token punctuation">(</span>_current_jni_active_count<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">post_safepoint_synchronize_event</span><span class="token punctuation">(</span>sync_event<span class="token punctuation">,</span>
                                   _safepoint_id<span class="token punctuation">,</span>
                                   initial_running<span class="token punctuation">,</span>
                                   _waiting_to_block<span class="token punctuation">,</span> iterations<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token class-name">SafepointTracing</span><span class="token operator">::</span><span class="token keyword">synchronized</span><span class="token punctuation">(</span>nof_threads<span class="token punctuation">,</span> initial_running<span class="token punctuation">,</span> _nof_threads_hit_polling_page<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">EventSafepointCleanup</span> cleanup_event<span class="token punctuation">;</span>
  <span class="token function">do_cleanup_tasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">post_safepoint_cleanup_event</span><span class="token punctuation">(</span>cleanup_event<span class="token punctuation">,</span> _safepoint_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">post_safepoint_begin_event</span><span class="token punctuation">(</span>begin_event<span class="token punctuation">,</span> _safepoint_id<span class="token punctuation">,</span> nof_threads<span class="token punctuation">,</span> _current_jni_active_count<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">SafepointTracing</span><span class="token operator">::</span><span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主动式中断的思想是当垃圾收集需要中断线程的时候，不直接对线程操作，仅仅简单地设置一个标志位，对应的代码为<code>arm_safepoint()</code></p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> SafepointSynchronize<span class="token operator">::</span><span class="token function">arm_safepoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 开始将系统带到安全点的过程。 Java 线程可以处于几种不同的状态，并被不同的机制停止：</span>
  <span class="token comment">//  1. 运行中断 当执行分支返回字节码解释器检查轮询是否被中断，如果是在 SS::block() 中的块。</span>
  <span class="token comment">//  2. 在本机代码中运行当从本机代码返回时，Java线程必须检查安全点_state以查看是否必须阻塞。如果 VM 线程在本机中看到 Java 线程，它不会等待该线程阻塞。安全点状态和 Java 线程状态的内存写入和读取顺序至关重要。为了保证内存写入相对于彼此串行化，VM线程发出内存屏障指令</span>
  <span class="token comment">//  3. 运行编译的代码  如果我们试图到达安全点，编译后的代码会读取设置为错误的本地轮询页面。</span>
  <span class="token comment">//  4. 阻塞 在安全点操作完成之前，被阻塞的线程将不允许从阻塞状态返回。</span>
  <span class="token comment">//  5. 如果 Java 线程当前正在 VM 中运行或在状态之间转换，则安全点代码将轮询线程状态，直到线程在尝试转换到新状态或锁定安全点检查监视器时自行阻塞。</span>
 
  <span class="token comment">// 设置屏障信号</span>
  _wait_barrier<span class="token operator">-&gt;</span><span class="token function">arm</span><span class="token punctuation">(</span>static_cast<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>_safepoint_counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  Atomic<span class="token operator">::</span><span class="token function">release_store</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>_safepoint_counter<span class="token punctuation">,</span> _safepoint_counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  OrderAccess<span class="token operator">::</span><span class="token function">storestore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Ordered with _safepoint_counter</span>
  _state <span class="token operator">=</span> _synchronizing<span class="token punctuation">;</span>

  OrderAccess<span class="token operator">::</span><span class="token function">storestore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// storestore, global state -&gt; local state</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>JavaThreadIteratorWithHandle jtiwh<span class="token punctuation">;</span> JavaThread <span class="token operator">*</span>cur <span class="token operator">=</span> jtiwh<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Make sure the threads start polling, it is time to yield.</span>
    SafepointMechanism<span class="token operator">::</span><span class="token function">arm_local_poll</span><span class="token punctuation">(</span>cur<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  OrderAccess<span class="token operator">::</span><span class="token function">fence</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// storestore|storeload, global state -&gt; local state</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待所有线程都在安全点，代码可以查看<code>synchronize_threads(safepoint_limit_time, nof_threads, &amp;initial_running)</code></p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> SafepointSynchronize<span class="token operator">::</span><span class="token function">synchronize_threads</span><span class="token punctuation">(</span>jlong safepoint_limit_time<span class="token punctuation">,</span> <span class="token keyword">int</span> nof_threads<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> initial_running<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  JavaThreadIteratorWithHandle jtiwh<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">ASSERT</span></span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> JavaThread <span class="token operator">*</span>cur <span class="token operator">=</span> jtiwh<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>cur<span class="token operator">-&gt;</span><span class="token function">safepoint_state</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">is_running</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Illegal initial state&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  jtiwh<span class="token punctuation">.</span><span class="token function">rewind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">// ASSERT</span></span>
  <span class="token comment">// 如果没有线程仍在运行，我们已经完成了。</span>
  <span class="token keyword">int</span> still_running <span class="token operator">=</span> nof_threads<span class="token punctuation">;</span>
  ThreadSafepointState <span class="token operator">*</span>tss_head <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
  ThreadSafepointState <span class="token operator">*</span><span class="token operator">*</span>p_prev <span class="token operator">=</span> <span class="token operator">&amp;</span>tss_head<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> JavaThread <span class="token operator">*</span>cur <span class="token operator">=</span> jtiwh<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ThreadSafepointState <span class="token operator">*</span>cur_tss <span class="token operator">=</span> cur<span class="token operator">-&gt;</span><span class="token function">safepoint_state</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>cur_tss<span class="token operator">-&gt;</span><span class="token function">get_next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Must be NULL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">thread_not_running</span><span class="token punctuation">(</span>cur_tss<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token operator">--</span>still_running<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token operator">*</span>p_prev <span class="token operator">=</span> cur_tss<span class="token punctuation">;</span>
      p_prev <span class="token operator">=</span> cur_tss<span class="token operator">-&gt;</span><span class="token function">next_ptr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token operator">*</span>p_prev <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
  <span class="token function">DEBUG_ONLY</span><span class="token punctuation">(</span><span class="token function">assert_list_is_valid</span><span class="token punctuation">(</span>tss_head<span class="token punctuation">,</span> still_running<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">)</span>
  <span class="token operator">*</span>initial_running <span class="token operator">=</span> still_running<span class="token punctuation">;</span>
  <span class="token comment">// 如果没有线程仍在运行，我们已经完成了</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>still_running <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>tss_head <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Must be empty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 迭代了多少次</span>
  <span class="token keyword">int</span> iterations <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// The first iteration is above.</span>
  <span class="token class-name">int64_t</span> start_time <span class="token operator">=</span> os<span class="token operator">::</span><span class="token function">javaTimeNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>SafepointTimeout <span class="token operator">&amp;&amp;</span> safepoint_limit_time <span class="token operator">&lt;</span> os<span class="token operator">::</span><span class="token function">javaTimeNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">print_safepoint_timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    p_prev <span class="token operator">=</span> <span class="token operator">&amp;</span>tss_head<span class="token punctuation">;</span>
    ThreadSafepointState <span class="token operator">*</span>cur_tss <span class="token operator">=</span> tss_head<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>cur_tss <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">assert</span><span class="token punctuation">(</span>cur_tss<span class="token operator">-&gt;</span><span class="token function">is_running</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Illegal initial state&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">thread_not_running</span><span class="token punctuation">(</span>cur_tss<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token operator">--</span>still_running<span class="token punctuation">;</span>
        <span class="token operator">*</span>p_prev <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        ThreadSafepointState <span class="token operator">*</span>tmp <span class="token operator">=</span> cur_tss<span class="token punctuation">;</span>
        cur_tss <span class="token operator">=</span> cur_tss<span class="token operator">-&gt;</span><span class="token function">get_next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tmp<span class="token operator">-&gt;</span><span class="token function">set_next</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token operator">*</span>p_prev <span class="token operator">=</span> cur_tss<span class="token punctuation">;</span>
        p_prev <span class="token operator">=</span> cur_tss<span class="token operator">-&gt;</span><span class="token function">next_ptr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cur_tss <span class="token operator">=</span> cur_tss<span class="token operator">-&gt;</span><span class="token function">get_next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">DEBUG_ONLY</span><span class="token punctuation">(</span><span class="token function">assert_list_is_valid</span><span class="token punctuation">(</span>tss_head<span class="token punctuation">,</span> still_running<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>still_running <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">back_off</span><span class="token punctuation">(</span>start_time<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    iterations<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token comment">// 如果运行线程大于0，一直loop</span>
  <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>still_running <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">assert</span><span class="token punctuation">(</span>tss_head <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Must be empty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> iterations<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="end" tabindex="-1"><a class="header-anchor" href="#end" aria-hidden="true">#</a> end</h3><p>重新启动所有挂起的线程</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>void SafepointSynchronize::end() {
  // 必须由 VMThread 调用。
  assert(Threads_lock-&gt;owned_by_self(), &quot;must hold Threads_lock&quot;);
  EventSafepointEnd event;
  assert(Thread::current()-&gt;is_VM_thread(), &quot;Only VM thread can execute a safepoint&quot;);

  disarm_safepoint();

  Universe::heap()-&gt;safepoint_synchronize_end();

  SafepointTracing::end();
  // 发送安全点结束事件
  post_safepoint_end_event(event, safepoint_id());
}

void SafepointSynchronize::disarm_safepoint() {
  uint64_t active_safepoint_counter = _safepoint_counter;
  {
    JavaThreadIteratorWithHandle jtiwh;
#ifdef ASSERT
    for (; JavaThread *cur = jtiwh.next(); ) {
      assert (!(cur-&gt;has_pending_exception() &amp;&amp;
                cur-&gt;safepoint_state()-&gt;is_at_poll_safepoint()),
              &quot;safepoint installed a pending exception&quot;);
    }
#endif // ASSERT
    OrderAccess::fence(); // keep read and write of _state from floating up
    assert(_state == _synchronized, &quot;must be synchronized before ending safepoint synchronization&quot;);

    // Change state first to _not_synchronized.
    // No threads should see _synchronized when running.
    _state = _not_synchronized;

    // Set the next dormant (even) safepoint id.
    assert((_safepoint_counter &amp; 0x1) == 1, &quot;must be odd&quot;);
    Atomic::release_store(&amp;_safepoint_counter, _safepoint_counter + 1);

    OrderAccess::fence(); // Keep the local state from floating up.

    jtiwh.rewind();
    for (; JavaThread *current = jtiwh.next(); ) {
      // Clear the visited flag to ensure that the critical counts are collected properly.
      DEBUG_ONLY(current-&gt;reset_visited_for_critical_count(active_safepoint_counter);)
      ThreadSafepointState* cur_state = current-&gt;safepoint_state();
      assert(!cur_state-&gt;is_running(), &quot;Thread not suspended at safepoint&quot;);
      cur_state-&gt;restart(); // TSS _running
      assert(cur_state-&gt;is_running(), &quot;safepoint state has not been reset&quot;);
    }
  } // ~JavaThreadIteratorWithHandle

  // 释放线程锁，这样线程就可以被再次创建销毁
  Threads_lock-&gt;unlock();

  // 在安全点的线程被唤醒
  _wait_barrier-&gt;disarm();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>安全点开启使用了锁机制，开启后设置标记位，等待线程进入安全点。</p>`,23),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","safepoint.html.vue"]]);export{r as default};
