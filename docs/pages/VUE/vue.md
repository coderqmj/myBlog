# VUE学习

## 一、Mixin

- 混入代码，可以做到代码复用
- 使用关键字mixins

### 1.1使用

```jsx
// 单独文件定义
export const demoMixin = {
  data() {
    return {
      message: '学习Mixin',
      isShow: true
    };
  },
  methods: {
    handleClick() {
      console.log('点击事件');
      // data.isShow
    }
  },
  created() {
    console.log('执行了创建');
  }
};

// 在业务组件使用
<template>
  <div>
    <el-button type="primary" @click="handleClick">按钮</el-button>
    <span>{{ isShow ? message : '' }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { demoMixin } from '@/mixins/demo';

export default defineComponent({
  mixins: [demoMixin],
  components: {},
  setup() {
    return {
      message: '你好'
    };
  }
});
</script>

<style scoped></style>
```

### 1.2命中规则

- 如果mixin对象和组件对象发生冲突，以谁为准呢？
- 情况一：如果是data函数的返回值对象
  - 返回值对象默认情况下合并
  - 如果data返回值对象的属性发生冲突，那么会保留组件自身的数据
- 情况二：如果是生命周期
  - 如果两者都有相同的生命周期，会合并到数组中，都会被执行一遍
- 情况三：对应是一个对象时，比如methods，components和directives，都会被合并为同一个对象
  - 如果都有methods选项，并且都定义了方法，那么他们都会生效，
  - 但相同key值时，只取用组件本身的，比如两者都在methods中定义了foo方法

### 1.3全局混入

- 如果组件中某些选项，是所有组件都需要拥有的，那么这个时候我们可以使用全局的mixin
  - 全局的Mixin可以使用应用app的方法mixin来完成注册
  - 一旦注册，那么全局混入的选项将会影响每一个组件

```js
const app = createApp(RootApp);

app.mixin({
  created() {
    console.log('全局的mixin');
  }
});
```

### 1.4extends关键字

- 类似于react类组件的继承，会拥有base组件的属性
- 可以使用期methods里面的东西，但是setup访问不到？

```vue
<template>
  <div>Main</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from '../login/login.vue';

export default defineComponent({
  extends: Login,
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
```

## 二、Composition API

::: tip 背景相关

options编写组件的时候逻辑非常分散，我们处理一个逻辑时，需要跳转到不同模块中去处理，而Composition可以把同一个逻辑关注点的相关代码放一起。我们在vue组件中的setup函数编写这些逻辑。

:::

### 2.1认识Composition API

- 从背景中得知Composition API要帮助我们完成什么，那具体要怎么做？
  - 为了开始使用Composition API，我们需要一个可以实际使用它的地方（编写代码的地方）
  - 在vue组件中，这个位置就是**setup函数**
- setup其实就是组件的另外一个选项
  - 只不过这个选项强大到我们可以用它来替代之前所编写的大部分其他选项
  -  比如methods、computed、watch、data、生命周期等等;

### 2.2认识setup

#### setup的参数

- 我们先来研究一个setup函数的参数，它主要**有两个参数**: 
  - 第一个参数:props
  - 第二个参数:context
- props非常好理解，它其实就是**父组件传递过来的属性**会被**放到props对象**中，我们在**setup中如果需要使用**，那么就可以直接**通过props参数获取**
  - 对于定义props的类型，我们还是和之前的规则是一样的，在props选项中定义
  - 并且在template中依然是可以正常去使用props中的属性，比如message
  - 如果我们在setup函数中想要使用props，那么不可以通过 this 去获取
  - 因为props有直接作为参数传递到setup函数中，所以我们可以直接通过参数来使用即可;
- 另外一个参数是context，我们也称之为是一个**SetupContext**，它里面**包含三个属性**:
  -  **attrs**:所有的非prop的attribute
  -  **slots**:父组件传递过来的插槽(这个在以渲染函数返回时会有作用，后面会讲到); 
  - **emit**:当我们组件内部需要发出事件时会用到emit(因为我们不能访问this，所以不可以通过 this.$emit发出事件);

#### setup的返回值

- setup既然是一个函数，那么它也可以有**返回值**，**它的返回值用来做什么呢?**
  - setup的返回值可以在模板template中被使用;
  - 也就是说我们可以通过setup的返回值来替代data选项
- 甚至是我们可以**返回一个执行函数**来**代替在methods中定义的方法**:
- 但是对与setup里面的数据，使用setup里面的方法去改变它的时候，做不到响应式
  - 因为对于一个定义的变量来说，默认情况下，Vue并不会跟踪它的变化，来引起界面的响应式操作;

![](./imgs/setupClick01.png)



![](./imgs/setupClick02.png)









#### setup不可以使用this

