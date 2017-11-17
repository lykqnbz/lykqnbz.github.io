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
    - Css
    - Bootstrap
    - 笔记
---

> “预编译Bootstrap(v3.3.7)的风格设计查询手册”

### 基础引入方式

本文只讨论预编译的Bootstrap。下图是官方下载zip解压后的文件目录结构图：

![已编译的版本的文件/目录结构](/img/in-post/post-note/bootstrap-1708_1.jpg) 

可以直接本地`LINK`方式引入`css`，`JQuery`和`JS`，也可以直接使用国内的CDN，具体如下：

```html

<link href="https://maxcdn.Bootstrapcdn.com/Bootstrap/3.3.7/css/Bootstrap.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/Bootstrap/3.3.7/js/Bootstrap.js"></script>

<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->

```
Bootstrap基于`JQuery`开发，引入`JS`前必须先引入`JQuery`。由于低版本IE兼容性的问题，建议引入`html5shiv.js`和`respond.min.js`使低版本IE兼容H5新标签和`css`的媒体查询。

以下手册只写出**关键**的css样式，还是方便自己查询。

### 排版

##### 正标题
`<h1>`:36px　　`<h2>`:30px　　`<h3>`:24px   
`<h4>`:18px　　`<h5>`:14px　　`<h6>`:12px     
类名`.h1`~`.h6`同理

##### 副标题
`h1`~`h3`内，其大小都设置为当前字号的65%，而在`h4`~`h6`内的字号都设置为当前字号的75%。   
对应的标签和类名是：`<small>`和`.small`

##### 段落
文字大小`14px`，行高约为`20px`，颜色为深灰色`#fff`。    
对应的标签是：`<p></p>`

##### 强调内容
让文字突出显示，为其增大字号，并且在大于`768px`像素情况下字体会更大。
对应的类名是：`.lead`

##### 文字状态和语义状态 
单纯的css样式加粗：`<b> </b>`    　　　具有突出强调语义的加粗html标签：`<strong> </strong>`   
单纯的css样式斜体：`<i> </i>`  　　　具有突出强调语义的斜体html标签：`<em> </em>`

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
- `.table-bordered`：带边框表格
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

一般看到的表单控件都是正常的大小，即可以自定义大小，也可以用Bootstrap提供的两个的类名：`.input-sm`和`.input-lg`，同样适用于`input`，`textarea`，`select`。

##### 表单控件的状态

- 焦点状态： :focus
- 禁用状态:  disabled自定义属性
- 验证状态： .has-warning:警告状态（黄色）
-           .has-error：错误状态（红色）
-           .has-success：成功状态（绿色）
- 提醒状态： .help-block

焦点状态通过伪类`：focus`来实现，而禁用状态则是在表单控件上添加自定义属性`disabled`。在制作表单时，不免要做表单验证。同样也需要提供验证状态样式，Bootstrap提供了以上3种效果。使用的时候需要在`.form-group`容器上对应追加状态类名。而提醒状态这是在表单验证时，提供不同的提示信息。

