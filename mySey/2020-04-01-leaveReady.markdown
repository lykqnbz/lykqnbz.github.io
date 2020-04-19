<!--
 * @Descripttion: 
 * @Author: AXiang
 * @Date: 2020-04-15 19:04:28
 * @LastEditors: AXiang
 * @LastEditTime: 2020-04-20 02:52:14
 -->
自审面试：
    1、谈谈CommonJS规范与AMD/CMD规范总结
      - AMD是由RequireJs对模块定义的规范化标准，而CMD是由SeaJs对模块定义的规范化标准。AMD的核心是预加载，就是在使用的时候先对依赖的全部文件进行加载，加载完了再进行处理，而CMD的核心是延迟加载，在需要的时候进行加载。都是使用关键字require调用模块，define定义模块，config是配置模块。
      - 而CommonJS的规范思想就是一个文件就是一个模块，拥有单独的作用域。普通方式定义的变量、函数、对象都属于该模块内。使用关键字require，exports来加载和暴露模块。

    2、keys和refs的作⽤是什么？
      -keys是用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识,在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性,会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染,并且不建议使用索引当key值
      -refs是提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。

    3、this的绑定策略
      -默认绑定：this 一般默认指向全局作用域
       隐式绑定：使用对象调用函数进行绑定( obj.fun() )  * 隐式绑定可能丢失 *
       显示绑定：使用 apply call bind 进行强制绑定
       new 绑定： 将 this 绑定到对象实例
    4、谈谈闭包函数，写一个闭包返回函数
      -闭包函数是指有权访问另一个函数中的变量的函数，最常见的方式是在一个函数内创建另一个函数，通过另一个函数访问这个函数的变量，其特点是函数嵌套函数，函数内的变量不会被垃圾回收机制回收，避免全局变量的污染
      fun1() {
        let sum=0;
        function fun2() {
            sum++;
            return sum
        }
        return fun2
      }   var s=fun1();  console.log(s());
    5、Vue修饰符
      .stop(阻冒泡) .self .prevent(阻默认) .native .once .trim
    6、冒泡算法
       -双层循环，相邻元素比较大小，交换位置从而达到排序的作用
       for(var i=0;i<arr.length;i++){
         for(var j=0;j<arr.length-i-1;j++){
           if(arr[j]>arr[j+1]){
             let tem = arr[j] ;arr[j]=arr[j+1];arr[j+1]=tem;
           }
         }
       }  O(n²)
    7、JS 作用域及作用域链
       一般情况下，变量取值在创建他的函数的作用域中取值。但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。
    8、柯里化函数 如何实现add(2)(3)(3)=9
       -利用闭包的特点，将收集到的参数保存在一个容器内，适当的时候返回。一个JS预处理的思想，降低通用性，提高适用性。一般用于减少重复传递不变的部分参数的时候
        function add(a) {
          var fn = function(b) {
              return add(a + b)
          }
          fn.toString = function() {
            return a
          }
        return fn
       }  var t = add(1)(2)(3)  console.log(t)
    9、设计模式
       -工厂模式，单例模式，发布者订阅模式(观察者)，MVVM模式
       工厂：适合可以解决多个相似的问题;
       单例：只能被实例化一次，并提供全局访问；
       发布者订阅：利用对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知
       MVVM模式：Model 层，View层，ViewModel层，通过操作M层，V层也跟着变化，其原理是通过VM层来实现双向绑定。
    10、数据结构有哪些
       -集合(Set)，队列，栈(koa中间件,redux)，链表，字典(Map),哈希表，树(CSSTREE,HTMLTREE,DOMTREE,二叉树)
    11、命名视图和命名路由，以及路由传参
       -在vue-route里  path:'/index'  叫命名识图， name：'index' 叫命名路由
       -query传参通过URL传参，刷新依旧在
       -parms传参是要在定义路由信息时以占位符的方式指定路由地址，刷新也在，但是不配置路由，则刷新会消失
       -接收方式 this.$route.query  this.$route.params
    12、前端处理大量数据
       -从数据上处理：分页分表，比如前端可以把数据分页展示，后端也分段吐数据
       -从渲染上解决：异步渲染，比如进入页面先不渲染，然后加载好页面再渲染，或者使用虚拟列表实现局部渲染，只渲染目前可见区域的数据，再渲染次屏数据。还有性能瓶颈，可以考虑web worker 做压缩和解码，也可以考虑离屏canvas做预渲染
       -减少网络耗时：压缩数据，gzip等
    13、谈谈Vue组件
       -vue组件其实也是vue的实例，组件是可以反复使用的vue实例，可以全局在Vue.component()注册组件，也可以某个页面里用components注册
       -父子组件传值 利用props, this.$emit 进行通讯
       -非父子组件传值可以用有点下订阅模式的方法，给Vue实例挂载一个对象，使每个子组件都带有这个对象，利用对象名.$on()的方式来传递，对象名.$emit 来进行通讯
       -动态组件利用is关键字的特性切换对应的父组件实现传值
    14、assets和static
        -assets里的会被打包后放在static里，static的不会，另外在JS里使用assets里的资源需要require
    15、节流和防抖
        -节流：优化高频率执行js代码的一种手段，保证一段时间内只执行一次核心代码   核心：持续触发并不会执行多次，到一定时间再去执行
        -防抖：在一定时间段的连续函数调用，只让其执行一次。 核心：持续触发不执行，不触发的一段时间之后再执行
    16、vue的权限控制
        -创建一个js文件作为对vue全局拦截器，利用beforeEach等钩子函数实现对权限的判断，动态生成路由
    17、vue的生命周期
        -created,mounted,updata,destory
    18、简述Vuex的原理和使用方法，为什么要用它
        -对为Vue的开发的状态管理模式，外部调用dispatch(dis棒尺)来触发actions里面的方法，actions里面的每个方法中都会有一个commit方法，利用commit触发mutation对state进行修改，当数据修改完毕后，会传导给页面。页面的数据也会发生改变
        五大核心
        state（存储数据，利用this.$store.state来访问，为全局响应式）
        getter（可以认为是store 的计算属性和watch，computed有点像）
        mutation（提供更改state中状态的方法）
        action（外部通过自带的commit提交 mutation 间接更变状态）
        module（将 store 分割成模块）
        由于在vue中传参的方法对于多层嵌套的组件将会非常繁琐，所以我们需要把组件的共享状态抽取出来，构成一个公共的识图，任何组件都能获取状态或触发行为
    19、router、routes、route的区别
        -router：路由器对象  $router.push()
        -routes：创建vue-router路由实例的配置项
        -route：路由对象表示当前路由状态   this.$route
    20、vue路由的两种模式
        - hash模式 工作原理是触发监听hachChange事件，通过改变hash标志#后的数据来控制我们需要的操作
        - history模式 则更加自由，提供了history的api，包含路由前进后退跳转修改等操作。但是页面刷新后如果服务器配置的URL匹配不到资源则会返回404，我们一般靠配置nginx转发index.html
    21、vue的双向绑定原理
        -Vue采用数据劫持结合发布者-订阅者模式的方法，通过Object.defineProperty()来劫持各个属性的setter,getter属性，在数据变动话，通知订阅者，触发更新，重新渲染视图
    22、如何定义vue-router的动态路由，怎么获取传过来的动态参数
        -path属性加上/:id，使用router对象的params.id来获取
    23、简述vue-router导航钩子
        -主要用来作用是拦截导航，让他在完成前进行一些操作。分为全局的，独个路由的，以及组件的。
        全局有：beforeEach()，afterEach()等，路由的有beforeEnter(),组件的有beforeRouteEnter，Update，Leave。都有to, from, next三个参数
    24、手写数组去重，获取不同随机数，遍历DOM树
        - let arr = [1, 3, 5, 3, 1, 6, 8, 4, 5, 5, 6, 7, 8]  let hash = []   let n = []
          arr.forEach((item, index) => {
            if (!hash[arr[index]]) {
              hash[arr[index]] = true
              n.push(item)
            }
          })
        -   let tem = []
            for (let i = 0; i < 100; i++) {
              let num = Math.floor(Math.random() * 10)
              if (tem.indexOf(num) == -1) {
                tem.push(num)
              }
              if (tem.length == 10) {
                break
              }
            }
        -   const DFS = {
              nodes: [],
              do(root) {
                for (let i = 0; i < root.childNodes.length; i++) {
                  var node = root.childNodes[i]
                  this.nodes.push(node)
                  this.do(node)
                }
                return this.nodes
              }
            }   console.log(DFS.do(document.body))
      25、解释一下什么是Nginx?
        -Nginx是一个web服务器和反向代理服务器
      26、解释Nginx如何处理HTTP请求
        -Nginx使用反应器模式，会根据过来的http请求头里的Host字段里的值，来判断使用哪个server{}
      27、使用“反向代理服务器”的优点是什么
        -隐藏源服务器的存在和特征，充当互联网云和web服务器之间的中间层。安全方面来说是很好的。
      28、canvas与svg的区别有什么？
        -canvas是H5提供新的元素，svg是描述二维图形的语言。canvas通过JS进行绘制，，不依赖分辨率,逐像素进行渲染，支持事件处理器，复杂度高会延缓渲染速度，一旦绘画完成就不会被浏览器所关注，如果发生位置之类的变化，那整个场景也需要重新绘制。 而在svg中，渲染依赖分辨率，并且不支持事件处理器，但每个被绘制图像都是一个对象，如果svg对象的属性发生变化，浏览器会自动重绘图像。  
      29、canvas的特点
        -数据储存结构是点阵，有层级之分，先画的在下，后画的在上。可以绘制线条，字符图片等。在数据覆盖到屏幕数据前，任意代码操作都不影响输出。
      30、canvas中，什么是跳帧？
        -当Canvas绘画所需的时间大于一次循环更新所需的时间，我们的下一帧就不绘画了，把时间留给上一帧绘画，以此保证上一帧绘画完整。如果两帧的时间还画不完说明主线程循环速度需要调节。
      31、Vue的渐进式理解
        -在我看来，渐进式代表的含义是：主张最少。每个框架都不可避免会有自己的一些特点，从而会对使用者有一定的要求，这些要求就是主张，主张有强有弱，它的强势程度会影响在业务开发中的使用方式，例如angular强主张使用它的模块机制必须使用它的依赖注入，React主张函数式编程一样。Vue可能有些方面是不如ang，react，但是它是渐进的，没用强主张，你可以在原系统上，改用一两个组件用vue实现，当jqeruy用，也可以用全家桶开发之类，渐进式的含义，我的理解是：没有多做职责之外的事
      32、浏览器是如何渲染页⾯的？
        -解析HTML文件，创建DOM树。自上而下，遇到任何样式（link、style）与脚本（script）都会阻塞。然后解析CSS，.将CSS与DOM合并，构建渲染树。最后布局和绘制，重绘（repaint）和重排（reflow）
      33、前后端路由的区别？
        -后端路由页面请求的url全部要通过后端服务的过滤器进行过滤和处理，前端浏览器显示的页面信息是通过后端服务直接处理过的
        -前端路由没有原来意义上的页面跳转，改变url不触发请求，页面的跳转和切换，只需要请求数据，关注接口数据的改变即可。不会再去重新请求js文件及css文件