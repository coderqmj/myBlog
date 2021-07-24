### 一、TypeScript的初体验

#### 1.1TS的环境

- TS最终会被编译成JS来运行，所以我们需要搭建对应的环境：
  - 安装tsc: `npm i typescript -g` , 执行 `tsc --version`可以查看版本号
  - webpack的babel插件

**hello_ts**

- 当我们传入期望之外的值会报错提示

```typescript
let message: string = 'coderqmj';
message = 123 // 这里会报错
function foo(payload: string) {
  console.log(payload)
}
foo() // 报错
foo(123) // 报错
foo('hello') 正确
```

#### 1.2执行ts

- `tsc 文件名` => 会生成一个同名的js文件，但里面的代码是ts经过转换生成的js代码
- 如果检查到传入非正确类型的值，会编译不通过

#### 1.4搭建ts环境

- webpack搭建
  - 安装并使用ts-loader `tnpm i ts-loader typescript -D`
  - 配置tsconfig.json文件（可以使用tsc --init生成默认文件）
  - 然后`npm run build`，就可以根据配置生成可执行的js代码
  - 但是每次都要打包，那就太麻烦了，这个时候安装`npm i webpack-dev-server -D`，然后package.json配置 "serve": "webpack serve"
    - 然后再安装模板：`npm i html-webpack-plugin -D`
- 配置文件
  

```json
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  devServer: {
  },
  resolve: {
    extensions: [".ts", ".js", ".cjs", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
}
```



- ts-node库直接执行
  - npm i ts-node tslib @types/node -g

#### 1.3一些思考与感悟

- 默认情况下，同一个目录下的ts文件在同一个作用域，所以a目录下的a1和a2文件都命名了name这个变量，会提示报警
- 解决办法：
  - 在文件中写 `export {}` 

### 二、Typescript基础

#### 2.1变量声明

- 在TS中定义变量需要指定 **标识符** 的类型
- 所以完整的声明格式如下：
  - 声明了类型后TS就会进行**类型检测**， 声明的类型可以称之为**类型注解**
  - `var/let/const 标识符： 数据类型 = 赋值`

一个例子：

```typescript
// 1.类型注解
// 2.var/let/const
// 3.string和String的区别
var name: string = "qmj"
let age: number = 18
const height: number = 1.88

// 4.类型推导
let foo = 123
foo = "123" // 报错，因为类型推导
```

- 思考：有些时候定义类型的时候，string 有些时候 小写 string， 有些时候大写String，这两者之间有什么区别？
  - 如果是小写的代表是Typescript中的字符串类型
  - 如果是大写，代表是JavaScript的字符串包装类的类型
- 所以真正在typescript中定义数据类型的是小写的写法，不要用错了
- ts还有一个特性就是类型推导
  - 在ts文件中给一个变量赋值了number类型，再给他赋值string类型，就会报错，即使没有对该变量进行定义类型

#### 2.2number类型

- 十进制，二进制，八进制都可以定义

```typescript
let num: number = 123
num = 222

// num = "123"

let num1: number = 100 
let num2: number = 0b100
let num3: number = 0o100
let num4: number = 0x100

console.log(num1, num2, num3, num4)
```

#### 2.3boolean类型

- 只有true和false

```typescript
let flag: boolean = true
flag = 20 > 30
```

#### 2.4string类型

```typescript
let message1: string = 'hello world'
let message2: string = "Hello World"


// 个人习惯: 默认情况下, 如果可以推导出对应的标识符的类型时, 一般情况下是不加
const name = "qmj"
const age = 18
const height = 1.88

let message3 = `name:${name} age:${age} height:${height}`
console.log(message3)

export {}

```

#### 2.5array类型的使用

- 思考一个问题，定义一个数组，那么数组中应该存放的是什么元素呢？
- 但是在Typescript中，数组存放的数据类型最好是单一固定的
- 定义数组类型一般有两种方法
  - 注意数组没有小写的array，只有大写的Array
  - 一般推荐下面第二种的写法，因为第一种写法在 React中的 jsx是有冲突的
    - 因为jsx中有`<div></div>`这种尖括号，babel解析可能会出现问题

```typescript
// 1.定义一个只存放字符串的数组
const names: Array<string> = []  // 一般不推荐这种写法
// 2.
const names2: string[] = [] // 推荐这写法
```

#### 2.6object类型的使用

- 在ts文件中这样定义，每一个key都会被类型推导，进行类型的限制

```typescript
const info = {
	name: 'qmj',
	age: 18
}
```

