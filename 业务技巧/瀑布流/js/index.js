$(function(){

  //1.获取数据
  let imgData=null;
  let page=0;
  let queryData = function(){
    $.ajax({
      url:`./json/data.json?page=${page}`,
      method:'get',
      async:false,
      dataType:'json',
      success:(result)=>{
        imgData = result;
      }
    });
  }

  queryData();
  
  //2.绑定
  let queryHTML = ({id,pic,title,link}={}) =>{
    return `<a href="${link}">
    <div><img src="${pic}" alt=""></div>
    <span>${title}</span>`;
  };
  let $boxList = $('.flowBox>li');
  let boxList = [].slice.call($boxList);
  
  for(let i=0;i<imgData.length;i+=3){
    let item1 = imgData[i];
    let item2 = imgData[i+1];
    let item3 = imgData[i+2];

    boxList.sort((a,b)=>a.offsetHeight-b.offsetHeight);
    if(item1){
      boxList[0].innerHTML += queryHTML(item1);
    }
    if(item2){
      boxList[1].innerHTML += queryHTML(item2);
    }
    if(item3){
      boxList[2].innerHTML += queryHTML(item3);
    }
  }

});