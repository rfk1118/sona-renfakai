# 快速排序

## 划分

::: tip 提示
划分是快排的核心
:::

划分算法使用双指针进行工作，初始时两个指针分别指向数组的两头（这里的指针其实是数组的角标，而不是引用），在左边的指针，向右移动，而右边的指针向左移动。
当`leftPtr`遇到比枢纽小的数据项时候，向右移动，因为这个数据已经在正确的位置了，当`rightPtr`遇到比枢纽大的数据项时候，向左移动，因为这个数据也已经在正确位置了。如果`leftPtr`大于了`rightPtr`说明已经处理完毕了。

## 标准快排

1. 标准版排序比较简单，[《算法4》QuickSort](https://algs4.cs.princeton.edu/23quicksort/Quick.java.html)中使用第一个元素作为切割点
2. 使用最后一个元素作为切割点的，例如《编程珠玑》

```Go
// QuickSort 标准快排，这里使用lo元素作为切割垫
func QuickSort(num []int) {
  QuickSortWithIndex(num, 0, len(num)-1)
}
// QuickSortWithIndex 对从low~high处的数据进行排序
func QuickSortWithIndex(num []int, low, high int) {
  if low >= high {
    return
  }
  // 这里是排序的核心
  partition := partitionWithIndex(num, low, high)
  QuickSortWithIndex(num, low, partition-1)
  QuickSortWithIndex(num, partition+1, high)
}

//  核心代码在这里也就是进行双轴 partition
func partitionWithIndex(num []int, low int, high int) int {
  lowIndex := low + 1
  highIndex := high
  // 使用最小元素作为partition
  pV := num[low]
  // 双轴交换大小值
  for true {
    for num[lowIndex] < pV {
      if lowIndex >= high {
        break
      } else {
        lowIndex++
      }
    }

    for num[highIndex] > pV {
      if highIndex <= low {
        break
      } else {
        highIndex--
      }
    }
    // 如果已经相遇，则跳出总循环
    if lowIndex >= highIndex {
      break
    }
    // 交换内层数据
    num[lowIndex], num[highIndex] = num[highIndex], num[lowIndex]
  }
  // 将partition放到正确位置
  num[low], num[highIndex] = num[highIndex], num[low]
  return highIndex
}
```

## 性能问题

1. 标准版本，对`[9,8,7,6,5,4,3,2,1]`进行排序，每次的`partition`都无法正确切割数组，导致性能降低到O($n^2$)；
2. 标准版本，对`[9,8,3,6,3,3,3,2,1]`进行排序，性能也会降低，出现了大量相同元素。

## 优化方案

### 切割数组

* 二分方案，从被切割数组中随机获取一个数字，也就是 `pV := num[low]` 使用随机值。

```java
 // 随机出来一个大于lo,小于hi的整数
 int m = random(lo, hi);
 exch(a, m, lo);
```

* 三取样切分获取中位数，处理数据分布问题。

```java
 // 获取中位数
 int m = median3(a, lo, lo + n/2, hi);
 // 将数放到low,这样排序的时候就用不到了
 exch(a, m, lo);
```

### 相同元素

::: tip 提示
20世纪70年代，快速排序发布不久后三向切分的快速排序就出现了，但它并没有流行开来，因为在数组中重复元素不多的普通情况下它比标准的二分法多使用了很多次交换。
:::

三向分切，解决数据重复比较多的问题，[算法4代码](https://algs4.cs.princeton.edu/23quicksort/Quick3way.java.html)

```Go
// QuickSort3Way 切割成 x<T.....T<y
func QuickSort3Way(num []int) {
  QuickSortWithIndex3Way(num, 0, len(num)-1)
}

// QuickSortWithIndex3Way 对从low~high处的数据进行排序
func QuickSortWithIndex3Way(num []int, low, high int) {
  if low >= high {
    return
  }
  // 设置双轴
  lt := low
  gt := high
  pV := num[low]
  index := low + 1
  for index <= gt {
    // index向下走
    if num[index] < pV {
      num[lt], num[index] = num[index], num[lt]
      lt++
      index++
    } else if num[index] > pV {
      num[gt], num[index] = num[index], num[gt]
      gt--
    } else {
      index++
    }
  }
  //partition := partitionWithIndex(num, low, high)
  QuickSortWithIndex3Way(num, low, lt-1)
  QuickSortWithIndex3Way(num, gt+1, high)
}
```

## 总结

* 时间复杂度O(nlogn)
* 不稳定排序
* 不是原地排序
* 空间负责度O(nlogn)
