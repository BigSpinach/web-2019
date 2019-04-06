/*单例模式*/
let utils = (function() {
	let flag = "getComputedStyle" in window; //true说明是标准浏览器

	/*兼容所有IE7,8*/
	let toArray = function toArray(similarArray) {
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
	};

	let toJSON = function toJSON(str) {
		return "JSON" in window ? JSON.parse(str) : eval('(' + str + ')');
	};

	/*兼容IE6/7/8*/
	let getCss = function getCss(curEle, attr) {
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
			val = attr === 'opacity' ? window.getComputedStyle(curEle, null)[attr] / 1 : window.getComputedStyle(curEle, null)[attr];
		}
		return reg.test(val) ? parseFloat(val) : val; //如果正则验证通过，说明返回值是带单位的，那么我们就要人为去掉这个单位。否则不变
	};

	/*兼容IE6/7/8*/
	let setCss = function setCss(ele, attr, value) {
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
	};
	let setGroupCss = function(ele, obj) { //批量设置样式属性
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
	};

	let css = function() {
		var len = arguments.length,
			type = Object.prototype.toString.call(arguments[1]),
			fn = getCss;
		len >= 3 ? fn = setCss : (len === 2 && type === '[object Object]' ? fn = setGroupCss : null);
		return fn.apply(this, arguments);
	};

	let offset = function(ele) {
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
		return {
			left: left,
			top: top
		};
	};

	let winHandle = function(attr, val) { //一个参数的时候是读取，两个参数可以赋值
		if (val !== undefined) {
			document.documentElement[attr] = val;
			document.body[attr] = val;
		}
		return document.documentElement[attr] || document.body[attr];
	};


	let queryElementsByClassName = function queryElementsByClassName() {
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

	let children = function(curEle, tagName) {
		var result = [],
			nodeList = curEle.childNodes;
		if (/MSIE(6|7|8)/i.test(navigator.userAgent)) { //IE
			for (let i = 0; i < nodeList.length; i++) {
				//获取到每一个节点，进行判断
				let item = nodeList[i];
				if (item.nodeType === 1) { //说明是元素节点
					//元素节点放入数组中
					result[result.length] = item;
				}
			}
		} else { //非IE
			result = Array.prototype.slice.call(curEle.children);
		}
		//二次过滤
		//判断是否是tagName标签
		if (typeof tagName === "string") {
			for (let k = 0; k < result.length; k++) {
				//标签名存在并且==result[i]的标签名	
				let curElement = result[k];
				if (curElement.tagName.toLowerCase() !== tagName.toLowerCase()) {
					result.splice(k, 1);
					k--;
				}
			}
		}
		return result;
	};
	let prev = function(curEle) {
		//测试发现google浏览器都不支持previousElementSibling
		if (flag) {
			return curEle.previousElementSibling;
		}
		//IE	
		let curElePar = curEle.parentNode;
		//判断curElePar的previousSibling
		while (curElePar.previousSibling && curElePar === 1) {
			curElePar = curElePar.previousSibling;
		}
		return curElePar;
	};
	let next = function(curEle) {
		if (flag) {
			return curEle.nextElementSibling;
		}
		let nex = curEle.nextSibling;
		while (nex && nex.nodeType !== 1) { //不为文本节点即可，没有则为null
			nex = nex.nextSibling;
		}
		return nex;
	};

	let prevAll = function(curEle) {
		let arr = [];
		let pre = this.prev(curEle); //获取上一个哥哥
		while (pre) {
			arr.unshift(pre);
			pre = this.prev(pre);
		}
		return arr;
	};
	let nextAll = function(curEle) {
		let arr = [];
		let nex = this.next(curEle);
		while (nex) {
			arr.push(nex);
			nex = this.next(nex);
		}
		return arr;
	};
	let sibling = function(curEle) {
		let pre = this.prev(curEle);
		let nex = this.next(curEle);
		let arr = [];
		pre ? arr.push(pre) : arr.push(null);
		nex ? arr.push(nex) : arr.push(null);

		return arr;
	};
	let siblings = function(curEle) {
		return this.prevAll(curEle).concat(this.nextAll(curEle));
	};
	let index = function(curEle) {
		//索引取决于有几个哥哥元素
		return this.prevAll(curEle).length;
	};
	let firstChild = function(curEle) {
		//获取当前元素的所有子节点
		let chs = this.children(curEle);
		//取出第一个
		return chs.length > 0 ? chs[0] : null;
	};
	let lastChild = function(curEle) {
		var chs = this.children(curEle);
		return chs.length > 0 ? chs[chs.length - 1] : null;
	};

	let append = function(newEle, container) {
		//向container容器末尾追加newEle元素
		container.appendChild(newEle);
	};
	let prepend = function(newEle, container) {
		//向container容器开头追加newEle元素
		//把新的元素添加到容器中第一个元素的前面
		let fir = this.children(container)[0];
		if (fir) { //元素存在
			container.insertBefore(newEle, fir);
			return;
		} else { //元素不存在null,也就是容器内 没有子元素
			container.appendChild(newEle);
		}
	};
	let insterAfter = function(newEle, targetEle) {
		//向targetEle后边追加newEle
		//x相当于追加到targetEle元素的弟弟元素的前边
		let nex = this.next(targetEle);
		if (nex) { //如果有，则添加到nex的前边即可
			nex.parentNode.insertBefore(newEle, nex);
			return;
		} else { //没有，说明是最后一个
			targetEle.parentNode.appendChild(newEle);
		}
	};
	let insterBefore = function(newEle, targetEle) {
		//向targetEle前边追加newEle
		targetEle.parentNode.insertBefore(newEle, targetEle);
	};
	let hasClass = function(curEle, className) {
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
		let reg = new RegExp("(^| +)" + className + "( +|&)");
		//去除curEle.className两端的所有空格
		//let str= curEle.className.replace(/( +)| +$/g,'');
		//let str = curEle.className.replace(/( +)| +$/,"");
		//console.log(str);//"b1     b2"
		return reg.test(curEle.className);
	};
	let addClass = function(curEle, className) {
		//为了防止传递进来的className包含多个样式类名（“ bg1 bg2 ”），需要对其进行拆分处理
		let arr = className.split(/ +/g);
		//console.log(arr);
		for (let i = 0; i < arr.length; i++) {
			var curName = arr[i];
			if (!hasClass(curEle, curName)) {
				curEle.className += (" " + curName);
			}
		}
	};
	let removeClass = function(curEle, className) {
		let ary = className.split(/ +/g);
		for (var i = 0, len = ary.length; i < len; i++) {
			var curName = ary[i];
			if (hasClass(curEle, curName)) {
				//去掉指定的样式类名，包括左右两端的空格
				var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
				curEle.className = curEle.className.replace(reg, " ");
				//console.log(curEle.className);
				//alert('xxx'); 
			}
		}
	};



	return {
		toArray,
		css,
		offset,
		winHandle,
		queryElementsByClassName,
		children,
		prev,
		next,
		prevAll,
		nextAll,
		sibling,
		siblings,
		index,
		firstChild,
		lastChild,
		append,
		prepend,
		insterAfter,
		insterBefore,
		hasClass,
		addClass,
		removeClass
	}
})();