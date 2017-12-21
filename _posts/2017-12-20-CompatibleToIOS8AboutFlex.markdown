---
layout:     post
title:      "对ios8（iphone6）兼容flex布局的解决"
subtitle:   "完美布局怎容瑕疵"
date:       2017-12-20 18:36:15
author:     "AXiang"
header-img: "img/post-bg-webchat.jpg"
catalog:  true
tags:
    - 前端
    - Css
---

开发过程使用flex简直不要太6，但是如果只是写新版本的语法形式，是肯定存在兼容性问题的（安卓机基本没啥问题，主要是IOS）

### 一、须知
flex布局分为三个版本:
- 旧版本**dispaly: box**  
- 过渡版本**dispaly: flex box**  
- 现在的标准版本**display: flex**

Android:
- 2.3 开始就支持旧版本**display:-webkit-box**
- 4.4 开始支持标准版本**display: flex**

IOS:
- 6.1 开始支持旧版本**display:-webkit-box**
- 7.1 开始支持标准版本**display: flex**

PC:
- IE10开始支持，但是IE10的是**-ms**形式的

### 二、解决

**特别特别注意：把旧语法写在底下（ps：css向下兼容），否则无效**

<hr>

盒子写法:    
- display:-webkit-box;　　　　/* 老版本语法: Safari, iOS, Android browser,older WebKit */
- display:-moz-box;　　　　　/* 老版本语法: Firefox (buggy) */
- display:-ms-flexbox;　　　　/* 混合版本语法: IE 10 */
- display:-webkit-flex;　　　　/* 新版本语法: Chrome 21+ */
- display:flex;　　　　　 　　/* 新版本语法: Opera 12.1, Firefox 22+ */

<hr>

子元素写法:
- -webkit-flex:1;　　　　　　/* Chrome */
- -ms-flex:1;　　　　　　　 /* IE 10 */
- -webkit-box-flex:1;　　　　/* OLD - iOS 6-, Safari 3.1-6 */
- -moz-box-flex:1;　 　　 　 /* OLD - Firefox 19- */
- flex:1;　　　　　　　　　/* NEW, Spec - Opera 12.1, Firefox 20+ */

<hr>

例子（兼容iphone 6）
![兼容iphone6的举例](/img/in-post/post-css/css_1712_1.png) 