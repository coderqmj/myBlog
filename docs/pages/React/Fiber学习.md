### 一、fiber出现原因

> React进行组件渲染，setState后到渲染页面这个过程是一气呵成的，如果组件庞大的话，js执行会占据主线程时间长，导致页面卡顿，动画，手势效果差。

### 二、卡顿原因

```
Stack reconciler就很像函数递归调用过程，父组件调用子组件。那么在setState之后，react会立即reconciliation过程，遍历所有的虚拟DOM，reconciler才能得出需要修改真实DOM的信息，并传递给renderer，进行渲染。对于庞大的虚拟DOM树来说，reconciliation过程会很长(>100ms)，在这期间，主线程被JS占用，所有交互，布局，渲染，都会停止。给用户的感觉就是卡顿了。
```



### 三、Scheduler(调度)

```
调度就是reconciliation的一个过程，决定了什么时候做什么，stack reconciler是一气呵成的，对于函数没问题，只要函数结果，但对于UI来说：
	1.并不是所有state更新都需要立即显示出来，如屏幕之外的更新。
	2.更新优先级不一样，比如用户输入响应优先级要高于请求填充内容的响应要高。
	3.对于优先级高的任务，可以打断优先级低的任务，比如用户输入，而评论还在reconciliation，应优先输入。
所以理想情况就是：
	每次只做一个小任务，做完之后看看主线程有无高优先级的任务，有执行高优先级，无则继续执行。
```

 scheduler会根据当前主线程的使用情况去处理这次update。为了实现这种特性，使用了`requestIdelCallback`API。对于不支持这个API的浏览器，react会加上pollyfill 

### 四、任务拆分 fiber-tree & fiber

 stack-reconciler下的react是怎么工作的 :

```
代码中创建（或更新）一些元素，react会根据这些元素创建（或更新）Virtual DOM，然后react根据更新前后virtual DOM的区别，去修改真正的DOM。注意，在stack reconciler下，DOM的更新是同步的，也就是说，在virtual DOM的比对过程中，发现一个instance有更新，会立即执行DOM操作。

```

 fiber-conciler :

```
操作是可以分成很多小部分，并且可以被中断的，所以同步操作DOM可能会导致fiber-tree与实际DOM的不同步。对于每个节点来说，其不光存储了对应元素的基本信息，还要保存一些用于任务调度的信息。因此，fiber仅仅是一个对象，表示reconciliation阶段所能拆分的最小工作单元，和上图中的react instance一一对应。通过stateNode属性管理Instance自身的特性。通过child和sibling表征当前工作单元的下一个工作单元，return表示处理完成后返回结果所要合并的目标，通常指向父节点。整个结构是一个链表树。每个工作单元（fiber）执行完成后，都会查看是否还继续拥有主线程时间片，如果有继续下一个，如果没有则先处理其他高优先级事务，等主线程空闲下来继续执行。
```





### 随记

