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

