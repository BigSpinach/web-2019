~(function() {
	let offset = function(curEle) {
		//1.先获取当前元素本身的左/上偏移
		let curLeft = curEle.offsetLeft,
			curTop = curEle.offsetTop,
			p = curEle.offsetParent;

		//2.累加父参照物的边框和偏移(一直向上找,找到BODY为止,每当找到一个父参照物都把它的边框和偏移累加起来,根据元素不一样,具体找几次也不知道)
		//TAG-NAME获取当前元素的标签名(大写的)
		while (p.tagName !== 'BODY') { //=>当找到的父参照物是BODY结束查找和累加操作
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

	//懒加载的原理
	//通过自定义属性存储真实的src的地址，通过异步操作，当自定义属性的值加载成功后，赋值给真是的src，从而实现加载图片的效果

	//获取要操作的容器元素
	let container = document.getElementsByClassName('container');

	//初始化要绑定的数据，这个数据以后是从服务器端获取的
	let imgList = null;

	//动态绑定数据
	~ function() {
		//模拟数据
		let str = ``;

		for (let i = 0; i < 100; i++) {
			let ran = Math.floor(Math.random() * 8 + 1);
			ran>10?ran:ran='0'+ran;
			
			str += `<div class="imgBox">
			<img src="" alt="" data-src="img/${ran}.jpeg">
		</div>`;
		}
		container[0].innerHTML = str;
		imgList = container[0].querySelectorAll('.container img');
	}();


	//实现懒加载操作的方法
	let lazyImg = curImg => {
		//curImg -> 当前要操作的哪一张图片
		//创建一个img标签用于存储页面加载的data-src属性的值，
		//给新创建的img 标签绑定load事件，
		//onload 加载成功事件，img.onload说明img加载成功
		let trueImg = curImg.getAttribute('data-src');
		let tempImg = new Image();
		tempImg.onload = () => {				
					//console.log(trueImg);
					curImg.src = trueImg;
					//console.log(curImg.src);
					//mlgbz
					curImg.style.display ='block';
					curImg.isLoad = true;
					tempImg = null;
				}
				tempImg.src = trueImg;	
		
		//tempImg.src = trueImg; //在部分浏览器下，需要将赋值操作放在load事件之后才能生效
	}

	//计算何时才加载图片
	let computedLoadImg = () => {
		//何时加载？
		//当当前要显示的盒子的整体出现在浏览器屏幕中的时候才就显示
		//这不科学，如果有的人的屏幕很小呢？
		//所以 ，当存放图片的盒子 出现在浏览器窗口中的时候就开始加载图片
		
		//遍历要操作懒加载的元素图片
		imgList = Array.prototype.slice.call(imgList);
		imgList.forEach((item,index)=>{
			
			//A ： 盒子距离body的高度
			//B ： 浏览器窗口卷去的高度 + 浏览器窗口的高度
			//不是获取img的高度，没加载出来的img是没有高度的，所以要获取它父级元素盒子的高度
			let itemParent = item.parentNode;
			let A = offset(itemParent).top;
			
			let B = document.documentElement.scrollTop+document.documentElement.clientHeight;
			

			//console.log(A,B);
			if(A<B){
				if(item.isLoad){
					return;
				}
				lazyImg(item);
			}
				
		});
	}

	window.onload = window.onscroll = computedLoadImg;


})();