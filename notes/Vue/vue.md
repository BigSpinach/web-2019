[TOC]





----



# Vue.js



## 1.`Vue`实例



### 1.1 创建一个 `Vue`实例



```javascript
//根根实例
//一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，
var vm = new Vue({
  // 选项
})
```



### 1.2 数据响应(`reactivity`)

> 当`vue`实例被创建的时候，它将 `data` 对象中的所有的属性加入到 Vue 的**响应式系统**中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```javascript
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的属性
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置属性也会影响到原始数据
vm.a = 2
data.a // => 2

// ……反之亦然
data.a = 3
vm.a // => 3
```

此时`data`中的数据会影响所有页面中绑定的`data`数据,当修改一处`data`中的值，页面中所有用到`data`值的地方都会发生改变



**数据响应的原理**

```html
<div id="app">
  {{obj}}
</div>

<script>
	let vm = new Vue({
    el:"#app",
    data:{
      obj:{}
    }
  });
</script>
```

> vue 会循环data中的数据（数据劫持），依次的增加getter和setter
>
> ```html
> <div id="app">
>   <!--增加v-model 指令实现数据影响视图效果-->
>   <!-- v-model  实现双向数据绑定-->
> 	<input v-modle='a'>  {{obj}}
> </div>
> 
> //vue 会循环data中的数据（数据劫持），依次的增加getter和setter
> //查看vm实例，实例中的get和set方法
> <script>
> 	let vm = new Vue({
>     el:"#app",
>     obj:{
>      
>     }
>   });
> </script>
> ```
>
> 





> 给数据初始化值（其实就是给代理对象vm增加了所要代理的对象的属性）
>
> 所以
>
> 使用变量是，一定要先初始化变量，否则不会有响应式数据效果
>
> ```html
> <div id="app">
>   <!--增加v-model 指令实现数据影响视图效果-->
>   <!-- v-model  实现双向数据绑定-->
> 	<input v-modle='a'>  {{obj.name}}
> </div>
> 
> //vue 会循环data中的数据（数据劫持），依次的增加getter和setter
> //查看vm实例，实例中的get和set方法
> <script>
> 	let vm = new Vue({
>     el:"#app",
>     obj:{
>      name:''
>     }
>   });
> </script>
> ```
>
> 



> 三种解决数据响应的方式
>
> ```html
> <div id="app">
> 		{{obj.name}}
> </div>
> 
> 
> <script>
> 	let vm = new Vue({
>     el:"#app",
>     data:{
>       obj:{
> 				//第一种：初始化
>      		//name:'', 
>       }          
>     }
>   });
>   
>  //第二种：不初始化，使用set方法设置响应式变化的属性
>  //vm.$set(obj.name,'BigSpinach');
>   
>   //第三种：替换原对象
>   vm.obj = {name:'BigSpinach',age:26};
> </script>
> ```
>
> 

### 1.3 双向数据绑定

> vue 会循环data中的数据（数据劫持），依次的增加getter和setter

```html
<div id="app">
  <!--增加v-model 指令实现数据影响视图效果-->
  <!-- v-model  实现双向数据绑定-->
	<input v-modle='a'>
  <input v-model='b'>
  <div>
  	{{a}}
  </div>
</div>

//vue 会循环data中的数据（数据劫持），依次的增加getter和setter
//查看vm实例，实例中的get和set方法
<script>
	let vm = new Vue({
    el:"#app",
    data:{
     a:"aaaa",
     b:"bbbb",
    }
  });
</script>

```

> 双向数据绑定的原理

```javascript
/*
    实现效果：当input中的数据发生该变，映射其他地方使用到的绑定的数据
    原理： 
        1.给每一个input标签设定自定义属性 v-model
        2.然后遍历所有的input标签，获取到有v-model属性的input标签
        3.获取所有拥有`{{val}}` 的字符串
        4.遍历拥有v-model属性的input标签，并且把v-model='val'的值获取到，
          添加onchange方法：当val值发生变化，给第三步中拥有 “{{val}}”的变量赋值
          从而实现双向数据绑定
  */

  let data = {name: "BigSpinach", age: 26};
  let app = document.getElementById('app');
  let inputs = app.getElementsByTagName('input');
  
  for(let item of inputs){
    if(item.getAttribute('v-model')){
      item.value=data[item.getAttribute('v-model')];
    }
  }

  //获取app下面除了input之外的所有子元素节点
  let childNodeList = [...app.children].filter(item=>item.nodeName!="INPUT");
  //console.log(childNodeList);
  let reg = /\{\{(\w+)}}/;
  childNodeList.forEach(item=>{
    if(reg.test(item.innerHTML)){
      item.innerHTML = item.innerHTML.replace(reg,function(...arg){
        return data[arg[1]];
      })
    }
  });

  //使用Object.defineProperties ,以代理的方式管控data
  Object.defineProperties(data,{
    name:{
      set(val){
        data.name = '刘凯';
      }
    },
    age:{}
  });

```





### 1.4 指令

