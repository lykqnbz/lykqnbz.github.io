---
layout:     post
title:      "js模块化-javascript module相关"
subtitle:   "ECMAScript module"
date:       2018-06-03 17:21:04
author:     "AXiang"
header-img: "img/post-bg-Mjs_2.jpg"
catalog:  true
tags:
    - 前端
    - JavaScript
---

## 简介
现在，所有主流浏览器都已经支持JS module（Chrome、Edge、Safari、Firefox）。modules，就是JS的模块，我的理解就是，当有大量同类型或者有关联的数据和函数，方法需要当作一个整体展示的时候，可以单独定义成一个module也就是模块。module意义就使得代码模块化，使你的代码分成一个个逻辑上独立的子集，每个子集处理特定的功能，然后被单独调用。。

![module兼容性](/img/in-post/post-js/js_1902_3.png)

截止2018.12.02关于js module在国内环境下的兼容性概况。

#### 标准语法
javascript现在已经为模块化制定了标准语法。有了JS module，你可以用export关键字去导出任何东西。你可以导出const、function，或者任何其他变量绑定或声明。你需要做的只是在变量声明前加个export或者用export去声明它。
```js
    // mod.mjs
    export const repeat = (string) => `${string} ${string}`;
    export function shout(string) {
        return `${string.toUpperCase()}!`;
    }
```
可以使用**import**从任何其他模块导入模块。这里，我们从`mod`模块中引入`repeat`和`shout`方法，并在main模块（当前模块）中使用它们。
```js
    //  main.mjs
    import {repeat, shout} from './mod.mjs';
    repeat('hello');
    // → 'hello hello'
    shout('Modules in action');
    // → 'MODULES IN ACTION!'
```
也可以使用**export default**从模块中导出一个默认值。
```js
    // mod.mjs
    export default function(string) {
       return `${string.toUpperCase()}!`;
    }
```
用**export default**导出的模块可以在其它模块中使用任意名称去import。
```js
    // main.mjs
       import repeat from './mod.mjs';
       import shout from './mod.mjs';
```

JS module和普通的js脚本有些不同:
- module默认使用的是严格模式（strick module）
- 不支持html风格的注释
- 模块具有自己的作用域。这意味着在模块中使用**var foo = 42**并不会创建一个全局变量**foo**，不能通过**window.foo**去访问。这点和**普通的js脚本**不同
- **export**和**import**关键字仅可在模块系统中使用----所以不能在普通的js脚本中使用。

由于有这些不同点，当相同的js脚本分别被当做JS module和普通js脚本执行时，可能有不同的行为表现。所以，javascript运行环境必须知道引入的脚本是不是一个JS module。

## 在浏览器中使用JS modules
在web应用中，你可以将`<script>`标签的type属性设置为module，这样浏览器就会把引入的脚本识别为JS module。
```html
    <script type="module" src="main.mjs"></script>   
    <script nomodule src="fallback.js"></script>
```

浏览器会识别**type="module"**属性，并忽略设置有**nomodule**属性的脚本。这意味着你可以向支持模块加载的浏览器提供基于**JS module**的代码，同时让不支持模块加载的浏览器回退到**普通js脚本**模式。如果在表现上，这种区分脚本的能力惊人的有用。想一想：只有现代浏览器支持modules，如果浏览器能够识别你的模块代码，那么它肯定也支持在模块化标准之前的新的js特性，比如：**箭头函数**，**async-await**。你不需要再去编译那些使用新特性写的代码！能为现代浏览器提供更小、很大程度上不需要再编译的代码。只有不支持模块加载的浏览器会请求设置**nomodule**的脚本。

#### 特定于浏览器环境下， JS module和普通js脚本的区别
前面已经说过，**JS module**和**普通js**加载是不同的。在上边我们列举了一些平台无关的差异，在浏览器环境中它们还有一些不同点。比如，**JS module**只会被浏览器解析并执行一次，**普通js脚本**每一次通过``<script>``引入，浏览器都会去解析和执行它。
```html
    <script src="classic.js"></script>
    <script src="classic.js"></script>
    <!-- classic.js 会被多次解析 -->

    <script type="module" src="module.mjs"></script>
    <script type="module" src="module.mjs"></script>
    <script type="module">import './module.mjs';</script>
    <!-- module.mjs 只会被解析一次 -->
```
而且，**JS module**脚本和依赖有了跨域限制，这意味着任何跨域的JS module脚本都必须有正确的http头部信息。如：``Access-Control-Allow-Origin: *``。而**普通的js脚本**并没有这些限制。
另一个不同与async属性有关，async属性可以使js脚本的下载不会阻塞HTML解析（就像defer），但同时async属性也会使得脚本在加载完成后立即执行（defer是等到html解析完成后执行），不能保证脚本的执行顺序，也不会等待html解析完成。
async属性在内联**普通js脚本**不生效，不过在内联**JS module**模式下可以生效。

