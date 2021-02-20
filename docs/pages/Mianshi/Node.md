

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

