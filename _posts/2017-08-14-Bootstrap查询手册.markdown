---
layout:     post
title:      "Bootstrap查询手册"
subtitle:   "　"
date:       2017-08-14 09:11:52
author:     "AXiang"
header-img: "img/post-bg-note.jpg"
catalog:  true
tags:
    - 前端
    - Bootstrap
    - 笔记
---

> “预编译Bootstrap(v3.3.7)的风格设计查询手册”

### 基础引入方式

本文只讨论预编译的Bootstrap。下图是官方下载zip解压后的文件目录结构图。

![已编译的版本的文件/目录结构](/img/in-post/post-note/bootstrap-1708_1.jpg) 

可以直接本地`LINK`方式引入`css`，`JQuery`和`JS`，也可以直接使用国内的CDN：

```html

<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery.js"></script>
<script src="js/bootstrap.min.js"></script>

<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->

```
Bootstrap基于`JQuery`开发，引入`JS`前必须先引入`JQuery`。由于低版本IE兼容性的问题，建议引入`html5shiv.js`和`respond.min.js`使低版本IE兼容H5新标签和媒体查询。

以下手册只写出**关键**的CSS样式。

### 排版

##### 正标题
`<h1>`:36px　　`<h2>`:30px　　`<h3>`:24px   
`<h4>`:18px　　`<h5>`:14px　　`<h6>`:12px     
类名`.h1`~`.h6`同理

##### 副标题
h1~h3内，其大小都设置为当前字号的65%，而在h4~h6内的字号都设置为当前字号的75%。   
对应的标签和类名是：`<small>`和`.small`

##### 段落
文字大小`14px`，行高约为`20px`，颜色为深灰色`#fff`。    
对应的标签是：`<p>`

##### 强调内容
让文字突出显示，起作用为增大字号，在大于768px像素情况下字体会更大一下。
对应的类名是：`.lead`

##### 文字状态和语义状态 
单纯的css样式加粗：`<b> </b>`    　　　具有突出强调意义的加粗html标签：`<strong> </strong>`   
单纯的css样式斜体：`<i> </i>`  　　　具有突出强调意义的斜体html标签：`<em> </em>`

