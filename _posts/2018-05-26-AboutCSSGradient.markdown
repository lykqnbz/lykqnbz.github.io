---
layout:     post
title:      "CSS3 Gradient细解"
subtitle:   " "
date:       2018-05-26 15:19:10
author:     "AXiang"
header-img: "img/post-bg-css.jpg"
catalog:  true
tags:
    - 前端
    - Css
---

> “没有引言，一个人很无趣。”

### 前言
现在设计师同学越来越高大上了，纯色背景已经不能满足人民群众日益增长的物质文化需要了，必须各类渐变背景。。要怎么还原呢（虽然UI给的Sketch切图工具自带实现代码，嘻嘻），所以深入研究了一下这个CSS3的渐变Gradient。

### 兼容性
从[Can I use](https://caniuse.com/#feat=css-gradients)上看，除了极具中国社会主义的IE789不支持外，现代浏览器支持程度都良好，尤其移动端，对于不支持的浏览器，下文会提供一种采用纯色的降级方案。
![兼容性](/img/in-post/post-css/css_1805_1.png)    
![兼容性](/img/in-post/post-css/css_1805_2.png)     
但是各种兼容性问题肯定免不了，Gradient和flex布局一样麻烦，总共有三种语法规则，而且差异很大。。。   
这里为了讨论简单，我们只涉及最新的语法（基本能覆盖大量新浏览器了）。老旧语法规则和IE等各浏览器的兼容方法请见参考文章的2、3有详细的介绍，也可以使用Gradient Generator或者autoprefixer自动生成代码。

### 前置知识
1、绘制区域，也就是规范中所谓的gradient box（为了理解无歧义，下文不再翻译该术语），跟所关联DOM的实际尺寸有关，比如，设定background的话，绘制区域就是DOM的padding box，除非用backgroud-size指定大小；如果是设定list-style-image，绘制区域就是1em的正方形。   
2、从W3C的描述中可以知道，浏览器实际是根据Gradient指定的语法来生成对应的图片     
A gradient is an image that smoothly fades from one color to another. 而且不只background可以用，比如:
```css
    .clmap{
        background: linear-gradient(white, gray);
        list-style-image: radial-gradient(circle, red, green, blue, black);
    }

``` 
![gradient定义](/img/in-post/post-css/css_1805_3.png)    
3、由于是image，所以用于background时，实际是设置在background-image上，如果只是单纯的渐变颜色，可以用以下的样式来对不支持的老旧浏览器做降级处理：
```css

    .clmap {
        /* old */
        background-color: red;
        /* new */
        background-image: linear-gradient(red, orange);
    }

```
原理借用慕课网的一张图：  
![盒子3D模型](/img/in-post/post-css/css_1805_4.jpg)   
Gradient有几个子特性，下面一一列出。
### 线性渐变（linear-gradient）
以下实例演示了最基础的从头部开始的线性渐变，从红色开始，转为黄色，再到蓝色:
```css

    .clamp {
        background: linear-gradient(red,yellow,blue); /* 标准语法 */
        background: -webkit-linear-gradient(red,yellow,blue); /* Safari 5.1-6.0 */
        background: -o-linear-gradient(red,yellow,blue); /* Opera 11.1-12.0 */ 
        background: -moz-linear-gradient(red,yellow,blue); /* Firefox 3.6-15 */
    }

``` 
为了创建一个线性渐变，你需要设置一个起始点和一个方向（指定为一个角度）的渐变效果。你还要定义终止色。终止色就是你想让Gecko去平滑的过渡，并且你必须指定至少两种，当然也会可以指定更多的颜色去创建更复杂的渐变效果。以下的写法效果其实都一样:
```css

    .clamp {
        background-image: linear-gradient(yellow, green); /*  默认方向为to bottom */
        background-image: linear-gradient(to bottom, yellow, green); /*  使用关键字指定方向 */
        background-image: linear-gradient(180deg, yellow, green); /*  使用角度指定方向 */
        background-image: linear-gradient(to top, green, yellow);
        background-image: linear-gradient(to bottom, yellow 0%, green 100%); /*  指定颜色断点 */
    }

```   
![多种实现代码](/img/in-post/post-css/css_1805_5.png)  
也可以设置多个颜色断点以及颜色上设置透明度渐变实现锐变的效果：   
```css

    .clamp-1 {
    background-image: url(1.jpg);
    background-size: 100% 100%;
    }
    
    .clamp-2 {
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(1.jpg) no-repeat;
    background-size: 100% 100%;
    }

```
效果如下，左边原图，右边增加了一层遮罩，这个效果其实是利用了[CSS3的多背景语法](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Backgrounds_and_Borders/Using_multiple_backgrounds) 
![锐变效果](/img/in-post/post-css/css_1805_6.png)  

更多突破脑洞例子可以在这里看[http://lea.verou.me/css3patterns/](http://lea.verou.me/css3patterns/) 

### 径向渐变（radial-gradient）
radial gradient其实就是颜色从一个点以同心圆或者椭圆向外渐变。
![原理实现图](/img/in-post/post-css/css_1805_7.png)   
以下实例演示了最基础的从中心开始发散到周围的径向渐变，从红色开始，转为黄色，再到绿:```css
```css
    .clamp {
        background: -webkit-radial-gradient(red, yellow, green); /* Safari 5.1- 6.0 */
        background: -o-radial-gradient(red, yellow, green); /* Opera 11.6-12.0 */
        background: -moz-radial-gradient(red, yellow, green); /* Firefox 3.6-15 */
        background: radial-gradient(red, yellow, green); /* 标准语法 */
    }

``` 
![最基础的径向渐变](/img/in-post/post-css/css_1805_8.jpg)     
其最主要的参数格式为：**background: radial-gradient(shape size at position, start-color, ..., last-color);**
![参数详解](/img/in-post/post-css/css_1805_9.png)  
以下的写法效果其实都一样:
```css

    .clamp {
       .clamp-1 {
            background-image: radial-gradient(yellow, green);
        }
        .clamp-2 {
            background-image: radial-gradient(ellipse at center, yellow 0%, green 100%);
        }
        .clamp-3 {
            background-image: radial-gradient(farthest-corner at 50% 50%, yellow, green);
        }
        .clamp-4 {
            background-image: radial-gradient(ellipse farthest-corner at 50% 50%, yellow, green);
        }
    }

```   
![多种实现代码](/img/in-post/post-css/css_1805_10.png)   

有几个需要注意的点：
- size的数值不能是负数
- W3C规范规定，百分比的数值只能用于椭圆，不能用于圆形。
- position的值可以是负数

### 重复渐变（Repeating Gradients）
基本语法与上面的线性渐变和径向渐变类似，就是增加了重复的特性。
从[Can I use](https://caniuse.com/#feat=css-repeating-gradients)的数据看目前支持程度还不错，PC除了IE789都还不错，移动端排除掉远古机型Android4.0以下都红其他都可以。    
![重复渐变](/img/in-post/post-css/css_1805_11.png)   
![重复渐变](/img/in-post/post-css/css_1805_12.png)   
重复的规则简单说就是用最后一个颜色断点的位置减去第一个颜色断点位置的距离作为区间长度，不断的重复。比如repeating-linear-gradient(red 10px, blue 50px) 就相当于linear-gradient(…, red -30px, blue 10px, red 10px, blue 50px, red 50px, blue 90px, …)
```css
    div {
        width: 100px;
        height: 100px;
        margin: 10px;
        border: 1px solid blue;
        float: left;
    }

    .repeat-linear {
    background-image: repeating-linear-gradient( 45deg, white, white 10px, red 10px, red 20px);
    }
    
    .repeat-radial {
    background: repeating-radial-gradient( circle at bottom left, white, white 10px, red 10px, red 20px);
    }

```
![重复渐变](/img/in-post/post-css/css_1805_13.png)   
根据上面说的规则，这个例子里的区间长度是首尾颜色的位置之差，是20px。    
我们可以验证下，两张图里都有约7个红白条，矩形宽高均100px，对角线则是约140px，140px/7=20px，bingo！

### 参考文章
- [W3C:CSS3-gradients](https://www.w3cschool.cn/css3/css3-gradients.html)
- [runoob:CSS3-gradients](http://www.runoob.com/cssref/func-radial-gradient.html)
- [大漠](http://www.w3cplus.com/content/css3-gradient)









