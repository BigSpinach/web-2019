# async&await

## 1. `async`

> 将一个函数变成`Pormis`对象

```javascript
let f = function fn(){
  return 1
};
console.dir(f);
/*
	ƒ fn()
    arguments: null
    caller: null
    length: 0
    name: "fn"
    prototype: {constructor: ƒ}
    __proto__: ƒ ()
    [[FunctionLocation]]: VM1327:1
    [[Scopes]]: Scopes[2]	
*/
f();//=>1
//就是将fn()执行
```



```javascript
let f =async function fn(){
  return 1
};
console.dir(f);
/*
	async ƒ fn()
      arguments: (...)
      caller: (...)
      length: 0
      name: "fn"
      __proto__: AsyncFunction
      [[FunctionLocation]]: VM3571:1
      [[Scopes]]: Scopes[2]		
*/
f();
//f返回一个Promise对象的实例
/*
  Promise {<resolved>: 1}
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: 1
*/
fn().then(res=>{
  //throw new Error('xxx');
 //resoved,返回执行成功的结果 
  console.log(res);//1
}).catch(e=>{
	console.log(e);
})
```





## 2. `await`

> + await 后面跟了一个Promise对象 
>
>   如果不是默认将其变成一个resolve状态的promise，值作为resolve的参数
>
> + await的结果就是resolve或者reject的参数
>
> + await异步执行完成之后再去执行后边的代码

await是不能单独使用的，都是在async函数中使用

```javascript
//await 后边跟的不是promise对象
let ff = async function fn1(){
  let a = await 1;//await 后边跟的不是promise对象，他就会把这个 1 直接作为resolve状态的promise作为resolve的参数返回
  console.dir(a);//1
};


//await 后边跟promise对象
let ff2 = async function fn2(){
  let a = await new Promise((resolve,reject)=>{
	//resolve("Promise成功后返回的结果");
    resolve(250);
});
  //console.dir(a);//Promise成功后返回的结果
  console.dir(a);//250
//不需要在then（resolve）方法中通过参数拿 结果了，这里直接就可以拿到
};


//=啥意思呢
let ff3 = async function fn2(){
  //通过await可以直接拿到promise对象执行成功或者失败的返回参数
  //a =resolve|reject
  let a = await new 	Promise((resolve,reject)=>{
    resolve(250);
});
};
```





