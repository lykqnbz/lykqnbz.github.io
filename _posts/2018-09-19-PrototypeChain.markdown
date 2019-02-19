---
layout:     post
title:      "浅入JS的原型链"
subtitle:   ""
date:       2018-09-19 11:01:04
author:     "AXiang"
header-img: "img/post-bg-Mjs.jpg"
catalog:  true
tags:
    - 前端
    - JavaScript
---

> prototype chain

## 原型
首先要说一下为什么会有原型这个东西，那是因为在 JavaScript 中并没有 “类” 的概念，它是靠原型和原型链实现对象属性的继承，即便在 ES6 中新出了class的语法，但那也只是一个语法糖，它的底层依然是原型。

要理解原型（原型链），最重要的是理解两个属性以及它们之间的关系，附上一张经典关系图：
- __ proto __
- prototype

![区别图](/img/in-post/post-js/js_1902_1.png)

### __ proto __
JavaScript中，万物皆对象，所有的对象都有__proto__属性（null和undefined除外），而且指向创造这个对象的函数对象的prototype属性。   

```js

    var obj = {};
    console.log( obj.__proto__ === Object.prototype ); // true
    var arr = [];
    console.log( arr.__proto__ === Array.prototype ); // true
    var fn = function(){};
    console.log( fn.__proto__ === Function.prototype ); // true
    var str = "";
    console.log( str.__proto__ === String.prototype ); // true
    var num = 1;
    console.log( num.__proto__ === Number.prototype ); // true

```

前面说了，在 JavaScript 中，一切皆对象（可以理解为它们都是从对象那里继承过来的），所以基本类型对象也是通用：
```js

    console.log( Function.prototype.__proto__ === Object.prototype ); // true
    console.log( Array.prototype.__proto__ === Object.prototype ); // true
    console.log( String.prototype.__proto__ === Object.prototype ); // true

```
而因为Object.prototype的__proto__已经是终点了，所以它的指向是：
```js

    console.log( Object.prototype.__proto__ === null ); // true 

```
**注意**，虽然大多数浏览器都支持通过__proto__来访问，但它并不是ECMAScript的标准，在ES5中可以通过**Object.getPrototypeOf()**来获取这个属性。
```js

    var obj = {};
    console.log( Object.getPrototypeOf(obj) === Object.prototype ); // true

```

### prototype
prototype是每个函数对象都具有的属性（它也有__proto__，因为函数也是对象），实例化创建出来的对象会共享此prototype里的属性和方法（通过__proto__）。在上面的例子中已经看到过prototype的身影，下面通过一个例子来讲述它的作用。现在我们有一个构造函数Person，并且对它进行实例化：
```js 

    function Person(name){
        this.name = name;
        this.sayName = function(){
            console.log("我的名字是：" + this.name);
        }
    }

    var a = new Person("小明");
    var b = new Person("小红");

    a.sayName(); // 我的名字是：小明
    b.sayName(); // 我的名字是：小红

```

### new运算符的缺点
但是，用构造函数生成实例对象，有一个缺点，那就是无法共享属性和方法。例如上面例子中的a和b，它们都有sayName方法，虽然做的事相同，但它们却是独立的，这就会造成极大的资源浪费，因为每一个实例对象，都有自己的属性和方法的副本。

### prototype属性的引入
考虑到这一点，JS大佬决定为构造函数设置一个prototype属性。这个属性包含一个对象，所有实例对象需要共享的属性和方法，都放在这个对象里面，而不需要共享属性和方法，就放在构造函数里面，这个对象就是prototype对象。实例对象一旦创建，将自动引用prototype对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的。

现在对上面的例子进行改写：

```js

    function Person(name){
    this.name = name;
    }
    Person.prototype = {
        sayName : function(){
            console.log("我的名字是：" + this.name);
        }
    }

    var a = new Person("小明");
    var b = new Person("小红");
    a.sayName() // 我的名字是：小明
    b.sayName() // 我的名字是：小红

```
现在无论Person被实例化多少次，它的实例对象都共享同一个sayName方法，这就是prototype最大的用处。

## 原型链
讲原型一个不可避免的概念就是原型链，原型链是通过__proto__来实现的。现在我们以Person的例子来讲整个原型链。
```js

    var a = new Person("小明");
    // 实例化对象的 __proto__ 指针指向构造函数的原型
    console.log( a.__proto__ === Person.prototype )
    // 构造函数的原型是一个对象，它的 __proto__ 指向对象的原型
    console.log( Person.prototype.__proto__ === Object.prototype )
    // 函数也是一个对象，它的 __proto__ 指向 函数的原型
    console.log( Person.__proto__ === Function.prototype )
    // 函数的原型是一个对象，它的 __proto__ 指向对象的原型
    console.log( Function.prototype.__proto__ === Object.prototype )
    // 对象的原型的__proto__ 指向 null
    console.log( Object.prototype.__proto__ === null )

```

![链式图](/img/in-post/post-js/js_1902_2.png)
以上就是a对象的整个原型链和图解。

### 属性查找机制
当访问一个对象的属性时，Javascript 会从对象本身开始往上遍历整个原型链，直到找到对应属性为止。如果此时到达了原型链的顶部，也就是上例中的 Object.prototype，仍然未发现需要查找的属性，那么 Javascript 就会返回 undefined值。

### 应用简单实例
利用 Function 创建一个求三个数中最大数的函数：
```js
    // 传统
    function foo ( a, b, c ) {
        var res = a > b ? a : b;
        res = res > c ? res : c;
        return res;
    }
    foo();
    // Function
    var func = new Function( 'a', 'b', 'c', 'var res = a > b ? a : b;res = res > c ? res : c;return res;' )
    func();
    // Function太长可简化
    function foo ( a, b, c ) {
        var res = a > b ? a : b;
        res = res > c ? res : c;
        return res;
    }
    var func = new Function( 'a', 'b', 'c', 'return foo( a, b, c );' );
    func();

```




