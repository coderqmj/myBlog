### 1.vue中有哪些生命周期？分别有什么作用和区别？

```
created/mounted/destroyed/updated 和对应的before
created（创建后） 在模板渲染成HTML前调用，初始化数据，属性和方法的运算，初始化事件，DOM元素还是没有呗挂载上去的。读取innerHTML就读不到
mounted（挂载后）：在模板渲染成HTML后调用，这个时候可以对DOM进行相关的操作了.一般在这里发起ajax请求
```



### 2.为什么data是个函数

```
因为vue中的组件是具有复用性的，创建每个组件实例的时候使用对象的话，他返回的是一个地址值，其实指向的是内存中同一个对象，这样的话，每个组件实例它里面的属性就会互相干扰，比如说其中一个组件的等级属性+1就会造成其他该组件发生+1，而函数每次创建执行的时候就会生成不同的对象。
```

### 3.vue-router传参方式

```
1.pramas
	/user/:id
2.query
	<router-link :to='{path: '/profile', query: {name:'qmj',age:18}}'>档案</router-link>
```



### 4.vuex的actions和mutations的区别

```
actions可以处理异步操作
mutations不可以
例子：比如说进行同步任务的时候，处理可以不通过actions，可以被devtools跟踪，但是里面有异步操作，就需要通过actions
```



### 5.vue中key的作用

```
key是在diff中需要用到的。没有key的话，如果说数据列表的顺序被改变他会就地更新每个每个元素，但是用了key的话，他可以更快，更准地比较每个新旧虚拟DOM，使得旧DOM得到复用，提高性能。
比如说，给li换顺序，没key他要创建和删除节点，非常浪费钱能。用了key，他可以根据唯一标识识别新旧虚拟DOM的差异，只需要修改内容，不用删除创建 节点
```

### 6.diff算法说一下

### 7. computed和watch区别 

### 8.computed和watch的区别

```
1.前者是计算属性
```

