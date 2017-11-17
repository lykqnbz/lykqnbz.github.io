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
    - Css
    - Sass
    - 前端
---

> “Sass 是一门高于 CSS 的元语言，它能用来清晰地、结构化地描述文件样式，有着比普通 CSS 更加强大的功能。Sass 能够提供更简洁、更优雅的语法，同时提供多种功能来创建可维护和管理的样式表。”

## 关于安装
在**Ruby Command**环境下：
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
四种编译风格，在编译的时候追加参数“ --style XXXXX”:
![四种编译风格](/img/in-post/post-note/sass-1709_1.png) 

## 基本特性
##### 变量
普通变量：`$color:red;`     
默认变量：`$color:yellow !default;`     
普通变量就是普通变量，默认变量通俗的讲就是，如果这个变量已经被赋值，则不会再次赋值，但是如果还没有被赋值，就会被指定一个默认值。     
如果变量需要镶嵌在字符串之中，就必须需要写在**#{}**之中，例如：
```sass

    $side : left;
    .rounded {
       border-#{$side}-radius: 5px;
    }

```
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

例如有如下结构：       
 
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
**混合宏**就类似于函数，可以带参数，不带参数或是带默认参数。使用`@mixin`来声明混合宏，使用`@include`来调用混合宏：
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
**继承**在Sass中类同于css的继承，通过关键词`@extend`来继承已存在的类样式块，从而实现代码的继承。
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

**占位符**也是一个十分强大实用的一个功能，它可以取代以前css中的基类造成的代码冗余的情形，因为`%placeholder`声明的代码，如果不被`@extend`调用的话，不会产生任何代码。
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
从编译出来的css代码可以看出，通过`@extend`调用的占位符，编译出来的代码会将相同的代码合并在一起。这也是我们希望看到的效果，也让你的代码变得更为干净。

![混合宏、继承和占位符](/img/in-post/post-note/sass-1709_2.jpg);

## 控制命令
##### @if
``@if``指令是一个``SassScript``，它可以根据条件来处理样式块，如果条件为**true**返回一个样式块，反之**false**返回另一个样式块。在Sass中除了``@if``，还可以配合`@else if`、`@if not`和`@else`一起使用。
假设要控制一个元素隐藏或显示，我们就可以定义一个混合宏，通过`@if...@else...`来判断传进参数的值来控制**display**的值。如下所示：
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
`@while`指令也需要`SassScript`表达式，并且会生成不同的样式块，直到表达式值为**false**时停止循环。这个和``@for``指令很相似，只要``@while``后面的条件为**true**就会执行。
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
``<list>``就像一个数组，`%var`从头开始遍历这个数组，每遍历一个数，就执行一次样式块，实例如下：
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

## Sass函数
- **字符串函数-unquote()函数**：主要是用来删除字符串最外层的单双引号，如果这个字符串没有带引号，将返回原始的字符串
- **字符串函数-quote()函数**：主要用来给字符串添加双引号。如果字符串，自身带有引号会统一换成双引号。字符串中间有引号或者空格时，需要用单双引号括起，否则编译的时候将会报错
- **字符串函数-To-upper-case()和To-lower-case()函数**：主要用来将字符串小写字母与大写字母之间的互相转换
- **数字函数-percentage()**：将一个不带单位的数字或运算式转换成百分比形式
- **数字函数-round()函数**：将一个数或运算式四舍五入为一个最接近的整数，四舍五入
- **数字函数-ceil()函数**：将一个数或运算式转换成最接近于自己且大于等于自己的整数，向上取整
- **数字函数-floor()函数**：将一个数或运算式转换成最接近于自己且小于等于自己的整数，向下取整
- **数字函数-abs()函数**：会返回一个数的绝对值
- **数字函数-min()函数和max()函数**：在多个数之中找到最小或最大的一个，这个函数可以设置任意多个参数，但不能出现两种不同类型的单位
- **数字函数-random()函数**：用来获取一个随机数，默认是0-1的随机数
- **列表函数-length()函数**：用来返回一个列表中有几个值，列表参数之间使用空格隔开
- **列表函数-nth()函数**：函数用来指定列表中某个位置的值。eg:`nth(10px 20px 30px,2)`编译后为``20px``，位置值必须大于0的整数
- **列表函数-join()函数**：将两个(只能两个)列表连接合并成一个列表。eg: `join(10px 20px,30px)`编译后为`(10px 20px 30px)`，在参数后添加`comma`或是`space`可指定数值之间用逗号还是空格隔开，eg：`join(10px 20px,30px,comma)`编译后为`(10px,20px,30px)`
- **列表函数-zip()函数**：将多个列表值转成一个多维的列表，类似于线性代数相乘，但每个单一的列表个数值必须是相同的。eg：`zip(A B,C D)`编译后`(A C,B D)`
- **列表函数-index()函数**：类似于索引函数一样，让你找到某个值在列表中所处的位置，在Sass中第一个值的索引为1，eg：`index(1px solid red,solid)`编译后`2`。如果指定的值不在列表中，那么返回的值将是false
- **判断函数-type-of() 函数**：主要用来判断一个值是属于什么类型：number 为数值型，string 为字符串型，bool 为布尔型，color 为颜色型
- **判断函数-unit()函数**：主要是用来获取一个值或是运算式所使用的单位，碰到复杂的计算时，其能根据运算得到一个**多单位组合**的值，不过只充许乘、除运算，加减运算除px与cm，mm运算之外，均会报错
- **判断函数-unitless()函数**：用来判断一个值是否带有单位，如果不带单位返回的值为true，带单位返回的值为false
- **判断函数-comparable()函数**：用来判断两个数是否可以进行加，减以及合并。如果可以返回的值为true，如果不可以返回的值是false
- **自定义函数-@function**：**@function**起头，后跟方法名和参数，样式和`JS`中类似，返回指令使用**@return**
- **Maps和颜色函数**：Maps类似于数组，以键值对的形式出现，和**Json**的的格式类似，所包含的函数方法有：取数组内的键和值，数组内的运算，调位等，而颜色函数就略显复杂，包含一些颜色的透明度，饱和度，灰度，基色等调整(大家好，我是前端里的配色师)，这里不一一叙述。参考网上代码自己优化写了一个七色卡的实例：     

