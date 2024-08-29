### 1 Promise async await 介绍一下 

```javascript
Promise他是解决异步编程的一种方案；
主要有两个特点：
	1.解决了回调地狱
    2.可以链式调用
    
它本身具有race，all，resolve，reject等方法，原型上有then，catch等方法，
其中promise接收一个函数，并且这个函数又有两个参数，分别是执行成功的回调resolve，失败的回调reject。
其中.then第一个参数是执行成功的回调，第二个参数是执行失败的回调，.catch相当于.then的第二个回调，他可以指定reject的回调
```

### 2判断数组/String/数字

```
数组：Array.isArray / arr.constructor===Array / instanceof
字符串：typeof	/ str.constructor===String
数字：isNaN	/ typeof / constructor
```

### 3typeof返回值

```
除了null(返回的是object)的基本类型+function+object
```

### 4map和foreach的区别

```
两者功能差不多的
forEach不会返回结果，直接修改原来的数组
map返回全新的数组
```

### 5.es6特性

```
let/const /字符串模板/ 箭头函数/ 函数参数默认值/ 展开运算符/解构
set，map，promise
```

### 6. es6的类中 静态属性和构造函数谁先加载 为什么 ？

```

```

### 7.怎么在外部调用静态属性？

```

```

### 8.事件循环

```
宏任务：
	script整体代码
    setTimeout
    setInterval
    I/O
    UI render
微任务：
	process.nextTick
	
	Async/Await
事件循环：
	1.先执行整体代码，这属于宏任务；
	2.中途遇到宏任务，加入宏任务队列，遇到微任务加入微任务队列
	3.整体代码执行到底的时候，再读取本轮的微任务全部执行完，在读取宏任务进行下一轮执行
	
JS是单线程的，一个时间点做一个事情，为了防止执行阻塞，有了同步任务异步任务，
```

### 9.ES6模块和CommonJS的区别

```
1.
commonJS模块输出的是一个值的拷贝，输出后，模块内部变化影响不到这个值
ES6输出的是值的引用

2.CommonJS是运行时加载，ES6模块式编译时输出接口
```

### 10. 怎么在事件捕获阶段触发事件 ?

```
addEventListener('click',function,iscapture)
第三个参数
```

### 11.xss发生场景

```
全称：Cross-site scripting，代码注入
XSS 攻击就是黑客往页面中注入恶意脚本，然后将页面的一些重要数据上传到恶意服务器。常见的三种 XSS 攻击模式是存储型 XSS 攻击、反射型 XSS 攻击和基于 DOM 的 XSS 攻击。
```

### 12.实现apply/call/bind

```javascript
//1.apply
Function.prot
```

### 13.原型和原型链说一下

```
原型： 在JavaScript高级程序设计中给出的解释是· 每一个构造函数（对应的就是类函数）都有一个prototype属性（强调下是属性），这个prototype属性会指向一个原型对象（强调下是对象）。该原型属性指向的原型对象称之为原型
	例子：比如说，一个function Foo(),他有一个prototype属性这个属性指向Foo.prototype，然后Foo.prototype的constructor指向Foo；

原型链： 每一个对象都有隐式原型，指向创建该对象的构造函数的原型。对象可以通过隐式原型查找不属于该对象的属性。
	比如：function Foo() __proto__ 是Function.prototype 的 __proto__是Object.prototype;

注意 function Function的显示原型和隐式原型都是指向Function.prototype
```

### 14.说一下同源策略

```
A: 什么是同源？
S: 同源策略是一种安全协议，即协议，域名，端口都相同

A: 为什么用同源策略？
S：没有同源策略的话，利用iframe嵌套银行的网页，将账号密码提交到他人的表单中就不安全了


```

### 15.new发生了什么?

```
1.创建了一个新对象199
2.将构造函数的作用域赋值给新对象(this指向这个新对象)/绑定this
3.执行构造函数里面的代码(给这个新对象添加属性)/新的对象连接到原型
4.返回新对象
```

### 16.ES5继承

