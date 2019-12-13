const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class MyPromise {
  constructor(executor) {
    //创建promise 实例，executor会立即执行
    
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.status === PENDING) { //状态一旦发生改变就不能再变
        this.value = value;
        this.status = FULFILLED;
        //this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.status === PENDING) { //状态一旦发生改变就不能再变
        this.reason = reason;
        this.status = REJECTED;
        //this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    // 这里可能会发生异常
    // try {
    //   executor(resolve, reject);
    // } catch (e) {
    //   reject(e);
    // }
    executor(resolve, reject);

  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.value);
    }
    // if (this.stats === PENDING) {
    //   this.onResolvedCallbacks.push(() => {
    //     onFulfilled(this.value);
    //   })
    //   this.onRejectedCallbacks.push(() => {
    //     onRejected(this.value);
    //   })
    // }
  }
}

// 导出当前类 commonjs定义方式
module.exports = MyPromise;
// 链式调用