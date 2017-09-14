---
layout:     post
title:      "JavaScript中对象相等问题粗鉴"
subtitle:   "　"
date:       2017-09-08 10:07:12
author:     "AXiang"
header-img: "img/post-bg-note.jpg"
tags:
    - 前端
    - JavaScript
---

> “如何判断两个对象相等”

在`JavaScript`中，等于操作符由两个等于号组成**==**，等于操作符会为了两个数的比较而对其进行强制类型转换。
 ```js

    ""           ==   "0"           // false  
    0            ==   ""            // true  
    0            ==   "0"           // true  
    false        ==   "false"       // false  
    false        ==   "0"           // true  
    false        ==   undefined     // false  
    false        ==   null          // false  
    null         ==   undefined     // true  

 ```
等于操作符会为了比较而自行将操作数进行转换，这往往不是我们想要的结果，所以在日常中，一般推荐使用恒等于操作符，恒等于操作符由三个等于号组成**===**。它不像普通的等于操作符，不会进行强制类型转换，只有两边绝对的相同才会认定等式成立。这样的话上述的结果就不太相同了：
 ```js

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false

 ```
 ---

这里对**null**与**undefined**再做分析，这两种类型都是`JavaScript`中存在的原始类型。这常常会使我们产生疑问，在什么时候为null，什么时候为undefined。        
**Undefined类型**只有一个值，即**undefined**。当声明的变量还未被初始化时，变量的默认值为undefined。        
**Null类型**也只有一个值，即**null**。null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。
```js

    var a;   
    alert(a==undefined);                                // true
    alert(null == document.getElementById('abc'));      // true

```
代码上部分显示为true,代表a的值即为undefined，因为我们没有初始化它。当页面上不存在id为abc的DOM节点时，下部分代码显示也为true，因为我们尝试获取一个不存在的对象。
``` js

    alert(typeof undefined);    // undefined
    alert(typeof null);         // object

```
第一行代码很容易理解，undefined的类型为Undefined；第二行代码就不那么明白了，为什么null的类型又是Object了，网上提供的资料显示这是`JavaScript`最初实现的一个错误，后来被ECMAScript沿用下来。在今天我们可以解释为，null即是一个不存在的对象的占位符，但是在实际编码时还是要注意这一特性。
```js

    alert(null == undefined);                // true 
    alert(null === undefined);               // false 
    alert(typeof null == typeof undefined);  // false

    --------------------------------------------------------------------
    
    alert(null == document.getElementById('abc'));        // true
    alert(null === document.getElementById('abc'));       // true
    alert(undefined == document.getElementById('abc'));   // true
    alert(undefined === document.getElementById('abc'));  // false

```
ECMAScript认为undefined是从null派生出来的，所以把它们通过转换后定义为相等。日常我们需要区分的时候，可以在恒等于符号情况下进行区别，null与undefined的类型是不一样的，所以输出false。    
下半部分代码也很好的说明了这个问题，当使用**==**时，null和undefined都为true，因为undefined被强制转换了，当使用**===**时，undefined就不行了，说明其本质为null。

---
关于**==**和**===**也有一些小bug。
如果a===b为true，那么a就和b相等了吗？绝大部分情况下是这样的，但是有一个特殊的例子：就是+0和-0。

```js

    // case_1
    alert(+0 === -0);           // true

    // case_2
    alert((-0).toString());     // '0'
    alert((+0).toString());     // '0'

    // case_3
    alert(-0 < +0);             // false
    alert(+0 < -0);             // false

    // case_4
    alert(1 / +0);              // Infinity
    alert(1 / -0);              // -Infinity

    // case_5
    alert(1/+0 === 1/-0);       // false

```
那么为什么会有这样麻烦的特例呢，因为`JavaScript`采用了**IEEE_754 浮点数表示法**(几乎所有现代编程语言所采用)，这是一种二进制表示法，按照这个标准，最高位是符号位(0代表正，1代表负)，剩下的用于表示大小。而对于零这个边界值1000(-0)和 0000(0)都是表示0，这才有了正负零的区别。   
那么我们又该如何在 === 结果为 true 的时候，区别0和-0得出正确的结果呢？我们可以这样写个比较函数：
```js

    function comPare(a,b){
        if (a === b) 
            return a !== 0 || 1 / a === 1 / b;
        
        return false;
    }

    alert(comPare(0, 0))    // true
    alert(comPare(0, -0))   // false

```
---
虽然**==**和**===**操作符都是等于操作符，但是当其中有一个操作数为对象时，结果就不同了。
```js

    alert(new Number(1) === 1);          // false
    alert(new String('a') === 'a');      // false
    alert(true === new Boolean(true));   // false

```
这里等于操作符比较的不仅仅是值数是否相等，而是是否属于同一个身份对象。也就是说，只有对象的同一个实例才被认为是相等的。

---
总结：**==**先转换类型再进行比较，而**===**则先判断类型，如果不是同一类型直接为false，否则再比较的两边数值要绝对的相同才会判定为相等。前提都为比较操作数不是对象和正负零的情况下 :D。