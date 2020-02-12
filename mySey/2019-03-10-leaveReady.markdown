自审面试：
一·HTML+CSS
  一、HTML基础
      概念
      <link rel="stylesheet" herf="XXXX.css">
      <script src="xxxx.js"></script>
      <style scoped></style>
      <!-- <base>标签为页面上的所有链接规定默认地址或默认目标 -->
      <base href="http://www.w3school.com.cn/i/" />  
      <base target="_blank" /> 
      <!-- 相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确
      地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。 -->
      <meta http-equiv="refresh" content="test">  
      <meta name="keywords" content="搜索引擎关键字" >
      <meta charset="utf-8">
      <!-- device-width表示设备宽度 -->
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
      <form>[target,method,enctype]
      <!-- target:表单提交到哪儿  method:发送表单数据的方法  enctype:指定编码，如果上传文件指定要用form-data -->
      <input>[type]
      <!-- type:text button checkbox password radio file image reset submit-->
      <button>[type]
      <!-- type:button reset 重置 submit 默认,提交 -->
      <select><option>[value]
      面试问答
      1、doctype的意义是什么？
      1- 让浏览器以W3C标准模式渲染

      2、html、xhtml、html5的关系
      2- html:超文本标记语言  xhtml:可扩展超文本标记语言，是html进行XML标准严格化的结果  html5:现在最新一代的超文本标记语言

      3、property(特性)和attribute(属性)的区别
      3- attributes是属于property的一个子集

      4、H5有什么变化
      4- 新的语义化标签，表单增强(新元素，验证)，新的API(canvas,websocket,offline,SVG之类)

  二、CSS基础
      概念
      属性选择器：[type=radio]{}
      组合选择器：[type=checkbox] + label{}
      否定选择器： :not(.link){}
      渐变色背景：linear-gradient(135deg, red 0, green 50%, blue 100%)  默认180deg 从上至下渲染

      面试问答
      1、BFC是什么？
      1- 块级格式化上下文 (Block Fromatting Context)：页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。简单的理解为BFC是一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部
        只要元素满足下面任一条件即可触发 BFC 特性：
          body 根元素
          浮动元素：float 除 none 以外的值
          绝对定位元素：position (absolute、fixed)
          display 为 flexin、line-block、table-cells
          overflow 除了 visible 以外的值 (hidden、auto、scroll)

      2、transform和margin的区别
      2- margin的改动会影响CssTree的结构导致页面重绘,浏览器渲染应该避免过多的重排，transform则不会，且transform会利用GPU性能更优

      3、CSS中动画怎么写，transation和animation和keyframs怎么写
      3- CSS中动画分两种，transition和animation，transition靠伪类和JS触发，animation需要与@keyframes结合使用
      #box1{ height: 100px;width: 100px; } 
      #box1:hover{ transform: rotate(180deg) scale(.5, .5);
                  background: red;
                  transition: background 2s ease, transform 2s ease-in 1s; }
      #box2{ height: 100px;width: 100px;  animation: changebox 10s ease-in-out  3 infinite(无限循环);}
      @keyframes changebox { 0% {  background:red;  }
                          100% {  width:180px;  height:180px; }}
      
      4、flex布局相关： align-self,justify-content,flex-direction,flex-wrap
      5、单行省略: width:5em;text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
      6、多行省略：  display: -webkit-box;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 4;

  三、预处理器 sass 和 less
      面试问答
      1、sass和less的区别
        less基于node，用js编写不需要预先编译，sass基于ruby，也有node的移植版本。
        关于变量sass用$，less用@，less 加上 &：并不是父子关系而是同级
        less的打包指令:lessc a.less > a.css
        sass的打包指令:node-sass a.scss > a.css --output-style expanded 
        less的理念：尽量的接近css的语法
        sass的理念：尽量避免产生混淆

      2、mixin相关(复用)
      less：  .block(@fontSize){ font-size: @fontSize; }       .block(14px);
      sass:   @mixin block($fontSize) {font-size: $fontSize;}  @include block(14px);

      3、extend相关(继承)
      less: 引用-.a{ &:extend(.b); font-size: 12px;} .b{font-weight: bold;}
      sass: 引用-a{ @:extend .b; font-size: 12px;} .b{font-weight: bold;}
            输出-.a { font-size: 12px;}  .b,.a {font-weight: bold;}

      4、预处理器框架
      EST，SASS-Compass

