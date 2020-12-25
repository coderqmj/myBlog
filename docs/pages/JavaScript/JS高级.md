

## 一.基础总结深入

### 一.数据类型

#### 1.分类

- 基本(值)类型
  - String  : 任意字符串
  - Number : 任意数字
  - boolean : true false
  - undefined : undefined 定义了为赋值
  - null: null 定义了赋值了，但值为null
- 对象(引用)类型
  - Object : 任意对象
  - Function : 一种特别的对象(可以执行)
  - Array: 一种特别的对象(数字下表属性，通过下标操作，有序)

#### 2.判断

- typeof

  - 返回数据类型的字符串表达

  - 可以判断:undefined/数值/字符串/布尔值/function

  - 不能判断:null 与  object 与 Array => 返回都是 'object'

  - ~~~javascript
    console.log(a,typeof (a) ,typeof a === 'undefined',a==='undefined'); //undefined 'undefined' true false
    var a
    a = 3
    console.log(typeof a ==='Number',typeof a ==='number' );//false true
    console.log(typeof 数组)  //'object'
    ~~~

  ~~~javascript
  typeof null === 'object' ? 在Javascript中二进制前三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0
  ~~~

  - ~~~ javascript
    typeof null,array,object => 返回都是 object
    ~~~

- instanceof

  - 判断对象的具体类型
  - 判断前面是否为后面的实例  返回 `boolean`

- ===

  - 可以判断undefined/null 只有一个值都可以判断

#### 3.相关问题

- 1.null和undefined 的区别

  - null：定义并赋值，但值为null

  - undefined：定义了，但没赋值

  - ~~~javascript
    var a; console.log(a);a = null;console.log(a);  //undefined null
    ~~~

- 2.什么时候需要赋值为`null`

  - 初始赋值给一个对象（数组）时，表明其为对象 `var obj = null` 
  - 已经赋值好的对象(数组)，赋值为`null` ，表示回收对象

- 3.严格区别数据类型 和 变量类型

  - 数据类型
    - 基本类型
    - 对象类型
  - 变量类型（变量内存值的类型）
    - 基本类型：保存的是基本类型的数据
    - 应用类型：保存的是地址值

### 二.数据，变量，内存

#### 1.数据

- 1.什么是数据？
  - 储存在内存中的特定信息，0101....

#### 2.内存

- 1.什么是内存？
  - 内存条可存储数据的空间(临时的)
  - 一块内存存两个数据：:one: 内部存储的数据  :two:地址值
  - 内存的分类：
    -  :one:栈   ：全局变量/局部变量
    -  :two:堆：对象
  - ![1582090374563](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1582090374563.png)

#### 3.变量

- 什么是变量？
  - 可变化的量，由变量名和变量值组成
  - 每个变量都对应的一小块内存，变量名用于查找内存，变量值内存中保存的数据

#### 4.数据，内存，变量之间的关系

- 内存是用来存储数据的空间
- 变量是内存的标识

#### 5.相关问题

- ~~~javascript
  var a = xxx ,a 内存保存的是什么？
  1.xxx为基本数据：保存的就是这个数据
  2.xxx是对象：保存的是对象的地址值
  3.xxx为变量：保存的为xxx的内存内容(可能是基本数据，也可能是地址值)
  ~~~

- ~~~javascript
  2个引用对象指向同一个对象，让其中一个对象指向另外一个，另一个引用变量依然直向前一个对象
  2个变量指向同一个对象，通过其中一个变量修改对象内部数据，其他所有变量看到的都是修改后的数据
  var a = {age:12}
  b = a
  a = {age:13,name:'qiu'}
  console.log(b.age,a.age,a.name);//12 13 qiu  b.age 指向前一个对象age=12
  
  var a = {age:12}
  b = a
  a = {age:13,name:'qiu'}
  function foo (obj){
   return obj={age:18}
  }
  foo(b) //原因为函数执行完内部的数据会被回收 所以还是12
  console.log(b.age); //12 指向的还是前一个
  ~~~

- ~~~javascript
  内存如何释放？
  局部变量：函数执行完自动释放
  对象：成为垃圾对象==>垃圾回收器回收
  ~~~

### 三.对象

#### 1.什么是对象？

- 保存多个多种数据的容器，一个对象代表现实世界的事物

#### 2.obj['属性名']什么时候使用

- 1.当有特殊字符时

- ~~~javascript
  var obj = {
    'content-type':'text/json'
  }
  console.log(obj["content-type"]); //正确
  ~~~

- 2.当变量名不确定时

### 四.函数

- 数据类型中只有函数才可以执行
- 提高代码复用

