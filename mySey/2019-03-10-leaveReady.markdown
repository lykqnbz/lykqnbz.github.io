
- javaScript的Event Loop机制：[博文笔记]](http://wangxiang.vip/2018/07/14/AboutJsEventLoop/) 2018-07-26
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
2  ------------------------
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
3   ------------------------
    vue中提供数组操作方法
    push 添加数据到数组最后一位
    pop  删除数组最后一位
    unshift 数组的开头添加一个或更多元素，并返回新的长度
    shift  数组的第一个元素从其中删除，并返回第一个元素的值
    splice(index,howmany,item1,item2………………)  移除数组的第三个元素，并在数组第三个位置添加新元素: 
4  -------------------------
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
5 ----------------------------
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
 插槽
 例子：聚名插槽
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
  -------------------------------------------



js原型链
event emitter
网站主题实现方案
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
