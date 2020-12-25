## 一.绑定规则

### 1.1规则一——默认绑定

什么情况下默认绑定？

- 独立函数的调用
- 全部都指向window

情况一：

```javascript
function foo() {
	clonsole.log(this)
}
foo()
```

情况二：函数的嵌套调用

- 三个全部输出window

```javascript
function foo1() {
	clonsole.log(this)
    foo2()
}
function foo2() {
	clonsole.log(this)
    foo3()
}
function foo3() {
	clonsole.log(this)
}
foo1()
```

情况三：把一个函数作为另外一个函数的参数

```javascript
function foo(fn) {
	fn() // 也是独立调用
}
function foo1() {
	clonsole.log(this)
}
foo(foo1)
```

### 1.2规则二——隐式绑定

隐式绑定：函数的调用是由一个对象发起的, 是JavaScript内部帮我们绑定的

案例一：

- 打印obj
- 原因是由obj发起的

```javascript
function foo() {
	console.log(this)
}
var obj = {
	name: 'qmj',
    test: foo
}
obj.test(); //obj,原因是由obj发起的
```

案例二：

- 打印obj
- 原因是由obj发起的，obj2只负责拿到obj

```javascript
var obj2 = {
    obj: obj
}
obj2.obj.test() 
```

案例三：

- window，这个是独立函数调用

```javascript
var fn = obj.test
fn()
```

### 1.3规则三——显示绑定

#### 1.3.1call/apply

#### 1.3.2setTimeout

- 该函数作为一个参数
- V8引擎内部会将该函数apply到window上

```javascript
setTimeout(function() {
    console.log('111')
}，1000)
```

#### 1.3.3高阶函数中this

- 结果是window
- 内部不是通过apply，而是bind到第二个参数中，默认的是window

```javascript
var names = ['qiu', 'mo', 'jian']
names.forEach(function(item){
	console.log(this)
})
```

#### 1.3.4 元素监听中的this

- 打印出`<div class="box">div元素</div>`

```javascript
<div class="box">div元素</div>
var box = document.querySelector('.box')
box.onclick = function() {
	console.log(this)
}
```

### 1.4规则四——new绑定

使用new关键字来调用函数，会执行以下操作：

- 1.擦黄建一个全新的对象
- 2.这个新对象会被执行Prototype连接
- 3.这个新对象会绑定到函数调用的this上
- 4.如果函数没有返回其他对象，则返回当前对象

## 二、规则的优先级

### 2.1默认绑定规则的优先级最低

### 2.2显示绑定高于隐式绑定

代码验证：

```javascript
var foo = function() {
      console.log(this.name)
}
    var obj = {
      name: 'qmj',
      foo: foo
    }
    var obj2 = {
      name: '邱模建',
      foo: foo
    }
    obj.foo.call(obj2) // 邱模建
```

### 2.3new绑定的优先级高于隐式绑定

代码验证：

```javascript
 var obj = {
      name: 'qmj',
      foo: function() {
      console.log(this)
    }
 }
 var p = new obj.foo() // foo方法
```

### 2.4new高于显示绑定优先级

注意：**new/apply/call不能同时使用**,但是**new可以和bind同时使用**

错误例子：`var p = new foo.call(person)`

## 三、规则之外的绑定规则

```javascript
function foo() {
	console.log(this)
}
foo.call('123')	// 123
foo.call(null)	// window
foo.call(undefined)	// window
foo.call({})	// {}
foo.call([])	// []
foo.call(123)	// Number 123
```

