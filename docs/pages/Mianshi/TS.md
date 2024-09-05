### 1.定义类型时，小写string和大写String之间有什么区别

```
1.如果是小写的代表是Typescript中的字符串类型
2.如果是大写，代表是JavaScript的字符串包装类的类型
```

### 2.怎么理解TS

```
1.
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

