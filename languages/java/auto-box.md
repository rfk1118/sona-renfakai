# 自动装箱

## 代码

```java
public class AutoBox {
    public static void main(String[] args) {
        Integer a = 1;
        Integer b = 2;
        Integer c = 3;
        Integer d = 3;
        Integer e = 321;
        Integer f = 321;
        Long g = 3L;
        System.out.println(c == d);
        System.out.println(e == f);
        System.out.println(c == (a + b));
        System.out.println(c.equals(a + b));
        System.out.println(g == (a + b));
        System.out.println(g.equals(a + b));
    }
}
```

## 享元

### Java享元代码

```java
  /**
  * Cache to support the object identity semantics of autoboxing for values between
  * -128 and 127 (inclusive) as required by JLS.
  *
  * The cache is initialized on first usage.  The size of the cache
  * may be controlled by the {@code -XX:AutoBoxCacheMax=<size>} option.
  * During VM initialization, java.lang.Integer.IntegerCache.high property
  * may be set and saved in the private system properties in the
  * sun.misc.VM class.
  */

private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        // 获取AutoBoxCacheMax缓存的最大值
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                // 转换成数字
                int i = parseInt(integerCacheHighPropValue);
                // 获取最大值
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;
        // 使用数组缓存数据
        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }

    private IntegerCache() {}
}
```

* `System.out.println(c == d);`测试结果为 true，`Integer` 对`-128~127`使用了享元设计模式，底层是同一个对象。
* `System.out.println(e == f);`测试结果为 false，不在享元数据内。

## 字节码

### Integer#intValue

* `System.out.println(c == (a + b));`结果为 true，享元数据3转换成int，并将享元数据1和2转换成int后进行累加，进行对比，对比数据都是int类型。

```java
83 aload_3
84 invokevirtual #8 <java/lang/Integer.intValue>
87 aload_1
88 invokevirtual #8 <java/lang/Integer.intValue>
91 aload_2
92 invokevirtual #8 <java/lang/Integer.intValue>
95 iadd
96 if_icmpne 103 (+7)
99 iconst_1
100 goto 104 (+4)
103 iconst_0
```

### Integer#equals

* `System.out.println(c.equals(a + b));`这个为 true，享元数据1和3转换成int，在`Integer.valueOf`转换成了享元数据，所以有无`Integer.equals`结果都为true。

```java
110 aload_3
111 aload_1
112 invokevirtual #8 <java/lang/Integer.intValue>
115 aload_2
116 invokevirtual #8 <java/lang/Integer.intValue>
119 iadd
120 invokestatic #2 <java/lang/Integer.valueOf>
123 invokevirtual #9 <java/lang/Integer.equals>
// 其结果使用了享元，即使不使用equals结果也为true
//     if (obj instanceof Integer) {
//       return value == ((Integer)obj).intValue();
//     }
//     return false;
// 所以结果为true
```

### i2l

* `System.out.println(g == (a + b));`结果为true，对于享元数据1和2转成int进行累加，并将将int转换为long，进行数据对比，对比的数据都是long类型。

```java
aload 7
157 invokevirtual #11 <java/lang/Long.longValue>
160 aload_1
161 invokevirtual #8 <java/lang/Integer.intValue>
164 aload_2
165 invokevirtual #8 <java/lang/Integer.intValue>
168 iadd
169 i2l
// 将int转换为long
170 lcmp
171 ifne 178 (+7)
174 iconst_1
175 goto 179 (+4)
178 iconst_0
// 将int结果变为long(i2l),进行对比
```

### Integer != Long

* `System.out.println(g.equals(a + b));`结果为 false，享元数据1和2转换成int，累加，在转换成享元数据3，而Long是不进行享元存储的，这里进行对比的时候，`Integer != Long`

```java
132 aload 7
134 aload_1
135 invokevirtual #8 <java/lang/Integer.intValue>
138 aload_2
139 invokevirtual #8 <java/lang/Integer.intValue>
142 iadd
143 invokestatic #2 <java/lang/Integer.valueOf>
146 invokevirtual #10 <java/lang/Long.equals>

Long.equals(Integer);
public boolean equals(Object obj) {
    if (obj instanceof Long) {
      return value == ((Long)obj).longValue();
    }
    return false;
}
```
