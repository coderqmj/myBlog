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

