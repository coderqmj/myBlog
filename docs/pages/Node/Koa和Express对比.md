### 1.对比区别

#### 架构层面：

- express是完整的，强大的，内部实现了非常多好用的功能
- koa是简洁的，轻便的，只包含最核心的功能
  - 像get，post方法都没有提供
  - 需要通过自己活着路由才能判断请求路径活着其他功能
- 因为这两个框架最核心的东西就是中间件：
  - 但他们的中间件执行机制是不同的，特别是针对某个中间件包含的异步操作时

#### 对比koa和express执行中间件：

**案例一：**加入三个中间件在一次请求中匹配到，并按照顺序执行

最终的方案是：

在middleware1中，在req.message中添加一个字符串aaa；

在middleware2中，在req.message中添加一个字符串bbb；

在middleware3中，在req.message中添加一个字符串ccc；

当所有内容添加结束后，在middleware1中，通过res返回最终的结果



**express实现**

- 返回时在middleware1next后面返回
- 为什么放在next()后面就可以呢？这个它的执行执行，调用栈有关

```js
const express = require('express');

const app = express();

const middleware1 = (req,res, next) => {
  req.message = "aaa";
  next()
  // await middleware3() 异步的时候
  res.end(req.message)
}

const middleware2 = (req,res, next) => {
  req.message += "bbb";
  next()
}

const middleware3 = (req,res, next) => {
  req.message += "ccc";
}

app.use(middleware1, middleware2, middleware3);

app.listen(8000, ()=> {
  console.log('app启动在8000端口~')
})
```

上面是同步实现，但是异步的情况下就不会被拼接了，所以需要再第一个next后面调用，才会完全返回结果

#### koa实现

- 同步情况下，koa是和express一样的
- 但异步情况下

### 其他：

```
koa一次性不能注册多个中间件，只能一个
express可以连续注册中间件
```