二·JavaScript
  一、变量类型和计算
      概念
      基本数据类型string，number，Boolean，undefined，null和symbol
      引用型：Array，Function，Object


      面试问答
      1、什么时候发生强制类型转换？
      1- 字符串拼接和== 运算符情况下
      2、如何理解JSON
      2- JSON是一个JS对象，常用两个方法解析JSON.stringify({a:10,b:20})[对象中解析出字符串]  和 JSON.parse('{"a":10,"b":20}')[字符串中解析出json对象],JSON.parse()不兼容  可以使用eval来转化
  
  二、原型和原型链
      概念

      面试问答
      1、instanceof和typeof的区别
      1- instanceof：用于判断引用类型属于哪个构造函数的方法，typeof只能区分值类型，对引用类型无能为力，只能区分函数function

      2、如何准确判断一个变量是否是数组类型
      2- var arr = [];     arr instanceOf Array  // true        typeof arr   //Object
        使用Object.prototype.toString.call([1,1,3])
       
      
      3、描述创建一个对象的过程
      3- 新生成了一个对象，链接到原型，绑定 this，返回新对象

      4、谈谈原型和原型链
      4- Js中没有 “类” 的概念，所以靠原型和原型链实现对象属性的继承。除了null和undefined以外所有的对象都有__proto__属性，而且指向创造这个对象的函数对象的prototype属性。

  三、作用域和闭包
      概念

      面试问答
      1、说一下对变量提升的理解
      1- 在某一作用域中，声明变量的语句会默认解析为在该作用域的最开始就已经声明了。所以变量可以先使用再声明。但是只有声明的变量会提升，初始化的不会

      2、说几种this的使用场景
      2- 作为函数调用：函数的最通常用法，属于全局性调用，因此this就代表全局对象Global。
          function makeNoSense(x) { 
                       this.x = x; 
                      } 
         作为对象方法调用：函数可以作为某个对象的方法调用，这时this指代对象内部属性被调用。
          var test = {  a:0,
                        b:0
                        get:function(){
                            return this.a;
                      }}
         作为构造函数调用：通过构造函数生成一个新的object对象。这时，this就指这个新对象.
          function Point(x, y){ 
                this.x = x; 
                this.y = y; 
          }
         在call或者apply，bind中调用:在call或者apply方法中切换this绑定的对象

      3、说说call或者apply，bind
      3- call和apply都是为了改变某个函数运行时的上下文，即改变this绑定的对象。当一个对象没有某个方法，但是其他对象的有，可以借助call或apply用其它     对象的方法来操作。两者作用完全一样，仅仅是接受的参数不太一样。call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里
            arr=[1,2,3]
            func.call(this, 1 , 2 , 3 );
            func.apply(this, arr);

         bind() 方法与 apply 和 call 很相似，也是可以改变函数体内 this 的指向。
            var bar = function(){console.log(this.x); }
            var foo = {x:3}
            bar(); // undefined
            var func = bar.bind(foo);
            func(); // 3
            这里我们创建了一个新的函数 func，当使用 bind() 创建一个绑定函数之后，它被执行的时候，它的 this 会被设置成 foo ， 而不是像我们调用 bar() 时的全局作用域。
            call: fn.call(target, 1, 2)
            apply: fn.apply(target, [1, 2])
            bind: fn.bind(target)(1,2)

      4、创建10个<a>标签，点击的时候弹出对应的序号
      4- for(var i=0;i<10;i++){
              (function(i){
                  var a=document.createElement('a');
                  a.innerHTML=i+"<br/><hr/>"
                  a.addEventListener("click",function(e){
                      e.preventDefault;
                      alert(i)
                  })
                  document.body.appendChild(a);
              })(i)
          }
        
      5、如何理解作用域
      5- 代码在一个环境中执行时，对创建变量对象的一个作用范围。作用范围是保证对执行环境有权访问的所有变量和函数的有序访问，没有块级作用域只有函数作用域和全局作用域

      6、说一个闭包在实际开发中的应用
      6- 闭包就是函数中的函数，就是说一个函数要访问另外一个目标函数内部的变量，就要在目标函数中再定义一个函数，并将这个定义的函数return出来，供外部使用。在实际开发中，闭包主要是用来封装变量，收敛权限。

  四、异步和单线程
    概念
    面试题目
    1、同步和异步的区别是什么？
    1- 同步会阻塞代码执行，而异步不会。

    2、JS运行机制
    2- 单线程，任务队列，event loop事件循环

  五、常见对象
    概念
    面试题目
    1、获取2017-06-10格式的日期
    1-function formatDate(dt){ 
        if(!dt){ dt=new Date(); }
        var year=dt.getFullYear();
        var month=dt.getMonth()+1;
        var day=dt.getDate();
        if(month<10){ month='0'+month;}
        if(day<10){ day='0'+day;}
        return year+'-'+month+'-'+day;
      }
      var dt=new Date() //获取当前时间
      console.log(formatDate(dt));

    2、获取随机数，要求是长度一直的字符串格式
    2- var random = Math.random()+'';
           random = random.slice(0,5);

  六、JS-Web-API
    概念
    DOM的本质:Document、Object、Model浏览器把拿到的html代码，结构化一个浏览器能够识别并且js可操作的一个模型
    DOM的节点操作:attribute和property，property是一个JS对象的属性的修改,attribute是对html标签属性的修改

    面试题目
    1、如何检测浏览器的类型
    1- navigator & screen

    2、谈谈缓存
    2 - cookie、sessionStorage、localStorage。cookie保存在浏览器端，具有周期时效性，限制小4K，向服务器请求时表现在url里，Storage保存在服务器端，
    session只在页面会话期有效，local一直有效除非被清除，大小限制5MB

  七、事件
    概念
    取消冒泡：e.stopPropatation() 

    面试问题
    1、代理
    <div id="div1">
      <a href = "#">a1</a>
      <a href = "#">a2</a>
      会随时新增更多 a 标签
    </div>
    1-  var div1 = document.getElementById('div1')
          div1.addEventListener('click',function(e){
              var target = e.target
              if(target.nodeName === 'A'){
                  alert(target.innerHTMl)
              }
        })

  八、Ajax
    概念
    跨域：浏览器有同源策略，不允许ajax访问其他域的接口。协议、域名、端口，有一个不同就算跨域
    可以跨域的三个标签：img,script,link
    跨域有什么限制：cookid,localStorage无法访问，DOM和Js无法获取对象，AJax请求不能发送
    jsonp:通过script标签实现跨域请求，然后再服务端输出JSON数据并执行回调函数来获取数据（只能使用get请求）
    面试题目
    1、手动写一个ajax
      var xhr = new XMLHttpRequest()
      xhr.open("GET","/api",false)    //false表示请求地址是否发送异步请求 默认true
      xhr.onreadystatechange = function(){
          //这里的函数异步执行，可参考之前JS基础中的异步模块
          if(xhr.readyState == 4){
              if(xhr.status == 200){
                  alert(xhr.responseText)
              }
          }
      }
      xhr.send(null)

    2、状态码说明 
        0 - (未初始化)     还没调用send()方法
        1 - (载入)         已调send() 方法，正在发送请求
        2 - (载入完成)     send()方法执行完成，已经接收到全部相应内容
        3 - (交互)         正在解析响应内容
        4 - (完成)         响应内容解析完成，可以在客户端调用了

      status说明
        1XX - 客户端在收到常规响应之前
        2XX - 表示成功处理请求。如200
        3XX - 需要重定向，浏览器直接跳转
        4XX - 客户端请求错误，如404
        5XX - 服务器端错误

    3、什么是重定向和转发
    3- 转发也叫服务器跳转，地址栏不变，相当于方法调用，而重定向则是客户端跳转，相当于客户端向服务端发送请求之后，得到一个响应后再发送一个请求。
       对数据进行修改、删除、添加操作的时候，应该用重定向

