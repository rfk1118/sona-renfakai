
# UniswapV2Router01

由于需要暂时只解读swap部分。关于流动性部分后续有需要时候在读取源码，这样更加节省精力。

[源码地址](https://github.com/Uniswap/v2-periphery/blob/master/contracts/UniswapV2Router01.sol)

## swapExactTokensForTokens

``` solidity
function swapExactTokensForTokens(
    uint amountIn,
    uint amountOutMin,
    address[] calldata path,
    address to,
    uint deadline
) external override ensure(deadline) returns (uint[] memory amounts) {
    // 根据输入的数据获取到输出量
    amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
    // 保证获取的数量必须大于amountOutMin，如果想要防夹子，这里滑点要设定比较小
    require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
    // 传输代币给某个池子
    TransferHelper.safeTransferFrom(path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]);
    // 换取代币
    _swap(amounts, path, to);
}
```

## getAmountsOut

[源码地址](https://github.com/Uniswap/v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol)

算法需要看白皮书。

```solidity
// performs chained getAmountOut calculations on any number of pairs
function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
    require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
    amounts = new uint[](path.length);
    amounts[0] = amountIn;
    for (uint i; i < path.length - 1; i++) {
        (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
        amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
    }
}
// 算法
function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
    require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
    require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
    uint amountInWithFee = amountIn.mul(997);
    uint numerator = amountInWithFee.mul(reserveOut);
    uint denominator = reserveIn.mul(1000).add(amountInWithFee);
    amountOut = numerator / denominator;
}
```

## pairFor

根据两个代币排序计算出池子地址

```solidity
    // 根据两个代币排序计算出池子地址
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
            ))));
    }
```

## _swap

根据路径进行代币置换

```solidity
  // **** SWAP ****
  // requires the initial amount to have already been sent to the first pair
  function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
      for (uint i; i < path.length - 1; i++) {
          // 获取path , in和out
          (address input, address output) = (path[i], path[i + 1]);
          // 排序后
          (address token0,) = UniswapV2Library.sortTokens(input, output);
          uint amountOut = amounts[i + 1];
          (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
          address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
          // 地址换取
          IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
              amount0Out, amount1Out, to, new bytes(0)
          );
      }
  }
```

## 测试地址

[代币池子测试地址](https://www.geckoterminal.com/goerli-testnet/pools/0xc582d2e930c121742d8fcb55e6be4c6477c67dbe)
