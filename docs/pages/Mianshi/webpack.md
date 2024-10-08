### 1.webpack的用途

```
0.对webpack的理解：
	

1.最主要是模块化打包。现在的前端根本离不开模块化开发，将不通模块的文件整合起来，保证他们之间的引用正确。这样我们在开发的时候就可以自由的按照视图或者业务功能去划分模块。这样就保证了项目结构是非常清晰的，可阅读性非常强，这样的项目也便于自己维护和向他人交接。

2.编译兼容。早前我们的代码需要手动去兼容各种各样的浏览器，这样大大影响开发效率，有了webpack之后我们就可以通过polyfill去对不支持高级语法的浏览器打补丁，Browserslist设置命中的浏览器，使用PostCSS loader 和 postcss-preset-env插件去对不同的浏览器做适配，让该css被大多数浏览器识别。

3.能力扩展。通过webpack的Plugin，我们可以进一步实现按需加载，压缩代码，Tree Shaking，懒加载等一系列的优化和一些其他的功能。比如分析每一个打包出来文件的大小，这样就可以对其进行分析去优化某一个模块。
```

### 2.10个js用到1个，怎么优化打包

### 3.postcss的作用

```
1.进行查询浏览器兼容，最近两个版本，not dead
2.查询到后为css添加前缀，样式重置等操作
```

#### 4.loader和plugins的区别？哪些常用的？是否自定义？

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
2.把开发模式需要的配置放入单独一个文件，一般以webpack.dev.js命名
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

### 18.Tree Shaking如何做到的

```
概念：用于消除一些无用的代码（dead_code和一些定义但是未使用的代码），其中包括JS的Tree Shaking和css的Tree Shaking。

目前有两种方案实现：
	1.webpack中optimization中的usedExports设置为true，没用的函数标记为unused,然后Terser插件dead_code设置为true
	2.package.json里面的sideEffects设置为false

最佳实现：
	1.最佳实践就是结合webpack中optimization中的usedExports，optimization中的minimizer中的terserOptions的dead_code，再结合package.json的副作用选项sideEffects，去尽可能消除dead_code。

具体步骤：
	1.webpack优化选项里面开启usedExports为true，这个时候去打包代码就会发现dead_code会被注释打上标记（unused code）。
	2.然后再优化选项里面开启minimizer，再里面使用terser-webpack-plugin插件，压缩代码dead_code: true，这个时候发现被打上标记的代码被消除了。但是如果有一些导入但未使用的代码，是无法被消除的，比如"import './format.js'"还有一些样式的导入"import './index.css'"。
	3.这个时候就需要借助package.json里面的消除副作用字段了：
		1.sideEffects: false，代表所有无效导入都是没有副作用的，可以安心删除，反正都不能删除
		2.如果是一个数组的话，把文件路径给进去代表这里面的文件是有副作用的，但注意，需要把css的导入都加上去，否则会被消除
		3.但是我们最优解都是sideEffects: false，然后在loader中去配置css都为sideEffects: true 。
		
optimization: {
  // usedExports: 目的是标注出来哪些函数是没有被使用 unused
  usedExports: true, // production 
   minimizer: [
      // 由Terser将未使用的函数, 从我们的代码中删除
      new TerserPlugin({
        terserOptions: {
          compress: {
            arguments: false,
            dead_code: true
          },
        }
      })
    ]
}
```

### 19.模块打包运行原理

```
一、支持Commonjs原理
	1.webpack是模块化打包工具，可以支持各种模块化，如果不做处理，commonjs是不支持在浏览器中运行的，但是webpack打包后就支持了
	2.我们可以通过设置devtool: "source-map"阅读一下打包后的文件，看看它到底做了什么处理
	3.比如说通过require导入了一个sum方法，并且使用。
	4.首先我们看打包后的源码，它导入sunm方法用的不是require函数，用的是webpack_require()函数
	5.那这个webpack_require函数是怎么实现的呢？
	6.他是webpack内部实现的，需要传入一个moduleId，模块Id，也就是导入文件的路径
	7.然后它会去查找有没有这个模块的缓存的，有的话就返回，第一次肯定是没有的，所以第一次要去读取加载这个方法
	8.webpack中是有一个webpack_modules对象的，里面的key是文件路径，value是整个文件的内容，这样就可以通过MoudleId导出并使用了
```

