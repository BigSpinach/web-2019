;
(function anonymous(window) {
  //设置默认的参数配置项
  let _default = {
    method: 'GET',
    url: '',
    baseURL: '',
    headers: {},
    timeOut: 3000,
    dataType: 'JSON',
    data: null, //post系列请求基于请求主体传递给服务器的内容
    params: null, //get 请求系列基于问号传参传递给服务器的内容
    cache: true //默认清理缓存
  };
  

  




  

  //基于Promise设计模式管理ajax请求
  let myAxiosPromise = function myAxiosPromise(options) {
    //options 融合了默认配置信息，用户基于default修改，用户执行get或者post请求传递的信息  ，越靠后的优先级越高
    let {
      url,
      baseURL,
      meathod,
      data,
      dataType,
      headers,
      cache,
      params,
      timeOut
    } = options;

    //把传递的参数进行进一步处理（why？根据请求的不同，我们需要处理一下url和data）
  //get url？传参
  //post data传参
  
  if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)) {
    //get 系列
    //判断有没有传递 params
    if (params) {
      url += `${myAxiosPromise.check(url)}${myAxiosPromise.formatData(params)}`;
    }
    if (cache === false) {
      url += `${myAxiosPromise.check(url)}_=${+(new Date())}`;
    }
    data = null; //get 请求主体就是 null

  } else {
    //psot系列
    if (data) {
      data = myAxiosPromise.formatData(data);
    }

  };

    //基于Promise发送ajax
    return new Promise((resove, reject) => {
      let xhr = new XMLHttpRequest();
      //xhr.open(method,url);
      xhr.open(method, `${baseURL}${url}`);

      //如果headers存在，我们需要设置请求头
      //不能出现中文
      //headers={};
      if (headers !== null && typeof headers === 'object') {
        for (let attr in headers) {
          if (headers.hasOwnProperty(attr)) {
            //xhr.setRequestHeader(attr,headers[attr]);
            //如果headers中包含中文，我们就将header处理一下
            let val = headers[attr];
            //中文的正则 u4e00~u9fa5
            if (/[u4e00-u9fa5]/.test(val)) {
              //val中包含中文
              //我们把中文进行编码
              val = encodeURIComponent(val);
            }
            xhr.setRequestHeader(attr, val);
          }
        }
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (/^(2|3)\d{2}$/.test(xhr.status)) {
            //resove(xhr.responseText);//正常返回这个
            //但是这里需要根据 dataTpey的类型来返回对应的数据，所以在这里应当对数据进行处理
            let result = xhr.responseText;
            dataType = dataType.toUpperCase();
            dataType === 'JSON' ? result = JSON.parse(result) : (dataType === 'XML' ? result = xhr.responseXML : null);
            resove(result, xhr);
            return;
          }
          reject(xhr.statusText, xhr);
        }
      }
      xhr.send(data);
    });
  };

  //将默认参数暴露出去，外边也可以修改默认参数配置项
  myAxiosPromise.default = _default;


  //=>get系列一起处理
  ['get', 'delete', 'options', 'head'].forEach(item => {
    myAxiosPromise[item] = function anonymous(url, options = {}) {
      options = {
        ..._default,//默认配置项，或者用户修改后的默认配置项
        ...options,//用户调取方法传递的配置项
        url: url,//请求的url地址(第一个参数：默认配置项和传递的配置项都不会出现url，所以只能这样获取)
        method: item.toUpperCase(),//以后执行肯定是ajax.get|head(options),不会配置method这个配置项，所以我们需要自己配置
      };
      return myAxiosPromise(options);
    }
  });

 

  ['psot', 'deput', 'patch'].forEach(item => {
    myAxiosPromise[item] = function anonymous(url,data, options = {}) {
      options = {
        ..._default,
        ...options,
        url: url,
        method: item.toUpperCase(),
        data:data
      };
      return myAxiosPromise(options);
    }
  });


  //格式化数据格式，把对象变为urlencode格式的字符串
  myAxiosPromise.formatData = function formatData(obj) {
    let str = ``;
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        str += `${attr}=${obj[attr]}&`;
      }
    }
    return str.substring(0, str.length - 1);
  };

  //check 判断url是否已经含有了 ？
  myAxiosPromise.check = function check(url) {
    return url.indexOf('?') > -1 ? '&' : '?';

  };


  window.myAxiosPromise = myAxiosPromise;

})(window);

//axios.get/head/post();