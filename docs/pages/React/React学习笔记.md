## 一、React组件定义方式

### 1.1、类组件

定义类组件必须满足以下要求：

- 类组件必须继承自 `React.Component`
- 类组件必须实现`render`函数

**类组件的特点**：

- constructor是可选的，通常在里面初始化数据
- this.state中维护的是组件内部的数据
- `render()`是类组件唯一必实现的方法

```javascript
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      message: "你好啊,李银河"
    }
  }

  render() {
    return (
      <div>
        <span>我是类组件</span>
        <h2>{this.state.message}</h2>
      </div>
    )
  }
}
```

### 1.2、函数式组件

```javascript
export default function App() {
  return (
    <div>
      <span>我是function的组件: App组件</span>
      <h2>counter</h2>
      <button>+1</button>
      <h2>你好啊,王小波</h2>
    </div>
  )
}
```

函数式组件的特点：

- 没有生命周期，会被更新挂载，但没有生命周期函数

- 没有this对象
- 没有内部状态

**通过HOOKS可以解决**

### 1.3、render的返回值

当`render`被调用时，他会检查`this.props`和`this.state`的变化并返回以下类型之一

- **React元素**
  - 通过JSX创建。
  - 例如，`<div />`会被React渲染为DOM节点，`<MyConponent />`会被React渲染为自定义组件；
  - 无论是`<div />` 还是`<MyConponent>`都是React元素
- **数组或者fragments:** 使得render方法可以返回多个元素
- **Portals**: 可以渲染子节点到不同的DOM子节点树中。
- **字符串||数值类型**： 他们会在DOM中被渲染成文本节点
- **布尔值||null**： 什么都不渲染

## 二、组件的生命周期

### 2.1.组件的生命周期函数

**constructor**

```javascript
constructor(props)
```

如果不初始化**state**或不进行方法绑定，则不需要为组建实现构造函数

constructor中通常只做两件事情：

- 通过给`this.state`赋值对象来初始化内部的state
- 为事件绑定实例(this)



**componentDidMount**

`componentDidMount()`会在组件挂载后(插入DOM树中)立即执行。

该函数通常执行的操作：

- 依赖于DOM操作可以在这里进行
- 发送网络请求（官方建议）
- 在此处添加订阅（在componentWillUNmount取消订阅）



**componentDidUpdate（）**

该函数会在更新后被立即调用，但首次渲染的时候不会调用

- 当组件更新后，可以在此处对DOM进行操作
- 如果对更新前后的props进行比较，可以在此处进行网络请求（例如，props未发生变化时，则不进行网络请求）

```javascript
componentDidUpdate(prevProps) {
	if(this.props.userID !== prevProps.userID) {
        // 网络请求相关
		this.fetchData(this.props.userID)
    }
}
```



**componentWillUnmount**

`componentWillUnmount()`会在组件卸载及销毁之前直接调用

- 在此方法执行必要的清理操作；
- 例如，清除timer，取消网络请求在`componentDidMount`中创建的订阅

## 三、组件通信

### 3.1父子组件通信（props）

父传子例子（类组件）：

```javascript
class Child extends Component {
  constructor(props) {
    super()
    this.props = props
  }
  render() {
    const {name, age, height} = this.props
    return (
      <h2>子组件展示数据:{name + " "+ age +" " + height}</h2>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Child name="qmj" age="18" height="188"/>
      </div>
    )
  }
}
```

父传子例子(函数组件):

```javascript
function Child(props) {
  const { name, age, height } = props
  return (
    <div>
      <h2>{name + age + height}</h2>
    </div>
  )
}
Child.propTypes = {
  name: propTypes.string,
  age: propTypes.number,
  height: propTypes.number,
  names: propTypes.array
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Child name="qmj" age={18} height={188} names={['aaa','bb']}/>
      </div>
    )
  }
}
```

### 3.2兄弟间的通信——eventbus

一个全局对象

安装：`yarn add events`

导入： `import { EventEmitter } from 'events'`

使用:

```
const eventBus = new EventEmitter()

// 发射某个事件
emitEvent() {
	eventBus.emit('事件名',...参数)
}
// 接收事件
componentDidMount() {
	eventBus.addListener('事件名',callback)
}
componentWillUNmount() {
	eventBus.removeListener('事件名', callback)
}
```

推荐使用的生命周期:

监听事件：componentDidMount

卸载事件：componentWillUNmount



- - 

## 四、setState相关

### 4.1为什么使用setState？

因为直接通过this.state.属性直接修改的话，React是不知道数据发生变化的，因为他不像Vue2中的Object.defineProperty或者vue3中Proxy的方式去监听数据的变化。

但本身并没有定义setState()，但是可以使用，因为setState是继承于Component。

源码：

```javascript
Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
      typeof partialState === 'function' ||
      partialState == null,
    'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.',
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
// 上面源码的意思表示partialState是传入最新的对象，类型是函数或者对象，null 否则报错
```

### 4.2setState异步更新？

下列代码：

- 打印出Helloworld
- 说明在这里是异步更新的

```javascript
changeText() {
  this.setState({
    message: "你好啊,李银河"
  })
  console.log(this.state.message); // 先前的Hello World
}
```

为什么setState是异步的？

- 该问题在github上讨论激烈，React核心成员兼Redux作者给出了相应的回答
-  https://github.com/facebook/react/issues/11527#issuecomment-360199710； 

我对其回答做一个简单的总结：

- `setState`设计为异步，可以显著的提升性能；

- - 如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；
  - 最好的办法应该是获取到多个更新，之后进行批量更新；

- 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步；

- - state和props不能保持一致性，会在开发中产生很多的问题；

如何获取前面更新后的值？

- 上面源码写的很清楚，setState有两个参数，第二个参数callback可以获取到最新的值。
-  格式如下：`setState(partialState, callback)` 

