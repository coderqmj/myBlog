## 一、JS函数式编程

### 1.1理解JavaScript纯函数

- 纯函数是函数式编程中有一个非常重要的概念，JS符合函数式编程的范式，所以也有纯函数的概念
  - 在React开发中纯函数的应用场景非常多
  - 比如React组件就被要求像是一个纯函数（不想你去修改传过来的props，为啥是像，因为有class组件），redux中还有一个reducer的概念，也是要求必须是一个纯函数
  - 所以学习掌握纯函数对于理解很多框架设计是非常有帮助的
- 维基百科对于纯函数的定义：
  - 在此函数在**相同的输入值**时，需要产生**相同的输出**
  - 函数的输出和输入值以外的其他隐藏信息或者状态无关，也和由I/O设备产生的外部输出无关。
  - 该函数不能有语义上可观察的函数**副作用**，如“触发事件”，做一些没有定义的操作，比如点击了一次浏览器。

#### **副作用的理解**

- 副作用本身是一个医学的概念，吃药时解决了身上的痛点，就可能产生了副作用
- 在计算机科学中，也引入了副作用的概念，表示在执行一个函数时，除了返回值以外，还对调用函数产生了附加影响

#### 纯函数的例子

- slice就是一个纯函数，不会操作源函数，且返回一个新数组（splice不是，会操作源数组，且返回新数组）

```js
const names = ['aaa', 'bbb', 'ccc', 'ddd'];
// slice每次都是一样的
const newNames = names.slice(0, 2);
const newNames = names.slice(0, 2);
const newNames = names.slice(0, 2);

// splice每次就不一样，
```



```js
// 纯函数
function bar(num1, num2) {
	return num1 + num2;
}

// 纯函数
function bbc(info) {
	return {
    ...info,
    age: 100
  }
}

// 非纯函数
var name = 'qmj'
function foo() {
	name = 'xxx'
}

// 涉及到参数修改也是非纯函数
function baz(info) {
	info.age = 100;
}
baz({name: 'qmj', age: 18  })
```

#### 纯函数的优势

- 可以安心的编写和安心的使用
- 编写的时候保证了函数的纯度，只是单纯的实现自己的业务逻辑就行，不需要关心传入的内容是如何获得的或者依赖其他的外部变量是否已经发生了修改。
- 在用的时候，你确定你的内容不会被任意修改，并且自己确定的输入，一定有确定的输出



### 1.2JavaScript函数柯里化

- 柯里化也是函数式编程的重要概念
- 维基百科：
  - 在计算机科学中，柯里化（Currying）
  - 是把接收多个参数的函数，变成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接收余下的参数，而且返回结果的新函数的技术。
  - **如果你固定某些参数，你将得到接收余下参数的一个函数**
- 总结：
  - 只传递给函数一部分参数来调用它，让他返回一个函数去调用处理剩余的参数
  - 这个过程就叫柯里化

#### 柯里化的过程和结构

```js
// 源函数
function foo(a, b, c, d) {
  return a + b + c + c;
}

// 柯里化过程
function bar(a) {
  return function(b) {
    return function(c) {
      return function(d) {
        return a + b + c + d;
			}
    }
	}
}
```

#### 简化柯里化

```js
// 方式一：箭头函数，本质上和上面的是一样的
const sum1 = x => y => z=> {
  return x + y + z
}
const sum1 = x => y => z=> x + y + z
```

### 1.3柯里化的作用

#### 让函数的职责单一

- 在函数式编程里面，希望一个函数处理的问题尽可能单一，而不是将一大推的处理过程交给一个函数去处理
- 我们是否就可以将每次传入的参数在单一的函数中进行处理，处理完后在下一个函数中再使用处理后的结果

#### 逻辑复用

- 场景一：比如需要对5和很多数进行相加

```js
function makeAdder(count) {
	return function(num) {
		return num + count;
  }
}

var adder5 = makeAdder(5);
adder5(10) // 15
adder5(20) // 25
adder5(30) // 35 
```

- 场景二：打印日志

```js
function log(data, type, message) {
  console.log(`[${data.getHours()}:${data.getMinutes()}][${type}]: [${message}]`)
}

log(new Date(), 'DEBUG', '控制台错误')
log(new Date(), 'DEBUG', '未校验')
log(new Date(), 'DEBUG', '查询数据错误')

// 上面的代码每次都需要传入相同的参数，很麻烦，不优雅

// 优雅的写法
const curryingLog = data => type => message => {
  console.log(`[${data.getHours()}:${data.getMinutes()}][${type}]: [${message}]`);
}

const messageCurrying = curryingLog(new Date())('DEBUG');
const logMessage1 = messageCurrying('代码Bug')
const logMessage2 = messageCurrying('cssBUG')
const logMessage3 = messageCurrying('语法错误')
console.log(logMessage1, logMessage2, logMessage3)

// 逻辑得到复用，且代码非常优雅
```

