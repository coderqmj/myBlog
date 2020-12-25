## css三角形
思路：**设置宽高都为0，border就是正方形即三角形底边的宽度，再把border-color的三个设置为透明即可**

```css
.triangle_top {
      width: 0;
      height: 0;
      border-width: 50px;
      border-style: solid;
      border-color: red transparent transparent transparent;
}
```

扩展：css画扇形

思路：加上border-radius = 50% 即可

```css
.triangle_top {
      width: 0;
      height: 0;
      border-width: 50px;
      border-style: solid;
      border-radius: 50%;
      border-color: red transparent transparent transparent;
}
```