- 因为setup的调用发生在data、computed或者methods被解析之前，这些东西无法在setup中获取
- 调用顺序
  1. 调用 createComponentInstance 创建组件实例
  2. 调用 setupComponent 初始化component内 部的操作
  3. 调用 setupStatefulComponent 初始化有状态 的组件
  4. 在 setupStatefulComponent 取出了 setup 函 数
  5. 通过callWithErrorHandling 的函数执行 setup

#### Reactive API

- 如果想为在setup中定义的数据提供响应式的特性，那么我们可以**使用reactive的函数**
  - 使用reactive函数处理我们的数据之后，数据再次被使用时就会进行依赖收集;
  - 当数据发生改变时，所有收集到的依赖都是进行对应的响应式操作(比如更新界面);
  - 事实上，我们编写的data选项，也是在内部交给了reactive函数将其编程响应式对象的;

![](./imgs/reactiveApi01.png)



- reactive API对**传入的类型是有限制的**，它要求我们必须传入的是**一个对象或者数组类型**:

  - 如果我们传入一个基本数据类型(String、Number、Boolean)会报一个警告;

- 这个时候Vue3给我们提供了**另外一个API:ref API**

  - ref 会返回一个可变的响应式对象，该对象作为一个 **响应式的引用** 维护着它内部的值，这就是ref名称的来源;
  - 它内部的值是在ref的 value 属性中被维护的;
  - ref是可以放入reactive中的，也可以自动解包

  ![](./imgs/refApi01.png)



#### **readonly**

-  在readonly的使用过程中，有如下规则：
  - readonly返回的对象都是不允许修改的
  - 但是经过readonly处理的原来的对象是允许被修改的
    - 比如 const info = readonly(obj)，info对象是不允许被修改的;
    - 当obj被修改时，readonly返回的info对象也会被修改;
    - 但是我们不能去修改readonly返回的对象info;
  - 其实本质上就是readonly返回的对象的setter方法被劫持了而已;
- 应用场景：
  - 传值给其他组件的时候，往往只希望别人使用这个值，不希望去改变它

![](./imgs/readonly01.png)

#### toRefs

- 如果我们使用**ES6的解构语法**，对**reactive返回的对象进行解构获取值**，那么之后无论是**修改结构后的变量**，还是**修改reactive**

  **返回的state对象**，**数据都不再是响应式**的:

- 那么有没有办法**让我们解构出来的属性是响应式**的呢?

  - Vue为我们提供了一个toRefs的函数，可以将reactive返回的对象中的属性都转成ref; 
  - 那么我们再次进行结构出来的 name 和 age 本身都是 ref的;

#### computed

- vue2中的计算属性

```vue
<template>
  <div>
    <el-button type="primary" @click="fullName.set('qiu mojian1')"
      >按钮</el-button
    >
    <span>{{ fullName.get() }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { demoMixin } from '@/mixins/demo';

export default defineComponent({
  mixins: [demoMixin],
  components: {},
  setup() {
    const firstName = ref('qiu');
    const lastName = ref('mojian');
    const fullName = computed(() => ({
      get: () => {
        return firstName.value + ' ' + lastName.value;
      },
      set: (newName: string): void => {
        console.log(newName);
        const names = newName.split(' ');
        firstName.value = names[0];
        lastName.value = names[1];
      }
    }));
    return { fullName };
  },
  methods: {}
});
</script>

<style scoped></style>

```

#### 监听属性

- 在options Api里面，我们使用watch选项来侦听data或者props的变化，去执行某一些操作
- 在composition API里面，我们可以使用watchEffect和watch来完成响应式数据的侦听
  - watchEffect用于自动收集响应式数据的依赖
  - watch需要手动指定侦听的数据源

#### **watchEffect介绍**

- watchEffect传入函数会立即被执行一次（类似于duck中的runAndTakeLatest）,在执行的过程中会收集依赖
- 其次，只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行
- 返回一个函数，执行后可以停止监听

```vue
<template>
  <div>
    <el-button type="primary" @click="fullName.set('qiu mojian1')"
      >按钮</el-button
    >
    <span>{{ fullName.get() }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue';
import { demoMixin } from '@/mixins/demo';

export default defineComponent({
  mixins: [demoMixin],
  components: {},
  setup() {
    const firstName = ref('qiu');
    const lastName = ref('mojian');
    const fullName = computed(() => ({
      get: () => {
        return firstName.value + ' ' + lastName.value;
      },
      set: (newName: string): void => {
        console.log(newName);
        const names = newName.split(' ');
        firstName.value = names[0];
        lastName.value = names[1];
      }
    }));
    const stopWatch = watchEffect(() => {
      console.log('被监听了', firstName.value, lastName.value);
    });
    return { fullName };
  },
  methods: {}
});
</script>

<style scoped></style>

```

#### **watchEffect清除副作用**

- 比如在开发中我们需要在侦听函数中执行网络请求，但是在网络请求还没有达到的时候，我们停止了侦听器，

  或者侦听器侦听函数被再次执行了

- 那么上一次的网络请求应该被取消掉，这个时候我们就可以清除上一次的副作用;