#### 1.4.1 `v-text`

```html
<!--此时text应该是text文本-->
<p v-text="text">{{text}}</p>
```



#### 1.4.2 `v-html`

```html
<!--此时text应该是一段html代码-->
<p v-html="text">{{text}}</p>
```





#### 1.4.3 `v-once`



```html
<p v-once>{{a}}</p>
```

#### 1.4.4 `v-for`

```html
<!--循环数字-->
<ul>
    <li v-for="item in 3">{{item}}</li>
</ul>

<!--得到的结果就是-->
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>



<!-- 循环数组 -->
<ul>
    <li v-for="item in arr">{{item}}</li>
</ul>



<!-- 循环对象 -->
<ul >
   <li v-for="(value,key) in obj">{{value}}---{{key}}</li>
</ul>


<!-- 嵌套循环 -->
<ul v-for="item in arrs">
    <li v-for="(value,key)  in item">{{value}}---{{key}}</li>
</ul>
```



#### 1.4.5 `v-bind`

动态绑定属性

```html
<div v-bind:class='className'>
      xxx
</div>
 <!-- vue2.0之后 -->
  <div :class='className'>
        xxx
  </div>

<!-- 此时页面中显示的是 -->
 <div class='container'>
      xxx
 </div>

<script>
    let vm = new Vue({
      el: "#app",
      data: {
        className: 'container',
        
      }
    });
</script>
```





#### 1.4.6 `v-show`

```html
<div v-show="1">
 显示
</div>

<div v-show="0">
 隐藏
</div>
<!--页面中显示的效果是-->
<div v-show="0" style="display:none">
 隐藏
</div>
```





#### 1.4.7`v-if`

```html
<div v-if="1">
 显示
</div>

<div v-if="0">
 隐藏
</div>
<!--页面中显示的效果是-->
<!--直接删除这个元素：不好？引发dom回流-->

```





