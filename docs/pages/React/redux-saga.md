### 一、generator语法

- saga中间件使用了ES6中的generator语法
- 现按照如下步骤学习生成器的使用过程：
  - 在JavaScript中编写一个普通的函数，进行调用会立即拿到这个函数返回的结果
  - 如果我们将这个函数编写成一个生成器函数
  - 调用iterator的next函数，会销毁一次迭代，并且返回一个yield的结果
  - 研究一下foo生成器函数代码的执行顺序
  - generator和promise一起使用

#### 1.1.generator的使用

- 生成器函数可以返回东西，但不是通过return返回，而是yield
- 通过next一直调用，会消耗yield，返回value和done，消耗完迭代器，done会为true，注意最后一次也是false

```js
// 把这个函数叫生成器
function* foo() {
	yield "hello";
  yield "coderqmj";
  yield "word"
}
// 拿到的result是一个 iterator迭代器
const result = foo()

// 使用迭代器
const res1 = result.next();
```

**1.2.生成器里面执行顺序**

- 默认情况下一行都不会执行
- 只有在next的时候执行到yield为止，yield后面的就不执行

```js
function* foo() {
  console.log(1111)
	yield "hello";
  yield "coderqmj"; 
  console.log(1111)
  yield "word"
  console.log(1111)
}
const result = foo()
```

**1.3.generator和promise一起使用**

- 想要拿到结果，需要传参数
- 赋值语句在yield后面，所以需要再次next

```js
function* bar() {
    const result = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("nihao")
        }, 3000);
    })
    console.log(result)
}
const it = bar(); // 拿到的是一个迭代器

// 这里也是saga内部帮我们做的操作，原理
it.next().value.then(res => {
    it.next(res); // 为什么还要再next一遍？因为会执行yield没错，但是const result算后面的语句，不会被执行，result无法完成赋											值，注意next需要传入参数才能赋值
})
```

### 二、redux-saga

- 可以对很多代码进行分离，让代码结构更加清晰

#### 2.1.saga使用步骤

1. 安装，并创建中间件，并且应用到中间件函数中，记得run起来，才能在dispatch actions时将type拦截下来到rducer中处理state。

   ```js
   // 1.导入中间件
   import createSagaMiddleware from 'redux-saga';
   
   // 2.创建sagaMiddleware中间件
   const sagaMiddleware = createSagaMiddleware();
   
   // 3.添加中间件
   const store = applyMiddleware(thunkMiddleware, sagaMiddleware);
   
   // 3.拦截type至reducer中处理
   sagaMiddleware.run();
   ```

2. 创建saga.js文件，要导出一个生成器函数，传到sagaMiddleware.run(saga)中使用。

   ```js
   import { takeEvery } from "redux/saga/effects";
   
   function* fetchHomedata(action) {
       const result = yield axios.get('请求接口'); // 返回的和上面it.next().value.then一样，内部帮我们做了操作，所以无需再then
       // 拿到数据以后就可以放到state里面了，还是需要yield去做，不需要像thunk一样dispatch，内部封装过了，用put
       yield put(changeBannersAction(result.banners))  // 到这里才会把我们redux中的数据进行改变
   
       // 还可以再对某些state数据进行修改
       yield put(changeBannersAction(result.recommend)) // 内部会帮我们判断done是否为true，否则会一直循环执行
   
       // 当然还有另外一种写法，使用all
       yield all([
           yield put(changeBannersAction(result.banners)),
           yield put(changeBannersAction(result.recommend))
       ])
   }
   
   function* mySaga() {
       // takeEvery监听每一个的type
       yield takeEvery('FETCH_HOME_DATA', fetchHomedata) 
   }
   
   export default mySaga;
   ```

   

3. 创建actionCreators.js，在里面定义好action

4. 在业务中映射dispatch定义好的action

5. 然后在2中的saga文件中的takeEvery传入对应的type就会进行拦截，同时要进行操作需要在takeEvery第一个参数里面传入一个生成器函数

#### 2.2 takeLatest

- 这个api一次只能监听一次action，只会执行最后一次
- takeEvery么一个都会被执行
- 所以这个api也可以解决搜索框问题？



### 三、总结

- saga缺点很明显，写起来很麻烦，挺多api的用法，all，takeEvery，put等等
- 优点也很明显，代码可以进行分离，请求数据代码写到单独的saga.js文件里面，和actionCreators的耦合度降低

​	