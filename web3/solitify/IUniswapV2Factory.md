# IUniswapV2Factory

工厂设计模式中开发中最常用的设计模式方一。

1. 工厂方法按照模版创建。
2. 设置收费账户，这里主要给`IUniswapV2Pair`使用。

```js
function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
    // 查看工厂是否收费
    address feeTo = IUniswapV2Factory(factory).feeTo();
    // 如果设置了地址，则进行收费
    feeOn = feeTo != address(0);
    uint _kLast = kLast; // gas savings
    if (feeOn) {
        if (_kLast != 0) {
            uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
            uint rootKLast = Math.sqrt(_kLast);
            if (rootK > rootKLast) {
                uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                uint denominator = rootK.mul(5).add(rootKLast);
                uint liquidity = numerator / denominator;
                if (liquidity > 0) _mint(feeTo, liquidity);
            }
        }
    } else if (_kLast != 0) {
        kLast = 0;
    }
}
```

## 接口协议

```js
pragma solidity >=0.5.0;

interface IUniswapV2Factory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    // 查看收费地址
    function feeTo() external view returns (address);
    // 权限拥有者
    function feeToSetter() external view returns (address);
    // 获取池子实现
    function getPair(address tokenA, address tokenB) external view returns (address pair);
    // 获取所有池子
    function allPairs(uint) external view returns (address pair);
    // 工厂持有池子总量
    function allPairsLength() external view returns (uint);
    // 创建，核心方法
    function createPair(address tokenA, address tokenB) external returns (address pair);
    // 收费地址
    function setFeeTo(address) external;
    // 转移权限
    function setFeeToSetter(address) external;
}

```

## 代码实现

* 收费地址，在`pair`合约中使用。

```js
address feeTo = IUniswapV2Factory(factory).feeTo();
    // 如果设置了地址，则进行收费
feeOn = feeTo != address(0);
```

* `feeToSetter权限`，其实和`own`合约一样，合约权限，谁可以设置收费地址。
* `pair`主要使用了`{a:{b:c},b:{a:c}}`这种格式支持了快速查找，无论a-b，还是b-a都能查找到。
* `allPairsLength`可以查看工厂一共创建了多少个池子。

```js
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    // 收费地址
    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view returns (uint) {
        // 返回池子数量
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        // 设置收费地址
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        // 设置拥有者
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

## 核心

在做粉丝关注关系的时候常用`{a:{b:c},b:{a:c}}`，比如某大V的粉丝有谁和我关注了谁这两个功能在调用的时候为了性能就不会调用一样方法，查找我关注了谁直接查找我的池子就好了，这样不需要去所有N个大V列表里面去查询判断，如果查看大V被谁关注了，直接拿到大V下列表即可。

```js
function createPair(address tokenA, address tokenB) external returns (address pair) {
      // 代币不能为一个
      require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
      // 进行地址排序，在普通金融转账里面使用锁的时候也要求进行排序，防止死锁
      (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
      // 要求没有黑洞
      require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
      // 不能已经初始化过
      require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
      // 查找字节码
      bytes memory bytecode = type(UniswapV2Pair).creationCode;
      // 加盐
      bytes32 salt = keccak256(abi.encodePacked(token0, token1));
      assembly {
          // 创建pair
          pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
      }
      // 初始化pair
      IUniswapV2Pair(pair).initialize(token0, token1);
      // 存入`{a:{b:c},b:{a:c}}`格式
      getPair[token0][token1] = pair;
      getPair[token1][token0] = pair; // populate mapping in the reverse direction
      // 推到池子数组，这样可以迭代
      allPairs.push(pair);
      emit PairCreated(token0, token1, pair, allPairs.length);
  }
```

## 成长

使用字节码创建然后初始化，这里与`Java`语言中反射进行构造差不多。
