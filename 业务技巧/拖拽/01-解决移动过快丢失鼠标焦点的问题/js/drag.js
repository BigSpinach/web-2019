$(function() {
	// console.dir($);
	//获取要操作的元素
	let $diaLogBox = $('.diaLogBox');
	let $diaLogMark = $('.diaLogMark');
	let $boxTitle = $diaLogBox.find('.title');
	let $closeBtn = $diaLogBox.find('.title i');

	//让弹出框（模态框）处于页面正中间的位置、
	let winW = document.documentElement.clientWidth;
	let winH = document.documentElement.clientHeight;
	let boxW = $diaLogBox[0].offsetWidth;
	let boxH = $diaLogBox[0].offsetHeight;
	//设置模态框的位置
	$diaLogBox.css({
		left: (winW - boxW) / 2,
		top: (winH - boxH) / 2
	});



	//当点击 x按钮时，实现关闭效果
	// $closeBtn.on('click',aaa);
	$closeBtn.on('click', function() {
		//=>FADE-OUT:JQ中提供的渐隐动画
		$diaLogBox.stop().fadeOut(200, () => {
			//=>动画完成
			$diaLogMark.css('display', 'none');
		});
	});


	//开始移动
	let dragStart = function dragStart(ev) {

		//鼠标按下的时候，需要计算出开始移动时鼠标移动的起始位置
		//和 盒子的偏移量
		this.startX = ev.clientX;
		this.startY = ev.clientY;
		//this.startL = parseFloat($boxTitle.css('left'));//0
		//this.startT = parseFloat($boxTitle.css('top'));//0
		//这里是 盒子的 偏移量，不是H3 的偏移量
		this.startL = parseFloat($diaLogBox.css('left'));
		this.startT = parseFloat($diaLogBox.css('top'));

		//$boxTitle.on('mousemove', dragMove);
		//绑定给 document
		//瞻前顾后，绑定方法，要注意移除的时候也要移除这个方法（具体的地址）
		//所以，绑定给自定义属性
		this.DRAG_MOVE = dragMove.bind(this);
        this.DRAG_END = dragEnd.bind(this);
        $(document).on('mousemove', this.DRAG_MOVE)
            .on('mouseup', this.DRAG_END);

          console.log($diaLogBox);//jQ对象
		/*
		this.DRAG_MOVE = dragMove.bind($diaLogBox);
		this.DRAG_END = dragEnd.bind($diaLogBox);
		//$(document).on('mousemove',this.DRAG_MOVE);
		 $(document).on('mousemove', this.DRAG_MOVE)
            .on('mouseup', this.DRAG_END);
         */
        //我们这里需要的是一个js对象，给原生js对象上绑定自定义属性

	};


	//移动中
	let dragMove = function dragMove(ev) {

		//根据鼠标的位置计算出盒子的位置
		//this=> H3 盒子
		let {
			startT,
			startL,
			startY,
			startX
		} = this;
		//console.dir(this);
		//盒子当前的left值和top值
		//鼠标当前的位置 - 鼠标之前的位置 + 盒子起始位置
		let curL = ev.clientX - startX + startL;
		let curT = ev.clientY - startY + startT;
		//console.log(curL,curT);

		//再设置 盒子的left 和 top 时 ，需要进行边界判断
		//let maxL = document.documentElement.clientWidth - $diaLogBox[0].offsetWidth;
		let maxL = winW - boxW;
		let maxT = winH - boxH;
		let minL = 0;
		let minT = 0;
		curL = curL > maxL ? maxL : (curL < minL ? minL : curL);
		curT = curT > maxT ? maxT : (curT < minT ? minT : curT);

		//设置 盒子的位置
		$diaLogBox.css({
			left: curL,
			top: curT
		});

	};

	//移动结束
	let dragEnd = function dragEnd(ev) {
		//console.log('dragEnd');
		//鼠标抬起，清除给盒子绑定的事件
		//$boxTitle.off('mousemove', dragMove);
		//$(document).off('mousemove', this.DRAG_END);
		$(document).off('mousemove', this.DRAG_MOVE)
            .off('mouseup', this.DRAG_END);
	};

	//鼠标按下
	$boxTitle.on('mousedown', dragStart);

	//鼠标移动
	//$boxTitle.on('mousemove',dragMove);
	//当鼠标按下的时候，就应该触发了 盒子的mousemove事件了

	//鼠标离开
	//$boxTitle.on('mouseup', this.DRAG_END);
});

/*
在非谷歌浏览器下 ，支持 将鼠标和元素绑定在一起的方法来实现解决鼠标焦点丢失的问题
	this.setCapture();
	this.removeCapture();
而谷歌提供了更优秀的解决方案
	就是将时间绑定给document  ，因为鼠标移动再快也不会脱离文档
		$(document).on('mousemove',dragMove);
		此时就会有新的问题
			dragMove方法中的this是 h3这个盒子元素
			而
			$(document).on('mousemove',dragMove)中的this是 $(document)
		如何解决呢？
			使用bind （为什么不使用call或者apply）
				因为bind是处理 this 而不执行方法，call和apply会将法法执行
				在这里我们需要执行对应的事件的时候才执行方法
				所以使用 bind
			$(document).on('mousemove',dragMove.bind($diaLogBox));
			这时候 ，新的问题出现了
			绑定的时候处理了 this ，移除的时候 移除谁呢 ?
			(注意：dragMove.bind($diaLogBox)这个方法每执行一次就会形成一个新的地址值)为啥？bind的实现原理中返回的是一个匿名函数

			这可咋整？
			简单，将匿名函数实名制
			将匿名函数赋值给 当前元素的 自定义属性就可以了 
				let this.DRAG_MOVE = dragMove.bind($diaLogBox);
				let this.DRAG_END = dragEnd.bind($diaLogBox);
				绑定
				$(document).on('mousemove',this.DRAG_MOVE);
				移除
				$(document).off('mousemove',this.DRAG_MOVE);
 */
