###  1.左固定，右边自适应布局/ 左右固定中间自适应

左边固定，右边自适应：

公共代码:

```html
<div class="box">
    <div class="left"></div>
    <div calss="right"></div>
</div>
```



```css
// 方案一：float
.left {
    float: left;
    height: 44px;
    width: 300px;
}
.right {
    height: 44px;
}

// 方案二：flex
.box {
    display: flex;
}
.left {
    height: 44px;
    width: 300px;
}
.right {
    flex: 1;
    height: 44px;
}

// 方案三：绝对定位
 .container{
      position: relative;
    }
    .left {
      height: 44px;
      position: absolute;
      width: 300px;
      background-color: red;
    }
    .right {
      height: 44px;
      background-color: royalblue;
    }
```



两边固定，中间自适应

HTML代码:

```html
<div class="box">
    <div class="left"></div>
    <div class="center"></div>
    <div calss="right"></div>
</div>
```

代码实现：

```css
// 方案一：flex布局
.box {
  display: flex;
}
.item {
  height: 44px;
}
.left {
  width: 300px;
}
.center {
  flex: 1;
}
.right {
  width: 300px;
}

// 方案二：float布局 (注意：center要放在最后面)
.item {
  height: 44px;
}
.left {
  float: left;
  width: 300px;
  background-color: red;
}
.center{
  background-color: yellow;
}
.right {
  float: right;
  width: 300px;
  background-color: blue;
}
```



### 2.relative，position，fixed，区别

后两个脱离了文档流，第一个以自身为基准，第二个以最近的非静态祖先元素为基准，第三个以视口为基准。

### 3. CSS的animation 、 transform? CSS动画和JS动画的区别？

 transform ：

-  rotate 旋转/ scale 变形大小/translate(移动)

animation ：

```
animation-name: 定义动画的名称，也可以all
animation-duration：执行多长时间
animation-timing-function：
delay：延迟多久执行
count：执行多少次
direction：执行方向
等等
```



```css
 animation: changebox 1s ease-in-out 1s infinite alternate running forwards;
```

- keyframes 百分比，某个时间做某事
- name/duration（持续时间）/delay(开始执行动画的延迟)/ iteration-count (执行次数infinite无限)
-  direction 方向：normal(按时间轴顺序)，reverse(时间轴反方向运行),alternate(轮流，即来回往复进行),alternate-reverse(动画先反运行再正方向运行，并持续交替运行) 
-  fill-mode ： 控制动画结束后，元素的样式，有四个值：none(回到动画没开始时的状态)，forwards(动画结束后动画停留在结束状态)，backwords(动画回到第一帧的状态)，both(根据animation-direction轮流应用forwards和backwards规则)，注意与iteration-count不要冲突(动画执行无限次).

css动画和js动画的区别

```
CSS 做动画：触发 GPU 加速，调用 GPU 能力，帧率高（60）。动态设置较困难，适合效果固定的动画。

JS 做动画：占用 JavaScript 引擎，使用 CPU 计算，帧率低（30-50），易卡顿。动态设置简单，适合效果复杂且动态效果要求高的动画。

```



### 4.移动端适配方案

#### 1.1 rem

```
// rem 核心代码
// set 1rem = viewWidth / 10
function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
}
setRemUnit();
```

上面代码表示了 `1rem` = 视口的`1/10`,按照页面计算的

以`iPhone6`为例：布局视口为`375px`，则`1rem = 37.5px`，这时`UI`给定一个元素的宽为`75px`（设备独立像素），我们只需要将它设置为`75 / 37.5 = 2rem`。

当然，每个布局都要计算非常繁琐，我们可以借助`PostCSS`的`px2rem`插件来帮助我们完成这个过程。

#### 1.2.vh，vw

两者都是视口的`1%`

### 5.盒子模型：标准和IE的

```\
标准：宽高是不包括内边距padding和border宽度的，只包含内容
IE：IE盒模型的content包含了padding和border

标准盒模型宽高就是内容的宽高，如果设置了border更大，padding更大，盒子也会被撑大
IE盒子模型
总结：
修改方法：box-sizing：border-box

IE盒模型应用场景：
	在父容器中，放置2个盒子，宽度50%使其按照宽度排列填满，但是这个时候突然来给子盒子一个padding，就会换行了。因为普通盒模型的宽高指的是内容，所以总盒子大小会被撑开。这种情况下就使用IE盒子模型；
```

### 6.浏览器最小字体是多少？想改变怎么办？