[事件修饰符](https://cn.vuejs.org/v2/guide/events.html#事件修饰符)

> `.stop   `		 	    冒泡
>
> `.prevent ` 		 默认行为
>
> `.capture `		  捕获阶段发生
>
> `.self`			     自己作为事件源的时候才会发生
>
> `.once`			     绑定事件只执行一次
>
> `.passive`		   不阻止默认行为，提升移动端性能，一般在滚动事件中加

```html
<!--阻止冒泡-->
<p $click.stop="fn($event)">点我</p>
```





[按键修饰符](https://cn.vuejs.org/v2/guide/events.html#按键修饰符)

> - `.enter`
> - `.tab`
> - `.delete` (捕获“删除”和“退格”键)
> - `.esc`
> - `.space`
> - `.up`
> - `.down`
> - `.left`
> - `.right`



[系统修饰键](https://cn.vuejs.org/v2/guide/events.html#系统修饰键)

> - `.ctrl`
> - `.alt`
> - `.shift`
> - `.meta`
> - `.exact`
> - `.left`
> - `.right`
> - `.middle`



### 1.5 绑定事件@事件类型

```html
<!--知识点-->
<!--0级事件绑定要加  ()-->
<p onclick="fn(event)">点我</p>
<!--这里的event是实参 ，就是window.event-->


<!--@click相当于onclick-->
<!--@click相当于onclick 但是函数不需要加(),默认执行的时候，默认传递一个事件对象-->
<p @click="fn">点我</p>

<!--加()，如果用到事件对象，必须手动传递一个事件对象  $event代表的是window.event-->
<p $click="fn($event)">点我</p>
```



### 1.6 `checkbox 、select、radio中的v-model`

#### 1.6.1 checkbox

```html
<!--传统checkbox中checked属性只要加上，不管设置checked=false，都是选中的样式-->
  <input type="checkbox" checked='false' value="默认选中">选中
  <hr>
  
<div id="app">
    <!-- 在vue中，加上的isCheck属性可以管控是否为选中的情况 -->
    <input type="checkbox" value="默认选中" v-model="isCheck1">选中
    <hr>  

    <br>
    <!-- 如何实现多选 -->
    <!-- v-mode中放置一个数组，表示每一个checkbox -->
    <input type="checkbox" value="A" v-model="arr" @change='changeOne'>A
    <input type="checkbox" value="B" v-model="arr" @change='changeOne'>B
    <input type="checkbox" value="C" v-model="arr" @change='changeOne'>C
    <input type="checkbox" value="all" v-model="isCheck" @change='changeAll'>all
    <br>
    {{arr}}
  </div>
<script>
  let vm = new Vue({
    el: "#app",
    data: {
      isCheck1:true,
      isCheck: false,
      arr: []
    },
    methods:{
      changeOne(){
        //是否为选中样式取决于 arr.length 是否为3？  所有 @checkOne 事件函数的长度
        this.isCheck=this.arr.length===3;
      },
      changeAll(){
        //如果选中 arr=[A,B,C]
        //否则 arr=[]
        this.arr=this.isCheck?['A','B','C']:[];
      }
    },
  });
</script>
```

#### 1.6.2 radio

```html
 <div id="app">
    <input type="radio" value="男" v-model="sex">男
    <input type="radio" value="女" v-model="sex">女
    <br>
    {{sex}}
  </div>
  <script>
    let vm = new Vue({
      el: "#app",
      data: {
        sex: '男'
      }
    });
  </script>
```



#### 1.6.3 select

```html
<!-- 单选 -->
    <!-- v-modle中是一个值，存放的是选中的option的value值，如果没有value值，就是啥也不显示 -->
    <select v-model='sel'>
      <option value="1">休闲鞋</option>
      <option value="2">运动鞋</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="">5</option>
    </select>
    <br>
    {{sel}}


<!-- 多选multiple -->
    <select v-model='sel' multiple>
      <option value="1">休闲鞋</option>
      <option value="2">运动鞋</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="">5</option>
    </select>
    <br>
    {{sel}}

<script>
  let vm = new Vue({
    el: "#app",
    data: {
      //sel: null //初始化可以是任意数据，之后会被覆盖
      //sel: null //如果是多选的时候，初始化应该为一个array数据类型的值，不能是其他，否则报错，但仍然能正常执行
      //vue.js:634 [Vue warn]: <select multiple v-model="sel"> expects an Array value for its binding, but got Null
      sel:[]
    }
  });
</script>
```





### 1.7 `过滤器filters`

#### 1.7.1 局部过滤器

> filter是一个对象，里边可以写很多个过滤方法

```html
 <!-- 
    值|过滤器   ---过滤器是一个函数
    这个过滤器就是用来处理前边这个值的 
  -->
<p>{{552.5646546|toFixed(6)}}</p>
<script>
    let vm = new Vue({
      el: "#app",
      data: {},
      filters:{
        toFixed(n){
          //n表示保留几位小数
          //console.log(this);//window      //console.log(arguments);//Arguments(2) [552.5646546, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
          return arguments[0].toFixed(arguments[1]);       
        }
      }
    });
  </script>
```





#### 1.7.2 全局过滤器`Vue.filter()`

```javascript
//语法
// Vue.filter(filterName,filtrFunction)
let myFilter = function myFilter(target，n){
  return target.toFixed(n);
}；
Vue.filter('myFilter',myFilter(n));

let vm = new Vue({
      el: "#app",
      data: {},
      filters:{
        //局部过滤器
        toFixed(n){
         ...      
        }
      }
});
```





### 1.8 计算属性

> 计算属性：将`某一个属性`设置为`计算属性，那么他所依赖的属性发生变化，那么它自己也会变化

```javascript
let vm = new Vue({
      el: "#app",
      data: {
        a:1,
        b:2,
        obj:{}
      },
     	computed:{
        //计算属性声明定义的属性，在data中就不要声明定义初始化了
        //跟data中的数据一样，可以通过vm.xxx获取或者修改
        isAll:{
          get(){
            //只要获取这个属性就会触发 get方法
            //只要是依赖的值（必须有setter和getter响应的数据）发生了改变，就会重新计算自己的值
            //this 就是vm   
            return this.isAll = this.a+this.b；
          },
          set(val){
            //只要是设置，就会触发这个set方法
            //val是设置的值
            return 
          }
        }	，
        
        //只要是依赖的值（必须有setter和getter响应的数据）发生了改变，就会重新计算自己的值
        sum:{
        	get(){
  					//上边的data中只声明了obj={},并没有给obj.a初始化值，此时的a就没有getter和setter响应 ，所以就是 undefined，也不会建立起响应式数据的映射
  					return this.obj.a+1;
  					//所以说：这里边出现的变量，一定要在data中初始化
					}
      	},
                 
        //计算属性必须有getter。可以没有setter
        //什么样的计算属性才会 v-mode中的属性
        //只有get 的计算属性的简写
        ss：{
             get(){}
        },
        ss(){
          //这里的这个 ss函数就相当于get()
        }
        
      }
});
```





### 1.9 `watch` 监听对象

+ **类型**：`{ [key: string]: string | Function | Object | Array }`

+ **详细**：一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 `$watch()`，遍历 watch 对象的每一个属性。

+ **示例**：

  ```javascript
  var vm = new Vue({
    data: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: {
        f: {
          g: 5
        }
      }
    },
    watch: {
      a: function (newVal, oldVal) {
        console.log(newVal,newVal);
      },
      // 方法名
      b: 'someMethod',
      
      c: {
        handler: function (newVal, oldVal) { /* ... */ },
        deep: true,// 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
        
      },
      
      d: {
        handler: 'someMethod',
        immediate: true// 该回调将会在侦听开始之后被立即调用
      },
      e: [
        'handle1',
        function handle2 (val, oldVal) { /* ... */ },
        {
          handler: function handle3 (val, oldVal) { /* ... */ },
          /* ... */
        }
      ],
      // watch vm.e.f's value: {g: 5}
      'e.f': function (val, oldVal) { /* ... */ }
    }
  })
  vm.a = 2 // => new: 2, old: 1
  ```

  

### 1.10 动态绑定`class`

> 核心操作：通过给`class`样式类名绑定一个`对象`或者`数组`的方式，来控制该元素所拥有的的样式类名

```html
<div id="app">
    <h1>动态绑定class</h1>
    <div :class="box1">:class="box1"</div>
    <div :class="{box1:1}">:class={box1:1}</div>
    <div :class="{box1:0}">:class={box1:0}</div>
    <div :class="{box1:true}">:class={box1:true}</div>
    <div :class="{box1:false}">:class={box1:false}</div>
    <hr>
    <div :class="{box1:false,box2:false}">:class={box1:false,box2:false}</div>
    <div :class="{box1:false,box2:true}">:class={box1:false,box2:true}</div>
    <div :class="{box1:true,box2:true}">:class={box1:true,box2:true}</div>

    <hr>
    <p>：class绑定的是一个数组</p>
    <div :class="['box1','box2']">:class=['box1','box2']</div>
    <div :class="['box1','box2'][0]">:class=['box1','box2'][0]</div>

    <input type="text" v-model='flag' @keyup.enter="val=flag;flag=''">
    <ul >
      <li :class={box2:val==item}  v-for="item in arr">{{item}}</li>
    </ul>


  </div>
<script>
  let vm = new Vue({
    el: "#app",
    data: {
      val:'',
      flag:'',
      box1: "box1",
      box2:"box2",
      arr:['嘻嘻','嘿嘿','哈哈','呵呵','哼哼']
    },
  });
</script>
```





![1558989346678](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1558989346678.png)



### 1.11 动态绑定`style`

> 核心：通过给当前元素动态绑定`style`的方式，传递给style一个对象或者数组来控制该元素的所拥有的样式属性

```html
<div :style="{width:'100px',height:'100px',color:'greenYellow'}">黄绿</div>
<div :style="[sty1,sty2]">[sty1,sty2]</div>
<script>
  ...
	data:{
    sty1:{color:'red'},
    sty2:{backgroundColor:'blue'}
  }
  ...
</script>
```



![1558989941397](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1558989941397.png)

















### 1.12 自定义指令

> 核心
>
> + html部分 通过 `v-自定义指定名`或者`v-自定义指令名（val）`
> + js部分 通过增加 `directives:{自定义指令名（）{...}}`

```html
 <div v-myorder class="box">自定义指令之myorder</div>

    <div v-color="'green'" class="box">自定义指令之v-color="传递一个字符串，用于控制当前盒子的背景颜色"</div>

    <!-- 可以拖拽 -->
    <div class="box" v-drag>点我可以拖拽</div>

<script>
  let vm = new Vue({
    el: "#app",
    data: {
      str: ''
    },
    directives: {
      //自定义指令不加参数的写法
      myorder() {
        //加上这个指令后这个方法会默认执行一次
        //console.log(1);
        //console.log(arguments);
        //第一个参数是当前元素
        arguments[0].style.color = 'red';
      },

      color() {
        console.log(arguments);
        //arguments[0]还是当前元素
        //arguments[1]是一个对象，这个对象中有我们传递的值
        console.log(arguments[1]);
        /*
          def: {bind: ƒ, update: ƒ}
          expression: "'green'"
          modifiers: {}
          name: "color"
          rawName: "v-color"
          value: "green"
          __proto__: Object
        */
        arguments[0].style.backgroundColor = arguments[1].value;
      },

      //自定义拖拽指令：当加上这个指令，这个元素就可以实现拖拽效果
      drag(target, data) {
        //target 是当前元素
        //data 是传递的参数，是一个对象  data.value是传递的值
        //拖拽三步：onmousedown onmousemove onmouseup
        target.onmousedown = function (e) {
          //鼠标的位移差就是盒子的位移差 （需要四个变量）
          //换个角度：盒子用的距离就是鼠标移动的距离
          //记录当前盒子相对于鼠标的起始位置
          this.l = e.clientX - this.offsetLeft;
          this.t = e.clientY - this.offsetTop;
          document.onmousemove = (e) => {
            //重新计算设定盒子的位置
            this.style.left = e.clientX - this.l + "px";
            this.style.top = e.clientY - this.t + "px";
          };

          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
          }
          e.preventDefault();
        };


      }
    }
  });
</script>

```





## 2. vue的组件

> `Vue`中提供的具有特殊意义的`自定义标签`也叫组件

### 2.1 `VUE`内置的组件





#### 2.1.1`transiton`

```html
<div id="app">
    <button @click="flag=!flag">点我切换</button>
    <transition name="myTransitionBox">
      <!-- vue 通过多transition name属性的判断来设定对应的过度元素应该拥有的过度效果
        它将 过渡效果分写在了6个样式类中
        通过 
            myTransitionBox-enter
            myTransitionBox-enter-active
            myTransitionBox-enter-to
            myTransitionBox-leave
            myTransitionBox-leave-active
            myTransitionBox-leave-to
        需要我们对这6个样式进行对应的设置操作
      -->
      <div class="box" v-show="flag"></div>
    </transition>
  </div>


<style>
    .box {
      width: 100px;
      height: 100px;
      background-color: aqua;
    }
    /*自定义vue中transition过渡组件的6个样式类*/
    .myTransitionBox-enter{
      opacity: 0;
      background-color: red
    }
    .myTransitionBox-enter-active{
     transition: all  2s ease 1s;
      
    }
    .myTransitionBox-enter-to{
      opacity: 1;
      background-color:yellow;
    }
    .myTransitionBox-leave{
      opacity: 1;
      background-color:yellow;
    }
    .myTransitionBox-leave-active{
      transition: all  1s ease;
      background-color:pink;
      opacity: 0;
    }
    .myTransitionBox-leave-to{
      opacity: 0;
    }
  </style>

```





#### 2.1.2 `transition-group`

[结合`animate.css`使用]

vue中`transition`过渡动画指定的样式类名

+ `enter-class`
+ `leave-class` 
+ `appear-class` 
+ `enter-to-class`
+ `leave-to-class` 
+ `appear-to-class` 
+ `enter-active-class` 
+ `leave-active-class`
+ `appear-active-class` 

```html

<div id="app">
    <button @click="flag=!flag">点我切换</button>
    <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceInLeft">
      <div class="box" v-show="flag">
          <h1>哈哈</h1>
      </div>
     
    </transition>

    <!-- 组动画 -->
    <transition-group enter-active-class="animated zoomInLeft" leave-active-class="animated rollOut">
        <h1 key="1" v-show="flag">哈哈</h1>
        <h1 key="2" v-show="flag">嘻嘻</h1>
        <h1 key="3" v-show="flag">嘿嘿</h1>
    </transition-group>
  </div>
```



#### 2.1.3 `keep-alive`、`component`、`is属性`

【component组件】

> 渲染一个“元组件”为动态组件。依 `is` 的值，来决定哪个组件被渲染。

```html
<div id="app">
    <!-- 实现点击切换不同组件的功能 -->
    <p>点击选择要展示的组件</p>
    <input type="radio" v-model="sel" value="com1">组件1
    <input type="radio" v-model="sel" value="com2">组件2
    <br>
    <component :is="sel"></component>
    <!-- <component is="com2"></component> -->
</div>

```

【keep-alive】

> `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
>
> 当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

```html
<keep-alive>
   <component :is="sel"></component>
</keep-alive>
```



#### 2.1.4 `slot`

slot使用注意事项

> 1.slot默认name名 `default`,允许出现一次
>
> 2.哪个位置使用，就替换哪个位置的内容

```html
<!--组件中-->
<alert-box>
  <div></div>
  <!--
			<div slot="default"></div>
			不写跟写个default是一样的效果，只能有一个
	-->
  		<slot></slot>
			<slot name="name1"></slot>
			<slot name="name2"></slot>
</alert-box>

<script>
	Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
			<strong>xxx</strong>
			<div></div>			
			<!--
				<div slot="default"></div>
				不写跟写个default是一样的效果，只能有一个
				还可以写成 v-slot=xxx
				还可以简写 #xxx
			-->
			1：<div slot="name1">1111</div>
  		2：<div slot="name2">2222</div>
      
    </div>
  `
})
	
