[TOC]

----



# 图片懒加载

> **前端性能优化的重要手段之一**，开始加载页面的时候，并没有加载真实的图片，当页面结构和数据都呈现完成后，在加载真实的图片

**实现原理**

1. 在结构上，我们把IMG图片放到一个DIV盒子中，开始的时候图片的SRC(SRC中有地址就按照地址加载图片)为空，我们把图片的地址存放到自定义属性DATA-SRC中（此位置不展示真实的图片），我们给图片所在的盒子设置一个默认的背景图片占位(要求这张图片越小越好 1KB)

2. 在JS中，当监听到页面中的结构和数据都加载完成后（或者设置一个间隔时间），开始把DATA-SRC自定义属性中存储的真实图片地址赋值给IMG的SRC属性（浏览器此时开始加载真实的图片 =>为了防止图片地址不存在导致的404错误，我们在赋值给图片的SRC属性时，往往都会验证一下图片是否存在）

## 1. 模型

 ### HTML 结构

```html
<div id="imgBox" class="imgBox">
	<!--
      	IMG是放到一个盒子中的
     	SRC是空
    	DATA-SRC存储真实图片的地址
   	-->
	<img src="" alt="" data-img="haha.jpg" />
</div>
```

### CSS 部分

```css
.imgBox{
	margin:20px auto;
	width:500px;
	height: 200px;
	/*设置一张默认背景图占位*/
	background: url("img/default.gif") no-repeat center center #1B6D85;				
}

.imgBox img {
    display: none;
    /*
   	 开始的时候由于图片没有加载，我们让其先隐藏，当真实图片加载完成的时候		我们在让其显示即可（某些浏览器在图片SRC为空或者加载的图片不存在的		 时候，不是不显示，而是显示一个×，不好看）
    */
     width: 100%;
     height: 100%;
 }

```

### JS

```javascript

var imgBox = document.getElementById('imgBox'),
	pageImg = imgBox.getElementsByTagName('img')[0];
setTimeout(function() {
	//=>加载真实图片
	var trueImg = pageImg.getAttribute('data-src');

	//=>创建一个临时的IMG来验证
	// var tempImg = document.createElement('img');
	var tempImg = new Image();
	tempImg.onload = function() {
		//=>图片加载成功触发这个事件
		pageImg.src = trueImg;
		pageImg.style.display = 'block';
		tempImg = null;
	};
	tempImg.src = trueImg; 
    //=>在部分IE浏览器中只有把SRC赋值放到ONLOAD下面才能起到作用

	//=>这样做不好：如果图片不存在，在部分浏览器中，页面中的IMG部分显示的是一个叉叉，不好看（我们最好在赋值给页面的SRC属性的时候，先验证一下图片是否存在，存在我们在赋值）
	// pageImg.src = trueImg;
	// pageImg.style.display = 'block';
}, 1000);
```



## 2. 模拟真实项目

### HTML

```html
<div class="container">
    //基于服务器，要实现延迟加载的图片不知道有多少个
    <!--<div class="imgBox">
        <img src="" alt="" data-src="">
    </div>-->
</div>
```

### CSS

```css
.container {
    margin: 20px auto;
    width: 1000px;
}

.container .imgBox {
     margin-bottom: 20px;
     height: 300px;
     background: url("img/default.gif") no-repeat center center #EEE;
}

.container .imgBox img {
      display: none;
      width: 100%;
      height: 100%;
 }
```



### JS实现

