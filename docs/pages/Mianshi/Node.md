## 一、Node

## 二、Koa

### 1.代理方法相关

- 什么ctx.request.query/path/url = ctx.query/path/url?
- ctx.response同理，中间的请求和相应都可以省略掉，源码做了什么呢？
- 其实在内部做了代理，在你调用**ctx.响应方法**/**ctx.请求方法**，是内部帮你用代理去调用**ctx.request.响应方法**

![]()

