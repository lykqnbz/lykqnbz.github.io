---
layout:     post
title:      "伪元素content的应用"
subtitle:   " "
date:       2018-03-03 11:29:21
author:     "AXiang"
header-img: "img/post-bg-css.jpg"
catalog:  true
tags:
    - 前端
    - Css
---

> “没有引言”

### Go
日常开发中,一般会用到一些伪类如:before，:after来实现一些效果，比如:用于尾部追加边距和前部插入icon
![:after和:before](/img/in-post/post-css/css_1803_1.png)     
通常我们使用contend只是追加一些字符串，事实上，content属性不仅仅支持字符串，也支持一些内置的css方法。   
使用content: attr(XXXX)可以实现HTML与CSS的“通讯”，使得伪元素能读取当前元素的属性。看以下例子    
![绿帽样式](/img/in-post/post-css/css_1803_2.png)   
```html

     <span class="NTR" data-content="绿帽样式">绿帽样式</span>

```
```css

    .NTR {
        position: relative;
        display: inline-block;
        font-size: 50px;
        color: #666;
        overflow: hidden;
        white-space: pre;
    }

    .NTR:before {
        display: block;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        content: attr(data-content);      
        overflow: hidden;
        color: green;
        height: 50%;
    }

```

![尾部留空](/img/in-post/post-css/css_1803_3.png)     
在图中，要实现多行文本的自动截断，而却设计上还在第二行末尾增加了一个小箭头，没办法使用简单粗暴的flex-box的-webkit-line-clamp:2来搞定。 这时就可以用伪元素了。具体实现上，before和after均通过content获取文本，before展示前两行，而after则通过padding-right与text-indent的配合，给箭头腾了个空位。







