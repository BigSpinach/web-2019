# Generator

> **生成器**对象是由一个 [generator function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*) 返回的,并且它符合[可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)和[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)。



## **语法**

```javascript
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

let g = gen(); 
// "Generator { }"
```

## **方法**

```javascript
Generator.prototype.next();//返回一个由 yield表达式生成的值。
Generator.prototype.return();//返回给定的值并结束生成器。
Generator.prototype.throw();//向生成器抛出一个错误。
```



## **描述**

> **生成器函数**在执行时能暂停，后面又能从暂停处继续执行。
>
> 调用一个**生成器函数**并不会马上执行它里面的语句，而是返回一个这个生成器的 **迭代器** **（iterator ）对象**。当这个迭代器的 `next() `方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现[`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)的位置为止，[`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield) 后紧跟迭代器要返回的值。或者如果用的是 [`yield*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
>
> `next()`方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 `yield `表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有` yield `语句，即生成器函数是否已经执行完毕并返回。
>
> 调用 `next()`方法时，如果传入了参数，那么这个参数会传给**上一条执行的 yield语句左边的变量**，例如下面例子中的` x `：
>
> ```javascript
> function *gen(){
>     yield 10;
>     x=yield 'foo';
>     yield x;
> }
> 
> var gen_obj=gen();
> console.log(gen_obj.next());// 执行 yield 10，返回 10
> console.log(gen_obj.next());// 执行 yield 'foo'，返回 'foo'
> console.log(gen_obj.next(100));// 将 100 赋给上一条 yield 'foo' 的左值，即执行 x=100，返回 100
> console.log(gen_obj.next());// 执行完毕，value 为 undefined，done 为 trues
> ```
>
> 



## 示例

### 1. 一个无限迭代器

```javascript
function* idMaker(){
    let index = 0;
    while(true)
        yield index++;
}

let gen = idMaker(); // "Generator { }"

console.log(gen.next().value); 
// 0
console.log(gen.next().value); 
// 1
console.log(gen.next().value); 
// 2
// ...
```

