[TOC]

----



# HTML5



## HTML 基础

### 标签和标签属性

### 元素和元素分类

#### 元素

#### 行内元素& 块级元素

【display:inline】

```
* span
* a
* b
* strong
* i
* em
* s
* br 
* u
* textarea
* input
* select
* label
* img
* sup
* sub
* big
* small
* ...
```

> 行内元素是指自身属性 为`diaplay:inline` 的元素
>
> 行内元素的特点
>
> + 不独占一行，和其他元素从左至右在一行显示
> + 排列方式 ：从左至右依次排列
> + 不能直接控制其宽高，以及盒子模型先关的css属性，可以设置内外边距的值
> + 内联元素的高度由自身的内容的大小决定
> + 只能容纳文本或者其他内联元素

【display:block】

```tex
* div
* h1-h6
* hr
* menu
* ol
* ul
* li
* dl
* dt
* dd 
* table
* p
* form
* ...
```

> `块级元素`
>
> 本身属性 `display:block`
>
> 特点
>
> + 独占一行
> + 排列方式： 从上到下依次排列
> + 可以直接控制其宽高以及css盒子模型相关的属性
> + 在不设置宽度的情况下，块级元素宽度是它父级元素内容的宽度，高度是它本身的内容的高度
> + 可以嵌套行内元素
> + ul/ol 下只能是 li，dl下只能是dt 、dd，p不能包p本身以及其他块级元素





#### 元素之间的相互转换

+ 块级 => 行内 ： `diaplay:inline`
+ 行内  =>  块级:  `diaplay:block`
+ 行内块  ：  `diaplay:inline-block`



## 1. 新增加的语义化标签

### 1.1 新增语义化标签

```html
<hedaer>		------头部
<footer>		------底部
<main>			------主体
<section>		------区域
<article>		------文章区域
<aside>		------与内容无关的部分
<nav>			------广告
<figure>		------配图区域
<figcaption>	-----配图说明
    
<mark> 标记
<time>  时间
<progress> 进度条
...
```



### 1.2 标签语义化的好处

![1556508936509](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556508936509.png)





### 1.3 标签语义化的法则

![1556508968457](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556508968457.png)



### 1.4 标签语义化的含义

![1556508989208](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556508989208.png)



## 2. 关于表单元素的新改革

【传统表单】

```html
    input:text/password/radio/checkbox/file/hidden/button/submit/reset...
select
textarea 文本域
button
form
label
...
```

 [新增一些表单元素或者是表单类型]

```html
input:search/email/tel/number/range/color/date/time/url...

<input type="number" name="" step="1" min="10" max="25" disabled value="15">

<input type="range" name="">
```

[demo-age]

```html
年龄：
<input type="number" id="ageInp" step="1" max="65" min="18" value="25" disabled>
<input type="range" id="rangeInp" step="1" max="65" min="18" value="25">
<script>
    //=>INPUT：移动端没有KEY-DOWM/KEY-UP，用INPUT代替，代表正在操作当前表单元素（例如正在输入等）
    rangeInp.oninput = function () {
        let val = this.value;
        ageInp.value = val;
    };
</script>
```

[demo-color]

```html
<input type="color" id="colorInp">
<script>
    colorInp.onchange = function () {
        console.log(this.value);//=>16进制的颜色值
    };
</script>
```

[demo-data]

```html
表单元素中新增加的类型作用
   1.功能强大了(很多东西不需要自己导入JS插件完成了，例如：日历)
   2.在移动端根据设置的类型不一样，用户输入过程中调取出来的虚拟键盘也不一样（例如：number类型的文本框调取出来的是数字键盘）
   3.新增加的类型提供了CSS/JS验证，可以验证用户输入的内容是否符合格式（之前我们都是用正则自己解决，现在H5中的新类型自带验证机制）

   H5中给表单元素设置了一个新的属性：placeholder 用来做文本框的默认提示的  （自己扩展：使用JS实现一套和PLACE-HOLDER一模一样的效果）

<style>
    #userEmail {
        border: 1px solid #DDD;
        outline: none; /*当文本框获取焦点后取出浏览器默认的边框选中颜色*/
    }

    #userEmail:valid {
        /*通过验证:不输入或者输入的格式正确*/
        border-color: green;
    }

    #userEmail:invalid {
        /*没通过验证*/
        border-color: red;
    }

    #userEmail:valid + span:after {
        content: '邮箱格式正确';
    }

    #userEmail:invalid + span:after {
        content: '邮箱不符合格式';
    }
</style>
<p>email-H5+CSS实现基础验证效果</p>
	<input type="email" name="邮箱" id="emailInput1"><span></span>
```

