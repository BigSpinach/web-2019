//观察者 模式（ Observer mode） 指的 是 函数 自动 观察 数据 对象 的 模式， 一旦 对象 有变化， 函数 就会 自动 执行。

const person =observable({
  name:"张三",
  age:25
});

function print(){
  console.log(`${person.name},${person.age}`);
}

observe(print);
person.age=250;



