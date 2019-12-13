let Promise = require('./03-then_Promise');
//console.log(Promise);

let p = new Promise((resolve, reject) => {
  resolve('你好1');
  //reject('挂了1');
  //throw new Error('刚创建就挂了1');
});
//console.log(p);

/*
let promise2 = p.then(data => {
  //console.log(data);
  return promise2;
  //自己等待自己成功或失败
}, err => {
  console.log(err);
});

promise2.then(data => {
  console.log("promise2:" + data);
}, err => {
  console.log(err);
});

*/

let promise2 = p.then(data => {
  //console.log(data);
  //throw new Error('抛出异常');
  return new Promise((resolve,reject)=>{
    //resolve(1);
    setTimeout(()=>{
      resolve(
        new Promise((resolve,reject)=>{
          //resolve(1);
          setTimeout(()=>{
            resolve(
              new Promise((resolve,reject)=>{
                //resolve(1);
                setTimeout(()=>{
                  resolve(250);
                },1000)
              })
            );
          },1000)
        })
      );
    },1000)
  })
})

//console.log(promise2);
promise2.then((data) => {
 
  console.log("promise2:" + data);
}, (err) => {
  console.log(err);
});