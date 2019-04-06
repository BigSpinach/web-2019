# BigSpinach_utils.js

## 1 数据类型的转换



### 1.1 toArray

> 把类数组转换为数组（兼容所有的浏览器）

```javascript
function toArray(classAry) {
	var ary = [];
	try {
		ary = Array.prototype.slice.call(classAry);
	} catch (e) {
		for (var i = 0; i < classAry.length; i++) {
			ary[ary.length] = classAry[i];
		}
	}
	return ary;
}
```

【兼容所有浏览器】

```javascript

function toArray (similarArray) {
        /*
         *   try catch js
         * */
        var a = [];
        try {
            a = Array.prototype.slice.call(similarArray);
        } catch (e) {
            alert(); //ie7 和 8 弹出
            var a = [];
            for (var i = 0; i < similarArray.length; i++) {
                a[a.length] = similarArray[i];
            }
        }
        return a;
    },
```





### 1.2 toJSON(str)

> 把JSON格式的字符串转换为JSON格式的对象

```javascript
function toJSON(str) {
 	return "JSON" in window ? JSON.parse(str) : eval('(' + str + ')');
}
```



### 1.3 数据类型检测







> 基于Object.prototype.toString.call(item);
>
> 返回 的是数据格式类型为 [object xxoo]
>
> ​				[object String]
>
> 配合 RegExp 编写一个判断数据类型的方法
>
> new RegEx('\\[ object '+'String\\]').test(Object.prototype.toString.call('字符串'));
>
> new RegEx('\\[ object '+'Function\\]').test(Object.prototype.toString.call(fn));



```javascript
~function () {
    var obj = {
        isNumber: 'Number',
        isString: 'String',
        isBoolean: 'Boolean',
        isNull: 'Null',
        isUndefined: 'Undefined',
        isPlanObject: 'Object',
        isArray: 'Array',
        isRegExp: 'RegExp',
        isFunction: 'Function'
    };
    var check = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            check[key] = (function (classValue) {
                return function (val) {
                    return new RegExp('\\[object ' + classValue + '\\]').test(Object.prototype.toString.call(val));
                }
            })(obj[key]);
        }
    }
    window.check = check;
}();

```



## 2. 样式操作相关

```javascript
let utils = (function () {
    //=>获取元素的样式
    let getCss = function (curEle, attr) {
        if (typeof window.getComputedStyle === 'undefined') {
            return;
        }
        let val = window.getComputedStyle(curEle, null)[attr],
            reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    };

    //=>设置元素样式
    let setCss = function (curEle, attr, value) {
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = `alpha(opacity=${value * 100})`;
            return;
        }
        if (!isNaN(value)) {
            let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
            reg.test(attr) ? value += 'px' : null;
        }
        curEle['style'][attr] = value;
    };

    //=>批量设置元素样式
    let setGroupCss = function (curEle, options = {}) {
        for (let attr in options) {
            if (!options.hasOwnProperty(attr)) break;
            setCss(curEle, attr, options[attr]);
        }
    };

    //=>CSS操作汇总
    let css = function (...arg) {
        let len = arg.length,
            fn = getCss;
        len >= 3 ? fn = setCss : null;
        len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null;
        return fn(...arg);
    };

    //=>offset：获取当前元素距离BODY的偏移(左偏移和上偏移)
    let offset = function (curEle) {
        //1.先获取当前元素本身的左/上偏移
        let curLeft = curEle.offsetLeft,
            curTop = curEle.offsetTop,
            p = curEle.offsetParent;

        //2.累加父参照物的边框和偏移(一直向上找,找到BODY为止,每当找到一个父参照物都把它的边框和偏移累加起来,根据元素不一样,具体找几次也不知道)
        //TAG-NAME获取当前元素的标签名(大写的)
        while (p.tagName !== 'BODY') {//=>当找到的父参照物是BODY结束查找和累加操作
            //3.把找到的父参照物的边框和偏移值累加起来
            curLeft += p.clientLeft;
            curLeft += p.offsetLeft;
            curTop += p.clientTop;
            curTop += p.offsetTop;
            p = p.offsetParent;//=>基于当前找到的父参照物继续向上查找
        }

        return {
            top: curTop,
            left: curLeft
        };
    };

    //=>操作浏览器盒子模型属性的
    let winHandle = function (attr, value) {
        if (typeof value !== 'undefined') {
            //=>设置盒子模型属性值:SCROLL-TOP/LEFT
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    };

    return {
        css, //=>在ES6中直接这样写相当于 css:css
        offset,
        winHandle
    }
})();
```

### 2.1 【getCss】

