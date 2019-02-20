## `number `数字类型 

> NaN：not a number 但是它是数字类型的 
>
> isNaN：检测当前值是否不是有效数字，返回true代表不是有效数字，返回false是有效数字 


```javascript

//=>语法：isNaN([value])

var num=12;

isNaN(num); //->检测num变量存储的值是否为非有效数字 false

isNaN('13') =>false

isNaN('BigSpinach') =>true

isNaN(true) =>false

isNaN(false) =>false

isNaN(null) =>false

isNaN(undefined) =>true

isNaN({age:9}) =>true

isNaN([12,23]) =>true

isNaN([12]) =>false

isNaN(/^$/) =>true

isNaN(function(){}) =>true



重要：isNaN检测的机制

1、首先验证当前要检测的值是否为数字类型的，如果不是，浏览器会默认的把值转换为数字类型

  把非数字类型的值转换为数字

  - 其它基本类型转换为数字：直接使用Number这个方法转换的



  [字符串转数字]

    Number('13') ->13

    Number('13px') ->NaN 如果当前字符串中出现任意一个非有效数字字符，结果则为NaN

    Number('13.5') ->13.5 可以识别小数



  [布尔转数字]

    Number(true) ->1

    Number(false) ->0



  [其它]

    Number(null) ->0

    Number(undefined) ->NaN



  - 把引用数据类型值转换为数字：先把引用值调取toString转换为字符串，然后再把字符串调取Number转换为数字



   [对象]

     ({}).toString() ->'[object Object]' ->NaN



   [数组]

     [12,23].toString() ->'12,23' ->NaN

     [12].toString() ->'12' ->12



   [正则]

     /^$/.toString() ->'/^$/' ->NaN



  Number('') ->0

  [].toString() ->''

  => isNaN([])：false



2、当前检测的值已经是数字类型，是有效数字返回false，不是返回true（数字类型中只有NaN不是有效数字，其余都是有效数字）



```



2. parseInt / parseFloat

> 等同于Number，也是为了把其它类型的值转换为数字类型

> 和Number的区别在于字符串转换分析上

> Number：出现任意非有效数字字符，结果就是NaN

> parseInt：把一个字符串中的整数部分解析出来，parseFloat是把一个字符串中小数(浮点数)部分解析出来

```

parseInt('13.5px') =>13

parseFloat('13.5px') =>13.5



parseInt('width:13.5px') =>NaN 从字符串最左边字符开始查找有效数字字符，并且转换为数字，但是一但遇到一个非有效数字字符，查找结束

```



3. NaN的比较

```

NaN==NaN：false NaN和谁都不相等，包括自己

```



思考题：有一个变量num，存储的值不知道，我想检测它是否为一个有效数字，下面方案是否可以

```javascript

if(Number(num)==NaN){

    alert('num不是有效数字!');

}



NaN和谁都不相等，条件永远不成立（即使num确实不是有效数字，转换的结果确实是NaN，但是NaN!=NaN的）



if(isNaN(num)){

    //=>检测是否为有效数字，只有这一种方案

    alert('num不是有效数字!')

}

```