- 参考资料：[Build your own React](https://pomb.us/build-your-own-react/)
- 大纲21:40 [bilibili](https://www.bilibili.com/video/BV14N411r7jQ/)
- 试调35:00

```
1.并发和并行
	并发：线程任务交替执行，充分利用多核CPU达到高效的执行效率
	并行：同一时间执行多个线程 
	例子：泡茶
		1.先烧水=>准备茶叶=>洗杯子
		2.3者之间没有顺序关系，可以同时并行
		3.但是如果是一个人，就要操作完烧水，然后洗杯子，准备茶叶。这个叫并发
		4.如果是多个人，就可以同时并行做这三件事情
2.fiber就是一个并发模式，fiber就是一个任务片段
3.进程线程
	1.进程：计算机分配资源最小单位（一个程序，对应一个端口）
	2.线程：一个进程包含多个线程，计算机执行任务最小单元
4.浏览器：
	1.页面有多个进程，每个进程也有多个线程。但是分配给JS只有单线程
	2.JS单线程缺点：
		1.如果DOM元素非常多，页面非常复杂，但是JS是单线程的，解析DOM遇到JS会暂停解析，因为JS可能会修改当前已经生成的DOM结构 
		2.这个就会造成React15版本（递归写的，没完没了，很难中断，要用户等待执行完毕才能渲染）卡顿，React团队在React16对其用fiber进行重构
2.fiber 有一个requestIdleCallback(workLoop)一直监控有没有要更新的节点，如果没有需要更新的节点，且wipRoot有值，则需要提交更新

5.fiber:
	1.根fiber只有childFiber，然后其他fiber有兄弟+childFiber+parentFiber，类似于一棵树

```

### Fiber试调

#### 介绍

- wipRoot：执行中的*rootFiber*，*当执行完提交root后wipRoot等于null，提交就是将dom渲染到页面*
- alternate、currentRoot：备份/当前工作的root，方便下一个时间片可以继续执行*rootFiber*
- deletions：*旧fiber对象集，待删除的，比如说下次渲染的时候，有些div没有了不需要渲染，就要把它放入deletions中，下次提交的时候就把里面东西删除*
- nextUnitOfWork：下一个工作单元，render的时候会初始化一个值（wipRoot）
- commitRoot：执行删除节点操作，调用commitWork更新，新增节点，然后 currentRoot = wipRoot； wipRoot = null;
- commitWork：从根节点开始开始深度优先遍历fiber，操作真实DOM去替换，更新，删除节点

#### render函数

- 第一次进去的时候，将我们的element和容器关联起来
- wipRoot有值，并且将nextUnitOfWork赋值为wipRoot

```
function render(element, container) {
  console.log("render : ", element);
  wipRoot = {
    dom: container,
    props: {
      // 根节点，只有一个child
      children: [element],
    },
    // 相当于备份，要去比较
    alternate: currentRoot,
  };
  deletions = [];
  // 关键点，下一个执行单元就是当前根工作节点
  nextUnitOfWork = wipRoot;
}
```



#### workloop

- 调度作用，空闲时间（requestIdleCallback）一直扫描该程序有没有需要更新的
- 如果deadline.timeRemaining() < 1;更新时间不够的话，就会中断，没有的话，空闲时间一直扫描
- 第一次进来在render中，nextUnitOfWork赋值了，所以会进入while循环里面的performUnitOfWork

```js
// 调度作用
function workLoop(deadline) {
  let shouldYield = false; // 是否挂起

  // 如果下个执行单元和不挂起，就要一直执行
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 拿到下一个fiber，如果浏览器有空闲就执行
    shouldYield = deadline.timeRemaining() < 1; // 如果浏览器时间不够的话，shouldYield就true了，跳出while，往下面走
  }

  // 如果没有下个执行单元，并且有（暂停的时候必须有）work in proess根，就要提交，否则就要循环调度
  if (!nextUnitOfWork && wipRoot) {
    commitRoot(); // 每一次提交root都会将wipRoot设置为null
    console.log("commitRoot");
  }
  // 没有更新的话，这里一直会调用询问浏览器是否要更新
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
```

#### performUnitOfWork

- 因为第一次是根节点div，所以会进入updateHostComponent

```js
// 找到函数组件或者dom进行更新
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  // 深度优先，更新它的子，再找兄弟更新，再重新返回父更新
  if (fiber.child) {
    return fiber.child; // 找到子返回
  }
  let nextFiber = fiber;
  while (nextFiber) {
    // 直到找到根fiber，如果还没有，返回null，说明该commitWork了
    if (nextFiber.sibling) {
      return nextFiber.sibling; // 没有子，就找兄弟，兄弟没有就找叔叔及叔叔的兄弟没有继续往上找
    }
    nextFiber = nextFiber.parent;
  }
  // 直到找到rootFiber，没找到，那就说明更新完了
  return undefined;
}
```

#### 总结：

```
1.React是React16引入的特性，大大提高了React页面的性能，可以更好的应用于大型复杂的项目，使用了requestIdleCallback+deadline.timeRemaining() > 1判断当前空余时间是否足够，一直在空闲时间里面不断while循环判断当当前是否需要更新.
2.用nextUnitOfWork（下个工作单元）标记当前是否需要更新，最开始render的时候就是div根节点。
3.如果存在用nextUnitOfWork，并且时间空闲，while循环里面会调用performUnitOfWork去调和（reconcileChildren）组件，并且返回下一个（子节点，兄弟，父亲），到while循环里面继续调和（reconcileChildren），直到performUnitOfWork返回undefined，说明所有节点都遍历过了
4.调和子节点：调和的时候，要对比新旧Fiber是否相同的type，相同说明是更新操作。如果有子节点但是type不同，说明是一个替换或者新增操作，有旧fiber且type不同，则需要将该fiber标记为删除，并且加入删除数组中
5.调和完所有fiber之后，就会进入提交（commit）阶段
	1.首先遍历删除节点数组中的元素，进行commitWork，找到父元素然后将该元素的真实DOM删除：domParent.removeChild(fiber.dom);
	2.然后从根fiber开始，递归调用commitWork，判断是更新/替换/新增操作，然后操作真实DOM
	3.commit阶段不可中断，递归的
6.setState也会生成nextUnitOfWork，触发fiber调和更新，而且会比较新旧DOM
```