- 在我们给watchEffect传入的函数被回调时，其实可以获取到一个参数:onInvalidate

  - 当**副作用即将重新执行** 或者 **侦听器被停止** 时会执行该函数传入的回调函数;
  - 我们可以在传入的回调函数中，执行一些清除工作;

```js
  watchEffect((onInvalidate) => {
    const timer = setTimeout(() => {
      console.log('网络请求');
    }, 2000);
    onInvalidate(() => {
      clearTimeout(timer);
    });
  });
```

#### **watchEffect执行机制**

- 结果是打印两次
  - 这是因为setup函数在执行时就会立即执行传入的副作用函数，这个时候DOM并没有挂载，所以打印为null;
  - 而当DOM挂载时，会给title的ref对象赋值新的值，副作用函数会再次执行，打印出来对应的元素

```vue
<template>
  <div>
    <h2 ref="titleRef"></h2>
    <!-- <el-button type="primary" @click="handleClick">按钮</el-button>
    <span>{{ fullName.get() }}</span> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const titleRef = ref(null);
    watchEffect(() => {
      console.log(titleRef.value);
    });
    return { titleRef };
  },
  methods: {}
});
</script>

<style scoped></style>
```

#### **调整watchEffect的执行时机**

- 如果我们希望在第一次的时候就打印出来对应的元素呢?
  - 这个时候我们需要改变副作用函数的执行时机;
  - 它的默认值是pre，它会在元素 挂载 或者 更新 之前执行;
  - 所以我们会先打印出来一个空的，当依赖的title发生改变时，就会再次执行一次，打印出元素
  - 使用 flush: 'post'即可

```vue
<template>
  <div>
    <h2 ref="titleRef"></h2>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const titleRef = ref(null);
    watchEffect(
      () => {
        console.log(titleRef.value);
      },
      {
        flush: 'post'
      }
    );
    return { titleRef };
  },
  methods: {}
});
</script>

<style scoped></style>
```

#### **Watch的使用**

- watch的API完全等同于组件watch选项的Property:

  - watch需要侦听特定的数据源，并在回调函数中执行副作用;
  -  默认情况下它是惰性的，只有当被侦听的源发生变化时才会执行回调;

- 与watchEffect的比较，watch允许我们:

  - 懒执行副作用(第一次不会直接执行);
  - 更具体的说明当哪些状态发生变化时，触发侦听器的执行;
  - 访问侦听状态变化前后的值;

- watch侦听函数的数据源有两种类型:

  - 一个getter函数:但是该getter函数必须引用可响应式的对象(比如reactive或者ref)
  - 直接写入一个可响应式的对象，reactive或者ref(比较常用的是ref);

  -

- 可以监听单个或者多个

```vue
<template>
  <div>
    <h2 ref="titleRef"></h2>
    <el-button type="primary" @click="handleClick">按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const titleRef = ref(null);
    const state = reactive({
      name: 'qmj',
      age: 18
    });
    const names = reactive(['a', 'b', 'c']);
    watch(
      () => state,
      // () => [...names],
      (newValue, oldValue) => {
        console.log(newValue, oldValue);
      },
      { deep: true, immediate: true }
    );
    const handleClick = () => {
      console.log(111);
      state.age++;
    };
    return { titleRef, state, handleClick };
  }
});
</script>
```

### 2.3生命周期钩子

- 上面的setup可以替代data，methods，computed，watch等选项，也可以替代声明周期钩子
- 在setup中怎么用生命周期呢？
  - 可以直接导入使用onXXX这些函数注册生命周期钩子
  - 需要注意的是vue3中没有beforeCreate和created，因为setup中就是围绕这两个生命周期运行的

### 2.4**Provide函数**













































## 面试

### 1.vue2和vue3的区别

::: details 点击查看解析

```
1.options Api 和 Composition API
	1.options编写组件的时候逻辑非常分散，而Composition可以把同一个逻辑关注点的相关代码放一起
```

:::

### 2.options Api的介绍及缺陷

::: details 点击查看解析

```
1.特点是对应的属性中编写对应的功能模块
	1.比如data定义数据，methods定义方法，计算属性，watch监听，生命周期
2.watch需要侦听特定的数据源
2.弊端：
	1.实现某一个功能时，对应的代码逻辑被拆分到各个属性中
	2.组件变大，复杂时，逻辑关注点的列表就会增长，同一个功能的逻辑会被拆分的很分散
	3.这样就造成了其组价的可阅读性较差
```

:::

### 3.watch和watchEffect的区别？应用场景

::: details 点击查看解析

```
1.默认情况下watch加载的时候不执行，而默认情况下watchEffect是会执行的
	 watchEffect使用flush: 'post可以初始不执行
2.watch允许访问侦听状态变化前后的值
3.watch更具体的说明当哪些状态发生变化时，触发侦听器的执行
4.watch需要手动传入被监听的值，可以是单个也可以是多个
```

:::