#### 1.函数的调用

- foo() : 直接调用

- obj.test() 通过对象调用

- new foo（） new 调用

- foo.call/apply(obj):临时让foo成为obj的方法调用

  - ~~~javascript
    可以让一个函数成为某个对象的方法进行调用
    var obj = {}
    function foo (){
      this.name = 'qiu'
    }
    foo.call(obj) //this为obj
    console.log(obj.name);  //qiu
    ~~~

  - 

- ~~~javascript
  1.声明式函数
  function foo(){}
  2.函数表达式
  var bar = function(){}
  ~~~

  

### 五.回调函数

#### 1.什么是回调函数？

- 你定义的+你没有调用+但最终执行了

#### 2.有哪些回调函数？

- DOM点击事件
- 定时器回调函数
- ajax回调函数
- 生命周期等等

### 六.立即执行函数 IIFE

#### 1.理解

- 也可以成为**匿名函数自调用**

#### 2.作用

- 隐藏实现
- 不会污染外部(全局)命名空间

### 七.函数中的this

#### 1.什么是this？

- 任何函数都是通过对象来调用，如果没有指定，该对象为window
- **立即执行 未指定必定是window** 除非用显示绑定
- 所有函数都有一个变量this
- 他的值是调用该函数的对象

#### 2.如何确定this

- foo() ==> window

- p.foo() ==> p

