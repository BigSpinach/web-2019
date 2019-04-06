[TOC]



---



# Event

## 1. 什么是事件

> 事件就是一件事情或者一个行为（对于元素来说，它的很多事件都是天生自带的），只要我们去操作这个元素，就会触发这些行为
>
> 事件就是元素天生自带的行为，我们操作元素，就会触发相关的事件行为



## 2. 事件绑定

> ```javascript
> //DOM 0级事件
> oBox.onClick = function(){...}
> //当点击oBox元素，就触发它的点击事件，对应的方法就会执行
> ```
>
> **事件绑定是异步操作**
>
> ```javascript
> //DOM 2级事件
> //标准浏览器
> oBox.addEventLinster('click',function(){...});
> 
> //IE6~8
> oBox.attachEvent('onclick',function(){});
> ```

DOM0事件绑定：只允许给当前元素的某个事件行为绑定一个方法，多次绑定，后面绑定的内容会替换前面绑定的，以最后一次绑定的方法为主

DOM0 事件绑定的原理**

> 就是给元素的某一个事件私有属性赋值（浏览器会建立监听机制，当我们 触发元素的某个行为，浏览器会自己把属性中赋的值去执行）



**DOM2 事件绑定的原理**

```javascript
//高版本
box.addEventListener('click',function(){},false)  
//removeEventListener是移除（使用的方法都是EventTarget.prototype定义的）

//在IE低版本中使用的是attachEvent来处理的：box.attachEvent('onclick',function(){})  
//移除使用的是dettachEvent

```

DOM2事件绑定可以给当前元素的某一个事件行为绑定“多个不同的方法”



## 3. 元素天生自带的事件

> 鼠标事件`MouseEvent`
>
> ```javascript
> // *  [鼠标事件]
>  // *    click：点击 (PC端是点击，移动端的click代表单击[移动端使用click会有300MS延迟的问题])
>  // *    dblclick：双击
>  // *    mouseover：鼠标经过
>  // *    mouseout：鼠标移出
>  // *    mouseenter：鼠标进入
>  // *    mouseleave：鼠标离开
>  // *    mousemove：鼠标移动
>  // *    mousedown：鼠标按下（鼠标左右键都起作用，它是按下即触发，click是按下抬起才会触发，而且是先把down和up触发，才会触发click）
>  // *    mouseup：鼠标抬起
>  // *    mousewheel：鼠标滚轮滚动
>  // *    ...
> ```
>
> 

> 键盘事件`KeyboardEvent`
>
> ```javascript
> 	// *  [键盘事件]
> 	 // *    keydown：键盘按下
> 	 // *    keyup：键盘抬起
> 	 // *    keypress：和keydown类似，只不过keydown返回的是键盘码，keypress返回的是ASCII码值
> 	 // *    input：由于PC端有实体物理键盘，可以监听到键盘的按下和抬起，但是移动端是虚拟的键盘，所以keydown和keyup在大部分手机上都没有，我们使用input事件统一代替他们（内容改变事件）
> 	 // *    ...
> 	 // *
> 	 // *  [表单元素常用的事件]
> 	 // *    focus：获取焦点
> 	 // *    blur：失去焦点
> 	 // *    change：内容改变
> 	 // *    ...
> ```
>
> 

> 表单元素常用的事件

> 其它常用事件
>
> ```javascript
> //[其它常用事件]
> 	 // *    load：加载完成
> 	 // *    unload
> 	 // *    beforeunload
> 	 // *    scroll：滚动条滚动事件
> 	 // *    resize：大小改变事件  window.onresize=function(){} 当浏览器窗口大小发生改变，会触发这个事件，执行对应的事情
> 	 // *    ...
> ```

> 移动端手指事件
>
> ```javascript
> 	// *  [移动端手指事件]
> 	 // *    [touch：单手指操作]
> 	 // *      touchstart：手指按下
> 	 // *      touchmove：手指移动
> 	 // *      touchend：手指离开
> 	 // *      touchcancel：因为意外情况导致手指操作取消
> 	 // *
> 	 // *    [gesture：多手指操作]
> 	 // *      gesturestart：手指按下
> 	 // *      gesturechange：手指改变
> 	 // *      gestureend：手指离开
> 	 // *    ...
> 
> ```

> H5中的AUDIO/VIDEO音视频事件
>
> ```javascript
> // *  [H5中的AUDIO/VIDEO音视频事件]
> 	 // *    canplay：可以播放（播放过程中可能出现由于资源没有加载完成，导致的卡顿）
> 	 // *    canplaythrough：资源加载完成，可以正常无障碍播放
> 	 // *    ...
> ```
>
> 

