# UniswapV2Pair

流动池作用提供AMM机制，也就是股市做市商概念，做市商会出现无常损失，赚的时候赚的少，亏的时候亏的多，使用手续费进行补偿无常损失。

## 手续费进行补偿

补偿所有人和给予开发者收益时有两种方式可以处理。

1. 根据收益/（总用户收益 + 开发者收益），产生新的流动性并按照比例进行分发，分发时会导致`Gas`费飙升，此种方案不好。
2. 根据收益 *开发者比例 / （收益* （1- 开发者比例） +  原流动性） 产生新的流动性，并只需要增加给开发者即可。

## 设计

给用户分权益就需要凭证，根据凭证分收益，凭证也是一种代币。

### 代码

```js
pragma solidity >=0.5.0;

interface IUniswapV2Pair {
    // 事件
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    // 代币代码，可以参考ERC20
    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function PERMIT_TYPEHASH() external pure returns (bytes32);
    // 代币代码在上面
    function nonces(address owner) external view returns (uint);

    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);
    // 最小流动性
    function MINIMUM_LIQUIDITY() external pure returns (uint);
    // 工厂
    function factory() external view returns (address);
    // 代币A
    function token0() external view returns (address);
    // 代币B
    function token1() external view returns (address);
    // 返回各种代币总量和最后更新时间
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    //
    function price0CumulativeLast() external view returns (uint);
    function price1CumulativeLast() external view returns (uint);
    // 最后计算出的k , x * y  = k
    function kLast() external view returns (uint);

    function mint(address to) external returns (uint liquidity);
    function burn(address to) external returns (uint amount0, uint amount1);
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
    // 强制同步代币账簿和当前一致
    function skim(address to) external;
    // 强制同步代币到当前记录
    function sync() external;
    // 初始化，主要是设置两种代币
    function initialize(address, address) external;
}

```

### 创建Pair

1. 在创建Pair的时候使用的是字节码创建，工厂模式直接字节码创建，并在`initialize`方法中设置两种代币。

```js
// 字节码
bytes memory bytecode = type(UniswapV2Pair).creationCode;
// 加盐
bytes32 salt = keccak256(abi.encodePacked(token0, token1));
assembly {
    pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
}
// 拿到初始化地址，设置两种代币
IUniswapV2Pair(pair).initialize(token0, token1);
```

### MINIMUM_LIQUIDITY

```js
// 设置最小流动池数量
uint public constant MINIMUM_LIQUIDITY = 10 ** 3;
```

### others

// todo

### 更新

```js
function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
      // 要求代币没有越界
      require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
      // 将时间转换
      uint32 blockTimestamp = uint32(block.timestamp % 2 ** 32);
      // 时间语言机器
      uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
      if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
          // * never overflows, and + overflow is desired
          price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
          price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
      }
      reserve0 = uint112(balance0);
      reserve1 = uint112(balance1);
      blockTimestampLast = blockTimestamp;
      emit Sync(reserve0, reserve1);
    }
```

### sync

```js
// 强制中心账薄与当前一致
// force balances to match reserves
function skim(address to) external lock {
    address _token0 = token0; // gas savings
    address _token1 = token1; // gas savings
    _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
    _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
}
// 强制当前与中心账簿一致
// force reserves to match balances
function sync() external lock {
    _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
}
```