```javascript
changeText() {
  this.setState({
    message: "你好啊,李银河"
  }, () => {
    console.log(this.state.message); // 你好啊,李银河
  });
}
```

当然，我们也可以在生命周期函数拿到最新的值：

```
componentDidUpdate(prevProps, provState, snapshot) {
	console.log(this.state.message);
}
```

### 4.3setState同步更新？

setTime中同步更新：

```javascript
changeText() {
  setTimeout(() => {
    this.setState({
      message: "你好啊,李银河"
    });
    console.log(this.state.message); // 你好啊,李银河
  }, 0);
}
```

原生DOM事件：

```javascript
componentDidMount() {
  const btnEl = document.getElementById("btn");
  btnEl.addEventListener('click', () => {
    this.setState({
      message: "你好啊,李银河"
    });
    console.log(this.state.message); // 你好啊,李银河
  })
}
```

其实分成两种情况：

- 在组件生命周期或React合成事件中，setState是异步；
- 在setTimeout或者原生dom事件中，setState是同步；

React内部其实是通过一个函数来确定的：enqueueSetState部分实现（react-reconciler/ReactFiberClassComponent.js） :

```javascript
enqueueSetState(inst, payload, callback) {
  const fiber = getInstance(inst);
  // 会根据React上下文计算一个当前时间
  const currentTime = requestCurrentTimeForUpdate();
  const suspenseConfig = requestCurrentSuspenseConfig();
  // 这个函数会返回当前是同步还是异步更新（准确的说是优先级）
  const expirationTime = computeExpirationForFiber(
    currentTime,
    fiber,
    suspenseConfig,
  );

  const update = createUpdate(expirationTime, suspenseConfig);
  
  ...
}
```

- Sync是优先级最高的，即创建就更新；

```
  currentTime: ExpirationTime,
  fiber: Fiber,
  suspenseConfig: null | SuspenseConfig,
): ExpirationTime {
  const mode = fiber.mode;
  if ((mode & BlockingMode) === NoMode) {
    return Sync; // 返回同步
  }

  const priorityLevel = getCurrentPriorityLevel();
  if ((mode & ConcurrentMode) === NoMode) {
    return priorityLevel === ImmediatePriority ? Sync : Batched; //返回同步或者异步
  }
```

### 4.4setState数据的合并

#### 4.4.1数据的合并

假如我们有这样的数据：

```javascript
this.state = {
  name: "qmj",
  message: "Hello World"
}
```

我们需要更新message：

- 我通过setState去修改message，是不会对name产生影响的；

```
changeText() {
  this.setState({
    message: "你好啊,李银河"
  });
}
```

为什么不会产生影响？源码内部对**原对象**和**新对象**进行了合并：

-  事实上就是使用 `Object.assign(target, ...sources)` 来完成的； 

```javascript
return Object.assign({}, prevState, partialStete) // 目标， 前一个state，新state
```

#### 4.4.1多个setState的合并

如state里面有一个counter为0，一个点击事件同时setState三次让它+1，

- 结果是以最后一次为结果，还是1
- 因为他会对多个state进行合并

```javascript
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

 其实在源码的processUpdateQueue中有一个do...while循环，就是从队列中取出多个state进行合并的； 

但如果想不合并(累加)呢？就可以把第一个参数改为函数了

```javascript
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

### 4.5setState不可变数据的力量

newState和oldState不能是一样的

原因：这样的话SCU就没有任何意义，因为其内部判断是根据新旧值(地址值)来判断的。这样的话，SCU内部判断永远返回的是false，就无法重新render

**错误的做法：**

- 新旧state都是同一个地址值 
- 不进行SCU其实可以，但开发中不要这样做

```
const newData = {name: 'tom', age: 30}
this.state.friends.push(newData)
this.setState({
	friends: this.state.friends
})
```

**推荐做法：**

- 可以进行SCU优化，这两个对象的地址值是不一样的

```
const newFriends = [...this.state.friends]
newFriends.push({name: 'tom', age: 30})
this.setState({
	friends: newFriends
})
```



## 五、setState性能优化

### 5.1React更新机制

React的渲染流程非常简单：

```
JSX -> 虚拟DOM -> 真实DOM
```



那么React的更新流程呢？

```
props/state改变 -> render函数重新执行 -> 产生新的DOM数->

新旧DOM进行diff -> 计算差异进行更新 -> 更新到真实的DOM`
```



React在props/state改变时，会调用React的render的方法，会创建一颗不同的树。

 React需要基于这两颗不同的树之间的差别来判断如何有效的更新UI：



算法进行了优化成O(n):

- 同层节点之间比较，不会跨节点
- 不同类型的节点，产生不同的树结构(如：div>span，就会生成全新的字树)
- 通过key指定哪些节点在不同的渲染下保持稳定

### 5.2Diff算法

#### 5.2.1对比不同类型的元素

当节点为不同的元素，React会拆卸原有的树，并且建立起新的树：

- 当一个元素从 `a` 变成 `img`，从 `Article` 变成 `Comment`，或从 `Button` 变成 `div` 都会触发一个完整的重建流程；
- 当卸载一棵树时，对应的DOM节点也会被销毁，组件实例将执行`componentWillUnmount()` 方法；
- 当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中，组件实例将执行 `componentWillMount()` 方法，紧接着 `componentDidMount()` 方法；

比如下面的代码更改：

- React 会销毁 `Counter` 组件并且重新装载一个新的组件，而不会对Counter进行复用；

```
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

#### 5.2.2 对比同一类型的元素

当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。

比如下面的代码更改：

- 通过比对这两个元素，React 知道只需要修改 DOM 元素上的 `className` 属性；

```
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

如果是同类型的组件元素：

- 组件会保持不变，React会更新该组件的props，并且调用`componentWillReceiveProps()`和 `componentWillUpdate()` 方法；
- 下一步，调用 `render()` 方法，diff 算法将在之前的结果以及新的结果中进行递归；

#### 5.2.3对子节点进行递归

在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

我们来看一下在最后插入一条数据的情况：

- 前面两个比较是完全相同的，所以不会产生mutation；
- 最后一个比较，产生一个mutation，将其插入到新的DOM树中即可；

```javascript
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

