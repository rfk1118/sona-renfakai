# 二分查找法

::: tip 提示
有序数组默认使用正序
:::

## 概念

1. 查看数组的中间数据项，如果相等返回位置
2. 如果数据项大于查找数据，缩小范围，从数组前半部分查找
3. 如果数据项小于查找数据，缩小范围，从数组后半部分查找
4. 继续查找到范围为0，如果还未找到返回一个负值

## 代码

::: tip 提示
代码参考 `Arrays#binarySearch()`
:::

```java
private static int binarySearch0(int[] a, int fromIndex, int toIndex,
                                    int key) {
      // 开始位置
      int low = fromIndex;
      // 结束位置
      int high = toIndex - 1;

      // 没有查找完
      while (low <= high) {
          // 找到中间节点
          int mid = (low + high) >>> 1;
          // 中间节点的值
          int midVal = a[mid];
          // 如果中间值小于查找值
          if (midVal < key)
              // 数据项小于查找数组，缩小范围，从数组后半部分查找
              low = mid + 1;
          else if (midVal > key)
              // 数据项大于查找数组，缩小范围，从数组前半部分查找
              high = mid - 1;
          else
              // 数组的中间数据项，如果相等返回位置，
              return mid; // key found
      }
      return -(low + 1);  // key not found.
}
```

## 总结

### 优点

* 时间复杂度为O(logN)

### 缺点

* 需要连续内存空间
* 数组需要有序
