## 一、CR前端代码优化

### if判断优化

#### 1.最简单的if

```js
if (name === 'a') {
  
} else if(name === 'b') {
  
} else if (name === 'c') {

}
...
```

#### 2.switch

```js
let commodity = {
  phone: '手机',
  computer: '电脑',
  television: '电视',
  gameBoy: '游戏机',
}
const price = (name) => {
  switch (name) {
    case commodity.phone:
      console.log(1999)
      break
    case commodity.computer:
      console.log(9999)
      break
    case commodity.television:
      console.log(2999)
      break
    case commodity.gameBoy:
      console.log(3999)
      break
  }
}
price('手机') // 9999
```

#### 3.策略模式

```js
const commodity = new Map([
  ['phone', 1999],
  ['computer', 9999],
  ['television', 2999],
  ['gameBoy', 3999],
])

const price = (name) => {
  return commodity.get(name)
}
price('phone') // 1999
```

### includes的优化

#### 1.传统判断

```js
function verifyIdentity(identityId) {
  if (identityId == 1 || identityId == 2 || identityId == 3 || identityId == 4) {
    return '你的身份合法，请通行！'
  } else {
    return '你的身份不合法'
  }
}
```

#### 2.includes优化

```js
unction verifyIdentity(identityId) {
  if ([1, 2, 3, 4].includes(identityId)) {
    return '你的身份合法，请通行！'
  } else {
    return '你的身份不合法'
  }
}
```

### for循环

> 在 JavaScript 中，我们可以使用 `for()`， `while()`， `for(in)`，`for(of)`几种循环，事实上，这三种循环中 `for(in)` 的效率极差，因为他需要查询散列键，所以应该尽量少用。

#### 优化计算长度

```js
var arr = ['a', 'b', 'c']
for (var i = 0, length = arr.length; i < length; i++) {
  console.log(arr[i]) //结果依次a,b,c
}
```

### DOM创建

- 更优的方法:使用一次 `innerHTML` 赋值代替构建 dom 元素

```js
var html = []
for (var i = 0; i < 1000; i++) {
  html.push('<p>' + i + '</p>')
}
document.body.innerHTML = html.join('')
```

