## 04 面向对象编程（Object  Oriented 
Programming）

### 4.1  单例设计模式（Singleton  Pattern）

#### 表现形式

```javascript
var obj = {
	xxx:xxx,
	...
};
```

#### 作用

把描述同一件事务的属性和特征进行“分组、归类”(存储在同一个堆内存空间中)，因此避免了全局变量之间的冲突和污染

```javascript
var pattern1={name:'xxx'}
var pattern2={name:'xxx'}
```

#### 单例设计模式命名的由来

每一个命名空间都是JS中Object这个内置基类的实例，而实例之间是相互独立互不干扰的，所以我们称它为“单例：单独的实例”

#### 实例

```javascript
var person1={
    name:"陆相莹",
    age:18
};
var person2={
    name:"刘司南",
    age:81
};
```

#### 高级单例模式

1.在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个私有作用域AA（不销毁的栈内存），在AA中创建一个堆内存，把堆内存地址赋值给命名空间

2.这种模式的好处：我们完全可以在AA中创造很多内容（变量OR函数），哪些需要供外面调取使用的，我们暴露到返回的对象中（模块化实现的一种思想）

```javascript
var nameSpace = (function () {
    var n = 12;
    function fn() {
        //...
    }
    function sum() {

    }
    return {
        fn: fn,
        sum: sum
    }
})();
```

#### 基于单例模式实现模块化开发



模块化开发

 * 1.团队协作开发的时候，会把产品按照功能板块进行划分，每一个功能板块有专人负责开发
 * 2.把各个版块之间公用的部门进行提取封装，后期在想实现这些功能，直接的调取引用即可（模块封装）


```javascript
var utils=(function () {
    return {
        aa:function () {

        }
    }
})();

//=>少帅
var skipRender = (function () {
    var fn = function () {
        //...
    };
    //...
    return {
        init: function () {

        },
        fn:fn
    }
})();
skipRender.init();

//=>敏洁
var weatherRender = (function () {
    var fn = function () {

    };
    return {
        init: function () {
            fn();//=>调取自己模块中的方法直接调取使用即可
            skipRender.fn();//=>调取别人模块中的方法
        }
    }
})();
weatherRender.init();
```

### 4.2 工厂模式（Factory  Pattern）

1.把实现相同功能的代码进行“封装”，以此来实现“批量生产”（后期想要实现这个功能，我们只需要执行函数即可）

2.“低耦合高内聚”：减少页面中的冗余代码，提高代码的重复使用率

```javascript
function createPerson(name, age) {
    var obj = {};
    obj.name = name;
    obj.age = age;
    return obj;
}

var p1 = createPerson('xxx', 25);
var p2 = createPerson('xxx', 25);
```

### 4.3 拥抱面向对象



JS是一门编程语言(具备编程思想)

面向对象编程，需要我们掌握：“对象、类、实例” 的概念

 * 对象：万物皆对象
 * 类：对象的具体细分（按照功能特点进行分类：大类、小类）
 * 实例：类中具体的一个事物（拿出类别中的具体一个实例进行研究，那么当前类别下的其它实例也具备这些特点和特征）
 * 整个JS就是基于面向对象设计和开发出来的语言，我们学习和实战的时候也要按照面向对象的思想去体会和理解



### 4.4 构造函数  （Constructor）

#### 基于构造函数创建基本值

> 基于构造函数创建自定义类（constructor）
>
> * 1.在普通函数执行的基础上“new xxx()”，这样就不是普通函数执行了，而是构造函数执行，当前的函数名称之为“类名”，接收的返回结果是当前类的一个实例
>
>
>  *   2.自己创建的类名，最好第一个单词首字母大写
>
>  *   3.这种构造函数设计模式执行，主要用于组件、类库、插件、框架等的封装，平时编写业务逻辑一般不这样处理

```javascript
function Fn() {

}

// Fn();//=>普通函数执行
var f = new Fn();//=>Fn是类 f是类的一个实例
var f2 = new Fn();//=>f2也是Fn的一个实例，f2和f是独立分开的，互不影响


/*
 * JS中创建值有两种方式
 *   1.字面量表达式
 *   2.构造函数模式
 */
// var obj = {};//=>字面量方式
// var obj = new Object();//=>构造函数模式
// //=>不管是哪一种方式创造出来的都是Object类的实例，而实例之间是独立分开的，所以 var xxx={} 这种模式就是JS中的单例模式

//=>基本数据类型基于两种不同的模式创建出来的值是不一样的
//> 基于字面量方式创建出来的值是基本类型值
//> 基于构造函数创建出来的值是引用类型
//->NUM2是数字类的实例，NUM1也是数字类的实例，它只是JS表达数字的方式之一，都可以使用数字类提供的属性和方法
// var num1 = 12;
// var num2 = new Number(12);
// console.log(typeof num1);//=>"number"
// console.log(typeof num2);//=>"object"
```



