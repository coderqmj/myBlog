

### 1.验证Token

```
用到的东西：jwt，非对称性加密公钥私钥，使用openssl得到公钥私钥
1.首先在post方法里面添加验证登录和login中间件去让用户登录，验证后颁发token。
2.jtw.sign方法有三个参数，第一个对象（传了用户名和id），第二个私钥，第三个对象，配置了过期时间和加密算法，生成了token
3.然后再写一个验证权限的middleware，每次操作前执行。
	1.每次请求时都会带上token，将其取出来。
	2.使用jwt.verify方法，三个参数，(取出的token, 公钥, 相同的加密算法)，得到解密后的token
	
   const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    });

```

### 2.怎么保证不可以同时登陆

### 3.怎么在Node中和MySQL结合起来的

```
1.使用的是koa框架，项目里安装了mysql2，并创建连接池，目的是多次数据库交互时不用每一次创建连接
2.创建的时候里面配置，host，user，密码，database，端口
3.交互方面：
	在src下面创建了用于数据交互的目录，评论交互，登录注册交互等文件。
	使用了预处理的语句提高性能（解析，优化，转换=>执行）与安全execute(传入参数)
	在里面执行数据库查询，删除，新增修改语句
4.然后再业务代码中调用导出的交互函数，比如登录，注册
```

## 二、Express

### 1.Express有哪些中间件

```
1.express.json()解析json
2.express.static('./build')存放静态资源的中间件
3.upload.any()上传文件中间件
```