## 4. 事件对象

> 给当前元素的某个事件绑定方法（不管是基于DOM0还是DOM2），都是为了触发元素的相关行为的时候，能做点事情（也就是把绑定的方法执行）；“不仅把方法执行了，而且浏览器还给方法传递了一个实参信息值 ==>这个值就是事件对象”
>
> ```javascript
> box.onclick = function (ev) {cosnole.log(ev)};
> ```

> 事件对象：MouseEvent鼠标事件对象、KeyboardEvent键盘事件对象、Event普通事件对象...

```javascript
box.onclick = function (ev) {cosnole.log(ev)};
/*
MouseEvent
	altKey: false
	bubbles: true
	button: 0
	buttons: 0
	cancelBubble: false
	cancelable: true
	clientX: 688
	clientY: 553
	composed: true
	ctrlKey: false
	currentTarget: null
	defaultPrevented: false
	detail: 1
	eventPhase: 0
	fromElement: null
	isTrusted: true
	layerX: 634
	layerY: 224
	metaKey: false
	movementX: 0
	movementY: 0
	offsetX: 634
	offsetY: 224
	pageX: 688
	pageY: 553
	path: (18) [div, ...,div#app, body, html, document, Window]
	relatedTarget: null
	returnValue: true
	screenX: 688
	screenY: 696
	shiftKey: false
	sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
	srcElement: div
	target: div
	timeStamp: 681716.1500000001
	toElement: div
	type: "click"
	view: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
	which: 1
	x: 688
	y: 553
	__proto__: MouseEvent
*/
```

### 4.1 事件常用属性

[MouseEvent]

```javascript
[MouseEvent]
ev.target：事件源（操作的是哪个元素）
ev.clientX / ev.clientY ：当前鼠标触发点距离当前窗口左上角的X/Y轴坐标
ev.pageX / ev.pageY：当前鼠标触发点距离BODY(第一屏幕)左上角的X/Y轴坐标
ev.preventDefault()：阻止默认行为
ev.stopPropagation()：阻止事件的冒泡传播
ev.type：当前事件类型
```

[KeyboardEvent]

```javascript
ev.code：当前按键'keyE'
ev.key：当前按键'e'
ev.which / ev.keyCode：当前按键的键盘码 69
let code = ev.which || ev.keyCode;

inputTest.onkeydown = function (ev) {
	console.log(ev.which);
};
```

### 4.2 事件对象的兼容

在IE低版本浏览器中，浏览器执行绑定的方法，并没有把事件对象传递进来，此时ev===undefined，需要基于window.event来获取（由于是全局属性，鼠标每次操作都会把上一次操作的值替换掉）

#### 4.2.1 事件对象的获取

```javascript
//低版本中没有的属性，我们手动设置一下：按照自己有的先获取到值，然后赋值给和标准对应的新属性（经过判断处理后，低版本中也有TARGET/PAGE-X/PAGE-Y这些属性了），后期再使用的时候，直接按照高版本的使用即可

//高版本
ev
//IE低版本
ev = window.event;

//兼容处理
ev=ev|| window.event;
```

#### 4.2.2 preventDefault的兼容

```javascript
//低版本中阻止默认行为 
ev.preventDefault = function () {
    ev.returnValue = false;//=>低版本阻止默认行为
};
//兼容处理
ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;

```

#### 4.2.3 `stopPropagation`的兼容

```javascript
//低版本中阻止冒泡
ev.stopPropagation = function () {
   ev.cancelBubble = true;//=>低版本阻止冒泡传播
};

//兼容处理
ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;

```

### 4.3  事件的默认行为

> 事件的默认行为：事件本身就是天生就有的，某些事件触发，即使你没有绑定方法，也会存在一些效果，这些默认的效果就是“事件的默认行为”

常见的处理默认行为的方式方法

1. `a`标签的点击操作就存在默认行为

   ```reStructuredText
   1.页面跳转
   2.锚点定位(HASH定位[哈希定位])
   
   <a href='https://github.com/bigspinach' target="_blank">
    BigSpinach
    </a>
    //target='_blank'：让其在新窗口打开
   
    <a href="#box">BigSpinach</a> 
    //首先会在当前页面URL地址栏末尾设置一个HASH值，浏览器检测到HASH值后，会默认定位到当前页面中ID和HASH相同的盒子的位置（基于HASH值我们还可以实现SPA单页面应用）
   
   
   ```

   [在HTML结构中阻止]

   ```html
   <a href="javascript:;"></a>
   ```

   

