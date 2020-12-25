## 一、什么是Promise?干嘛的？

: : : tips

Promise是异步编程的一种解决方案：promise是一个对象，可获取异步操作的消息。三种状态：pending,fulfiled,rejected;状态一旦改变，就不会再改变。new Promise会立即执行。其解决了回调地狱，多个请求并发的问题。

: : :



## 二、Promise的用法

Promise是一个构造函数，自己身上有all，reject，resolve这几个眼熟的方法，原型上有catch等方法。

```
let p = new Promise((resolve, reject) => {
    //做一些异步操作
    setTimeout(() => {
        console.log('执行完成');
        resolve('我是成功！！');
    }, 2000);
});
```

Promise的构造函数接收一个参数：函数，并且这个函数需要传入两个参数：

- resolve ：异步操作执行成功后的回调函数
- reject：异步操作执行失败后的回调函数

### then 链式操作的用法 

所以，从表面上看，Promise只是能够简化层层回调的写法，而实质上，Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多。所以使用Promise的正确场景是这样的：

```
p.then((data) => {
    console.log(data);
})
.then((data) => {
    console.log(data);
})
.then((data) => {
    console.log(data);
});
```

### reject的用法：

把Promise的状态设置为rejected，这样我们在then中就能捕捉到，然后执行失败的回调。

```
    let p = new Promise((resolve, reject) => {
        //做一些异步操作
      setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            if(num<=5){
                resolve(num);
            }
            else{
                reject('数字太大了');
            }
      }, 2000);
    });
    p.then((data) => {
            console.log('resolved',data);
        },(err) => {
            console.log('rejected',err);
       

```

