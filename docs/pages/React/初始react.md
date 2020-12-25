## 一.react组件的创建方式

### 1.使用箭头函数，但是首字母要**大写** 

~~~ javascript
const App = (props) => {
  return (
    <div>
      <h2>welcome</h2>
      <p>优秀的{props.title}</p>
    </div>
  )
}
ReactDom.render(
  <App title="react"/>,
  document.querySelector('#root')
)
// ReactDom.render 第一个参数为DOM， 第二个为container， 第三个为calback
// props前不用 this
// 数字类型传递需要 {}
~~~

### 2.通过类继承的方式创建模板

~~~ jsx
import React from 'react'
import {render} from "react-dom"

//第二种继承类的方式创建模板
class App extends React.Component{
  render(){
    return <h1>类组件!!!{this.props.title}</h1>
  }
}
render(
  <App title="类模板"/>,
  document.querySelector("#root")
)
// 类模板 的 props前需要this
<TodoHeader desc="今日事，今日毕">
	待办事项列表
</TodoHeader>
// props.children 是标签的 文字 待办事项列表
~~~

- *render* 是react dom 提供的一个方法一般只会用一次

- 由于 *component* 是React里面的，所以 import时可以直接import出来

  - ~~~javascript
    import React,{Component} from 'react'
    class App extends Component{}
    ~~~

### 3.模板进行嵌套使用

~~~javascript
import React,{Component} from 'react'
import {render} from "react-dom"

const Header = ()=> <h1>调用的Header</h1>
//第二种继承类的方式创建模板
class App extends Component{
  render(){
    return(
      <div>
        <Header/>
        <p>{this.props.title}</p>
      </div> 
    )
  }
}
render(
  <App title="类组件是继承React的"/>,
  document.querySelector("#root")
)
// l类模板必须要用一个container包起来
~~~

### 4.jsx原理

不合法的JavaScript创建DOM

~~~javascript
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>jsx原理</h1>
        <h1>邱模建在学React</h1>
      </div>
    )
  }
}
~~~

### 5.高阶组件的创建

**步骤：**

- 1.创建highLevel.js

  - ~~~javascript
    import React, { Component } from 'react'
    
    const withCopyRight = (YourComponent, YourComponent1) => {
      return class WithCopyRight extends Component {
        render() {
          return (
            <>
              <YourComponent />
              <h1>&copy; 学习React</h1>
              <YourComponent1 />
            </>
          )
        }
      }
    }
    export default withCopyRight
    ~~~

- 在App.js内引入，并且导出(带走App.js的内部组件)

  - ~~~javascript
    import React, { Component } from 'react'
    import withCopyRight from './withCopyRight'
    
    class App extends Component {
      render() {
        return (
          <div>
            App
          </div>
        )
      }
    }
    class App1 extends Component {
      render() {
        return (
          <>
           <button>按钮</button>
          </>
        )
      }
    }
    export default withCopyRight(App, App1)
    
    ~~~
~~~
    
  

高阶组件的配置（使用装饰器）：

- 1.安装` react-app-rewired` 和  `yarn add customize-cra react-app-rewired --dev `和 `@babel/plugin-proposal-decorators `

- 2.在根目录下建 config.overrides.js

  - ~~~javas
    const {override, addDecoratorsLegacy} = require('custonize-cra')
    module.exports = override(
      addDecoratorsLegacy()
    )
~~~

  - 

- 3.在package.json配置

  - ~~~javascript
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    ~~~

  - 

## 二.样式的设置

### 1.内联设置样式

- ~~~jsx
  <h1 style={{color:'red'}}>调用的Header</h1>
  ~~~

- ~~~jsx
  class App extends Component{
    render(){
      const style = {color:'red'}
      return(
        <div>
          <h1 style={style}>调用的Header</h1>
          <p>{this.props.title}</p>
        </div> 
      )
    }
  }
  ~~~

### 2.通过class

- react中的class要写成**className** 

- ~~~html
  <p className="text-color">{this.props.title}</p>
  // 在index.css 定义好，在 js里面引入 import './index.css'
  ~~~

### 3.classnames设置class

1.先安装 npm i classnames --save

2.classNames()是个js方法，所以应该{}

~~~jsx
<p className={classNames('a',{'b':true,'c':false})}>测试classnames的用法</p>
// class has a, b, don't has c
~~~

- p标签解析后的class=“a b”

### 4.安装 styled-components 插件

1. 安装  `npm i styled-components --save`

2. 引入  `import styled from 'styled-components'`

3. 创建 

   ~~~jsx
   const Title = styled.h1 `
     color: blue
   `
   ~~~

4. 使用 `<Title>jsx原理</Title>`

**结果**：会生成字体颜色为红色的h1标签

## 三.文件目录的分配

### 1.组件的分布

​	1.小组件放在components目录下

​	2.components下建一个`index.js`用于导入所有组件并且导出

​	2.`index.js`导入到App.js中，并使用

​	3.App.js在index.js 的 render() 函数中渲染



