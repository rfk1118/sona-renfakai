import{_ as n,V as s,W as a,a0 as e}from"./framework-e54e0297.js";const t={},i=e(`<h1 id="_8e55" tabindex="-1"><a class="header-anchor" href="#_8e55" aria-hidden="true">#</a> 8e55</h1><h2 id="代码解析" tabindex="-1"><a class="header-anchor" href="#代码解析" aria-hidden="true">#</a> 代码解析</h2><div class="language-sol line-numbers-mode" data-ext="sol"><pre class="language-sol"><code><span class="token comment">// SPDX-License-Identifier: AGPL-3.0</span>
<span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.0</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&quot;openzeppelin/token/ERC20/IERC20.sol&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&quot;openzeppelin/access/Ownable.sol&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&quot;openzeppelin/utils/math/SafeMath.sol&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&quot;aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&quot;aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol&quot;</span><span class="token punctuation">;</span>


<span class="token keyword">interface</span> <span class="token class-name">IWETH</span> <span class="token keyword">is</span> IERC20 <span class="token punctuation">{</span>
    <span class="token comment">// weth存款</span>
    <span class="token keyword">function</span> <span class="token function">deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">payable</span><span class="token punctuation">;</span>
    <span class="token comment">// 取款</span>
    <span class="token keyword">function</span> <span class="token function">withdraw</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">IUniswapV2Pair</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取代币对</span>
    <span class="token keyword">function</span> <span class="token function">getReserves</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint112</span> reserve0<span class="token punctuation">,</span> <span class="token builtin">uint112</span> reserve1<span class="token punctuation">,</span> <span class="token builtin">uint32</span> blockTimestampLast<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 进行swap</span>
    <span class="token keyword">function</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token builtin">uint</span> amount0Out<span class="token punctuation">,</span> <span class="token builtin">uint</span> amount1Out<span class="token punctuation">,</span> <span class="token builtin">address</span> to<span class="token punctuation">,</span> <span class="token builtin">bytes</span> <span class="token keyword">calldata</span> data<span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">token0</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">token1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 代币对数据</span>
<span class="token keyword">interface</span> <span class="token class-name">IPairReserves</span><span class="token punctuation">{</span>
     <span class="token keyword">struct</span> <span class="token class-name">PairReserves</span> <span class="token punctuation">{</span>
        <span class="token builtin">uint256</span> reserve0<span class="token punctuation">;</span>
        <span class="token builtin">uint256</span> reserve1<span class="token punctuation">;</span>
        <span class="token builtin">uint256</span> price<span class="token punctuation">;</span>
        <span class="token builtin">bool</span> isWETHZero<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 闪电贷池子</span>
<span class="token keyword">interface</span> <span class="token class-name">ILendingPool</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> flashLoan <span class="token punctuation">(</span>
        <span class="token builtin">address</span> _receiver<span class="token punctuation">,</span>
        <span class="token builtin">address</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> _assets<span class="token punctuation">,</span>
        <span class="token builtin">uint256</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> _amounts<span class="token punctuation">,</span>
        <span class="token builtin">uint256</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> _modes<span class="token punctuation">,</span>
        <span class="token builtin">address</span> _onBehalfOf<span class="token punctuation">,</span>
        <span class="token builtin">bytes</span> <span class="token keyword">memory</span> _params<span class="token punctuation">,</span>
        <span class="token builtin">uint16</span> _referralCode<span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">contract</span> <span class="token class-name">BlindBackrun</span> <span class="token keyword">is</span> Ownable<span class="token punctuation">,</span> FlashLoanSimpleReceiverBase <span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token class-name">SafeMath</span> <span class="token keyword">for</span> <span class="token builtin">uint256</span><span class="token punctuation">;</span>
    <span class="token builtin">uint256</span> uniswappyFee <span class="token operator">=</span> <span class="token number">997</span><span class="token punctuation">;</span>
    ILendingPool <span class="token keyword">public</span> lendingPool<span class="token punctuation">;</span>
    <span class="token builtin">address</span> <span class="token keyword">public</span> immutable WETH_ADDRESS<span class="token punctuation">;</span>
    <span class="token comment">// 闪电贷池子</span>
    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token builtin">address</span> _wethAddress<span class="token punctuation">,</span> <span class="token builtin">address</span> _addressProvider<span class="token punctuation">)</span>
        <span class="token function">Ownable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">FlashLoanSimpleReceiverBase</span><span class="token punctuation">(</span><span class="token function">IPoolAddressesProvider</span><span class="token punctuation">(</span>_addressProvider<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        WETH_ADDRESS <span class="token operator">=</span> _wethAddress<span class="token punctuation">;</span>
        lendingPool <span class="token operator">=</span> <span class="token function">ILendingPool</span><span class="token punctuation">(</span><span class="token function">IPoolAddressesProvider</span><span class="token punctuation">(</span>_addressProvider<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 执行闪电贷</span>
    <span class="token comment">// Function to execute a flash loan</span>
    <span class="token keyword">function</span> <span class="token function">executeFlashLoan</span><span class="token punctuation">(</span>
        <span class="token builtin">address</span> _asset<span class="token punctuation">,</span>
        <span class="token builtin">uint256</span> _amount<span class="token punctuation">,</span>
        <span class="token builtin">address</span> firstPairAddress<span class="token punctuation">,</span>
        <span class="token builtin">address</span> secondPairAddress<span class="token punctuation">,</span>
        <span class="token builtin">uint</span> percentageToPayToCoinbase
    <span class="token punctuation">)</span> <span class="token keyword">external</span> onlyOwner <span class="token punctuation">{</span>
        <span class="token comment">// 接收贷款地址</span>
        <span class="token builtin">address</span> receiverAddress <span class="token operator">=</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 贷款的token</span>
        <span class="token builtin">address</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> assets <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">address</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        assets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> _asset<span class="token punctuation">;</span>
        <span class="token comment">// 贷款数量</span>
        <span class="token builtin">uint256</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> amounts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">uint256</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        amounts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> _amount<span class="token punctuation">;</span>
        <span class="token comment">// 贷款模式</span>
        <span class="token builtin">uint256</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> modes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">uint256</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        modes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 0 = no debt, 1 = stable, 2 = variable</span>

        <span class="token builtin">address</span> onBehalfOf <span class="token operator">=</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 对地址进行加密</span>
        <span class="token builtin">bytes</span> <span class="token keyword">memory</span> params <span class="token operator">=</span> abi<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>firstPairAddress<span class="token punctuation">,</span> secondPairAddress<span class="token punctuation">,</span> percentageToPayToCoinbase<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">uint16</span> referralCode <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        lendingPool<span class="token punctuation">.</span><span class="token function">flashLoan</span><span class="token punctuation">(</span>
            receiverAddress<span class="token punctuation">,</span>
            assets<span class="token punctuation">,</span>
            amounts<span class="token punctuation">,</span>
            modes<span class="token punctuation">,</span>
            onBehalfOf<span class="token punctuation">,</span>
            params<span class="token punctuation">,</span>
            referralCode
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Override this function from FlashLoanSimpleReceiverBase to specify what happens when you receive the flash loan</span>
    <span class="token keyword">function</span> <span class="token function">executeOperation</span><span class="token punctuation">(</span>
        <span class="token builtin">address</span> asset<span class="token punctuation">,</span>
        <span class="token builtin">uint256</span> amount<span class="token punctuation">,</span>
        <span class="token builtin">uint256</span> premium<span class="token punctuation">,</span>
        <span class="token builtin">address</span> initiator<span class="token punctuation">,</span>
        <span class="token builtin">bytes</span> <span class="token keyword">calldata</span> params
    <span class="token punctuation">)</span> <span class="token keyword">external</span> override <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Ensure the loan is for the correct asset and is sent from the LendingPool</span>
        <span class="token comment">// 确保贷款从正确的token的池子</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>sender <span class="token operator">==</span> <span class="token builtin">address</span><span class="token punctuation">(</span>lendingPool<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Invalid sender&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 保证池子数量大于贷款数量</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token function">IERC20</span><span class="token punctuation">(</span>asset<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> amount<span class="token punctuation">,</span> <span class="token string">&quot;Did not receive loan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Decode the params and execute the arbitrage</span>
        <span class="token comment">// 解密获取两个池子地址</span>
        <span class="token punctuation">(</span><span class="token builtin">address</span> firstPairAddress<span class="token punctuation">,</span> <span class="token builtin">address</span> secondPairAddress<span class="token punctuation">,</span> <span class="token builtin">uint</span> percentageToPayToCoinbase<span class="token punctuation">)</span> <span class="token operator">=</span> abi<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>params<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">,</span> <span class="token builtin">address</span><span class="token punctuation">,</span> <span class="token builtin">uint</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">executeArbitrage</span><span class="token punctuation">(</span>firstPairAddress<span class="token punctuation">,</span> secondPairAddress<span class="token punctuation">,</span> percentageToPayToCoinbase<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">// 计算还款</span>
        <span class="token comment">// Calculate amount to repay, which is the loan amount plus the premium</span>
        <span class="token builtin">uint256</span> totalDebt <span class="token operator">=</span> amount<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>premium<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 还款给池子</span>
        <span class="token comment">// Transfer funds back to repay the flash loan</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token function">IERC20</span><span class="token punctuation">(</span>asset<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">transferFrom</span><span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">address</span><span class="token punctuation">(</span>lendingPool<span class="token punctuation">)</span><span class="token punctuation">,</span> totalDebt<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Failed to repay loan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/// @notice Executes an arbitrage transaction between two Uniswap V2 pairs.</span>
    <span class="token comment">/// @notice Pair addresses need to be computed off-chain.</span>
    <span class="token comment">/// @dev Only the contract owner can call this function.</span>
    <span class="token comment">/// @param firstPairAddress Address of the first Uniswap V2 pair.</span>
    <span class="token comment">/// @param secondPairAddress Address of the second Uniswap V2 pair.</span>
    <span class="token keyword">function</span> <span class="token function">executeArbitrage</span><span class="token punctuation">(</span>
        <span class="token builtin">address</span> firstPairAddress<span class="token punctuation">,</span>
        <span class="token builtin">address</span> secondPairAddress<span class="token punctuation">,</span>
        <span class="token builtin">uint</span> percentageToPayToCoinbase
    <span class="token punctuation">)</span> <span class="token keyword">internal</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取到之前有多少weth</span>
        <span class="token builtin">uint256</span> balanceBefore <span class="token operator">=</span> <span class="token function">IERC20</span><span class="token punctuation">(</span>WETH_ADDRESS<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 第一个池子</span>
        IUniswapV2Pair firstPair <span class="token operator">=</span> <span class="token function">IUniswapV2Pair</span><span class="token punctuation">(</span>firstPairAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 第二个池子</span>
        IUniswapV2Pair secondPair <span class="token operator">=</span> <span class="token function">IUniswapV2Pair</span><span class="token punctuation">(</span>secondPairAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 池子数据</span>
        IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span> firstPairData <span class="token operator">=</span> <span class="token function">getPairData</span><span class="token punctuation">(</span>firstPair<span class="token punctuation">)</span><span class="token punctuation">;</span>
        IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span> secondPairData <span class="token operator">=</span> <span class="token function">getPairData</span><span class="token punctuation">(</span>secondPair<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获取借贷数量</span>
        <span class="token builtin">uint256</span> amountIn <span class="token operator">=</span> <span class="token function">getAmountIn</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">,</span> secondPairData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 转移给第一个池子特定数量</span>
        <span class="token function">IERC20</span><span class="token punctuation">(</span>WETH_ADDRESS<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>firstPairAddress<span class="token punctuation">,</span> amountIn<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token builtin">uint256</span> firstPairAmountOut<span class="token punctuation">;</span>
        <span class="token builtin">uint256</span> finalAmountOut<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>isWETHZero <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 获取可以换出来的数量</span>
            firstPairAmountOut <span class="token operator">=</span> <span class="token function">getAmountOut</span><span class="token punctuation">(</span>amountIn<span class="token punctuation">,</span> firstPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">,</span> firstPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            finalAmountOut <span class="token operator">=</span> <span class="token function">getAmountOut</span><span class="token punctuation">(</span>firstPairAmountOut<span class="token punctuation">,</span> secondPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">,</span> secondPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span><span class="token punctuation">;</span>

            firstPair<span class="token punctuation">.</span><span class="token function">swap</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> firstPairAmountOut<span class="token punctuation">,</span> secondPairAddress<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            secondPair<span class="token punctuation">.</span><span class="token function">swap</span><span class="token punctuation">(</span>finalAmountOut<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            firstPairAmountOut <span class="token operator">=</span> <span class="token function">getAmountOut</span><span class="token punctuation">(</span>amountIn<span class="token punctuation">,</span> firstPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">,</span> firstPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span><span class="token punctuation">;</span>
            finalAmountOut <span class="token operator">=</span> <span class="token function">getAmountOut</span><span class="token punctuation">(</span>firstPairAmountOut<span class="token punctuation">,</span> secondPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">,</span> secondPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span><span class="token punctuation">;</span>

            firstPair<span class="token punctuation">.</span><span class="token function">swap</span><span class="token punctuation">(</span>firstPairAmountOut<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> secondPairAddress<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            secondPair<span class="token punctuation">.</span><span class="token function">swap</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> finalAmountOut<span class="token punctuation">,</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 获取套利后的金额</span>
        <span class="token builtin">uint256</span> balanceAfter <span class="token operator">=</span> <span class="token function">IERC20</span><span class="token punctuation">(</span>WETH_ADDRESS<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 保证赚钱了</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>balanceAfter <span class="token operator">&gt;</span> balanceBefore<span class="token punctuation">,</span> <span class="token string">&quot;Arbitrage failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 赚钱比例</span>
        <span class="token builtin">uint</span> profit <span class="token operator">=</span> balanceAfter<span class="token punctuation">.</span><span class="token function">sub</span><span class="token punctuation">(</span>balanceBefore<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 赚钱比例给矿工</span>
        <span class="token builtin">uint</span> profitToCoinbase <span class="token operator">=</span> profit<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>percentageToPayToCoinbase<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 提款给矿工</span>
        <span class="token function">IWETH</span><span class="token punctuation">(</span>WETH_ADDRESS<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withdraw</span><span class="token punctuation">(</span>profitToCoinbase<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 转账给矿工</span>
        block<span class="token punctuation">.</span>coinbase<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>profitToCoinbase<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/// @notice Calculates the required input amount for the arbitrage transaction.</span>
    <span class="token comment">/// @param firstPairData Struct containing data about the first Uniswap V2 pair.</span>
    <span class="token comment">/// @param secondPairData Struct containing data about the second Uniswap V2 pair.</span>
    <span class="token comment">/// @return amountIn, the optimal amount to trade to arbitrage two v2 pairs.</span>
    <span class="token keyword">function</span> <span class="token function">getAmountIn</span><span class="token punctuation">(</span>
        IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span> firstPairData<span class="token punctuation">,</span>
        IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span> secondPairData
    <span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint256</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">uint256</span> numerator <span class="token operator">=</span> <span class="token function">getNumerator</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">,</span> secondPairData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">uint256</span> denominator <span class="token operator">=</span> <span class="token function">getDenominator</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">,</span> secondPairData<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token builtin">uint256</span> amountIn <span class="token operator">=</span>
            numerator
            <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span>denominator<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> amountIn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">getNumerator</span><span class="token punctuation">(</span>
        IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span> firstPairData<span class="token punctuation">,</span>
        IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span> secondPairData
    <span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">view</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint256</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>isWETHZero <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">uint</span> presqrt <span class="token operator">=</span>
                uniswappyFee
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>uniswappyFee<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>secondPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span>secondPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token builtin">uint256</span> numerator <span class="token operator">=</span>
            <span class="token punctuation">(</span>
                <span class="token function">sqrt</span><span class="token punctuation">(</span>presqrt<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">sub</span><span class="token punctuation">(</span><span class="token number">1e3</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>secondPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> numerator<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token builtin">uint</span> presqrt <span class="token operator">=</span>
                uniswappyFee
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>uniswappyFee<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>secondPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span>secondPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token builtin">uint256</span> numerator <span class="token operator">=</span>
            <span class="token punctuation">(</span>
                <span class="token function">sqrt</span><span class="token punctuation">(</span>presqrt<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">sub</span><span class="token punctuation">(</span><span class="token number">1e3</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>secondPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> numerator<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 这个算法是什么？</span>
    <span class="token keyword">function</span> <span class="token function">getDenominator</span><span class="token punctuation">(</span>
            IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span> firstPairData<span class="token punctuation">,</span>
            IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span> secondPairData
        <span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint256</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>isWETHZero <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">uint256</span> denominator <span class="token operator">=</span>
                <span class="token punctuation">(</span>
                    uniswappyFee
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>secondPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
                    uniswappyFee
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>uniswappyFee<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>reserve1<span class="token punctuation">)</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> denominator<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token builtin">uint256</span> denominator <span class="token operator">=</span>
                <span class="token punctuation">(</span>
                    uniswappyFee
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>secondPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
                    uniswappyFee
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>uniswappyFee<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>firstPairData<span class="token punctuation">.</span>reserve0<span class="token punctuation">)</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> denominator<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/// @notice Retrieves price and reserve data for a given Uniswap V2 pair. Also checks which token is WETH.</span>
    <span class="token comment">/// @param pair The Uniswap V2 pair to retrieve data for.</span>
    <span class="token comment">/// @return A PairReserves struct containing price and reserve data for the given pair.</span>
    <span class="token comment">// 获取代币对数据</span>
    <span class="token keyword">function</span> <span class="token function">getPairData</span><span class="token punctuation">(</span>IUniswapV2Pair pair<span class="token punctuation">)</span> <span class="token keyword">private</span> <span class="token keyword">view</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span>IPairReserves<span class="token punctuation">.</span>PairReserves <span class="token keyword">memory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">(</span><span class="token builtin">uint256</span> reserve0<span class="token punctuation">,</span> <span class="token builtin">uint256</span> reserve1<span class="token punctuation">,</span> <span class="token punctuation">)</span> <span class="token operator">=</span> pair<span class="token punctuation">.</span><span class="token function">getReserves</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">uint256</span> price<span class="token punctuation">;</span>

        <span class="token builtin">bool</span> isWETHZero <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pair<span class="token punctuation">.</span><span class="token function">token0</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> WETH_ADDRESS<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            price <span class="token operator">=</span> reserve1<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span><span class="token number">1e18</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span>reserve0<span class="token punctuation">)</span><span class="token punctuation">;</span>
            isWETHZero <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            price <span class="token operator">=</span> reserve0<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span><span class="token number">1e18</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span>reserve1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> IPairReserves<span class="token punctuation">.</span><span class="token function">PairReserves</span><span class="token punctuation">(</span>reserve0<span class="token punctuation">,</span> reserve1<span class="token punctuation">,</span> price<span class="token punctuation">,</span> isWETHZero<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/// @notice Calculates the square root of a given number.</span>
    <span class="token comment">/// @param x: The number to calculate the square root of.</span>
    <span class="token comment">/// @return y: The square root of the given number.</span>
    <span class="token keyword">function</span> <span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> x<span class="token punctuation">)</span> <span class="token keyword">private</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint256</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token builtin">uint256</span> z <span class="token operator">=</span> x<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">uint256</span> y <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>z <span class="token operator">&lt;</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            y <span class="token operator">=</span> z<span class="token punctuation">;</span>
            z <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span>z<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>z<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

     <span class="token comment">// 计算可以获得的代币，后续研究下算法</span>
    <span class="token comment">/// @notice Calculates the output amount for a given input amount and reserves.</span>
    <span class="token comment">/// @param amountIn The input amount.</span>
    <span class="token comment">/// @param reserveIn The reserve of the input token.</span>
    <span class="token comment">/// @param reserveOut The reserve of the output token.</span>
    <span class="token comment">/// @return amountOut The output amount.</span>
    <span class="token keyword">function</span> <span class="token function">getAmountOut</span><span class="token punctuation">(</span><span class="token builtin">uint</span> amountIn<span class="token punctuation">,</span>
        <span class="token builtin">uint</span> reserveIn<span class="token punctuation">,</span>
        <span class="token builtin">uint</span> reserveOut
    <span class="token punctuation">)</span> <span class="token keyword">internal</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint</span> amountOut<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// todo后续研究下白皮书，这里有重要算法</span>
        <span class="token builtin">uint</span> amountInWithFee <span class="token operator">=</span> amountIn<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span><span class="token number">997</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">uint</span> numerator <span class="token operator">=</span> amountInWithFee<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>reserveOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">uint</span> denominator <span class="token operator">=</span> reserveIn<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>amountInWithFee<span class="token punctuation">)</span><span class="token punctuation">;</span>
        amountOut <span class="token operator">=</span> numerator <span class="token operator">/</span> denominator<span class="token punctuation">;</span>
        <span class="token keyword">return</span> amountOut<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/// @notice Transfers all WETH held by the contract to the contract owner.</span>
    <span class="token comment">/// @dev Only the contract owner can call this function.</span>
    <span class="token comment">// 提款</span>
    <span class="token keyword">function</span> <span class="token function">withdrawWETHToOwner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> onlyOwner <span class="token punctuation">{</span>
        <span class="token builtin">uint256</span> balance <span class="token operator">=</span> <span class="token function">IERC20</span><span class="token punctuation">(</span>WETH_ADDRESS<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">IERC20</span><span class="token punctuation">(</span>WETH_ADDRESS<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">,</span> balance<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/// @notice Transfers all ETH held by the contract to the contract owner.</span>
    <span class="token comment">/// @dev Only the contract owner can call this function.</span>
    <span class="token comment">// 提款</span>
    <span class="token keyword">function</span> <span class="token function">withdrawETHToOwner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> onlyOwner <span class="token punctuation">{</span>
        <span class="token builtin">uint256</span> balance <span class="token operator">=</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span>balance<span class="token punctuation">;</span>
        <span class="token keyword">payable</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>balance<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/// @notice Executes a call to another contract with the provided data and value.</span>
    <span class="token comment">/// @dev Only the contract owner can call this function.</span>
    <span class="token comment">/// @dev Reverted calls will result in a revert.</span>
    <span class="token comment">/// @param _to The address of the contract to call.</span>
    <span class="token comment">/// @param _value The amount of Ether to send with the call.</span>
    <span class="token comment">/// @param _data The calldata to send with the call.</span>
    <span class="token comment">// 转账辅助函数</span>
    <span class="token keyword">function</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token keyword">payable</span> _to<span class="token punctuation">,</span> <span class="token builtin">uint256</span> _value<span class="token punctuation">,</span> <span class="token builtin">bytes</span> <span class="token keyword">memory</span> _data<span class="token punctuation">)</span> <span class="token keyword">external</span> onlyOwner <span class="token punctuation">{</span>
        <span class="token punctuation">(</span><span class="token builtin">bool</span> success<span class="token punctuation">,</span> <span class="token punctuation">)</span> <span class="token operator">=</span> _to<span class="token punctuation">.</span>call<span class="token punctuation">{</span>value<span class="token punctuation">:</span> _value<span class="token punctuation">}</span><span class="token punctuation">(</span>_data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>success<span class="token punctuation">,</span> <span class="token string">&quot;External call failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 可以接受eth</span>
    <span class="token comment">/// @notice Fallback function that allows the contract to receive Ether.</span>
    <span class="token function">receive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">payable</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="移除flashloan" tabindex="-1"><a class="header-anchor" href="#移除flashloan" aria-hidden="true">#</a> 移除Flashloan</h2><p>代码与上面一致，移除闪电贷。</p><div class="language-solitidy line-numbers-mode" data-ext="solitidy"><pre class="language-solitidy"><code>pragma solidity ^0.8.0;

import &quot;openzeppelin/token/ERC20/IERC20.sol&quot;;
import &quot;openzeppelin/access/Ownable.sol&quot;;
import &quot;openzeppelin/utils/math/SafeMath.sol&quot;;

interface IWETH is IERC20 {
    function deposit() external payable;
    function withdraw(uint) external;
}

interface IUniswapV2Pair {
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
    function token0() external view returns (address);
    function token1() external view returns (address);
}

interface IPairReserves{
     struct PairReserves {
        uint256 reserve0;
        uint256 reserve1;
        uint256 price;
        bool isWETHZero;
    }
}

contract BlindBackrun is Ownable {
    using SafeMath for uint256;
    uint256 uniswappyFee = 997;

    address public immutable WETH_ADDRESS;

    constructor(address _wethAddress) {
        WETH_ADDRESS = _wethAddress;
    }

    /// @notice Executes an arbitrage transaction between two Uniswap V2 pairs.
    /// @notice Pair addresses need to be computed off-chain.
    /// @dev Only the contract owner can call this function.
    /// @param firstPairAddress Address of the first Uniswap V2 pair.
    /// @param secondPairAddress Address of the second Uniswap V2 pair.
    function executeArbitrage(
        address firstPairAddress,
        address secondPairAddress,
        uint percentageToPayToCoinbase
    ) external onlyOwner {
        uint256 balanceBefore = IERC20(WETH_ADDRESS).balanceOf(address(this));
        IUniswapV2Pair firstPair = IUniswapV2Pair(firstPairAddress);
        IUniswapV2Pair secondPair = IUniswapV2Pair(secondPairAddress);

        IPairReserves.PairReserves memory firstPairData = getPairData(firstPair);
        IPairReserves.PairReserves memory secondPairData = getPairData(secondPair);


        uint256 amountIn = getAmountIn(firstPairData, secondPairData);
        IERC20(WETH_ADDRESS).transfer(firstPairAddress, amountIn);

        uint256 firstPairAmountOut;
        uint256 finalAmountOut;
        if (firstPairData.isWETHZero == true){
            firstPairAmountOut = getAmountOut(amountIn, firstPairData.reserve0, firstPairData.reserve1);
            finalAmountOut = getAmountOut(firstPairAmountOut, secondPairData.reserve1, secondPairData.reserve0);

            firstPair.swap(0, firstPairAmountOut, secondPairAddress, &quot;&quot;);
            secondPair.swap(finalAmountOut, 0, address(this), &quot;&quot;);
        } else {
            firstPairAmountOut = getAmountOut(amountIn, firstPairData.reserve1, firstPairData.reserve0);
            finalAmountOut = getAmountOut(firstPairAmountOut, secondPairData.reserve0, secondPairData.reserve1);

            firstPair.swap(firstPairAmountOut, 0, secondPairAddress, &quot;&quot;);
            secondPair.swap(0, finalAmountOut, address(this), &quot;&quot;);
        }

        uint256 balanceAfter = IERC20(WETH_ADDRESS).balanceOf(address(this));
        require(balanceAfter &gt; balanceBefore, &quot;Arbitrage failed&quot;);
        // 赚的钱
        uint profit = balanceAfter.sub(balanceBefore);
        // 小费
        uint profitToCoinbase = profit.mul(percentageToPayToCoinbase).div(100);
        // 提取矿工的钱
        // 这里可以优化 预留一些金额
        IWETH(WETH_ADDRESS).withdraw(profitToCoinbase);
        // 给矿工转账
        block.coinbase.transfer(profitToCoinbase);
    }

    /// @notice Calculates the required input amount for the arbitrage transaction.
    /// @param firstPairData Struct containing data about the first Uniswap V2 pair.
    /// @param secondPairData Struct containing data about the second Uniswap V2 pair.
    /// @return amountIn, the optimal amount to trade to arbitrage two v2 pairs.
    function getAmountIn(
        IPairReserves.PairReserves memory firstPairData,
        IPairReserves.PairReserves memory secondPairData
    ) public returns (uint256) {
        uint256 numerator = getNumerator(firstPairData, secondPairData);
        uint256 denominator = getDenominator(firstPairData, secondPairData);

        uint256 amountIn =
            numerator
            .mul(1000)
            .div(denominator);

        return amountIn;
    }

    function getNumerator(
        IPairReserves.PairReserves memory firstPairData,
        IPairReserves.PairReserves memory secondPairData
    ) public view returns (uint256) {
        if (firstPairData.isWETHZero == true) {
            uint presqrt =
                uniswappyFee
                    .mul(uniswappyFee)
                    .mul(firstPairData.reserve1)
                    .mul(secondPairData.reserve0)
                    .div(secondPairData.reserve1)
                    .div(firstPairData.reserve0);

            uint256 numerator =
            (
                sqrt(presqrt)
                .sub(1e3)
            )
            .mul(secondPairData.reserve1)
            .mul(firstPairData.reserve0);

            return numerator;
        } else {
            uint presqrt =
                uniswappyFee
                    .mul(uniswappyFee)
                    .mul(firstPairData.reserve0)
                    .mul(secondPairData.reserve1)
                    .div(secondPairData.reserve0)
                    .div(firstPairData.reserve1);

            uint256 numerator =
            (
                sqrt(presqrt)
                .sub(1e3)
            )
            .mul(secondPairData.reserve0)
            .mul(firstPairData.reserve1);

            return numerator;
        }
    }

    function getDenominator(
            IPairReserves.PairReserves memory firstPairData,
            IPairReserves.PairReserves memory secondPairData
        ) public returns (uint256){
        if (firstPairData.isWETHZero == true) {
            uint256 denominator =
                (
                    uniswappyFee
                    .mul(secondPairData.reserve1)
                    .mul(1000)
                )
                .add(
                    uniswappyFee
                    .mul(uniswappyFee)
                    .mul(firstPairData.reserve1)
                );
            return denominator;
        } else {
            uint256 denominator =
                (
                    uniswappyFee
                    .mul(secondPairData.reserve0)
                    .mul(1000)
                )
                .add(
                    uniswappyFee
                    .mul(uniswappyFee)
                    .mul(firstPairData.reserve0)
                );
            return denominator;
        }
    }

    /// @notice Retrieves price and reserve data for a given Uniswap V2 pair. Also checks which token is WETH.
    /// @param pair The Uniswap V2 pair to retrieve data for.
    /// @return A PairReserves struct containing price and reserve data for the given pair.
    // 获取池子数据
    function getPairData(IUniswapV2Pair pair) private view returns (IPairReserves.PairReserves memory) {
        (uint256 reserve0, uint256 reserve1, ) = pair.getReserves();
        uint256 price;

        bool isWETHZero = false;
        if (pair.token0() == WETH_ADDRESS) {
            price = reserve1.mul(1e18).div(reserve0);
            isWETHZero = true;
        } else {
            price = reserve0.mul(1e18).div(reserve1);
        }

        return IPairReserves.PairReserves(reserve0, reserve1, price, isWETHZero);
    }

    /// @notice Calculates the square root of a given number.
    /// @param x: The number to calculate the square root of.
    /// @return y: The square root of the given number.
    function sqrt(uint256 x) private pure returns (uint256) {
        if (x == 0) return 0;
        uint256 z = x.add(1).div(2);
        uint256 y = x;
        while (z &lt; y) {
            y = z;
            z = ((x.div(z)).add(z)).div(2);
        }
        return y;
    }

    /// @notice Calculates the output amount for a given input amount and reserves.
    /// @param amountIn The input amount.
    /// @param reserveIn The reserve of the input token.
    /// @param reserveOut The reserve of the output token.
    /// @return amountOut The output amount.
    // 计算出代币的出量
    function getAmountOut(uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) internal pure returns (uint amountOut) {
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
        return amountOut;
    }

    /// @notice Transfers all WETH held by the contract to the contract owner.
    /// @dev Only the contract owner can call this function.
    // 提款给weth给owner
    function withdrawWETHToOwner() external onlyOwner {
        uint256 balance = IERC20(WETH_ADDRESS).balanceOf(address(this));
        IERC20(WETH_ADDRESS).transfer(msg.sender, balance);
    }

    /// @notice Transfers all ETH held by the contract to the contract owner.
    /// @dev Only the contract owner can call this function.
    // 提款给合同所有
    function withdrawETHToOwner() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    /// @notice Executes a call to another contract with the provided data and value.
    /// @dev Only the contract owner can call this function.
    /// @dev Reverted calls will result in a revert.
    /// @param _to The address of the contract to call.
    /// @param _value The amount of Ether to send with the call.
    /// @param _data The calldata to send with the call.
    // 调用其他合同允许提供数据
    function call(address payable _to, uint256 _value, bytes memory _data) external onlyOwner {
        (bool success, ) = _to.call{value: _value}(_data);
        require(success, &quot;External call failed&quot;);
    }

    // 允许接收以太坊
    /// @notice Fallback function that allows the contract to receive Ether.
    receive() external payable {}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>闪电贷款</li><li>两个v2版本进行套利</li><li>如何计算利润最大，后续研究下算法</li></ul>`,8),p=[i];function c(o,l){return s(),a("div",null,p)}const r=n(t,[["render",c],["__file","8e55.html.vue"]]);export{r as default};
