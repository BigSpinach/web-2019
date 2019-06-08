//sum  实现任意数求和
let sum =  function sum(...arg) {
  let total = 0;
  arg.forEach(i=>total+=i);
  return total;
};

module.exports={
  sum:sum
};
