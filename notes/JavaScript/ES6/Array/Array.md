

## Array

### 1. 数组的空位

```javascript
let arr = [,1,2,3,,,,,,5,,];

//判断0索引位置是否有值
console.log(0 in arr);//false
console.log(1 in arr);//true
console.log(arr);//[empty, 1, 2, 3, empty × 5, 5, empty]
```

`forEach` 对空位的处理(跳过空位，直接输出有值的值)

```javascript
arr.forEach(item=>{
	console.log(item);//1,2,3,5
});
```

`find` 对空位的处理(空位的值用`undefined`)

```javascript
arr.find(item=>{
	console.log(item);//undefined，1，2，3， undefined*5,5，undefined
});
```





### 2.数组的遍历方法

#### 2.1 forEach







#### 2.2 find





#### 2.3findeIndex 





#### 2.4 filter

```javascript
let arr = [1,2,'aaa',3,4];
let filter_arr = arr.filter((item,index)=>{
  return typeof item == 'number';
});
console.log(filter_arr);//[1,2,3,4];

```





#### 2.5 some



```javascript
let arr = [1,2,'aaa',3,4];
let some_return = arr.some((item,index)=>{
  return typeof item == 'string';
});
console.log(some_return);//true
```





#### 2.6 every

```javascript
let arr = [1,2,'aaa',3,4];
let every_return = arr.every((item,index)=>{
  return typeof item == 'number';
});
console.log(some_return);//false
```



#### 2.7 reduce 迭代

【语法】

```javascript
//reduce()方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
/*
	total	必需。初始值, 或者计算结束后的返回值。
	currentValue	必需。当前元素
	currentIndex	可选。当前元素的索引
	arr	可选。当前元素所属的数组对象。
	
	initialValue	可选。传递给函数的初始值
*/
```

 ```javascript
let ary =[1,2,3,4,5];
let return_reduce = ary.reduce((prev,item)=>{
  //item是每一次执行中数组的每一项（注意，当不设定默认prev的时候，默认将数组中的第一项作为prev，数组冲第二项开始迭代）
  
  //这里返回啥，就作为数组中的 下一个prev，
  console.log(prev,item);
});
/*输出5次
	 1				2
undefined 	3
undefined 	4
undefined 	5
undefined
*/


let return_reduce = ary.reduce((prev,item)=>{
 console.log(item);
});
/*
	2
	3
	4
	5
*/

let return_reduce = ary.reduce((prev,item)=>{
 return prev+item;
});
console.log(return_reduce);//15


//设定初始值
let return_reduce = ary.reduce((prev,item)=>{
 return prev+item;
},250);//设定初始第一个值prev是 250
//那么就是从 250 + 1
// 250+1+2
//...


 ```





#### 2.8 reduceRight





#### 2.9 map



### 3. set & map

### 3.1 set

```javascript
console.dir(new Set([1,23,4]));

/*
Set(3)
  	size: 3
  __proto__: Set
    add: ƒ add()
    clear: ƒ clear()
    constructor: ƒ Set()
    delete: ƒ delete()
    entries: ƒ entries()
    forEach: ƒ forEach()
    has: ƒ has()
    keys: ƒ values()
    size: (...)
    values: ƒ values()
    Symbol(Symbol.iterator): ƒ values()
    Symbol(Symbol.toStringTag): "Set"
    get size: ƒ size()
    __proto__: Object
  [[Entries]]: Array(3)
    0: 1
    1: 23
    2: 4
    	length: 3
*/
```