```javascript
~(function() {						
	//=>offset：获取当前元素距离BODY的偏移(左偏移和上偏移)
	let offset = function(curEle) {
		//1.先获取当前元素本身的左/上偏移
		let curLeft = curEle.offsetLeft,
			curTop = curEle.offsetTop,
			p = curEle.offsetParent;

		//2.累加父参照物的边框和偏移(一直向上找,找到BODY为止,每当找到一个父参照物都把它的边框和偏移累加起来,根据元素不一样,具体找几次也不知道)
		//TAG-NAME获取当前元素的标签名(大写的)
		while(p.tagName !== 'BODY') { //=>当找到的父参照物是BODY结束查找和累加操作
			//3.把找到的父参照物的边框和偏移值累加起来
			curLeft += p.clientLeft;
			curLeft += p.offsetLeft;
			curTop += p.clientTop;
			curTop += p.offsetTop;
			p = p.offsetParent; //=>基于当前找到的父参照物继续向上查找
		}
			return {
					top: curTop,
					left: curLeft
				};
	};
			
	let containers = document.getElementsByClassName('container');
	let imgList = null;

	//绑定数据
	~(function() {
		let str = ``;
		for(let i = 0; i < 100; i++) {
			let len = Math.floor(Math.random() * 8 + 1);
				len>10?len :len='0'+len;
				str += ` <div class="imgBox">
						<img src="" data-					src="img/${len}.jpeg" alt="" />
						   </div>`;
		}

			//console.log(containers);
			//类数组转为数组
		containers = Array.prototype.slice.call(containers);
		containers.forEach(function(item, index) {
			//console.log(item,index);
			item.innerHTML = str;
		});

		imgList = document.querySelectorAll(".container img");
				
	})();

		//加载真实图片=>异步的操作
		let loadTrueImg = curImg => {
		//加载真实图片的过程
		//1. 新建一个img标签，使用load事件判断src是否加载成功
		let trueImg = curImg.getAttribute("data-src");
		//console.log(trueImg);
		let tempImg = new Image();
		tempImg.onload = () => {
			//console.log(trueImg);
			curImg.src = trueImg;
			//console.log(curImg.src);
			tempImg = null;
			//mlgbz
			curImg.style.display ='block';
			curImg.isLoad = true;
		}
			tempImg.src = trueImg;	
			console.log(curImg);
		}

		//根据实际情况执行懒加载
		//计算图片
		//console.log(imgList instanceof Object);
		let computedImg = () => {
			imgList = Array.prototype.slice.call(imgList, 0);

			imgList.forEach((item, index) => {
				//console.log(item,index);
				//item => 当前的图片	
				//计算 当前元素的盒子是否在当前窗口中完全展示
				//console.dir(item);
				let curImgParent = item.parentNode;
				//console.log(curImgParent);

				//A : 当前盒子的高度+ 它距离body的上偏移量
				//B ： 当前浏览器卷去的高度 + 当前浏览器窗口的高度
				//如果 A<B ,说明当前盒子完全展示在当前的浏览器窗口中
				//console.log(offset(curImgParent));
				let A = curImgParent.style.height + offset(curImgParent).top;
				let B = document.documentElement.scrollTop+document.documentElement.clientHeight;
				//console.log(A,B);
				if(A<B){
					if(item.isLoad){
						return;
					}
					loadTrueImg(item);
				}	
			});			
		};

		window.onload = window.onscroll = computedImg;		
})();
		
```



### jQuery的方式实现

```javascript
$(function () {
    let $container = $('.container'),
        $imgList = null;

    //1.先绑定数据
    ~function () {
        let str = ``;
        for (let i = 0; i < 100; i++) {
            let ran = Math.round(Math.random() * 3 + 1);
            str += `<div class="imgBox">
            <img src="" alt="" data-src="img/banner${ran}.jpg">
        </div>`;
        }
        $container.html(str);

        $imgList = $container.find('img');
    }();

    //2.加载真实的图片
    //=>lazyImg:单张图片延迟加载(传递给我谁,我就加载谁)
    let lazyImg = curImg => {
        let $curImg = $(curImg),
            trueImg = $curImg.attr('data-src');
        let tempImg = new Image();
        tempImg.onload = () => {
            // $curImg.attr('src', trueImg).css({
            //     display: 'block'
            // });
            $curImg.attr('src', trueImg)
                .stop().fadeIn(300);//=>结束当前正在运行的动画,执行FADE-IN,让图片300MS内渐现出来(JQ中提供的动画方法)
            tempImg = null;
            curImg.isLoad = true;//=>图片加载成功后，设置一个自定义属性存储当前图片已经加载了，后期不需要重复的加载
        };
        tempImg.src = trueImg;
    };

    //=>computedImg:计算哪张图片可以加载了
    let computedImg = () => {
        //=>观察所有图片中谁能加载了，就执行LAZY-IMG让其加载即可
        $imgList.each((index, curImg) => {
            //=>A:当前图片所在盒子的底边距离BODY偏移
            //=>B:当前浏览器底边距离BODY偏移
            let $curImg = $(curImg),
                $imgBox = $curImg.parent(),
                A = $imgBox.offset().top + $imgBox.outerHeight(),
                B = document.documentElement.scrollTop + document.documentElement.clientHeight;
            if (A <= B) {
                //=>代表图片所在盒子呈现在视野中，开始加载真实的图片
                if (curImg.isLoad) {
                    //=>当前图片如果已经加载过了，不在重复的加载
                    return;
                }
                lazyImg(curImg);
            }
        });
    };
    $(window).on('load scroll', computedImg);//=>LOAD和SCROLL的时候做相同的事情（JQ中的事件绑定特点）
});
```

