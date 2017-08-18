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

##### 正标题：
`<h1>`:36px　　`<h2>`:30px　　`<h3>`:24px   
`<h4>`:18px　　`<h5>`:14px　　`<h6>`:12px     
类名`.h1`~`.h6`同理

##### 副标题：  
h1~h3内，其大小都设置为当前字号的65%，而在h4~h6内的字号都设置为当前字号的75%。   
对应的标签和类名是：`<small>`和`.small`

##### 段落：  
文字大小`14px`，行高约为`20px`，颜色为深灰色`#fff`。    
对应的标签是：`<p>`

##### 强调内容：
让文字突出显示，起作用为增大字号，在大于768px像素情况下字体会更大一下。
对应的类名是：`.lead`

##### 文字状态和语义状态： 
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
**无序列表**
``` html
    <ul>
        <li>…</li>
    </ul>
```
**无序列表**
``` html
    <ol>
        <li>…</li>
    </ol>
```
**定义列表**
``` html
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

