### 1.React中的keys作用？

```
作用：Keys是React中用于追踪列表中元素的增、删、改时的辅助标识

具体：
	key是列表子元素的唯一标识符，新的组件可能对这个列表进行了
	增加，删除，重新排列子元素的操作，有了key的话，新旧组件对比
	到相同的key，就可以避免节点不必要的删除与创建操作，时节点的
	复用性提高，达到了提高性能的目的
	
	key 相同，但属性不同，只会更新属性；
	key不同，则会销毁组件，重新创建新组件
```

### 2.refs的作用

```
作用：安全访问某个元素或者某个组件实例的句柄。
使用场景：媒体播放，文本选择，触发强制动画
```

### 3.修改了state进行相关的操作

```
1.通过setState的第二个回调函数
2.通过生命周期函数
```

### 4.diff算法说一下

### 5.setState什么时候是同步的，什么时候是异步的？

```
一.同步情况
	1.setTimeout里面是同步的
	2.原生DOM事件(addEventListener)是同步的

二、异步
	1.合成事件
	2.生命周期
```

### 6.哪里可以拿到最近的state值

```
1.生命周期函数componentDidUpdate

2.setState里面的第二个回调参数可以拿到最近的值
```

### 7.多个setState的合并

- 还是1
- 源码内部用了do while循环

```js
  increment() {
    this.setState({
      counter: this.state.counter + 1
    });

    this.setState({
      counter: this.state.counter + 1
    });

    this.setState({
      counter: this.state.counter + 1
    });
  }
```

- 如果想要它累加呢？
- 将第一个参数设置为函数(prevState, props),拿到先前的state

```js
increment() {
  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1
    }
  })

  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1
    }
  })

  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1
    }
  })
  }
```

### 8.父子组件通信/兄弟组件通信

```
Context/eventBus
父传子：props
子传父：props，在父组件创建好函数，传入props中，在子组件里取出来，从而达到使用父组件的state。
兄弟：event bus安装第三方、context Provider提供数据，Consumer里面使用数据
redux
```

### 9.react渲染DOM的原理

```
JSX -> 虚拟DOM -> 真实DOM
1.首先我们一般都使用JSX去写一些DOM，但本质上这是一种语法糖，内部会帮我们做一个转换，将JSX语法转换成
React.createElement(标签，属性，子组件)这个函数。
2.React.createElement：
	这个函数主要做三样事情：
		1.取出config属性
			1.key，ref，source等等
			2.创建一个属性的对象，将每个属性通过for in循环config进行存储至props中
		2.处理children
			1.判断孩子长度是否>1，1的话props.children=children;
			2.>1的话，创建一个数组childrenArray，通过遍历children，将数组赋值，最后props.children=childrenArray
		3.返回ReactElement（虚拟DOM）
```

### 10.React更新流程

```
props/state改变 -> render函数重新执行 -> 产生新的DOM树
-> 新旧DOM树进行diff -> 计算差异进行更新 -> 更新到真实的DOM
```



### 11.React和Vue的差异

```
1.创建组件的方式
	vue通过.vue文件就可以创建一个组件
	react通过js创建类组件(继承Component)和函数组件

2.更新状态不一样
	vue拿到data可以直接进行修改
	react通过setState修改，用新的state替换旧state

3.生命周期
	vue里面有beforeCreate，created ，react没有
	vue没有手动判断组件是否需要更新，react有shouldComponentUpdate

4.组件通信
	vue父传子props，子传父通过emit。react的props则是两者都可以
	跨组件vue用事件总线，react用context
	
5.书写方式
	vue封装了很多指令：v-bind，v-for；react更多的是用原生js，更加纯粹
```

### 12.jsx的本质/虚拟DOM的创建过程

```
jsx 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。
所有的jsx最终都会被转换成React.createElement的函数调用
```

### 13.useSelector缺点？怎么解决

```
他会使本不该重新渲染的页面发生重新渲染，
第二个参数用shallowEqual，进行浅层比较
```

### 14.为什么使用Redux? Redux更新数据后为什么重新渲染

```
1.redux完美解决了组件之间的通信问题，不然就要通过props传来传去，有redux，每个组件都可以从redux获取最新store数据，也可以修改store里面的数据。
2.数据修改时可以被追踪

重新渲染：
	在componentDidMount订阅了store的变化，且在componentWillUnmount进行取消订阅。
	用connect纯函数实现的
```

### 14.纯函数connect

```

```



### 15.请求数据存到redux过程