```
1.构造函数
2.原型继承
3.组合继承
	function Person(age){
		this.age = age;
	}
	function Student(age,name){
		Person.call(this,age)
		this.name = name;
	}
	Student.prototype = new Person()
	Programmer.prototype.constructor = Programmer // 修复构造函数指向
	
	let qmj = new Student(18,'qmj')
4.寄生继承
5.寄生组合继承...
```

### 17.事件流/事件冒泡阻止方法

```
阻止冒泡：
	W3C：e.stopPropagation()
	IE：e.cancelBubble = true
	项目中：在做文案中心年度报告的时候，第一次进入就需要一个弹窗图片，点击图片进入年度报告，点击图片外部则display: none;这就需要阻止冒泡。
取消默认事件：
	w3c:e.preventDefault()
	ie: e.returnValue = false
```

### 18.事件代理

- 节省内存，避免操作大量的dom，给节点注册，注销事件
- 注意e.target是单独的节点（1，2，3...），e.currentTarget是整个ul

```html
<ul id="ul">
	<li>1</li>
  <li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
</ul>
<script>
	let ul = document.querySelector('#ul')
	ul.addEventListener('click', (event) => {
		console.log(event.target);
	})
</script>
```

### 19.为什么js是单线程的

```
js设计出来是用于操作DOM的，一个事件只能做一件事情
假如这里要删除dom，那里要给这个dom添加东西，那就不
知道以谁为准了
```

### 20.undefined == null 为什么是true？

```
这个规定，背下来就行
```

### 21.手写ajax请求

### 22.缓存的用法

### 23.语义化标签在框架里能进行SEO优化吗？

```
不能
```

### 24.发布者——订阅者模式

```
1.定义一个事件对象，里面有两个方法，去订阅(on)和去发布(emit)方法
2.去订阅接受两个参数，事件关键字key，key对应的回调函数fn
	判断是否有存储key对应的回调函数列表，无？创建并push，有，push回调函数
3.去发布emit的作用是取出对应key的回调函数并且执行，把参数也带上
	let key = [].shift.call(arguments)取出key
	fns = this.list[key];取出key对应的回调函数
	fns.forEach fn.apply(this, arguments);执行
```

### 25.const 数组/对象内容可以被改变

```
引用地址不改变，但内容改变

对象使用 Object.freeze(obj)就可以不被改变
```

### 26.axios的二次封装

```
好处：可以不对请求库直接进行依赖，便于管理

在config.js里面配置好baseURL，超时信息等，
在request.js里面配置请求和响应(拿到出具就返回res)，
有err就判断他返回的状态码，进行响应的提示，最后返回axios的实例

然后就是在相应的请求文件里面配置拼接的api地址，暴露出相关api即可
```

### 27.let a = 1和 a = 1区别

```
let a = 1 是定义在自己的作用域里面的

a = 1 都是定义在window上的
```

### 28.数据类型

```
介绍有哪些？
undefined和null的区别？
number和bigint的区别？
判断数据类型的typeof和instanceof，Object.prototype.toString.call()

值类型：null Number Undefined String Boolean Bigint Symbol
引用类型： Object

null和undefined区别：
	1.typeof不一样，null是object，undefined是undefined
	2.null转换成数字为0，undefined转换成数字是NAN
	3.null是声明了，赋值为null；undefined是声明了，但没有赋值
	
number和bigint的区别：
	1.范围不一样：number为 -（2^53-1) -- 2^53-1;bigint就没有这个限制
	2.定义书写方式不一样，number直接写出来；bigint需要在后面加n；
	2.number可以是浮点数，也可是整数；bigint只能是整数；
	
typeof/instanceof/Object.prototype.toString
	1.typeof: 
		null->object：在底层都是二进制，二进制前三位是0，就会被判断成object，null全是0；
		string/function/object/number/undefined
	2.instanceof：
		用于准确判断对象的，因为用typeof判断的话，除了function其他全都是object。
		判断的原理就是查看左边的隐式原型是否在右边的原型链上；
	3.Object.prototype.toString.call
		精准判断所有的数据类型，包括各种对象
```

### 29.let/const/var

