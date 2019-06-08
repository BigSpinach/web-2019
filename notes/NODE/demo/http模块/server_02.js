//原生node创建服务
let fs = require('fs'),
  path = require('path'),
  url = require('url'),
  http = require('http');

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

  //读取静态资源
  readFile(`./static${pathname}`).then(result => {
    //读取路径成功
    //重写响应头
    res.writeHead(200);
    res.end(result);

  }).catch((err) = {
    //读取路径失败：文件不存在
    //重写响应头信息
    res.writeHead(404, {
      'Content-type': 'text/plain;charset=utf-8;'
    });
    res.end('NOT FOUND THIS FILE!');
  });

};

http.createServer(handle).listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`listen at port ${port}! `);
});