[TOC]





# ES6核心总结





---

## 1.模块化的使用和编译环境

* 开发环境已经普及使用
* 浏览器环境支撑不太好（要用开发环境编译）
* ES6标准和使用

### 1.1 ES6模块化如何使用，开发环境如何打包

## 2.class与js构造函数的区别

### 2.1 js的构造函数

```javascript
function MathHandle(a,b){
  this.a=a;
  this.b=b;
};
MathHandle.prototype.add = function (){
  return this.a+this.b;
};

var m = new MathHandle(2,3);
console.log(m.add());//5
```

### 2.2 class基本语法

```javascript
class MathHandle{
  constructor(a,b){
    //super(props);
    //私有属性
    this.a=a;
    this.b=b;
  }

  //共有属性（原型prototype上的属性和方法）
  add(){
    return this.a + this.b;
  }

};

let m = new MathHandle(1,2);
console.log(m.add());

console.log(typeof MathHandle);//"function"
console.log( MathHandle===MathHandle.prototype.constructor );//"true"
m.__proto__ === MathHandle.constructor;//true
```







## 3. Promise





## 4. ES6的其他功能

