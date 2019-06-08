~(function (window) {

  //这个方法的作用：
  //展示倒计时的效果
  //重点：事件是基于服务器时间来操作
  //注意：优化想服务器发送请求的次数，发送一次就够了


  //获取要操作的元素
  let timeBox = document.getElementById("timeBox");
  let timeSpan = timeBox.querySelector('span');

  let autoTimer = null;

  //let serverTime = null;
  //定义方法：获取服务器时间
  let getSeverTime = function getSeverTime() {
    return new Promise((resove, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('head', '../AJAX.md');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 2 && /^(2|3)\d{2}$/.test(xhr.status)) {
          //xhr.getResponseHeader('data');
          let serverTime = new Date(xhr.getResponseHeader('date'));
          _servertime = serverTime;
          resove(serverTime);
        };
      };
      xhr.send(null);
    });
  };



  //计算展示的时间
  let _servertime = null;
  let computedTime = function conputedTime() {
    //这里会每隔1s向服务器发一次请求，获取promise实例
    //所以要对获取到的服务器时间进行处理
    if (_servertime) {
      _servertime = new Date(_servertime.getTime()+1000);
     // console.log(_servertime);
      computedShowTime( new Date(_servertime.getTime()+1000));
      return;
    }


    let promise = getSeverTime();
    promise.then((serverTime) => {
      computedShowTime(serverTime);
    });

  }

  let computedShowTime =function computedShowTime(serverTime){
    //获取当前时间
    let nowTime = serverTime;
    //定义终止时间
    let abortTime = new Date('2019-05-14 19:00:00');

    //计算时分秒
    //计算时间差
    let timeDif = abortTime - nowTime;

    if (timeDif <= 0) {
      timeSpan.innerHTML = `抢购结束，洗洗睡吧！`;
      clearInterval(autoTimer);
    } else {
      let hours = Math.floor(timeDif / 1000 / 60 / 60);
      let minutes = Math.floor((timeDif - hours * 1000 * 3600) / 1000 / 60);
      let seconds = Math.floor((timeDif - hours * 1000 * 3600 - minutes * 1000 * 60) / 1000);
      //console.log(hours,minutes,seconds);//3 47 53
      hours < 10 ? (hours = '0' + hours) : null;
      minutes < 10 ? (minutes = '0' + minutes) : null;
      seconds < 10 ? (seconds = '0' + seconds) : null;
      timeSpan.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
  };

  computedTime(); //不先执行一次，第一次加载的时候效果不好
  autoTimer = setInterval(computedTime, 1000);







})(window);