```html
    <!-- html结构 -->
    <ul class="swatches red">
        <li></li>
        ···共21个···
        <li></li>
    </ul>
    <ul class="swatches orange">
        ······
    </ul>
    <ul class="swatches yellow">
        ······
    </ul>
    <ul class="swatches green">
        ······
    </ul>
    <ul class="swatches blue">
        ······
    </ul>
    <ul class="swatches purple">
        ······
    </ul>

```
```sass
    //Sass代码

    //定义变量
    $redBase: #DC143C;
    $orangeBase: saturate(lighten(adjust_hue($redBase, 39), 5), 7);//#f37a16
    $yellowBase: saturate(lighten(adjust_hue($redBase, 64), 6), 13);//#fbdc14
    $greenBase: desaturate(darken(adjust_hue($redBase, 102), 2), 11);//#73c620
    $blueBase: saturate(darken(adjust_hue($redBase, 201), 2), 1);//#12b7d4
    $purpleBase: saturate(darken(adjust_hue($redBase, 296), 2), 1);//#a012d4
    $blackBase: #777;
    $bgc: #fff;

    //定义列表
    $list:(
        red:$redBase,
        orange:$orangeBase,
        yellow:$yellowBase,
        green:$greenBase,
        blue:$blueBase,
        purple:$purpleBase,
        black:$blackBase
    );

    //定义颜色变暗的 mixin
    @mixin swatchesDarken($color) {
    @for $i from 1 through 10 {
        $x:$i+11;
        li:nth-child(#{$x}) {
            $n:$i*5;
            $bgc:darken($color,$n); //颜色变暗
            background-color: $bgc;

            &:hover:before { //hover状态显示颜色编号
                content: "#{$bgc}";
                color: lighten($bgc,40);
            }
        }
    }
    }

    //定义颜色变亮的 mixin
    @mixin swatchesLighten($color) {
    @for $i from 1 through 10 {
        $x:11-$i;
        li:nth-child(#{$x}) {
            $n:$i*5;
            $bgc:lighten($color,$n);
            background-color: $bgc;

            &:hover:before {
                content: "#{$bgc}";
                color: darken($bgc,40);
            }
        }
    }
    }
    //类举方法
    @mixin class{
        @each $key,$vaule in $list{
        ul.#{$key}{
                @include swatchesLighten($vaule);
                @include swatchesDarken($vaule);
                li:nth-child(11) {
                background-color: $vaule;
            }
        }
        }
    }

    .swatches li {    
        width: 4.7619047619%;
        float: left;
        height: 60px;
        list-style: none outside none;
    }
    .swatches li:hover::before{
        font-family: verdana;
        font-size: 10px;
        padding: 2px;
        line-height: 60px;
    } 
    @include class;

```
编译后的css代码约1000行，这里就不贴出来了，贴一下七色卡的效果图。
![七色卡的效果图](/img/in-post/post-note/sass-1709_3.png);

## @规则
Sass支持所有css3的@规则，以及一些Sass专属的规则。
- **@import**：不仅能引入css文件，还能引入 SCSS 和 Sass 文件
- **@media**：和css3的使用规则一样的简单
- **@extend**：扩展选择器或占位符，使用方法上述有提过
- **@at-root**：当你选择器嵌套多层之后，想让某个选择器跳出，此时就可以使用**@at-root**，写在选择器之前
- **@debug**：当你的在Sass的源码中使用了**@debug**指令后，Sass代码在编译出错时，在命令终端会输出你设置的提示Bug
- **@warn**：功能和**@debug**类似，优先级不同 
- **@error**：功能和**@debug**类似，优先级不同 