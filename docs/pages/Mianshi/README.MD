##  

## 一、HTTP/WEB/HTML综合

### 1.前端注意的SEO

- 合理的`title`、`description`、`keywords`： 三项权重递减
- 语义化`HTML`代码: 可以让搜索引擎
- 少用`iframe`: 引擎不会抓取
- 非装饰性图片加 `alt`
- 主要的`HTML`代码放前面.

### 2.浏览器输入url到现实页面的步骤

 **基础版本** 

- 浏览器根据请求的`URL`交给`DNS`域名解析，找到真实`IP`，向服务器发起请求；
- 服务器交给后台处理完成后返回数据，浏览器接收文件（`HTML、JS、CSS`、图象等）；
- 浏览器对加载到的资源（`HTML、JS、CSS`等）进行语法解析，建立相应的内部数据结构（如`HTML`的`DOM`）；
- 载入解析到的资源文件，渲染页面，完成。

- - 



### 7.渲染优化

- 禁用 `iframe`
  - 阻塞主页面`Onload`事件
  - 搜索引擎无法解读，不利SEO
  - 解决：通过js动态给其添加src属性值。
- 禁用 gif （降低CPU消耗）
- 用 `css3` 代替 `js`动画 (避免重绘重排回流)
- 减少DOM 的操作
- 图片预加载，样式表放头部，脚本放底部
- 图标可以压缩在一张图片上，然后用雪碧图

## 二.CSS部分

### 1.雪碧图概念及其优缺点

- 概念：多个小图拼到一个图。通过`background-position` 和元素尺寸调节需要显示的图片
- 优点：
  - 减少 `HTTP` 请求，极大提高页面加载速度
  - 多张图片合并一起的大小小于原来的总和，减少了图片的大小
- 缺点
  - 合并麻烦
  - 修改时麻烦

### 2.`display: none` 和`visibility：hidden`的区别

- 同：都能让元素不可见
- 异：
  - 前者让元素完全消失，后者只是隐藏
  - `display:none`是非继承属性，子孙节点必消失，怎么改都没用，`visiblity: hidden`子孙继承了 `hidden`,修改子孙为 `visible` 可以让子孙显示
  - `display` 修改造成文档重排。修改 `visibility` 只会造成本元素的重绘

### 3.`link` 和`@import`的区别

- 前者是**HTML**的方式，后者是 **CSS**的方式
- `link`最大限度支持并下载，`@import`过多导致串行下载，出现 `FOUC`（文档样式短暂失效）
- `link`更好

### 4.FOUC？避免？

- `flash of unstyled content`: 浏览器重新渲染页面是造成的闪烁
- **解决** 把样式表放到 文档的 `<head>`

### 5.合并CSS

- 避免使用@import 引入多个css文件，用css工具：Sass

### 6.base64的优缺点

- 优点是可以加密，减少了`HTTP`请求
- 缺点是消耗`CPU`去解码

### 7.纯css写一个三角形

思路：**设置宽高都为0，border就是正方形即三角形底边的宽度，再把border-color的三个设置为透明即可**

```css
.triangle_top {
      width: 0;
      height: 0;
      border-width: 50px;
      border-style: solid;
      border-color: red transparent transparent transparent;
}
```

扩展：css画扇形

思路：加上border-radius = 50% 即可

```css
.triangle_top {
      width: 0;
      height: 0;
      border-width: 50px;
      border-style: solid;
      border-radius: 50%;
      border-color: red transparent transparent transparent;
}
```

### 8.box-sizing

盒子模型的属性元素占宽是 margin + padding + border + width

但如果想要使其直接设置为width 是元素的占宽

就可以用盒子模型属性 box-sizing: border

想要定义一个占宽200px、padding10px、border5px的div，那就要设置width为170px了

```javascript
#app {
	width: 170px;
	height: 50px;
	padding: 10px;
	border: 5px;
}
// 得到的是占宽200px，占高80px的div
```



## 三.JavaScript

### 1.闭包