但是如果我们是在中间插入一条数据：

- React会对每一个子元素产生一个mutation，而不是保持 `星际穿越`和`盗梦空间`的不变；
- 这种低效的比较方式会带来一定的性能问题；

```javascript
<ul>
  <li>星际穿越</li>
  <li>盗梦空间</li>
</ul>

<ul>
  <li>大话西游</li>
  <li>星际穿越</li>
  <li>盗梦空间</li>
</ul>
```

### 5.3keys的优化

在遍历列表的时候，总会 提示警告，需要加入key值

例子:

```javascript
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: ["星际穿越", "盗梦空间"]
    }
  }

  render() {
    return (
      <div>
        <h2>电影列表</h2>
        <ul>
          {
            this.state.movies.map((item, index) => {
              return <li>{item}</li>
            })
          }
        </ul>
        <button onClick={e => this.insertMovie()}>插入数据</button>
      </div>
    )
  }

  insertMovie() {
  }
}
```

方式一：在最后位置插入数据

- 这种情况，有无key意义不大

```javascript
insertMovie() {
  const newMovies = [...this.state.movies, "大话西游"];
  this.setState({
    movies: newMovies
  })
}
```

方式二：在前面插入数据

```javascript
insertMovie() {
  const newMovies = ["大话西游", ...this.state.movies];
  this.setState({
    movies: newMovies
  })
}
```

当子元素(这里的li)拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素：

- 在下面这种场景下，key为111和222的元素仅仅进行位移，不需要进行任何的修改；
- 将key为333的元素插入到最前面的位置即可；

```javascript
<ul>
  <li key="111">星际穿越</li>
  <li key="222">盗梦空间</li>
</ul>

<ul>
  <li key="333">Connecticut</li>
  <li key="111">星际穿越</li>
  <li key="222">盗梦空间</li>
</ul>
```

key的注意事项：

- key应该是唯一的；
- key不要使用随机数（随机数在下一次render时，会重新生成一个数字）；
- 使用index作为key，对性能是没有优化的；

### 5.4.SCU优化

#### 5.4.1render函数的调用

看一个例子：

- 点击事件发生时App的render()被调用
- App的render被调用，从而造成所有子组件的render被调用
- 造成性能上的浪费

```javascript
import React, { Component } from 'react';

function Header() {
  console.log("Header Render 被调用");
  return <h2>Header</h2>
}

class Main extends Component {
  render() {
    console.log("Main Render 被调用");
    return (
      <div>
        <Banner/>
        <ProductList/>
      </div>
    )
  }
}

function Banner() {
  console.log("Banner Render 被调用");
  return <div>Banner</div>
}

function ProductList() {
  console.log("ProductList Render 被调用");
  return (
    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
    </ul>
  )
}

function Footer() {
  console.log("Footer Render 被调用");
  return <h2>Footer</h2>
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    console.log("App Render 被调用");

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
```

思考：

- 很多组件没必要重新render
- 调用render只有一个前提：依赖数据(state/props)发生改变时，再调用自己的render

如何控制render？

-  通过`shouldComponentUpdate`方法即可； 

#### 5.4.2.shouldComponentUpdate

该方法是一个生命周期，有参数，且有返回值：

- 该方法有两个参数：

- - 参数一：nextProps 修改之后，最新的props属性
  - 参数二：nextState 修改之后，最新的state属性

- 该方法返回值是一个boolean类型

- - 返回值为true，那么就需要调用render方法；
  - 返回值为false，那么久不需要调用render方法；
  - 默认返回的是true，也就是只要state发生改变，就会调用render方法

比如我们在App中增加一个message属性：

- jsx中并没有依赖这个message，那么它的改变不应该引起重新渲染；
- 但是因为render监听到state的改变，就会重新render，所以最后render方法还是被重新调用了；

```javascript
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      message: "Hello World"
    }
  }

  render() {
    console.log("App Render 被调用");

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.changeText()}>改变文本</button>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  changeText() {
    this.setState({
      message: "你好啊,李银河"
    })
  }
}
```

#### 5.4.3. PureComponent和memo

类组件可以使用pureComponent，原理是什么呢？

- 对props和state进行浅层比较(源码在 react/ReactBaseClasses.js )

函数式组件使用memo

- 使用memo对之前的子组件进行包裹

```javascript
const MemoHeader = memo(function() {
  console.log("Header Render 被调用");
  return <h2>Header</h2>
})
```

原理(react/memo.js)

## 六、受控和非受控组件

> 受控组件和非受控组件一般和表单有关系，在React中，HTML表单的处理方式和普通DOM元素不太一样：表单元素通常会保存在一些内部的state，我们一般不使用原生去提交表单，一般使用JS函数去提交，同时还可以访问用户填写的表单数据。实现这种效果的标准方式就是受控组件。

- 在HTML中，表单元素通常维护自己的state，并根据用户输入进行更新
- 而在React中，可变状态通常保存在组件的state属性中，并且只能通过使用setState来更新
  - 我们将两者结合起来，使React的state成为唯一数据源
  - 渲染表单的React组件还控制着用户输入过程中表单发生的操作
  - 被React以这种方式控制取值的表单输入元素叫做 **受控组件**

**非受控组件**

- 其实就是通过ref去获取dom的一些信息

### 6.1使用ref(类特有，函数组件没法用)

在React开发中，不建议直接操作DOM，使用ref

三种方式：

- ref等于一个字符串

  - ```jsx
    <h2 ref="titleRef">Hello React<h2/>
    <btn onClick={e => this.changeText()}>改变文本</btn>
    changeText() {
    	this.refs.titleRef.innerHTML = 'hello world'
    }
    ```

