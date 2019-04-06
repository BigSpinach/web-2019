

# DOM

## 1. DOM树

> dom tree

> 当浏览器加载HTML页面的时候，首先就是DOM结构的计算，计算出来的DOM结构就是DOM树（把页面中的HTML标签像树桩结构一样，分析出之间的层级关系）



```

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <title>珠峰培训</title>

</head>

<body>

<div class="box" id="box">

    <ul>

        <li>新闻</li>

        <li>电影</li>

        <li>音乐</li>

    </ul>

    <div>最新新闻</div>

    <div>最新电影</div>

    <div>最新音乐</div>

</div>

</body>

</html>

```

![1550554725501](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1550554725501.png)



DOM树描述了标签和标签之间的关系（节点间的关系），我们只要知道任何一个标签，都可以依据DOM中提供的属性和方法，获取到页面中任意一个标签或者节点





## 2. 在JS中获取DOM元素的方法

### 2.1 **`documnet.getElementById`**

> 通过元素的ID获取指定的元素对象，使用的时候都是 `document.getElementById('')` 此处的document是限定了获取元素的范围，我们把它称之为“上下文(context)”



`1.getElementById的上下文只能是document`

> 因为严格意义上，一个页面中的ID是不能重复的，浏览器规定在整个文档中既可以获取这个唯一的ID

`2.如果页面中的ID重复了，我们基于这个方法只能获取到第一个元素，后面相同ID元素无法获取`

`3.在IE6~7浏览器中，会把表单元素(input...)的name属性值当做ID来使用（建议：以后使用表单元素的时候，不要让name和id的值有冲突）`



### 2.2 **`[context].getElementsByTagName`**

> `[context].getElementsByTagName`在指定的上下文中，根据标签名获取到一组元素集合（HTMLCollection）



1.获取的元素集合是一个类数组（不能直接的使数组中的方法）

2.它会把当前上下文中，子子孙孙（后代）层级内的标签都获取到（获取的不仅仅是儿子级的）

3.基于这个方法获取到的结果永远都是一个集合（不管里面是否有内容，也不管有几项，它是一个容器或者集合），如果想操作集合中具体的某一项，需要基于索引获取到才可以



### 2.3 **`[context].getElementsByClassName`**

> `[context].getElementsByClassName()`在指定的上下文中，基于元素的样式类名（class='xxx'）获取到一组元素集合



1.真实项目中，我们经常是基于样式类来给元素设置样式，所以在JS中，我们也会经常基于样式类来获取元素，但是此方法在IE6~8下不兼容

兼容处理方案参考：

```javascript

Node.prototype.queryElementsByClassName = function queryElementsByClassName() {

    if (arguments.length === 0) return [];

    var strClass = arguments[0],

        nodeList = utils.toArray(this.getElementsByTagName('*'));

    strClass = strClass.replace(/^ +| +$/g, '').split(/ +/);

    for (var i = 0; i < strClass.length; i++) {

        var reg = new RegExp('(^| +)' + strClass[i] + '( +|$)');

        for (var k = 0; k < nodeList.length; k++) {

            if (!reg.test(nodeList[k].className)) {

                nodeList.splice(k, 1);

                k--;

            }

        }

    }

    return nodeList;

};

```



### 2.4 **` documnet.getElementsByName`**

> `document.getElementsByName()`它的上下文也只能是document，在整个文档中，基于元素的name属性值获取一组节点集合（也是一个类数组）



1.在IE浏览器中（**IE9及以下版本**），只对表单元素的name属性起作用（正常来说：我们项目中只会给表单元素设置name，给非表单元素设置name，其实是一个不太符合规范的操作）



### 2.5 **`querySelector`**

> `[context].querySelector()` 在指定的上下文中基于选择器（类似于CSS选择器）获取到指定的元素对象（获取的是一个元素，哪怕选择器匹配了多个，我们只获取第一个）



### 2.6  **`querySelectorAll`**

> 在querySelector的基础上，我们获取到选择器匹配到的所有元素，结果是一个节点集合（NodeList）



1. querySelector/querySelectorAll 都是**不兼容IE6~8浏览器的**（不考虑兼容的情况下，我们能用ById或者其它方式获取的，也尽量不要用这两个方法，这两个方法性能消耗较大）



### 2.7 **`document.head`**

> 获取HEAD元素对象



### 2.8 **`document.body`**

> 获取BODY元素对象



### 2.9 **`document.documentElement`**

> 获取HTML元素对象



```javascript

//=>需求：获取浏览器一屏幕的宽度和高度（兼容所有的浏览器）

document.documentElement.clientWidth || document.body.clientWidth



document.documentElement.clientHeight || document.body.clientHeight

```



面试题：获取当前页面中所有ID为HAHA的和元素（兼容所有的浏览器）

