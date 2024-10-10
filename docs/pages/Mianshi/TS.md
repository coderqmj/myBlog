### 1.定义类型时，小写string和大写String之间有什么区别

```
1.如果是小写的代表是Typescript中的字符串类型
2.如果是大写，代表是JavaScript的字符串包装类的类型
```

### 2.怎么理解TS

```
1.是JavaScript的超集，TS支持了静态类型，接口等功能，让大型项目变得容易阅读（特别是读源码）、维护和扩展
2.通过静态类型检查，可以在开发阶段帮助开发者提早发现风险所在，比如公私一体化
```

### 3.TS里面Type和interface的区别

```typescript
type：
	1.指的是类型
  2.type里面每个属性需要用逗号分隔
  3.没有可选，没有只读
interface：
	1.指的是接口
  2.interface每个元素需要分号分隔
  3.可以定义可选类型，也可以定义只读类型
  
总结：
	1.如果定义非对象类型，推荐使用type，比如Direction、Alignment、一些Function
  2.如果是定义对象类型，那么他们是有区别的
		1.interface可以重复的对某个接口来定义属性和方法
		2.而type定义的是别名，别名是不能重复的
白名单使用type
export type IWhiteListMap = {
  [key in IWhiteListKey]: boolean;
};
	
type InfoType = {name: string, age: number};
interface InfoType = {
    name: string
    age?: number // 表示该接口是可选属性
    readonly height: number // 表示只读，身高改不了了
}
```

### 4.什么是泛型

```typescript
1.一般用在函数上面，在JS中，函数是一等公民。它的参数和返回值都意义非凡。参数的这个类型就变得尤为重要
2.在TS中，它不希望由函数本身去限制类型，而是调用者决定，那函数就变得非常灵活了
3.例子：useState<string>('1')  useState<number>(1)
4.useState需要的参数类型由调用者自己决定，这样具有灵活性和复用性

5.当然，接口也是可以使用泛型的
interface IPerson<T1 = string, T2 = number> {
  name: T1,
  age: T2,
}
```

