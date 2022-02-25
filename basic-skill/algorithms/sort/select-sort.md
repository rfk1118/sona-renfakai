# 选择排序

## 概念

首先，找到数组中最小的那个元素，其次，将它和数组的第一个元素交换位置（如果第一个元素就是最小元素那么它就和自己交换）。再次，在剩下的元素中找到最小的元素，将它与数组的第二个元素交换位置。如此往复，直到将整个数组排序。这种方法叫做选择排序，因为它在不断地选择剩余元素之中的最小者。

## 代码

```Go
func selectSort(num []int) []int {
  length := len(num)
  // 从第0开始查找最小的值
  for i := 0; i < length; i++ {
    minIndex := i
    for j := i + 1; j < length; j++ {
      if num[j] < num[minIndex] {
        minIndex = j
      }
    }
    // 交换
    temp := num[i]
    num[i] = num[minIndex]
    num[minIndex] = temp
  }
  return num
}
```

## 总结

每次都会从i ~ n选择一个最小值插入到i处

* 时间复杂度O($x^2$)
* 不稳定排序
* 原地排序
* 无额外存储
