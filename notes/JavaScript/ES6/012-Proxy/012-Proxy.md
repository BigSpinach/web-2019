[TOC]

-----

# 12.Proxy



## 12.1 Proxy 概述

作用：拦截对象，代理对象

如何实现？

基本语法

```javascript
var obj = new Proxy({
	//这个对象是要被代理的对象
},{
  //这个是对那个要代理的对象进行的一些处理
  //主要用到 get 和 set 两个方法对 被代理的对象的属性进行限制
  get:function(target,key,receiver){
    //...
  },
  set:function(target,key,receiver){
    //...
  }
});
```



ES6

```javascript
let proxy = new Proxy(target,handler);
//trager:要拦截的目标对象
//handler：订制拦截行为

```

拦截属性

```javascript
let proxy = new Proxy({},{
  get:function(target,property){
    //target:目标对象   ===>  就是new Proxy({}.{})..中第一个参数 {}
    //property：targer对象访问的属性
    return 250;
  }
});

proxy.name;//250
proxy.age;//250
proxy.sayHello;//250
//要使拦截器起作用，必须要对拦截器进行设置，而不是对目标对象进行操作

```





拦截器设置多个属性

```javascript
let handler = {
  
  get : function(target,name){
    if(name==='prototype'){
      return Object.prototype;
    }
    return 'Hello, '+ name;
  },
  
  apply : function(target,thisBingding,args){
    //console.dir(target,thisBingding,args);
    //console.dir(arguments);
    return args[0];
  },

  constructor : function(target,args){
    return {value:args[1]};
  }

};

var fproxy = new Proxy(function(x,y){return x+y;},handler);

fproxy(1,2);//1
//fproxy这个代理对象代理了 匿名函数 fn(x,y)  => fn(1,2);
//执行这个匿名函数会执行apply 方法
//也就是 返回 args[0]   
//args===[1,2]  //args即使代理对象的实参集合
fproxy(2222,2);//2222

new fproxy(1,2);
//执行fproxy对象中的constructor方法
//返回 {values：2};

fproxy.prototype === Object.prototype;//true
//执行代理对象的获取方法 ，name===prototype

fproxy.foo;//"Hello, foo" 
//执行代理对象的get 方法
```



**拦截器支持的设置的所有拦截操作**

+ get( target, propKey, receiver)
  拦截 对象 属性 的 读取， 比如 proxy. foo 和 proxy[′ foo′]。 最后 一个 参数 receiver 是一 个 可选 对象。
+ set( target, propKey, value, receiver) 
  拦截 对象 属性 的 设置， 比如 proxy. foo= v 或 proxy[′ foo′]= v， 返回 一个 布尔 值。 
+ has( target, propKey)
  拦截 propKey in proxy 的 操作， 返回 一个 布尔 值。
+ deleteProperty( target, propKey)
  拦截 delete proxy[ propKey] 的 操作， 返回 一个 布尔 值。
+ has( target, propKey) 
  拦截 propKey in proxy 的 操作， 返回 一个 布尔 值。 
+ deleteProperty( target, propKey) 
  拦截 delete proxy[ propKey] 的 操作， 返回 一个 布尔 值。
+  ownKeys( target) 
  拦截 Object. getOwnPropertyNames（ proxy）、 Object. getOwnPropertySymbols （proxy）、 Object. keys（ proxy）， 返回 一个 数组。 该 方法 返回 目标 对象 所有 自身 属性 的 属性 名， 而 Object. keys（） 的 返回 结果 仅 包括 目标 对象 自身 的 可 遍历 属性。 
+ getOwnPropertyDescriptor( target, propKey) 
  拦截 Object. getOwnPropertyDescriptor（ proxy， propKey）， 返回 属性 的 描述 对象。 
+ defineProperty( target, propKey, propDesc) 
  拦截 Object. defineProperty（ proxy， propKey， propDesc）、 Object. define Properties（ proxy， propDescs）， 返回 一个 布尔 值。 
+ preventExtensions( target) 
  拦截 Object. preventExtensions（ proxy）， 返回 一个 布尔 值。 
+ getPrototypeOf( target) 
  拦截 Object. getPrototypeOf（ proxy）， 返回 一个 对象。
+ isExtensible( target) 
  拦截 Object. isExtensible（ proxy）， 返回 一个 布尔 值。 
+ setPrototypeOf( target, proto) 
  拦截 Object. setPrototypeOf（ proxy， proto）， 返回 一个 布尔 值。 如果 目标 对象 是 函数， 那么 还有 两种 额外 操作 可以 拦截。 
+ apply( target, object, args) 
  拦截 Proxy 实例， 并将 其 作为 函数 调用 的 操作， 比如 proxy（... args）、 proxy. call （object，... args）、 proxy. apply（...）。 
+ construct( target, args) 
  拦截 Proxy 实例 作为 构造 函数 调用 的 操作， 比如 new proxy（... args）。







## 12.2 Proxy实例的方法

### 12.2.1 get()

> 拦截某个属性的读取操作
>
> 如果没有拦截函数，访问不存在的属性返回`undefined`

get方法可以继承

```javascript
let people = new Proxy({},{
  get : function(target,propertyKey,receiver){
    console.log('GET '+propertyKey);
    return target[prooertyKey];
  }
});

let obj = Object.create(people);
obj.xxx = // “GET xxx”
```



实例：

利用 get 拦截 实现 一个 生成 各种 DOM 节点 的 通用 函数 dom

```javascript
const dom = new Proxy({},{
  get(target,proper){
    return function(attrs={},...children){
      const el = cdocument.createElement(proper);
      
      for(let attr of Object.keys(attrs)){
      	el.setAttribute(attr,attrs[attr]);
      }
      
      for(let son of children){
        if(typeof son === "string"){
          son = document.createTextNode(son);
        }
        el.appendChild(son);
      }
      
      return el;
    }
  }
});
```



### 12.2.2 set()

> set 方法 用于 拦截 某个 属性 的 赋值 操作。



```javascript
const proxy = new Proxy({},{
  set(target,prop,value){
    if(prop==="age"){
      if(!Number.isInteger(value)){
        throw new TypeError("The age is not an integer");
      }
      if(value>120){
        alert("年龄超标");
      }
      target[prop] = value;
    }
  }
});
```





### 12.2.3 apply()

> apply 方法 拦截 函数 的 调用、 call 和 apply 操作。



