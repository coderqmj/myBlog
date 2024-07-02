## 一、介绍

### 1.云服务器控制台

```
1.云服务器控制台，对我们用户购买出来的服务器提供了非常丰富的功能，如开关机，切换计费模式，续费，退还，升级，变配等等上百种操作
```

## 二、技术

### 2.1.sdk

- 和组件的区别
  - sdk的某个功能去做特定的事情，涉及到后端的交互，需要去调用特定的接口
  - 比如续费功能，云服务器列表需要这个功能，云服务器回收站也需要。在两个项目里面只要唤醒就好，不需要关心背后处理的逻辑

```
1.单独起了一个项目，开发一些公共模块，比如关机操作，需要展示什么内容。有什么操作，然后调用什么接口，都在sdk里面实现好。
2.将sdk用平台提供的能力注册起来app.sdk.register('cvm-sdk', () => sdk);需要传入sdkName和sdk功能列表
3.然后将sdk构建版本，部署；然后更新到使用项目中，这样加载项目的时候，就会执行这个sdk的注册，该sdk的功能就集成到框架的app中
4.使用的时候，从框架app中导入sdk，sdk.Renew(instacne)就可以唤醒sdk，进行操作
```



### 2.2csrf Token

- 存在Cookie或Session中
- **Secure**勾上，只允许https携带这个cookie，这样就不会被破解
- **HTTP Only Cookie** 
- **定期更新和过期**

```js
var getACSRFToken = function(skey) {
  if (!skey) {
    return ''
  }
  var hash = 5381
  for (var i = 0, len = skey.length; i < len; ++i) {
    hash += (hash << 5) + skey.charCodeAt(i)
  }
  return hash & 0x7fffffff
}
```

### 2.3敏感操作验证mfa

```
```

