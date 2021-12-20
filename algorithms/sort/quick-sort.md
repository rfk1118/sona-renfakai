# 快速排序

## 划分

::: tip 提示
划分是快排的核心
:::
划分算法有两个指针开始工作，两个指针分别指向数组的两头。（这里的指针其实是数组的角标，而不是引用），在左边的指针，向右移动，而右边的指针向左移动。

当leftPtr遇到比枢纽小的数据项时候，向右移动，因为这个数据已经在正确的位置了，当rightPtr遇到比枢纽大的数据项时候，向左移动，因为这个数据也已经在正确位置了。如果leftPtr大于了rightPtr说明已经处理完毕了。

## 奇偶互换

1. 进58面试时候面的算法题，就是一个数组，奇数放前面，偶数放后面。

```Go
// 面试题，将奇数放到前面 偶数放到后面
// 时间复杂度为O(n) 空间复杂度为 i , length
func swap(p []int) []int {
  lowIndex := 0
  highIndex := len(p) - 1

  for true {
    // 如果当前是奇数一直走，走到一个偶数暂停
    for p[lowIndex]%2 != 0 {
      if lowIndex >= highIndex {
        break
      } else {
        lowIndex++
      }
    }
    // 如果当前是偶数一直走，走到一个偶数暂停
    for p[highIndex]%2 == 0 {
      if lowIndex >= highIndex {
        break
      } else {
        highIndex--
      }
    }
    // 如果两个值相遇不在走了
    if lowIndex >= highIndex {
      break
    }
        // 找到了奇数和偶数，交换
    p[lowIndex], p[highIndex] = p[highIndex], p[lowIndex]

  }
  return p
}

```

1. 在数据交换时候可以不借用三方变量吗？请查看[Xor](../bit/xor.md)

```Go
a = 1  // 01
b = 3  // 11

a = a ^ b = 01 ^ 11 = 10
b = a ^ b = 10 ^ 11 = 01
a = a ^ b = 10 ^ 01 = 11
```

## 标准版快排

