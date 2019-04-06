~function($){
	if (typeof $ === 'undefined') {
		return new SyntaxError('This drag-plugin depends on $ ');
	};


    //=>空函数没用:我们可以把它赋值给所有的回调函数默认值,也就是回调函数不传,执行的就是这个空函数(不会报错)
	/*
		let emptyFn = function emptyFn() {

	    };
    */
    let emptyFn = new Function();


	class Drag{
		constructor(ele,options={}){
			if(typeof ele === 'undefined' || ele.nodeType !== 1){
				return new SyntaxError('ele is a must pass paramter and must be an element object!');
			};
			//init paramters(初始化参数配置项)
			let {
				selector =ele,
				dragStart= emptyFn,
				draging = emptyFn,
				dragEnd = emptyFn

			} = options;

			//将回调函数挂载到实例对象上
			this.dragStart = dragStart;
			this.draging = draging;
			this.dragEnd = dragEnd;
			
			this.ele = ele;
			this.dragTarget = selector;
			if(typeof selector === 'string'){
				this.dragTarget = $(ele).find(selector)[0];
			}
			//console.log(this.dragTarget);
			//开始移动 drag-start
			//this.dragTarget.addEventListener('mousedown', this.down);
			//保证执行原型上的方法，方法中的this都是 当前类的实例本身
			this.dragTarget.addEventListener('mousedown',this.down.bind(this));
			//
			
		}

		//公有方法
		//mousedown
		down(ev){
			
			//记录初始位置并设定到实例上
			this.startX = ev.clientX;
			this.startY = ev.clientY;
			//这里获取了两个 jq实例，可以稍微优化一下
			//this.startL = parseFloat($(this.ele).css('left'));
			//this.startT = parseFloat($(this.ele).css('top'));
			let $ele = $(this.ele);
			this.startL = parseFloat($ele.css('left'));
			this.startT = parseFloat($ele.css('top'));

			this.MOVE = this.move.bind(this);
			this.UP = this.up.bind(this);
			document.addEventListener('mousemove',this.MOVE);
			document.addEventListener('mouseup',this.UP);
			this.dragStart();
		}

		//mousemove
		move(ev){
			
			let {startX,startY,startL,startT} = this;
			
			//计算当前元素的新位置
			let curL =  ev.clientX- startX  + startL;
			let curT = ev.clientY  -startY + startT;
			//console.log(startX,startY,startL,startT,curL,curT);
			//边界判断？相对于谁做边界判断？options配置项里给出

			this.curL = curL;
			this.curT = curT;

			//设置最新位置
			$(this.ele).css({
				left: curL,
				top: curT
			});
			this.draging();
		}

		//mouseup
		up(ev){
			
			document.removeEventListener('mousemove',this.MOVE);
			document.removeEventListener('onmouseup',this.UP);
			this.dragEnd();
		}


	}

	window.Drag  = Drag;
}(jQuery);

/*
	ele : 当前要实现拖拽的元素(大盒子)


 */
// let ele = document.getElementsByClassName('diaLogBox')[0];
// console.log(ele);
// let drag = new Drag(ele,{
// 	selector: '.title'//触发盒子移动的选择器，不传就是默认的 ele ，传递了谁就是谁
// });