```
最小字体是12px，改成 font-size: 10px; 显示的还是12px
想要改变的话用 transform：scale(0.5)
```

### 7.css选择器有哪些？

```
1.元素选择器
2.类选择器
3.ID选择器
4.属性选择器
	元素名[属性名] || *[属性名] img[alt] {} || a[href][title] || a[href="http://www.baidu.com"] {}
5.派生选择器
	
```

### 8.伪类&伪元素

```java
作用：修饰不在文档树中的内容，如，第一句话的第一个字母

伪类：修饰状态的，hover，link，ol :nth-child(2)/2n+1匹配位置为1、3、5、7…的子元素
伪元素：用于创建不在文档树中的元素，before，after
```

### 9.样式的优先级，各自权重

```
!important>行内样式>ID选择器>类选择器/属性选择器/>标签选择器
```

### 10.行内元素与块级元素的区别

```
块级元素：
	总是从新的一行开始
	高度，宽度是可以设置的
	默认宽度是独占一行
行内元素：
	与其他行内元素同占一行
	宽高都是根据自身内容决定的
```

### 11.BFC是什么？怎么触发？

```
类似于一个结界，使元素内外互相不干扰不影响。

触发方式：
	1.浮动
	3.绝对定位(absolute || fixed)
	2.设置该元素为非visible(hidden，auto，scroll)
	
作用：避免上下margin的传递(p131)，边界贴紧就会传递。
margin不会左右传递
```

### 12.盒子模型与boxsizing

```
盒子模型分为标准盒模型和IE盒模型
两者最大的区别就是内容的含义
相同的是元素总大小大都是margin+border+padding+content

1.标准盒模型：
	设置宽高就是给content设置的，修改border和padding不会影响content的大小
	例如：宽高100px，padding和border都是10px，那么它content就是100x100

2.IE盒模型
	设置宽高是给content+padding+border设置的，改变border和padding会影响content大小
	例如：宽高100px，padding和border都是10px，那么它的content就是60px
	
3.转换
	默认的盒子模型是content-box，可以使用box-sizing：border-box将标准盒模型转换成IE盒子模型
```

### 13.em/rem/%/vw/vh

```
rem:
	设置字体大小是根据 root em（html）的font-size设置的
		比如：html {font-size:10px} .box{ font-size: 2rem } 相当于20px
em: 
	如果本身有设置font-size,就根据自身的font-size大小换算，否则根据父元素
```

### 14.less/sass属性及方法

```
// less
1.变量
	通过@可以定义变量/一些长宽属性，甚至选择器也可以
2.each函数

3.嵌套书写样式

// sass
1.嵌套书写样式

```

### 15.css性能优化

```
1.不要使用@import，使用link下载
	会影响并行下载，只有在引用该@import文件下载解析完才知道该文件需要下载
	多个@import下载会打乱下载顺序
	
2.减少重排重绘
	重排导致整个浏览器重新计算文档，构建渲染树
	
3.文件打包/压缩
	文件大小影响浏览器加载速度
```

### 16.为啥css放头部

```
增加页面的性能
CSS放头部，在加载html生成DOM tree的时候，就可以同时对DOM tree进行渲染。
这样可以防止闪跳，白屏或者布局混乱
```

### 17.清除浮动

```
不清除浮动会产生高度塌陷(父元素)：没设置高度的时候会产生
	1.clear(空div)：在浮动元素下方加入空div
	{clear：both; height:0; voerflow: hidden;}
	
	2.给浮动元素父级设置高度
	
	3.给父级也设置浮动
	
	4.给父级设置inline-block
	
	5.给父级设置 overflow：hidden
	
	6.after伪类 (最主流，推荐)
		给浮动元素添加伪类
	
	.float_div:after {
		content: ".";
		clear:both;
		display: block;
		overflow:hidden;
		visibility:hidden;
	}
	.float_div{
		zoom:1;
	}
		
```

### 18.画三角形

```css
.triangle {
      width: 0;
      height: 0;
      // border-radius: 50%; 加上该属性就是扇形
      border-width: 50px;
      border-color: transparent red  transparent transparent;
      border-style: solid;
    }
```

### 19.link和@import的区别

```
1. link引用css，页面载入时同时加载， @import需要页面网页完全载入后加载
2. link是html标签 @import不是
3. link支持JavaScript控制DOM去改变样式，@import不可以
```

### 20.重排重绘

