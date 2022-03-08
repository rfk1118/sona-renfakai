# Xor

## 异或运算

之前看过很多书籍和视频，会使用异或运算进行数据交换，也将数据转换成二进制进行计算过，比如a=1，b=3，标准操作如下:

```java
a = 1  // 01
b = 3  // 11

a = a ^ b = 01 ^ 11 = 10
b = a ^ b = 10 ^ 11 = 01
a = a ^ b = 10 ^ 01 = 11
```

## 结合律

1. 相同的数异或为 0 ：n ^ n = 0
2. 任何数于 0 异或为任何数： 0 ^ n = n
3. a ^ b ^ c = a ^ c ^ b

```java
a = a
b = b

a = a ^ b
// 此时 a = a ^ b
b = a ^ b = a ^ b  ^ b = a ^ 0 = a
// 因为这时a = a ^ b
a = a ^ b = a ^ b ^ a = a ^ a ^ b = 0 ^ b = b
```

## 实战

[136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

```java
示例 1:
输入: [2,2,1]
输出: 1

示例 2:
输入: [4,1,2,1,2]
输出: 4
```

1. 其实上面的题可以把出现一次变成出现奇数次，其他都是偶数

```Go
func singleNumber(nums []int) int {
  result := 0
  for _, num := range nums {
    result = result ^ num
  }
  return result
}
```
