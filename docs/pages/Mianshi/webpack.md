### 1.webpack的优化/用途

### 2.10个js用到1个，怎么优化打包

### 3.postcss的作用

```
1.进行查询浏览器兼容，最近两个版本，not dead
2.查询到后为css添加前缀，样式重置等操作
```

#### 4.loader和plugins的区别

```
我理解的loader和plugins是：
	0.官方的描述：
		1.loaders是用于转换一些特定的模块类型的，例如css，less，png这些资源。
		2.plugin是用于执行更加广泛的任务，打包优化，资源管理，环境变量注入等
	1.loader中可以使用插件，且plugins是一个数组，一个loader可以使用多个plugin
	2.loader放在module中，plugin放在plugins中
	例子：
		1.加载css文件需要loader，但是把多个CSS文件合并成1和就需要plugin
		2.每次打包后希望删除之前目录的文件，重新生成新的文件夹，就需要clean-webpack-plugin插件
```

### 5.webpack5新特性

```
1.加载其他资源无需安装file-loader，url-loader，直接使用asset module type模块，使其可以加载图片资源，配置存放路径等。
```

### 6.babel

```
1.babel是什么？
	babel是一个工具链，主要用于旧浏览器或者缓解中将ES2015+代码转换为向后兼容版本的JS
	包括语法转换、源代码转换、Polyfill实现目标缓解缺少的功能等
2.babel有哪些插件？
	1.@babel/core必装，就像postcss一样功能少，但是是必须项
	2.@babel/cli 可以在命令行中使用
	3.@babel/plugin-transform-arrow-functions 转换箭头函数
	4.@babel/plugin-transform-block-scoping 转换let const
	5.@babel/preset-env 预设，可以一次性转换需要转换的，无需一个个书写
3.babel的原理（如何将一段（ES6，TS，React）转成领哟段代码（ES5）的呢？）
	1.可以把babel看成一个编译器，就跟V8引擎一样，源代码->原AST->新AST->浏览器识别的字节码
	2.总体来说就是把自己的源代码转换成浏览器可以直接识别的另一段代码
	3.例子，就像把lisp语言转换成C语言一样，再去编译，链接，执行
```

### 7.babel的编译器工作流程

```
1.解析阶段
2.转换阶段
3.生成阶段
```

### 8.注意的点

```
1.使用polyfill时，要把node_module排除一下，不然包里面可能已经实现过一遍，再去用polyfill会出现安全隐患。
```

### 9.什么是polyfill？怎么用？

```
1.帮助我们更好的去使用JS新特性，像promise，generator，这些特性有些浏览器是不认识的，运行代码时就会报错，这时候我们用polyfill来填充补丁，浏览器就可以识别了。
2.本质其实就是帮我们去实现一遍。
3.缺点就是打包过后的代码帮我们增加了许多代码，体积变大

用法：
	1.安装， npm i  @babel/polyfill
		但现在推荐安装core-js和regenerator-runtime，因为polyfill已经过时了
	2.在babel.config.js中配置
module.exports = {
  presets: [
    ["@babel/preset-env", {
      // false: 不用任何的polyfill相关的代码
      // usage: 代码中需要哪些polyfill, 就引用相关的api
      // entry: 手动在入口文件中导入 core-js/regenerator-runtime, 根据目标浏览器引入所有对应的polyfill
      useBuiltIns: "entry",
      corejs: 3
    }],
    ["@babel/preset-react"]
  ],
  // plugins: [
  //   ["@babel/plugin-transform-runtime", {
  //     corejs: 3
  //   }]
  // ]
}
	3.然后再文件中引入
	import "core-js/stable";
	import "regenerator-runtime/runtime";
```

### 10.babel-loader的优缺点

```
优点：
	1.最大的优点就是有polyfill了
缺点：
	1.不会对ts做类型检测，传入错误的类型也以打包成功，导致上线的代码有安全隐患。
```

### 11.模块热更新

```
热更新的方法有3：
  1.dev-server，直接添加watch命令
  2.webpack-dev-server插件
  3.HMR（重点）
1.直接添加watch命令并执行：
	1.1.监听文件的变化然后重新编译。
	1.2.且重新编译后都会生成新的文件，要进行I/O操作。
	1.3.刷新整个页面，状态不会被保存
	1.4.属于效率、性能都非常低下的解决方案
2.使用webpack-dev-server插件：
	2.1.相比于第一种方法，这种不涉及到文件I/O操作，性能略好
	2.2.所有代码还是会重新编译，性能差
	2.3.编译后的文件不会存在本地，而是放到内存里面，从内存直接加载性能有点提升
	2.4.该缓存技术之前用的是memory-fs，现在用的是memfs这个库
3.HMR（Hot module replacement）
	3.1.程序在运行的过程中，无需替换、添加、删除模块，所以无需刷新整个页面
	3.2.状态不会丢失
	3.3.修改JS、css源代码，会立即在浏览器更新，相当于直接在浏览器的devtools中直接修		改样式
```

### 12.性能优化的点

```
1.devServer中设置compress为true，可以压缩打包后的文件，传输成本小。
2.代码分离，提升首页渲染速度
```

### 13.小知识点

```
1.entry的值并不是相对于改文件的相对路径，而是context配置路径（官方要求绝对路径）
```

### 14.webpack如何做配置分离

```
1.我的策略是先把配置类型分为3种：
	1.公共配置
	2.开发/运行模式配置
	3.生成模式配置
2.把运行模式需要的配置放入单独一个文件，一般以webpack.dev.js命名
3.把生产模式下需要的配置放入单独的文件，一般以webpack.prod.js命名
4.公共文件需要做的事情
	1.把公共配置写好，使用。
	2.module.exports = function(env) { } 写成功函数，便于使用mode的值
	3.根据env.production去判断是否为生产环境
	4.导入merge模块去合并，使commonConfig与生产配置或者运行配置合并
	5.返回这个配置并运用
5.有些时候还需要配置一些babel.config.js相关的插件：
	1.比如HMR模块热更新需要的插件，是运行环境才需要"react-refresh/babel"
	2.根据process.env.NODE_ENV去判断当前的模式
6.然后在package.json里面去指定哪个webpack文件去打包/运行项目 
	1.通过--config
```

### 15.babel和Polyfill的区别和关系

### 16.webpack和vite的区别

```
1.vite
	1.官方定义是下一代前端构建工具。
	2.基于原生ES模块提供了丰富的内建功能，HMR的速度非常快
	3.预配置了rollup，可以输出生产环境的优化过的静态资源
	4.vite还是不够稳定，社区不够完善
	5.基本上无配置（postcss相关还是得配下插件），支持vue就需要配置
	6.有些基础的东西是预配置了，比如文件后缀名，查找模块，ts，css就不用css-loader
	7.会对依赖做一些预打包的操作放在module中的.vite文件夹中，比如预打包vue，lodash，下一次跑的时候就可以节省这个时间了
```

### 17.vite的原理

```
```

