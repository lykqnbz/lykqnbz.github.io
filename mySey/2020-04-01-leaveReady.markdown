<!--
 * @Descripttion: 
 * @Author: AXiang
 * @Date: 2020-04-15 19:04:28
 * @LastEditors: AXiang
 * @LastEditTime: 2020-04-16 03:05:25
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
    18、谈一谈vuex
        -对Vue的状态管理，利用commit触发mutation对state进行修改
        五大核心
        state（存储数据，利用this.$store.state来访问，为全局响应式）
        getter（可以认为是store 的计算属性和watch，computed有点像）
        mutation（提供更改store中的状态的方法）
        action（外部通过自带的commit提交 mutation 间接更变状态）
        module（将 store 分割成模块）
    19、router、routes、route的区别
        -router：路由器对象  $router.push()
        -routes：创建vue-router路由实例的配置项
        -route：路由对象表示当前路由状态   this.$route