```
let/const和var之间的区别？
let和const的区别？

let/const有块级作用域，一个花括号就是块级作用域
let/const有暂时性死区 	var是变量提升

const和let的区别：
	1.声明一个常量，不会改变，但是引用类型可以改变，可以通过freeze使其达到不改变
	2.const声明必须赋值
	
```

### 30.箭头函数区别

```
箭头函数与普通函数区别？

	1.箭头函数没有arguments，建议用剩余运算符
	2.没有prototype，不能做构造函数
	3.没有自己的this，在你定义函数时就确定了this
	4.不能使用call，apply改变this
	5.当只有一个参数一个返回值时，可以省略参数括号，大括号和return
为什么不能绑定this？
	MDN官网的话：更简短的函数并且不绑定this
```

### 31.promise实现过程

```
1.定义基本数据
	定义promise状态：默认为 'pending'
	定义成功返回值res 默认为空
	定义失败原因reason 默认为空
	定义存放成功回调函数的数组
	定义存放失败回调函数的数组

2.定义成功回调函数resolve
	传进一个参数data，
	如果状态为pending的话，把状态该为fullfiled
	把上面定义数value设置为传进来的data
	取出存放成功回调函数进行执行

2.定义失败的回调函数
	传进一个参数：失败的原因
	状态为pending的话，把状态改为rejected
	再把定义的reason设置为传进来的reason
	再去执行失败的回调函数
	
3.定义.then方法
	.then有两个回调，第一个成功，第二个失败
	判断当前状态去执行成功还是失败
	如果是pending状态，将成功或者失败回调事件存入对应的数组中
	
```

### 32.null和undefined的区别

```
1.含义
	null是尚未存在的对象
	undefined代表的是声明了，但未赋值的原始值
2.转数字
	null转数字为0
	undefined转数字为NaN
3.typeof不一样
	null是object
	undefined是undefined
```

### 33.axios二次封装

```
为什么封装：
	不进行封装，想要在那个组件发送请求，就在八个组件使用axios，这样很多组件就依赖它，如果axios不维护或者出现重大bug，这样需要在每一个组件修改，这样很麻烦。
	单独在一个文件里面进行对配置，请求，响应错误信息等进细节行封装，再导出这个实例，在组件里面使用就没有后顾之忧了，因为只有封装文件依赖了axios，到时候只需要修改封装文件
	
怎么封装：
	封装了一些基本配置信息，baseUrl，Timeout，
	配置了请求拦截(用于发送网络请求时，显示loading组件，验证token)
	配置响应拦截返回响应异常信息
	导出这个实例在需要的地方使用
```

### 34.数据双向绑定原理

```
通过发布订阅者模式结合Object.defineProperty去监听每个属性的改变和访问。主要需要实现4个功能：
	观察者Observer/订阅器Dep/订阅者Watcher/解析器Compile

观察者Obserr：
	写一个函数里面用set和get监听属性的被谁依赖与改变。然后遍历(Object.keys(obj))对象的每一个属性，让每一个属性被监听.

订阅器Dep：
	订阅器收集订阅者，数据变化的时候调用订阅者更新函数；
	两个函数，观察者的get函数里面监听那里被依赖了，就把订阅者添加到订阅者数组里面，观察者的set监听到数据被改变了，就调用订阅者一个一个取出来调用更新函数；
	
订阅者Watcher：
	订阅者是要做一些具体的事情的，加到订阅器数组和执行数据更新操作；
	因为在订阅器里面执行的是把相应的订阅者一个个取出来调用订阅者的更新函数，所以在订阅者里面主要实现的是update具体的细节，
	update：里面通过this.vm.data[this.exp]获取到最新的数据，进行更新；

解析器Compile：
	通过上面三个其实就已经实现了数据双向绑定，但是没有进行解析dom节点，
```

### 35.CommonJS/AMD/CMD/ES6Module

