## 文档地址

- 中文文档
- [英文文档1](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)
- [英文文档2](https://v5.reactrouter.com/web/example/basic)

## 文档笔记

### 1.useParams

- 多个参数也支持，但是多个参数更推荐location的方式，使用search去传参

```js
<Route path="product/:id" element={<ProductList />} />
 
// 在url=xxx/product/cvm下面
const params = useParams();
console.log(params);  // { id: cvm }
```

### 2.useLocation

- 多个参数更方便

```js
<Route path="product" element={<ProductList />} />
  
// 在url=xxx/product?module=cvm&name=1的页面中
const location = useLocation();
const searchParams = qs.parse(location.search.split('?')[1])
console.log(searchParams);  // { module: cvm, name: 1 }
```

