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

::: tip

options编写组件的时候逻辑非常分散，而Composition可以把同一个逻辑关注点的相关代码放一起。我们在vue组件中的setup函数编写这些逻辑。

:::

## 面试

### 1.vue2和vue3的区别

::: details
1.options Api 和 Composition API
	1.options编写组件的时候逻辑非常分散，而Composition可以把同一个逻辑关注点的相关代码放一起
:::

### 2.options Api的介绍及缺陷

::: details
1.特点是对应的属性中编写对应的功能模块
	1.比如data定义数据，methods定义方法，计算属性，watch监听，生命周期
2.弊端：
	1.实现某一个功能时，对应的代码逻辑被拆分到各个属性中
	2.组件变大，复杂时，逻辑关注点的列表就会增长，同一个功能的逻辑会被拆分的很分散
	3.这样就造成了其组价的可阅读性较差
:::



