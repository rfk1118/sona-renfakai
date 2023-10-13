# GetOutputAmount

代币兑换使用池子中数据，[代码](https://github.com/rfk1118/v2-sdk/blob/main/src/entities/pair.ts)如下：

```ts
 /**
   * getAmountOut is the linear algebra of reserve ratio against amountIn:amountOut.
   * https://ethereum.stackexchange.com/questions/101629/what-is-math-for-uniswap-calculates-the-amountout-and-amountin-why-997-and-1000
   * has the math deduction for the reserve calculation without fee-on-transfer fees.
   *
   * With fee-on-transfer tax, intuitively it's just:
   * inputAmountWithFeeAndTax = 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn
   *                          = (1 - amountIn.sellFeesBips / 10000) * amountInWithFee
   * where amountInWithFee is the amountIn after taking out the LP fees
   * outputAmountWithTax = amountOut * (1 - amountOut.buyFeesBips / 10000)
   *
   * But we are illustrating the math deduction below to ensure that's the case.
   *
   * before swap A * B = K where A = reserveIn B = reserveOut
   *
   * after swap A' * B' = K where only k is a constant value
   *
   * getAmountOut
   *
   * A' = A + 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn # here 0.3% is deducted
   * B' = B - amountOut * (1 - amountOut.buyFeesBips / 10000)
   * amountOut = (B - B') / (1 - amountOut.buyFeesBips / 10000) # where A' * B' still is k
   *           = (B - K/(A + 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn))
   *             /
   *             (1 - amountOut.buyFeesBips / 10000)
   *           = (B - AB/(A + 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn))
   *             /
   *             (1 - amountOut.buyFeesBips / 10000)
   *           = ((BA + B * 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn - AB)/(A + 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn))
   *             /
   *             (1 - amountOut.buyFeesBips / 10000)
   *           = (B * 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn / (A + 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn)
   *             /
   *             (1 - amountOut.buyFeesBips / 10000)
   * amountOut * (1 - amountOut.buyFeesBips / 10000) = (B * 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn
   *                                                    /
   *                                                    (A + 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn)
   *
   * outputAmountWithTax = (B * 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn
   *                       /
   *                       (A + 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn)
   *                       = (B * 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn * 1000
   *                       /
   *                       ((A + 0.997 * (1 - amountIn.sellFeesBips / 10000) * amountIn) * 1000)
   *                     = (B * (1 - amountIn.sellFeesBips / 10000) 997 * * amountIn
   *                       /
   *                       (1000 * A + (1 - amountIn.sellFeesBips / 10000) * 997 * amountIn)
   *                     = (B * (1 - amountIn.sellFeesBips / 10000) * inputAmountWithFee)
   *                       /
   *                       (1000 * A + (1 - amountIn.sellFeesBips / 10000) * inputAmountWithFee)
   *                     = (B * inputAmountWithFeeAndTax)
   *                       /
   *                       (1000 * A + inputAmountWithFeeAndTax)
   *
   * inputAmountWithFeeAndTax = (1 - amountIn.sellFeesBips / 10000) * inputAmountWithFee
   * outputAmountWithTax = amountOut * (1 - amountOut.buyFeesBips / 10000)
   *
   * @param inputAmount
   */
  public getOutputAmount(
    inputAmount: CurrencyAmount<Token>,
    calculateFotFees: boolean = false
  ): [CurrencyAmount<Token>, Pair] {
    invariant(this.involvesToken(inputAmount.currency), 'TOKEN')
    if (JSBI.equal(this.reserve0.quotient, ZERO) || JSBI.equal(this.reserve1.quotient, ZERO)) {
      throw new InsufficientReservesError()
    }
    const inputReserve = this.reserveOf(inputAmount.currency)
    const outputReserve = this.reserveOf(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0)

    const percentAfterSellFees = calculateFotFees ? this.derivePercentAfterSellFees(inputAmount) : ZERO_PERCENT
    const inputAmountAfterTax = percentAfterSellFees.greaterThan(ZERO_PERCENT)
      ? CurrencyAmount.fromRawAmount(
          inputAmount.currency,
          percentAfterSellFees.multiply(inputAmount).quotient // fraction.quotient will round down by itself, which is desired
        )
      : inputAmount

    const inputAmountWithFeeAndAfterTax = JSBI.multiply(inputAmountAfterTax.quotient, _997)
    const numerator = JSBI.multiply(inputAmountWithFeeAndAfterTax, outputReserve.quotient)
    const denominator = JSBI.add(JSBI.multiply(inputReserve.quotient, _1000), inputAmountWithFeeAndAfterTax)
    const outputAmount = CurrencyAmount.fromRawAmount(
      inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
      JSBI.divide(numerator, denominator) // JSBI.divide will round down by itself, which is desired
    )

    if (JSBI.equal(outputAmount.quotient, ZERO)) {
      throw new InsufficientInputAmountError()
    }

    const percentAfterBuyFees = calculateFotFees ? this.derivePercentAfterBuyFees(outputAmount) : ZERO_PERCENT
    const outputAmountAfterTax = percentAfterBuyFees.greaterThan(ZERO_PERCENT)
      ? CurrencyAmount.fromRawAmount(
          outputAmount.currency,
          outputAmount.multiply(percentAfterBuyFees).quotient // fraction.quotient will round down by itself, which is desired
        )
      : outputAmount
    if (JSBI.equal(outputAmountAfterTax.quotient, ZERO)) {
      throw new InsufficientInputAmountError()
    }

    return [
      outputAmountAfterTax,
      new Pair(inputReserve.add(inputAmountAfterTax), outputReserve.subtract(outputAmountAfterTax))
    ]
  }
```

## 解读

上面那个公式并没有给出特定费率，先解读[why-997-and-1000](https://ethereum.stackexchange.com/questions/101629/what-is-math-for-uniswap-calculates-the-amountout-and-amountin-why-997-and-1000)，在合约中计计算可以参考[UniswapV2Library#getAmountOut](https://github.com/Uniswap/v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol),代码如下：

```ts
// given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
    require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
    require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
    uint amountInWithFee = amountIn.mul(997);
    uint numerator = amountInWithFee.mul(reserveOut);
    uint denominator = reserveIn.mul(1000).add(amountInWithFee);
    amountOut = numerator / denominator;
}
```

根据`stackexchange`解读上面合约中的代码。

```ts
// 0.3%，即A增了99.7
A' = A + 0.997 * amountIn  # here 0.3% is deducted
// 换出去的
B' = B - amountOut
// 差值
amountOut = B - B' # where A' * B' still is k
           //  k不变的情况下 用K / A变换后即是变化后的B
          = B - K/(A + 0.997 * amountIn)
          // B增加分母
          = B - AB/(A + 0.997 * amountIn)
          // B = B * (A + 0.997 * amountIn) / (A + 0.997 * amountIn)
          = (B * A + B * 0.997 * amountIn - AB)/(A + 0.997 * amountIn)
          // AB消掉
          = B * 0.997 * amountIn / (A + 0.997 * amountIn)
          //  修改小数为整数
          = B * 997 * amountIn / (1000 * A + 997 * amountIn)
```