```javascript

//=>不能使用querySelectorAll



/*

 * 1.首先获取当前文档中所有的HTML标签

 * 2.依次遍历这些元素标签对象，谁的ID等于HAHA，我们就把谁存储起来即可

 */

function queryAllById(id) {

    //->基于通配符*获取到整个文档中所有的HTML标签

    var nodeList = document.getElementsByTagName('*');



    //->遍历集合中的每一项，把元素ID和传递ID相同的这一项存储起来

    var ary = [];

    for (var i = 0; i < nodeList.length; i++) {

        var item = nodeList[i];

        item.id === id ? ary.push(item) : null;

    }

    return ary;

}

console.log(queryAllById('HAHA'));

```

## 3. 节点 （node）

> 在一个HTML文档中出现的所有东西都是节点

>  

> - 元素节点（HTML标签）

> - 文本节点（文字内容）

> - 注释节点（注释内容）

> - 文档节点（document）

> - ...



### 3.1 区分节点的属性

每一种类型的节点都会有一些属性区分自己的特性和特征

- nodeType：节点类型

- nodeName：节点名称

- nodeValue：节点值

 `元素节点`

nodeType：1

nodeName：大写标签名

nodeValue：null



`文本节点`

nodeType：3

nodeName：'#text'

nodeValue：文本内容



在标准浏览器中会把空格/换行等都当做文本节点处理



`注释节点`

nodeType：8

nodeName：'#comment'

nodeValue：注释内容



`文档节点`

nodeType：9

nodeName：'#document'

nodeValue：null



### 3.2 描述节点之间关系的属性

#### 3.2.1 **`parentNode`**

> 获取当前节点唯一的父亲节点



#### 3.2.2 **`childNodes`**

> 获取当前元素的所有子节点

> - 子节点：只获取儿子级别的

> - 所有：包含元素节点、文本节点等



#### 3.2.3 **`children`**

> 获取当前元素所有的元素子节点

> 在IE6~8中会把注释节点也当做元素节点获取到，所以兼容性不好



#### 3.2.4  **`previousSibling`**

> 获取当前节点的上一个哥哥节点（获取的哥哥可能是元素也可能是文本等）

> previousElementSibling：获取上一个哥哥元素节点（不兼容IE6~8）



#### 3.2.5 **`nextSibling`**

> 获取当前节点的下一个弟弟节点 

>  

> nextElementSibling：下一个弟弟元素节点（不兼容）



#### 3.2.6 **`firstChild`**

> 获取当前元素的第一个子节点（可能是元素或者文本等）

>  

> firstElementChild



#### 3.2.7 **`lastChild`**

> 获取当前元素的最后一个子节点

>  

> lastElementChild



----------------

#### 3.2.7 兼用获取指定元素

##### 3.2.7.1 获取当前元素的所有元素子节点---`children`

> 基于children不兼容IE低版本浏览器（会把注释当做元素节点）



```javascript

/*

 * children：get all the element nodes of the current element

 * @parameter

 *    curEle：[object] current element

 * @return

 *    [Array] all the element nodes

 * by team on 2018/04/07 12:36

 */

function children(curEle) {

    //=>首先获取当前元素下所有的子节点,然后遍历这些节点,筛选出元素的(NODE-TYPE===1),把筛选出来的结果单独存储起来即可

    var nodeList = curEle.childNodes,

        result = [];

    for (var i = 0; i < nodeList.length; i++) {

        var item = nodeList[i];

        if (item.nodeType === 1) {

            result.push(item);

        }

    }

    return result;

}

console.log(children(course));

```

##### 3.2.7.2 获取当前元素的上一个哥哥元素节点 ----`prev`

> previousSibling：上一个哥哥节点

> previousElementSibling：上一个哥哥元素节点，但是不兼容



```javascript

/*

 * prev：get the last elder brother element node of the current element

 * @parameter

 *    curEle：[object] current element

 * @return

 *    [object] last elder brother element

 * by team on 2018/04/07 12:44

 */

function prev(curEle) {

    //=>先找当前元素的哥哥节点,看是否为元素节点,不是的话,基于哥哥,找哥哥的上一个哥哥节点...一直到找到元素节点或者已经没有哥哥了(说明我就是老大)则结束查找

    var pre = curEle.previousSibling;

    while (pre && pre.nodeType !== 1) {

        /*

         * pre && pre.nodeType !== 1

         *   pre是验证还有没有，这样写代表有，没有pre是null

         *   pre.nodeType是验证是否为元素

         */

        pre = pre.previousSibling;

    }

    return pre;

}

```

##### 3.7.2.3 获取当前元素的下一个弟弟元素---`next`

```javascript
function next(curEle){
    var nextEle = curEle.nextSibling;
    while(nextEle && nextEle.nodeType!==1){
        nextEle = nextEle.nextSibling;
    }
    return nextEle;
}
```

