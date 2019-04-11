let loadingRender = (function () {
    let $loadingBox = $('.loadingBox');
    let $current = $loadingBox.find('.current');

    let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"];

    //run=> 预先加载图片
    let n = 0; //已经加载的图片个数
    let len = imgData.length; //所有的图片个数
    let run = function run(callback) {
        //let current = n/len;//进度条的长度
        imgData.forEach((item, index) => {
            let tempImg = new Image();
            tempImg.onload = () => {
                tempImg = null;
                //n++;
                $current.css('width', ++n / len * 100 + '%');
                //current 的width过度没有动画，效果生硬
                //使用transition过渡动画解决
                //在css中给current加上transition过度动画效果

                //加载完成(让当前loading页面消失)
                /*这样写有bug(当页面中的数据加载不完的时候，页面永远停留在loading页面 卡死)，所以允许n<len
                if(n===len){
                    callback && callback();
                }
                */
                if (n === len) {
                    //理想情况下加载完成，还没到超时时间，清除定时器
                    clearTimeout(delayTimer);
                    callback && callback();
                }
            };
            tempImg.src = item;
        });
    };

    //设定最长等待时间：
    let delayTimer = null;
    let maxDelay = function maxDelay(callback) {
        delayTimer = setTimeout(() => {
            if (n / len >= 0.9) {
                //没有加载完，但是不能让用户知道，所以立马让进度条跳到100%
                $current.css('width','100%');
                callback && callback();
                return;
            }
            alert("当前网络不佳，请投诉运营商");
            //这样写，超时后还会执行下边的操作，移除lodingBox，我们可以让其跳转到其他页面
            window.location.href="https://github.com/BigSpinach";
        }, 10000);
    }

    //DONE 完成（就是把loadingBox移除）
    let done = function done(){
        //$loadingBox.remove();
        let timer = setTimeout(()=>{
            $loadingBox.remove();
            //目的：停留1秒钟，让用户看到加载完成了
        },1000);
    }

    return {
        init: function () {
            run(done);
            maxDelay(done);
        }
    }
})();
//loadingRender.init();

let phoneRender = (function phoneRender(){
    let run = function run(){
        console.log("xx");
        
    };

    return {
        init:function(){
            run();
        }
    }
})();


//hash的原型
let url = window.location.href;
let well = url.indexOf('#');
let hash = well===-1 ? null : url.substr(well+1);
switch(hash){
    case 'loding':
        loadingRender.init();
        break;
    case 'phone':
        phoneRender.init();
};