### 一、TypeScript的初体验

#### 1.1TS的环境

- TS最终会被编译成JS来运行，所以我们需要搭建对应的环境：
  - 安装tsc: `npm i typescript -g` , 执行 `tsc --version`可以查看版本号
  - webpack的babel插件

**hello_ts**

- 当我们传入期望之外的值会报错提示

```typescript
let message: string = 'coderqmj';
message = 123 // 这里会报错
function foo(payload: string) {
  console.log(payload)
}
foo() // 报错
foo(123) // 报错
foo('hello') 正确
```

#### 1.2执行ts

- `tsc 文件名` => 会生成一个同名的js文件，但里面的代码是ts经过转换生成的js代码
- 如果检查到传入非正确类型的值，会编译不通过

#### 1.4搭建ts环境

- webpack搭建
  - 安装并使用ts-loader `tnpm i ts-loader typescript -D`
  - 配置tsconfig.json文件（可以使用tsc --init生成默认文件）
  - 然后`npm run build`，就可以根据配置生成可执行的js代码
  - 但是每次都要打包，那就太麻烦了，这个时候安装`npm i webpack-dev-server -D`，然后package.json配置 "serve": "webpack serve"
    - 然后再安装模板：`npm i html-webpack-plugin -D`

- ts-node库直接执行
  - npm i ts-node tslib @types/node -g

#### 1.3一些思考与感悟

- 默认情况下，同一个目录下的ts文件在同一个作用域，所以a目录下的a1和a2文件都命名了name这个变量，会提示报警
- 解决办法：
  - 在文件中写 `export {}` 