</script>

  

```





### 2.2 全局组件`Vue.component( id, [definition] )`

> 组件是相互独立的，它里边的所有东西都是它自己的，保罗生命周期函数

```html
  <div id="app">
    <!--使用全局组件必须在vue挂载的实例中使用-->
    <!-- 
    HTML中使用全局组件
      * html标签不区分大小写：js中采用驼峰命名法的 这里用     '-'代替  比如 js中 myDiv  HTML中用 my-div
      * 或者跟 js中完全保持一致
  -->
    <my-div></my-div>

    <my-div>{{msg}}</my-div>
  </div>


<script>
  Vue.component('myDiv', {
    template: "<div><h2>{{msg}}</h2></div>",
    data() {
      //全局组件中，data数据书写方式是 一个函数
      //并且  必须返回一个对象的形式
      return {
        msg: '我是全局组件的数据'
      }
    }
  });
  let vm = new Vue({
    el: "#app",
    data: {
      msg: '局部数据'
    }
  });
</script>
```



### 2.3 局部组件以及组件嵌套

【组件使用3步骤】

> 1.定义组件
>
> 2.注册组件
>
> 3.使用组件

```html
<!--3.在根本组件中直接使用组件-->



<!-- 使用HTML代码模板 注意 id -->
<template id="fatherTemplate">
    <div>
      父组件的数据：{{msg}}
      <br>
      <input type="text" v-model="fatherval">
      <!-- 父组件使用子组件 -->
      <!-- 父组件向子组件传值 -->
      <!-- <son-component sendToSon="fatherVal"></son-component> -->
      <!-- html dom 不区分大小写 -->
      <son-component :sendtoson="fatherval"></son-component>
    </div>
  </template>

  <template id="sonTemplate">
    <div>
        子组件的数据：{{msg}}
        
      <h3>父组件传递的值是：{{sendtoson}}</h3>
    </div>
  </template>