### 1.4柯里化函数的实现

- 上面几个函数都是在手动的去柯里化
- 现在希望有一个函数帮我们自动的去转换，直接返回的函数就是柯里化后的函数

```js
function Currying(fn) {
	return function curried(...args) {
    if(fn.length <= args.length) {
      return fn.apply(this, args)
    } else {
      function curried2(...args2) {
        return curried.apply(this, [...args, ...args2])
      }
      return curried2
    }
	}
}
```

#### 柯里化的例子

- vue中的渲染器
- redux的redux-thunk的实现原理

### 1.5组合函数

- 组合（Compose）函数是在JavaScript开发过程中对一种函数的使用技巧、模式
  - 比如我们现在需要对某一个数据进行函数的调用，执行两个函数fn1和fn2，这两个函数是依次执行的
  - 那么如果每次我们都需要进行两个函数的调用，操作上就会显得重复
  - 是否可以将这两个函数组合起来，自动依次调用呢？
  - 这个过程就是对函数的组合，我们称之为组合函数（Compose Function）

#### 举个例子

- 简单实现两个函数的组合

```js
function double(num) {
   return num * 2
}

function square(num) {
  return num ** 2
}

// 不组合
const res = square(double(10)); // 400

// 组合
function composeFn(m, n) {
  return function(count) {
    return n(m(count))
  }
}

const newFn = composeFn(double, square)
console.log(newFn(10))
```

- 实现通用函数组合

```js
function Compose(fns) {
  // 处理传入的不是函数，抛出异常
  let length = fns.length;

  function compose(...args) {
    let index = 0;
    let result = length ? fns[index].apply(this, args) : args;
    while (+index < length) {
      result = fns[index].call(this, result)
    }
    return result;
  }
  return compose;
} 
```

## 二、JSON

### 2.1JSON概述

#### JSON由来

- 在目前开发中，JSON是一种非常重要的数据格式，不是编程语言，而是一种可以在服务器和客户端之间传输的数据格式
- JSON全称是（JavaScript Object Notation）（JavaScript对象符号）：
  - JSON是一种轻量级资料交换格式，属于JS的子集
  - JSON提出来的时候主要应用于JavaScript中，但目前已独立于编程语言，可以在各个语言中使用
  - 很多编程语言都实现了将JSON转成对应模型的方式
- 其他传输格式
  - XML：在早期网络传输中主要使用XML进行数据交换，但格式解析，传输方面都不如JSON，所以目前很少用了
  - Protobuf：目前使用的越来越多传输格式是protobuf，但是直到2021年才支持JS，所以前端中用的很少。
- 目前JSON被使用的场景越来越多
  - 网络中传输的JSON数据
  - 项目中的配置文件
  - 非关系型数据库将json作为存储格式

### 2.2JSON序列化

- 某些情况下我们希望将JavaScript中的复杂类型转换成JSON格式的字符串，方便对其处理
  - 比如我们希望将一个对象保存在localStorage中
  - 但是我们直接存放一个对象，就直接被转化成[object Object]格式的字符串， 并不是我们想要的结果

```js
const obj = {
  name: "qmj",
  age: 18
}

localStorage.setItem("obj", obj) // [object Object]

// 正确用法，将对象转为字符串
const objString = JSON.stringify(obj)

// 将字符串转换为对象
const info = JSON.parse(objString);
```

#### JSON.stringify一些细节

- 不传第二个参数是直接转化的，但JSON.stringify是有第二个参数的，还有第3个参数

```js
const obj = {
  name: "qmj",
  age: 18,
  height: 1.88
}
// 1.第二个参数：传入数组，设定哪些需要转化
const objString = JSON.stringify(obj, ["name", "age"]);  // 这样只会转化name和age两个字段

// 2.第二个参数：传入回调函数
const objString1 = JSON.stringify(obj, (key, value) => {
  if(key === 'age') {
    return value + 1
  } else {
    return value
	}
});
// objString1的年龄就变成虚岁了

// 3.第三个参数，space
const objString2 = JSON.stringify(obj, null, 2)  // 被格式化，会换行，且缩进2个空格
```

####  JSON.parse的一些细节

- 也有第二个参数

```js
// 第二参数为回调函数
const obj1 = JSON.parse(objString, (key, value) => {
  if(key === 'age') {
    return value - 1
  } 
  return value
});

// 
```

## 三、浏览器存储方案

### 3.1Storage

- WebStorage主要提供了一种机制，可以让浏览器提供一种比cookie更直观的key、value存储方式
  - localStorage：本地存储，提供的是一种永久存储方法