```
commonjs:
	是同步的，在服务端比较快，在浏览器端会慢；限于网络更合理的是使用异步加载模式;
	通过module.exports导出和require导入
AMD：
	是异步加载的方式，模块加载不影响后面语句执行；依赖这个模块的语句都定义在一个回调函数上，加载完才会执行
ES6Module:
	通过export导出，通过import{}导入；如果是export default就是不需要大括号；
	
CommonJS和ES6 ES6的区别：
	1.CommonJS输出的是一个值的拷贝，ES6输出的是值的引用；
		前者就是输出后，模块内部变化就不会影响到这个值；
		ES6是动态引用的，遇到import命令时才会去读取里面的值
	2.CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
		运行时加载：就是输入时先加载整个模块，生成一个对象，再从这里面读取方法
		编译时加载：ES6模块不是对象，而是通过export输出指定的代码，import采用静态命令的形式。在import是可以指定加载某个输出值，而不是整个模块
```

### 35.CommonJs

```
commonjs:
	1.里面通过module.exports/exports导出，通过require()导入。
		require()是个函数，具有返回值，其返回值就是exports这个对象；
	2.module.exports：
		在commonjs规范里面是没有提到module.exports的。
		是Node为了实现导出而实现的一个Module类，在源码里module.exports=exports，使这两个指向同一个对象
		本质上就是module.exports在导出
		但是如果你在模块里 module.exports = {}，module.exports就和exports断开联系了，最终导入的就是module.exports新对象
	3.require(X)查找细节
		情况一：X是核心模块，直接返回核心模块，停止查找
		情况二：X是./ ../ /
			第一步：X当做一个文件在对应目录下查找
				1.有后缀名，按照后缀名进行查找对应文件
				2.无后缀名，查找文件X=>查找X.js=>查找X.json=>查找X.node
			第二步：X是一个目录
				1.查找X/index.js=>index.json=>index.node
			第三步：没找到返回 Not Found
		情况三：直接是X，但X不是核心模块
			在当前目录查找node_modules，然后上一层目录node_modules，直到根目录
	4.模块加载过程
		1）commonJs加载时同步的，加载完才会进行下一步代码
		2）不会进行多次加载，index.js加载a.js和b.js a.js加载b.js:
			则b.js只会被执行一次，module对象中的loaded被设置为true
		3）模块相互依赖，是一个图结构，引用顺序是按照图的深度优先遍历的，即使循环引用，形成闭环，最终每个模块只会执行一次。
```



### 36.防抖节流的区别

```
防抖：
	原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
	提交表单，搜索，窗口resize，等使用防抖

节流：
	使函数有节制的执行，而不是全部进行执行，一般都是在多少秒内执行一次。与防抖最主要的区别在于，这个时间点内，不断的执行这个函数，它也不会重新计时，而是等待给定的时间过去，再执行，才会被执行。
	scroll事件，mousemove事件需要持续执行的
```

### 37.Ajax的readystate

```
0: 未初始化，尚未调用open
1：启用，调用 .open但是为调用.send
2：发送，已经调用send但是未接收到响应
3：接收，已经接收到部分数据响应
4：完成，已经接受到全部数据，而且可以在客户端使用
```

### 38. == 和 ===区别

|                         ==                         |           ===            |
| :------------------------------------------------: | :----------------------: |
|                   ==是非严格等于                   |      === 是严格等于      |
| ==判断的时候会进行类型转换，然后判断两边值是否相等 | 不会进行转换，直接比较值 |
|               undefined==null是true                |  undefined==null是false  |

![1598452624096](C:\Users\邱\AppData\Roaming\Typora\typora-user-images\1598452624096.png)

### 39.for in 和 for of 的区别

|                   for in                   |        for of        |
| :----------------------------------------: | :------------------: |
|          获取的是键名key或者下标           |  获取的是键值value   |
|       会遍历整个对象的原型链，性能差       |    只遍历当前对象    |
| 数组遍历：会返回所有可枚举属性，包括原型链 | 只返回下标对应属性值 |

### 40.函数定义方法及区别

```
1.声明式定义
	function foo() {}

2.函数表达式
	var foo = function() {}

3.箭头函数
	var foo = () => {}

4.对象里面的函数
	foo: function() {}

5.立即执行函数
	(function() {clg(1)})()
	
区别：第一种会进行函数名提升，就是在定义之前调用会调用成功，这显然不符合规范。第二种则会报错，个人感觉第二种更符合规范一点。

```