<!--定义+注册组件-->
<script>
  // 1.1定义组件--定义儿子组件
  let sonComponent = {
    template: "#sonTemplate",
    data() {
      return {
        msg: '我是sonComponent数据'
      }
    },
    //子组件接收父组件传递过来的数据
    props: ['sendtoson'],
  };
   //1.2定义组件--定义父亲组件
  let fatherComponent = {
    template: "#fatherTemplate",
    data() {
      return {
        msg: '我是fatherComponent数据',
        fatherval: ""
      }
    },
    components: {
      //注册组件：这里是在父组件中注册了子组件，那么父组件中就可以 使用子组件 了
      sonComponent
    }
  };
  
  
  let vm = new Vue({
    el: "#app",
    data: {
      msg: '根组件的数据'
    },
    // 2. 注册组件
    //这里是在app 根组件下注册，所以使用也应该在跟组件下使用才能生效
    components: {
      fatherComponent,
      sonComponent
    }
  });
</script>
```





### 2.4 父子组件之间的值传递

#### 2.4.1 父传子

三步骤：

> 1.父组件中使用子组件，并给子组件添加`自定义属性=value`
>
> 2.组组件中 通过 `props:['自定义属性']`的方式拿到父组件传递过来的`value`
>
> 3.在子组件中使用 {{自定义属性}}，即拿到父组件传递过来的值

```html
<template id="fatherTemplate">
    <div>
      <!-- 父组件使用子组件 -->
      <!-- 父组件向子组件传值 -->
      <!-- <son-component sendToSon="fatherVal"></son-component> -->
      <son-component :sendtoson="fatherval"></son-component>
    </div>
