---
layout:     post
title:      "伪元素content的应用"
subtitle:   " "
date:       2018-10-03 11:29:21
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
在图中，要实现多行文本的自动截断，而却设计上还在第二行末尾增加了一个单独icon，没办法使用简单粗暴的flex-box的-webkit-line-clamp:4来搞定。 这时就可以用伪元素了。具体实现上，before和after均通过content:attr()获取文本，before展示前三行，而after则通过padding-right与text-indent的配合，给icon腾了个空位。以下为具体实现代码:
```html

    <div class="clamp" data-tt="一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十">
        <div class="expand-box">
            一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十
            <i class="icon-toggle"></i>
        </div>
    </div>

```
```css
        .clampClick{
            /* position: relative; */
            width: 400px;
            border: 1px solid #999;
        }
        .clamp {
            position: relative;
            max-height: 80px;
            /*用像素表示，不要用em，以免造成不同浏览器下计算出现小数点取舍不同导致1像素的差距【行高*截取行数】 这是里4*20=60px */
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
            /*强制打散字符*/
            line-height: 20px;
            color: #fff;
            /*同背景色*/
        }

        .clamp::before {
            display: block;
            z-index: 3;
            /*显示在最上面，展示前面的(截取行数-1)行字符*/
            max-height: 60px;
            /*根据行高和截取行数调整，值为[(截取行数-1)*行高]  这是里(4-1)*20=60px */
            overflow: hidden;
            background-color: #fff;
            /*同背景色*/
            
            color: green !important;
        }

        .clamp::after {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-line-clamp: 4;
            /*截取行数*/
            text-indent: -9em;
            /*行首缩进字符数，值为[-(截取行数-1)*尾部留空字符数]，取负值把每行多padding-right的部分给缩进回去  这是里-(4-1)*3=-9em*/
            padding-right: 3em;
            /*尾部留空字符数*/
            color: red !important;;
        }

        .clamp::before,
        .clamp::after {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: #333;
            /*实际文本颜色*/
            content: attr(data-tt)
        }

        .clamp .expand-box {
            max-height: 100px;
            /*(截取行数+1)*行高  这里是(4+1)*20=100px 这里用于判断折叠 */
            position: relative;
        }

        .clamp .icon-toggle {
            background: url("1.png") no-repeat;  
            /* 绿帽样式本地图片 */
            background-size: cover;
            width: 50px;
            height: 20px;
            position: absolute;
            bottom: 20px;
            /*使用固定定位，在没超出高度的情况下，会被before伪元素给挡住，这样就不会显示该按钮了*/
            right: 0;
        }

```

要判断是否折叠，判断一下.clamp的高度和.expand-box的高度是否相等就好了:
```js

    $('.clampClick').on('click',function(){
        var wrap = $(this),
            inner = $('.expand-box',wrap),
            wrapHeight = wrap.height(),
            innerHeight = inner.height();
        if(wrapHeight > innerHeight && wrap.hasClass('clamp')){
            wrap.removeClass('clamp');
        }else if(wrapHeight == innerHeight && !wrap.hasClass('clamp')){
            wrap.addClass('clamp');
        }
    });

```
以下为非折叠状态
![非折叠](/img/in-post/post-css/css_1803_4.png)    

当然，这只是attr的一个应用场景，还可以通过content来实现一个自定义的tooltip(气泡提示)等等。  
content属性还支持url方法嵌入图片：
```css
    
    .clamp::after{
        content: url('1.png');
    }

```
不过可控性没有background-image高，所以实际场景中较少用到。    
以及[counter](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters)方法实现自增，在此不多加赘述。








