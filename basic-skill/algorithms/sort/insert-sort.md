# 插入排序

## 概念

“插入排序”不断地待排序（第i个元素）元素交换到`[0，i]`合适位置。实现主要包含两种：

1. 从后向前顺序比较
2. 从前向后顺序比较

## 代码

从后向前顺序比较代码：

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

从前向后顺序比较代码：

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

使用移动代替交换进行优化，减少数据交换次数，参考[《编程珠玑》](https://book.douban.com/subject/3227098/)。

## 总结

* 时间复杂度O($x^2$)
* 稳定排序
* 原地排序
* 无额外存储
