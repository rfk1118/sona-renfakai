# 冒泡排序

## 概念

”冒泡排序“（Bubble Sort）是一种最简单的交换排序方法，它通过两两比较相邻记录的关键字，如果发生逆序，则进行交换，从而使关键字小的记录如气泡一般逐渐往上“漂浮”（左移），或者使关键字大的记录如石块一样逐渐向下“坠落”（右移）。

## 代码

```Go
func bubbleSort(num []int) []int {
  length := len(num)
  for i := 0; i < length; i++ {
    for j := 0; j < length-i-1; j++ {
      if num[j] > num[j+1] {
        num[j], num[j+1] = num[j+1], num[j]
      }
    }
  }
  return num
}
```

## 总结

每冒一次泡，数据最大的值都会排到`length-i`处。

* 时间复杂度O($x^2$)
* 稳定排序
* 原地排序
* 无额外存储
