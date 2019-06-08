let loadingRender = (function () {
    let $loadingBox = $('.loadingBox');
    //$loadingBox.css('display','block');
    let $current = $loadingBox.find('.current');
    let imgData = ["img/icon.png"];

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
            $loadingBox.css('display', 'none');
            $loadingBox.remove();
            //console.log('done');
            phoneRender.init();
            //目的：停留1秒钟，让用户看到加载完成了
        }, 1000);
    }

    return {
        init: function () {
            $loadingBox.css('display', 'block');
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
        introduction.oncanplay = function () {
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
                $phoneBox.css('display', 'none');
                $phoneBox.remove();
                //console.log('removePhoneBox');
                messageRender.init();
            }, 520);
        });

    }


    let run = function run() {
        //页面加载就播放 answerBell
        //基于面向对象查看audio的api
        //console.dir(answerBell);
        answerBell.volume = 0.6;
        //console.dir(answerBell);
        answerBell.play();

        //点击answerMarkLink 让answerBell 声音暂停并关闭,并且移除 answerBox
        //$answerMarkLink.on('click', answerMarkTouch);
        $answerMarkLink.tap(answerMarkTouch);
        //answerMarkTouch();
        //然后让hangUpBox 显示，显示后播放 introduction的audio
        // $hangUpMarkLink.on('click', hangUpMarkTouch);
        $hangUpMarkLink.tap(hangUpMarkTouch);
    };

    return {
        init: function () {
            $phoneBox.css('display', 'block');
            run();
        }
    }
})();

//messageRender
let messageRender = (function messageRender() {
    //console.log('messageRender');
    //获取要操作的元素
    let $messageBox = $('.messageBox');
    let $liBox = $messageBox.find('.warpper');
    let $liList = $liBox.find('li');
    let $keyBoardBox = $messageBox.find('.keyBoardBox');
    let $inputText = $keyBoardBox.find('#inputText');
    let $submit = $keyBoardBox.find('.submit');
    let messageBGM = $('#messageBGM')[0];

    let step = -1,
        autoTimer = null,
        total = $liList.length + 1; //自己发送一条，所以要+1
    interval = 1000;

    //展示信息
    let showMessage = function showMessage() {
        messageBGM.play();
        ++step;
        if (step === 2) {
            handsSendMessage();
            clearInterval(autoTimer);
            //让键盘显示
            //点击submit，实现发送消息的功能
            $submit.tap(submitSend);
            return;
        };
        let $cur = $liList.eq(step);
        $cur.addClass('active');

        if (step >= 3) {
            //获取当前的li的高度
            //重新设置liBox的高度为 新的高度
            let curH = $cur[0].offsetHeight;
            let liBoxT = parseFloat($liBox.css('top'));
            $liBox.css('top', liBoxT - curH);

        }

        if (step >= total - 1) {
            clearInterval(autoTimer);
            closeMessage();
        }

    }


    //手动发送消息
    let handsSendMessage = function handsSendMessage() {
        $keyBoardBox.css('transform', 'translateY(0)').one('transitionend', () => {
            //监听键盘出来的动画是否完成，完成后才做其他的事
            //onTransitionEnd
            //transitionend 事件执行的次数跟监听的元素改变的css样式属性值的个数有关，有几个样式改变，那么transitionend事件就会执行几次
            //所以一般这里改用one，因为我们之心往这里的代码执行一次
            //console.log('ok');
            //实现打字机效果
            let timer = null;
            let str = '好的，大佬牛逼！';
            let len = str.length;
            let n = -1;
            timer = setInterval(() => {
                ++n;
                let innerText = $inputText[0].value; //获得文本框中的内容
                //console.dir( $inputText[0].value);
                //后边给它拼接
                if (n >= len) {
                    clearInterval(timer);
                    //让submit按钮显示
                    $submit.css('display', 'block');
                    return;
                }
                //实现打字机效果
                innerText += str[n];
                //console.log($inputText[0]);
                $inputText[0].value = innerText;
            }, 100);
        });

    }

    //点击submit按钮实现发送效果
    let submitSend = function submitSend() {
        //这里的主要功能是，给liList中插入一条数据，插入的位置是 索引2的位置
        //由于zepto的插入跟DOM没有映射机制，所有插入后我们需要重新获取liList的集合
        //重新获取input中的值，并且拼接一个 li的数据，然后追加到 索引step的位置
        let val = $inputText.val();
        //console.log(val);//好的，大佬牛逼！
        //拼接
        /*
            <li class="self">
                <i class="arrow"></i>
                <img src="img/zf_messageStudent.png" alt="" class="pic">
                你好啊！哈哈哈哈
            </li>
        */
        let insertLi = `<li class="self">
                            <i class="arrow"></i>
                            <img src="img/zf_messageStudent.png" alt="" class="pic">
                            ${val}
                        </li>`;

        //$liBox.append(step,insertLi);
        //console.log($liList);
        //$(insertLi).insertAfter($liList[step-1]);
        $(insertLi).insertAfter($liList.eq(step - 1)).addClass('active');
        //console.log(insertLi);

        //=>把新创建的LI增加到页面中第二个LI的后面

        //让输入框文字清空
        $inputText[0].value = '';
        $submit.css('display', 'none');
        //让键盘隐藏
        $keyBoardBox.css('transform', 'translateY(3.7rem)');


        //插入完成后继续执行 发送消息的定时器
        //插入数据与DOM之间没有映射，所以需要重新获取
        $liList = $liBox.find('li');
        autoTimer = setInterval(function () {
            showMessage();
            //第二条出来的时候就要让键盘显示了 
            //判断是否滚动数据
            //listenScrollHeight();
        }, interval);
    }

    let closeMessage = function closeMessage() {
        let delayTimer = null;

        delayTimer = setTimeout(() => {
            messageBGM.pause();
            $(messageBGM).remove();
            $messageBox.remove();
            clearTimeout(delayTimer);
            //清除messageBox区域完毕后 ，执行魔方区域
            cubeRender.init();
        }, 500);
    }

    let run = function run() {
        $messageBox.css('display', 'block');
        showMessage();
        autoTimer = setInterval(showMessage, interval);
    };

    return {
        init: function () {
            $messageBox.css('display', 'block');
            run();
        }
    }
})();