### 41.arguments转数组

```
arguments是一个伪数组

1.写个函数遍历arguments再push，再返回

2.使用Array.prototype.slice.call(arguments)/[].slice.call()

3.扩展运算符
	var argsArray = [...arguments ];
```

### 44.将数组转换为key：value

```
1.扩展运算符...
let obj = {...arr} index为key

2.遍历数组元素，将其添加到新对象中
function foo(arr) {
  let result = {}
  for(let i = 0;i<arr.length;i++){
    result[i] = arr[i]
  }
  return result;
}
```

### 42.跨域

```
1.jasonp

2.cors

	2.判断简单请求还是复杂请求
		简单请求必须满足两个条件：
			1.请求方法必须是：GET，POST，PUT之一
			2.content-type必须是：text/plain，multipart/form-data，application/x-www-form-					urlencoded之一
```

### 43.arguments

```
arguments相当于伪数组

console.log(Object.prototype.toString.call(arguments)) // [object Arguments]
typeof arguments // object
```

### 44.执行上下文

```
1.全局执行上下文
	1.默认或者基础执行上下文。不在函数内部就是全局。
	2.做两个事情：创建全局window对象（浏览器），this值等于这个对象
	3.一个程序只有一个全局执行上下文

2.函数执行上下文
	1.每当一个函数被调用时，就会给这个函数创建一个函数执行上下文。 函数调用时创建。
	2.每个函数都有自己的执行上下文，但需要被调用才会创建。
	3.函数上下文可以有多个，新的执行上下文被创建，会按照定义顺序执行一系列步骤。
	
3.创建执行上下文
	1.两个阶段：
        1.创建阶段：在执行JavaScript前创建
            1.确定this，即this绑定
            	1.全局执行上下文绑定到全局对象中，浏览器中就是window
            	2.在函数中，取决于函数是怎么被调用的。
            		1.被引用对象调用，this就是那个对象。
            		2.否则就是全局对象或者undefined（严格模式）
            2.创建此法环境组件
            3.创建变量环境组件
        执行阶段；
	
	
```

### 45.作用域——词法作用域&动态作用域

```js
作用域是什么：定义变量的区域
作用：规定了如何查找变量，也就是确定当前代码对变量的访问权限。
词法作用域（静态作用域）：函数作用域在定义的时候就确定了。
动态作用域：函数的作用域再调用时确定。

例子
// js是静态作用域，函数作用域是在定义时决定的，而不是在调用时决定的
var name = 'global'
function foo() {
  console.log(name)
}
function bar() {
  var name = 'local'
  foo()
}
bar() // global 定义的时候决定的
```

### 46.加载海量数据

```
1.缩短循环时间
	requestAniminationFrame通过分治的思想，将 100000 个 li 分批插入到页面中，并且我们通过 requestAniminationFrame 在页面重绘前插入新节点
2.减少DOM操作次数
	DocumentFragment（MDN）可以减少DOM操作次数，降低回流对性能的影响。
	时间委托可以显著减少DOM操作次数

```

### 47.defer和sync区别

```
作用：两者的作用都是差不多的，使js异步加载，从而不会对DOM生成造成阻塞
defer: 表示js脚本在DOMContentLoaded事件之前执行
async：表示js脚本一旦加载完成，立即执行
```

### 48.async await原理

```
1.Promise 和 生成器的应用，往底层说就是微任务与协程的应用。
2.async函数：异步执行和隐式返回promise
	在里面的返回值都是 Promise {<resolved>: 返回的东西}
3.await关键字：默认帮我们创建Promise对象
	1.在里面executor函数中调用了resolve
	2.然后JS引擎暂停当前协程执行，将主线程控制权给父协程执行，同时把promise对象返回给父协程
	3.然后父协程调用promise.then来监控promise改变状态
```

### 49.this指向

```
1.规则一：默认绑定
	不通过任何第三方调用，直接指向window
2.规则二：隐式绑定
	由谁发起调用，就指向谁 obj1.foo()  this=>obj1
3.规则三：显示绑定
	call，apply，bind
4.规则四：new绑定this

this指向的优先级：new>显示绑定>隐式绑定>默认绑定
```

