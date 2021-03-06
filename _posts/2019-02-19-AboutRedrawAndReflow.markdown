---
layout:     post
title:      "掌握浏览器重绘重排原理"
subtitle:   "About redraw and reflow"
date:       2019-02-21 11:11:52
author:     "AXiang"
header-img: "img/post-bg-html.jpg"
catalog:  true
tags:
    - 前端
    - Html
    - JavaScript
---

> 都知道要尽量减少浏览器的重排和重绘，那到底要怎么做呢

#### 网页生成过程
- 1、HTML被HTML解析器解析成DOM树
- 2、css则被css解析器解析成CSSOM树
- 3、结合DOM树和CSSOM树，生成一棵渲染树(Render Tree)
- 4、生成布局（flow），即将所有渲染树的所有节点进行平面合成
- 5、将布局绘制（paint）在屏幕上   
第四步和第五步是最耗时的部分，这两步合起来，就是我们通常所说的**渲染**。
网上找了一张图片，我加了注释会更直观一些：   
![渲染过程](/img/in-post/post-html/html_1902_1.png)

#### 渲染
网页生成的时候，至少会渲染一次。在用户访问的过程中，还会不断重新渲染。重新渲染需要重复之前的第四步(重新生成布局)+第五步(重新绘制)或者只有第五个步(重新绘制)。

#### 重排比重绘大
大，在这个语境里的意思是：谁能影响谁？
- 重绘：某些元素的外观被改变，例如：元素的填充颜色
- 重排：重新生成布局，重新排列元素   
就如上面的概念一样，单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分。比如改变元素高度，这个元素乃至周边dom都需要重新绘制。也就是说：“重绘”不一定会出现”重排”，”重排”必然会出现”重绘”。

