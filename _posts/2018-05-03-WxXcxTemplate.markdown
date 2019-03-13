---
layout:     post
title:      "小程序·模板Template相关"
subtitle:   " "
date:       2018-05-03 17:25:21
author:     "AXiang"
header-img: "img/post-bg-webchat.jpg"
catalog:  true
tags:
    - 前端
    - 小程序
    - JavaScript
---

> “Template相关”

### 前言 
虽然小程序名为小程序，不乏有开发者将其做得相当庞大(比如我目前在做的。。。31个单页。。)。那模板的使用肯定少不了。但是对于H5的模板Template，[官方API](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/template.html)少之甚少,网上的资料也是千篇一律，所以自个儿研究了下，方便日后使用。

### 布局和样式

通常我们使用模板只是对wxml和wxss进行复刻，主要的逻辑都是写在应用界面，这也是网上大部分资料的研究方向。主要步骤：
- 1、新建一个template文件夹用来管理项目中所有的模板； 
- 2、新建一个tem.wxml和tem.wxss进行模板和样式的定义； 
![新建实例](/img/in-post/post-xcx/xcx_1806_1.png)

- 3、使用name属性，作为模板的名字。然后在`<template/>`内定义代码片段。一个.wxml文件中可以定义多个模板，只需要通过name来区分； 
![wxml模板引用](/img/in-post/post-xcx/xcx_1806_2.png)
- 4、设置wxss样式，和普通的页面的wxss没有区别；
- 5、在需要使用的页面使用import导入wxml和wxss，注意路径位置
![导入wxml](/img/in-post/post-xcx/xcx_1806_3.png)
![导入wxss](/img/in-post/post-xcx/xcx_1806_4.png)
- 6、在页面上使用该模板，通过is判断使用哪个模板,如果模板是用于列表循环展示data值应设为item。下图事例：
![列表循环模板](/img/in-post/post-xcx/xcx_1806_5.jpg)
![列表循环模板](/img/in-post/post-xcx/xcx_1806_6.png)
这里我们使用name为filter模板，为一个查询用户选择信息类型的独立组件；若将data使用ES6的展开运算符`‘...’`，则模板里面绑定数据就不需要在前面加入item了，多个数据对象可以用逗号隔开；
![独立模板](/img/in-post/post-xcx/xcx_1806_7.png)
![独立模板](/img/in-post/post-xcx/xcx_1806_8.png)

### 作用域
如果我们的所需要的模板只是用于列表循环展示这类，一些运算逻辑都在应用页的话，上述的方法已经足矣。但是如果我们需要把逻辑写在模板页在模板js里进行逻辑运算，应用页只接受运算结果这样，则我们也需要将js进行模块化。但是在小程序模板的数据作用域只能作用域应用页，所以我们把逻辑写在模板js，通过传递this对象来完成对数据的传输。以下为模板js代码，利用ES6的export default导出js，并且将传入的数据进行构造初始化，下图为完整模板js代码和应用层调用代码。
![JS模板](/img/in-post/post-xcx/xcx_1806_9.png)
![应用层调用](/img/in-post/post-xcx/xcx_1806_10.png)

### 结束语
总的来说小程序对template支持还算可以，只是官方的api和网上的资料真的太少，需要自个儿研究。