</template>
<script>
   let sonComponent = {
     //子组件中使用父组件传递的属性
    	template: "<div><h3>{{sendtoson}}</h3></div>",
    	data() {},
    	//子组件接收父组件传递过来的数据
    	props: ['sendtoson'],
  	};
  
</script>
```



#### 2.4.2 子传父以及.`sync`操作符的使用

[一般做法]---（发布订阅思想）

> 1.父组件使用子组件的时候，订阅一个儿子的自定义事件（这个事件用于更改自己的数据）
>
> 2.儿子组件中设定一个触发 订阅父组件中方法，可以传递值给父组件
>
> 3.父组件中执行订阅的方法，并接受传递的值 

```html
<div id="app1">
    <h2>子传父的一般做法</h2>
    <!-- ---------- -->
    根（父）组件的数据：{{rootDate}}
  	 <!-- 1.父组件使用子组件的时候，订阅一个儿子的自定义事件 @change-money -->
    <my-component :sendtoson="rootDate" @change-money="change">			</my-component>
  </div>
<script>
  let MyComponent = {
    template:`<div>
                  子组件中使用父组件的数据：{{sendtoson}}
                  <!-- 子组件告诉父组件修改父组件的数据 -->
                  <button @click="getMore">点我可以触发修改父亲数据的效果</button>
              </div>`,
    data(){
      return {
        sonData:200
      }
    },
    props:['sendtoson','changeMoney'],
    methods:{
      //2.儿子组件中设定一个触发 订阅父组件中方法，可以传递值250给父组件
      getMore(){ 
        //发布 自定义的change-money方法，告诉父组件执行，并传递250给父组件
        this.$emit('change-money',250);
      }
    }
  };

  let vm = new Vue({
    el: "#app1",
    data: {
      rootDate: 100,
    },
    
    components: {
      MyComponent
    },
    methods:{
      //3.执行订阅的方法，并接受传递的值 
      change(val){
        this.rootDate = Number(this.rootDate)+val;
      }
    },
  });
</script>
```



[`.sync`]的使用

```html
<!--语法糖 .sync  表示同步-->

<!--1.父组件中将自定义属性设定为同步：表示 父子数据同步，也就是说子改变会影响自己-->
<my-component2 :sendtoson.sync="rootDate"></my-component2>

<script>
  //...
    methods: {
      getMore() {
        //this.$emit('change-money', 250);
        //2. 子组件中，直接使用this.$emit('update:xxx',yyy);
        //	的方式，修改更新 子组件xxx的值为 yyy
        this.$emit('update:sendtoson',1);
        //将 sendtoson的值更新为1 
      }
    },
  };
  //...
</script>
```



#### 2.4.3 父组件使用子组件的数据和方法 `ref`属性的使用

```html
<div id="app">
      <button @click="toggle">点我啊</button>
      <my-com ref="hide" ></my-com>  
</div>
<script>
methods:{
      toggle(){
        //console.log(this.$refs);
        //this.$refs 拿到的是子组件对象
        this.$refs.hide.change();
        //获取子组件中，子组件里的ref属性集合
        //this.$refs.hide.$refs
        //console.log(this.$refs.hide.$refs);
        this.$refs.hide.$refs.sonRef.style.color="red";
      }
    },
