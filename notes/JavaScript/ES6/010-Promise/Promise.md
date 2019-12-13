[TOC]

--

# Promoise



## 1.基本概念

> ES6中新增加的类 (new Promise)，目的是为了管理JS中的异步编程的，所以我们也把它称为“Promise设计模式”
>
> Promise 可以理解为一个容器，容器里保存着一部操作的结果



`Promise`对象有以下两个特点。

+ 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
+ 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。



**`Promise`本身是同步的，它可以管理异步操作的代码**

```javascript
 new Promise(() => {
//=>执行一个异步的任务（new Promise的时候，创建Promise的一个实例，立即会把当前函数体中的异步操作执行） =>“Promise是同步的，它可以管理异步操作”
	setTimeout(() => {
    	//... 
    }, 1000);
    console.log(1);//=>先输出1
}).then();
console.log(2);//=>再输出2
```



## 2. 基本使用

```javascript
let pro = new Promise((resolve, reject) => {
    //=>执行一个异步操作
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'js/1.js', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            val = xhr.responseText;
            resolve(val);
        }
        if (xhr.status !== 200) {
            //=>失败
            reject();
        }
    };
    xhr.send(null);
});
pro.then((res) => {
    console.log(res);
    //=>数据绑定
    return 100;//=>它返回的结果传递给第二个THEN了...
}, () => {
    console.log('no');
}).then((res) => {
    //=>当第一个THEN中的函数执行完，会执行第二个
    console.log(res);
}, () => {

}).then(() => {
    //=>当第二个THEN中的函数执行完，会执行第三个
}, () => {

});
```



## 3.Promise深入

> `Promise`是ES6中新增加的内置类：目的是为了管理异步操作的
>
> 1. new Promise() 创建类的一个实例，每一个实例都可以管理一个异步操作
>
>    - 必须传递一个回调函数进去（回调函数中管理你的异步操作）,不传递会报错
>
>    - 回调函数中会有两个参数
>
>      - resolve：异步操作成功做的事情（代指成功后的事件队列 =>成功后要做的所有的事情都存放到成功这个事件队列中）
>      - reject：异步操作失败做的事情（代指失败后的事件队列）
>
>    - new Promise的时候立即把回调函数执行了（Promise是同步的）
>
>      
>
> 2. 基于Promise.prototype.then方法（还有catch/finally两个方法）向成功队列和失败队列中依次加入需要处理的事情
>
> 3. 如果是多个`then`调用，不是像我们想象的依次把增加的方法执行
>
>    + 异步操作成功或者失败，先把第一个THEN中的方法执行，每当执行一个THEN会返回一个新的Promise实例，这个实例管控的是第一个THEN中方法执行的是成功还是失败



```javascript
let promise1 = new Promise((resolve, reject) => {
    $.ajax({
        url: 'json/data2.json',
        success(result) {
            resolve(result);
        },
        error(msg) {
            reject('no');
        }
    });
});
promise1.then(
    result => {
        console.log('THEN1 OK', result);
        return 100;
    },
    msg => {
        console.log('THEN1 NO', msg);
        return 100;
    }
).then(
    result => {
        console.log('THEN2 OK', result);
    },
    msg => {
        console.log('THEN2 NO', msg);
    }
);
```

```javascript
//=>建议不要使用THEN中的第二个参数（这样看起来很乱），而是建议我们使用Promise.prototype.catch来管理失败的情况
let promise1 = new Promise((resolve, reject) => {
    $.ajax({
        url: 'json/data2.json',
        success(result) {
            resolve(result);
        },
        error(msg) {
            reject('no');
        }
    });
});
promise1.then(result => {
    console.log('THEN1 OK', result);
    100();
    return 100;
}).catch(msg => {
    //=>第一个CATCH
    //1.异步请求失败会执行它
    //2.第一个THEN方法失败也会执行它
    console.log('CATCH1', msg);
}).then(result => {
    console.log('THEN2 OK', result);
}).catch(msg => {
    console.log('CATCH2', msg);
});

//=>JS中的异常捕获（目的：把抛出异常的错误捕获到，不让其阻断浏览器的继续执行）
/*
try {
    //=>正常执行的JS代码(可能会报错)
    1();
} catch (e) {
    //=>TRY中的代码报错了会执行CATCH
    console.log(e.message);
} finally {
    //=>不管TRY中的代码成功还是失败都会执行
}
*/
```



`Promise`管控异步操作，解决回调地狱