- 为一个对象(推荐)

  - ```jsx
    import { createRef} from 'react'
    constructor(props) {
    	super(props)
    	this.titleRef = createRef()
    }
    <h2 ref={this.titleRef}>Hello React<h2/>
    <btn onClick={e => this.changeText()}>改变文本</btn>
    changeText() {
    	this.titleRef.current.innerHTML = 'hello world'
    }
    ```

- 为一个函数

  - ```jsx
    constructor(props) {
    	super(props)
    	this.titleEl = null
    }
    <h2 ref={(arg)=>{ this.titleEl = arg}}>Hello React<h2/>
    
    ```

### 6.2受控组件基本使用

### 6.3ref的转发

- 原因，函数式组件不能用ref

现有代码：

```jsx
// 类组件可以使用ref
class Home extends PureComponent {
  render() {
    return <h2>Home</h2>
  }
}
<Home ref={this.homeRef}/>

// 函数式组件不能用ref
function Profile(props) {
    return <h2>Profile</h2>
}
<Profile ref={this.profileRef}/>  // 直接给出警告
```

但如果想要获取到函数式组件的`h2`标签呢？

- 使用forwardRef高阶组件（函数），需要从react引入
- forwardRef有两个参数，第一个props，第二个ref，然后直接在ref={ref}即可

```jsx
const Profile = forwardRef(function (props, ref) {
  
  return <h2 ref={ref}>Profile</h2>
})        

<Profile ref={this.profileRef} />

```

### 6.4Portals

#### 6.4.1Portals出现的原因

开发有些情况的希望组件独立于父组件甚至整个DOM，例如：

- 在一个组件里面点击事件后希望有一个弹窗显示与整个窗口的中间，但组件是很小的。

#### 6.4.2Portals的使用

Portals是ReactDOM里面的方法，可以将子节点渲染到存在于父组件外的DOM节点

- 第一个参数(child)是任何可渲染的React子元素，例如一个子元素，字符串或者fragment
- 第二个参数（container）是一个DOM元素

```jsx
ReactDOM.createPortal(child, container);1``
```



## 七、高阶组件

### 7.0高阶组件的作用

- 1.将一些没有技术含量的操作组件的工作过程封装成一个函数，比如给每个组件添加个属性
- 共享Context过程代码繁琐，可以用高阶组件封装具体过程

### 7.1认识高阶函数

什么是高阶函数？满足以下条件之一：

- 接收一个或多个函数作为输入
- 输出一个函数
- 例如：filter，map，reduce

那什么是高阶组件呢？

- 英文名**Higher-Order Components**,简称HOC
- 官方定义：**高阶组件是参数为组件，返回值为新组件的函数**

高阶组件调用：

```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

高阶组件编写:

```jsx
function higherOrderComponent(WrapperComponent) {
  return class NewComponent extends PureComponent {
    render() {
      return <WrapperComponent/>
    }
  }
}
```

在开发者工具看到的组件的嵌套是写死的：

- NewComponent>WrapperComponent

如果想要改成自己想要的名字呢？

- NewComponent.display = "qmj"
- qmj>WrapperComponent

一个完整的高阶组件代码：

```jsx
import React, { PureComponent } from 'react';

function higherOrderComponent(WrapperComponent) {
  return class NewComponent extends PureComponent {
    render() {
      return <WrapperComponent/>
    }
  }
}

class App extends PureComponent {
  render() {
    return (
      <div>
        App
      </div>
    )
  }
}

export default higherOrderComponent(App);
```

### 7.2高阶组件的应用——增强props

#### 7.2.1. props的增强

**不修改原有代码的情况下，添加新的props**

- 假如要添加公共属性的话，原来是要在每个组件后面添加女
- 使用高阶组件的话，只需要在函数中 { region = '江西'} 就可以给所有通过该函数创建的组件添加该属性

假如我们有如下案例：

```jsx
function EnhanceProps(WrapperComponent) {
  return props => {
    return <WrapperComponent {...props} region="江西"/>
  }
}
class Home extends PureComponent {
  render() {
    return <h2>Home:{`昵称：${this.props.name}  年龄: ${this.props.age} 地区: ${this.props.region}`}</h2>
  }
}
class About extends PureComponent {
  render(props) {
    return <h2>About:{`昵称：${this.props.name}  年龄: ${this.props.age} 地区: ${this.props.region}`}</h2>
  }
}
const EnhanceHome = EnhanceProps(Home)
const EnhanceAbout = EnhanceProps(About)

class App extends PureComponent {
  render() {
    return (
      <div>
        App: {this.props.name}
        <EnhanceHome name="qmj" age={18} />
        <EnhanceAbout name="kobe" age={28} />
      </div>
    )
  }
}
```

 **利用高阶组件来共享Context** 

```jsx
import React, { PureComponent, createContext } from 'react';

const UserContext = createContext({
  nickname: "默认",
  level: -1
})

function withUser(WrapperCpn) {
  return props => {
    return (
      <UserContext.Consumer>
        {
          value => {
            return <WrapperCpn {...props} {...value}/>
          }
        }
      </UserContext.Consumer>
    )
  }
}

function Header(props) {
  const { nickname, level } = props;
  return <h2>Header {"昵称:" + nickname + "等级:" + level}</h2>
}


function Footer(props) {
  const { nickname, level } = props;
  return <h2>Footer {"昵称:" + nickname + "等级:" + level}</h2>
}

const UserHeader = withUser(Header);
const UserFooter = withUser(Footer);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <UserContext.Provider value={{ nickname: "why", level: 90 }}>
          <UserHeader />
          <UserFooter />
        </UserContext.Provider>
      </div>
    )
  }
}
```

#### 7.2.2渲染判断鉴权

在开发中，我们可能遇到这样的场景：

- 某些页面是必须用户登录成功才能进行进入；
- 如果用户没有登录成功，那么直接跳转到登录页面；

```javascript
import React, { PureComponent } from 'react'

