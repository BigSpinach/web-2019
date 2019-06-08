//avg方法：实现任意数求平均（先求和再求平均：B中用到A）
let A = require('./a');
let avg = function avg(...arg){
  return A.sum(...arg)/arg.length;
};

module.exports = {
  avg:avg
};