### 20.什么是source-map

```
1.背景：
	开发阶段浏览器上跑的代码，是经过各种转换和压缩的，和我们自己编写的代码差异还是较大的，行号列号最终基本对应不上。这样我们代码报错的时候很难去定位问题。我们需要知道编译、打包、压缩后的代码映射回去，于是source-map就诞生了。

2.作用：
	source-map帮我们快速定位到源代码的位置，提高我们的开发效率。打包生成的js文件都有对应的一个map文件，该js文件最后一行有一个注释//# sourceMappingURL=761.50f6fa.chunk.js.map 指向该map文件。到时候的报错信息会非常准确，会定位到某一个文件的行号和列号。
	
3.如何使用：直接在webpack配置的 devtool: "source-map",

4.最佳实践：
	开发阶段：
		推荐使用推荐使用 source-map(vue) 或者 cheap-module-source-map(React)， cheap-module-source-map会准确一点，因为ES6语法会经过loader处理，经过处理后再用普通的source-map会造成保存信息不准确。使用cheap-module-source-map就报保证打包文件行号准确。
	测试阶段：
		推荐使用 source-map 或者 cheap-module-source-map测试的时候也希望看见具体的报错信息。
	发布阶段：使用false，或者缺省值（不写）
		用户层面不希望看见这个，而且源码被看见是很危险的。
		
devtool的值（一共24个）：
	false：直接生成build
	none：production 模式下的默认值，也是不生成source-map，区别就是none在development会报错
	eval：development 模式下的默认值，不生成source-map，还原一个大概值，速度会快一点，但是不准确
	source-map：生成独立的source-map
	cheap-source-map：更加高效，没有列的信息，一般我们只要知道行号就行了
	Cheap-moudle-source-map：保持低开销的同时更加准确
```

### 21.webpack启动流程

```
1.执行webpack相关命令后，就相当于执行node_modules里面bin/webpack
2.会生成一个cli对象会，然后判断当前是否安装cli，然后执行runCli方法，该方法是require(wepackclipath)的，会执行该路径的代码
3.cli里面主要的操作就是合并配置文件，package.json的webpack配置和webpack.config.js的配置做一个合并：
	1.先去执行makeCommand函数，在里面执行一个叫makeOptions的函数去合并webpack配置
	2.执行完makeOptions之后又去执行buildCommand函数：
		1.里面去执行了createCompiler，调用了this.webpack(config.options)生成一个compiler
		2.这个compiler是将webpack.config.js和package.json的webpack配置合并好的
		3.然后调用compiler.run()即可启动webpack
		
注意：
	vue和react是没有依赖webpack-cli的，因为webpack-cli要做的事情就是合并webpack.config.js和package.json的配置，我们也可以通过自己去合并生成这个config，然后调用 
	const config = require("./config/webpack.config")({
  	production: true
	});
	const compiler = webpack(config);
	compiler.run()就可以了
```

### 22.Loader的执行顺序

```
1.一个loader其实会导出两种东西，一个是normalLoader===module.exports = {}, 另外一个是pitchLoader === module.exports.pitch = {}。
2.单纯的说loader从右向左执行并不是十分准确的，因为这个pitching Loader是从左往右执行的，并且是等一个use里面的所有pitching Loader都执行完了才会去执行normalLoader
https://webpack.docschina.org/api/loaders/#pitching-loader

为什么是normalLoader是从左往右的：
	1.执行normalLoader之前会把所有的pitchLoader去执行一遍，每执行一次就loaderContext.loaderIndex++，知道index=lenth
	2.执行完pitchLoader才会去执行normalLoader，这个时候loaderContext.loaderIndex是数组的最后一位，然后每执行一次做--，这样的话就是从右边网左边了
```

### 23.loader和plugin区别

```
```

### 24.自定义plugin

```
DomainReplacePlugin
```

### 25.webpack是如何根据环境变量来进行不同环境的构建，了解原理吗