// 高阶组件
function WithAuth(Component) {
  return props => {
    const {isLogin} = props
    return isLogin? <Component {...props}/> : <Login />
  }
}

// 购物车
class Cart extends PureComponent {
  render() {
    return <h2>购物车</h2>
  }
}
class Login extends PureComponent {
  render() {
    return <h2>登录界面</h2>
  }
}

const WithCart = WithAuth(Cart)
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <WithCart isLogin={true} />
      </div>
    )
  }
}

```

#### 7.2.3共享Context

#### 7.2.4生命周期劫持

### 7.3高阶组件的优点/缺点

优点：

- 早期使用mixin，但已经不再推荐
- 可以对代码进行优雅的处理
- 可以减少重复的代码

缺点：

- HOC需要在原组件上进行包裹或者嵌套，大量使用HOC会造成很多嵌套，让代码试调变得困难
- HOC可以劫持props，在不遵守约定的情况下造成冲突

解决：

- HOOKS
- hooks解决了 this指向问题，hoc大量嵌套问题

## 八、React中的css

### 8.1内联样式

优点：

- 样式之间不会有冲突
- 可以动态获取当前state的状态

缺点：

- 没有代码提示
- 大量代码书写在一个文件，看起来混乱
- 无法书写伪类/伪元素
- 书写要使用驼峰

```jsx
  render() {
    const pStyle = {
      color: 'orange'
    }
    return (
      <div>
        <h2 style={{fontSize: "50px", color: "red"}}>我是标题</h2>
        <p style={pStyle}>我是一段文字</p>
      </div>
    )
  }
```

### 8.2普通css

创建style文件，引入组件中即可

缺点：

- 会产生层叠，当类名一样的时候
- 从app里面导入，权重很高，可能会覆盖全部样式

### 8.3css模块化

在普通css的基础上把文件名改成 style.module.css

缺点：

- 使用类名的时候不能用连接符
- 所有的className都使用{style.className}来书写
- 不方便动态修改样式，依然要使用内联的方式

使用过程：

- 在style.module.css里面书写样式
- 导入样式
- 以对象的方式使用样式

```jsx
import homeStyle from './style.module.css'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h2 className={homeStyle.title}>我是home组件</h2>
      </div>
    )
  }
}
```

### 8.4 css in js 推荐

> 事实上就是把样式也写到JS中，这样可以方便的使用JavaScript的状态，all in js

优点：

- css in js具有预处理器的功能，样式嵌套，函数定义，逻辑复用，动态修改状态
- 这是目前最受欢迎的方案

目前css in js 的库

- styled-components
- emotion
- glamorous

#### 认识styled-components

安装： `yarn styled-components`

导入： `import styled from 'styled-components'`



书写：

- 字符串模板解析
- div是个函数，span，a等等都可以
- 返回的是一个具有字体大小50px，颜色红的组件
- 可以和less一样样式嵌套

```jsx
// styled.js
import styled from 'styled-components'
export const HomeWrapper = styled.div`
  font-size: 50px;
  color: red;

  .banner {
    background-color: blue;
  }
`

// home.js
import React, { PureComponent } from 'react'
import { 
  HomeWrapper
 } from "./style";


export default class App extends PureComponent {
  render() {
    return (
      <HomeWrapper>
        app
        <h2 className="banner">我是home组件</h2>
      </HomeWrapper>
    )
  }
}
```

#### 解决了预处理器动态样式问题

- 可以自己定义变量，通过${箭头函数获取}
- 可以获取state里面的样式属性
- 传入自定义组件里面，然后通过${箭头函数}获取

```jsx
//自定义变量
const MJInput = styled.input.attrs({
  placeholder: 'coderqmj',
  bColor: "red",
})`
  background-color: lightblue;
  border-color: ${props => props.bColor}
`

// 获取state里面的动态样式
import React, { PureComponent } from 'react'

import styled from 'styled-components'
const MJInput = styled.input.attrs({
  placeholder: 'coderqmj',
  bColor: "red",
})`
  background-color: lightblue;
  border-color: ${props => props.bColor};
  color: ${props=>props.color};
`

export default class About extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      color: "orange"
    }
  }
  render() {
    return (
      <div>
        <MJInput type="password" color={this.state.color}/>
      </div>
    )
  }
}

```



#### 加上属性的写法

- 通过styled-components创建出来的组件直接能加上
- 通过函数

```jsx
// 方法一：
<MJInput type="password" />

// 方法二:
const MJInput = styled.input.attrs({
  placeholder: 'coderqmj',
})`
  background-color: lightblue;
`
```

#### 传递参数

- 再定义好的样式组件里面传入
- 在style.js里面对应的样式组件里面通过props获取

```jsx
// 组件里面
<BannerWrapper img={bgImage}></BannerWrapper>