#### .mjs文件扩展名
我们在写模块代码时是用.mjs作为文件扩展名。在web中，只要http的响应头中提供了``JavaScript MIME typetext/javascript``字段，文件扩展名并不是特别重要。
而且，浏览器通过``<script>``标签上的type属性就可以知道这是不是一个JS module模块。    
但是，仍然推荐使用.mjs作为文件扩展名，原因有以下两个方面：    

- 在开发中，可以很容易的通过扩展名去辨识文件是一个模块而不是一个普通的脚本文件（仅仅靠查看代码去辨别不会总行得通）。正如前边提到的，浏览器对待模块代码和普通脚本文件是完全不同的。
- 符合node.js规范。nodeJs实验模块仅仅支持.mjs扩展名的文件。

#### 引入规范
当我们使用import时，在浏览器中，还有一些限制。浏览器是不支持下面这种引入方式的
```js 
    import {shout} from 'jquery';
    import {shout} from 'lib.mjs';
    import {shout} from 'modules/lib.mjs';
```
下面这些引用方式是合法的   
```js
    import {shout} from './lib.mjs';
    import {shout} from '../lib.mjs';
    import {shout} from '/modules/lib.mjs';
    import {shout} from 'https://simple.example/modules/lib.mjs';
```
引入必须是完整的URL，或以/ ./ ../开头的相对URL。

#### 模块默认是延迟执行的（defer）
普通js脚本默认会阻塞html解析。你可以加一个**defer**属性，让脚本的下载和html解析并发执行。

![defer and async](/img/in-post/post-js/js_1902_4.png)  
**JS module脚本**默认就有**defer**属性，所以，没有必要再加一个**defer**属性到``<script type="module">``标签上.
不仅仅是主模块，所有模块的加载都和html解析是并行的。

#### 使用更细粒度的模块
养成写更小、细粒度模块代码的习惯。在开发中，**每个（文件）模块只含有少数几个导出** 要比 **将多个导出写到一个文件** 好的多。
考虑这样一种情况，**util.mjs**文件导出三个方法分别是：``drop``，``pluck``和``zip``：
```js
    export function drop() { /* … */ }
    export function pluck() { /* … */ }
    export function zip() { /* … */ }
```
如果你的代码只需要``pluck``方法，你可能要这样写：
```js
    import { pluck } from './util.mjs';
```
在这种情况下（没有进行构建时打包），即使你只需要``pluck``一个导出，浏览器仍然需要去下载、解析和编译整个utils.mjs文件。真是糟糕呢~
如果``pluck``没有和``drop、zip``有任何共享模块的话，最好的做法是将它拆分为更细粒度的模块文件./pluck.mjs。
```js
    export function pluck() { /* … */ }
```
这样，我们可以只导入``pluck``，而不用浏览器去处理``drop``和``zip``模块：
```js
    import { pluck } from './pluck.mjs';
```
> 提示：您可以在此处使用命名导出export default  

这样不仅能使你的代码保持良好和简单，还能减少打包工具处理无用代码的时间。如果其中一个模块没有被使用，那它永远不会被import，所以浏览器永远不会使用它。而那些被使用的模块会被浏览器每个单独缓存下来。

#### 参考文献
- [在浏览器中使用 JavaScript module](https://wolfx.cn/ecmascript-modules-in-browsers/)  
- [ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/)
- [模块化标准之前的新的js特性](https://codepen.io/samthor/pen/MmvdOM)
- [JavaScript MIME相关](https://html.spec.whatwg.org/multipage/scripting.html#scriptingLanguages:javascript-mime-type)
- [node.js规范相关](https://nodejs.org/api/esm.html)
- [defer和async相关](https://www.cnblogs.com/tanhehe/p/4236021.html)