2. `input`标签也有自己的默认行为

   ```reStructuredText
   1.输入内容可以呈现到文本框中
   2.输入内容的时候会把之前输入的一些信息呈现出来（并不是所有浏览器和所有情况下都有）
   3. ...
   ```

   

3. `submit`按钮也存在默认行为

```reStructuredText
  1.点击按钮页面会刷新
       <form action="https://github.com/bigspinach">
            <input type="submit" value="提交">
        </form>
   在FORM中设置ACTION，点击SUBMIT，会默认按照ACTION指定的地址进行页面跳转，并且把表单中的信息传递过去（非前后端分离项目中，由服务器进行页面渲染，由其它语言实现数据交互，一般都是这样处理）
```

### 4.4 阻止默认行为

#### 4.4.1 阻止`a`标签的默认行为

[在HTML结构中阻止]

```html
<a href="javascript:;" id='target'></a>
```

[在点击事件中阻止]

```javascript
target.onclick = function(ev){
    ev=ev||window.event;
    return false;
}
```

#### 4.4.2 其他事件的默认行为的阻止

```javascript
ev=ev||window.event;
ev.preventDefault?ev.preventDefault（）： ev.returnValue = false;
```

### 4.5 事件的传播机制

#### 4.5.1  冒泡传播

**冒泡传播**：触发当前元素的某一个事件（点击事件）行为，不仅当前元素事件行为触发，而且其祖先元素的相关事件行为也会依次被触发，这种机制就是“事件的冒泡传播机制”

```javascript
/*
 * xxx.onxxx=function(){}  DOM0事件绑定，给元素的事件行为绑定方法，这些方法都是在当前元素事件行为的冒泡阶段(或者目标阶段)执行的
 *
 * xxx.addEventListener('xxx',function(){},false)  第三个参数FALSE也是控制绑定的方法在事件传播的冒泡阶段(或者目标阶段)执行；只有第三个参数为TRUE才代表让当前方法在事件传播的捕获阶段触发执行（这种捕获阶段执行没啥实际意义，项目中不用）；
 */
```

```javascript
/*
 * 不同浏览器对于最外层祖先元素的定义是不一样的
 *    谷歌：window->document->html->body...
 *    IE高：window->html->body...
 *    IE低：html->body...
 */
```

#### 4.5.2 事件委托（事件代理）

利用事件的冒泡传播机制，如果一个容器的后代元素中，很多元素的点击行为（其它事件行为也是）都要做一些处理，此时我们不需要在像以前一样一个个获取一个个的绑定了，我们只需要给容器的CLICK绑定方法即可，这样不管点击的是哪一个后代元素，都会根据冒泡传播的传递机制，把容器的CLICK行为触发，把对应的方法执行，根据事件源，我们可以知道点击的是谁，从而做不同的事情即可





### 5. 事件池

【DOM2】事件是基于`addEventListener` 完成事件绑定的，是基于**事件池**完成的

事件池的机制：

1. 绑定机制

   a.绑定的事件是有序的

   b.绑定是事件是不允许重复的

   

2. 执行机制

   当事件行为触发，浏览器会自动到事件池中，**按照顺序**，依次把之前监听到的方法执行

   ​	每一个被执行的方法，浏览器会把事件对象传递给它

   ​	方法中的`this` 是当前操作的元素

   ​	执行的方法是不会有重复的（事件池的绑定机制）





## 其他

 ### 1. mouseeneter 和 mouseover 的区别?

```javascript
inner.onmouseenter = function () {
    console.log('inner enter');
};
outer.onmouseenter = function () {
    console.log('outer enter');
};
inner.onmouseleave = function () {
    console.log('inner leave');
};
outer.onmouseleave = function () {
    console.log('outer leave');
};
/*
 * mouseeneter 和 mouseover 的区别?
 *   1.over属于滑过(覆盖)事件，从父元素进入到子元素，属于离开了父元素，会触发父元素的out，触发子元素的over
 *     enter属于进入，从父元素进入子元素，并不算离开父元素，不会触发父元素的leave，触发子元素的enter
 *
 *   2.enter和leave阻止了事件的冒泡传播，而over和out还存在冒泡传播的
 *
 * 所以对于父元素嵌套子元素这种情况，使用OVER会发生很多不愿意操作的事情，此时我们使用ENTER会更加简单，操作方便，所以真实项目中ENTER的使用会比OVER多
 */
```