三、ES6
    面试问答 由浅至深
    1、了解 Promise 吗
    1- Promise是异步编程的一种解决方案，比传统的异步解决方案【回调函数】和【事件】更合理、更强大

    2、promise的状态
    2- 三个状态:pending，异步任务正在进行。  resolved，异步任务执行成功。  rejected，异步任务执行失败。

    3、promise的使用总结：
    3-  初始化一个 Promise 对象，两种方式：1、new Promise(fn)  2、Promise.resolove(fn)   
        然后调用上一步返回的 promise 对象的 then 方法，注册回调函数。
           new Promist(fn).then((valse)=>{})
        最后注册 catch 异常处理函数，处理前面回调中可能抛出的异常。
    
    4、 async/await相关
    4- async/await也是基于Promise 实现的，使异步处理更接近同步处理，可读性更好

四、Node
    面试问答
    Node的特点：单线程、事件驱动、非阻塞I/O
    NodeJs是干吗：一种javascript的运行环境，能够使得javascript脱离浏览器运行，前后端分离

五、HTTP
    面试问答
    1、GET和POST方法的区别
    1- GET和POST本质上都是TCP链接，并无差别。但是由于HTTP的规定导致在应用过程中体现出一些不同，Get产生一个TCP数据包，POST则是两个，对于get的请求，浏览器会把http,header,data一并发出去，然后服务器响应200返回数据。而对于POST，浏览器先发送 header，服务器先响应100，然后浏览器再发送data，服务器响应200返回数据。Get的语义是请求获取指定资源，而Post则是对指定资源进行操作

    2、谈谈WebSocket
    2- websocket可以说是一个持久化的协议，用于浏览器与服务器之间双向即时通讯，可以彼此相互推送信息。