##### 强调相关的类
- `.text-muted`：提示，使用浅灰色（#999）
- `.text-primary`：主要，使用蓝色（#428bca）
- `.text-success`：成功，使用浅绿色(#3c763d)
- `.text-info`：通知信息，使用浅蓝色（#31708f）
- `.text-warning`：警告，使用黄色（#8a6d3b）
- `.text-danger`：危险，使用褐色（#a94442）

##### 文本对齐风格
-  `.text-left`：左对齐
-  `.text-center`：居中对齐
-  `.text-right`：右对齐
-  `.text-justify`：两端对齐

##### 列表 
``` html
<!-- 无序列表 -->
    <ul>
        <li>…</li>
    </ul>
    
<!-- 有序列表 -->
    <ol>
        <li>…</li>
    </ol>
<!-- 定义列表 -->
    <dl>
        <dt>…</dt>
        <dd>…</dd>
    </dl>
```

-  `.list-unstyled`：去点列表
-  `.list-inline`：内联列表
-  `.dl-horizontal`：水平定义列表

##### 代码风格  
- `<code></code>`来显示单行内联代码
- `<pre></pre>`来显示多行块代码
- `<kbd></kbd>`来显示用户输入代码

![三种不同代码风格样式](/img/in-post/post-note/bootstrap-1708_2.png) 

对于`<pre></pre>`风格的代码，如果代码块内内容过多，可添加`.pre-scrollable`类名使其在高度超过`340px`时出现Y轴滚动条。

##### 表格
``` html
<table>
    <thead>
        <tr>
            <th>表格标题</th>
            <th>表格标题</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>表格单元格</td>
            <td>表格单元格</td>
        </tr>
        <tr>
            <td>表格单元格</td>
            <td>表格单元格</td>
        </tr>
    </tbody>
 </table>
```
- `.table`：基础表格
- `.table-striped`：斑马线表格
- `.table-bordered`：带边框的表格
- `.table-hover`：鼠标悬停高亮的表格
- `.table-condensed`：紧凑型表格
- `.table-responsive`：响应式表格 

对于响应式表格，当浏览器可视区域小于`768px`时，表格底部会出现水平滚动条。当浏览器可视区域大于`768px`时，表格底部水平滚动条就会消失。    
对表格的行元素`<tr>`提供了五种表示不同意义颜色的类：
![5种<tr>提供的颜色类](/img/in-post/post-note/bootstrap-1708_3.jpg) 

### 表单

对应标签为`<form></form>`  
**水平风格**：标签内添加`form-horizontal`  
**内联表单**：标签内添加`form-inline`  

##### 表单控件大小

一般看到的表单控件都正常的大小，可以自定义大小，也可以是用Bootstrap提供的两个不同的类名：`.input-sm`,`.input-lg`，主要适用于`input`，`textarea`，`select`。

##### 表单控件的状态

- 焦点状态： :focus
- 禁用状态:  disabled
- 验证状态： .has-warning:警告状态（黄色）
-           .has-error：错误状态（红色）
-           .has-success：成功状态（绿色）
- 提醒状态： .help-block

焦点状态通过伪类`：focus`来实现，而禁用状态则是在表单控件上添加属性`disabled`。在制作表单时，不免要做表单验证。同样也需要提供验证状态样式，Bootstrap提供了以上3种效果。使用的时候需要在form-group容器上对应添加状态类名。而提醒状态这是在表单验证时，提供不同的提示信息。

##### icon图标
``` html

<span class="glyphiconglyphicon-warning-sign"></span>

```
所有icon都是以”glyphicon-”前缀的类名开始，然后后缀表示图标的名称。   
[Bootstrap 提供的字体图标](http://v3.bootcss.com/components/)

##### 输入框input
``` html

<input type="email" class="form-control" placeholder="Enter email">

```
添加`.form-control`使其展示bootstrap风格，初始文字提示使用`placeholder`。


##### 下拉选择框select
``` html

<form role="form">
    <div class="form-group">
        <select class="form-control">
            <option>1</option>
        </select>
    </div>
    <div class="form-group">
        <select multiple class="form-control">
            <option>1</option>
        </select>
    </div>
</form>

```
![添加multiple后的竖形效果](/img/in-post/post-note/bootstrap-1708_4.png) 

##### 文本域textarea
文本域和原始使用方法一样，设置`rows`可定义其高度，设置`cols`可以设置其宽度。但如果textarea元素中添加了类名`.form-control`类名，则无需设置`cols`属性。因为Bootstrap框架中的`.form-control`样式的表单控件宽度为100%或auto。

##### 复选框checkbox和单选择按钮radio
``` html

  <div class="radio">
    <label class="checkbox-inline">
      <input type="radio" name="optionsRadios" id="optionsRadios1" value="love" checked>
      喜欢
    </label>
  </div>
  <div class="radio">
    <label class="checkbox-inline">
      <input type="radio" name="optionsRadios" id="optionsRadios2" value="hate">
      不喜欢
    </label>
  </div>

``` 
不管是`checkbox`还是`radio`都使用`label`包起来了，`checkbox`连同`label`标签放置在一个名为`.radio`的容器内，在Bootstrap框架中，主要借助`.checkbox`和`.radio`样式，来处理复选框、单选按钮与标签的对齐方式，如果需要水平排列，只需要在`label`标签上添加类名`.checkbox-inline`。

##### 按钮

- input[type=“submit”]
- input[type=“button”]
- input[type=“reset”]
- `<button>`  
html里实现按钮主要有以上4种方式，在Bootstrap框架中的按钮都是建议采用`<button>`来实现，虽然基本是所有标签都可以是用类名`.btn`来变成一个按钮，但个人并不建议这样使用，为了避免浏览器兼容性问题，个人强烈建议使用button或a标签来制作按钮。
![按钮风格](/img/in-post/post-note/bootstrap-1708_5.jpg) 
![按钮风格](/img/in-post/post-note/bootstrap-1708_6.jpg) 

同样的按钮也可以使用类名`.btn-lg`，`.btn-sm`，`.btn-xs`来设置的大小。

##### 图像
图像在网页制作中也是常要用到的元素，在Bootstrap框架中对于图像的样式风格提供以下几种风格：

- .img-responsive：响应式图片，主要针对于响应式设计
- .img-rounded：圆角图片
- .img-circle：圆形图片
- .img-thumbnail：缩略图片
![图像样式风格](/img/in-post/post-note/bootstrap-1708_7.png) 

### 栅格系统

Bootstrap框架中的栅格系统就是将容器平分成12份。数据行`.row`必须包含在容器`.container`内。如：
``` html

<div class="container">
  <div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-8">.col-md-8</div>
  </div>
  <!-- 行内4个单位的列偏移 -->
  <div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-2 col-md-offset-4">列向右移动四列的间距</div>
    <div class="col-md-2">.col-md-3</div>
  </div>
  <!-- 行内可以进行嵌套 -->
  <div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-8">.col-md-8</div>
  </div>
</div>

``` 

在行`.row`中可以添加列`.column`，但列数之和不能超过平分的总列数**12列**。栅格系统具有响应性，对于最外边框，针对浏览器大中小屏具有不同的**断点**（像素分界点：768px、992px、1220px）。而第二边框，就是容器`.container`，针对不同浏览器分辨率，其宽度也不一样，有这几个分界点：**自动**，**750px**，**970px**，**1170px**。

栅格系统用来布局基本就是列的组合，Bootstrap提供了4种基本用法，主要是针对不同屏幕尺寸使用不同的网络样式：`.col-xs-1`，`.col-sm-1`，`.col-md-1`，`.col-lg-1`。下图是这四种样式的区别所在。
![按钮风格](/img/in-post/post-note/bootstrap-1708_8.png) 

但我们不希望相邻的两个列紧靠在一起时，可以使用**列偏移**，具体代码如上第二段所示，只需要在需要隔开的列元素上添加类名`.col-md-offset-4`，该列就会向右移动4个列的宽度。

Bootstrap框架的栅格系统还支持列的嵌套。具体代码如上第三段所示，你可以在一个列中添加一个或者多个行`.row`容器中。

###  菜单、按钮及简单导航

##### 下拉菜单
```html

<div class="dropdown">
    <!-- 父级菜单按钮 -->
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
    下拉菜单
    <!-- 三角形icon -->
    <span class="caret"></span>
    </button>
    <!-- 子级列表 -->
    <ul class="dropdown-menu"  aria-labelledby="dropdownMenu1">
        <li class="dropdown-header">第一部分菜单头部</li>
        <li><a href="#">下拉菜单项</a></li>
        <li class="divider"></li>
        <li><a href="#">下拉菜单项</a></li>
    </ul>
</div>

```

使用下拉菜单主要是看结构运用的正确与否，使用一个`.dropdown`的容器包裹整个下拉菜单元素，然后使用一个`button`按钮作为父级菜单
，并且定名类名为`.dropdown-toggle`，再加上自定义`data-toggle`属性，且值为`dropdown`，此示例为：:**data-toggle="dropdown"**， 最后就是下拉列表，使用的是ul列表，定义类名`.dropdown-menu`，以及li标签了。

这里有一些特别的拓展分享一下：
- 使用`<li class="divider">  </li>`可以形成一条下拉分割线
- 使用`<li class="dropdown-header">`可以让下拉菜单呈现一个菜单头部标题
- 使用`<li class="active">`可以设置成该li标签为当前选中状态
- 使用`<li class="disabled">`可以设置成该li标签为禁止选中状态
- 对父级菜单按钮追加一个`.dropup`类名，可以变成上拉菜单
- 对ul标签追加一个`.pull-right`类名，可以让下拉菜单相对于父级容器右对齐

下图是上述代码的实现展示：
![代码实现呈现](/img/in-post/post-note/bootstrap-1708_9.png) 

##### 按钮组
```html

<div class="btn-toolbar">
    <div class="btn-group">
        <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-fast-forward"></span></button>
        <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-step-forward"></span></button>
    </div>
    <div class="btn-group">
        <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
        <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-fast-backward"></span></button>
        <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-backward"></span></button>
    </div>
</div>

```
多个按钮组成按钮组，一些编辑器里我们常用到按钮组。实现一个按钮组只需要使用一个类名为`.btn-group`的容器，把多个按钮放到这个容器中。联动之前谈论过的图标，可以做成一个十分好看的控件。下图为一个简单的按钮组+icon组成的音乐播放器按钮组。
![音乐播放器按钮组](/img/in-post/post-note/bootstrap-1708_10.png) 

以下是按钮组的拓展：
- 组成一个由多个按钮组构成的按钮工具栏，只需将按钮组`.btn-group`按组放在一个大的容器`.btn-toolbar`中
- 按钮组默认是水平分组的，如果需要垂直分组可以把`.btn-group`替换成`.btn-group-vertical`
- 将按钮组设置为自适应分组按钮，只需要在按钮组`.btn-group`上追加一个`.btn-group-justified`类名

##### 简单导航
Bootstrap实现导航十分简单，也原生写导航一样，使用ul+li实现导航，只需在ul添加`.nav`类名即可。

简单导航的拓展：
- 对ul追加`.nav-tabs`可变成标签型导航
- 对ul追加`.nav-pills`可变成胶囊型导航
- 对ul追加`.nav-stacked`可变成垂直导航
- 对ul追加`.nav-justified`可变成自适应导航，自适应导航在视口宽度大于768px时是水平风格，下于时是垂直风格
- 使用`<li class="active">`可以设置成该li标签为当前选中状态
- 使用`<li class="disabled">`可以设置成该li标签为禁止选中状态

制作二级导航或是多级导航，只需要将li当作父容器，使用类名`.dropdown`，同时在li中嵌套另一个列表ul，使用前面介绍下拉菜单的方法就可以，而面包屑导航将ul的类名替换成`.breadcrumb`。以下是代码实现。
```html 

<ul class="nav nav-pills">
  <li class="active"><a href="##">首页</a></li>
    <li class="dropdown">
        <a href="##" class="dropdown-toggle" data-toggle="dropdown">
            教程
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
            <li><a href="##">CSS3</a></li>
            <li><a href="##">Sass</a></li>
            <li><a href="##">jQuery</a></li>
            <li><a href="##">Responsive</a></li>
        </ul>
    </li>
    <li><a href="##">关于我们</a></li>
</ul>

<!-- 面包屑导航 -->
<ul class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li><a href="#">我的书</a></li>
    <li class="active">解CSS3</li>
</ul> 

```
![简单导航各类实现](/img/in-post/post-note/bootstrap-1708_11.png) 





