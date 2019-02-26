---
layout:     post
title:      "细数微信小程序的前端坑"
subtitle:   "细数了半年"
date:       2018-04-10 11:10:25
author:     "AXiang"
header-img: "img/post-bg-webchat.jpg"
catalog:  true
tags:
    - 前端
    - 小程序
---

> 酝酿了半年，个人理解

### WXML

##### 小程序的标签

小程序里的标签远没有H5里的标签多，这主要归于H5许多标签仅仅是个普通容器，只是语义化不相同，在浏览器搜索引擎检索时发挥一下权重点的作用。但在小程序里就没有这种情况，所以在小程序里剔除了许多语义容器，用`view`代替`div`作为小程序最常见的容器，推荐使用的[API官方组件](https://developers.weixin.qq.com/miniprogram/dev/component/)里的官方组件，h5标签不是不能用，只是在渲染的时候会没有默认属性，而且编译时小概率出现错误。
虽然标签简化了，但是普通容器一般都用view的情况下，样式都需要打类名或ID，总觉得十分繁琐(个人习惯是在父级类名下使用标签选择器)。在小程序里个人常用的容器标签有:*view*,*label*,*text*。

##### scroll-view
scroll-view算是进阶版的view，提供的是一个可滚动视图区域，类似于**overflow:auto**的功能，只是**overflow:auto**在小程序很难用的原因，所以在特别的时候可以用上这个组件，例如在一个固定高度的**swiper**组件里定义一个可滚动视图区域，可以使用scroll-view。
![滑动例子](/img/in-post/post-xcx/exm_1.gif) 
scroll-view支持横纵滚动，滚动条事件等。但是目前好像在官方API暂时还没有发现有滚动条结束监控，我们可以在``bindscroll``绑定一个一个延时函数来达到滚动条结束的监听：
```js

  bindScrollOver: function () {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(function () {
    //   滚动结束时的事件
      delete this.timeoutId;
    }.bind(this), 500);
  }

```

##### swiper
小程序的swiper就是[h5中swiper](http://www.swiper.com.cn/)的阉割版，但是这个阉割版我是很喜欢的，保存了90%的功能，但内容清爽了许多，依旧是丝滑般的感觉。指示点，自动切换，环形轮播，纵横方向之类的都是支持。目前有一个还未解决问题：没有办法舒服的控制**swiper-item**之间间距，因为小程序的swiper封装得太好了，再加上没有办法获取dom元素，官方渲染的时候也不用类名id控制样式，所以想要控制到元素很麻烦，原先在H5用swiper做的一个效果图如下![轮播例子](/img/in-post/post-xcx/exm_2.gif)在可以控制到dom的情况下轻松修改到原生样式；以下为小程序的swiper做的类似页面![轮播例子](/img/in-post/post-xcx/exm_3.gif)但是在大多情况下使用swiper当做轮播滚动，信息滚动都十分好用。

##### text
小程序的text组件是一个用于文本的内联元素，比较特殊的是它支持解码`&nbsp`,`&lt`,`&gt`,`&amp`,`&apos`,`&ensp`,`&emsp`以及换行`\n`和空格`\t`，这边要注意的是，小程序里是不识别`<br/>`换行的，而且text标签里只能嵌套text标签。

##### button
小程序的button主要功能是使用微信开发的能力(open-type属性：分享，打开客服之类)以及提供formId的表单提交，通常我们设计的一个按钮在button组件上得不到很好的样式体现，因为小程序在wxss里是不支持导入本地连接的图片的，只能使用网络地址，导致在button上不能显示本地的背景图片，所以一般都是把一张图片和一个button放在一个容器里，图片为按钮背景图，button则设置定位重叠在图片上方，并且设置透明无色。
```css
    
    .con>button{
        background:none;       
    }
    .ccon>button:after{
        border:none;
    }

```
很坑的一点是，小程序中button的默认样式很多，特别是button的border属性，不是写在button内，而是写在button:after里。

`<button open-type=""></button>`这边例举常用的open-type的有效值
- share: 触发用户转发，和js里的onShareAppMessage相对应
- contact: 打开客服会话
- getUserInfo:获取用户信息，可以从bindgetuserinfo回调中获取到用户信息

##### canvas
h5的canvas真的是太牛逼了，导致我对小程序里的canvas也有很大的期望，结果发现小程序的canvas是真的难用。小程序的canvas阉割了太多的功能。通过唯一的canvas-id进行识别。

###### 　问题1:ctx.drawImage真机无法显示
　**问**：用ctx.drawImage画线上图片在真机上显示不出来，模拟器上却可以显示（需要说明的是：ctx.drawImage画图片是需要获取到图片后才能开始画，并且获取的线上图片地址需要是https。）但是在真机上还是无法显示，也试过下载到本地后画也没有用。

　**已解决**：首先，用canvas绘制线上图片时，必须先下载到本地，而且线上图片的地址必须是在配置的安全域名下，遇到绘制不出的原因在于：没有等待图片完全下载好就绘制了，所以这里要考虑绘图顺序，可以用wx.downloadFile返回的对象的成功回调后绘制图片。

###### 　问题2：实现圆形裁剪
　**问**：小程序的canvas没有裁剪的api，如何用canvas将图片画成圆形？

　**已解决**：我是通过制作一张和头像图片一样大的中间有个圆形镂空（中间透明，外切圆）的正方形图片绘制在头像上，在视觉上给头像做出圆形的效果。

###### 　问题3：文字定位
　**问**：canvas生成一张用于裂变的分享图常常需要写入许多文字，而且文字并非一段而是拆分成很多段，如下图：![canvas例子](/img/in-post/post-xcx/exm_4.png)中间那段红蓝相间的文字就是用多段ctx.fillText定位的，但是ctx.fillText(输出文本,x轴距离,y轴距离)是只支持从左上角开始定位的，而且只能使用**px**单位，导致在不同机型上显示的效果都不一样，而且文字换行也是个大问题。

　**已解决**：通过手动计算rpx的比值进行等比例转换px再配合ctx.setTextAlign设置文字对其方式可以较完美的解决文字定位问题，文字换行同理。在基础库1.9.90里还更新了ctx.measureText方法，能测量文本尺寸信息，返回文本宽度，同步接口，便于我们文字进行定位。

###### 　问题4：字体设置
　**问**：canvas不能设置字体，只能使用宋体。

　~~**未解决**：确实只能显示宋体~~。    
　~~**半解决**：基础库1.9.90开始支持ctx.font，支持设置字体粗细，形态，大小以及字体，还没有用过，有机会试一下~~。  
　**已解决**：在基础库为1.9.90确实可以通过font来设置字体形态，但是它不像setFillStyle，setFontSize这些只向下有效，font对没有设置过字态的fillText都会进行设置，向上也有效，所以如果使用了font，要对所有的fillText都进行设置，目前自测支持的字体有:宋体，黑体，楷体。。。

###### 　问题5：canvas隐藏问题
　**问**：为了让canvas不在页面显示，将canvas用view标签包起来后，给view设置了overflow=hidden和opacity=0的属性，是可以成功将canvas隐藏，但是在真机上测试时，一旦在这个隐藏的canvas上绘制图片，canvas又显示在屏幕上了。模拟器上是不会显示的。

　**已解决**：由于canvas是客户端创建的原生组件，它的层级是最高的，并且不能通过 z-index 控制层级，所以在真机上canvas一旦被绘制就一定会显示，而且如果用wx:if来隐藏会把canvas销毁掉，使其不工作，我个人的解决方式是将canvas设置定位绝对定位或固定定位,left设置-10000px,使其脱离屏幕，如果需要时再把left动态设置回来，这样达到一个隐藏的效果。

###### 　问题6：canvas的层级问题
　**问**：写的所有东西都被canvas盖住了，在模拟器上是显示的，但是在真机上都是被canvas盖住的。

　**已解决**：上面说到canvas是客户端创建的原生组件（类似的还有map、video、camera、live-player、live-pusher），它们的层级是最高的，并且不能通过 z-index 控制层级，所以大部分组件是不能位于canvas之上的，但是微信提供了cover-view和cover-image这两个组件。一个用于普通容器，一个用于图片显示。它们和view、image用法一样，但是很多样式不支持，例如单边的border、background、shadow等，cover-view和cover-image只支持嵌套cover-view和cover-image，并且只能写在canvas内，如下：
```html

    <canvas canvas-id='myCanvas'>
           <cover-view>
               6666
           </cover-view>
           <cover-image src="nice.png" /> 
    </canvas>

```

###### 　问题7：drawImage绘制的画布，使用ctx.clearRect清除不了
　**问**：ctx.drawImage绘制的画布，使用ctx.clearRect清除不了。

**未解决**：

##### web-view
web-view是一个可以用来承载网页的容器，会自动铺满整个小程序页面，有点类似h5的iframe，如果有现成的h5网页，并且不需要支付接口（不支持）可以考虑直接使用这个组件来开发，使用bindmessage来接受网页向小程序postMessage时的消息e.detail = { data }。[主要支持的接口](http://www.swiper.com.cn/)

### WJS
每个人写法都不一样，推荐使用ES6写法，这边不多赘述。

##### this.setData({})
一般setData方法多用于改变页面信息或者刷新后与后台交互获取最新的信息。这是我们最常用的接口，要注意的是小程序是基于双线程模型的，在这个模型中，小程序的逻辑层与渲染层分开在不同的线程运行，大部分代码都是异步的。以下是错误写法:
```js
    onLoad: function () {
        this.setData({
            text: "奎尔萨拉斯",
        })
        console.info(this.data.text)
    }
```
因为代码是异步加载，无法100%保证text能在输出前成功赋值(虽然大部分情况下可以，但是如果赋值数据大，则会出现这样的问题)。正确写法:
```js
    onLoad: function () {
        this.setData({
            text: "奎尔萨拉斯",
        },()=>{
        console.info(this.data.text)
        })
    }
```
ES6的箭头函数能完美解决这个问题。

#####  setTimeout和setInterval
~~自我感觉小程序对setTimeout以及setInterval的支持很差，多次循环调用setTimeout会严重影响页面渲染效果，而且不同机型差异很大，不推荐使用，同理的还有CSS3动画。~~   
确实小程序的setInterval、setTimeout很不精确，主要是因为套了几层、或者用setTimeout以递归形式变相实现setInterval的会超过实际设定时间(间隔1000ms时误差：pc 2ms以内, 中等性能安卓机 10ms左右), 会造成较大的累积差。思路是:每次补了上次的误差。超出误差范围会掉回来，从而无累计。通过更小的Interval实现无累计差的、相对精确的Interval。但是还是需要在频率(影响性能,本人一般30-50ms)和误差范围之前做权衡。特别注意的是每个计时器(setTimeout和setInterval)应该在页面结束时Stop，否则在hide后重新show页面改变，计时器没停止，可能导致重大问题。以下为优化消除累计差的方法：

```js

    var lastTime = (new Date()).valueOf();
    setInterval(function () {
    var now = (new Date()).valueOf();
    if (now - lastTime >= 1000){
        lastTime = lastTime + 1000;
        console.log("now: " + now, "lastTime: " + lastTime);
    }
    }, 30);

```

##### wx:if和动画加载
wx:if包含的物体(包括自身)加动画有bug，播放一次动画->隐藏->显示->物体卡在动画第一个step结束后，之后再播动画怎么setData都不起作用(因为动画是差值播放。永远停在第一步结束, 即重新播放的第一步永远不会再执行)。解决方法: 每次重新显示后先清掉之前的动画，并在非本帧(setTimeout 50ms以上)重新setData动画数据。

##### 服务端下发很多文字自然段，客户端渲染问题
一些长文需要服务器可配，如何在一个字段内完成客户端可换行的渲染。   
方法1：小程序不支持`<br/>`换行标签，只有在`<text>`标签内使用**\t**来完成换行，所以可以让服务端下发带有\t字段的标识符，客户端使用`<text>`来进行渲染。   
方法2：让服务器在需要换行的位置插入独特标识符，例如**|**,**&**之类的，使用split在客户端对字段进行分割后循环渲染出来，例如：
```js

    httpGet(url).then(res => {
        this.setData({
            about: res['about'].split("|"),
        });
    }

```  
```html

    <block wx:for="{{about}}" wx:for-item="item" w>
        <p style="text-indent:2em;">{{item}}</p>
    </block> 

```

### WXSS

##### 小程序的样式表  
小程序的WXSS就是H5的CSS，它具有CSS大部分的特性，并且对小程序有一定的拓展和修改。主要的拓展就是尺寸单位rpx的确定。rpx可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在iPhone6上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。![5,6,6p](/img/in-post/post-xcx/exm_5.png)关于这个rpx，就像h5里的**rem**单位一样，我是十分喜欢的，就像秦始皇统一六国，统一了货币一样，当然你也可以使用**px**、**%**、**vh**、**em**,这些在小程序都是支持的，不存在兼容问题。

##### calc()
一直觉得calc()在css3中是一个亮点，碍于在移动端浏览器兼容性表现不佳，一直不敢常用（和2年前的弹性盒子一样）。但是在小程序里是可以完美兼容的，小程序使用rpx单位使布局方便，calc()更加灵活的运算使得锦上添花。要注意点是calc()中的运算符需要左右空格间距和h5是一样的。
```css

    .con_view{
        width:calc(100% - 50rpx)
    }

```
上述得到的width为700rpx。calc()在有paddding时计算宽度会比**box-sizing: border-box;**方便一些。

##### filter
同样和calc()一样出彩的css3新样式，在小程序也是完美兼容，以下是我比较常用的几种，[filter](http://www.runoob.com/cssref/css3-pr-filter.html)
- blur(px):高斯模糊度
- grayscale(%):灰度值
- opacity(%):透明度，和opacity效果类似，不同之处在于通过filter，一些浏览器为了提升性能会提供硬件加速，但在小程序里不存在这种情况。

##### 多行省略
在CSS中简单解决多行省略逻辑
```css
    .hidden{
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
    }

```

##### CSS3动画animation
小程序因为自带动画（特别难用！），所以对CSS3的动画支持不好，之前有用CSS3做弹幕效果，因为过度渲染导致效果很差，常常闪屏，所以不推荐大面积使用css3的动画。

### OTHER

##### 阻止页面下拉和滚动
在对应的页面的.json里配置**"disableScroll": true**可以阻止页面上下拉，如果是在canvas里进行绘画操作时，**"disableScroll": true**会失效，手指在画板上绘画会导致屏幕滑动。可以在元素标签里绑定**disable-scroll="true"**，可解决滑动问题。
```html

   <canvas canvas-id='myCanvas'  disable-scroll="true" bindtouchstart="touchStart" bindtouchmove="touchMove" ></canvas>
 
```

##### 关闭小程序
官方没有特别说明这个方法，可以使用这个:
```js

    wx.navigateBack({
       delta:-1
    })
 
```
##### 关于路由跳转
之前路由是一直使用wx.navigateTo或者wx.redirectTo，但是wx.navigateTo和wx.redirectTo不允许跳转到tabbar页面(底部导航)，只能用 wx.switchTab 跳转到 tabbar页面。

##### 多目运算
当需要判断两个特定情况渲染页面时，true和false往往不够用，可以把两个或者多个三目运算组合起来使用，例如:
```html
    <!-- 当type=1时使用btn1，type=2时使用btn2 -->
    <!-- <view class="{{type==1?'btn1':type==2?'btn2':''}}"></view> -->
```

##### 适配iphonex
```js

// 在app.js中判断是否是哪种设备 
globalData: {  
  isIphoneX: false,  
  userInfo: null  
},  
onShow:function(){  
  let that = this;  
  wx.getSystemInfo({  
    success:  res=>{  
      // console.log('手机信息res'+res.model)  
      let modelmes = res.model;  
      if (modelmes.search('iPhone X') != -1) {  
        that.globalData.isIphoneX = true  
      }  
    }  
  })  
}, 


```    
在需要引用的页面js文件中onload方法里获取全局变量
```js
   
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
       isIphoneX: isIphoneX
    })
   
```     
在 wxml文件中 进行css的逻辑判断`<view class="{isIphoneX?"linkCon":""} flex "> </wiew>`



>会一直更新的