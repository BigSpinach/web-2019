[TOC]

---

# js中的常见设计模式

 ##  1.单例模式



## 2. 构造函数模式



## 3. 柯理化函数思想

 	函数预处理的思想



```javascript
let fn = function fn(x,y){
		this.val = x +y;
		console.log(this,x,y);
		//this=> document.body
		//x => 默认的事件对象 ev
		//y => undefined
		console.log(this.val);			
	};
	let obj = {name:"BigSpinach",age:28};

	document.body.onclick = fn;//fn中的this是 document.body
```

bind 的使用

```javascript
//需求 ：实现 给fn传参，并改变fn中的this指向 而且还要获得事件对象
let fn = function fn(x, y, ev) {
    this.val = x + y;
    console.log(this, x, y, ev);
    //{name: "BigSpinach", age: 28, val: 3} 
    //1 
    //2
    //MouseEvent

    console.log(this.val); //3
    return function anoymous() {

    }();
};
let obj = { name: "BigSpinach", age: 28 };
document.body.onclick = fn.bind(obj, 1, 2);

```





bind实现的原理

```javascript
//bind实现的原理
Function.prototype.myBind = function myBind(context,...arg) {
    // arg 中存储的就是调用这个函数传递过来的实参
    //this =>  是调用这个函数的对象
    let _this = this;
    return function anoymous(...innerArg) {
    	//innerArg 用于接收调用者 _this(跟外部的this保持一致)
    	//context 是
    	//_this.call(context,arg.concat(innerArg));
    	_this.apply(context,arg,concat(innerArg));
    }();
}

document.body.onclick = fn.myBind(obj, 1, 2);
```





## 4. Promise



## 5. 发布订阅（观察者模式）

​	**核心思想：**

​	事先准备一个容器，

​	把达到指定时间要处理执行的事情事先一一存放到这个容器中，（发布计划表并且向计划表中订阅方法），

​	当到达指定时间点，通知容器中的方法一次执行即可

### 5.1 jQuery中的发布订阅设计模式

```javascript
//1.准备容器
let $plan = $.Callbacks();

//2.向容器中增加（发布）方法
$plan.add(fn1);
$plan.add(fn2);
$plan.add(fn3);

//3.移除容器中的方法
$plan.remove(fn3);

//4.（在你想要执行的地方）执行容器中的方法
setTimeout(function(){
    $plan.fire();
    //$plan.fire(1,2)//执行时传递的参数会给容器中每一个方法都传递这样的参数 1，2
},100);
```

### 5.2 JS中的发布订阅

```javascript
~function(window){

		class Subscribe{
			constructor(){
				//1.创建一个容器，用于存放订阅的方法
				//container => 容器
				//pond => 池子
				this.container = [];
			}

			//2.增加方法（订阅）
			add(fn){
				//需要实现去重
				let container = this.container;
				let isExist = false;
				container.forEach(item=> item===fn?isExist = true:null);
				!isExist?container.push(fn):null;
			}
			//3.移除方法
			remove(fn){
				let container = this.container;
				container.forEach((item,index)=>{
					if(item===fn){
						//container.splice(index,1);
						//数组塌陷问题
						//非 循环中的数组塌陷
						//是下边的 fire方法中用到了 这个数组中的值，所以
						//归根结底：引用数据类型的特点
						
						//item=null;
						//这样写不行？
						//为啥
						//item是基本类型，改的是遍历中的值，而不是改的数组中的值
						//这里需要的是改变数组中的值
						container[index] = null;
					}
				});
			}
			//4.执行方法（发布）（派遣）
			fire(...arg){
				let container = this.container;
				//执行container中的每一个方法
				//arg中存储的是执行的时候传递的参数
				/*
				container.forEach(item=>{
					item(...arg);
				});
				*/
				//将容器中为 null的项 删除掉 （因为不可能 null();）
				/*
				for (var i = container.length - 1; i >= 0; i--) {
					if(container[i]===null){
						container.splice(i,1);
					};
					container[i]();
				};
				*/
				//使用 倒序遍历就会导致方法执行的顺序不对了
				for (var i = 0; i <container.length ; i++) {
					if(container[i]===null){
						container.splice(i,1);
						i--;
					};
					container[i](...arg);
				};
			}
		}

		window.Subscribe = Subscribe ;
	}(window);
```