##### 3.7.2.4 获取所有哥哥节点--`prevAll`

```javascript

```





##### 3.7.2.5 获取所有弟弟元素 ---`siblings`

```javascript

```



##### 3.7.2.6 获取当前元素的索引----` index`

```javascript

```



##### 3.7.2.7

```javascript

```



## 4 .关于DOM的增删改

### 4.1 **`createElement`**

> 创建一个元素标签(元素对象)

> `document.createElement([标签名])`



### 4.2 **`appendChild`**

> 把一个元素对象插入到指定容器的末尾

> `[container].appendChild([newEle])`



### 4.3 **`insertBefore`**

> 把一个元素对象插入到指定容器中某一个元素标签之前

> `[container].insertBefore([newEle],[oldEle])`



###  4.4**`cloneNode`**

> 把某一个节点进行克隆

>  

> `[curEle].cloneNode()`：浅克隆，只克隆当前的标签

> `[curEle].cloneNode(true)`：深克隆，当前标签及其里面的内容都一起克隆了



### 4.5 **`removeChild`**

> 在指定容器中删除某一个元素

>  

> `[container].removeChild([curEle])`



### 4.6 **`set/get/removeAttribute`**

> 设置/获取/删除 当前元素的某一个自定义属性



```javascript

var oBox=document.getElementById('box');



//=>把当前元素作为一个对象，在对象对应的堆内存中新增一个自定义的属性

oBox.myIndex = 10;//=>设置

console.log(oBox['myIndex']);//=>获取

delete oBox.myIndex; //=>删除



//=>基于Attribute等DOM方法完成自定义属性的设置

oBox.setAttribute('myColor','red'); //=>设置

oBox.getAttribute('myColor'); //=>获取

oBox.removeAttribute('myColor'); //=>删除



上下两种机制属于独立的运作体制，不能互相混淆使用

- 第一种是基于对象键值对操作方式，修改当前元素对象的堆内存空间来完成

- 第二种是直接修改页面中HTML标签的结构来完成（此种办法设置的自定义属性可以在结构上呈现出来）



基于setAttribute设置的自定义属性值都是字符串

```





需求：解析一个URL字符串问号传参和HASH值部分

## 5 .JS盒子模型



### 5.1 获取常用（复合）样式的值

【`clientWidth & clientHeight`】

> 获取当前元素可视区域的宽高（内容的宽高+左右/上下PADDING）
> //=>和内容是否有溢出无关（和是否设置了OVERFLOW:HIDDEN也无关），就是我们自己设定的内容的宽高+PADDING

```javascript
//获取一屏幕的宽高
document.documentElement.clientWidth||document.body.clientWidth
document.documentElement.clientHeight||document.body.clientHeight
```

【`clientTop & clientLeft`】

> 获取(上/左)边框的宽度



【`offsetWidth & offsetHeight`】

> 在client的基础上加上border（和内容是否溢出也没有关系）



【`scrollWidth & scrollHeight`】

> 真实内容的宽高（不一定是自己设定的值，因为可能会存在内容溢出，有内容溢出的情况下，需要把溢出的内容也算上）+ 左/上PADDING，而且是一个约等于的值 （没有内容溢出和CLIENT一样）
>
> =>在不同浏览器中，或者是否设置了OVERFLOW:HIDDEN都会对最后的结果产生影响，所以这个值仅仅做参考，属于约等于的值

```javascript
//=>获取当前页面的真实宽高（包含溢出的部分）
document.documentElement.scrollWidth || document.body.scrollWidth
document.documentElement.scrollHeight || document.body.scrollHeight
```

【通过JS盒模型属性获取值的特点】

> + 1.获取的都是数字不带单位
> + 2.获取的都是整数，不会出现小数（一般都 会四舍五入，尤其是获取的 偏移量）
> + 3.获取的结果都是复合样式值（好几个元素的样式组合在一起的值），如果只想获取单一样式值（例如：只想获取PADDING），我们的盒子模型属性就操作不了了（这不能说没有用，真实项目中，有时候我们就是需要获取组合的值来完成一些操作）

【offsetParent 、offfsetLeft、offsetTop】

> + offsetParent  当前盒子的父级参照物
> + offfsetLeft  获取当前盒子距离其父级参照物的偏移量(上偏移/左偏移)
> + offsetTop  当前盒子的外边框开始~父级参照物的内边框



【scrollLeft、scrollTop】

> 滚动条卷去的宽度或者高度
>
> + 最小卷去值：0
> + 最大卷去值：真实页面的高度 - 一屏幕的高度   document.documentElement.scrollHeight-document.documentElement.clientHeight
>   

 *   在JS盒子模型13个属性中，只有scrollTop/scrollLeft是**“可读写”**属性，其余都是“只读”属性
   
 *   操作浏览器的盒子模型属性，我们一般都要写两套，用来兼容各种模式下的浏览器
   