##### icon图标
``` html

<span class="glyphicon-warning-sign"></span>

```
所有icon都是以**glyphicon-**前缀的类名开始，然后后缀表示图标的名称。   
[Bootstrap 提供的字体图标](http://v3.bootcss.com/components/)

##### 输入框input
``` html

<input type="email" class="form-control" placeholder="Enter email">

```
添加`.form-control`使其展示Bootstrap风格，初始文字提示使用`placeholder`属性。


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
Bootstrap中的文本域和原生的文本域使用方法一样，设置`rows`可定义其高度，设置`cols`可以设置其宽度。但如果`textarea`元素中添加了类名`.form-control`类名，则无需设置`cols`属性。因为Bootstrap框架中的`.form-control`样式的表单控件宽度为100%或auto。

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
不管是`checkbox`还是`radio`都需要使用`label`标签包起来了，`checkbox`连同`label`标签放置在一个名为`.radio`的容器内，在Bootstrap框架中，主要借助`.checkbox`和`.radio`样式，来处理复选框、单选按钮与标签的对齐方式，如果需要水平排列，只需要在`label`标签上添加类名`.checkbox-inline`。

##### 按钮

- `input[type="submit"]`
- `input[type="button"]`
- `input[type="reset"]`
- `<button>`  
html里实现按钮主要有以上4种方式，在Bootstrap框架中的按钮都是建议采用`<button>`来实现，虽然基本是所有标签都可以是用类名`.btn`来变成一个按钮，但个人并不建议这样使用，为了避免浏览器兼容性问题，个人强烈建议使用`<button>`或`<a>`标签来制作按钮。
![按钮风格](/img/in-post/post-note/bootstrap-1708_5.jpg) 
![按钮风格](/img/in-post/post-note/bootstrap-1708_6.jpg) 

同样的按钮也可以使用类名`.btn-lg`，`.btn-sm`，`.btn-xs`来设置的大小。

##### 图像
图像在网页制作中也是常要用到的元素，在Bootstrap框架中对于图像的样式风格提供以下几种风格：
- `.img-responsive`：响应式图片，主要针对于响应式设计
- `.img-rounded`：圆角图片
- `.img-circle`：圆形图片
- `.img-thumbnail`：缩略图片
![图像样式风格](/img/in-post/post-note/bootstrap-1708_7.png) 

### 栅格系统

Bootstrap框架中的栅格系统十分强大，对响应式排版友好性十足，大致就是将容器平分成12份，元素根据视口大小分份。数据行`.row`必须包含在容器`.container`内。如：
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
  <!-- 响应式写法 -->
  <div class="row">
    <div class="col-md-3 col-sm-6">.col-md-4</div>
    <div class="col-md-3 col-sm-6">.col-md-8</div>
    <div class="col-md-3 col-sm-6">.col-md-4</div>
    <div class="col-md-3 col-sm-6">.col-md-8</div>
  </div>
</div>

``` 

在行`.row`中可以添加列`.col-num`，但列数之和不能超过平分的总列数**12列**。栅格系统具有响应性，对于最外边框，针对浏览器大中小屏具有不同的**断点**（像素分界点：768px、992px、1220px）。而第二边框，就是容器`.container`，针对不同浏览器分辨率，其宽度也不一样，有这几个分界点：**自动**，**750px**，**970px**，**1170px**。

栅格系统用来布局基本就是列的组合，Bootstrap提供了4种基本用法，主要是针对不同屏幕尺寸使用不同的网络样式：`.col-xs-1`，`.col-sm-1`，`.col-md-1`，`.col-lg-1`。下图是这四种样式的区别所在。
![按钮风格](/img/in-post/post-note/bootstrap-1708_8.png) 

但我们不希望相邻的两个列紧靠在一起时，可以使用**列偏移**，具体代码如上第二段所示，只需要在需要隔开的列元素上添加类名`.col-md-offset-4`，该列就会向右移动4个列的宽度。

Bootstrap框架的栅格系统还支持列的嵌套。具体代码如上第三段所示，你可以在一个列中添加一个或者多个行`.row`容器中。

对于响应式写法，如代码所示，如果当前视口为**md**范围下，则一行显示4个(3+3+3+3)，如果当前视口为**sm**范围下，则这一行显示2个(6+6)。这样来达到响应式排版。

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
，并且定名类名为`.dropdown-toggle`，再加上自定义`data-toggle`属性，且值为`dropdown`，此示例为：**data-toggle="dropdown"**， 最后就是下拉列表，使用的是`ul`列表，定义类名`.dropdown-menu`，以及`li`标签了。

以下是下拉菜单的拓展：
- 使用`<li class="divider">  </li>`可以形成一条下拉分割线
- 使用`<li class="dropdown-header">`可以让下拉菜单呈现一个菜单头部标题
- 使用`<li class="active">`可以设置成该`li`标签为当前选中状态
- 使用`<li class="disabled">`可以设置成该`li`标签为禁止选中状态
- 对父级菜单按钮追加一个`.dropup`类名，可以变成上拉菜单
- 对`ul`标签追加一个`.pull-right`类名，可以让下拉菜单相对于父级容器右对齐

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
多个按钮一起组成按钮组，在一些编辑器里我们常用到按钮组。实现一个按钮组只需要使用一个类名为`.btn-group`的容器，把多个按钮放到这个容器中。联动之前谈论过的图标，可以做成一个十分好看的控件。下图为两个按钮组+icon组成的编辑按钮组。
![编辑按钮组](/img/in-post/post-note/bootstrap-1708_10.png) 

以下是按钮组的拓展：
- 组成一个由多个按钮组构成的按钮工具栏，只需将按钮组`.btn-group`按组放在一个大的容器`.btn-toolbar`中
- 按钮组默认是水平分组的，如果需要垂直分组可以把`.btn-group`替换成`.btn-group-vertical`
- 将按钮组设置为自适应分组按钮，只需要在按钮组`.btn-group`上追加一个`.btn-group-justified`类名

##### 简单导航
Bootstrap实现导航十分简单，和原生写导航的方式一样，使用`ul`+`li`实现导航，只需在`ul`添加`.nav`类名即可。

简单导航的拓展：
- 对`ul`追加`.nav-tabs`可变成标签型导航
- 对`ul`追加`.nav-pills`可变成胶囊型导航
- 对`ul`追加`.nav-stacked`可变成垂直导航
- 对`ul`追加`.nav-justified`可变成自适应导航，自适应导航在视口宽度大于`768px`时是水平风格，小于则是垂直风格
- 使用`<li class="active">`可以设置成该`li`标签为当前选中状态
- 使用`<li class="disabled">`可以设置成该`li`标签为禁止选中状态

制作二级导航或是多级导航，只需要将`li`当作父容器，使用类名`.dropdown`，同时在li中嵌套另一个列表`ul`，使用前面介绍下拉菜单的方法就可以，而面包屑导航将`ul`的类名替换成`.breadcrumb`。以下是代码实现。
```html 

<ul class="nav nav-pills">
  <li class="active"><a href="##">首页</a></li>
    <li class="dropdown">
        <a href="##" class="dropdown-toggle" data-toggle="dropdown">
            教程
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
            <li><a href="##">Css3</a></li>
            <li><a href="##">Sass</a></li>
            <li><a href="##">JQuery</a></li>
            <li><a href="##">Responsive</a></li>
        </ul>
    </li>
    <li><a href="##">关于我们</a></li>
</ul>

<!-- 面包屑导航 -->
<ul class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li><a href="#">我的书</a></li>
    <li class="active">解css3</li>
</ul> 

```
![简单导航各类实现](/img/in-post/post-note/bootstrap-1708_11.png) 

### 导航条、分页导航
##### 导航条
导航条(navbar)和上面介绍的导航(nav)，其实在Bootstrap中还是明显的区别。在导航条中有一个背景色、而且可以是纯链接，也可以有表单一起结合等多种形式。

同样的，一个导航条的构成是由使用类名`.navbar`和`.navbar-default`的容器，包含一个`ul`列表`<ul class=”nav”>`基础上添加类名`.navbar-nav`。

导航条的拓展：
- 给导航条容器追加`.navbar-fixed-top`或`.navbar-fixed-bottom`类名，可设置导航条绝对定位在视口顶部或者底部
- 设置一个与列表`ul`同级类名为`.navbar-header`的容器，该容器内设置一个类名为`."navbar-bran`的a标签，可形成导航条标题
- 设置一个与列表`ul`同级类名为`.navbar-form`的表单容器，该容器内可以添加表单控件
- 将导航条容器的`.navbar-deafult`替换成`.navbar-inverse`可形成反色导航条
- 而多级导航写法和上述的方式一样

对于我们常用的响应式导航条，在宽屏情况下和正常导航条无差别，但在窄屏情况下列表会折叠起来，通过点击图标来形成下拉导航，具体代码如下所示，首先是图标样式的**固定写法**：
```html

<button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".类名/#id名">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
</button>

```
其中自定义属性`data-target`的值是根据折叠列表中自定义的类名或是id名来确定。而折叠列表代码必须包裹在一个以`.collapse`和`.navbar-collapse`为类名的`div`内，并且为这个`div`添加一个自定义的class类名或者id名。
```html

<div class="navbar navbar-default" >
  <div class="navbar-header">
     　<!-- .navbar-toggle样式用于toggle收缩的内容，即nav-collapse collapse样式所在元素 -->
       <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".w666">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
       </button>
       <!-- 确保无论是宽屏还是窄屏，导航条标题都显示 -->
       <a href="##" class="navbar-brand">Warcraft</a>
  </div>
  <!-- 屏幕宽度小于768px时，div.navbar-responsive-collapse容器里的内容都会隐藏，显示icon图标，当点击icon图标时，再展开。屏幕大于768px时，默认显示。 -->
  <div class="collapse navbar-collapse w666">
    	<ul class="nav navbar-nav">
      		<li class="active"><a href="##">网站首页</a></li>
      		<li><a href="##">测试标题</a></li>
      		<li><a href="##">测试标题</a></li>
      		<li><a href="##">测试标题</a></li>
      		<li><a href="##">测试标题</a></li>
	 	</ul>
         <form action="##" class="navbar-form navbar-left" rol="search">
            <div class="form-group">
                  <input type="text" class="form-control" placeholder="请输入关键词" />
            </div>
            <button type="submit" class="btn btn-default">搜索</button>
     </form>
  </div>
</div>

```
![响应式导航条](/img/in-post/post-note/bootstrap-1708_12.png) 

##### 分页导航

分页导航几乎在哪个网站都可见。好的分页导航能给用户带来更好的用户体验。在Bootstrap中提供了两种分页导航：**带页码的分页导航**和**带翻页的分页导航**。两者都是有`ul`列表和`li`标签组成。

首先是**带页码的分页导航**在`ul`标签上加入`.pagination`类名即可，而**带翻页的分页导航**则是加上`.pager`。两种分页导航通常和当前活动状态`.active`和禁止状态`.disabled`一起组合使用。
```html

    <!--页码分页-->
    <ul class="pagination ">
        <li><a href="#">&laquo;第一页</a></li>
        <li><a href="#">12</a></li>
        <li class="active"><a href="#">13</a></li>
        <li><a href="#">14</a></li>
        <li class="disabled"><a href="#">最后一页&raquo;</a></li>
    </ul>   
    <!--翻页分页-->
    <ul class="pager">
        <li><a href="#">&laquo;上一页</a></li>
        <li><a href="#">下一页&raquo;</a></li>
    </ul> 
    <!--左右对齐-->
    <ul class="pager">
        <li class="previous"><a href="#">&laquo;上一页</a></li>
        <li class="next"><a href="#">下一页&raquo;</a></li>
    </ul> 

```
![两种分页导航](/img/in-post/post-note/bootstrap-1708_13.png) 

##### 徽章效果
![徽章效果实例](/img/in-post/post-note/bootstrap-1708_14.jpg) 
在一些Web页面中常常会添加一个类似徽章的标签用来告诉用户一些额外的信息。
```html

<!-- 矩形徽章 -->
<span class="label label-success">矩形徽章标签</span>
<!-- 带圆角矩形徽章 -->
<span class="badge">带圆角矩形徽章</span>

```
给两种徽章样式额外添加`style="vertical-align:super; font-size:10px;`的样式可以控制字体大小和位置。

### 其它内置组件
##### 缩略图栏目类
缩略图在网站中最常用的地方就是产品列表页面，Bootstrap可以通过栅格系统配合`.thumbnail`样式来实现。
```html

<div class="container">
    <div class="row">
        <div class="col-xs-6 col-md-3">
            <a href="#" class="thumbnail">
              <img  src="images.png" >
            </a>
            <div class="caption">
                <h3>Bootstrap缩略图栏目类</h3>
                <p>Bootstrap框架是一个优秀的前端框，就算您是一位后端程序员或者你是一位不懂设计的前端人员，你也能依赖于Bootstrap制作做优美的网站...</p>
                <p>
                    <a href="##" class="btn btn-primary">开始学习</a>
                    <a href="##" class="btn btn-primary">正在学习</a>
                </p>
            </div>  
        </div>
        <div class="col-xs-6 col-md-3">
        ………………
        </div>
        <div class="col-xs-6 col-md-3">
        ………………
        </div>
        <div class="col-xs-6 col-md-3">
        ………………
        </div>
    </div>
</div>

```
这里的栅格系统表示的`.col-num`是在大屏幕的时候一行4个(3+3+3+3=12)，小屏幕的时候一行2个(6+6=2)，在单位栅格内把图片用带有`.thumbnail`类名的`a`标签包裹起来，可变成带边框的略缩图样式图片，把标题、文本描述和按钮等内容放在一个名为`.caption`的`div`容器内，这个容器和`a`标签同级。

![缩略图栏目](/img/in-post/post-note/bootstrap-1708_15.png) 

##### 警告框
同样是经典的4色样式：
- 表示成功信息的绿色`.alert-success`类
- 表示提示信息的蓝色`.alert-info`类
- 表示警告信息的黄色`.alert-warning`类
- 表示错误信息的红色`.alert-danger`类
- 需要关闭按钮可追加`.alert-dismissable`类

```html

<div class="alert alert-info alert-dismissable" role="alert">
    <button class="close" type="button" data-dismiss="alert">&times;</button>
    请输入正确的密码
</div>

```
![警告框](/img/in-post/post-note/bootstrap-1708_16.png) 

如果不需要右侧的关闭按钮，可以将`button`和`.alert-dismissable`删除即可。

##### 进度条
用类名为`.progress`的容器包裹一个类名为`.progress-bar`的`div`标签，即可构成一个基本进度条     
以下是进度条的拓展：
- 在div标签追加`.progress-bar-success`表示成功进度条，进度条颜色为绿色
- 在div标签追加`.progress-bar-info`表示信息进度条，进度条颜色为蓝色
- 在div标签追加`.progress-bar-warning`表示警告进度条，进度条颜色为黄色
- 在div标签追加`.progress-bar-danger`表示错误进度条，进度条颜色为红色
- 给容器标签追加`.progress-striped`可变成条纹进度条
- 在容器标签有`.progress`和`.progress-striped`的基础下，追加`.active`类名可变成动态条纹进度条
- 在容器内添加多个进度条标签可形成层叠进度条，多个进度条占比相加不能超过100%

```html

    <!--基础进度条-->
<div class="progress">
    <div class="progress-bar" style="width:50%">50%</div>
</div> 
    <!--彩色进度条-->
<div class="progress">
    <div class="progress-bar progress-bar-success" style="width:50%">50%</div>
</div> 
    <!--条纹进度条-->
<div class="progress progress-striped">
    <div class="progress-bar progress-bar-success" style="width:40%"></div>
</div>
    <!--动态进度条-->
<div class="progress progress-striped active">
    <div class="progress-bar progress-bar-success" style="width:40%"></div>
</div> 
    <!--层叠进度条-->
<div class="progress">
    <div class="progress-bar progress-bar-success" style="width:20%"></div>
    <div class="progress-bar progress-bar-info" style="width:10%"></div>
    <div class="progress-bar progress-bar-warning" style="width:30%"></div>
    <div class="progress-bar progress-bar-danger" style="width:15%"></div>
</div> 

```
![各类进度条](/img/in-post/post-note/bootstrap-1708_17.png) 

##### 列表组
列表组是Bootstrap新增的一个组件，可以用来制作列表清单、垂直导航等效果，也可以配合其他的组件制作出更漂亮的组件。主要包含以下两个部分：     
- `.list-group`：列表组容器，常用的是`ul`元素，当然也可以是`ol`或者`div`元素
- `.list-group-item`：列表项，常用的是`li`元素，当然也可以是`div`元素    

在列表项内可以添加徽章样式，只需要在列表项内添加`<span class="badge">456</span>` 。列表项也是可以有当前状态`.active`和禁用状态`.disabled`的。给列表项追加`.list-group-item-success`等样式可以制作彩色列表项。

##### 面板
面板也是Bootstrap新增的一个组件其主要作用就是用来处理一些其他组件无法完成的功能。基础面板非常简单，就是一个`div`容器运用了`.panel`样式，产生一个具有边框的文本显示块。由于`.panel`不控制主题颜色，所以在`.panel`的基础上增加一个控制颜色的主题`.panel-default`，在这个容器内主要有以下几个主体：
- `.panel-body`:用来放置面板主体内容
- `.panel-heading`：用来设置面板头部样式
- `.panel-footer`：用来设置面板尾部样式

一般情况下可以把面板理解为一个区域，在使用面板的时候，都会在`.panel-body`放置需要的内容，可能是图片、表格或者列表等。
```html

<div class="panel panel-default">
    <div class="panel-heading">标题</div>
    <div class="panel-body">基础面板
        <p></p>
        <table></table>
        <ul class="list-group">
            <li class="list-group-item"></li>
            <li class="list-group-item"></li>
        </ul>
    </div>
    <div class="panel-footer">作者：阿翔</div>
</div>

```
除了默认的主题样式之外，还包括以下几种主题样式，构成了一个彩色面板：
- `.panel-default`：默认灰
- `.panel-primary`：重点蓝
- `.panel-success`：成功绿
- `.panel-info`:信息蓝
- `.panel-warning`：警告黄
- `.panel-danger`：危险红

### 模态弹窗
Bootstrap框架中的模态弹出框，分别运用了`.modal`、`.modal-dialog`和`.modal-content`样式，而弹出窗真正的内容都放置在`.modal-content`中，其主要又包括三个部分：
- 弹出框头部，一般使用`.modal-header`表示，主要包括标题和关闭按钮
- 弹出框主体，一般使用`.modal-body`表示，弹出框的主要内容
- 弹出框脚部，一般使用`.modal-footer`表示，主要放置操作按钮

实现方法有2种，一是通过`button`标签，二是通过`a`标签。     
`button`标签方法：只需要给`button`添加自定义两个必要的属性：`data-toggle="modal"`和`data-target="#xxx或者.xxx"`，`data-target`的值取决于模态弹出窗容器的id值或是唯一类名。
`a`标签方法：使用链接元素自带的`href`属性替代`data-target`属性，加上`data-toggle="modal"`即可
详细看如下代码构成：
```html

<!-- data-target触发模态弹出窗元素 -->
<button data-toggle="modal" data-target="#C999" class="btn btn-primary" type="button">通过data-target触发</button>
<!-- href触发模态弹出窗元素 -->
<a data-toggle="modal" href="#C999" class="btn btn-primary">通过链接href属性触发</a>

<!-- 模态弹出窗内容 -->
<!-- 增加类名fade为模态弹出框增加一个过渡动画效果 -->
<div class="modal fade" id="C999" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">模态弹出窗标题</h4>
        </div>
        <div class="modal-body">
            <p>模态弹出窗主体内容</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">保存</button>
        </div>
        </div>
    </div>
</div>

```
![模态弹出窗](/img/in-post/post-note/bootstrap-1708_18.png) 

### 实例     

- [仿了一个网站](http://wangxiang.vip/practice-bootstrap/)

### 结束语
断断续续写了两周，主要方便自己日后查询以及复习一遍（忘得差不多了），虽然Bootstrap很好用，但是不能太过依赖，应该多去了解Bootstrap里的各类样式的逻辑和设计理念，融合进自己的代码风格里才是王道。
