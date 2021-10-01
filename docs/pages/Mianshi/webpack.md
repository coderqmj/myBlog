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
1.devServer中设置compress为true，可以压缩打包后的文件，传输成本小
```