```js
1.定义接口，定义常量
2.在reducer里面定义数组用于存储
3.在reducer里面case，并返回修改的数据
4.在actionCreators里面定义getXXXAction
5.在actionCreators里面定义changeXXXAction供getXXXAction使用
    const changeHotRecommendAction = (res) => ({
      type: actionTypes.CHANGE_HOT_RECOMMEND,
      hotRecommend: res.banners
    })

    export const getHotRecommendAction = () => {
      return dispatch => {
        getHotRecommend().then(res => {
          console.log(res)
          dispatch(changeHotRecommendAction(res))
        })
      }
    }
6.在相关页面使用useDispatch和useEffect请求
  const { hotRecommend } = useSelector(state => ({
    hotRecommend: state.getIn(['recommend',hotRecommend])
  }),shallowEqual)
  
  const dispatch = useDispatch();

  // 其他hooks
  useEffect(()=>{
    dispatch(getHotRecommendAction(limit))
  },[dispatch])
```

### 15.redux请求数据过程

```
1.首先封装请求数据的函数，导出
2.定义常量。
4.在actionCreators定义action，action由type和payload对象组成。拿到请求结果，放入state里面
3.在业务代码中dispatch(action)，他会自动调用reducer。
3.在reducer里面进行switch case actionType，返回最新的state
5.在组件里面进行useEffect请求。
```

### 16.生命周期

```
常用：
1.Constructor：初始化内部state，绑定this
2.componentDidMount: 组件挂载到DOM上就会回调
	1.依赖DOM的操作
	2.发送网络请求
	3.添加订阅事件(在unmounted里面取消)
3.componentDidUpdate
	1.更新后立即调用
	2.如果需要与新旧props进行对比可以在这里
4.componentWillUnmount：组件即将被移除，回调
	1.清理操作
	2.订阅事件，timer，取消网络请求
5.shouldComponentUpdate	
	1.手动判断组件是否更新

不推荐使用：
	willMounted，willUpdate
	
官方文档：
	官方文档分为常用生命周期和不常用生命周期
		常用生命周期：
			1.constructor
			2.render
			3.componentDidMount
			4.componentDidUpdate
			5.componentWillUnMount
		不常用：
			1.getDerivedStateFromProps：在调用render方法之前调用
			2.getSnapshotBeforeUpdate：在最近一次渲染输出之前调用，是组件在发生更改前那个DOM获取信息，如滚动位置。这个生命周期任何返回值都会传给componentDidUpdate。
			3.shouldComponentUpdate：手动判断组件是否需要更新。
```

### 17.useMemo和useCallback的区别

```
1.useMemo是让函数在依赖不改变的情况下，不对这个值进行重新运算	
1.useCallback是对函数进行缓存，用于子组件引用父组件的函数，父组重新渲染，避免函数的引用发生改变

2.useMemo优化的是函数进行运算的开销
2.useCallback优化的组件重新渲染的开销
```

###  18. ImmutableJs  

```
1.使用原因
	reducer里面很多数据，每次修改数据时就要重新浅拷贝(因为react不支持直接修改state)，返回新对象，开销大，浪	 费性能。

2.原理：修改了对象，就返回新的对象，但是旧的对象不发生改变；使用了持久化数据结构，他会尽可能利用之前的数据不会造成性能浪费，使得内存不会被浪费；是一个树结构；

3.使用：
	1.把对象变为Immutable对象，Map(对象),但是只会浅层，使用fromJS会深拷贝转换
	2.设值：info.set(属性，'值')
	3.取值：state.get('name') 或者 state.getIn('recommend','hotRecommend')
```

### 19.react-hooks

```
1.useState 定义数据
2.useEffect 模拟生命周期函数
	1.在里面做网络请求，订阅事件，取消订阅
	2.第一个参数相当于mounted，return那个就是unmounted
3.useContext
	1.可以做一些数据的共享
	2.使用createContext创建相应的context
	3.用Provider作为数据的提供者，将想要被使用数据的组件包裹起来；
	4.在使用数据的组件里面使用useContext，把创建的context传入，就可以拿到共享数据
4.useReducer
	1.不是reducer的替代，是useState的一中替代
	2.state处理的逻辑比较复杂，可以通过useReducer进行拆分

5.useCallback，对性能做优化
	1.对函数进行了缓存，防止子组件做不必要的渲染
	2.用在子组件使用了父组件的函数，如果父组件重新渲染，那么函数的引用就会变，造成子组件认为两次传进来的函数不		一样，从而进行渲染。
	3.可以使用依赖判断其是否需要更新

6.useMemo
	1.对函数是否运行做一些优化
	2.在开发中，组件经常用到一些需要经过计算的属性，但是有些时候这个属性没有发生变化的，但是还是会重新进行计算
	3.需要一个记忆值，将它缓存下来，依赖不变的情况下就不用做不必要的计算
```

### 20.redux-hooks