</script>
```





### 2.5 父传子属性校验的问题(props校验)

> 我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

```javascript
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```



> 例如：为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
      //default:()=>([1,2]);
    },
    // 自定义验证函数
    propF: {
      //属性校验器
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
        //return Number(value)>3;
      }
    }
  }
})
```

### 2.6 属性方法传递的方式`.native 、$emit、$listeners、$attrs`

```html
<!--这样不是给组件myDiv绑定元素事件而是相当于  父组件给 myDiv组件设定了一个@click的自定义属性--> 
<my-div @click="alert(1)"></my-div>

<!--要想实现给子组件最外层元素 绑定事件的效果 ，我们需要如下的书写方式--> 
<my-div @click.native="alert(1)"></my-div>

```



```html
<!--1-->
<my-div @click.native="alert(1)"></my-div>
<!--2-->
<!--
		这里绑定的事件相当于
		this.$on('click',change);
		//绑定click事件， 方法是change
-->
<my-div @click="alert(1)"></my-div>

<!--3-->
<!--绑定多个事件-->
<my-div @click="alert(1)" @mouseup="alert(2)"></my-div>

<script>
  let vm = new Vue({
    el: "#app",
    methods:{
      change(){alert(1)};
    }
    components: {
    	mounted(){
    		console.log(this.$listeners);
  		},
      myDiv:{
    		//这样写实现的结果就是点击div触发点击事件函数
    		//我们的目的是 点击 button
    		//通过查看 this.$listeners 返回一个对象{}
    		//这个对象存放了所有的监听事件
        template:"<div><button>点我</button></div>"
        //1. 所以可以这么改
        template:"<div><button @click='$listeners.click()'>点我</button></div>"
        
        //2.还可以使用发布订阅的方式（vue中自己实现的）
        //this 跟HTML中那个this是同一个 都是 组件自己
        template:"<div><button @click='$emit("click")'>点我</button></div>"
        
        //3.全部绑定，绑定一个对象
        template:"<div><button v-on='$listeners'>点我</button></div>"
      }
    }
  });
</script>
```

> v-bind=$attr    绑定所有的属性
>
> v-on=$listeners   绑定所有的 事件 

### 2.7 属性传递之 `$parent 、$children`

### 2.8 `vue2.6+`中的插槽 `slot`

```html


```

### 2.9 provide & inject



## 3. vue 的生命周期