- 特性
  - 函数内嵌套函数
  - 内部函数可以引用外层的参数和变量
  - 参数和变量不会被垃圾回收机制回收
- 目的及其用处
  - 设计私有变量和方法
  - 读取函数内部的变量
  - 使这些变量存活在内存中
- 优点
  - 避免全局变量的污染
  - 实现封装和缓存
- 缺点
  - 不会被回收机制回收，造成内存负担，甚至内存泄漏
  - 解决：
    - 退出函数前，不使用的局部变量全部删除

### 2.作用域链？

- 作用：保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，到window就终止，向下不许.

### 3.事件代理（事件委托）

把原本需要绑定的事件委托给父元素，让父元素去监听子元素的事件。

原理：**冒泡**

好处：

- 提高性能
- 节省内存，减少事件注册。如：ul下的li事件
- 新增子对象无需绑定事件

~~~javascript
let app = document.querySelector('#todo-app')
    app.addEventListener('click', (e) => {
      if (e.target && e.target.nodeName === 'LI') {
        let item = e.target
        alert(item.innerHTML)
      }
 })
~~~



### 4.来个JavaScript继承？

- 构造继承

- 原型继承

- 实例继承

- 拷贝继承

- 原型`prototype` 机制 或 `apply` 和 `call` 比较简单，建议 构造函数 与 原型混合方式

- ~~~javascript
  function Parent() {
  	this.name = 'qiu'
  }
  function Child() {
  	this.age = 18
  }
  Child.prototype = new Parent()
  var demo = new Child()
  
  ~~~

### 5.this?

- `this` 总是指向函数的直接调用者(`obj.obj1.foo()`)  this 是obj1
- 如果有`new`关键字，this指向new 出来的对象

### 6.事件模型

W3C定义的三个阶段: **捕获** 、**目标**、**冒泡**

- **冒泡型事件**：子级元素先触发，父级元素后触发
- **捕获型事件**： 父级元素先触发，子级元素后触发
- `DOM`事件流：同时支持冒泡和捕获事件
- 阻止冒泡：用 `stopPropagation()`方法 IE下设置 `cancelBubble = true`
- 阻止捕获： 阻止事件的默认行为，用`preventDefault()`

### 7.new操作符干了什么？

- 创建一空对象，`this`引用该对象，同时还继承了函数的原型
- 属性和方法被加入到 `this` 引用的对象中
- 新创建的对象由this所引用，并且最后的隐式返回this

### 8.模块化开发？

- 立即执行函数，不暴露私有成员

### 9.哪些操作会引起内存泄漏

- 内存泄漏概念：任何对象不再使用但任然存在
- settimeout：第一个参数用了字符串，而非函数回引起内存泄漏
- 闭包的不恰当使用

### 10.JavaScript的基本规范？

- 不再同一行定义多个变量
- 使用===/!==判断true/false
- 不使用全局函数
- Switch语句必须带default分支

### 11.JavaScript创建对象的方式