```
1.useDispatch
	1.一般都在useEffect里面
	2.派发相应的action，做一些reducer数据的修改；
2.useSelector
	1.获取redux里面的数据
	2.一般都会用一个浅层比较shallowEqual去
```

### 21.setState为什么异步?

```
1.一句话总结：显著提高性能。
2.解释：
	1.每调用一次setState就代表着render频繁调用，重新渲染页面。效率低。
	2.异步的话可以获取到多个更新，然后批量处理。
3.同步更新state，但是没有执行render那么state就不能和props保持同步；就会产生很多问题。
```

### 22.为什么使用setState？不直接修改this.state

```
1.直接修改this.state，React是不知道数据发生变化的。
2.因为他没有像vue中做了数据数据监听。
3.
```

### 23.setState怎么实现的？

```
1.setState有两个参数，第一个partialState，第二个callback
2.首先判断partialState必须是function，object，null中的一个，否则报错
3.执行的是this.updater.enqueueSetState(this, partialState, callback, 'setState');
	每个类组件都有updater
	enqueueSetState根据不同的上下文，生成一个currentTime，再用currentTime计算一个过期时间。
	这个过期时间只有两个值，一个Sync，一个Batched，对应同步，异步（批量处理）
```

### 24.setState如何立即获取到更新后的值

```
1.setState里面有第二个参数，是一个回调函数，可以在里面获取到。
2.在componentDidUpdate生命周期也可以获取到最新的值。
```

### 25.setState多次合并的问题

```
1.setState在传入对象时，多次累加就只会执行一次。
2.想要多次累加的话，可以将setState的第一个参数换为函数。
```

### 26.高阶组件HOC

```
概念：
	和高阶函数很像，把一个组件作为参数传入，经过处理，返回一个新的组件。我的理解就是在使用之前对组件做一个劫持，对它做很多的操作，再去使用。
作用：
	使代码更优雅，代码可以复用，很多组件需要使用到一些共同属性，一个一个写就很麻烦，直接一个withRouter即可
应用：
	1、增强props(withRouter)
缺点：
	1.有嵌套关系，结构不够美观，阅读性较差
	2.出现了hooks解决了很多问题
注意：高阶组件是一个函数，而不是一个组件

```

### 27.React传参方式

### 28.React每次setState都会引起diff算法吗

```
不一定

理由：
	1.当进行了SCU优化时，setState之后又进行了浅层比较，有可能就是在浅层比较阶段没有深入对比下去，然后又是state里面对象没有拷贝，造成浅层比较判定值都一样。所以，setState之后，可能不会发起diff算法。
```

### 29.RN和React的区别

```
RN：用对应的是移动应用平台															React：渲染品台是浏览器HTML渲染
RN：都是用JSX语法进行开发，都是利用虚拟DOM这个特性
RN：自动匹配不同手机的大小
RN：很多css3样式不能使用box-shadow
```

### 30.redux原理

### 31.redux dispatch之后如何引发页面渲染的

### 32.为什么使用Redux

### 33.hooks原理？如何自定义hooks

### 34.父子组件的挂载，卸载顺序

```
挂载：
	1.父组件即将挂载
	2.子组件即将挂载
	3.子组件挂载完成
	4.父组件挂载完成
卸载：
	
```

### 35.React Hooks常见的坑？怎么解决？

```
1.hook必须放在最上层，也就是返回的后面。
2.对于有依赖，有缓存的请求hook，在进行修改数据之后，依赖项没有改变，导致不回去请求数据库中最新的数据。（第三方库的useQuery)
3.优化一方面性能的同时也降低了另外一部分的性能，使用是有代价的，（对比前后Deps依赖，进行了shallowEqual，开销不一定谁大谁小）
4.闭包引发的问题，会导致保存了旧值，使用const currentState = React.useRef(state)可以解决这个问题，拿到最新的值
5.修改状态是异步的，不能够立马获取的最新的值（目的是提高性能，批量处理，而不是修改一次就重绘一次）
```

### 36.类组件和函数组件的区别

```
1.函数式在一定程度上降低了代码量，useeffect合并了componentDidMount、componentDidUpdate 和 componentWillUnmount。
2.提供了很多好用的hook，包括了优化性能的hook
```

### 37.组件里为什么要导入import React from 'react';

```
1.因为React组件会在JS文件里面写JSX，JSX的本质又是React.createElement，最终会被编译成React.createElement，如果不导入的话，找不到React会报错
```

### 38.React17为什么不用引入React

```
1.React 更新引入了 react/jsx-runtime, 改变了 JSX 编译模式, 不再是 React.createElement
2.同时编译工具(react 的预设 @babel/preset-react), 针对 jsx 不但会帮我们进行编译, 还会帮我们手动引入所需要的包
// 由编译器引入（禁止自己引入！）
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}

```