1. 标准版排序比较简单，《算法4》中使用第一个元素作为切割点
2. 也有使用最后一个元素作为切割点的，例如《编程珠玑》
3. [参考代码地址](https://algs4.cs.princeton.edu/23quicksort/Quick.java.html)

```java
/**
 *  The {@code Quick} class provides static methods for sorting an
 *  array and selecting the ith smallest element in an array using quicksort.
 *  <p>
 *  For additional documentation, see
 *  <a href="https://algs4.cs.princeton.edu/23quicksort">Section 2.3</a>
 *  of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 *  @author Robert Sedgewick
 *  @author Kevin Wayne
 */
public class Quick {

    // This class should not be instantiated.
    private Quick() { }

    /**
     * Rearranges the array in ascending order, using the natural order.
     * @param a the array to be sorted
     */
    public static void sort(Comparable[] a) {
        StdRandom.shuffle(a);
        sort(a, 0, a.length - 1);
        assert isSorted(a);
    }

    // quicksort the subarray from a[lo] to a[hi]
    private static void sort(Comparable[] a, int lo, int hi) {
        if (hi <= lo) return;
        int j = partition(a, lo, hi);
        sort(a, lo, j-1);
        sort(a, j+1, hi);
        assert isSorted(a, lo, hi);
    }

    // partition the subarray a[lo..hi] so that a[lo..j-1] <= a[j] <= a[j+1..hi]
    // and return the index j.
    private static int partition(Comparable[] a, int lo, int hi) {
        int i = lo;
        int j = hi + 1;
        Comparable v = a[lo];
        while (true) {

            // find item on lo to swap
            while (less(a[++i], v)) {
                if (i == hi) break;
            }

            // find item on hi to swap
            while (less(v, a[--j])) {
                if (j == lo) break;      // redundant since a[lo] acts as sentinel
            }

            // check if pointers cross
            if (i >= j) break;

            exch(a, i, j);
        }

        // put partitioning item v at a[j]
        exch(a, lo, j);

        // now, a[lo .. j-1] <= a[j] <= a[j+1 .. hi]
        return j;
    }

    /**
     * Rearranges the array so that {@code a[k]} contains the kth smallest key;
     * {@code a[0]} through {@code a[k-1]} are less than (or equal to) {@code a[k]}; and
     * {@code a[k+1]} through {@code a[n-1]} are greater than (or equal to) {@code a[k]}.
     *
     * @param  a the array
     * @param  k the rank of the key
     * @return the key of rank {@code k}
     * @throws IllegalArgumentException unless {@code 0 <= k < a.length}
     */
    public static Comparable select(Comparable[] a, int k) {
        if (k < 0 || k >= a.length) {
            throw new IllegalArgumentException("index is not between 0 and " + a.length + ": " + k);
        }
        StdRandom.shuffle(a);
        int lo = 0, hi = a.length - 1;
        while (hi > lo) {
            int i = partition(a, lo, hi);
            if      (i > k) hi = i - 1;
            else if (i < k) lo = i + 1;
            else return a[i];
        }
        return a[lo];
    }

   /***************************************************************************
    *  Helper sorting functions.
    ***************************************************************************/

    // is v < w ?
    private static boolean less(Comparable v, Comparable w) {
        if (v == w) return false;   // optimization when reference equals
        return v.compareTo(w) < 0;
    }

    // exchange a[i] and a[j]
    private static void exch(Object[] a, int i, int j) {
        Object swap = a[i];
        a[i] = a[j];
        a[j] = swap;
    }

   /***************************************************************************
    *  Check if array is sorted - useful for debugging.
    ***************************************************************************/
    private static boolean isSorted(Comparable[] a) {
        return isSorted(a, 0, a.length - 1);
    }

    private static boolean isSorted(Comparable[] a, int lo, int hi) {
        for (int i = lo + 1; i <= hi; i++)
            if (less(a[i], a[i-1])) return false;
        return true;
    }

    // print array to standard output
    private static void show(Comparable[] a) {
        for (int i = 0; i < a.length; i++) {
            StdOut.println(a[i]);
        }
    }

    /**
     * Reads in a sequence of strings from standard input; quicksorts them;
     * and prints them to standard output in ascending order.
     * Shuffles the array and then prints the strings again to
     * standard output, but this time, using the select method.
     *
     * @param args the command-line arguments
     */
    public static void main(String[] args) {
        String[] a = StdIn.readAllStrings();
        Quick.sort(a);
        show(a);
        assert isSorted(a);

        // shuffle
        StdRandom.shuffle(a);

        // display results again using select
        StdOut.println();
        for (int i = 0; i < a.length; i++) {
            String ith = (String) Quick.select(a, i);
            StdOut.println(ith);
        }
    }

}

Copyright © 2000–2019, Robert Sedgewick and Kevin Wayne.
Last updated: Fri Dec 4 16:50:22 EST 2020.
```

3. 使用Go编写一遍

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

1. 使用标准版本，如果相对`[9,8,7,6,5,4,3,2,1]`进行排序，因为每次的`partition`都无法正确切割数组，导致性能降低到O($n^2$)
2. 使用标准版本，如果相对`[9,8,3,6,3,3,3,2,1]`进行排序，性能也会降低，主要是出现了大量相同元素

## 优化方案

* 二分方案，从被切割数组中随机获取一个数字，也就是 `pV := num[low]` 使用随机值

```java
 // 随机出来一个大于lo,小于hi的蒸熟
 int m = random(lo, hi);
 exch(a, m, lo);
```

* 三取样切分获取中位数，处理数据分布问题

```java
 // 获取中位数
 int m = median3(a, lo, lo + n/2, hi);
 // 将数放到low,这样排序的时候就用不到他了
 exch(a, m, lo);
```

::: tip 提示
20世纪70年代，快速排序发布不久后这段代码就出现了，但它并没有流行开来，因为在数组中重复元素不多的普通情况下它比标准的二分法多使用了很多次交换。
:::

* 三向分切，主要是解决数据重复比较多的问题，[代码地址](https://algs4.cs.princeton.edu/23quicksort/Quick3way.java.html)

```java
/**
 *  The {@code Quick3way} class provides static methods for sorting an
 *  array using quicksort with 3-way partitioning.
 *  <p>
 *  For additional documentation, see
 *  <a href="https://algs4.cs.princeton.edu/23quicksort">Section 2.3</a>
 *  of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 *  @author Robert Sedgewick
 *  @author Kevin Wayne
 */
public class Quick3way {

    // This class should not be instantiated.
    private Quick3way() { }

    /**
     * Rearranges the array in ascending order, using the natural order.
     * @param a the array to be sorted
     */
    public static void sort(Comparable[] a) {
        StdRandom.shuffle(a);
        sort(a, 0, a.length - 1);
        assert isSorted(a);
    }

    // quicksort the subarray a[lo .. hi] using 3-way partitioning
    private static void sort(Comparable[] a, int lo, int hi) {
        if (hi <= lo) return;
        int lt = lo, gt = hi;
        Comparable v = a[lo];
        int i = lo + 1;

        // 这里回把相同的数据放到一起
        while (i <= gt) {
            int cmp = a[i].compareTo(v);
            if      (cmp < 0) exch(a, lt++, i++);
            else if (cmp > 0) exch(a, i, gt--);
            else              i++;
        }

        // a[lo..lt-1] < v = a[lt..gt] < a[gt+1..hi].
        sort(a, lo, lt-1);
        sort(a, gt+1, hi);
        assert isSorted(a, lo, hi);
    }

   /***************************************************************************
    *  Helper sorting functions.
    ***************************************************************************/

    // is v < w ?
    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    // exchange a[i] and a[j]
    private static void exch(Object[] a, int i, int j) {
        Object swap = a[i];
        a[i] = a[j];
        a[j] = swap;
    }

   /***************************************************************************
    *  Check if array is sorted - useful for debugging.
    ***************************************************************************/
    private static boolean isSorted(Comparable[] a) {
        return isSorted(a, 0, a.length - 1);
    }

    private static boolean isSorted(Comparable[] a, int lo, int hi) {
        for (int i = lo + 1; i <= hi; i++)
            if (less(a[i], a[i-1])) return false;
        return true;
    }

    // print array to standard output
    private static void show(Comparable[] a) {
        for (int i = 0; i < a.length; i++) {
            StdOut.println(a[i]);
        }
    }

    /**
     * Reads in a sequence of strings from standard input; 3-way
     * quicksorts them; and prints them to standard output in ascending order.
     *
     * @param args the command-line arguments
     */
    public static void main(String[] args) {
        String[] a = StdIn.readAllStrings();
        Quick3way.sort(a);
        show(a);
    }

}
Copyright © 2000–2019, Robert Sedgewick and Kevin Wayne.
Last updated: Fri Dec 4 16:50:22 EST 2020.
```

* Go版本

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

### 参考书籍

* [算法4](https://algs4.cs.princeton.edu/23quicksort/)
* [Java数据结构和算法第二版](https://book.douban.com/subject/1144007/)