#### 自定义类的创建

```javascript
/*
 * 基于构造函数创建自定义类（constructor）
 *   1.在普通函数执行的基础上“new xxx()”，这样就不是普通函数执行了，而是构造函数执行，当前的函数名称之为“类名”，接收的返回结果是当前类的一个实例
 *
 *   2.自己创建的类名，最好第一个单词首字母大写
 *
 *   3.这种构造函数设计模式执行，主要用于组件、类库、插件、框架等的封装，平时编写业务逻辑一般不这样处理
 */
/*function Fn() {

}
```

#### 构造函数的执行机制

```javascript
function Fn(name, age) {
    var n = 10;
    this.name = name;
    this.age = age + n;
}

//=>普通函数执行
/!*
//1.形成一个私有的作用域
//2.形参赋值
//3.变量提升
//4.代码执行
//5.栈内存释放问题
Fn();
*!/

//=>构造函数执行
var f1 = new Fn('xxx', 20);
var f2 = new Fn('aaa', 30);

console.log(f1 === f2);//=>false：两个不同的实例（两个不同的堆内存地址）
console.log(f1.age);//=>30
console.log(f2.name);//=>'aaa'
console.log("name" in f1);//=>true name&age在两个不同的实例都有存储，但是都是每个实例自己私有的属性
console.log(f1.n);//=>undefined 只有this.xxx=xxx的才和实例有关系,n是私有作用域中的一个私有变量而已（this是当前类的实例）


/*
 * 构造函数执行，不写RETURN，浏览器会默认返回创建的实例，但是如果我们自己写了RETURN？
 *   1.return是的一个基本值，返回的结果依然是类的实例，没有受到影响
 *   2.如果返回的是引用值，则会把默认返回的实例覆盖，此时接收到的结果就不在是当前类的实例了
 *
 *   =>构造函数执行的时候，尽量减少RETURN的使用，防止覆盖实例
 */


function Fn() {
    var n = 10;
    this.m = n;
    // return;//=>这样RETURN是结束代码执行的作用，并且不会覆盖返回的实例
    // console.log(1);
}

var f = new Fn();//=>new Fn;  在构造函数执行的时候，如果Fn不需要传递实参，我们可以省略小括号，意思还是创建实例（和加小括号没有区别）
console.log(f);
```

#### 关于构造函数中的`return`

【不写return或者只写一个return】

> 浏览器会默认返回创建的实例
>
> ```javascript
> function Fn() {
>     var n = 10;
>     this.m = n;  
> }
> 
> var f = new Fn();//=>new Fn;  在构造函数执行的时候，如果Fn不需要传递实参，我们可以省略小括号，意思还是创建实例（和加小括号没有区别）
> console.log(f);//Fn {m: 10}
> ```
>
> ```javascript
> function Fn() {
>     var n = 10;
>     this.m = n;
>     return;//这样RETURN是结束代码执行的作用，并且不会覆盖返回的实例
> }
> 
> var f = new Fn();//=>new Fn;  在构造函数执行的时候，如果Fn不需要传递实参，我们可以省略小括号，意思还是创建实例（和加小括号没有区别）
> console.log(f);//Fn {m: 10}
> ```
>
>

【return 一个基本数据类型的值】

> return是的一个基本值，返回的结果依然是类的实例，没有受到影响

```javascript
function Fn() {
    var n = 10;
    this.m = n; 
    return 'BigSpinach'
}

var f = new Fn();
console.log(f);//Fn {m: 10}
```



【return 一个引用数据类型的值】

> 如果返回的是引用值，则会把默认返回的实例覆盖，此时接收到的结果就不在是当前类的实例了

```javascript
function Fn() {
    var n = 10;
    this.m = n; 
    return {}
}

var f = new Fn();
console.log(f);//{}

```

```javascript
function Fn() {
    var n = 10;
    this.m = n; 
    return []
}

var f = new Fn();
console.log(f);//[]
```



#### instanceof

> **instanceof**检测某一个实例是否隶属于这个类
>
> ```javascript
> function Fn() {
>     var n = 10;
>     this.m = n;  
> }
> 
> var f = new Fn();
> console.log(f instanceof Fn);//=>TRUE
> console.log(f instanceof Array);//=>FALSE
> console.log(f instanceof Object);//=>TRUE 
> ```



