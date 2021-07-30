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

#### 2.7Typescript-any类型

- 某些情况下，我们无法确定该数据的类型，或者以后有可能涉及到类型的修改，才会使用any

#### 2.8Typescript-unknown类型

- 用法和any差不多，但是比any更安全点，因为unknown类型的数据不可以拿出去用，复制，传参都不可以。
- 而any是可以的

#### 2.9Typescript-void类型

- 通常指一个函数没有返回值，那么它的返回值就是void类型：
  - 可以把null和undefined复制给void类型，

#### 2.10对象类型

```typescript
function printPoint(point: {x: number, y: number}) {
  console.log(point.x, point.y)
}
printPoint({}) // 报错
printPoint({x: '123'}) // 报错
printPoint({x: 1, y: 2}) // 正确
```

#### 2.11可选类型

```typescript
function printPoint(point: {x: number, y: number, z?: number}) {
  console.log(point.x, point.y)
}
printPoint({}) // 报错
printPoint({x: '123'}) // 报错
printPoint({x: 1, y: 2}) // 正确
printPoint({x: 1, y: 2, z: 3}) // 正确
```

#### 2.12联合类型

- TS允许我们使用多种运算符，从现有类型中构建新类型

```typescript
function foo(id: number|string) {
  console.log(id)
}
```

### 三、TS特性

#### 3.1类型断言as

- 有些时候TS无法获取具体的类型信息，这个我们需要使用类型断言（Type Assertions）。
  - 比如我们通过document.getElementById，TS只知道该函数会返回HTMLElement，但并不知道它具体的类型

**场景一**

- 上面通过id获取到HTML元素，TS类型推导为HTMLElement类型，然后通用的这些类型里面可以调用`style`, `className`等属性可以取用。
- 但是如果通过id获取到的是Img标签呢？取用`src`属性时就会报错，那么怎么去缩小这个范围呢？
- 答案是断言，断言可以把比较普遍的类型转成具体的类型

```typescript
const el = document.getElementById("qmj") as HTMLImageElement;

el.src = 'http:xxx' // 就可以正常取用src属性不会报错了
```

**场景二**

- 在类继承的时候，拿不到子类的属性，就可以使用断言

```typescript
class Person {

}

class Student extends Person {
	studying() {
    
  }
}

function sayHello(p: Person) {
	p.studying(); // 报错
  (p as Student).studying();
}
```

**非空断言**

- 有一种场景，使用可选参数的属性时，无论是否传入参数编译会不通过，因为存在安全隐患。
- 那如果确保你传入了这个参数，那么就可以使用非空断言
- 非空断言表示其一定有值

```typescript
function foo(message?: string) {
	console.log(message.length)  // 编译会不通过	
  console.log(message!.length)  // 编译会通过，表示这个message一定有值，不需要判断什么的
}
```

#### 3.2  `??` 和 `!!`的作用

- !!操作符：
  - 将一个其他类型转换成Boolean类型
  - 类似于Boolean（变量）的方式

```typescript
const message = 'hello world';

// 转换成Boolean类型
const flag = Boolean(message); // true
// 使用!!
const flag = !!message
```



- ??操作符：
  - ES11新增的特性
  - 空值合并操作符（??）是一个逻辑操作符，当操作符的左侧是undefined或者null时，返回其右侧操作数，否则返回则侧操作数

```typescript
let message: string|null = null;

const content = message ?? '你好啊';
```

#### 3.3字面量类型

- 如果按照第二行代码去限制类型，那么就不能改变其他值，那又有什么意义呢？
- 字面量类型必须结合联合类型，才有意义。
  - 应用就是就是在UI组件源码中经常出现的，只能在其中几个值修改

```typescript
const message = 'Hello TS'; // 这个message在ts里面是Hello TS类型;
const message: 'Hello TS' = 'Hello TS'; // 和上面是等价的

// 结合联合类型
let align: 'left' | 'right' | 'center' = 'left'
// 开发中
type Alignment = 'left' | 'right' | 'center'
```

#### 3.4字面量推理

- 思考下面场景：
  - 调用的时候会第二个参数直接报错，因为这样只对method限制为string，而函数是要求 `GET`  和 `POST`
- 方法一从书写时就限制了类型，不规范直接不通过编译（**推荐**）
- 方法二使用了断言是其参数更加具体化，从而能通过编译
- 方法三就是限制其只能是只读模式（readonly），不能被其他地方修改，可以通过编译

```typescript
type Method = 'GET' | 'POST';

function request(url: string, method: Method) {
  
}

const option = {
  url: 'www.123.com',
  method: 'POST'
}

request(option.url, option.method)

// 解决办法一
type Request= {
	url: string,
  method: Method
}

const option: Request = {
  url: 'www.123.com',
  method: 'POST'
}

// 解决办法二
request(option.url, option.method as Method)

// 方法三 as const 字面量推理
const option = {
  url: 'www.123.com',
  method: 'POST'
} as const 
```

#### 3.5类型缩小

- 类型缩小的英文是Type Narrowing
- 可以使用 typeof padding === 'number'的判断语句来改变TS执行路径
- 在给定的执行路径中，我们可以缩小比声明是更小的类型，这个过程称之为 缩小

```typescript
type IDType = number | string

// 1.typeof 类型缩小
function printID(id: IDType) {
  console.log(id.length) // 报错，因为number可没有
  if(typeof id === 'string') {
    console.log(id.length) // 不会报错，因为确定这是一个字符串
}
  
// 2.平等的类型缩小
type Dir = 'left' | 'right' | 'top' | 'bottom'

function printDir(dir: Dir) {
  if(dir === 'left') {}// 操作
  switch (dir) {
    case 'right':
      console.log(dir)
      break;
    case 'top':
      console.log(dir)
      break;
    default:
      break;
  }
}
```

#### 3.6TS函数类型

- 函数类型的注解怎么写呢？

```typescript
function bar(fn: () => void) {
	fn()  
}
bar(foo)

// 定义常量时，编写函数的类型
type AddFnType = (num1: number, num2: number) => number
const add: AddFnType = (num1: number, num2: number) => {
  return  num1 + num2;
}
```

**函数可选类型**

- 可选类型必须放在必选的后面

**参数的默认值**

- 使用了默认值就可以不传该参数，直接使用默认值

```typescript
function foo(x:number, y: number = 100) {
  console.log(x + y)
}
foo(20)
```

**传参顺序**

- 建议是按照 必传 -> 有默认值 -> 可选 的顺序去传入参数

**函数的剩余参数**

- 我们想定义一个函数，传进来多少个参数，就把多少个参数相加

```typescript
function sum(...nums: number[]) {
  let total = 0;
  for (const num of nums) {
    total += num
  }
  return total;
}

sum(20, 30);
sum(20, 30, 40);
```

