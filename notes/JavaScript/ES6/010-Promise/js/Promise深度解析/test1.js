//let Promise = require("./MyPromise.js");
//let Promise = require("./02-simple_Promise.js");
let Promise = require("./03-then_Promise.js");
console.log(Promise);




//Promise 是一个类
// 1. 每次new Promise都需要传递一个执行器，执行器是立即执行的
// 2. 执行器函数中有两个参数 resolve 和reject
// 3. 默认Promise 有三个状态 padding  resolve（fulfilled） reject（rejected）
// 4. 如果一旦成功了 不能变成失败  一旦失败，只有当前状态是 padding的时候才能更改状态
// 5. 每个promise都有一个then方法

let p = new Promise((resolve, reject) => {
  //resolve('OJBK');
  //reject('NO');
  setTimeout(() => {
   
    resolve('OJBK');
    //reject("not ok");
    //throw new Error('失败');
  }, 1000);
});

//console.log(p);

p.then(data => {
  console.log("success:" + data);
}, err => {
  console.log("failure:" + err);
});

p.then(data => {
  console.log("success:" + data);
}, err => {
  console.log("failure:" + err);
});