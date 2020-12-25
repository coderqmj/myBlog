### 一、Flex容器属性

```
主轴方向：水平排列（默认） | 水平反向排列 | 垂直排列 | 垂直反向排列
flex-direction: row | row-reverse | column | column-reverse;

换行：不换行（默认） | 换行 | 反向换行(第一行在最后面)
flex-wrap: nowrap | wrap | wrap-reverse;

flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
flex-flow: <flex-direction> || <flex-wrap>;

主轴对齐方式：起点对齐（默认） | 终点对齐 | 居中对齐 | 两端对齐 | 分散对齐
justify-content: flex-start | flex-end | center | space-between | space-around;

交叉轴对齐方式：拉伸对齐（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 第一行文字的基线对齐
align-items: stretch | flex-start | flex-end | center | baseline;

多根轴线对齐方式：拉伸对齐（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 两端对齐 | 分散对齐
align-content: stretch | flex-start | flex-end | center | space-between | space-around;
```

### 二、flex基本概念

#### 轴

- 交叉轴
- 主轴
- 交叉轴是由主轴确定的，主轴是由flex-direction决定的
- flex-direction属性设置在父容器上，这样才可以生效。

#### 容器

- 父容器
- 子容器

flex布局设计12个属性，其中6个父容器属性，6个子容器属性



### 三、属性详情

#### flex-direction

设置在父容器上

flex-direction：row(默认) : 在水平方向正序排列(从左到右)

flex-direction：row-reserve : 在水平方向逆序排列

flex-direction：column : 在垂直方向正序排列(从上到下)

flex-direction：column-reserve : 在垂直方向逆序排列



#### justify-content  设置子元素在主轴发方向上的对齐方式

在父容器上设置：

```
justify-content: flex-start			沿主轴开始方向上对齐
justify-content: flex-end			沿主轴终点方向上对齐
justify-content: center				主轴方向上水平对齐
justify-content: space-between		在主轴两端对齐，中间间隔相等
justify-content: space-around		在主轴上均匀分布，且间隔相等
```



#### align-items

决定子元素在交叉轴上的对齐方式

在父容器上设置：

```
align-items：flex-start				子元素在交叉轴方向起点对齐
align-items：flex-end				子元素在交叉轴方向终点对齐
align-items：center					子元素在交叉轴方向上居中
align-items：stretch					子元素在交叉轴方
```



#### flex



