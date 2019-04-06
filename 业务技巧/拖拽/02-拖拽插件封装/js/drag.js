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


    /*
    //开始移动	
    let dragStart = function dragStart(ev) {...};
    //移动中
    let dragMove = function dragMove(ev) {...};

    //移动结束
    let dragEnd = function dragEnd(ev) {...};
    //鼠标按下
    $boxTitle.on('mousedown', dragStart);
    */
    //移动的功能使用插件来完成
    /*
    let drag = new Drag($diaLogBox[0],{
    	selector : 'h3'
    });
    */

    //这个不支持边界判断，
    //使用回调函数的方式将后期要做的事情传递进去
    let drag = new Drag($diaLogBox[0], {
        // selector: 'h3', //这个可以不写，拖拽盒子的时候也能实现移动
        dragStart: function() {
            //在开始拖拽的时候，改变拖拽元素的背景色
            //console.dir(this);//查看当前实例有哪些属性
            $(this.dragTarget).addClass('active');
        },
        draging: function() {
            //在拖拽过程中进行边界判断
            //需要用到 拖拽过程中盒子的位置信息 ，所以需要在插件中进行设置
            let maxL = winW - boxW;
            let maxT = winH - boxH;
            let minL = 0;
            let minT = 0;
            let {curL,curT} = this;
            curL = curL > maxL ? maxL : (curL < minL ? minL : curL);
            curT = curT > maxT ? maxT : (curT < minT ? minT : curT);
           	$(this.ele).css({
                left: curL,
                top: curT
            });

        },
        dragEnd: function() {
        	//console.log('移动结束');
        	//移除移动的时候的选中样式
        	$(this.dragTarget).removeClass('active');
        }
    });
});