[H5 提供的保单内容验证方法]

**checkValidity**

```html
<p>email- H5新增的表单验证方法</p>
	<input type="email" name="邮箱" id="emailInput2"><span></span>
	<script>
		let spanText = emailInput2.nextSibling;
		console.log(spanText);
		emailInput2.onkeyup  = function () {			
			//=>checkValidity:H5新提供的表单内容格式验证方法（新表单类型中有内置验证机制的，都可以基于这个方法验证）
			if(this.checkValidity){
				spanText.innerHTML = 'OK';
			}else {
				spanText.innerHTML = 'NO';
			}

		}
	</script>
```

[使用js完善邮箱验证]

```html
<p>email- 使用JS完善邮箱验证</p>
<input type="email" name="邮箱" id="emailInput3"><span></span>
<script>
	let spanText = emailInput3.nextSibling;
		emailInput3.onkeyup  = function () {			
	let val = this.value.trim();
	if(val.length===0){
			spanText.innerHTML='请输入邮箱地址';
			return;	
		}
		let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if(reg.test(val)){
			spanText.innerHTML='ok';
			return;	
		}else {
			spanText.innerHTML='NONONO';
			return;	
		}
	}
</script>
```

【datalis】

```html
	<p>下拉框</p>
	<select name="city" ><!-- multiple 属性 ：多行显示-->
		<option value="">==请选择==</option>
		<option value="">100</option>
		<option value="">200</option>
		<option value="">300</option>		
	</select>

<!-- 二级下拉框 (模糊匹配的效果)-->
	<p>datalist 二级下拉框 (模糊匹配的效果)</p>
	<input list="chooseID" >
	<datalist id="chooseID">
		<option value="大大的">大大的</option>
		<option value="小小的">小小的</option>
		<option value="好好的">好好的</option>
	</datalist>
```

## 3.音视频标签

```html
 <auido>
 <video>
让我们告别了FLASH时代
     
```

### 3.1 audio