```javascript
 let getCss = function (curEle, attr) {
        if (typeof window.getComputedStyle === 'undefined') {
            return;
        }
        let val = window.getComputedStyle(curEle, null)[attr],
            reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    };
```

【兼任所有浏览器】-IE6/7/8

```javascript
getCss: function (curEle, attr) {
        //
        var reg = /^(-?\d+(\.\d+)?)(?:px|em|pt|deg|rem)$/;
        var val = null;
        if (/MSIE (?:6|7|8)/.test(window.navigator.userAgent)) {
            //这里处理filter的滤镜问题  alpha(opacity=40);
            if (attr === 'opacity') {
                //alpha(opacity=40)
                val = curEle.currentStyle['filter'];
                var reg1 = /^alpha\(opacity=(\d+(\.\d+)?)\)/;
                return reg1.test(val) ? RegExp.$1 / 100 : 1;
            }
            val = curEle.currentStyle[attr];
        } else {
           val =   attr === 'opacity' ?   window.getComputedStyle(curEle,null)[attr]/1 : window.getComputedStyle(curEle,null)[attr];
        }
        return reg.test(val) ? parseFloat(val) : val; //如果正则验证通过，说明返回值是带单位的，那么我们就要人为去掉这个单位。否则不变
    }
```



### 2.2 【setCss】

```javascript
let setCss = function (curEle, attr, value) {
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = `alpha(opacity=${value * 100})`;
            return;
        }
        if (!isNaN(value)) {
            let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
            reg.test(attr) ? value += 'px' : null;
        }
        curEle['style'][attr] = value;
    };
```

【兼任IE6/7/8】

```javascript
function setCss (ele, attr, value) {
   if (attr == 'opacity') { //处理透明度
   		// window.navigator.userAgent.indexOf('MSIE') >= 0
   		if (/MSIE (?:6|7|8)/.test(window.navigator.userAgent)) {
       ele.style['filter'] = 'alpha(opacity=' + value * 100 + ')';
   		} else {
       		ele.style.opacity = value;
  		}
  		return;
	}
    //float的问题也需要处理 cssFloat styleFloat
    if (attr === 'float') {
        ele.style['cssFloat'] = value;
        ele.style['styleFloat'] = value;
        return;
    }
    var reg = /^(width|height|left|top|right|bottom|(margin|padding)(Top|Bottom|Left|Right)?)$/;
        //判断你传进来这个value是否带单位，如果带单位了我就不加了
        // 5px
    if (reg.test(attr)) { //验证通过就证明是width等值
       if (!isNaN(value)) { //不带单位的我就加
          value += 'px';
       }
    }
    ele.style[attr] = value;
}
```

### 2.3【setGroupCss】

```javascript
 let setGroupCss = function (curEle, options = {}) {
        for (let attr in options) {
            if (!options.hasOwnProperty(attr)) break;
            setCss(curEle, attr, options[attr]);
        }
  };
```



```javascript
let setGroupCss = function (ele, obj) {  //批量设置样式属性
        //首先保证obj是一个对象
        /*
         if(!Object.prototype.toString.call(obj) == '[object Object]'){
         return;
         }
         */
        //我嫌弃这个有点长
        obj = obj || '0'; //如果没传要做处理保证我们的程序不报错误
        if (obj.toString() != '[object Object]') {
            return;
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.setCss(ele, key, obj[key]);
            }
        }
    }
```



### 2.4【css】

```javascript
let css = function (...arg) {
        let len = arg.length,
            fn = getCss;
        len >= 3 ? fn = setCss : null;
        len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null;
        return fn(...arg);
 };

```

```javascript
var css = function() {
	var len = arguments.length,
		type = Object.prototype.toString.call(arguments[1]),
		fn = getCss;
	len >= 3 ? fn = setCss : (len === 2 && type === '[object Object]' ? fn = setGroupCss : null);
		return fn.apply(this, arguments);
};
```





### 2.5 【offset全兼容】

```javascript
let offset = function (ele) {
        var eleLeft = ele.offsetLeft;
        var eleTop = ele.offsetTop;
        var eleParent = ele.offsetParent;
        var left = null;
        var top = null;
        left += eleLeft;
        top += eleTop;
        while (eleParent) {
            //console.log(eleParent);
            /*
             *  ps: ie8中会有一个问题如果在ie8中就不加父级的边框了。因为已经加过了。
             *  判断我的当前浏览器是不是ie8   1 可以用正则 test MSIE 8.0   2 字符串
             *  中的indexOf MSIE 8.0 判断 -1. window.navigator.userAgent
             * */
            if (window.navigator.userAgent.indexOf('MSIE 8.0') !== -1) { //ie8
                left += eleParent.offsetLeft;
                top += eleParent.offsetTop;
            } else {
                left += eleParent.clientLeft + eleParent.offsetLeft;
                top += eleParent.clientTop + eleParent.offsetTop;
            }
            eleParent = eleParent.offsetParent;
        }
        return {left: left, top: top};
    }
```

