[TOC]

----



# HTML5

## 1. 新增加的语义化标签

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

```HTM
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
 =>让我们告别了FLASH时代
```

## 4. canvas

```html
<canvas>
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