let loadingRender = (function () {
    let $loadingBox = $('.loadingBox');
    let $current = $loadingBox.find('.current');
    $loadingBox.css('display','block');
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
                $current.css('width', '100%');
                callback && callback();
                return;
            }
            alert("当前网络不佳，请投诉运营商");
            //这样写，超时后还会执行下边的操作，移除lodingBox，我们可以让其跳转到其他页面
            window.location.href = "https://github.com/BigSpinach";
        }, 10000);
    }

    //DONE 完成（就是把loadingBox移除）
    let done = function done() {
        //$loadingBox.remove();
        let timer = setTimeout(() => {
            $loadingBox.remove();
            phoneRender.init();
            //目的：停留1秒钟，让用户看到加载完成了
        }, 1000);
    }

    return {
        init: function () {
            run(done);
            maxDelay(done);
        }
    }
})();
//loadingRender.init();

let phoneRender = (function phoneRender() {
    //获取要操作的元素
    //点击接听按钮，span 时间显示，
    //接听按钮
    //挂断按钮
    let $phoneBox = $('.phoneBox');
    $phoneBox.css('display','block');
    let $phoneTitle = $phoneBox.find('.phoneTitle');
    let $showTimeBox = $phoneTitle.find('span');
    let $answerBox = $phoneBox.find('.answerBox');
    let $answerMarkLink = $answerBox.find('.markLink');
    let $hangUpBox = $phoneBox.find('.hangUpBox');
    let $hangUpMarkLink = $hangUpBox.find('.markLink');
    //音视频标签也要操作
    let answerBell = $('#answerBell')[0];
    let introduction = $('#introduction')[0];
    //zpeto 没有提供音视频皂搓的方法，所以要用原生的js

    //点击接听电话按钮

    let answerMarkTouch = function answerMarkTouch() {
        answerBell.pause();
        $(answerBell).remove();
        $answerBox.remove();
        //让hangUpBox显示
        //transform: translateY(6.89rem);
        //console.log($hangUpBox[0]);
        $hangUpBox.css('transform', 'translateY(0rem)');
        //并且让自我介绍的音乐响起
        introduction.play();
        //让通话时间显示
        $showTimeBox.css('display', 'block');
        //控制时间显示
        //获取当前播放音乐的时间
        //currentTime获取的结果是 秒 
        let currentTime = introduction.currentTime;
        //console.log(currentTime);//0 
        //这样获取的是刚进来播放的时间 0 
        //得搞一个定时器，每隔一秒 执行一次
        // timer = setInterval(function(){
        //     console.log(currentTime);
        // },1000);
        computedTime();
        //点击挂断按钮
        $hangUpMarkLink.on('click', hangUpMarkTouch);
    };

    //计算展示的通话时间
    let computedTimer = null;
    
    let isHangUp = false; //用于标记是否挂断电话
    let computedTime = function computedTime() {
        //let duration = introduction.duration;
        //这样获取的duration可能是NaN
        //因为一点击接听就开始执行 computedTime，此时资源可能没加载出来
        //所以对 intruction搞一个监听事件
        let duration = 0;
        introduction.oncanplay = function(){
            duration = introduction.duration;
            //或者将获取播放总时间duration的操作放到定时器中（异步）
            //异步的特点，加载完成才进行下一个
        }
        return new Promise((resove, reject) => {
            computedTimer = setInterval(function () {
                //elapsedTime => 耗时，过去了多久
                let elapsedTime = 0;
                elapsedTime = introduction.currentTime;
                resove(elapsedTime);
                let minutes = Math.floor(elapsedTime / 60);
                let seconds = Math.floor(elapsedTime - minutes * 60);
                minutes = minutes > 10 ? minutes : '0' + minutes;
                seconds = seconds > 10 ? seconds : "0" + seconds;
                // console.log(minutes,seconds);
                //console.log($showTimeBox[0]);
                //$showTimeBox[0].innerHTML = `${minutes}`+':'+`${seconds}`;
                if (elapsedTime >= duration || isHangUp) {
                    clearInterval(computedTimer);
                    hangUpMarkTouch();
                    resove(elapsedTime); //将通话时长返回
                    return;
                };
                $showTimeBox.html(`${minutes}` + ':' + `${seconds}`);
                
            }, 1000);
        });

    };
 

    //点击挂断电话
    let hangUpMarkTouch = function hangUpMarkTouch() {
       
        let promise = computedTime();
        isHangUp = true;
        promise.then((elapsedTime) => {
            //clearInterval(computedTimer);
            //不在这里移除定时器，因为我们后边还要展示通话时长，所以放到点击按钮执行后
            //关闭自我介绍 audio
            introduction.pause();
            $(introduction).remove();
            $hangUpBox.remove();
            //console.log(elapsedTime);
            let minutes = Math.floor(elapsedTime / 60);
            let seconds = Math.floor(elapsedTime - minutes * 60);
            minutes = minutes > 10 ? minutes : '0' + minutes;
            seconds = seconds > 10 ? seconds : "0" + seconds;
            $showTimeBox.html(`通话时长${minutes}` + ':' + `${seconds}`);
            setTimeout(() => {
                //520毫秒秒后移除 phoneBOX
                $phoneBox.remove();
                alert('xxx');
            }, 520);           
        });

    }


    let run = function run() {
        //页面加载就播放 answerBell
        //基于面向对象查看audio的api
        //console.dir(answerBell);
        answerBell.volume = 0.6;
        answerBell.play();

        //点击answerMarkLink 让answerBell 声音暂停并关闭,并且移除 answerBox
        //$answerMarkLink.on('click', answerMarkTouch);
        $answerMarkLink.tap( answerMarkTouch);
        //answerMarkTouch();
        //然后让hangUpBox 显示，显示后播放 introduction的audio
        // $hangUpMarkLink.on('click', hangUpMarkTouch);
        $hangUpMarkLink.tap( hangUpMarkTouch);
    };

    return {
        init: function () {
            run();
        }
    }
})();

//messageRender
let messageRender = (function messageRender(){
    //获取要操作的元素

    let run = function run(){
        console.log('messageBox');
    };

    return {
        init:function(){
            run();
        }
    }
})();


let url = window.location.href;
let well = url.indexOf('#');
let hash = well === -1 ? null : url.substr(well + 1);
switch (hash) {
    case 'loding':
        loadingRender.init();
        break;
    case 'phone':
        phoneRender.init();
        break;
    case 'message':
        messageRender.init();
    default :
        loadingRender.init();
};