```javascript
//=>offset：获取当前元素距离BODY的偏移(左偏移和上偏移)
 let offset = function (curEle) {
        //1.先获取当前元素本身的左/上偏移
        let curLeft = curEle.offsetLeft,
            curTop = curEle.offsetTop,
            p = curEle.offsetParent;

        //2.累加父参照物的边框和偏移(一直向上找,找到BODY为止,每当找到一个父参照物都把它的边框和偏移累加起来,根据元素不一样,具体找几次也不知道)
        //TAG-NAME获取当前元素的标签名(大写的)
        while (p.tagName !== 'BODY') {//=>当找到的父参照物是BODY结束查找和累加操作
            //3.把找到的父参照物的边框和偏移值累加起来
            curLeft += p.clientLeft;
            curLeft += p.offsetLeft;
            curTop += p.clientTop;
            curTop += p.offsetTop;
            p = p.offsetParent;//=>基于当前找到的父参照物继续向上查找
        }
         return {
            top: curTop,
            left: curLeft
        };
    };

```

### 2.6 【winHandle】

> 操作浏览器盒子模型属性的

```javascript
let winHandle = function (attr, val) { //一个参数的时候是读取，两个参数可以赋值
        if (val !== undefined) {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }
```

```javascript
let winHandle = function (attr, value) {
        if (typeof value !== 'undefined') {
            //=>设置盒子模型属性值:SCROLL-TOP/LEFT
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    };
```



## 3. DOM操作相关

```javascript
let flag = "getComputedStyle" in window; //true说明是标准浏览器
```



### 3.1  getElementsByClassName()全兼容

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

```javascript
var getElementsByClassName= function(strClass,context){
	context = context||document;
	if(flag){
		return Array.prototype.slice.call(context.getElementsByClassName(strClass));
	}else{//IE
	//将strClass转为数组存储 strClass ="  class1    class2     "
	let strClassArr =strClass.replace(/(^ +)| +$/g,"").split(/ +/g);
	//  /(^ +)| +$/g去掉首尾任意多个空格
	//  / +/g  以人一多个空格切割
	let arr =[];
	//获取context容器下的所有元素节点
	let nodeList  = context.getElementsByTagName("*");
	//遍历每一个节点元素--判断每一个节点元素的className属性值是否都 存在于strClassArr中
	for(let i=0;i<nodeList.length;i++){
		let curNode =nodeList[i];
		let isOk=true;//假设存在的标记
		//遍历strClassArr数组，如果当前curNode.className字符串全都包含strClassArr数组中的每一项
		for(let k=0;k<strClassArr.length;k++){
			let reg = new RegExp("(^| +)"+strClassArr[k]+"( +|$)");
			if(!reg.test(curNode.className)){
				isOk=false;
				break;
			}
		}
		if(isOk){
			arr.push(curNode);
		}		
	}
	return arr;	
}

```



### 3.2 children-兼容IE下的children方法

```javascript
var children = function(curEle, tagName) {
	var result = [],
		nodeList = curEle.childNodes;
	if(/MSIE(6|7|8)/i.test(navigator.userAgent)) { //IE
		for(let i = 0; i < nodeList.length; i++) {
			//获取到每一个节点，进行判断
			let item = nodeList[i];
			if(item.nodeType === 1) { //说明是元素节点
				//元素节点放入数组中
				result[result.length] = item;
			}
		}
	} else { //非IE
		result = Array.prototype.slice.call(curEle.children);
	}
	//二次过滤
	//判断是否是tagName标签
	if(typeof tagName === "string") {
		for(let k = 0; k < result.length; k++) {
			//标签名存在并且==result[i]的标签名	
			let curElement = result[k];
			if(curElement.tagName.toLowerCase() !== tagName.toLowerCase()) {
				result.splice(k, 1);
				k--;
			}
		}
	}
	return result;
};
```

### 3.3 prev

```javascript
var prev = function(curEle) {
	//测试发现google浏览器都不支持previousElementSibling
	if(flag) {
		return curEle.previousElementSibling;
	} 
	//IE	
	let curElePar = curEle.parentNode;
	//判断curElePar的previousSibling
	while(curElePar.previousSibling && curElePar === 1) {
		curElePar = curElePar.previousSibling;
	}
	return curElePar;		
};
```