#### in

> **in:**检测当前对象是否存在某个属性（不管当前这个属性是对象的私有属性还是公有属性，只要有结果就是TRUE）
>
> ```javascript
> console.log('m' in f);//=>TRUE
> console.log('n' in f);//=>FALSE
> console.log('toString' in f);//=>TRUE toString是它的公有属性
> ```

#### hasOwnProperty

>**hasOwnProperty：**检测当前属性是否为对象的私有属性（不仅要有这个属性，而且必须还是私有的才可以）
>
>```javascript
>console.log(f.hasOwnProperty('m'));//=>TRUE
>console.log(f.hasOwnProperty('n'));//=>FALSE 连这个属性都没有
>console.log(f.hasOwnProperty('toString'));//=>FALSE 虽然有这个属性但是不是私有的属性
>```

#### 【思考题】

思考题：编写一个方法hasPubProperty，检测当前属性是否为对象的公有属性，和hasOwnProperty对应

```javascript
function hasPubProperty(obj, attr) {
    //=>OBJ:要检测的对象
    //=>ATTR:要检测的属性
    //...
}
hasPubProperty(f, 'm');//=>FALSE
hasPubProperty(f, 'n');//=>FALSE
hasPubProperty(f, 'toString');//=>TRUE
```



### 4.5 原型链设计模式  （prototype  & __proto__）



#### 原型链机制

1.所有的函数数据类型都天生自带一个属性：prototype（原型），这个属性的值是一个对象，浏览器会默认给它开辟一个堆内存

2.在浏览器给prototype开辟的堆内存中有一个天生自带的属性：constructor，这个属性存储的值是当前函数本身

3.每一个对象都有一个__proto__的属性，这个属性指向当前实例所属类的prototype（如果不能确定它是谁的实例，都是Object的实例）

```javascript
function Fn() {
    var n = 100;
    this.AA = function () {
        console.log(`AA[私]`);
    };
    this.BB = function () {
        console.log(`BB[私]`);
    };
}
Fn.prototype.AA = function () {
    console.log(`AA[公]`);
};

var f1 = new Fn;
var f2 = new Fn;

console.log(f1.n);
```



#### hasOwnProperty



#### 原型链中的this问题 

> 1.给当前元素的某个事件绑定方法, 当事件触发方法执行的时候，方法中的THIS是当前操作的元素对象
>
> ```javascript
> oBox.onclick=function(){
> 	//=>this:oBox
> }
> ```
>
> 2.普通函数执行，函数中的THIS取决于执行的主体，谁执行的，THIS就是谁（执行主体：方法执行，看方法名前面是否有“点”，有的话，点前面是谁this就是谁，没有this是window）
>
> ```javascript
> function fn(){//=>AAAFFF000
>         console.log(1);
>      }
>      var obj={
>         fn:fn //=>fn:AAAFFF000
>      };
> 
>      //=>执行的是相同的方法（不同地方在于函数执行方法中的this是不一样的）
>      obj.fn();//=>this:obj
>      fn();//=>this:window
> ```
>
> 3.自执行函数执行，方法中的this是window
>
> ```javascript
>  ~function(){
>          //=>this:window
>   }();
> ```
>
>

#### 基于内置类原型扩展方法

```javascript
Array.prototype.myUnique = function myUnique() {
    var obj = {};
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        obj.hasOwnProperty(item) ? (this[i] = this[this.length - 1], this.length--, i--) : obj[item] = item;
    }
    obj = null;
    return this;
};
var max = ary.myUnique().sort(function (a, b) {
    return a - b;
}).pop();

//=>思考题：
~function (pro) {
    pro.plus = function plus(val) {
        return this + Number(val);
    };
    pro.minus = function minus(val) {
        return this - Number(val);
    };
}(Number.prototype);
var n = 5;
var res = n.plus(3).minus(2);//=>res=6
console.log(res);

```



### 4.6 原型深入

####【函数的3种角色】

```javascript
function Fn() {
    var n = 10;
    this.m = 100;
}

Fn.prototype.aa = function () {
    console.log('aa');
};
Fn.bb = function () {
    console.log('bb');
};
```



1.普通函数

 * 堆栈内存释放

 * 作用域链

    ```javascript
    //=>普通函数
    Fn();//=>this:window  有一个私有变量n  和原型以及属性bb没有关系
    ```


