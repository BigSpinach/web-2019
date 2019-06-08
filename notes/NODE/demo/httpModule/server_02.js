//原生node创建服务
let fs = require('fs'),
  path = require('path'),
  url = require('url'),
  http = require('http');
let {
  readFile
} = require("./utils/fsPromise");
const mime = require('mime');

//公共方法
let responseResult = function responseResult(res, returnValue) {
  res.writeHead(200, {
    'content-type': 'application/json,charset=utf-8'
  });
  res.end(JSON.stringify(returnValue));
};

let readUSER = function readUSER() {
  return readFile(`./json/UESE.JSON`).then(result => {
    return JSON.parse(result);
  });
};

let readVOTE = function readVOTE() {
  return readFile(`./json/VOTE.JSON`).then(result => {
    return JSON.parse(result);
  });
};


//创建web服务
let port = 8888;
let handle = function (req, res) {
  //客户端请求的资源文件名pathName，服务器要是到static 文件夹下进行读取，也是根据客户端的请求的路径名称读取的，服务器基于fs读取文件的时候，直接给路径前加上 ‘./static’即可
  //headers:reqHeaders  => header重命名为reqHeaders
  let {
    method,
    headers: requestHeaders
  } = req;
  let {
    pathname,
    query
  } = url.parse(req.url, true);
  let pathREG = /\.([a-z0-9]+)$/i;

  //读取静态资源
  readFile(`./static${pathname}`).then(result => {
    //读取路径成功
    //重写响应头
    // res.writeHead(200,{`Content-type': 'text/plain;charset=utf-8;`});
    //  mime.getType('txt')，处理后缀名 pathREG
    let suffix = pathREG.exec(pathname)[1];
    res.writeHead(200, {
      'Content-type': `${mime.getType(suffix)};charset=utf-8;`
    });
    res.end(result);

  }).catch((err) => {
    //读取路径失败：文件不存在
    //重写响应头信息   
    res.writeHead(404, {
      'Content-type': 'text/plain;charset=utf-8;'
    });
    res.end('NOT FOUND THIS FILE!');
  });

  //API接口的请求处理
  //根据传递的用户id获取指定用户的信息

  //验证是否是根据规定api接口文档中指定的方式传递
  if (pathname === '/getUser' && method === 'GET') {
    let {
      userId = 0
    } = query;
    let returnValue = {
      code: 1,
      message: 'not match any data!',
      data: null
    };
    /*
    readUSER().then(result=>{
      //result 已经处理为json格式的字符串
      //循环 result中的每一项，找到id相同的那一项
      let data = result.find(item=>parseFloat(item['id'])===parseFloat(userId));
      //找不到返回 undefined，找到，返回item
      if(data){
        returnValue = {
          code: 0,
          message:'ok',
          data:data
        };
        responseResult(res,returnValue);
        return;
      }
      throw new Error();//responseResult(res, returnValue),没有data的时候，执行catch中的方法
    }).catch(error => responseResult(res, returnValue));
    */

    readUSER().then(result => {
      let data = result.find(item => parseFloat(item['id']) === parseFloat(userId));
      data ? returnValue = {code: 0, message: 'ok',data} : null;
    }).finally(() => responseResult(res, returnValue));

    return;
  }

};

http.createServer(handle).listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`listen at port ${port}! `);
});