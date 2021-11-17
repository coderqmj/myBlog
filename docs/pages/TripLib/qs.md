### 1.qs.parse

- 把字符串转换成对象
- 应用场景：
  - 解析search的路由

```js
const string = "name=qmj&age=18";

const parseString = qs.parse(string);

console.log(parseString);  // { name: 'qmj', age: 18 }
```

### 2.qs.stringify

- 把对象转换成某种格式的字符串

```js
const obj = { name: 'qmj', age: '18' };

const stringifyObj = qs.stringify(obj);

// name=qmj&age=18
```

