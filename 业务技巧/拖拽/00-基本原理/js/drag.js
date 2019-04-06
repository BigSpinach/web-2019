$(function() {
	console.dir($);
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

		$boxTitle.on('mousemove', dragMove);

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

		//再设置 盒子的left 和 top 时 ，需要进行辩解判断
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
	let dragEnd = function dragEnd() {
		//console.log('dragEnd');
		//鼠标抬起，清除给盒子绑定的事件
		$boxTitle.off('mousemove', dragMove);
	};

	//鼠标按下
	$boxTitle.on('mousedown', dragStart);

	//鼠标移动
	//$boxTitle.on('mousemove',dragMove);
	//当鼠标按下的时候，就应该触发了 盒子的mousemove事件了

	//鼠标离开
	$boxTitle.on('mouseup', dragEnd);
});