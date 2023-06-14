# IERC20

代币，也就是我们常说的钱，接口设计很有意思，主要包含以下几个概念：

* 发行总量（totalSupply），所有钱都是有总量的，该方法可以查询出代币总量。
* 名称（name）例如人民币。
* 符号，例如人民币（¥）。
* 单位，面值问题。
* 余额，也就是账薄进行记账。
* 授权（approve），查看授权（allowance），查看给某个账户进行授权。
* 转账（transfer），转账（transferFrom）。

::: tip
[openzeppelin文档地址](https://docs.openzeppelin.com/contracts/4.x/erc20-supply)，有详细讲解。
:::

## 代币接口

```js
interface IERC20 {
    // 事件event
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);
    // 名称
    function name() external view returns (string memory);
    // 符号
    function symbol() external view returns (string memory);
    // 单位
    function decimals() external view returns (uint8);
    // 总量
    function totalSupply() external view returns (uint);
    // 查询某个人的余额
    function balanceOf(address owner) external view returns (uint);
    // 查询给其他地址的授权，允许其他人使用的自己那部分钱
    function allowance(address owner, address spender) external view returns (uint);
    // 进行授权
    function approve(address spender, uint value) external returns (bool);
    // 转账
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
}
```

## UniswapV2ERC20源码

该代码是从`Uniswap`下载的，后续代码以学习`Uniswap`为主。

```js
pragma solidity =0.5.16;

import './interfaces/IUniswapV2ERC20.sol';
import './libraries/SafeMath.sol';

contract UniswapV2ERC20 is IUniswapV2ERC20 {
    using SafeMath for uint;
    // 名称
    string public constant name = 'Uniswap V2';
    // 符号
    string public constant symbol = 'UNI-V2';
    // 单位
    uint8 public constant decimals = 18;
    // 总量
    uint  public totalSupply;
    // map,key为地址，value为数量
    mapping(address => uint) public balanceOf;
    // map(key,map(key,value))) 地址，授权，一个人可以给多个地址授权
    mapping(address => mapping(address => uint)) public allowance;

    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
    mapping(address => uint) public nonces;

    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }

    // 生成代币
    function _mint(address to, uint value) internal {
        // 总代币增加
        totalSupply = totalSupply.add(value);
        // 给账户加钱
        balanceOf[to] = balanceOf[to].add(value);
        // 黑洞打钱进来
        emit Transfer(address(0), to, value);
    }

    function _burn(address from, uint value) internal {
        // 账户减少
        balanceOf[from] = balanceOf[from].sub(value);
        // 总量减少
        totalSupply = totalSupply.sub(value);
        // 向黑洞销毁
        emit Transfer(from, address(0), value);
    }

    function _approve(address owner, address spender, uint value) private {
        // 授权给别人信用额度
        allowance[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _transfer(address from, address to, uint value) private {
        // 内部转账
        balanceOf[from] = balanceOf[from].sub(value);
        balanceOf[to] = balanceOf[to].add(value);
        emit Transfer(from, to, value);
    }

    function approve(address spender, uint value) external returns (bool) {
        // 授权，这里使用了调用者msg.sender
        _approve(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint value) external returns (bool) {
        // 转账，来自msg.sender
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) external returns (bool) {
        if (allowance[from][msg.sender] != uint(-1)) {
            allowance[from][msg.sender] = allowance[from][msg.sender].sub(value);
        }
        // 转账，这里使用了from
        _transfer(from, to, value);
        return true;
    }

    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }
}

```

## 代币信息

代币信息，这里显示了名称、符号、单位。
这里使用了`public`关键字自动生成`view`方法特性和`external`修饰符仅供其他合约调用，不能在当前合约内部直接调用。与`Go`语言代码中如果返回值名称与方法体内名字命名一直无需显示`return`一样。

```js
// 名称
string public constant name = 'Uniswap V2';
// 符号
string public constant symbol = 'UNI-V2';
// 单位
uint8 public constant decimals = 18;
// 总量
uint  public totalSupply;
```

在[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)中的实现如下，这种实现就像`java`或`Go`语言那种强实现一样。

```js
contract ERC20 is Context, IERC20, IERC20Metadata, IERC20Errors {
    // 总量
    uint256 private _totalSupply;
    // 名称
    string private _name;
    // 符号
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    // 继承
    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }
    // todo其他代码省去
}
```

## 总量

* 查询总量，实现方式与代币信息信息一致。

```js
uint public totalSupply;
```

* 增加代币，会从黑洞`0x0000`发送代币到当前地址。

```js
function _mint(address to, uint value) internal {
    totalSupply = totalSupply.add(value);
    balanceOf[to] = balanceOf[to].add(value);
    emit Transfer(address(0), to, value);
}
```

* 销毁代币，将代币打入黑洞

```js
function _burn(address from, uint value) internal {
    balanceOf[from] = balanceOf[from].sub(value);
    totalSupply = totalSupply.sub(value);
    emit Transfer(from, address(0), value);
}
```

### OpenZeppelin

* 查询总量，实现方式与代币信息信息一致。

```js
function balanceOf(address account) public view virtual returns (uint256) {
    return _balances[account];
}
```

* 增加代币，会从黑洞`0x0000000000000000000000000000000000000000`发送代币到当前地址。

```js
function _mint(address account, uint256 amount) internal {
    // 账户为黑洞，不能黑洞打黑洞
    if (account == address(0)) {
        revert ERC20InvalidReceiver(address(0));
    }
    // 从黑洞创建代币，从黑洞转账给account账户，一般是address(this)
    _update(address(0), account, amount);
}
```

* 销毁代币，将代币打入黑洞

```js
function _burn(address account, uint256 amount) internal {
    // 不能黑洞进黑洞
    if (account == address(0)) {
        revert ERC20InvalidSender(address(0));
    }
    // 代币打进黑洞
    _update(account, address(0), amount);
}
```

* 增加代币和销毁代币公用方法

``` js
 function _update(address from, address to, uint256 amount) internal virtual {
        // 来自黑洞
        if (from == address(0)) {
            // 代币增加
            _totalSupply += amount;
        } else {
            uint256 fromBalance = _balances[from];
            if (fromBalance < amount) {
                revert ERC20InsufficientBalance(from, fromBalance, amount);
            }
            unchecked {
                // Overflow not possible: amount <= fromBalance <= totalSupply.
                _balances[from] = fromBalance - amount;
            }
        }
       // 销毁代币，打进黑洞
        if (to == address(0)) {
            unchecked {
                // Overflow not possible: amount <= totalSupply or amount <= fromBalance <= totalSupply.
                _totalSupply -= amount;
            }
        } else {
            unchecked {
                // Overflow not possible: balance + amount is at most totalSupply, which we know fits into a uint256.
                _balances[to] += amount;
            }
        }

        emit Transfer(from, to, amount);
    }
```

## 授权

所有的授权都是使用覆盖模式，并且不会对金额做校验。这样处理逻辑比较简单，代码量少，gas也比较低。

```js
function _approve(address owner, address spender, uint value) private {
    allowance[owner][spender] = value;
    emit Approval(owner, spender, value);
}

function approve(address spender, uint value) external returns (bool) {
    _approve(msg.sender, spender, value);
    return true;
}
```

更加完善的增加和减少授权代码如下：

```js
function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
    // 上下文拿到调用者
    address owner = _msgSender();
    // 授权给某个增加额度
    _approve(owner, spender, allowance(owner, spender) + addedValue);
    return true;
}
function decreaseAllowance(address spender, uint256 requestedDecrease) public virtual returns (bool) {
    // 上下文拿到调用者
    address owner = _msgSender();
    uint256 currentAllowance = allowance(owner, spender);
    if (currentAllowance < requestedDecrease) {
        revert ERC20FailedDecreaseAllowance(spender, currentAllowance, requestedDecrease);
    }
    // 防止越界
    unchecked {
          // 授权给减少增加额度
        _approve(owner, spender, currentAllowance - requestedDecrease);
    }

    return true;
}

function _approve(address owner, address spender, uint256 amount) internal virtual {
    if (owner == address(0)) {
        revert ERC20InvalidApprover(address(0));
    }
    if (spender == address(0)) {
        revert ERC20InvalidSpender(address(0));
    }
    // 修改授权金额
    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
}
```

## 转账

转账一共有两个方法，调用者给别的用户进行转账。

```js
function transfer(address to, uint256 amount) public virtual returns (bool) {
    // 上下文拿到的调用者
    address owner = _msgSender();
    _transfer(owner, to, amount);
    return true;
}
```

被授权用户转移代币。

```js
function transferFrom(address from, address to, uint256 amount) public virtual returns (bool) {
    // 调用者
    address spender = _msgSender();
    // 查询地址给当前调用者的授权额度
    _spendAllowance(from, spender, amount);
    _transfer(from, to, amount);
    return true;
}

function _spendAllowance(address owner, address spender, uint256 amount) internal virtual {
    // 查询授权金额
    uint256 currentAllowance = allowance(owner, spender);
    // 如果不是最大金额
    if (currentAllowance != type(uint256).max) {
        // 如果授权额度小于转账额度，阻断流程
        if (currentAllowance < amount) {
            revert ERC20InsufficientAllowance(spender, currentAllowance, amount);
        }
        unchecked {
            // 减少授权额度
            _approve(owner, spender, currentAllowance - amount);
        }
    }
}
function _transfer(address from, address to, uint256 amount) internal {
    // 不能来自黑洞
    if (from == address(0)) {
        revert ERC20InvalidSender(address(0));
    }
    // 不能销毁代币
    if (to == address(0)) {
        revert ERC20InvalidReceiver(address(0));
    }
    // 从form
    _update(from, to, amount);
}
```

## 成长

1. 对于某些方法可以使用`external view returns (string memory)`进行覆写。
2. 如果不想引入某个包，可以使用`bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));`方法选择器，使用方法如下

```js
function _safeTransfer(address token, address to, uint value) private {
    (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
    require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
}
```