### 5.2  **获取元素具体的某个样式值**

#### 5.2.1 [元素].style.xxx 

>只能获取所有写在元素行内上的样式(不写在行内上,不管你写没写都获取不到,真实项目中我们很少会把样式写在行内上)

#### 5.2.2 获取当前元素所有经过浏览器计算的样式 

> +  经过计算的样式：只要当前元素可以在页面中呈现（或者浏览器渲染它了），那么它的样式都是被计算过的
> + 不管当前样式写在哪
> + 不管你是否写了(浏览器会给元素设置一些默认样式)

【标准浏览器(IE9+)】

```
window.getComputedStyle([元素],[伪类,一般都写null]) 获取到当前元素所有被浏览器计算过的样式(对象)
```

【 IE6~8】

```
 [元素].currentStyle 获取经过计算的样式
```

 

### 5.3 常用操作样式的方法封装

#### 5.3.1 ` getCss(curEle,attr)`

`getCss(curEle,attr)`

```javascript
/*
 * getCss：获取当前元素某一个样式属性值
 *
 * @param
 *    curEle[object]：当前要操作的元素
 *    attr[string]：当前要获取的样式属性名
 *
 * @return
 *    获取的样式属性值
 */
let getCss = function getCss(curEle, attr) {
    if ('getComputedStyle' in window) {
        //typeof window.getComputedStyle === 'undefined'
        let val = window.getComputedStyle(curEle, null)[attr];
        let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    }
    throw new SyntaxError('您的浏览器版本过低...');
};
```

```javascript
let getCss = function (curEle, attr) {
    if (typeof window.getComputedStyle === 'undefined') {
        //=>当前浏览器不兼容GET-COMPUTED-STYLE
        return;
    }
    let val = window.getComputedStyle(curEle, null)[attr],
        reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
    reg.test(val) ? val = parseFloat(val) : null;
    return val;
};

```



#### 5.3.2 `setCss(curEle,attr,value)`

`setCss(curEle,attr,value)`

```javascript
//JS中给元素设置样式只有两种
//1.设置元素的样式类名（前提：样式类及对应的样式已经处理完成）
//2.通过行内样式设置 xxx.style.xxx=xxx
let setCss = function (curEle, attr, value) {
    /*
     * 细节处理
     *   1.如果需要考虑IE6~8兼容，透明度这个样式在低版本浏览器中不是使用opacity，而是filter（我们两套都要设置）
     *   2.如果传递进来的VALUE值没有带单位,我们根据情况设置PX单位
     *     ->某些样式属性才会加单位：WIDTH/HEIGHT/PADDING(LEFT...)/MARGIN(LEFT...)/FONT-SIZE/TOP/LEFT/BOTTOM/RIGHT...
     *     ->用户自己传递的VALUE值中是没有单位的
     */
    if (attr === 'opacity') {
        curEle.style.opacity = value;
        curEle.style.filter = `alpha(opacity=${value * 100})`;
        return;
    }
    if (!isNaN(value)) {
        //=>IS-NaN检测的结果是FALSE：说明VALUE是纯数字没单位
        let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
        reg.test(attr) ? value += 'px' : null;
    }
    curEle['style'][attr] = value;
};
```



#### 5.3.3 `setGroupCss (curEle, options = {})`

```javascript
let setGroupCss = function (curEle, options = {}) {
    //=>遍历传递的OPTIONS,有多少键值对,就循环多少次,每一次都调取SET-CSS方法逐一设置即可
    for (let attr in options) {
        if (!options.hasOwnProperty(attr)) break;
        //=>options:传递进来的需要修改的样式对象(集合)
        //=>attr:每一次遍历到的集合中的某一项(要操作的样式属性名)
        //=>options[attr]:传递的要操作的样式属性值
        setCss(curEle, attr, options[attr]);
    }
};
```

#### 5.3.4 css:集合`get/set/setGroup`为一体的方法

```javascript
/*let css = function (...arg) {
    //=>ARG:传递的实参集合
    let len = arg.length;
    if (len >= 3) {
        //=>单一设置:SET-CSS
        // arg=[outer, 'width', 500];
        // setCss(outer, 'width', 500);
        // setCss.apply(null,arg);
        setCss(...arg);
        return;
    }

    if (len === 2 && typeof arg[1] === 'object' && arg[1] !== null) {
        //=>传递两个参数，第二个参数是一个对象(不是NULL)，说明想要操作的是批量设置
        setGroupCss(...arg);
        return;
    }
    //=>剩下的代表获取样式
    return getCss(...arg);
};*/
/*let css = function (...arg) {
    let len = arg.length,
        fn = getCss;
    len >= 3 ? fn = setCss : null;
    len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null;
    return fn(...arg);
};*/
```



#### 5.3.5 

#### 5.3.6

#### 5.3.7 

