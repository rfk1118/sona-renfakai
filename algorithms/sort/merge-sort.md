# 归并排序

## 源码

在 `Arrays#sort` 中包含三种常见排序，双轴快排，归并排序，插入排序

* 因为基本类型排序可以忽略稳定性，可以使用双轴快排
* 归并排序可以保证排序的稳定性，所以对非基本类型比较好
* 插入排序在小空间排序性能特别好

## 优势

1. 一个数据类型包含`age,class`两个字段，先按照`age`进行排序，然后在按照`class`进行排序，
   如果使用稳定性算法进行排序，结果是班级相同的在一起，并且按照年龄大小排序
2. `Arrays#sort`基本类型的排序，因为不包含状态，所以使用快排就挺好

::: tip 提示
推荐左程云视频
:::

## 代码

### 自顶而下归并排序

* Java版本

```java

 private static final int INSERTIONSORT_THRESHOLD = 7;

  private static void legacyMergeSort(Object[] a,
                                        int fromIndex, int toIndex) {
        // 辅助空间
        Object[] aux = copyOfRange(a, fromIndex, toIndex);
        // 归并排序
        mergeSort(aux, a, fromIndex, toIndex, -fromIndex);
  }

  private static void mergeSort(Object[] src,
                                Object[] dest,
                                int low,
                                int high,
                                int off) {
      int length = high - low;
      // 如果排序的数据特别小使用插入排序
      // Insertion sort on smallest arrays
      if (length < INSERTIONSORT_THRESHOLD) {
          for (int i=low; i<high; i++)
              for (int j=i; j>low &&
                        ((Comparable) dest[j-1]).compareTo(dest[j])>0; j--)
                  swap(dest, j, j-1);
          return;
      }

      // Recursively sort halves of dest into src
      int destLow  = low;
      int destHigh = high;
      low  += off;
      high += off;
      int mid = (low + high) >>> 1;
      mergeSort(dest, src, low, mid, -off);
      mergeSort(dest, src, mid, high, -off);

      // 这里是优化
      // 我们可以添加一个判断条件，如果a[mid]小于等于a[mid+1]，我们就认为数组已经是有序的并跳过merge()方法。这个改动不影响排序的递归调用，但是任意有序的子数组算法的运行时间就变为线性的了
      if (((Comparable)src[mid-1]).compareTo(src[mid]) <= 0) {
          System.arraycopy(src, low, dest, destLow, length);
          return;
      }

      // copy辅助数组到原数组
      for(int i = destLow, p = low, q = mid; i < destHigh; i++) {
          if (q >= high || p < mid && ((Comparable)src[p]).compareTo(src[q])<=0)
              dest[i] = src[p++];
          else
              dest[i] = src[q++];
      }
  }

  // 交换两个元素
  private static void swap(Object[] x, int a, int b) {
      Object t = x[a];
      x[a] = x[b];
      x[b] = t;
  }
```

* Go版本

```Go
func mergeTopDownSort(nums []int, aux []int, low, high int) {
  // 如果就一个元素，直接返回
  if low >= high {
    return
  }
  // 查找中点
  mid := low + (high-low)/2
  // 左边进行归并排序
  mergeTopDownSort(nums, aux, low, mid)
  // 右边进行归并排序
  mergeTopDownSort(nums, aux, mid+1, high)
  // 数据合并
  mergeTopDown(nums, aux, low, mid, high)
}

func mergeTopDown(nums []int, aux []int, low, mid, high int) {
  // 复制数据到辅助数组
  for i := low; i <= high; i++ {
    aux[i] = nums[i]
  }

  // 设置最低的index
  lowIndex := low
  // 设置高index
  highIndex := mid + 1
  for i := low; i <= high; i++ {
    if lowIndex > mid {
      //  左边获取完毕
      nums[i] = aux[highIndex]
      highIndex = highIndex + 1
    } else if highIndex > high {
      // 右边获取完毕
      nums[i] = aux[lowIndex]
      lowIndex = lowIndex + 1
    } else if aux[lowIndex] < aux[highIndex] {
      // 都没获取完毕，并且左边小于右边
      nums[i] = aux[lowIndex]
      lowIndex = lowIndex + 1
    } else {
      // 都没获取完毕，并且右边小于左边
      nums[i] = aux[highIndex]
      highIndex = highIndex + 1
    }
  }
}
```

### 自底而上的归并排序

* Go版本

```Go
func mergeDownTopSort(num []int) {
  length := len(num)
  aux := make([]int, length)
  for sz := 1; sz < length; sz = sz + sz { //sz 子数组大小
    //  因为每次合并的都是2sz,所以下次处理的位置是2sz
    // 1 2 4 8 16
    for low := 0; low < length-sz; low += sz + sz { //子数组索引
      high := low
      if low+sz+sz-1 > length-1 {
        high = length - 1
      } else {
        high = low + sz + sz - 1
      }
      mergeTopDown(num, aux, low, low+sz-1, high)
    }
  }
}
```

### 总结

* 时间复杂度O(NlogN)
* 稳定排序
* 不是原地排序
* 空间负责度O(N)
