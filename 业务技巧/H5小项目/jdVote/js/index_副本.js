//加载首页数据
let matchRender = (function ($) {
  //获取要操作的元素
  let $userListBox = $('.userList');
  let $ulBox = $userListBox.find('ul');
  let $tipBox = $userListBox.find('.tip');

  //配置项
  let limit = 10; //每一页展示多少条数据
  let page = 1; //展示第几页
  let search = ''; //搜索框中的内容

  //1.获取服务器数据
  let queryData = function queryData() {
    //return axios.get('http://loaclhost:8888/getMatchList');
    axios.get('/getMatchList', {
      params: {
        limit,
        page,
        search
      }
    }).then(result=>{
       //把的到的结果进行数据绑定
      //bindHTML
      console.log(result);
    });
  };

  //2.动态绑定数据
  let bindHTML = function bindHTML(data) {
    let {
      code,
      list = []
    } = data;
    //要做的事情
    //  1.成功拿到数据，让ulBox显示，无数据的divBox隐藏
    //  2.没有拿到数据，与之相反
    if (parseFloat(code) !== 0) {
      //拿到了数据，但是这个数据不是我们想要的（服务器操作是成功的，但服务器给的数据不是这里绑定所需的）
      $ulBox.css('display', 'none');
      $tipBox.css('display', 'block');
      return;
    }
    //成功返回数据
    $ulBox.css('display', 'block');
    $tipBox.css('display', 'none');
    //将成功返回的数据进行对应的数据绑定操作
    //字符串拼接/文档碎片
    let $frg = $(document.createElementFragment());
    list.forEach((item, index) => {
      $frg.append(`<li>
      <a href="detail.html?userId=0">
          <img src="img/man.png" alt="" class="picture">
          <p class="title">
              <span>canfoo</span>
              |
              <span>编号 #001</span>
          </p>
          <p class="slogan">同一个世界同一个梦想同一个世界同一个梦想</p>
      </a>
      <div class="vote">
          <span class="voteNum">7</span>
          <a href="javascript:;" class="voteBtn">投他一票</a>
      </div>
  </li>`);
    });
    $ulBox.append($frg);
    $frg=null;


  }

  //3.其他业务逻辑

  return {
    init: function () {
      queryData();
    }
  }
})(Zepto);
matchRender.init();