![Vue å®ä¾çå½å¨æ](https://cn.vuejs.org/images/lifecycle.png)

### 3.1 beforeCreate & created

```javascript
let vm = new Vue({
  beforeCreate(){
    //在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
    console.log(this.a);//undefined
    debugger;
  },
  el:'#app',
  data:{
  	a:'BigSpinach'
	},
  created(){
  	//在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。 
    console.log(this.a);//'BigSpinach'
    debugger;
  }
  
})
```





### 3.2 beforeMount & mounted

```javascript
let vm = new Vue({
  beforeCreate(){
    //...
  },
  el:'#app',
  data:{
  	a:'BigSpinach'
	},
  created(){
  	//...
  },
  
  beforeMount(){
    //在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
    console.log(this.a);//undefined
    debugger;
  },
  mounted(){
    //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
    //注意
    //mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：
    console.log(this.a);//undefined
    debugger;
  }
  
})
```



【mounted】

```javascript
//一般我们会在mounted中获取渲染的DOM，
data:{
  list:[1,2,3];//初始化data数据
}

mounted(){
	//挂载完成：页面已经基于最初的data数据完成了一次渲染
  //
  this.list=[1,2,3,4,5];
  //此时如果在这里修改data中的数据，（修改data中的数据就意味着触发beforeUpdate和undated这两个生命周期函数）
  //但是---mounted值执行一次，所以
  //所以..即使修改了data，此时在这里获取得到的还是最初的data的数据 
  console.log(this.list);//[1,2,3]
  //如果说非得要获取修改后的data的数据
  //vue提供了this.$nexttick(()=>{...});方法
  //这个方法的作用就是：等待data数据修改完成后（也就是undeted完成后），再执行
  this.$nextTick(()=>{
    console.log(this.list);//[1,2,3,4,5]
  });
}
```

【this.$nextTick()】

> `this.$nextTick`这个方法出现的原因
>
> + 由于`mounted`方法只执行一次，所以给元素绑定事件的操作在这里比较好
> + 但是，由于`mounted` 方法中获取的DOM元素是初始化的数据而并不是我们想要的修改后的`data` 中的DOM元素
> + 此时：只需要将绑定事件的操作写在这个方法中即可
> + 为什么不放在`undated`中绑定呢？
> + 那是因为：`updated`方法会监听`data`的变化，从而反复执行，从而导致绑定的方法反复绑定，浪费性能，so....



###  3.3 beforeUpdate & uodated

```javascript
let vm = new Vue({
  beforeCreate(){
    //...
  },
  el:'#app',
  data:{
  	a:'BigSpinach'
	},
  created(){
  	//...
  },
  
  beforeMount(){
    //...
  },
  mounted(){
    //...
  },
  
  beforUpdate(){
    //数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
		//该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
    console.log(this.a);//'LIUKAI'
    this.a = 'LIUKAI';
    console.log(this.a);//'LIUKAI'
    debugger;
  },
  updated(){
    //由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

	//当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
   
    //注意
   //updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：
    console.log(this.a);//'LIUKAI'
    this.a = 'LIUKAI';
    console.log(this.a);//'LIUKAI'
    debugger;
  }
  
});
//更新data数据
vm.a = 'LIUKAI';
```





### 3.4 beforeDestroy & destroyed

```javascript
let vm = new Vue({
  beforeCreate(){
    //...
  },
  el:'#app',
  data:{
  	a:'BigSpinach'
	},
  created(){
  	//...
  },
  
  beforeMount(){
    //...
  },
  mounted(){
    //...
  },
  
  beforUpdate(){
    //...
  },
  updated(){
    //...
  },
  
  beforeDestroy(){
    //实例销毁之前调用。在这一步，实例仍然完全可用
    console.log(this.a);//'LIUKAI'
    debugger;
  },
  destroyed(){
    //Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    console.log(this.a);//'LIUKAI'
    debugger;
  }
  
});
//更新data数据
vm.a = 'LIUKAI';
//手动销毁vm实例
vm.$destroy();
```







## 4.  路由的两种模式

### 4.1 #哈希值

> 开发使用





### 4.2 `history`

> 直接替换url【需要后台配合，上线的时候使用】

```javascript
//window.history = history
console.log(history);//
/*
	History {length: 2, scrollRestoration: "auto", state: {…}}
    length: 2
    scrollRestoration: "auto"
    state: {key: "2867.935"}
    __proto__: History
        back: ƒ back()
        forward: ƒ forward()
        go: ƒ go()
        length: (...)
        pushState: ƒ pushState()		// 向历史记录中增加一条记录
        replaceState: ƒ replaceState()		//直接替换当前的url记录
        scrollRestoration: (...)
        state: (...)
        constructor: ƒ History()
        Symbol(Symbol.toStringTag): "History"
        get length: ƒ length()
        get scrollRestoration: ƒ scrollRestoration()
        set scrollRestoration: ƒ scrollRestoration()
        get state: ƒ state()
        __proto__: Object
*/
```

```javascript
//history.pushState()
```

#### history的作用

##### 查找浏览器历史记录中出现过的页面

```javascript
var searching = browser.history.search（
  query // object 
）
```



##### 移除浏览器历史记录中的单个页面

```javascript
var deletingUrl = browser.history.deleteUrl(
  details         // object
)
```



##### 向浏览器历史记录中添加页面

```javascript
var addingUrl = browser.history.addUrl(
  {
    url:'String',
    [title:"strin",transition:,visitTime:'number或string或object']
    
  }
);
//addingUrl 返回一个Promise实例
```





##### 移除所有浏览器历史记录中的页面

```javascript
var deletingAll = browser.history.deleteAll();
deletingAll//none
```



##### 获取用户对单个页面的所有访问记录的集合

```javascript
var getting = browser.history.getVisits(
  details                // object
)
```



##### 移除给定期间内任意页面的访问记录的集合

```javascript
var deletingRange = browser.history.deleteRange(
  range           // object
)
```



#### 常用方法

> `pushState`和`replaceState`是一个`HTML5`的新接口

	##### history.pushState()

```javascript
//语法
history.pushState();
/*
	state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
	title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
	url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
*/
window.history.pushState(null,null,'download?id=1');
```



##### history.replaceState()

```javascript
window.history.replaceState(null,null,'download?id=1');
```





#### 4.3 vue中的路由

初使用

```html
<!--引入-->
<script src="vue.js"></script>
<script src="vue-router.js"></script>
<!--
		只要创建了router这个实例，浏览器地址点就回加上#/
		之前 http://1234.html
		之后 http://1234.html#/
-->
<script>
	 //构造函数的方式使用vue-router
  let router = new VueRouter({});

  let vm =new Vue({
    el:"#app",
    data:{},
    //注入路由
    router,//router:router
  });
</script>
```



使用路由管控组件

```html
<div id="app">
      <!-- router-view路由对应的组件显示的位置 -->
      你好
      <router-view></router-view>
      组件
</div>


<script>
	 //1.定义组件
  let Home ={template:'<h1>home组件</h1>'};
  //const Foo = { template: '<div>foo</div>' }

  //2.路由映射表 组件<==>路由
  let routes = [
    {path:'/home',component:Home}
  ];

  //构造函数的方式使用vue-router
  let router = new VueRouter({
    //3.
    routes
  });

  let vm =new Vue({
    el:"#app",
    data:{},
    //注入路由,路由默认使用哈希的方式
    router,//router:router
  });
</script>
```