### 50.JS如何解析的

```
1.JS源码通过Parse模块生成抽象语法树AST。
2.AST通过Ignition模块将语法树解析成字节码。
3.字节码进步转成汇编，机器码，最后交给CPU执行。
```

### 51.promise.all

```

```

### 52.promise.retry

```js
retry = function (fn, times, delay) {
  var err = null;
  return new Promise(function (resolve, reject) {

    var attempt = function () {
      fn().then(resolve).catch(function (err) {
        console.log(`Attempt #${times} failed`);
        if (0 == times) {
          reject(err);
        } else {
          times--;
          setTimeout(function () {
            attempt()
          }, delay);
        }
      });
    };
    attempt();
  })
}

```

### 53.scr和href区别

```
1.href：超文本引用，一般用在link和a等元素上，引用和页面关联的关系
2.src：代表着资源，img，script上面，是指向外部资源的位置，会把它下载到当前的文档中，js脚本，img图片等等。
```

### 54.前端路由实现

```
1.hash路由：原生方法实现好了
	1.在window上监听hashChange事件，监听location.hash改变。
	2.在里面switch case，匹配相应的路由，再去展示相应的组件

2.history路由：
	history是H5新出的，所以没有原生监听事件，需要自己去实现。
	1.首先需要改变a标签的默认行为，e.preventDefault();
	2.为a标签添加点击事件
		1.获取a标签里面的href属性，
		2.el.getAttribute("href"),history.pushState({}, "", href);
		3.调用自己定义的URLChange方法。
	3.URLChange方法里面做的事情就是switch case，去匹配location.pathname，匹配上了，展示相应的组件即可。
```

### 55.深拷贝浅拷贝

```
浅拷贝：只拷贝一层，如果存在两层以上无法拷贝，他会将被嵌套的对象的地址值赋值给它，但里面的内容是存在的，只是赋值而已，不是拷贝。
	1.扩展运算符... let obj1 = {...originObj}
	2.Object.assign({}, originObj)
	3.手动实现，只需要遍历一层属性，直接赋值即可
	4.数组有slice，concat
	
深拷贝：存在两层以上都可以进行拷贝，使得整个对象都和源对象无关
	1.手动实现，需要递归，先判断该属性的类型是对象还是值类型，对象就进入递归
	2.JSON.parse(JSON.stringify(obj));
		缺陷：1.会忽略undefined、symbol和函数 2.循环引用会报错

考虑循环引用深拷贝：hashMap