// style.js里面
export const BannerWrapper = styled.div`
  background: url(${props => props.bgImage}) center center/6000px;
`
```



### 8.5 antd的使用

安装：`yarn add antd`  矢量图：`yarn add @ant-design/icons`

使用monent库：`yarn add moment`

导入：

样式引用：`import 'antd/dist/antd.css'` 在App中



#### 按需导入

安装craco：`yarn add craco`

修改packpage的scripts：都改为 carco, 他会读取craco.config.js里面的配置

他会和webpack里面的配置进行合并



## 九、React过渡动画

### 9.1react-transition-group

- 在开发中，我们给一个组件的显示和消失添加某种过渡动画，可以很好的增加用户体验。
- 原生css可以实现这些过渡动画，但是React社区为我们提供了react-transition-group来完成过渡动画

安装：

yarn add react-transition-group

优点：

- 体积小，不会给项目增加负担
- 提供API，使用方便

#### 提供的四个组件

- **Transition**
  - 该组件是一个和平台无关的组件
  - 在前端开发中，一般使用CSSTransition
- **CSSTransition**
  - 通常使用这个来完成过渡动画
- **SwitchTransition**
  - 两个组件显示和隐藏切换时，使用该组件
- **TransitionGroup**
  - 将多个东华组件包裹在其中，一般用于列表中元素的动画

## 十、Redux

### 10.1为什么要用redux？

javascript开发的应用程序，变得很复杂了

- 管理的状态很多，复杂

管理不断变化的state非常困难：

- 状态管理会互相存在依赖，一个状态变化会引起另一个状态的变化，View页面也有可能会引起状态的变化
- 当应用程序复杂时，state在什么时候，什么原因而发生了变化，变得难以控制和追踪

redux就是一个帮我们管理状态的容器：redux是JavaScript的状态容器，提供了可预测的状态管理

### 10.2什么是Redux？

#### 10.2Redux核心理念——store

#### 10.3Redux核心理念——action

Redux要求我们通过action来更新数据：

- 所有数据的变化，必须通过派发dispath action来更新
- action是一个普通的JavaScript对象，用来描述这次更新的type和content

#### 10.4Redux核心理念——reducer

#### 10.5Redux三大原则

#### 单一数据源

- 整个应用程的state都被存储在一颗object tree中，并且这个object tree只存储在一个store中
- 单一数据源可以让整个应用程序的state变的方便维护、追踪、修改

#### state是只读的

- 修改state的方法一定是触发action，不要通过其他任何地方来修改state
- 确保view或网络请求都不能直接修改state，他们只能通过action来描述自己想要如何修改state
- 保证了修改都被集中化处理，并且按照严格的顺序来执行，所以不用担心race condition问题

### 10.3redux简单使用

```javascript
// 1.导入Redux
const redux = require('redux')


// 初始化数据
const initialState = {
  counter: 0
}
// reducer
function reducer(state = initialState, action) {
  switch(action.type) {
      case "INCREMENT":
          return {...state, counter: state.counter+1}
      ... 类似于上面
      default:
          return state;
  }
  
}

// store 需要传入reducer
const store = redux.createStore(reducer)
// action
const action1 = {type: 'INCREMENT'};
const action2 = {type: 'DECREMENT'};
const action3 = {type: 'ADD_NUMBER', num:5};
const action4 = {type: 'SUB_NUMBER', num:12};

// 派发action, dispatch内部会执行reducer函数
store.dispath(action1)
store.dispath(action2)
store.dispath(action3)
store.dispath(action4)
```

### 10.4文件的划分

**store/index.js**

- 目的是导出store
- 需要redux里面的createStore
- 需要reducer作为参数传入createStore

```js
import {createStore} from 'redux';

import reducer from './reducer'
const store = createStore(reducer)

export default store;
```

**store/constants.js**

- 定义一些action.type的常量，防止写错

```js
export const ADD_NUMBER = "ADD_NUMBER";
export const SUB_NUMBER = "SUB_NUMBER";
```

**store/reducer.js**

- 用于进行相关的数据操作
- 需要导入常量，查找操作的类型
- 需要初始化数据inititalState

```js
import { 
  ADD_NUMBER,
  SUB_NUMBER
 } from "./constants";

const inititalState = {
  counter: 0
}

function reducer(state = inititalState, action) {
  switch (action.type) {
    case ADD_NUMBER:
      return { ...state, counter: state.counter + action.num }
    case SUB_NUMBER:
      return { ...state, counter: state.counter - action.num }
    default:
      return state;
  }
}

export default reducer
```

**store/actionCreators.js**

- 目的是定义action的类型，和其他数据
- 类型用常量定义

```js
import { 
  ADD_NUMBER,
  SUB_NUMBER  
 } from "./constants";

 export const addAction = (num) => {
   return {
     type: ADD_NUMBER,
     num
   }
 }

 export const subAction = (num) => {
  return {
    type: SUB_NUMBER,
    num
  }
}
```

**组件.js**

- 需要actions，用于传入dispatch
- 需要store，用于获取数据
- 需要生命周期函数里面订阅redux状态变化，更新state

```js
import React, { PureComponent } from 'react'
import store from './store/index'
import {
  addAction,
  subAction
} from "./store/actionCreators";

export default class Counter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: store.getState().counter
    }
  }
  componentDidMount() {
    this.unsubscribue = store.subscribe(() => {
      this.setState({
        counter: store.getState().counter
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribue();
  }

  render() {
    console.log(store)
    return (
      <div>
        <h2><button onClick={e => this.addNumber(-10)}>-10</button>当前计数: {this.state.counter}</h2> <button onClick={e => this.addNumber(5)}>+5</button>
      </div>
    )
  }
  addNumber(n) {
    store.dispatch(addAction(n))
  }
  subNumber(n) {
    store.dispatch(subAction(n))
  }
}

```

### 10.5代码的优雅化

上面的代码如果另外一个组件做一些相似逻辑的操作，那么又要重新写一遍，有没有办法将代码抽离出来具有复用性呢？

**思考：**

- 每个组件派发的action可能不一样，可能是subAction，可能是addAction
- 每个组件用到的state可能不一样，可能是counter，可能是name

**解决：**

- 将不一样的代码抽离出去，将一样的放到一起
- 怎么抽离呢？用函数传参的方式，将不一样的作为参数传入
- 该函数为工具类函数 写在 **utils** 里面

**封装connect函数**

- mapStateToProps, mapDispachToProp两个属性传入组件中

```js
import React, { PureComponent } from "react";

import { StoreContext } from './context';

export function connect(mapStateToProps, mapDispachToProp) {
  return function enhanceHOC(WrappedComponent) {
    class EnhanceComponent extends PureComponent {
      constructor(props, context) {
        super(props, context);

        this.state = {
          storeState: mapStateToProps(context.getState())
        }
      }

      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(this.context.getState())
          })
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return <WrappedComponent {...this.props}
          {...mapStateToProps(this.context.getState())}
          {...mapDispachToProp(this.context.dispatch)} />
      }
    }

    EnhanceComponent.contextType = StoreContext;

    return EnhanceComponent;
  }
}
```

在组件中使用connect

```js
import React from 'react';
import { connect } from '../utils/connect';