### 重排(reflow)
##### 概念
当DOM的变化影响了元素的几何信息(DOM对象的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。重排也叫回流,重排的过程以下面这种理解方式更清晰一些：
> 回流就好比向河里(文档流)扔了一块石头(dom变化)，激起涟漪，然后引起周边水流受到波及，所以叫做回流

##### 常见引起重排的情况
任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发重排，下面列一些栗子：
- 添加或者删除可见的DOM元素；
- 元素尺寸改变——边距、填充、边框、宽度和高度
- 内容变化，比如用户在input框中输入文字
- 浏览器窗口尺寸改变——resize事件发生时
- 计算 offsetWidth 和 offsetHeight 属性
- 设置 style 属性的值

##### 常见引起重排的属性和方法
![常见引起重排属性和方法](/img/in-post/post-html/html_1902_2.png)

##### 重排影响的范围
由于浏览器渲染界面是基于流失布局模型的，所以触发重排时会对周围DOM重新排列，影响的范围有两种：
- 全局范围：从根节点html开始对整个渲染树进行重新布局
- 局部范围：对渲染树的某部分或某一个渲染对象进行重新布局

##### 全局范围重排
```html
    <body>
        <div class="hello">
            <h4>hello</h4>
            <p><strong>Name:</strong>BDing</p>
            <h5>male</h5>
            <ol>
            <li>coding</li>
            <li>loving</li>
            </ol>
        </div>
    </body>
```  
当p节点上发生reflow时，hello和body也会重新渲染，甚至h5和ol都会收到影响。
##### 局部范围重排
用局部布局来解释这种现象：把一个dom的宽高之类的几何信息定死，然后在dom内部触发重排，就只会重新渲染该dom内部的元素，而不会影响到外界 

##### 尽可能的减少重排的次数、重排范围
重排需要更新渲染树，性能花销非常大，它们的代价是高昂的，会破坏用户体验，并且让UI展示非常迟缓，我们需要尽可能的减少触发重排的次数。重排的性能花销跟渲染树有多少节点需要重新构建有关系，所以我们应该尽量以局部布局的形式组织html结构，尽可能小的影响重排的范围。而不是像全局范围的示例代码一样一溜的堆砌标签，随便一个元素触发重排都会导致全局范围的重排。

### 重绘(Repaints)
##### 概念
> 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘

##### 常见的引起重绘的属性
![常见的引起重绘的属性](/img/in-post/post-html/html_1902_3.png)


### 浏览器的渲染队列
思考以下代码将会触发几次渲染？
```js
    div.style.left = '10px';
    div.style.top = '10px';
    div.style.width = '20px';
    div.style.height = '20px';
```
根据我们上文的定义，这段代码理论上会触发4次重排+重绘，因为每一次都改变了元素的几何属性，实际上最后只触发了一次重排，这都得益于浏览器的渲染队列机制：当我们修改了元素的几何属性，导致浏览器触发重排或重绘时。它会把该操作放进渲染队列，等到队列中的操作到了一定的数量或者到了一定的时间间隔时，浏览器就会批量执行这些操作。

##### 强制刷新队列
```js
    div.style.left = '10px';
    console.log(div.offsetLeft);
    div.style.top = '10px';
    console.log(div.offsetTop);
    div.style.width = '20px';
    console.log(div.offsetWidth);
    div.style.height = '20px';
    console.log(div.offsetHeight);
``` 
这段代码会触发4次重排+重绘，因为在console中你请求的这几个样式信息，无论何时浏览器都会立即执行渲染队列的任务，即使该值与你操作中修改的值没关联。
因为队列中，可能会有影响到这些值的操作，为了给我们最精确的值，浏览器会立即重排+重绘。

强制刷新队列的style样式请求:
- offsetTop, offsetLeft, offsetWidth, offsetHeight
- scrollTop, scrollLeft, scrollWidth, scrollHeight
- clientTop, clientLeft, clientWidth, clientHeight
- getComputedStyle(), 或者 IE的 currentStyle   
我们在开发中，应该谨慎的使用这些style请求，注意上下文关系,避免一行代码一个重排，这对性能是个巨大的消耗。

### 重排优化建议
就像上文提到的我们要尽可能的减少重排次数、重排范围，这样说很泛，下面是一些行之有效的建议，大家可以参考一下。
###### 1.分离读写操作
```js 
    div.style.left = '10px';
    div.style.top = '10px';
    div.style.width = '20px';
    div.style.height = '20px';
    console.log(div.offsetLeft);
    console.log(div.offsetTop);
    console.log(div.offsetWidth);
    console.log(div.offsetHeight);
```
还是上面触发4次重排+重绘的代码，这次只触发了一次重排。在第一个console的时候，浏览器把之前上面四个写操作的渲染队列都给清空了。剩下的console，因为渲染队列本来就是空的，所以并没有触发重排，仅仅拿值而已。

###### 2.样式集中改变
```js
    div.style.left = '10px';
    div.style.top = '10px';
    div.style.width = '20px';
    div.style.height = '20px';
```
虽然现在大部分浏览器有渲染队列优化，不排除有些浏览器以及老版本的浏览器效率仍然低下，建议通过改变class或者csstext属性集中改变样式。
```js
    // bad
    var left = 10;
    var top = 10;
    el.style.left = left + "px";
    el.style.top  = top  + "px";
    // good 
    el.className += " theclassname";
    // good
    el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
```

###### 3.缓存布局信息
```js
    // bad 强制刷新 触发两次重排
    div.style.left = div.offsetLeft + 1 + 'px';
    div.style.top = div.offsetTop + 1 + 'px';

    // good 缓存布局信息 相当于读写分离
    var curLeft = div.offsetLeft;
    var curTop = div.offsetTop;
    div.style.left = curLeft + 1 + 'px';
    div.style.top = curTop + 1 + 'px';
```

###### 4.离线改变DOM
- 隐藏要操作的dom
在要操作dom之前，通过display隐藏dom，当操作完成之后，才将元素的display属性为可见，因为不可见的元素不会触发重排和重绘。
```js
    dom.display = 'none'
    // 修改dom样式
    dom.display = 'block'
```
- 通过使用[DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)创建一个dom碎片,在它上面批量操作dom，操作完成之后，再添加到文档中，这样只会触发一次重排.
- 复制节点，在副本上工作，然后替换它！

###### 5.position属性为absolute或fixed
position属性为absolute或fixed的元素，重排开销比较小，不用考虑它对其他元素的影响

###### 6.优化动画
- 可以把动画效果应用到position属性为absolute或fixed的元素上，这样对其他元素影响较小动画效果还应牺牲一些平滑，来换取速度，这中间的度自己衡量：比如实现一个动画，以1个像素为单位移动这样最平滑，但是reflow就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多。
- 启用GPPU加速，此部分来自[优化CSS重排重绘与浏览器性能](http://caibaojian.com/css-reflow-repaint.html)。**GPU(图像加速器)：**：GPU 硬件加速是指应用 GPU 的图形性能对浏览器中的一些图形操作交给 GPU 来完成，因为 GPU 是专门为处理图形而设计，所以它在速度和能耗上更有效率。GPU 加速通常包括以下几个部分：Canvas2D，布局合成, CSS3转换（transitions），CSS3 3D变换（transforms），WebGL和视频(video)。   

```css
    /*
    * 根据上面的结论
    * 将 2d transform 换成 3d
    * 就可以强制开启 GPU 加速
    * 提高动画性能
    */
    div {
        transform: translate3d(10px, 10px, 0);
    }
```

### 结语
重排也是导致DOM脚本执行效率低的关键因素之一，重排与重绘作为大厂经常出现的面试题，并且涉及的性能优化。 

重排会不断触发这是不可避免的，但我们在开发时，应尽量按照文中的建议来组织代码，这种优化，希望日后自己重视。





### 参考文章
- [MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/API)
- [优化CSS重排重绘与浏览器性能](http://caibaojian.com/css-reflow-repaint.html)