```

### 56.洗牌算法

```js
function shuffle(arr) {
  // 每次从未处理的数组中随机取一个元素，
  // 然后把该元素放到数组的尾部，
  // 即数组的尾部放的就是已经处理过的元素，
  let n = arr.length, random;
  while (0 != n) {//>>>作用是向下取整？
    random = (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    [arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
  }
  return arr;
}
```

### 57.虚拟DOM

```
我对虚拟DOM的理解是：

我们对将要插入到文档的DOM树进行分析，使用js对象的形式将DOM层级情况进行描述，tagName，props，children。最后将js对象树，插入到文档中。

当页面结构发生改变，需要对DOM结构进行调整，先根据变更的状态，重新构建一个对象树，然后对比两个虚拟DOM对象，记录下两个树的差异。最后将记录的差异更新到真实DOM中，这样试图就更新了。

虚拟DOM在大量修改DOM的时候，可以很好的提高操作效率，通过在操作前确定需要做的最小修改，尽可能较少DOM操作带来的重排重绘。
```

### 58.快速排序

```js
const quickSort = (array) => {
  if(array.length === 0) return array;
  let left = [];
  let right = [];
  let curr = array.splice(0,1);
  for(let i = 0; i<array.length; i++) {
		if(array[i]<curr){
      left.push(array[i])
		}else {
      right.push(array[i])
    }
  }
  return quickSort(left).concat(curr,quickSort(right));
} 
```

### 59.[] == 0、[] == "", []=='0' 结果是什么，为什么

### 59.==转换规则

### 60.非递归实现快排

### 61.判断对象是否为空

```js
1.function checkNullObj(obj) {
  return Object.keys(obj).length === 0;
}
2.将json对象转化为json字符串，再判断该字符串是否为"{}"
3.for in 循环判断
var b = function(obj) {
    for(var key in obj) {
        return false;
    }
    return true;
}
4.var arr = Object.getOwnPropertyNames(data);
```

### 62.encodeURI和encodeURIComponent区别

```
都是编码URL，唯一区别就是编码的字符范围
encodeURI方法作用范围小										encodeURIComponent区别作用范围大
适合用于解析域名之类的，域名特殊字符不会被解析	 域名中的特殊字符/会被转义，适合编码URL参数		
```

### 63.数组去重怎么考虑NaN

```
1.使用map和set数据结构，可以进行识别map.has(NaN)会被判断成true
```

### 64.搜索发起请求，下面显示数据不对

```
1.打断上一次请求
2.节流防抖
3.看时间戳
```

### 65.中断一个网络请求

```
XHR: 
	1.xhr.abort()
Fetch:
	1.const controller = new AbortController() 
	controller.abort()即可；
```

### 66.prototype和__proto区别

```
1.__proto__ 存在于所有对象上，prototype 只存在于函数上。
2.__proto__ 用来表示当前对象的原型对象是什么，在检索属性时方便在原型链上递归向上去查找，实现了 obj.__proto__.__proto__... 原型链
3.prototype 用来表示使用此构造函数初始化的对象继承自哪个原型对象

Function.prototype.__proto__ = Object.prototype;
```

### 67.二维码登录

```
1.首先设备需要联网，携带设备信息向服务器请求生成二维码
2.生成二维码ID与该设备绑定，返回二维码ID，并在设备上端展示
3.扫描二维码，识别二维码ID
4.把手机上的token，二维码信息，发送给服务端
5.二维码与身份信息绑定，生成token（临时），并且返回给手机那边
6.携带token发送给服务端，确认登录，
7.返回token给设备，凭借Token去请求数据。
```

### 68.bind的作用

```
1.改变this指向
2.创建一个新的函数，需要我们手动的去执行它。不像call，apply可以自动执行
```

### 69.斐波那契函数

```js
int fib(int N) {
  if (N == 1 || N == 2) return 1; 
  return fib(N - 1) + fib(N - 2);
}
O(2^n)
```

### 70.纯函数

```
概念：
	1.是函数式编程的重要概念，不仅限于JS，JS符合函数式编程，所以也有纯函数的概念。
	2.在函数中相同的输入值，就必须返回相同输出值。（重点）
	3.输入和输出值以外的其他隐藏信息无关，也和你的设备环境无关
	4.不能有副作用，比如修改了全局变量，修改了参数等外部条件，特别容易产生bug
应用场景
	1.React纯组件
	2.redux中的reducer
	3.slice就是一个纯函数，不会对原数组进行任何操作，而是生成一个新数组（splice就不是，返回新数组，也会对原数		 组进行修改）

例子：
副作用
```

### 71.柯里化

```
概念：
	1.只传递给函数一部分参数来调用它，让他返回一个函数去调用处理剩余的参数
	2.这个过程就叫柯里化
```

### 72.高阶函数

```
概念：
	维基百科定义：只需要满足下面的其中一个条件：
		1.接受一个或者多个函数作为输入
		2.输出一个函数
例子：filter，map，reduce都是高阶函数

应用：高阶组件，返回值为新组建的函数
```

### 73.类数组

```
let say = function () {
 console.log(arguments)
}
say(1, 2)
{
  0: 1
  1: 2
  length: 2
}
1.什么是类数组：
	这个arguments就是一个类数组，有length属性，不能访问数组方法，但是可以通过索引来访问，还可以将其转换成数组
2.如果一个普通的对象加上一个 length 属性就可以变成一个类数组对象。
3.转换
1.
let say = function () {
 console.log(Array.from(arguments))
}
say(1, 2)
// [1, 2]
2.
Array.prototype.slice.call(arguments)
```

### 74.模块化

```
一、什么是模块化
  1.模块化开发最终目的是将程序划分成一个个的小结构
  2.这个结构中编写属于自己的逻辑代码，有自己的作用域，不会影响到其他结构
  3.这个结构可以将自己希望暴露的变量、函数、对象等导出给其它结构使用
  4.也可以通过某种方式，导入另外结构中的变量、函数、对象等
二、优点
	1.不会造成命名冲突
	2.结构层次清晰，可阅读性与可维护性更好
	3.可以暴露一些公共代码，比如封装好的方法，常量
```

### 75.ESModule和CommonJS不同点

```
1.关键字不同
2.使用ESModule代码将自动采用严格模式
```

### 76.随机颜色，互相转换

```
// const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
function randomColor() {
  return "#"+ 
  Math.floor(Math.random() * 0xffffff)
  .toString(16);
}
// 哈希转rgb
function hexToRgb(hex) {
  return "rgb(" + 
  parseInt("0x" + hex.slice(1, 3)) + 
  "," + parseInt("0x" + hex.slice(3, 5)) + 
  "," + parseInt("0x" + hex.slice(5, 7)) + ")";
}

// 哈希转rgba
function hexToRgba(hex, opacity) {
  return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
}


console.log(hexToRgb('#ffffff'))
console.log(parseInt('0xff'))
```

### 77.介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

```
Set
1.成员不能重复
2.只有健值，没有健名，有点类似数组。
3. 可以遍历，方法有add, delete,has
weakSet

成员都是对象
成员都是弱引用，随时可以消失。 可以用来保存DOM节点，不容易造成内存泄漏
不能遍历，方法有add, delete,has
Map
本质上是健值对的集合，类似集合
可以遍历，方法很多，可以干跟各种数据格式转换
weakMap
1.直接受对象作为健名（null除外），不接受其他类型的值作为健名
健名所指向的对象，不计入垃圾回收机制
不能遍历，方法同get,set,has,delete


```
### 77.setInterval原理？缺点？

```

1.不停循环调用，递归可以实现

2.缺点：
	2.1：无视代码错误，对自己调用的代码是否报错不关心，出了错，还是会不断调用。
		2.1.1 实测，在浏览器中是会不断重复执行的，在node环境中不会
```

### 78.小数0.1+0.2

```
原因：
1.JavaScript 里的数字是采用 IEEE 754 标准的 64 位双精度浮点数。
2.十进制的 0.1 和 0.2 都会被转换成二进制，但由于浮点数用二进制表达时是无穷的
3.最终，因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了 0.30000000000000004，所以在进行算术计算时就产生了误差。

实际场景：
1.购买页机器选择的时长ICON要展示多少折扣，该折扣由后端返回，有一个3.2折的，中文展示3.2折没问题，英文展示（1-0.32）%off，就变成了67.99999999999999%off，导致展示错误+影响用户体验。n年没人发现，我的做法：
	1.首先修复了这个问题，并查看该项目中有没有其他类似的问题，封装公共方法修复。
	2.周会上说明讨论该问题，并看其他人有没有对处理方案有不同意见，
	3.提一个专项优化需求给各自业务的负责人自查自己负责的项目有没有类似问题，有的话，按照该方案优化。


0.1 -> 0.0001100110011001...(无限)
0.2 -> 0.0011001100110011...(无限)
0.1+0.2 = 0.0100110011001100110011001100110011001100110011001100


0.1 + 0.2 = 0.30000000000000004
0.7 + 0.1 = 0.7999999999999999
0.2 + 0.4 = 0.6000000000000001
2.22 + 0.1 = 2.3200000000000003

// 减法
1.5 - 1.2 = 0.30000000000000004
0.3 - 0.2 = 0.09999999999999998

// 乘法
19.9 * 100 = 1989.9999999999998
19.9 * 10 * 10 = 1990
1306377.64 * 100 = 130637763.99999999
1306377.64 * 10 * 10 = 130637763.99999999
0.7 * 180 = 125.99999999999999
9.7 * 100 = 969.9999999999999
39.7 * 100 = 3970.0000000000005

// 除法
0.3 / 0.1 = 2.9999999999999996
0.69 / 10 = 0.06899999999999999
```