### 3.4 next

```javascript
var next = function(curEle){
		if(flag){
			return curEle.nextElementSibling;
		}
		let nex = curEle.nextSibling;
		while(nex&&nex.nodeType!==1){//不为文本节点即可，没有则为null
			nex = nex.nextSibling;
		}
		return nex;
	}
```

### 3.5 prevAll

```javascript
var prevAll =function(curEle){
		let arr = [];
		let pre =this.prev(curEle);//获取上一个哥哥
		while(pre){
			arr.unshift(pre);
			pre = this.prev(pre);			
		}
		return arr;		
	}
```



### 3.6 nextAll

```javascript
var nextAll=function(curEle){
		let arr=[];
		let nex = this.next(curEle);
		while(nex){
			arr.push(nex);
			nex = this.next(nex);
		}
		return arr;
	}
```



### 3.7 sibling

> 获取相邻两个元素的节点sibling

```javascript
var sibling =function(curEle){
		let pre = this.prev(curEle);
		let nex = this.next(curEle);
		let arr=[];
		pre?arr.push(pre):arr.push(null);
		nex?arr.push(nex):arr.push(null);
		
		return arr;
	}
```

### 3.8 siblings

> 获取所有的兄弟元素节点siblings

```javas
var siblings =function(curEle){
	return this.prevAll(curEle).concat(this.nextAll(curEle));
}
```

### 3.9 index

> 获取当前元素的索引index

```javascript
var index = function(curEle){
	//索引取决于有几个哥哥元素
	return this.prevAll(curEle).length;
}
```





### 3.10  firstChild

> 获取第一个元素子节点firstChild

```javascript
var firstChild=function(curEle){
	//获取当前元素的所有子节点
	let chs = this.children(curEle); 
	//取出第一个
	return chs.length>0?chs[0]:null;		
}
```

### 3.11  lastChild

> 获取最后一个元素子节点lastChild

```javascript
var lastChild = function(curEle){
	var chs= this.children(curEle);
	return chs.length>0?chs[chs.length-1]:null;
}
```





### 3.12 append

> 增加元素
>
> 向指定的容器末尾追加元素append

```javascript
var append =function(newEle,container){
	//向container容器末尾追加newEle元素
	container.appendChild(newEle);
}
```

### 3.13 prepend

> 向指定的容器开头添加元素

```javascript
var prepend =function(newEle,container){
	//向container容器开头追加newEle元素
	//把新的元素添加到容器中第一个元素的前面
	let fir = this.children(container)[0];
	if(fir){//元素存在
		container.insertBefore(newEle,fir);
		return;
	}else{//元素不存在null,也就是容器内 没有子元素
		container.appendChild(newEle);
	}
}
```







### 3.14  `insertAfter`

> 向容器中指定元素的末尾追加insertAfter

```javascript
function insertAfter(newEle, originEle) {
    //=>newEle:新插入的元素
    //=>originEle:指定的老元素
    //=>插入到原有元素的后面，其实就是插入到原有元素弟弟的前面
    let next = originEle.nextElementSibling,
        par = originEle.parentNode;
    if (next) {
        //=>有弟弟插入到弟弟的前面
        par.insertBefore(newEle, next);
    } else {
        //=>没有弟弟插入到容器的末尾
        par.appendChild(newEle);
    }
}
```

```javascript
var insterAfter = function(newEle,targetEle){
	//向targetEle后边追加newEle
	//x相当于追加到targetEle元素的弟弟元素的前边
	let nex =this.next(targetEle);
	if(nex){//如果有，则添加到nex的前边即可
		nex.parentNode.insertBefore(newEle,nex);
		return;	
	}else{//没有，说明是最后一个
		targetEle.parentNode.appendChild(newEle);
	}
}
```



### 3.15 insterBefore

> 向容器中指定的元素前面追加insterBefore 

```javascript
var insterBefore = function(newEle,targetEle){
	//向targetEle前边追加newEle
	targetEle.parentNode.insertBefore(newEle,targetEle);	
}
```

### 3.16 hasClass

> 判断是否有指定样式

```javascript
var hasClass =function(curEle,className){
	//获取当前元素的class样式类名字符串
	//let curClassNameStr = curEle.className;
	//console.log(curClassNameStr);//'    b1 b2 '
	/*if(curClassNameStr.indexOf(className)>-1){
		return true;
	}
	return false;
	*/ 
	//  '    b1 b2 '
	//  "(^| +)"+className+"( +&)"
	let reg =new RegExp("(^| +)"+className+"( +|&)");
	//去除curEle.className两端的所有空格
	//let str= curEle.className.replace(/( +)| +$/g,'');
	//let str = curEle.className.replace(/( +)| +$/,"");
	//console.log(str);//"b1     b2"
	return reg.test(curEle.className);
}
```



