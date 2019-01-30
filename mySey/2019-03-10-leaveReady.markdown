
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
