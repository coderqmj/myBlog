### 一、数据类型

### 1. 基本数据类型

- **布尔类型（bool）**：表示真或假，只有两个值：`true` 和 `false`。
- **整数类型**：
  - 有符号整数：`int8`, `int16`, `int32`, `int64`, `int`
  - 无符号整数：`uint8`, `uint16`, `uint32`, `uint64`, `uint`
  - 平台相关整数：`int` 和 `uint` 的大小取决于平台（32位或64位）
  - 其他：`byte`（`uint8` 的别名），`rune`（`int32` 的别名，表示Unicode码点）
- **浮点数类型**：`float32`, `float64`
- **复数类型**：`complex64`, `complex128`

### 2. 字符串类型

- **字符串（string）**：表示一串不可变的字节序列，通常用于存储文本数据。

### 3. 派生类型

- **指针（Pointer）**：存储变量的内存地址。
- **数组（Array）**：固定长度的相同类型元素的集合。
- **切片（Slice）**：动态数组，可以动态增长和缩小。
- **结构体（Struct）**：用户自定义的复合数据类型，可以包含多个不同类型的字段。
- **函数类型（Function）**：函数也是一种类型，可以作为参数传递或返回值。
- **接口（Interface）**：定义了一组方法的集合，任何实现了这些方法的类型都实现了该接口。
- **映射（Map）**：键值对的集合，类似于其他语言中的字典或哈希表。
- **通道（Channel）**：用于在不同的goroutine之间进行通信。

### 4. 复合数据类型

- **数组（Array）**：固定长度的相同类型元素的集合。
- **切片（Slice）**：动态数组，可以动态增长和缩小。
- **结构体（Struct）**：用户自定义的复合数据类型，可以包含多个不同类型的字段。
- **映射（Map）**：键值对的集合，类似于其他语言中的字典或哈希表。

### 5. 特殊类型

- **错误类型（error）**：用于表示错误信息的内置接口类型。
- **空类型（nil）**：表示指针、接口、切片、映射、通道等类型的零值。

## 二、流程控制语法

### 1.if else

#### 1.1普通写法

```go
package main

import "fmt"

func main() {
	// const lang = "go"
	const lang = "js"
	if lang == "go" {
		fmt.Println("hello go")
	} else if lang == "js" {
		fmt.Println("hello js")
	} else {
		fmt.Println("未知语言")
	}
}
```

#### 1.2另一种写法

- 变量定义赋值&判断都可以放到if里面
- 但是只能在if里面使用

```go
package main

import "fmt"

func main() {
	// 变量定义赋值&判断都可以放到if里面
	if lang := "go"; lang == "go" {
		fmt.Println("go语法")
	}
}

```

### 2.for语句

### 2.1基础写法

```go
package main

import "fmt"

func main() {
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}
}

```

### 2.2无限循环

```go
package main

import "fmt"

func main() {
	i := 1
	for {
		if i < 10 {
			fmt.Println(1)
			i++
		} else {
			break
		}
	}
}

```

### 2.3 for range

```go
package main

import "fmt"

func main() {
	str := "我正在学习golang"
	for key, value := range str {
		fmt.Printf("%v %c\n", key, value)
	}
}
```

