---
layout:     post
title:      "在浏览器中使用javascript module"
subtitle:   "ECMAScript module"
date:       2019-01-24 17:21:04
author:     "AXiang"
header-img: "img/post-bg-Mjs.jpg"
tags:
    - 前端
    - JavaScript
---

## 简介
现在，所有主流浏览器都已经支持JS module（Chrome、Edge、Safari、Firefox）。modules，就是JS的模块，我的理解就是，当有大量同类型或者有关联的数据和函数，方法需要当作一个整体展示的时候，可以单独定义成一个module也就是模块。module意义就使得代码模块化，使你的代码分成一个个逻辑上独立的子集，每个子集处理特定的功能，然后被单独调用。博文会讲解(肤浅的)如何在浏览器中使用JS module，如何管理它们。

![module兼容性](/img/in-post/post-js/js_18_12_1.png)

截止2018.12.02关于js module在国内环境下的兼容性概况。


