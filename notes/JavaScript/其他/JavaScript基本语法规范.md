## 1. 变量  (variable) 

它不是具体的值，只是一个用来存储具体值的容器或者代名词，因为它存储的值可以改变，所以称为变量 


基于ES语法规范，在JS中创建变量有以下方式

  - var (ES3)

  - function (ES3) 创建函数(函数名也是变量，只不过存储的值是函数类型的而已)

  - let (ES6)

  - const (ES6) 创建的是常量

  - import (ES6) 基于ES6的模块规范导出需要的信息

  - class (ES6) 基于ES6创建类



``` javascript

/*

 * 语法：

 *   var [变量名]=值

 *   let [变量名]=值

 *   const [变量名]=值

 *   function 函数名(){

 *

 *   }

 *   ...

 */

var n = 13;

n = 15;

alert(n+10);//=>弹出来25 此时的N代表15



const m = 100;

m = 200;//=>Uncaught TypeError: Assignment to constant variable. 不能给一个常量重新的赋值（常量存储的值不能被修改，能够修改就是变量了）

```



创建变量，命名的时候要遵循一些规范

- 严格区分大小写

- 遵循驼峰命名法：按照数字、字母、下划线或者$来命名（数字不能做为名字的开头），命名的时候基于英文单词拼接成一个完整的名字（第一个单词字母小写，其余每一个有意义单词的首字母都大写）

- 不能使用关键字和保留字：在JS中有特殊含义的叫做关键词，未来可能会成为关键字的叫做保留字



```

var n=12;

var N=13; //=>两个n不是同一个变量



var studentInfo / student_info / _studentInfo（下划线在前的，都是公共变量） / $studentInfo（一般存储的是JQ元素）...



语义化强一些

  add / create / insert

  del（delete）/ update / remove（rm）

  info / detail

  log

  ...

```



----

## 2. 数据类型 (data type)

### 2.1 基本数据类型（值类型 ） 

+ 数字number   
+ 字符串string   
+ 布尔boolean  
+ null 
+ undefined 

### 2.2 引用数据类型 

+ 对象object      
  + 普通对象     
  + 数组对象      
  + 正则对象      
  + 日期对象      
  + ...    
+ 函数function 
+ ES6中新增加的一个特殊的类型：Symbol，唯一的值 




```

[基本数据类型]

var n = 13; //=>0 -13 13.2 数字类型中有一个特殊的值NaN（not a number代表不是一个有效的数字,但是属于number类型的）



var s = '';//=>"" '13' "{}" JS中所有用单引号或者双引号包裹起来的都是字符串，里面的内容是当前字符串中的字符（一个字符串由零到多个字符组成）



var b = true;//=>布尔类型只有两个值 true真 false假



[引用数据类型]

var o = {name:'珠峰培训',age:9};//=>普通的对象：由大括号包裹起来，里面包含多组属性名和属性值（包含多组键值对） {}空对象



var ary = [12,23,34,45]; //=>中括号包裹起来，包含零到多项内容，这种是数组对象  []空数组



var reg = /-?(\d|([1-9]\d+))(\.\d+)?/g; //=>由元字符组成一个完整的正则  //不是空正则是单行注释



function fn(){



}



[Symbol]

创建出来的是一个唯一的值

var a = Symbol('珠峰');

var b = Symbol('珠峰');

a==b =>false

```





### 2.3 扩展：JS代码如何被运行以及运行后如何输出结果

[如何被运行]

- 把代码运行在浏览器中(浏览器内核来渲染解析)

- 基于NODE来运行(NODE也是一个基于V8引擎渲染和解析JS的工具)



[如何输出结果]

- alert：在浏览器中通过弹框的方式输出(浏览器提示框)

```

var num=12;

alert(num); //=>window.alert



var str='BigSpinach';

alert(str);

//基于alert输出的结果都会转换为字符串：把值(如果是表达式先计算出结果)通过toString这个方法转换为字符串，然后再输出

alert(1+1); =>'2'

alert(true); =>'true'

alert([12,23]); =>'12,23'

alert({name:'xxx'}); =>'[object Object]' 对象toString后的结果就是object object，为啥？

```



- confirm：和alert的用法一致，只不过提示的框中有确定和取消两个按钮，所以它是确认提示框

```

var flag = confirm('确定要退出吗?');

if(flag){

   //=>flag:true 用户点击的是确定按钮

}else{

   //=>flag:false 用户点击的是取消按钮

}

```



- prompt：在confirm的基础上增加输入框



- console.log：在浏览器控制台输出日志（按F12(FN+F12)打开浏览器的控制台）

    + Elements：当前页面中的元素和样式在这里都可以看到，还可以调节样式修改结构等

    + Console：控制台，可以在JS代码中通过.log输出到这里，也可以在这里直接的编写JS代码

    + Sources：当前网站的源文件都在这里

    + ...



- console.dir：比log输出的更加详细一些（尤其是输出对象数据值的时候）
- console.table：把一个JSON数据按照表格的方式输出
- ... 
- window.console



----



