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

## 3. DOM操作相关

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

### 3.2 `insertAfter`

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

