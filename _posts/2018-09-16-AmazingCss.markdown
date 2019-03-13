---
layout:     post
title:      "流离在过去的Css样式"
subtitle:   "健忘的福音"
date:       2018-09-16 08:50:15
author:     "AXiang"
header-img: "img/post-bg-css.jpg"
catalog:  true
tags:
    - 前端
    - Css
---

> 老忘记但是炒鸡好用的Css样式

##### 视差效果：background-attachment: fixed;
视差滚动能让多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验。在CSS中定义背景滚动方式的属性是[backgroud-attacthment](http://www.w3school.com.cn/cssref/pr_background-attachment.asp)，下面简单的写了一个Demo。

<style>
.demo {
    margin-bottom: 30px;
}
.demo font,.demo-title {
    color: #1e70cd;
    margin: 40px 0 5px;
    text-align: center;
    font-size: 20px;
    font-weight: 300;
    line-height: 35px;
    display: block;
}
.demo .demo-iframe {
    margin: 1em auto;
    box-shadow: 0px 0px 1px 0px #aaa;
    background: #eee;
    position: relative;
}
.demo iframe {
    display: block;
    width: 100%;
    border: none;
    margin: 0;
    box-sizing: border-box;
    height: 400px;
    width: 1px;
    min-width: 100%;
}
</style>
<div class="demo">
	<font>简易视差Demo</font>
	<div class="demo-iframe">
		<iframe frameborder="0" scrolling="yes" src="http://wangxiang.vip/practiced-parallax_image/" style="height:340px"></iframe>
    </div>
</div>

##### 弹性盒子模型 display:flex

CSS3的弹性盒提供了一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式，不需要在设置左右浮动，margin，padding来调整位置。
强烈推荐阮一峰大牛的教程：[Flex 布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)，举例几个常用的参数：

以下5个属性设置在容器上（第一个属性值均为默认值）：
- flex-direction （主轴的方向：row（横向从左到右） column（纵向从上到下））
- justify-content （主轴的对齐方式：flex-start（左对齐） flex-end（右对齐） center（居中） space-between（两端对齐，间隔相等） space-around（两端对齐，边距较大））      
- align-items （纵向交叉轴对齐方式：stretch（占满） flex-start（起点对齐） flex-end（终点对齐） center（居中））
- align-content （多个轴线的对齐方式：stretch（轴线占满）flex-start（左对齐） flex-end（右对齐） center（居中） space-between（两端对齐，间隔相等） space-around（两端对齐，边距较大））
- flex-wrap （是否换行：nowrap（不换） wrap（换））

以下2个属性设置在子类上（常用）：
- align-self （允许子类与其他不同的对齐方式，可覆盖align-items属性:与`align-items`属性完全一致）
- flex-grow （定义项目的放大比例，默认为0，如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话））

##### 单行省略

```html

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

```
让一个自身有宽度或是容器有宽度的元素实现单行溢出省略（省略号表示）

##### 页内滚动

```html

    overflow: auto;
    //使IOS下的滑轮和原生一致，丝滑般顺畅
    -webkit-overflow-scrolling:touch;

```

效果类似下图![效果图](/img/in-post/post-css/css_1711_3.png)

##### 移动端图像禁止拷贝

在移动端的webkit内核浏览器的下，可以防止用户长按图片跳出系统默认菜单（菜单有下载图片之类的功能），使用如下代码：
```css

    img{
        -webkit-touch-callout:none;
    }

```

##### 常用选择器

  p:first-child 选择器：选择父级下的首个元素为`<p>`元素;    
  p:last-child 选择器：选择父级下的最后一个为`<p>`元素;     
  p:nth-child(2) 选择器：选择父级下的第2个为`<p>`元素;     


##### calc()四则运算动态计算长宽高

  用于动态计算长度值。
  需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
  任何长度值都可以使用calc()函数进行计算；
  calc()函数支持 `+`, `-`, `*`, `/` 运算；
  calc()函数使用标准的数学运算优先级规则；
  兼容到IE9IE9+、FF4.0+、Chrome19+、Safari6+,需要加上识别符，小程序完美支持。

  ```css

    /* 宽度为1000px,下列表达式则为 950px */
    .elm{
      width: calc(100%-50px);
    }

  ```

##### transform和position: fixed

  如果在父级有设置`transform`属性时，容器内设有position: fixed属性将会失效，变成仅仅只是 position: absolute 的效果;
  Google给的解释是**position: fixed" still do not cope with transform value**



  
