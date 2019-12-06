$(function () {
  //1.获取数据
  let imgData = null;
  let page = 0;
  let queryData = () => {
    page++;
    $.ajax({
      url: `./json/data.json?page=${page}`,
      method: 'get',
      dataType: 'json',
      async: false,
      success: (result) => {
        imgData = result;
      }
    });
  }
  queryData();

  //2.数据绑定
  let $boxList = $('.flowBox>li');
  let bindHTML = () => {
    for (let i = 0; i < imgData.length; i += 3) {
      $boxList.sort((a, b) => {
        return $(a).outerHeight - $(b).outerHeight;
      }).each((index, curLi) => {
        let item = imgData[i + index];
        if (!item) return;
        let {
          id,
          pic,
          title,
          link
        } = item;
        $(`<a href="${link}">
        <div><img src="${pic}" alt=""></div>
        <span>${title}</span>`).appendTo($(curLi));
      });
    }
  }
  bindHTML();

  //3.下拉加载更多数据


  $(window).on('scroll', () => {
    //获得 page的高度 pageH
    //    一屏的高度  screenH
    //    卷去的高度  scrollH
    let clientH = document.documentElement.clientHeight || document.body.clientHeight;
    let pageH = document.documentElement.scrollHeight || document.body.scrollHeight;
    //let scrollH = $(window).scrollTop();
    let scrollH = pageH - clientH;
    //console.log(clientH, pageH, scrollH);
    if (true) {
      console.log(1);
      queryData();
      bindHTML();
    }
  })

});