六、前端安全
    面试问答
    1、xss跨站脚本攻击解决方式
    1- xss又名跨站脚本攻击，解决原则是不让数据变成可执行的代码，不信任任何用户的数据，严格区分数据和代码，多使用HtmlEncode转码操作。

    2、sql脚本注入攻击解决方式
    2- 利用正哲表达式或者特定函数过滤和修正一些敏感非法字符，

    3、谈谈前端数据加密
    3- 前端加密不经常用，一般在后端加密。关于前端加密大概有base64，md5，sha1

七、VUE
    概念
    面试问答
    1、vue双向绑定的原理
    1- 通过对浏览器的数据劫持，重写对象的set,get方法 vue 2.0使用 Object.defineProperty(),  vue 3.0使用Proxy


八、数组操作相关
    map: 遍历数组，返回回调返回值组成的新数组
    forEach: 无法break，可以用try/catch中throw new Error来停止
    join: 通过指定连接符生成字符串
    push / pop: 末尾推入和弹出，改变原数组， 返回推入/弹出项
    unshift / shift: 头部推入和弹出，改变原数组，返回操作项
    sort(fn) / reverse: 排序与反转，改变原数组
    concat: 连接数组，不影响原数组， 浅拷贝
    slice(start, end): 返回截断后的新数组，不改变原数组
    splice(start, number, value...): 返回删除元素组成的数组，value 为插入项，改变原数组
    indexOf / lastIndexOf(value, fromIndex): 查找数组项，返回对应的下标
    reduce / reduceRight(fn(prev, cur)， defaultPrev): 两两执行，prev 为上次化简函数的return值，cur 为当前值(从第二项开始)
    数组乱序：
      var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      arr.sort(function () {
          return Math.random() - 0.5;
      });
    数组拆解: flat: [1,[2,3]] --> [1, 2, 3]   
    var arr2 = [1, 2, [3, 4, [5, 6]]];
    arr2.flat();
    // [1, 2, 3, 4, [5, 6]]

    var arr3 = [1, 2, [3, 4, [5, 6]]];
    arr3.flat(2);
    // [1, 2, 3, 4, 5, 6]

    //Infinity展开所有嵌套数组
    arr3.flat(Infinity); 
    // [1, 2, 3, 4, 5, 6]
    
    Array.prototype.flat = function() {
      return this.toString().split(',').map(item => +item )
    }  





<!-- 面试不会的或者没答好的 -->
1、vue组件之间的通信，父子，同级
  父向子传值：属性传值，父组件通过给子组件标签上定义属性，子组件通过props方法接收数据；
  子向父传值：事件传值，子组件通过$emit(‘自定义事件名’，值)，父组件通过子组件上的@自定义事件名=“函数”接收
  非父子组件传值：全局定义bus，var bus=new Vue() ; 发送者， bus.$emit(‘自定义名’，值) ；接受者，bus.$on(‘自定义名’，(值)=>{})
