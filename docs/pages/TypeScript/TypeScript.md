### 一、断言

> 很多时候，我们会比TS更知道这个变量的准确类型。比如，一个any类型的字符串，你想要获取他的长度，那么就直接告诉它这是一个字符串，有两种方法，分别是<> 和 as。

#### 1.<>

```js
const someValue: any = "my name is qmj";
const stringLength: number = (<string>somevalue).length
```

#### 2.as

```js
const someValue: any = "my name is qmj";
const stringLength: number = (someValue as string).length;
```

### 二、TS函数

> ts的函数需要指明传入的参数类型，返回值的类型。

#### ts参数类型及返回值类型：

```typescript
function createName(firstname: string, lastname: string): string {
	return firstname + lastname;
}
```

#### ts可选参数和默认值

```typescript
function createPerson(firstname: string, lastname: string, age?: number): string {
  return firstname + lastname + age;
}
```

### 三、接口

> 用于描述对象的形状。

#### 一般用法：

```typescript
interface Person {
	name: string;
  age: number;
}
let qmj: Person {
	name: 'qmj',
  age: 18,
}
```

#### 可选&只读属性

```typescript
interface Person {
	readonly name: string,
  age?: number,
}
```

### 四、泛型

> 可以用于创建可以进行复用的接口，组件，函数等等。相比于any，他可以保存类型，而any不会。

#### 简单例子：

```typescript
function fullname<T, U>(firstname: T, lastname: U): T {
  return firstname + lastname;
}

console.log(fullname('qmj',1))
```

#### 泛型接口

```typescript
interface Person<T> {
	(arg: T): T,
}
```

#### 泛型类

```typescript
calss GenericNumber<T> {
  value: T;
  add: (x: T, y: T) => T;
}

let myGenericNumer = new GenericNumber<number>();
myGenericNumber.value = 0;
myGenericNumber.add(x, y) = {
  return x + y;
}
```

