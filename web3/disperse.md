# Disperse

很好用的一个工具，[网站地址](https://disperse.app/)。

网站找到了其他链的调用地址:

```js
address: {
    1: "0xD152f549545093347A162Dce210e7293f1452150",
    3: "0xD152f549545093347A162Dce210e7293f1452150",
    4: "0xD152f549545093347A162Dce210e7293f1452150",
    5: "0xD152f549545093347A162Dce210e7293f1452150",
    42: "0xD152f549545093347A162Dce210e7293f1452150",
    56: "0xD152f549545093347A162Dce210e7293f1452150",
    77: "0xD152f549545093347A162Dce210e7293f1452150",
    99: "0xD152f549545093347A162Dce210e7293f1452150",
    100: "0xD152f549545093347A162Dce210e7293f1452150",
    137: "0xD152f549545093347A162Dce210e7293f1452150",
    163: "0xD152f549545093347A162Dce210e7293f1452150",
    250: "0xD152f549545093347A162Dce210e7293f1452150",
    5777: "0x5b1869d9a4c187f2eaa108f3062412ecf0526b24",
    42161: "0xD152f549545093347A162Dce210e7293f1452150",
    4689: "0xe3122e446Bf31036DA212375803f24b3dE96D0c9",
    1284: "0xD152f549545093347A162Dce210e7293f1452150",
    1285: "0xD152f549545093347A162Dce210e7293f1452150",
    42220: "0xD152f549545093347A162Dce210e7293f1452150",
    1666600000: "0xD152f549545093347A162Dce210e7293f1452150",
    60: "0xD152f549545093347A162Dce210e7293f1452150",
    128: "0xD152f549545093347A162Dce210e7293f1452150",
    66: "0xD152f549545093347A162Dce210e7293f1452150",
    10: "0xD152f549545093347A162Dce210e7293f1452150",
    84531: "0xD152f549545093347A162Dce210e7293f1452150",
    1101: "0xD152f549545093347A162Dce210e7293f1452150",
    8453: "0xD152f549545093347A162Dce210e7293f1452150",
    11155111: "0xD152f549545093347A162Dce210e7293f1452150"
}
```

abi如下：

```js
 abi: ["function disperseEther(address[] recipients, uint256[] values)",
  "function disperseToken(address token, address[] recipients, uint256[] values)",
  "function disperseTokenSimple(address token, address[] recipients, uint256[] values)"],
```

## 代码解读

[eth scan](https://etherscan.io/address/0xD152f549545093347A162Dce210e7293f1452150#code)代码如下：

```ts
// 版本
pragma solidity ^0.4.25;

// 传输erc20使用
interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract Disperse {
    function disperseEther(address[] recipients, uint256[] values) external payable {
        // 按照账户进行分发金额
        for (uint256 i = 0; i < recipients.length; i++)
            recipients[i].transfer(values[i]);
        // 查看地址是否有余额
        uint256 balance = address(this).balance;
        if (balance > 0)
            msg.sender.transfer(balance);
    }

    function disperseToken(IERC20 token, address[] recipients, uint256[] values) external {
        uint256 total = 0;
        // 计算要分发的代币总量
        for (uint256 i = 0; i < recipients.length; i++)
            total += values[i];
        // 要求地址传输总代币成功
        require(token.transferFrom(msg.sender, address(this), total));
        // 想各个地址传输代币
        for (i = 0; i < recipients.length; i++)
            require(token.transfer(recipients[i], values[i]));
    }

    // 前提是需要授权过
    function disperseTokenSimple(IERC20 token, address[] recipients, uint256[] values) external {
        // 传输代币给特定地址
        for (uint256 i = 0; i < recipients.length; i++)
            require(token.transferFrom(msg.sender, recipients[i], values[i]));
    }
}
```

## 总结

`require(token.transferFrom(msg.sender, address(this), total));`这段代码即有好处又有坏处，好处是可以防止后续取消授权带来问题，
代码移除`require`代币传输失败会导致部分代币滞留在合约内。
