# 奇偶互换

58面试时候面的算法题，就是一个数组，奇数放前面，偶数放后面。

## 代码

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

## 优化

数据交换时候可以不借用三方变量吗？请查看[Xor](./xor.md)