2.类

 * prototype：原型

 * `__proto__`：原型链

 * 实例

    ```javascript
    //=>构造函数执行
    var f = new Fn;//=>this:f
    console.log(f.n);//=>undefined：n是私有变量和实例没有关系
    console.log(f.m);//=>100 实例的私有属性
    f.aa();//=>实例通过__proto__找到Fn.prototype上的方法
    console.log(f.bb);//=>undefined：bb是把Fn当做一个普通的对象设置的属性而已，和实例等没有半毛钱关系
    
    ```


3.普通对象

 * 和普通的一个`obj`没啥区别,就是对键值对的增删改查

    ```javascript
    //=>普通对象
    Fn.bb();
    ```

    **三种角色间没有什么必然关系**

函数三种角色运行机制

![1543910097599](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1543910097599.png)



```javascript
//JQ这个类库中提供了很多的方法,其中有一部分是写在原型上的,有一部分是把它当做普通对象来设置的
~function () {
    function jQuery() {
        //...
        return [JQ实例]
    }
    jQuery.prototype.animate=function(){}
    //...
    jQuery.ajax=function(){}
    //....
    window.jQuery = window.$ = jQuery;
}();
// $().ajax() //=>调不了
// $().anaimte() //=>这样可以调取
// $.ajax() //=>直接的对象键值对操作
// $.animate() //=>对象上没有animate这个属性，这个属性在和实例相关的原型上

```

【阿里经典面试题】

```javascript
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function BBB() {
    console.log(2);
};
Foo.prototype.getName = function AAA() {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

Foo.getName();//=>2 把Foo当做一个对象，找Foo的私有方法执行
getName();//=>4 执行全局下的GET-NAME
Foo().getName();//=>1 先把FOO当做普通函数执行,执行返回的结果在调取GET-NAME执行
getName();//=>1 执行的依然是全局下的GET-NAME

console.log(new Foo.getName());;//=>A:(Foo.getName) =>new A()  =>2
new Foo().getName();//=>B:new Foo() =>B.getName() =>3
console.log(new new Foo().getName());//=>C:new Foo() =>new C[Foo的实例].getName() =>D:C.getName =>new D(); =>3  (先计算new Foo()创建一个实例f，然后new f.getName()，先找到f.getName，在把这个函数new一下，最后其实相当于把f.getName当做一个类，返回这个类的一个实例)
```

####【原型链机制】

```javascript
let n = 10,
    obj = {n: 20};
let fn = obj.fn = (function () {
    this.n++;
    n++;
    return function (m) {
        n += 10 + (++m);
        this.n += n;
        console.log(n);
    }
})(obj.n);
fn(10);
obj.fn(10);
console.log (n, obj.n);
```

#### 【call】

```javascript
/*
 * call
 *  1. [fn].call([this],[param]...)
 *   fn.call：当前实例(函数FN)通过原型链的查找机制，找到Function.prototype上的call方法  =>function call(){[native code]}
 *   fn.call()：把找到的call方法执行
 *
 *   当call方法执行的时候，内部处理了一些事情
 *    =>首先把要操作函数中的THIS关键字变为CALL方法第一个传递的实参值
 *    =>把CALL方法第二个及第二个以后的实参获取到
 *    =>把要操作的函数执行，并且把第二个以后的传递进来的实参传给函数
 */

```

[练习题]