```javascript
/*<audio id="myAudio"></audio>*/
console.dir(myAudio);
//
accessKey: ""
assignedSlot: null
attributeStyleMap: StylePropertyMap {size: 0}
attributes: NamedNodeMap {0: src, 1: loop, 2: preload, 3: id, src: src, loop: loop, preload: preload, id: id, length: 4}
autocapitalize: ""
autoplay: false
baseURI: "http://127.0.0.1:8080/%E4%B8%9A%E5%8A%A1%E6%8A%80%E5%B7%A7/H5%E5%B0%8F%E9%A1%B9%E7%9B%AE/%E4%BA%A4%E4%BA%92%E7%AE%80%E5%8E%86/index.html#phone"
buffered: TimeRanges {length: 1}
childElementCount: 0
childNodes: NodeList []
children: HTMLCollection []
classList: DOMTokenList [value: ""]
className: ""
clientHeight: 0
clientLeft: 0
clientTop: 0
clientWidth: 0
contentEditable: "inherit"
controls: false
controlsList: DOMTokenList [value: ""]
crossOrigin: null
currentSrc: "http://127.0.0.1:8080/%E4%B8%9A%E5%8A%A1%E6%8A%80%E5%B7%A7/H5%E5%B0%8F%E9%A1%B9%E7%9B%AE/%E4%BA%A4%E4%BA%92%E7%AE%80%E5%8E%86/audio/bell.mp3"
currentTime: 3.153479
dataset: DOMStringMap {}
defaultMuted: false
defaultPlaybackRate: 1
dir: ""
disableRemotePlayback: false
draggable: false
duration: 6.277375
ended: false
error: null
firstChild: null
firstElementChild: null
hidden: false
id: "answerBell"
innerHTML: ""
innerText: ""
inputMode: ""
isConnected: true
isContentEditable: false
lang: ""
lastChild: null
lastElementChild: null
localName: "audio"
loop: true
mediaKeys: null
muted: false
namespaceURI: "http://www.w3.org/1999/xhtml"
networkState: 1
nextElementSibling: audio#introduction
nextSibling: text
nodeName: "AUDIO"
nodeType: 1
nodeValue: null
nonce: ""
offsetHeight: 0
offsetLeft: 0
offsetParent: null
offsetTop: 0
offsetWidth: 0
onabort: null
onauxclick: null
onbeforecopy: null
onbeforecut: null
onbeforepaste: null
onblur: null
oncancel: null
oncanplay: null
oncanplaythrough: null
onchange: null
onclick: null
onclose: null
oncontextmenu: null
oncopy: null
oncuechange: null
oncut: null
ondblclick: null
ondrag: null
ondragend: null
ondragenter: null
ondragleave: null
ondragover: null
ondragstart: null
ondrop: null
ondurationchange: null
onemptied: null
onencrypted: null
onended: null
onerror: null
onfocus: null
onfullscreenchange: null
onfullscreenerror: null
ongotpointercapture: null
oninput: null
oninvalid: null
onkeydown: null
onkeypress: null
onkeyup: null
onload: null
onloadeddata: null
onloadedmetadata: null
onloadstart: null
onlostpointercapture: null
onmousedown: null
onmouseenter: null
onmouseleave: null
onmousemove: null
onmouseout: null
onmouseover: null
onmouseup: null
onmousewheel: null
onpaste: null
onpause: null
onplay: null
onplaying: null
onpointercancel: null
onpointerdown: null
onpointerenter: null
onpointerleave: null
onpointermove: null
onpointerout: null
onpointerover: null
onpointerup: null
onprogress: null
onratechange: null
onreset: null
onresize: null
onscroll: null
onsearch: null
onseeked: null
onseeking: null
onselect: null
onselectionchange: null
onselectstart: null
onstalled: null
onsubmit: null
onsuspend: null
ontimeupdate: null
ontoggle: null
ontouchcancel: null
ontouchend: null
ontouchmove: null
ontouchstart: null
onvolumechange: null
onwaiting: null
onwaitingforkey: null
onwebkitfullscreenchange: null
onwebkitfullscreenerror: null
onwheel: null
outerHTML: "<audio src="audio/bell.mp3" loop="" preload="none" id="answerBell"></audio>"
outerText: ""
ownerDocument: document
parentElement: section.phoneBox
parentNode: section.phoneBox
paused: false
playbackRate: 1
played: TimeRanges {length: 1}
prefix: null
preload: "none"
previousElementSibling: div.hangUpBox
previousSibling: text
readyState: 4
remote: RemotePlayback {state: "disconnected", onconnecting: null, onconnect: null, ondisconnect: null}
scrollHeight: 0
scrollLeft: 0
scrollTop: 0
scrollWidth: 0
seekable: TimeRanges {length: 1}
seeking: false
shadowRoot: null
sinkId: ""
slot: ""
spellcheck: true
src: "http://127.0.0.1:8080/.../audio/a.mp3"
srcObject: null
style: CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}
tabIndex: -1
tagName: "AUDIO"
textContent: ""
textTracks: TextTrackList {length: 0, onchange: null, onaddtrack: null, onremovetrack: null}
title: ""
translate: true
volume: 1
webkitAudioDecodedByteCount: 54753
webkitVideoDecodedByteCount: 0
__proto__: HTMLAudioElement
```



关于audio的一些常用属性

####3.1.1 属性

```tex
[属性]
 *    duration:播放的总时间(S)
 *    currentTime:当前已经播放的时间(S)
 *    ended:是否已经播放完成
 *    paused:当前是否为暂停状态
 *    volume:控制音量 (0~1)
```

#### 3.1.2 方法

```tex
pause() 暂停
play() 播放
```

#### 3.1.3 事件

```tex
 *	  canplay：可以正常播放（但是播放过程中可能出现卡顿）
 *    canplaythrough：资源加载完毕，可以顺畅的播放了
 *    ended：播放完成
 *    loadedmetadata：资源的基础信息已经加载完成
 *    loadeddata：整个资源都加载完成
 *    pause:触发了暂停
 *    play:触发了播放
 *    playing:正在播放中
```



## 4. canvas

```html
<canvas></canvas>
```

## 5.提供了一些新的API

> - 本地存储：localStorage/sessionStorge
> -  获取地理位置： navigator.geolocation.getCurrentPosition 调取手机内部的GPS定位系统获取当前手机所在地的经纬度以及精准度等
> -   ...
> -   还提供了一些API，让我们可以通过浏览器调取手机内部的软件或者硬件（但是性能都不咋高，而且兼容性不是特别好）

## 

## 6.websocket

> socket.io 客户端和服务器端新的传输方式（即时通讯IM系统基本上很多是基于它完成的）
>
> ...



## 

