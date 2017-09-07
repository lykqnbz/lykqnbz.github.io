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
**继承**在Sass中类同于css的继承，通过关键词``@extend``来继承已存在的类样式块，从而实现代码的继承。
```sass
    .btn {
    border: 1px solid #ccc;
    font-size: 14px;
    }

    .bth-first{
        color:yellow;
        @extend .btn;
    }

   -------------------------------------------------------------------------------------
    //编译后
    .btn, .btn-first{
        border: 1px solid #ccc;
        font-size: 14px;
    }
    .bth-first{
        color:yellow;
    }

```      
从示例代码可以看出，在Sass中的继承，可以继承类样式块中所有样式代码，而且编译出来的css会将选择器合并在一起，形成组合选择器。

**占位符**也是一个十分强大实用的一个功能，它可以取代以前css中的基类造成的代码冗余的情形，因为``%placeholder``声明的代码，如果不被``@extend``调用的话，不会产生任何代码。
```sass

    %exp{
        font-size:14px;   
    }
    %font{
        color:green;
    }

    .btn{
         @extend exp;
         @extend font;
    }
    .nav{
         @extend exp;

         li{
              @extend font;
         }
    }

   -------------------------------------------------------------------------------------
    //编译后
    .btn, .nav{
        font-size:14px;
    }
    .btn, .nav li{
        color:green;
    }

```
从编译出来的css代码可以看出，通过``@extend``调用的占位符，编译出来的代码会将相同的代码合并在一起。这也是我们希望看到的效果，也让你的代码变得更为干净。

![混合宏、继承和占位符](/img/in-post/post-note/sass-1709_2.jpg);

## 控制命令
##### @if
``@if``指令是一个``SassScript``，它可以根据条件来处理样式块，如果条件为**true**返回一个样式块，反之**false**返回另一个样式块。在Sass中除了``@if``，还可以配合``@else if``和``@else``一起使用。
假设要控制一个元素隐藏或显示，我们就可以定义一个混合宏，通过``@if...@else...``来判断传进参数的值来控制**display**的值。如下所示：
```sass
    @mixin hidden($tf:true) {
    @if $tf {
        @debug "$tf is #{$tf}";
        display: block;
        }
    @else {
        @debug "$tf is #{$tf}";
        display: none;
        }
    }

    .block {
    @include hidden;
    }

    .hidden{
    @include hidden(false);
    }

   -------------------------------------------------------------------------------------
    //编译后
    .block {
        display: block;
    }

    .hidden {
        display: none;
    }   

```

##### @for
对于**for**循环而言，在Sass中有两种方式来书写，其实就类似于大于号和大于等于号的区别:   
```sass  

    @for $i from <start> through <end>      
    @for $i from <start> to <end>     

```
用法也和其他变成语言的**for**循环类同，简单举个列子：
```sass

    $grid-prefix: span !default;
    $grid-width: 60px !default;
    $grid-gutter: 20px !default;

    %grid {
        float: left;
        margin-left: $grid-gutter / 2;
        margin-right: $grid-gutter / 2;
    }
    @for $i from 1 through 4 {
        .#{$grid-prefix}#{$i}{
            width: $grid-width * $i ;
            @extend %grid;
        }  
    }

   -------------------------------------------------------------------------------------
    //编译后
    .span1, .span2, .span3, .span4 {
         float: left;
         margin-left: 10px;
         margin-right: 10px;
    }

    .span1 {
         width: 60px;
    }

    .span2 {
         width: 120px;
    }

    .span3 {
         width: 180px;
    }

    .span4 {
         width: 240px;
    }

```

##### @while
``@while``指令也需要SassScript表达式，并且会生成不同的样式块，直到表达式值为**false**时停止循环。这个和``@for``指令很相似，只要``@while``后面的条件为**true**就会执行。
```sass 

$types: 4;
$type-width: 20px;

@while $types > 0 {
    .while-#{$types} {
        width: $type-width + $types;
    }
    $types: $types - 1;
}

   -------------------------------------------------------------------------------------
    //编译后
    .while-4 {
       width: 24px;
    }

    .while-3 {
       width: 23px;
    }

    .while-2 {
       width: 22px;
    }

    .while-1 {
       width: 21px;
    }
```

##### @each
**each**循环就是去遍历一个列表，然后从列表中取出对应的值，循环指令的形式如下：
```sass

    @each $var in <list>

```
``<list>``就像一个数组，%var从头开始遍历这个数组，每遍历一个数，就执行一次样式块，实例如下：
```sass

    $list: 1 2 3;

    @mixin add-num{
        @each $num in $list {
            .photo-#{$num} {
                background: url("/images/#{$num}.png");
            }
        }
    }
    .nav{
        @include add-num;
    }
   -------------------------------------------------------------------------------------
    //编译后
    .nav .photo-1 {
         background: url("/images/avatars/1.png"); 
    }
    .nav .photo-2 {
         background: url("/images/avatars/2.png"); 
    }
    .nav .photo-3 {
         background: url("/images/avatars/3.png"); 
    }

```