```
1.重绘
	重绘是一个元素外观发生改变所引起的浏览器行为，比如（改变visibility，outline，background）等，浏览器会根据元素新属性重新绘制，使元素呈现新的外观
	
2.重排
	重排指的是文档的结构，布局等发生改变。触发重排：
	DOM元素的宽高发生改变
	DOM树的结构发生改变，比如节点的增加，删除，改变位置
	浏览器的resize事件

3.两者的区别
	重排一定发生重绘，重绘不一定发生重排。
	重绘引起外观的改变，重排往往引起布局的改变
	重排消耗大于重绘，开发过程中应该尽量避免重排

4.如何减少重排与缩小重排影响范围
	1）将多次改变样式属性操作合并成一次
	2）对于多次需要进行重排的元素，可以改变position的值(fixed,absolute)使其脱离文档流，这样可以避免影响其他元素
	3）尽量避免使用display：none，改用visibility：hidden。(他两个的区别)
	4）使用resize事件时，使用防抖节流
	5）多使用css动画，避免JS去操作动画
```

### 21.垂直水平居中

```
1.垂直居中
	需要知道宽高：
	1）absolute； top：50%； margin-top: -self.width
	2) basolute; top: 0; bottom: 0; margin: auto 0;
	3) absolute; top: calc(50% - self.height)
	
	不需要知道宽高：
	1) absolute; top: 50%; transform: translateY(-50%);
	2) flex; align-items: center;
```

### 22.viewport&1px渲染成2px问题

```

```

### 23.flex布局

```
方向：
	flex-direction(4)
是否换行：
	flex-wrap(3)
主轴对齐方式：
	justify-content(5)
交叉轴对齐方式：
	justify-content(5)

```

### 24.精灵图的优缺点

```
精灵图是把多张图片整合到一张图片上，配合css的background-position可以进行定位，展示出相应的图片。

优点：
	1.减少http请求，从而加快网页的加载速度，
	2.图片总体积减小，每个图片都有头部信息，合并就只有一个，从而减少了字节数
	
缺点：
	1.需要ps，精确的计算位置
	2.维护麻烦
```

### 25.文本溢出

```
1.单行：
	1.overflow: hidden; + text-overflow: ellipsis;
1.多行：
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 6;  // 表明第几行
	overflow: hidden;
	-webkit-box-orient: vertical;

```

### 26.实现轮播图

```
1.首先定义好展示轮播图图片的数组，定义好当前位置current，定义一个播放下一张图片的函数
	1.下一张图片函数：
		1.定义下一个位置=(position+1)/len, 定义当前图片=pic[positon],下一张图片=pic[nextPosition]
		2.让当前图片current.transition='none',下一张也是none,让当前current.style.transform位移100%宽度
2.setInterval无限循环
```

### 27.css规范

```
命名规范：
	bem(Block, Element, Modifier):
		通过__链接block与element，通过--链接修饰词
		优点：确保了唯一性，以防样式覆盖等问题
		缺点：命名语句过长
```

### 28.移动端的px和pc端的px一样吗？

```

```

### 29.sticky粘性定位

```
1.概念：粘性定位是相对定位和固定定位的混合。到达临界值之前都是相对定位，到达临界值之后变为固定定位。
2.使用：
	position: sticky;
	top: 0; // right/bottom/left 任一有效值，甚至可以为负像素值  到达位置后变为fixed布局
3.相比于JS执行的优点：
	不用去执行js，不占用主线程，可以提升性能，直接调用GPU渲染就行。
```

### 30.display:none visibility:hidden opacity:0 区别

```
1.display:none：
	1.属于直接在文档中被移除了，不占空间
	2.会引起重排，性能较差
	3.无法进行事件监听
2.visibility:hidden
	1.该DOM元素属于被隐藏，但是不会消失，任然存在文档中
	2.也无法进行事件监听
	3.只会引起重绘，性能消耗比display高
	4.该属性会被子元素继承。
3.opacity:0
	1.透明度为100%，元素隐藏，页占据空间
	2.可以进行事件监听
	3.属于合成层事件，性能是三个当中最高的。
	4.会被子元素继承，但是子元素不能通过改变属性取消隐藏
	5.属于动画，可以延迟显示隐藏
```

### 31.样式冲突规则

```
规则1：
	继承发生样式冲突，以最近祖先为标准
规则2：
	继承样式和指定样式冲突，以指定为准
规则3：
	指定样式发生冲突，以权重高为准
规则4：
	权重相同发生冲突，以后者为准
规则5：
	!important不会被覆盖
```

