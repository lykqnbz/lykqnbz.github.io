---
layout:     post
title:      "Sass初体验"
subtitle:   "　"
date:       2017-08-30 11:11:20
author:     "AXiang"
header-img: "img/post-bg-note.jpg"
catalog:  true
tags:
    - 笔记
    - Sass
    - 前端
---

> “Sass 是一门高于 CSS 的元语言，它能用来清晰地、结构化地描述文件样式，有着比普通 CSS 更加强大的功能。Sass 能够提供更简洁、更优雅的语法，同时提供多种功能来创建可维护和管理的样式表。”

## 关于安装
在Ruby Command环境下：
- 安装 Sass：`gem install sass`
- 查看 Sass：`sass -v`
- 更新 Sass：`gem update sass`
- 卸载 Sass：`gem uninstall sass`

## 关于编译
单文件编译：
```sass 

    sass style.scss:style.css

```
整个文件夹内全部编译：

```sass 

    //命令表示将Sass文件夹中所有.scss(.sass)文件编译成.css文件，并将这些css文件放在css文件夹中
    sass sass/:css/

```
开启``watch``功能，这样只要你的代码进行任保修改，都能自动监测到代码的变化，并且给你直接编译出来
```sass

    sass --watch style.scss:style.css

```
四种编译风格，在编译的时候追加带上参数“ --style XXXXX”:
![四种编译风格](/img/in-post/post-note/sass-1709_1.png) 

## 基本特性
##### 变量
普通变量：``$color:red;``     
默认变量：``$color:yellow !default;``     
普通变量就是普通变量，默认变量通俗的讲如果这个变量已经被赋值，则不会再次赋值，但是如果还没有被赋值，就会被指定一个默认值，就是这个默认变量。     
变量都有作用域，没有被任何选择器、函数、混合宏……包含的定义变量为全局变量，被包含了就为该范围内的局部变量。
```sass

    $color: red !default;
    .div-1 {
    background: $color;

        $color: green;
        .div-2{
            background: $color;
        }
    }

```
上述代码表示的是一个红色容器包含着一个绿色容器。

##### 嵌套
嵌套是Sass的一个特色，可以让你的结构层次显得更加清晰。但是这也是Sass一个诟病，无节制的嵌套使你的层级越来越深，导致后期维护及其麻烦。Sass 的嵌套分为三种：
- 选择器嵌套
- 属性嵌套
- 伪类嵌套
例如我们有如下结构：       
 
```html

    <header>
        <nav class="nav">
            <a href=“##”>My</a>
            <a href=“##”>Her</a>
            <a href=“##”>His</a>
        </nav>
    <header>

```
在Sass中，使用选择器嵌套来实现：
```html

    header {
        nav {
            color: red;
            a {
              color:green;
            }
        }  
    }

```    
实现样式属性的嵌套：   
```html

    .nav {
        border: {
            top: 1px solid red;
            bottom: 1px solid green;
        }
    }

```     
实现伪类的嵌套： 
```html

    .nav{
        &:before,
        &:after {
            clear:both;
            overflow: hidden;
        }
    } 

```     

##### 混合宏、继承、占位符
当你的样式变得越来越复杂，需要重复使用大段的样式时，使用变量就无法达到我们目了。这个时候Sass中的混合宏、继承和占位符功能就会变得非常有意义。    
**混合宏**就类似于函数，可以带参数，不带参数或是带默认参数。使用``@mixin``来声明混合宏，使用``@include``来调用混合宏：
```sass
    //不带参
    @mixin border-radius{
        border-radius: 5px;
    }
    //带参数
    @mixin border-radius($num){
        border-radius: $num;
    }
    //带默认参数
    @mixin border-radius($num:5px){
        border-radius: $num;
    }
    
   -------------------------------------------------------------------------------------
    
    //调用混合宏,
    button {
        @include border-radius;
        @include border-radius(10px);
    }
```