- new foo(​）==> 新建对象​

- p.call(obj) ==> obj

- **隐式绑定**：

- 函数的直接对象（**点前面的对象**）是obj，this指向这个直接对象

  - ~~~javascript
    function foo(){
        console.log(this.a)
    }
    var obj = {
        a:1
        foo:foo
        obj2:{
        	a:2
        	foo:foo
    	}
    }
    obj.foo() // 1
    obj.obj2.foo() //2
    ~~~

- **隐式丢失：**

  - **1.函数别名丢失**

    - ~~~javascript
      var a = 0;
      function foo(){
          console.log(this.a)
      }
      var obj = {
          a:1,
          foo:foo
      }
      var bar = obj.foo()  //this指向window
      bar() // 0
      ~~~

  - **2.参数传递丢失**

    - ~~~javascript
      var a = 0;
      function foo(){
          console.log(this.a)
      }
      function bar(fn){
          fn()
      }
      var obj = {
          a:1,
          foo:foo
      }
      bar(obj.foo)  //0 this 指向window
      //将obj.foo当做参数的时候会发生，隐式函数赋值fn = obj.foo，只是把foo赋值给fn。而fn与obj毫无关系.所以foo内部this指向window
      ~~~

  - **3.定时器内部函数**

    - ~~~javascript
      var a = 0;
      function foo(){
          console.log(this.a)
      }
      var obj = {
          a:1,
          foo:foo
      }
      setTimeout(obj.foo,1000) // 0 两个定时器内部的函数的this指向window，与第二种情况是类似的
      ~~~

  - **4.间接调用**

##### 显示绑定

- ***call()*** **apply()** **bind()** 把对象绑定到this上

- **硬绑定**：

  - 显示绑定的变种

  - ~~~javascript
    var a = 0;
    function foo(){
        console.log(this.a)
    }
    var obj = {
        a:1
    }
    var bar = function (){
        foo.call(obj)
    }
    //无论怎么调用bar它都硬绑定在obj上
    bar() //1
    setTimeout(bar,2000) //2
    bar.call(window) //2
    ~~~

  - 

- 

## 二.函数高级

### 一.protype

#### 1.函数的prototype的属性

- 每个函数都有一个prototype属性，他默认指向一个object空对象（即原型对象）
- 原型对象中有一个属性constructor,他指向函数对象

#### 2.给原型对象添加属性(一般都是方法)

- 作用：函数的所有实例对象自动拥有原型中的属性(方法)

- ~~~javascript
  function foo(){
  }
  foo.prototype.test = function(){
    console.log('test()');
  }
  console.log(foo.prototype);
  ~~~

- ~~~javascript
  console.log(function.prototype.getMinutes === function)  //false
  console.log(function.prototype.constructor === function) //true
  
  ~~~

- ![1582369840687](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1582369840687.png)



### 二.显示原型和隐式原型

#### 1.什么事显示原型和隐式原型？

- 显示原型：每个函数都有一个prototype ==> 属于原型函数的

- 隐式原型：每个实例对象都有一个_proto__ ==> 属于实例对象的

- 对象隐式原型的值为其对应构造函数的显示原型的值

  - ~~~javascript
    console.log(foo.prototype === a.__proto__);  //true
    
    ~~~

- ![1582371549146](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1582371549146.png)

#### 2.原型链

- 1.访问一个对象属性时，
  - 先在自身属性中查找，找到则返回
  - 如果没有，再沿着_proto__这条链查，找到则返回
  - 如果最终没找到，返回undefined
  - ![1582438097286](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1582438097286.png)
- 别名：隐式原型链
- 作用: 查找对象的属性
- 知识点：
  - 1.函数的显示原型指向的对象：默认是空的object的实例对象(Object不满足)
  - 原型链的尽头=>Object原型对象

### 十.探索instanceof

#### 1.图解

![1582610915258](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1582610915258.png)![1582721839636](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1582721839636.png)

![1582717074269](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1582717074269.png)



- Foo.protype->_proto__->Object.prototype原因是函数是Object的实例
- 接上，所以实例对象的隐式原型(_proto__)===构造函数的显示原型(prototype)

- 实例对象(a)走_proto__ ,B走显示原型prototype
- 函数都有显示原型属性=>prototype
- 实例对象有隐式原型属性=>_proto__
- Objec._proto__一般指向`null`
- 函数的原型对象为空的Object空的实例对象 => Function.prototype--proto-->Object.ptototype
- 所有函数的原型对象都是Object的实例(Object除外，虽然他也是函数)
- function Function 的**显示原型**和隐式原型都是 Function.prototype
- 判断方法：
  - 显示原型走一步找到对应的 prototype
  - 然后隐式原型走，若走到上面对应的prototype，走到Object还没找到就指向null了 返回 false

#### 2.表达式 A instanceof B 

- 若B函数的显示原型对象在A对象的原型链上？`true`:`false`
- Object也是 function Object() => 所以他也是 Function的实例
- ![1582724043323](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1582724043323.png)

### 三.变量提升与函数提升

#### 1.变量提升

~~~javascript
console.log(b) //undefined
var b = 3

//let不存在函数提升，在后面无论如何也会报错
console.log(b) //referenceError
let b = 3

~~~

#### 2.函数提升

~~~javascript
fn() //fn() 可以调用 函数提升
functon fn(){
    console.log("fn()")
}

~~~

- 注意:

- ~~~javascript
  //下面情况会报错，遵循的是变量提升
  foo()
  var foo = function(){
    console.log('foo()');
  }
  
  ~~~

### 四.执行上下文

#### 1.全局执行上下文

- 在执行全局代码将window确定为全局执行上下文

- 对全局数据进行预处理

  - var定义的全局变量==>undefined，添加为window的属性
  - function声明2的全局函数==>赋值(fun),添加为window 的方法
  - this==>赋值(window)

- 开始执行全局代码

- ~~~javascript
  function a(a1, a2) {
      console.log(arguments);
    }
    a(1, 2)
  //{ '0': 1, '1': 2 } 伪数组
  
  ~~~

#### 2.函数执行上下文

- 在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象
- 对局部数据进行预处理
  - 形参变量==>赋值(实参)==>添加为执行上下文的属性
  - arguments==>赋值(实参列表)，添加为执行上下文的属性
  - var定义的局部变量==>undefined,添加为执行上下文的属性
  - function声明的函数==>赋值(fun)，添加为执行上下文的方法
- this==> 赋值(调用函数的对象)

## 三.你可能不熟悉的JS总结

### 一.暂时性死区

只要块级作用域存在`let`命令，他所声明的变量就绑定了这个区域，不在受外部影响

~~~javascript
var temp = 123;
if(true) {
    console.log(temp);
    let temp || temp = 3;
}

结果：
> ReferenceError: temp is not defined

~~~

### 二.call 和apply 方法

这两个方法改变该函数的上下文对象，只是接受参数方式不一样.

`call`接收的是逗号分隔的参数

`apply` 接收的是参数列表

### 三.执行机制

- macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
- micro-task(微任务)：Promise，process.nextTick
- **new Promise 是立即执行的**

**执行顺序**：

- 进入整体代码(宏任务)，开始第一次循环
- 接着执行所有的微任务.
- 再从红任务开始，找到其中一个任务队列执行完毕
- 再执行所有的微任务
- ![执行机制](D:\Project\JavaScript\js执行机制\执行机制.png)

~~~javascript
console.log('2');
process.nextTick(function() {
   console.log('3');
})
new Promise(function(resolve) {
	console.log('4');
    resolve();
}).then(function() {
	console.log('5')
})
// 2 4 3 5
---------------------------------------------------
setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})

console.log('console');

// promise -> console -> then -> setTimeout

~~~







