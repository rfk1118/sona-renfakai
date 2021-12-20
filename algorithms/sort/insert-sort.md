# 插入排序

## 概念

1. 每一趟将一个待排序的记录，按其关键字的大小插入到已经排好序的一组记录的适当位置上，直到所有待排序记录全部插入为止
2. 在插入排序，可以使用前向后顺序比较和前向后顺序比较

::: tip 提示
从前向后顺序比较和从后向前顺序比较参考[数据结构（C语言版 第2版）](https://book.douban.com/subject/26713328/)
:::

## 代码

1. 从后向前顺序比较代码

```Go
func insertSort(num []int) []int {
  // 总长度
  length := len(num)
  // 不能从0开始因为第一个元素要跟0对比
  for i := 1; i < length; i++ {
    //  从当前元素查找，如果前面元素大于当前元素，进行交换
    for j := i; j > 0 && num[j] < num[j-1]; j-- {
      num[j] = num[j] ^ num[j-1]
      num[j-1] = num[j] ^ num[j-1]
      num[j] = num[j] ^ num[j-1]
    }
  }
  return num
}
```

2. 从前向后顺序比较代码

```Go
func insertSortWithFront(num []int) []int {
  length := len(num)
  for i := 0; i < length; i++ {
    // 保存第i个值
    insertV := num[i]
    successIndex := i
    // 从前面开始迭代，找到正确位置
    for j := 0; j < i; j++ {
      if num[j] > num[i] {
        successIndex = j
        break
      }
    }
    // 已经查找到了正确位置，其正确位置是successIndex，将所有数据向后面进行转移
    for j := i; j > successIndex; j-- {
      num[j] = num[j-1]
    }
    // 设置successIndex为正确的值
    num[successIndex] = insertV
  }
  return num
}
```

## 优化

优化可以使用移动进行优化，可以减少数据交换的次数，参考[《编程珠玑》](https://book.douban.com/subject/3227098/)

## 总结

* 时间复杂度O($x^2$)
* 稳定排序
* 原地排序
* 无额外存储