//cubeBox
let cubeRender = (function cubeRender() {
    let $cubeBox = $('.cubeBox');
    let $cube = $('.cube');
    let $cubeList = $cube.find('li');

    let start = function start(ev) {
        //记录当前盒子的位置绑定到当前元素自定义属性上
        //=>记录手指按在位置的起始坐标
        let point = ev.changedTouches[0];

        this.strX = point.clientX;
        this.strY = point.clientY;
        this.changeX = 0;
        this.changeY = 0;

        //console.log('start');
        //停止自动动画效果
        //$cube.css('animation', 'cubeAutoMoveStop 0.2s linear 0s 1 both;');
        //此处遗漏一个问题：当设置了css3动画后，停止动画后，动画的旋转角度无法获取到
        //导致的结果就是不能实现 刚开始 自动css3动画，鼠标移入停止动画，鼠标移动，魔方跟着旋转
        //后期需要大神指点
    };

    let move = function move(ev) {
        //=>用最新手指的位置-起始的位置，记录X/Y轴的偏移
        let point = ev.changedTouches[0];
        this.changeX = point.clientX - this.strX;
        this.changeY = point.clientY - this.strY;
        //console.log('move');
    };

    let end = function end(ev) {
        //console.log('end');
        //=>获取CHANGE/ROTATE值
        let {
            changeX,
            changeY,
            rotateX,
            rotateY
        } = this,
        isMove = false;
        //=>验证是否发生移动（判断滑动误差）
        Math.abs(changeX) > 10 || Math.abs(changeY) > 10 ? isMove = true : null;
        //=>只有发生移动再处理
        if (isMove) {
            //1.左右滑=>CHANGE-X=>ROTATE-Y (正比:CHANGE越大ROTATE越大)
            //2.上下滑=>CHANGE-Y=>ROTATE-X (反比:CHANGE越大ROTATE越小)
            //3.为了让每一次操作旋转角度小一点，我们可以把移动距离的1/2作为旋转的角度即可
            rotateX = rotateX - changeY / 2;
            rotateY = rotateY + changeX / 2;
            //=>赋值给魔方盒子

            $(this).css('transform', `scale(0.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
            //=>让当前旋转的角度成为下一次起始的角度
            this.rotateX = rotateX;
            this.rotateY = rotateY;
        }
        //=>清空其它记录的自定义属性值
        ['strX', 'strY', 'changeX', 'changeY'].forEach(item => this[item] = null);
    };


    return {
        init: function () {
            $cubeBox.css('display', 'block');
            //=>手指操作CUBE,让CUBE跟着旋转
            let cube = $cube[0];
            cube.rotateX = -35;
            cube.rotateY = 35; //=>记录初始的旋转角度（存储到自定义属性上）
            $cube.on('touchstart', start)
                .on('touchmove', move)
                .on('touchend', end);

            //点击 魔方每一个面进入对应的detail页面
            $cubeList.tap(function () {
                $cubeBox.css('display', 'none');
                let index = $(this).index();
                console.log(index);
                detailRender.init(index);
            });
        }
    }
})();

let detailRender = (function () {
    let $detailBox = $('.detailBox');
    //console.log($detailBox);
    let swiper = null; //当前的swiper的实例
    $dl = $('.page1>dl');

    //初始化 swiper
    let swiperInit = function swiperInit() {
        /*
        swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            onInit: move,
            onTransitionEnd: move
        });
        
        */
        swiper = new Swiper(
            '.swiper-container', {
                effect: 'cube',
                slidesPerView: 3,
                spaceBetween: 30,
                on: {
                    init: move,
                    transitionEnd: move,
                }
            });


    };

    let move = function move() {

        //=> this:表示的是当前的swiper实例（swiper 4.0版本）

        //1. 判断当前slide是否是第一个slide，如果是,就让他3d展开，不是就收起3D菜单

        let activeIn = this.activeIndex;
        let slideAry = Array.prototype.slice.call(this.slides, 0);

        if (activeIn === 0) {
            //实现折叠效果
            $dl.makisu({
                selector: 'dd',
                overlap: 0.5,
                speed: 0.8
            });
            $dl.makisu('toggle');
        } else {
            //other page
            //console.log('other pages');
            $dl.makisu({
                selector: 'dd',
                overlap: 0.5,
                speed: 0
            });
            $dl.makisu('close');
        };

        //2.根据index，判断当前是哪个页面需要有id样式动画
        //滑动到哪个页面，给哪个页面设置id选择器（这个id选择器里有我们搞的css3动画）
        slideAry.forEach((item, index) => {
            if (activeIn === index) {
                item.id = `page${index+1}`;
                return;
            }
            item.id = null;
        });
    };

    return {
        init: function (index=0) {
            $detailBox.css('display', 'block');
            //初始换swiper插件
            if (!swiper) {
                //防止重复初始化swiper实例
                swiperInit();
            }

            swiper.slideTo(index,0);//直接让页面切换到指定屏，0表示没有动画时间，立即切换
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
        break;
    case 'cube':
        cubeRender.init();
        break;
    case 'detail':
        detailRender.init();
        break;
    default:
        loadingRender.init();
};