```
-------------云霄项目----------
1.我们这个项目里面是无需webpack配置的，当然如果想要自定义也是可以的，写入yunxiao.config.js即可
2.我们是根据执行不同的命令去生成不同的webpack配置去构建的
3.比如开发时，执行yunxiao-script dev即可，这个yunxiao-script dev是我们在bin下面注册好的命令
	1.注册命令：program.command('dev', '本地开发')
	2.yunxiao-scripts-dev文件夹命名
3.然后就会执行yunxiao-scripts-dev里面的脚本，获取当前项目的入口进行构建
4.build同理
5.cwd可以获取到当前app目录 const appDir = process.cwd();

--------其他方式-------
1.webpack serve --config ./config/webpack.common.js --env development
2.webpack --config ./config/webpack.common.js --env production 
```

### 26.preload和prefetch的区别

```
prefetch:
	1.当浏览器下载完关键资源有空闲时间回去进行下载需要prefetch的文件（具体的加载时间为父chunk加载完之后）
	2.将资源设置为低优先级请求了
	2.不会影响到关键资源的下载，体验更优
	3.官方定义为预获取，用于将来可能会获取到的资源
	4:场景：比如操作弹窗，需要点击触发的时候才会展示，那就可以prefetch这个组件
	
preload：
	1.跟随着父脚本一起同时下载的，比如在index.js中preload一个文件，那就是跟随着index.js同时下载
	2.属于是将资源设置为高优先级了
	2.场景：用于提前加载一些需要的依赖
	3.官方定义为预加载
	
具体区别：
	1.prefetch是在父资源加载完成之后再加载的
	2.preload是跟随父资源并行加载的
	
	1.preload是加载当前页面一定需要的资源，比如图片吧
	2.prefetch是预先获取当前页面不一定需要的资源，比如弹窗组件JS
	
相同：
	1.两种方式都不会阻塞关键资源加载
	
	
总结：preload用不好会导致性能变差，就是你把不一定适用到的资源设置为preload，那么会给页面带来负担了
	

```



## Vite

### 1.vite和webpack的区别

```
1.vite官方的定义是下一代构建工具，是来解决之前webpack这些存在的问题的
2.之前webpack启动服务的时候，耗时久，几十秒，HMR也需要好几秒
3.vite构建启动的时候区分了依赖和源码，依赖一般是稳定的版本库，不怎么会变动，Vite会使用esbuild做预构建，
4.vite = esbuld + rollup
5.像vite就不需要对图片、ts/css/less使用loader了，无需写配置直接就支持了，而webpack它默认是处理不了css文件的。
6.vite可以进行预打包，第一次构建的时候，对于我们的依赖是会进行预打包的，把构建好的依赖存到.vite目录下，下次打包的时候就可以复用
7.直接支持React的JSX代码，因为esbuild直接支持
```

### 2.vite默认可以处理css，less，ts这些原理

```
1.搭建了一个服务器，你用到了哪些文件，vite服务器会帮你请求过来，比如index.less和index.ts
2.但是浏览器是无法识别这些文件的， 所以服务器会把这些文件拦截下来做编译转化成浏览器可以使用的文件的
3.比如css文件，就把文件内容写到变量里面，然后注入到html中
```

### 3.如何对vue做处理

```
const vue = require('@vitejs/plugin-vue');
module.exports = {
  plugin: [
    vue()
  ]
}
```

### 4.vite为什么快

```
1.vite可以进行预打包，第一次构建的时候，对于我们的依赖是会进行预打包的，把构建好的依赖存到.vite目录下，下次打包的时候就可以复用
2.修改的时候不会整个文件重新构建，vite服务器只会重新拉取当前修改的文件
3.使用了ESbuild，构建速度非常快，甚至不需要缓存
```

### 5.Esbuild是啥？为啥快

```
1.相当于babel一样的功能
2.构建速度飞快，并且无需缓存
3.支持ES6和Commonjs的模块化
4.支持ES6的tree shaking
5.支持go，JS的API
6.支持TS，JSX的编译
7.支持Source-map
8.支持代码压缩，支持扩展其他插件

为啥快？
1.使用go编写，可直接转换成机器码，无需经过字节码，不像JS要经过很多转换
2.可以充分利用CPU的多内核，尽可能让他们饱和运行，会开启很多个进程
3.ESBuild所有内容都是从0编写的，而不是使用第三方的东西，所以一开始就会考虑性能问题
```



### 
