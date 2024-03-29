const fs = require("fs");
const array = require("./fs");
console.log(array);
module.exports = {
  title: "coderqmj的博客",
  desription: "coderqmj的前端记录",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/avatar.png" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  //下面涉及到的md文件和其他文件的路径下一步再详细解释
  themeConfig: {
    lastUpdated: "最后更新于", // 文档更新时间：每个文件git最后提交的时间
    logo: "/avatar.png", //网页顶端导航栏左上角的图标

    //顶部导航栏
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: "首页", link: "/" },

      //格式二：添加下拉菜单，link指向的文件路径
      {
        text: "分类", //默认显示
        ariaLabel: "分类", //用于识别的label
        items: [
          { text: "文章", link: "/pages/JavaScript/实现拖拽.md" },
          //点击标签会跳转至link的markdown文件生成的页面
          { text: "琐碎", link: "/pages/JavaScript/实现拖拽.md" },
        ],
      },
      { text: "LeetCode", link: "https://leetcode-cn.com/u/2vgrNDufDX/" },

      //格式三：跳转至外部网页，需http/https前缀
      { text: "Github", link: "https://github.com/coderqmj" },
    ],

    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      "/pages/": array,
      // [
      //   {
      //     title: "计算机网络", // 一级菜单名称
      //     collapsable: true, // false为默认展开菜单, 默认值true是折叠,
      //     sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
      //     children: [
      //       ["../pages/ComputerNet/HTTP.md", "1.HTTP相关"], //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
      //       ["../pages/ComputerNet/七层模型.md", "2.七/四/五层模型"],
      //       ["../pages/ComputerNet/浏览器缓存.md", "浏览器缓存"],
      //       ["../pages/ComputerNet/HTTPS.md", "HTTPS"],
      //       ["../pages/ComputerNet/浏览器安全.md", "浏览器安全"],
      //       ["../pages/ComputerNet/浏览器性能优化.md", "浏览器性能优化"],
      //       ["../pages/ComputerNet/HTTP历史.md", "HTTP历史"],
      //       ["../pages/ComputerNet/HTTP请求流程.md", "HTTP请求流程"],
      //       [
      //         "../pages/ComputerNet/JavaScript如何影响DOM树构建.md",
      //         "JavaScript如何影响DOM树构建",
      //       ],
      //       [
      //         "../pages/ComputerNet/CSS如何影响首次白屏.md",
      //         "CSS如何影响首次白屏",
      //       ],
      //       [
      //         "../pages/ComputerNet/分层合成：为什么CSS比JS高效.md",
      //         "分层合成：为什么CSS比JS高效",
      //       ],
      //     ],
      //   },
      //   {
      //     title: "JavaScript",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/JavaScript/实现拖拽.md", "实现拖拽"],
      //       ["../pages/JavaScript/JS高级.md", "JavaScript高级"],
      //       ["../pages/JavaScript/创建对象的方式.md", "创建对象的方式"],
      //       ["../pages/JavaScript/玩转Promise.md", "玩转Promise"],
      //       ["../pages/JavaScript/this全面解析.md", "邂逅this"],
      //       ["../pages/JavaScript/手写常用方法.md", "手写常用方法"],
      //       ["../pages/JavaScript/项目常用方法.md", "项目常用方法"],
      //       ["../pages/JavaScript/ES5继承方式.md", "ES5继承总结"],
      //       [
      //         "../pages/JavaScript/数组字符串对象.md",
      //         "数组/字符串/对象操作方法",
      //       ],
      //       ["../pages/JavaScript/执行机制.md", "执行机制"],
      //       ["../pages/JavaScript/设计模式.md", "设计模式"],
      //       ["../pages/JavaScript/跨域方法及原理.md", "跨域方法及原理"],
      //       ["../pages/JavaScript/axios二次封装.md", "axios二次封装"],
      //       ["../pages/JavaScript/JS垃圾回收机制.md", "JS垃圾回收机制"],
      //       ["../pages/JavaScript/解剖Map对象.md", "解剖Map对象"],
      //       ["../pages/JavaScript/重学JS.md", "JS高级"],
      //     ],
      //   },
      //   {
      //     title: "React",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       // ['../pages/React/初始react.md', 'React语法'],
      //       ["../pages/React/React学习笔记.md", "学习笔记"],
      //       ["../pages/React/redux学习.md", "Redux学习"],
      //       ["../pages/React/源码阅读.md", "源码阅读"],
      //       ["../pages/React/Fiber学习.md", "Fiber学习"],
      //     ],
      //   },
      //   {
      //     title: "VUE",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/VUE/vue.md", "VUE语法"],
      //       ["../pages/VUE/vuex&router全家桶.md", "vue全家桶"],
      //       ["../pages/VUE/diff算法.md", "vueDiff算法学习"],
      //       ["../pages/VUE/数据双向绑定原理.md", "VUE数据双向绑定原理"],
      //     ],
      //   },
      //   {
      //     title: "NODE",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/Node/学习笔记.md", "NODE学习笔记"],
      //       ["../pages/Node/Node源码阅读.md", "Node源码阅读"],
      //       ["../pages/Node/Koa和Express对比.md", "Koa和Express对比"],
      //       ["../pages/Node/Node版本管理.md", "Node版本管理"],
      //     ],
      //   },
      //   {
      //     title: "构建工具",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/Webpack/学习笔记.md", "Webpack学习笔记"],
      //       ["../pages/Webpack/Vite学习.md", "Vite学习"],
      //     ],
      //   },
      //   {
      //     title: "数据结构与算法",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/Leetcode/动态规划.md", "动态规划"],
      //       ["../pages/Leetcode/双指针.md", "双指针"],
      //       ["../pages/Leetcode/排序.md", "排序"],
      //       ["../pages/Leetcode/递归回溯.md", "递归回溯"],
      //     ],
      //   },
      //   {
      //     title: "CSS",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/CSS/css常用实现", "常见实现"],
      //       ["../pages/CSS/flex布局.md", "邂逅flex"],
      //       ["../pages/CSS/CSS三角形.md", "纯CSS三角形"],
      //       ["../pages/CSS/float布局.md", "遇见float"],
      //       ["../pages/CSS/垂直与水平居中.md", "垂直水平居中问题"],
      //       ["../pages/CSS/animation&transfrom.md", "animation&transfrom相关"],
      //       ["../pages/CSS/回流重绘.md", "回流重绘"],
      //       ["../pages/CSS/less学习.md", "less学习"],
      //       ["../pages/CSS/项目样式重置.md", "项目样式重置"],
      //     ],
      //   },
      //   // {
      //   //   title: '公务员考试',
      //   //   collapsable: true,
      //   //   sidebarDepth: 2,
      //   //   children: [
      //   //     ['../pages/GWY/图形推理.md','图形推理'],
      //   //   ]
      //   // },
      //   {
      //     title: "GIT教程",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/Git/git学习.md", "GIT教程"],
      //       ["../pages/Git/git-cherry-pick教程.md", "git-cherry-pick教程"],
      //       ["../pages/Git/git撤销提交.md", "git撤销提交"],
      //     ],
      //   },
      //   {
      //     title: "TypeScript",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [["../pages/TypeScript/TypeScript.md", "TypeScript笔记"]],
      //   },
      //   {
      //     title: "正则表达式",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [["../pages/Regular/正则表达式学习.md", "正则表达式学习"]],
      //   },
      //   {
      //     title: "项目",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/Project/项目样式重置.md", "项目样式重置"],
      //       ["../pages/Project/项目配置别名.md", "项目配置别名"],
      //       ["../pages/Project/路由配置及划分.md", "路由配置及划分"],
      //     ],
      //   },
      //   {
      //     title: "三方库",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/TripLib/qs.md", "qs"],
      //       ["../pages/TripLib/react-query.md", "react-query"],
      //       ["../pages/TripLib/react-router-dom.md", "react-router-dom"],
      //     ],
      //   },
      //   {
      //     title: "实习遇到的问题及成长",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       ["../pages/Intern/实习遇到的问题与成长.md", "实习遇到的问题及成长"],
      //     ],
      //   },
      //   {
      //     title: "腾讯工作的思考与总结",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       [
      //         "../pages/TencentWork/工作记录总结与思考.md",
      //         "工作记录总结与思考",
      //       ],
      //       ["../pages/TencentWork/阶段性总结.md", "阶段性总结"],
      //       ["../pages/TencentWork/遇到的问题.md", "遇到的问题"],
      //       ["../pages/TencentWork/duck学习.md", "duck相关学习"],
      //     ],
      //   },
      //   {
      //     title: "琐碎",
      //     collapsable: true,
      //     sidebarDepth: 2,
      //     children: [
      //       // ['../pages/suosui/CommandJS.md','前端模块化'],
      //       ["../pages/suosui/待学习清单", "待学习清单"],
      //       ["../pages/suosui/设计模式.md", "设计模式"],
      //       ["../pages/suosui/前端渲染&后端渲染.md", "前端渲染&后端渲染"],
      //       ["../pages/suosui/原生高度属性及区别.md", "原生高度属性及区别"],
      //       ["../pages/suosui/奇怪的知识点小技巧.md", "奇怪的知识点小技巧"],
      //       ["../pages/suosui/浏览器兼容性.md", "浏览器兼容性"],
      //       ["../pages/suosui/代码规范.md", "代码规范"],
      //       ["../pages/suosui/CodeReview.md", "CodeReview"],
      //       ["../pages/suosui/项目搭建.md", "项目搭建"],
      //       // ['../pages/suosui/个人前端学习经历.md','个人前端学习经历'],
      //     ],
      //   },
      //   // {
      //   //   title: '面试',
      //   //   collapsable: true,
      //   //   sidebarDepth: 2,
      //   //   children: [
      //   //     ['../pages/Mianshi/css.md','CSS'],
      //   //     ['../pages/Mianshi/HTML浏览器网络操作GIT.md','HTML浏览器计算机网络'],
      //   //     ['../pages/Mianshi/JavaScript.md','JavaScript'],
      //   //     ['../pages/Mianshi/React.md','React'],
      //   //     ['../pages/Mianshi/VUE.md','Vue'],
      //   //     ['../pages/Mianshi/webpack.md','webpack'],
      //   //     ['../pages/Mianshi/滴滴.md','滴滴'],
      //   //     ['../pages/Mianshi/字节.md','字节'],
      //   //     ['../pages/Mianshi/学习清单.md','学习清单'],
      //   //   ]
      //   // },
      // ],

      //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    },
  },
  markdown: {
    // lineNumbers: true // 代码块显示行号
  },
};