import { 
  decAction,
  subAction
} from "../store/actionCreators";

function About(props) {
  return (
    <div>
      <hr />
      <h1>About</h1>
      <h2>当前计数: {props.counter}</h2>
      <button onClick={e => props.decrement()}>-1</button>
      <button onClick={e => props.subNumber(5)}>-5</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
};
const mapDispatchToProps = dispatch => {
  return {
    decrement: function() {
      dispatch(decAction());
    },
    subNumber: function(num) {
      dispatch(subAction(num))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

```

### 10.6第三方库的使用

安装：`yarn add react-redux`

## 十一、HOOKS

### 11.1.useState

作用：创建state

- 在函数式组件中使用
- const [变量, 修改变量方法] = useState(初始值)

```jsx
import React, {useState} from 'react'

export default function UseState() {

  const [count, setCount] = useState(0)
  return (
    <div>
      <h2>你点击了按钮{count}次</h2>
      <button onClick={e => setCount(count + 1)}>按钮</button>
    </div>
  )
}

```

#### setCount的认识

onClick={e => setCount(count + 1)}代表了可以直接修改数据

也可以通过该方法拿到上一次的值

```jsx
setCount((prevCount) => prevCount + 10)
```

原理是和setState一样的，传入参数为函数时可以拿到先前值，进行多次累加也会进行合并,比如：

- 传参不是函数多次累加只会操作一次
- 传参时函数就会累加

```jsx
// 参数不是函数时
function handleClick() {
	setCount(count+10)
	setCount(count+10)
	setCount(count+10)
}
// 参数为函数时，和setState一样，进行多次操作
function handleClick() {
	setCount(prevCount => prevCount + 10)
	setCount(prevCount => prevCount + 10)
	setCount(prevCount => prevCount + 10)
}
<button onClick={handleClick}>+10</button>
```

### 11.2.useEffect的使用

作用：让你完成一些类似于class中生命周期的功能，网络请求，手动更新DOM，事件监听，都是React更新DOM的一些副作用(Side Effects)。

用法举例：

- 第一个参数为回调函数,当组件被渲染出来会执行该函数
- 相当于把updated和mounted合二为一

```jsx
export default function TitleCounter() {

  const [count, setCount] = useState(0)
  useEffect(()=>{
    document.title = count
  })
  return (
    <div>
      <h2>当前计数{count}</h2>
      <button onClick={e => setCount(count+1)}>+1</button>
    </div>
  )
}
```

**应用场景**：

- 类组件在mounted里面订阅事件，在unmounted里面取消订阅
- 更新事件时，会先执行返回函数(取消事件)，在执行mounted
- 点击+1会先取消，在订阅
- 当在useEffect后面加入加入第二个参数，数据变化时就不会频繁执行订阅和取消

```jsx
export default function HookSubscribe() {
  const [count,setCount] = useState(0)
  useEffect(
    // 相当于mounted
    ()=>{
    console.log('订阅')
      
    // 相当于 unmounted
    return () => {
      console.log('取消订阅')
    }
  })
  return (
    <div>
      <h2>当前计数{count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
}
```



**多个Effect的使用与依赖**：

- 会按照顺序执行
- 如果没有[ ]的话只要是重新渲染就会执行更新
- 里面填依赖变量，当变量发生变化的时候才会执行更新
- 下面count发生变化时才会执行clg，否则不会

```jsx
export default function MutilEffect() {

  const [count,setCount] = useState(0);

  useEffect(()=>{
    console.log('修改DOM',count)
  },[count]) 
  useEffect(()=>{
    console.log('订阅事件')
  },[]) 
  useEffect(()=>{
    console.log('网络请求')
  },[]) 
  return (
    <div>
      <h2>当前计数{count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

### 11.3.useContext

作用：获取context传进来的数据

例子：

- 在父级组件共享好数据，在子组件本身可通过useContext获取到值

```jsx
// App.js
export const UserContext = createContext();
export const UserTheme = createContext();

// App.js的jsx
<UserContext.Provider value = {{name:'qmj',age: 18}}>
        <UserTheme.Provider value={{fontSize:'30px',color:'red'}}>
          <ConetxtHook />
        </UserTheme.Provider>
</UserContext.Provider>

// 组件
const user = useContext(UserContext)
const theme = useContext(UserTheme)
console.log(user,theme) // 相应数据
```

### 11.4.useReducer

看到这个第一眼以为是reducer的替代品，但其实不是。

useReducer是useState的替代方案：

- 在某些场景下，state处理的逻辑比较复杂，可以通过useReducer进行拆分；
- 或者这次修改的state需要依赖之前的state时，可以使用；

例子：

- 第一个参数为reducer

- 看第二个参数是否为对象，进行不同的修改方法
- 对象就拷贝，不是就直接修改
- 在多个组件使用同一个reducer，不会共享数据，完全是修改自己组件的数据

```jsx
import React, { useReducer } from 'react'

function reducer(state,action) {
  switch (action.type) {
    case "increment":
      return state +1  // 第二个参数不为对象时
      retrun {...state, count: state.count+1}
  }
}

export default function home() {

  // 第二个参数为一个单个值，state=第二个参数，修改数据时直接操作
  const [state,dispatch] = useReducer(reducer,0);
 // 第二个参数也可以为一个对象，name进行修改时需要拷贝
  const [state,dispatch] = useReducer(reducer,{count:0});
  return (
    <div>
      <h2>当前计数：{state}</h2>
      <button onClick={e => dispatch({type:'increment'})}>+1</button>
      <button onClick={e => dispatch({type:'decrement'})}>-1</button>
    </div>
  )
}
```

### 11.5.useCallback

作用：性能优化，他会返回函数的memoized(记忆值)，在依赖不变的情况下，多次定义的时候值是相同的

当组件重新渲染的时候，组件重新定义，且函数也重新定义，加入依赖的时，依赖变化才会重新定义，依赖不变则不会重新定义。空依赖代表一直不会重新定义

使用场景：

- 把父组件的函数传递给子元素(组件)进行回调时。
- 没有useCallback每次函数重新创建子元素包裹memo都会重新渲染。
- 使用了useCallback，依赖不变时，每次传进去的函数是不变的，所以不会重新渲染

例子1：

- 这种代码并不能阻止函数的创建过程
- 所以并没有做优化

```js
import React, { useState, useCallback } from 'react'

export default function CallBackHook01() {

  const [count,setCount] = useState(0);

  const increment = useCallback(()=>{
    setCount(count+1)
  },[count])
  return (
    <div>
      <h2>当前计数{count}</h2>
      <button onClick={increment}>+1</button>
    </div>
  )
}

```

例子2:

### 11.6 useMemo

- useMemo的目的也是为了进行性能优化
- useMemo返回的也是一个memoized（记忆的）值
- 在依赖不变的情况下，多次定义的时候，返回值是相同的

```js
const memoizedValue = useMemo(() => sum(a, b), [a, b]) // a和b没有改变的情况下都是返回原来的值
```

#### 使用场景

**复杂计算**

- 假设一个组件上有一个状态，也有一个计算求和的函数。
- 只要是每一次状态发生了改变，都会引起该组件重新渲染，不关求和函数每次算的是否都一样都会重新计算一次函数。
- 这显然是不合理的，因为其他状态改变引起一个没必要的计算，显然是浪费性能的

```jsx
// 下面代码中sum函数会因为show的改变而执行多次
import React, { useState } from 'react';

const sum = (a,b) =>{
  return  a + b
};

function App() {
  const [show, setShow] = useState(false);
  const total = sum(1, 2)
  
  return (
    <div className="App">
      <span>{total}</span>
      <button onClick={() => setShow(!show)}>改变状态</button>
    </div>
  );
}

// 下面代码中sum的重新计算和其他状态无关，只和传入的依赖有关
import React, { useState, useMemo } from 'react';

const sum = (a,b) =>{
  return  a + b
};

function App() {
  const [show, setShow] = useState(false);
  let num1 = 1;
  let num2 = 2
  const total = useMemo(() => sum(num1,num2), [num1, num2])
  
  return (
    <div className="App">
      <span>{total}</span>
      <button onClick={() => setShow(!show)}>改变状态</button>
    </div>
  );
}
```

**传入子组件引用类型**

- 有两个组件，分别为父子组件关系
- 父组件有两个变量a，b，b传给了子组价，当父组件的a发生了改变，b不变的情况下
  - 父组件重新渲染，子组件也重新渲染。
  - 子组件没必要渲染但渲染了，造成性能方面的损耗
- 解决办法：
  - 使用memo包裹子组件，同时使用useState定义info信息
  - 使用memo包裹子组件，同时使用

```jsx
// 第一个版本，直接梭哈，每次重复渲染，性能消耗高
import React form 'react';

const ShowInfo = (props) => {
	console.log('子组件渲染');
  return <span>名字：{props.info.name} 年龄：{props.info.age}</span>
}

export default function MemoDemo() {
	console.log('父组件渲染');
  const [show, setShow] = useState(false);
  const info = { name: 'qmj', age: 18 }
  return (
  	<>
    	<ShowInfo info={info} />
    	<button onClick={() => setShow(!show)}>点击展示</button>
    </>
  )
}

// 版本2，使用memo，但是传入的是一个对象，只会千层比较，每次父组件的info都被重新生成了，所以还是重新渲染
import React form 'react';

const ShowInfo = memo((props) => {
	console.log('子组件渲染');
  return <span>名字：{props.info.name} 年龄：{props.info.age}</span>
})

export default function MemoDemo() {
	console.log('父组件渲染');
  const [show, setShow] = useState(false);
  const info = { name: 'qmj', age: 18 }
  return (
  	<>
    	<ShowInfo info={info} />
    	<button onClick={() => setShow(!show)}>点击展示</button>
    </>
  )
}

// 版本3，使用useMemo包裹信息
import React form 'react';

const ShowInfo = memo((props) => {
	console.log('子组件渲染');
  return <span>名字：{props.info.name} 年龄：{props.info.age}</span>
})

export default function MemoDemo() {
	console.log('父组件渲染');
  const [show, setShow] = useState(false);
  // const info = { name: 'qmj', age: 18 }
  const info = useMemo(() => {
    return { name: 'qmj', age: 18 }
  }, [依赖])
  return (
  	<>
    	<ShowInfo info={info} />
    	<button onClick={() => setShow(!show)}>点击展示</button>
    </>
  )
}
```

### 11.7useCallback和useMemo对比

- usecallback是对函数进行缓存，而useMemo是对返回值（对象之类的）进行缓存
- 如果useMemo返回的是一个函数，那么就使用useMemo实现了usecallback的功能，进行了互相转换

### 11.8自定义hook

- 自定义Hook本质上只是一种对函数代码逻辑的抽取，严格意义上来说，这并不属于React的特性

#### 例子

- 实现一个打印组件创建和销毁的hoo
- 实现方式很简单，只需要在每个组件上使用useEffect就行，把公共代码抽离，使用use开头命名
- 不使用use开头命名的函数无法使用React提供的几个hook，会报错

```js
// 自定义打印创建与销毁的hook
function useLoggingLife(name) {
	useEffect(() => {
    console.log('组件被创建');
    
    return () => {
      console.log('组件被销毁')
		}
  }, [])
}
```



## 十二、react-router

