## 一、animation(关键帧动画)

### 1.相关介绍

关键帧动画使用@keyframes来定义多个变化状态，并且使用 `animation-name`来声明匹配：

- 使用`@keyframes`创建一个规则
- `@keyframes`中使用百分比定义各个阶段的样式
- 通过`animation`将动画添加到属性上

### 1.2animation属性

```
name(动画标识)	duration(动画持续时长)	timing-function  delay(延迟)，iteration-count，direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。
```

- name: 名字是自己取的，跟在@keyframes 后面的
- duration：持续时长，自己设置
- timing-function
  - 匀速 linear
  - 先快后慢 ease-in
  - 先慢后块 ease-in-out
- delay：延迟多少时间执行动画
- iteration-count：执行次数

### 1.3应用

钟表：

```
秒钟的话：
60秒匀速旋转一周
animation: linear 60s infinite colck;

@keyframes colck {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
分针和时针原理类似：60*60/60*60*12 为一周
```

## 二、transform

这个比较简单

### 1.相关属性介绍

- translate自身位移
- scale改变自身大小
- rotate 旋转角度 单位deg