```javascript
let A = function A() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};

let B = function B() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};

let promise = A();
promise.then(() => {
    console.log(1);
    return B();//=>如果方法中返回的一个具体值，而且执行中没有错误异常，会立即执行下一个THEN中的方法（不写RETURN也是返回的了具体值：undefined），但是如果返回的是一个PROMISR实例（并且管控了一个异步操作），只能等PROMISE完成，把成功后的结果当做具体的值返回，才能进入下一个函数执行
}).then(() => {
    console.log(2);
});


```



## 高阶函数

定义：

+ 一个函数的参数是一个函数（回调）
+ 一个函数的返回值是一个函数（拆分函数）

```javascript
//目的：把函数的核心逻辑提取出来，在函数的外边再增加新的功能

Function.prototype.before = function(beforeFn){
  return (...args)=>{
    beforeFn();
    this(...args);
  }
};

//AOP  切片函数 装饰函数
//已有核心函数
const say = (...args)=>{
  console.log("核心功能",args);
};

//包装函数
const newSay = say.before(()=>{
  console.log("装饰层");
});


//执行
newSay();
newSay(1,2,3);


```



###  事务 transaction 

实现函数包装的功能
假如 fn执行，在fn函数执行**前**、**后** 各干了一些事情

```javascript
//React的部分源码解读
// 事务 开始的时候 做某件事 结束的时候在做某件事
//wrappers 包装层
const perform = (anyMethod,wrappers)=>{
  //本意执行anyMethod，wrappers 是对anyMethod的包装
  wrappers.forEach(item=>{
    item.initialize();
  });
  anyMethod();
   wrappers.forEach(item=>{
    item.close();
  });
}

perform(()=>{
  console.log("原始函数执行");
},[{
  initialize(){console.log("包装开始1")},
  close(){console.log("包装结束1")}
},{
  initialize(){console.log("包装开始1")},
  close(){console.log("包装结束1")}
}]);
```



### 柯理化函数 curry

```javascript
//柯理化函数
//柯理化 我们可以把一个大函数拆分成很多的具体的功能
// 柯里化 : 就是将一个函数拆分成多个函数
// 判断类型 Object.prototype.toString.call

//封装一个 checkType的方法，实现类型判断
//检测 谁 的 类型 
//检测 content 的 type
const checkType = (content, type) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
}

const result = checkType("abc", "String");
console.log(result);

//上述方法 需要两个参数，后边的判断类型需要手动填写，不好，预处理一下（柯理化思想）
console.log('----------我是分隔线---------------'); 
{
  const checkType = (type) => {
    //预处理这个 type
    return (content) => {
      return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
  }

  let isString = checkType('String');
  console.log(isString('abc'));
}

console.log('----------我是分隔线---------------');
{
  const checkType = (type) => {
    //预处理这个 type
    return (content) => {
      return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
  }

  let types = ["String", "Number", "Boolean", "RegExp"];
  let utils = {};
  types.forEach(type => {
    utils['is' + type] = checkType(type);
  });

  //let isString = checkType('String');
  console.log(utils.isString('abc'));
  console.log(utils.isNumber(123));
  console.log(utils.isRegExp(/\d{0,9}/));
}


console.log('----------我是分隔线---------------'); 
{
  //通用 柯理化
  const curring = (fn, arr = []) => {
    //arr用来存储fn的参数
    let len = fn.length;
    
    return (...args) => {
      arr = arr.concat(...args);
      console.log(arr);
      if (arr.length < len) {
        return curring(fn, arr);
      }
      return fn(...arr);
    }
  };

  let add = (a,b,c)=>{
    return a+b+c;
  }

  let r = curring(add)(1)(2,3);
  console.log(r);
}

console.log('----------我是分隔线---------------');
{
  //通用 柯理化
  const curring = (fn, arr = []) => {
    //arr用来存储fn的参数
    let len = fn.length;
    
    return (...args) => {
      arr = arr.concat(...args);
      if (arr.length < len) {
        return curring(fn, arr);
      }
      return fn(...arr);
    }
  };

  let checkType = (type,content)=>{   
   return Object.prototype.toString.call(content) === `[object ${type}]`;
  }

  let types = ["String", "Number", "Boolean", "RegExp"];
  let utils = {};
  types.forEach(type => {
    utils['is' + type] = curring(checkType)(type);
  });

 

  //test
  let result = utils.isString("a12aa");
  console.log(result);

}

```





## 4. Promise源码

###  4.1 Promise基础版

```javascript

```

