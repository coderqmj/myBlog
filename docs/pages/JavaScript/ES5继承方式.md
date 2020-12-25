### 1.构造继承(构造继承又有三种)

> 使用构造函数的技术（也叫伪造对象或经典继承）。该方式的主要思想是：在子类构造函数的内部调用超类型构造函数，函数只不过是在特定的环境中执行代码的对象，因此使用call，apply也可以

优点：

- 可以传参数
- 避免了属性共享

缺点：

- 只是子类的实例，不是父类的实例
- 方法都要在构造函数里面定义，每次创建实例都会创建一遍方法

```javascript
function Person (age) {
  this.age = age || 18
}
Person.prototype.sleep = function () {
  console.log('sleeping')
}
function Programmer(name) {
  Person.call(this)
  this.name = name
}
let jon = new Programmer('qmj')
qmj.name // qmj
qmj.age // 18

qmj.sleep() // Uncaught TypeError: qmj.sleep is not a function
qmj instanceof Person // false
qmj instanceof Programmer // true
```



### 2.原型继承

> 使用到了原型和原型链相关的知识

缺点：

- 无法向父类构造函数传参
- 父类所有的属性被共享，只要有一个实例修改了属性，其他所有的子类实例都会被影响

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function() {
        console.log(name)
    }
}
function Student(){};
Student.prototype = new Person('qmj',18)
var qiu = new Student()
qmj.say()
```

### 3.组合继承（推荐）

> 结合**原型链继承**和**借用构造函数**继承，比较常用

```javascript
function Person (age) {
  this.age = age || 18
}

function Programmer(age, name) {
  Person.call(this, age)
  this.name = name
}

Programmer.prototype = new Person()
Programmer.prototype.constructor = Programmer // 修复构造函数指向

let qmj = new Programmer(18, 'qmj')
qmj.age // 18
qmj.name // qmj

qmj instanceof Person // true
qmj instanceof Programmer // true
```



### 4.寄生式继承（不推荐）

> 将继承过程封装在一个函数上

```javascript
function createObj (o) {
  var clone = Object.create(o)
  clone.sayName = function () {
    console.log('hi')
  }
  return clone
}

```

### 5.寄生组合继承

> 子类构造函数复制父类自身属性和方法，子类原型只接受父类的原型属性和方法

```javascript

```