```javascript
	function fn1() {console.log(1);	}
	function fn2() {console.log(2);	}
	fn1.call(fn2); 
	//调用 Function.prototype上的call方法
	//	call方法执行
	//		1： 将 fn1 这个函数对象中的this关键字改为 fn2这个函数对象
	//		2： 其他形参 没有，不操作
	//		3： 将this() 执行  ----也就是 fn1执行
	//	所以：
	//		输出1
	
	fn1.call.call(fn2);
	//知识点： 
	//		() 运算符优先级为20
	//		. 运算符优先级为 19
	//第一步：*.call(fn2)
	//		1： 将 * 这个函数对象中的this关键字改为 fn2这个函数对象
	//		2： 其他形参 没有，不操作
	//		3： 将this() 执行  ----也就是 *执行
	//	
	//第二步：*执行    
	//		也就是 fn1.call执行
	//		1： 将 fn1 这个函数对象中的this关键字改为 undefined
	//		                 ---因为没有传递参数，
	//		2： 其他形参 没有，不操作
	//		3： 将this() 执行  ----也就是 fn2执行（因为上一个call已将将this改为了fn2）
	//  
	//所以 ： 
	//	==>  2 
	
	Function.prototype.call(fn1); 
	//第一步：
	//		 将 Function.prototype= *
	//		*.call(fn1)
	//		将*中的this改为fn1
	//		将*执行
	//第二步： ||
	//		  VV	
	//		将*执行
	//		Function.prototype执行
	//		Function.prototype是一个匿名的空函数，执行没有任何结果
	Function.prototype.call.call(fn1); 
	// Function.prototype.call = *
	// *.call(fn1)  ----中的this是*
	// 			将*换为fn1
	// 			将  this 执行 ---*()
	// 		也就是 让 Function.prototype.call执行
	// 			Function.prototype=***
	// 			***.call执行 
	// 		也就是  ***.call()
	// 			***.call()中的this是***
	// 			1. 将***替换成undefined
	// 			2. 无其他参数
	// 			3. 将 this 执行 ---也就是 fn1()  ----输出1
	// 		Function.prototype执行
	// 		也就是 Function.prototype()
	// 			没有任何输出
	// 			
	// 			
	fn1.call.call.call.call.call(fn2);
	// fn1.call.call.call.call = *
	// *.call(fn1)  -----this 是 *
	//  	1. 将*换为fn1
	//  	2. 无
	// 		3. 将this执行------ 也就是*()
	// 	 fn1.call.call.call.call()
	// 	 	也就是 **=fn1.call.call.call
	// 	 	**.call()  -----this是**
	// 	 		1. 将 ** 换为 undefined
	// 	 		2. 无
	// 	 		3. 将this执行，也就是 fn2()
	// 	 		===>输出2
	// 	 	
	// 	 	fn1.call.call.call()
	// 	 		***=fn.call.call
	// 	 		***.call()----this是***
	// 	 		1. 将***换为undefined
	// 	 		2. 无
	// 	 		3. 将this执行，也就是 fn1.call.call找到Function.prototype.call(),
	// 	 		没有输出
	// 	 		...
```

【`use strict`】

```javascript
/*
 * CALL中的细节
 *   1.非严格模式下，如果参数不传，或者第一个传递的是null/undefined，THIS都指向WINDOW
 *   2.在严格模式下，第一个参数是谁，THIS就指向谁（包括null/undefined），不传THIS是undefined
 */
// fn.call(obj, 10, 20);//=>this:obj a=10 b=20
// fn.call(10, 20);//=>this:10 a=20 b=undefined
// fn.call();//=>this:window a=undefined b=undefined
// fn.call(null);//=>this:window
// fn.call(undefined);//=>this:window
```

####  【call 、apply、bind】

```javascript
/*
 * apply：和call基本上一模一样，唯一区别在于传参方式
 *   fn.call(obj,10,20)
 *   fn.apply(obj,[10,20]) APPLY把需要传递给FN的参数放到一个数组（或者类数组）中传递进去，虽然写的是一个数组，但是也相当于给FN一个个的传递
 */

/*
 * bind：语法和call一模一样，唯一的区别在于立即执行还是等待执行
 *   fn.call(obj,10,20) 改变FN中的THIS,并且把FN立即执行
 *   fn.bind(obj,10,20) 改变FN中的THIS,此时的FN并没有执行（不兼容IE6~8）
 */
```

#### 【括号表达式】

```javascript

[12,13,14].toString() // "12,13,14"
eval("12,13,14") // 14
/*
   1.eval：把字符串转换为JS表达式
    eval("1+2") =>3

   2.括号表达式（小括号的应用）
    用小括号包起来，里面有很多项（每一项用逗号分隔），最后只获取最后一项的内容（但是会把其它的项也都过一遍）
    (function(){
        console.log(1);
    },function(){
        console.log(2);
    })();
    =>2

    let a=1===1?(12,23,14):null;
    =>a=14

   不建议过多使用括号表达式，因为会改变THIS
*/
```

#### 【原型重定向】

原型重定向(重新指向一个自己开辟的堆内存：当我们需要向自定义类的原型上批量增加属性或者方法的时候，一般都采用这种重定向方法)

1. 原有浏览器默认开辟的堆内存如果不被占用会被销毁，如果我们在原有开辟的原型上增加了一些属性和方法，这些方法都会被释放掉，实例也不能使用了
2. 重定向到自己开辟的堆内存中，constructor属性是没有的（为了保证机制的完整性，我们一般都自己手动设置constructor）

```javascript
Fn.prototype = {
    // constructor:Fn,
    setX: function () {
        this.x = 200;
    },
    getX: function () {
        console.log(this.x);
    }
};
Fn.y = 300;
var f = new Fn;//=>new Fn; 无参数列表NEW  <==> new Fn();有参数列表NEW

// console.log(Fn.y);//=>300
// f.create();//=>报错：f.create它是undefined，不是一个函数
// console.log(f.constructor);//=>Object
```



