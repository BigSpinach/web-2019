let http = require('http'),
  fs = require('fs'),
  path = require('path'),
  url = require('url');


let server = http.createServer();
server.listen(3000,(err)=>{
  if(err){
    //端口启动失败
    throw err;
    return;
  }
  console.log('listen at port 3000');
})