### 3.17 addClass

```javascript
var addClass = function(curEle,className){
		//为了防止传递进来的className包含多个样式类名（“ bg1 bg2 ”），需要对其进行拆分处理
		let arr = className.split(/ +/g);
		//console.log(arr);
		for (let i=0;i<arr.length;i++) {
			var curName = arr[i];
			if(!hasClass(curEle,curName)){
				curEle.className+=(" "+curName);
			}
		}	
	}
```

### 3.18 removeClass

```javascript
var removeClass = function(curEle,className){
		let ary = className.split(/ +/g);
		for(var i=0,len =ary.length ;i<len;i++){
			var  curName=ary[i];
			if(hasClass(curEle,curName)){
				//去掉指定的样式类名，包括左右两端的空格
				var reg = new RegExp("(^| +)"+ curName +"( +|$)","g");
				curEle.className = curEle.className.replace(reg, " ");
				//console.log(curEle.className);
				//alert('xxx'); 
			}	
		}
	}
```







## 4. animate

```javascript
/*==ANIMATE动画库==*/
~function () {
    //=>准备操作CSS样式的方法 GET-CSS/SET-CSS/SET-GROUP-CSS/CSS
    let utils = (function () {
        //=>获取样式
        let getCss = (ele, attr) => {
            let val = null,
                reg = /^-?\d+(\.\d+)?(px|rem|em)?$/;
            if ('getComputedStyle' in window) {
                val = window.getComputedStyle(ele)[attr];
                if (reg.test(val)) {
                    val = parseFloat(val);
                }
            }
            return val;
        };

        //=>设置样式
        let setCss = (ele, attr, value) => {
            if (!isNaN(value)) {
                if (!/^(opacity|zIndex)$/.test(attr)) {
                    value += 'px';
                }
            }
            ele['style'][attr] = value;
        };

        //=>批量设置样式
        let setGroupCss = (ele, options) => {
            for (let attr in options) {
                if (options.hasOwnProperty(attr)) {
                    setCss(ele, attr, options[attr]);
                }
            }
        };

        //=>合并为一个
        let css = (...arg) => {
            let len = arg.length,
                fn = getCss;
            if (len >= 3) {
                fn = setCss;
            }
            if (len === 2 && typeof arg[1] === 'object') {
                fn = setGroupCss;
            }
            return fn(...arg);
        };

        return {css}
    })();

    //=>EFFECT：准备运动的公式
    let effect = {
        Linear: (t, b, c, d) => t / d * c + b
    };

    //=>封装动画库
    window.animate = function (ele, target = {}, duration = 1000, callback = new Function()) {
        //=>不传递CALL-BACK，让其默认为一个空函数（回调函数：当动画结束后做什么事，都放到回调函数完成即可）
        if (typeof duration === 'function') {
            //=>我们有四个形参，但是传递的时候只传递三个，最后一个回调函数传递给duration这个参数了，我们需要改一下参数的值
            callback = duration;
            duration = 1000;
        }

        //1.基于TARGET计算出BEGIN/CHANGE
        let begin = {},
            change = {},
            time = 0;
        for (let attr in target) {
            if (target.hasOwnProperty(attr)) {
                begin[attr] = utils.css(ele, attr);
                change[attr] = target[attr] - begin[attr];
            }
        }

        //2.实现动画
        clearInterval(ele.animteTimer);//=>在给当前元素设置新的动画之前,先清空原有正在运行的动画(防止多动画共存,把动画的返回值赋值给当前元素的自定义属性，这样只要元素不变，我们不管啥时候在哪执行都可以清除元素的动画)
        ele.animteTimer = setInterval(() => {
            time += 17;
            //=>边界判断
            if (time >= duration) {
                utils.css(ele, target);
                clearInterval(ele.animteTimer);

                callback.call(ele);//=>动画完成后执行CALL-BACK(并且让回调函数中的THIS是当前操作的元素本身)
                return;
            }
            //=>依托TARGET计算出每个方向的当前位置
            let cur = {};
            for (let attr in target) {
                if (target.hasOwnProperty(attr)) {
                    cur[attr] = effect.Linear(time, begin[attr], change[attr], duration);
                }
            }
            utils.css(ele, cur);
        }, 17);
    };
}();
```

