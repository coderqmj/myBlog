### 1.webComponent如何进行样式隔离

```
1.attachShadow开启沙箱
window.onload = () => {
    class WuJie extends HTMLElement {
        constructor() {
            super();
            // shadowdom 样式隔离
            let dom = this.attachShadow({ mode: "open" });
            let template = document.querySelector("#wujie");
            dom.appendChild(template.content.cloneNode(true));
        }
    }
    // 类似于vue组件，原生JS写的
    window.customElements.define("wu-jie", WuJie); // 挂载
};
```