- **1.对象字面量**
  
  ~~~javascript
  // 1.对象字面量
  person = {
      name: 'qmj',
      age: 18,
      height: 180
  }
  ~~~
  
  **2.通过object**
  
  ~~~javascript
  // 2.通过Object实例
  var person = new Object();
  person.name = 'qmj'
  person.age = 18
  person.learn = function() {
  	console.log(person.name+'在学习js')
  } 
  ~~~
  
  上面两个方法都可以创建对象，但是有个明显的缺点，就是冗余的代码过多，以下是解决办法：
  
  **3.工厂模式，使用函数封装里面创建对象的细节**
  
  ~~~javascript
  function createPerson(name, age, job){
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayName = function(){
          alert(this.name);
      }
      return o;
  }
  var person1 = createPerson("wei",25,"software");
  var person2 = createPerson("bu",25,"software");
  ~~~
  
  **4.构造函数**
  
  ~~~javascript
  // 4.构造函数模式，创建了自定义的构造函数
  function Person(name, age, job){
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayName = function(){
          alert(this.name);
      }
  }
  var person1 = new Person("wei",25,"software"); // 通过new来创建对象
  var person2 = new Person("bu",25,"software");
  new 之后会进行以下步骤：
     	1.创建一个新对象
      2.将构造函数的作用域赋给新对象（因此this指向这个新对象）
      3.执行构造函数中的代码
      4.返回新对象
  console.log(person1.constructor == Person);     //true
  ~~~
  
  **5.原型模式**
  
  ~~~javascript
  function Person(){
  }
  Person.prototype.name = "wei";
  Person.prototype.age = 27;
  Person.prototype.job = "Software";
  Person.prototype.sayName = function(){
      alert(this.name);
  }
  
  var person1 = new Person();
  person1.sayName();      //"wei"
  
  var person2 = new Person();
  person2.sayName();      //"wei"
  
  alert(person1.sayName == person2.sayName);
  ~~~
  
  **6.混合使用构造函数模式和原型模式**
  
  ~~~javascript
  function Person(name, age){
      this.name = name;
      this.age = age;
      this.friends = ["乾隆","康熙"];
  }
  Person.prototype = {
      constructor:Person,
      sayName:function(){
          alert(this.name);
      }
  }
  var person1 = new Person("wei",29);
  var person2 = new Person("bu",25);
  person1.friends.push("嬴政");
  console.log(person1.friends);   //["乾隆", "康熙", "嬴政"]
  console.log(person2.friends);   //["乾隆", "康熙"]
  console.log(person1.friends === person2.friends);   //false
  console.log(person1.sayName === person2.sayName);   //true
  ~~~
  
  7.**寄生构造函数模式**
  
  ```javascript
  // 构造函数封装一个用Object实例创建的对象并返回
  function Person(name, age, job){
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayName = function(){
          alert(this.name);
      }
      return o;  // 直接返回对象
  }
  var person = new Person("wei",29,"banzhuan");
  person.sayName();   //"wei"
  
  // 除了需要new 和工厂模式没有啥区别
  ```
  
  

### 12.快速让一个数组乱序

~~~javascript
arr.sort(()=>{
    return Matn.random() - 0.5 
})
~~~

### 13.实现一个拖拽

### 14.判断两个对象相等

转换为字符串判断

`JSON.stringify(obj)==JSON.stringify(obj2)`

### 15.实现节流防抖

**节流**

**防抖**

### 16.说说`event loop`

```
首先，事件是单线程的，，一次事件循环只处理一个事件响应.
在一次事件循环中，首先会执行js线程的主任务，然后去查找是否有微任务，有？优先执行微任务，无？查找宏任务，执行
```

### 17.设计模式

1.**工厂模式**

2.**构造函数模式**

### 18.实现call，apply

## 四.计算机网络

### 1.常见web安全及防护原理

- sql注入原理
  - 把`SQL`命令插入到表单中提交，输入域名，或页面请求的查询字符串，欺骗服务器执行`SQL`
  - 解决：
    - 对用户输入进行校验，正则表达式，限制长度，
    - 不要动态拼装SQL
    - 不要把机密信息明文存放，应该加密敏感信息

xss原理及防范

-  `Xss(cross-site scripting) `：在web里插入恶意的HTML标签or JavaScript代码，窃取cookie里面的敏感信息，或者提交表单后，将信息提交给攻击者的服务器。

xss防范

- 对用户输入地方和变量进行检查长度和 < > , ; 等字符做过滤
- 任何内容写到页面上都必须加 encode ，避免不小心把html tag 弄出来

**XSS与CSRF有什么区别吗？**

- `XSS`是获取信息，不需要提前知道其他用**户页面的代码和数据包**。`CSRF`是代替用户完成指定的动作，需要知道其他用户页面的代码和数据包。要完成一次`CSRF`攻击，受害者必须依次完成两个步骤
- 登录受信任网站`A`，并在本地生成`Cookie`
- 在不登出`A`的情况下，访问危险网站`B`