2、mounted和create的区别
  created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
3、Vue的跨域问题
4、JS如何重载
  JS不能支持函数重载，需要通过arguments.length判断一下调用时传入的参数个数。然后对不同的情况采用不同的处理方式，实现重载
5、浅拷贝和深拷贝
  浅拷贝: 以赋值的形式拷贝引用对象，仍指向同一个地址，修改时原对象也会受到影响    Object.assign(a,b)
  深拷贝: 完全拷贝一个新对象，修改时原对象不再受到任何影响  JSON.parse(JSON.stringify(a))
6、小程序的生命周期
  app.js   onLanuch onShow onHide onError 
  page.js  onLoad onShow onHide onUnload onReady 
7、canvas 跨域 数据污染

8、前端性能如何优化(具体CDN缓存之类)

9、纯CSS写倒数计时 
    animation:run 6s steps(6);

10、页面之间传递参数(原生方法，框架方法)















- javaScript的Event Loop机制：[博文笔记]](http://wangxiang.vip/2018/07/14/AboutJsEventLoop/) 2018-07-26
- 骨架屏 [博文笔记]](http://wangxiang.vip/2018/08/28/SkeletonScreen/) 2018-11-24
- [ JS 进阶 ] 基本类型 引用类型 简单赋值 对象引用  2018-11-25
  基本类型按值访问，只要数值相等比较就位true;引用类型时按引用访问，就是比较两个对象的堆内存中的地址是否相同，就算数值相同，但是内存地址不同，比较为false
  你的想法： var a = 1; a = 2; // 此时 a的值为2， 你认为'值改变了'
  解释：var a = 1; // 这里的基础类型是 number ,也就是 1 ，这里 1 是不可改变的，a只是指向 1的一个指针，指针的指向可以改变，所以你可以 a=2,此时a指向了2， 这里2同样不可改变。
  也就是说你理解是的可变是 ‘指针的改变’。基础类型指的是 1 而不是 a, 这里要分清楚. 因此，引用类型的赋值其实是对象保存在栈区地址指针的赋值，因此两个变量指向同一个对象，任何的操作都会相互影响。
- WebAssembly是由W3C社区团体制定的一个新的规范，用于解决js所存在的问题，是一种新的底层安全的二进制语法，未来发展趋向 
  [外网文献]](https://www.ibm.com/developerworks/cn/web/wa-lo-webassembly-status-and-reality/index.html) 2018-11-26
- PWA Progressive Web App 渐进式WEB应用，一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App 
  Manifest和Service Worker 来实现 PWA 的安装和离线等功能。
  App Manifest实现添加至主屏幕
  Service Workers 就像介于服务器和网页之间的拦截器，能够拦截进出的HTTP 请求，从而完全控制你的网站。
  [外网文献]](https://segmentfault.com/a/1190000012353473) 2018-11-26
- 原型链 [博文笔记]](http://wangxiang.vip/2018/09/19/PrototypeChain/) 2018-11-28

- 在浏览器中使用javascript module  2019-01-24
- 前端性能优化清单小结 2019-01-24



- 网站主题实现方案  利用js-cookie记录选中的样式，js触发事件加载其他主题的css，后加载的css会覆盖之前样式从而达到切换主题的效果 2018-11-26
  // 添加暗色主题
  function addDarkTheme() {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.id = "theme-css-dark";  // 加上id方便后面好查找到进行删除
    link.rel = 'stylesheet';
    link.href = '/css/nutzbs_dark.css';
    document.getElementsByTagName("head")[0].appendChild(link);
  }
 // 获取cookie中选中的主题名称，没有就给个默认的
  function getThemeCSSName() {
    return Cookies.get('nutzam-theme') || "light";
  }
  // 使用暗色主题(记录选择到cookie中)
  function useDarkTheme(useDark) {
    Cookies.set('nutzam-theme', useDark ? "dark" : "light");
    if (useDark) {
        addDarkTheme();
    } else {
        removeDarkTheme();
    }
  }
  HR你们好，我叫王翔。在之前公司就职前端开发，17年毕业投入工作，现有2年的工作经验。掌握的前端技术有H5,CSS3，JS,小程序相关等，熟悉数据可视化渲染，性能优化以及动效制作。掌握UI设计师的设计思路，同时也了解java语言和数据库表结构这块，所以与UI和后端人员能更有效的沟通。自身性格热情开朗，与同事乐于沟通，对工作认真负责，有责任心。非常开心能来到贵公司面试。

- Vue复习笔记
1--------------------------------
  组件模板化:components里注册组件名称，子组件通过 this.$emit("delete)向父组件传递事件和数据，一个例子：
  js
    var TodoItem={
        props:['content','index'],
        template:"<li @click='handleItemClick'>{{content}}</li>",
        methods:{
          handleItemClick(){
            this.$emit("delete",this.index)
          }
        }
      }
      var app = new Vue({
        el: '#root',
        components:{
          TodoItem:TodoItem,
        },
        data: {
          value: '',
          list:[]
        },
        methods: {
          handleItemDelete(index){
            this.list.splice(index,1)
          }
        }
      })
  html
      <todo-item :content="item" :index="index" @delete="handleItemDelete" v-for="(item,index) in list"></todo-item>

  另外一个例子，如果觉得传两层麻烦可在组件方法后加.native，表示直接使用父级层面的方法 
  <todo-item  @delete.native="handleItemDelete" >XXXXX</todo-item>
2------------------------
  计算属性computer和watch
  js
    var vm =new Vue({
        el:'#root',
        data:{
          aaa:"王翔",
          bbb:"晁渺"
        },
        computed:{
          message:{
            // 取值时触发
            get:function(){
                return this.aaa+" "+this.bbb
            },
            // 设值时触发
            set:function(value){
              var arr=value.split(" ");
              this.aaa=arr[0];
              this.bbb=arr[1];
            }
          }
        }
      })
3------------------------
  vue中提供数组操作方法
  push 添加数据到数组最后一位
  pop  删除数组最后一位
  unshift 数组的开头添加一个或更多元素，并返回新的长度
  shift  数组的第一个元素从其中删除，并返回第一个元素的值
  splice(index,howmany,item1,item2………………)  移除数组的第三个元素，并在数组第三个位置添加新元素: 
4-------------------------
  子组件里的data必须是一个function，不能是一个对象，主组件可以是一个对象    is解决标签嵌套的bug
  js
    <script>
    Vue.component('row',{
      /*组件里的data必须是一个function，不能是一个对象，根组件可以是一个对象,因为根组件只会被调用1次，而子组件会被多次调用，各个被调用的子组件的data应该是独立的数据存储，如果是一个对象，则会使data变成公共的*/
      data:function(){
        return {
          content:"this a hans"
        }
      },
      template:'<tr><td>{{content}}</td></tr>'
      })
      var vm =new Vue({
        el:'#root',
        data:{
        }
      })
    </script>
  html
    <table>
      <tr is='row'></tr>
      <tr is='row'></tr>
      <tr is='row'></tr>
    </table>
5-------------------------
  ref dom引用 子组件与根组件的引用  ref获取到的内容其实就是这个标签的dom元素 this.refs.XXXXX
  html
    <counter ref="one" @change="handleChange"></counter>
    <counter ref="two" @change="handleChange"></counter>
    <div>{{total}}</div>
  
  js
    <script>
      Vue.component("counter", {
        template: '<div @click="handleClick()">{{number}}</div>',
        data: function () {
          return {
            number: 0
          }
        },
        methods:{
          handleClick(){
            this.number++;
            this.$emit('change')
          }
        }
      })
      var vm = new Vue({
        el: '#root',
        data: {
          total: 0
        },
        methods: {
          handleChange() {
            this.total=this.$refs.one.number+this.$refs.two.number;
          }
        }
      })
    </script>
6----------------------------
  子父组件之间传值和非子父组件之间传值（总线模式/观察者模式/bus/发布订阅模式）
  例子：子父组件传值
  js
    Vue.component("child", {
          // props:{
          //   // 传递参数时可以做类型验证
          //    content:Number,
          //    content:{
          //      type:String,      //类型
          //      required:true,   //是否必传
          //      default:'缺省值'  //缺省值
          //      validator:function(value){
          //          return (value.length>5)   校验传参是否可以通过
          //      }
          // },
          //    content:[Number,String]
          // },
          props: ['content'],
          template: '<div>{{content}}</div>',
        })
  html
    <child :content="123"></child>
  例子：非子父组件传值
  js
    <script>
      // 给Vue实例挂载bus对象，使每个子组件都带有bus
      Vue.prototype.bus = new Vue()
      Vue.component("child", {
        // 子组件里的data必须是方法，child里的content是从父级接收过来的，在Vue中我们要有单向数据流，子组件不能改变父组件传递过来的内容，不然会有警告，所以用拷贝返回
        data: function () {
          return {
            selfContent: this.content
          }
        },
        props: {
          content: String
        },
        template: '<div @click="handleClick">{{selfContent}}</div>',
        methods: {
          handleClick: function () {
            this.bus.$emit('change', this.selfContent)
          }
        },
        // 监听子组件触发事件时  改变的selfContent
        mounted: function () {
          // this指向作用域改变
          var _this = this;
          this.bus.$on("change", function (msg) {
            _this.selfContent = msg;
          })
        }
      })
      var vm = new Vue({
        el: '#root'
      })
    </script>
  html
    <child content="Decc"></child>
    <child content="Leo"></child>
 7-----------------------------------
    插槽 例子：聚名插槽
    html 
          <!-- 聚名插槽 -->
          <div class="header" slot="header">header</div>
          <div class="footer" slot="footer">footer</div>
    js
        Vue.component("child", {
          template:"<div><slot name='header'>默认值</slot>  <div class='content'>content</div>  <slot name='footer'></slot>"
        })
    例子：作用域插槽
    html 
      <child >
        <!-- 作用域插槽  必须以template标签起尾申明，再申明从子组件传过来的接受对象props -->
        <!-- 什么时候用作用域插槽，当子组件做循环，或者某一部分他的dom结构应该由外部传递进来的时候 -->
          <template slot-scope="props">
                <p>{{props.item}}</p>
          </template>
      </child>
    js
    <script>
        // 给Vue实例挂载bus对象，使每个子组件都带有bus
        Vue.prototype.bus = new Vue()
        Vue.component("child", {
          data:function(){
            return{
              list:[1,2,3,4]
            }
          },
          template:"<div><ul><slot v-for='item of list' :item=item></slot></ul></d"
        })

        var vm = new Vue({
          el: '#root'
        })
    </script>
8--------------------------------------
  动态标签和v-once
  html
      <!-- 动态标签 component效果和下面一致-->
      <component :is="type"></component>
      <child-one v-if='type==="child-one"'></child-one>
      <child-two v-if='type==="child-two"'></child-two>
      <button @click='handleBtnClick'>change</button>
  js
    <script>
      // 加v-once让数据不再销毁，反之存入内存，优化性能
      Vue.component("child-one", {
        template:"<div v-once>one</div>"
      })
      Vue.component("child-two", {
        template:"<div v-once>two</div>"
      })
      var vm = new Vue({
        el: '#root',
        data:{
          type:'child-one'
        },
        methods:{
          handleBtnClick(){
            this.type=(this.type=='child-one'?"child-two":"child-one");
          }
        }
      })
    </script>


js原型链
event emitter
OVer 网站主题实现方案  
iOS下常见前端问题(iOS下input 无法自动聚焦的问题)
android
css动画
手写代码实现事件委托和闭包
map函数vue实现原理
vue实现原理
react和vue的区别
http响应头/状态码
http缓存
跨域的解决方案
性能优化
站点安全
module sconcat nginx
手写实现以下事件委托函数
手写实现inherit函数
手写实现throttle函数

css实现自适应的正方形
实现一个repeat函数，主要是闭包的应用
请解释XSS与CSRF分别是什么，两者有什么联系？如何防御？
我们提升前端加载性能通常采用以下手段，请分别说明为什么采用这些手段？除以下几点外，你所使用的其他手段还有哪些？
静态资源合并/静态资源通过CDN加载，并采用多域名 /采用HTTP缓存机制
写过哪些webpack 插件？
