[TOC]

----

# NODE

****





## 一、初识node



###  1.1 node是什么
>  JavaScript 运行时，一个平台



###   1.2  Node.js 中的 JavaScript
 +  没有 BOM、DOM
 + EcmaScript 基本的 JavaScript 语言部分
 + 在 Node 中为 JavaScript 提供了一些服务器级别的 API
 + 文件操作的能力
 + http 服务的能力JavaScript 运行时 ，一个平台



### 1.3 如何在NODE中渲染和解析JS

 `REPL`模式 (Read-Evaluate-Print-Loop，输入-求值-输出-循环)

>  直接基于NODE来执行JS文件
>
> 1. 在命令窗口中执行（DOS窗口 & 终端窗口）
> 2.  WB中的Terminal中也可以执行node命令
> 3.  直接在WB中执行（右键=>RUN xxx.js），这种方式可能会产生缓存（尤其是文件的目录改动后）







### 1.4 为什么把NODE作为后台编程语言

> 1. 我们可以把NODE安装在服务器上
> 2. 我们可以把编写的JS代码放到服务器上，通过NODE来执行它（我们可以使用JS来操作服务器，换句话说，使用JS来实现服务器端的一些功能操作 =>其实说NODE是后台语言，想要表达的是JS是后台语言 “JS是一门全栈编程语言”）



### 1.5 NODE做后台的优势和特点

传统后台语言：JAVA/Python/PHP/C#(.NET)...

1. 单线程的
2. 基于V8引擎渲染：快
3. 异步无阻塞的I/O操作：I/O (INPUT/OUTPUT) 对文件的读写
4. event-driven事件驱动：类似于发布订阅或者回调函数

****

## 二、node的核心模块

> 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识, 例如
 + `fs`,`http`,`os`,`path`

> 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
+ `var fs = require('fs')`

### 2.1  `fs`模块

#### 2.1.1 创建文件夹 `fs.mkdir(path,callback)`&`fs.makdirsync`

> + path <string> | <Buffer> | <URL>
> + options <Object> | <integer>
>   + recursive <boolean> 默认值: false。
>   + mode <integer> Windows 上不支持。默认值: 0o777。
> + callback <Function>
>   + err <Error>

```javascript
let fs = require('fs');
fs.mkdir("./aaa",(err)=>{
  if(err){
		throw err;
  }
});
```



#### 2.1.2 读取目录|文件夹 `readdir`&`readdirSync`

注意同步的使用用法

```javascript
let fs = require('fs');
//同步读取的操作
let result = fs.readdirSync('./');//执行这个方法，把同步读取的返回结果赋值给 result

//异步
fs.readdir('./',(err,result)=>{
  if(err){
    throw err;
    return;
  }
  console.log(result);
});

```

```javascript
fs.readdir('path', function (err, files) {
	// path : 被读取的指定路径
	// err ： 读取失败的错误对象
	//files ：被读取到的目录下的所有子目录名及其文件名，结果放在一个数组中
})
```



#### 2.1.3 删除一个目录

`fs.rmdir(path,callback)`

`fs.rmdirSync(path)`



#### 2.1.4` 读文件`

	fs.readFile('path', function (error, data) {
		// path : 被读取得文件的路径
		// error ： 读取错误文件的错误对象
		// data ： 被读取到的文件内容（2进制数据），一般  data.toString()
	}


#### 2.1.5 ` 写文件`	

> `fs.writeFile()` 写入的内容会被新内容替换

	fs.writeFile('path', 'content', function (error) {
		// path : 写入文件的路径
		// content ： 写入的内容
		// error : 写入失败的错误对象
	}
`fs.appendFile()`写入的内容会追加到原有文件内容后边

`fs.copyFile` 拷贝文件到新位置

#### 2.1.6  删除文件 

`fs.unlink(path,callback)`





#### 2.1.7 fs_Promise

```javascript
let fs = require('fs'),
    path = require('path');

//=>存储的是当前模块执行所在的绝对路径(!==__dirname)
let dirname = path.resolve();

//=>MKDIR && RMDIR && READ-DIR && READ-FILE && COPY-FILE && unlink
['mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile', 'unlink'].forEach(item => {
    exports[item] = function (pathname, copypath = '') {
        pathname = path.resolve(dirname, pathname);
        copypath = path.resolve(dirname, copypath);
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            }];
            item === 'readFile' ? arg.unshift('utf8') : null;
            item === 'copyFile' ? arg.unshift(copypath) : null;
            fs[item](pathname, ...arg);
        });
    };
});

//=>WRITE && APPEND
['writeFile', 'appendFile'].forEach(item => {
    exports[item] = function (pathname, content) {
        pathname = path.resolve(dirname, pathname);
        if (typeof content !== 'string') {
            //=>写入的内容我们规定必须是字符串才可以
            content = JSON.stringify(content);
        }
        return new Promise((resolve, reject) => {
            fs[item](pathname, content, 'utf8', (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            });
        });
    };
});

//=>READ-DIR
// exports.readFile = function (pathname) {
//     pathname = path.resolve(dirname, pathname);
//     return new Promise((resolve, reject) => {
//         fs.readFile(pathname, 'utf8', (err, result) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(result);
//         });
//     });
// };
```





**********

### 2.2 `http`模块

```javascript
let http = require('http');
console.dir(http);
/*
	http.Agent 类
	http.ClientRequest 类
	http.Server 类
	http.ServerResponse 类
	http.IncomingMessage 类
	
	http.METHODS
  http.STATUS_CODES
  http.createServer([options][, requestListener])
  http.get(options[, callback])
  http.get(url[, options][, callback])
  http.globalAgent
  http.maxHeaderSize
  http.request(options[, callback])
  http.request(url[, options][, callback])	

*/
```



`创建web服务器`

```javascript
 let server = http.createServer();
 //返回一个Server实例对象

//绑定端口号，启动服务
server.listen(3000, function () {
  //callback 是监听端口成功后执行的回调函数
  console.log('服务器启动成功了')
});
```

`http.createServer()详解`

```javascript
 let  server = http.createServer(callback);
//callback回调函数触发执行时机
// 当服务创建成功，并且客户端向服务器端发送了请求，才会执行回调函数，
//	发送一次请求，执行一次回调函数

//例如
 let  server = http.createServer(()=>{
   console.log('ok');
   //只要浏览器访问一次 127.0.0.1:3000 ，服务器端那就执行一次 ok输出
 }).listen(3000,(=>{
 		  console.log('listen on port at 3000');
 }));
```

`http.createServer()详解2`

```javascript
let  server = http.createServer((req,res)=>{
  //req:request请求对象，包含了客户端的请求信息
  			//dir(req);
  			//常用属性和方法
  			//req.url   存储的是请求资源的路径地址以及问好传参的部分
  			//req.method	客户端的请求方式 GET SET ...
  			//req.headers	客户端的请求头信息
  			//
  			//一般这么操作
  			let {pathName, query} = url.prase(req.url,true);
  
  //res：response响应对象，包含了一些属性和方法，可以让服务器端返回给客户端内容
        //res.write()  服务器向客户端返回内容
        //res.end()   结束响应
        //res.writeHead 重写响应头（设置响应头）
        //...
        res.write('哈哈哈')；
        res.end();
        //一步到位
        res.end('哈哈哈')；//服务器返回给客户端的数据一般都是string或者buffer格式的
   
 }).listen(3000,(=>{
 		  console.log('listen on port at 3000');
 }));
```



```javascript
server.on('request', function ( request ,  response ) {
	 // request : 请求对象
			// request.url
			// request.socket.remoteAddress
			//request.socket.remotePort
	 // response : 响应对象
			 // 设置响应头 res.setHeader('Content-Type', 'text/plain; charset=utf-8')  
					 // Content-Type：不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
					 // text/plain : 普通文本内容
					 // text/html : html格式内容
			//****************
			//response.write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
			// response.write('xxx')
			//response.write('yyy')
			// response.end()
			//-----------------------------------------------
			//一步到位
			//res.end('xxx yyy')
			//****************
  	// 响应重定向
		// res.statusCode=302  //响应状态码
		// res.setHeader('Location', '/')  //重定向到指定的目录
		// res.end()
  });

//绑定端口号，启动服务

server.listen(3000, function () {
  //callback 是监听端口成功后执行的回调函数
  console.log('服务器启动成功了')
})
```



#### 2.2.1 

​	









****

###  2.3  `url`模块

#### 2.3.1 `url.parse(path,[,config])`

> 核心方法 parse(‘path’,true)//返回一个url对象
>
> + path :  一般放的是浏览器当前的url全路径地址值     也就是 **rep.url**
> + true : 将url地址`？`后的字符串转为对象存储,默认为 `false`
```javascript
var urlObj = url.parse('path',true)	;
	//urlObj.parthName;
	//返回端口号`/`后`?`之前的字符串
	//例如 127.0.0.1:3000\/haha\/aaa\/bbb?name=刘&age=26,这里的haha\/aaa\/bbb部分
		//-------------
	urlObj.query;
	//配合上边的 true参数，得到返回的对象{name:刘,age:26}
```





### 2.4 `path`模块

#### 2.4.1 `path.resolve()	`

> 返回当前模块的**绝对**地址（不包括模块名称）
>
> ```javascript
> path.resolve('/foo/bar', './baz');
> // 返回: '/foo/bar/baz'
> 
> path.resolve('/foo/bar', '/tmp/file/');
> // 返回: '/tmp/file'
> 
> path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
> // 如果当前工作目录是 /home/myself/node，
> // 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
> ```
>





### 2.5 案例

#### 2.5.1 fsPromise.js

`fsPromise.js`

```javascript
let fs = require('fs'),
    path = require('path');

//=>存储的是当前模块执行所在的绝对路径(!==__dirname)
let dirname = path.resolve();

//=>MKDIR && RMDIR && READ-DIR && READ-FILE && COPY-FILE
['mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile', 'unlink'].forEach(item => {
    exports[item] = function (pathname, copypath = '') {
        pathname = path.resolve(dirname, pathname);
        copypath = path.resolve(dirname, copypath);
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            }];
            if (item === 'readFile') {
                //=>非图片或者音视频等富媒体资源设置UTF-8
                if (!/(JPG|JPEG|PNG|GIF|SVG|ICO|BMP|EOT|TTF|WOFF|MP3|MP4|OGG|WAV|M4A|WMV|AVI)$/i.test(pathname)) {
                    arg.unshift('utf8');
                }
            }
            item === 'copyFile' ? arg.unshift(copypath) : null;
            fs[item](pathname, ...arg);
        });
    };
});

//=>WRITE && APPEND
['writeFile', 'appendFile'].forEach(item => {
    exports[item] = function (pathname, content) {
        pathname = path.resolve(dirname, pathname);
        if (typeof content !== 'string') {
            //=>写入的内容我们规定必须是字符串才可以
            content = JSON.stringify(content);
        }
        return new Promise((resolve, reject) => {
            fs[item](pathname, content, 'utf8', (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            });
        });
    };
});
```



#### 2.5.2 处理静态资源

1.处理IE浏览器不智能识别图片响应头信息

2.处理mime类型，重写响应头部信息，使用到github上的mime插件

```javascript
//1.处理IE浏览器不智能识别图片响应头信息
//...
 if (item === 'readFile') {
     //=>非图片或者音视频等富媒体资源设置UTF-8
  if(!/(JPG|JPEG|PNG|GIF|SVG|ICO|BMP|EOT|TTF|WOFF|MP3|MP4|OGG|WAV|M4A|WMV|AVI)$/i.test(pathname)){
                    arg.unshift('utf8');
             		}
 }
//...


//2.处理mime类型，重写响应头部信息，使用到github上的mime插件
/*
		npm install mime
*/
const mime = require('mime');
//...
//匹配后缀名
let pathREG = /\.([a-z0-9]+)$/i;
//...
let suffix = pathREG.exec(pathname)[1];
res.writeHead(200,{'Content-type':`${mime.getType(suffix)};charset=utf-8;`});     
res.end(result);
//...
```

```javascript
let handle = function (req, res) {
  //客户端请求的资源文件名pathName，服务器要是到static 文件夹下进行读取，也是根据客户端的请求的路径名称读取的，服务器基于fs读取文件的时候，直接给路径前加上 ‘./static’即可
  //headers:reqHeaders  => header重命名为reqHeaders
  let {method,headers: requestHeaders} = req;
  let {pathname, query} = url.parse(req.url, true);
  let pathREG = /\.([a-z0-9]+)$/i;
  //读取静态资源
  readFile(`./static${pathname}`).then(result => {
    //读取路径成功
    //重写响应头
    // res.writeHead(200,{`Content-type': 'text/plain;charset=utf-8;`});
    //  mime.getType('txt')，处理后缀名 pathREG
    let suffix = pathREG.exec(pathname)[1];
    res.writeHead(200,{'Content-type':`${mime.getType(suffix)};charset=utf-8;`}); 		res.end(result);
  }).catch((err) => {
    //读取路径失败：文件不存在
    //重写响应头信息   
    res.writeHead(404, {
      'Content-type': 'text/plain;charset=utf-8;'
    });
    res.end('NOT FOUND THIS FILE!');
  });
};
```





#### 2.5.3 处理API 接口

```javascript

```



*******************

## 三、Node中的模块系统-----基本准则
### 3.1 模块化

> - 有文件作用域
> - 有通信规则
	+ 加载
	+ 导出

### 3.2  CommonJS模块规范
> 在node中的JavaScript 有一个很重要的概念：`模块系统`
>  - 模块作用域
>  - require方法加载
>  - export方法导出

#### 3.2.1 `require` 加载

```javascript
var 自定义变量名 = require('模块');
	//两个作用
	//1.执行被加载的模块中的代码（同步的）
	//2.得到被加载的模块的 export导出的对象
```
 `require`方法的加载规则：
 1.核心模块的加载
	 **模块名**

	 > 核心模块文件已经被编译到二进制文件当中了，我们只需要加载核心模块的名字即可


 2.第三方模块的加载
 > 凡是第三方模块都必须使用`npm` 来下载
 > 使用的时候     require('包名')    即可

`具体准则`
既不是核心模块也不是路径形式的模块
 （1）先找当前文件的同级目录下的`node_modules`目录
  （2）再找`node_modules`目录中的`node_modules/jquery模块`

   （3）再`node_modules/jquery模块`目录中的    `package.json`文件
   （4） 再找`package.json`文件中的`main`属性
   （5）`main`属性的值记录了 **这个模块**的入口文件，最后加载使用第三方包

**如果**（3）（4）（5）中的任何一步出现问题，node会默认找当前目录下的`index.js`文件作为入口文件备选项
**如果还找不到**，则会进入上一级目录中的`node_modules`目录中继续查找，如果还没有，那就上上一级，直到找到该文件所在磁盘的根目录为止，如果还没有找到的话，就报错
`can not find module xxx`

 

 3.自定义模块的加载
	>  路径的形式
	./     当前目录
	../   上一级目录
	/xxx  所在磁盘根目录下的xxx         -------几乎不用
	首位的/ 表示当前文件所属磁盘的根路径
	d:/a/foo.js      几乎不用

​	

#### 3.2.2 `exports` 导出

> +  每个模块中都有一个`module`对象，`module`对象中有一个`exports`对象
> + node为了 方便我们书写，给每一个模块提供了一个`exports`成员，我们可以使用node提供的`exports`成员来替换 `module.exports`的书写方式，（**注意：**node最终return的还是`module.exports`）

  `exports导出`

	 //导出单个成员
		 expotrs.xx = xx;
		 exports.b = 'helloB';
		 ...
	
	//导出多个成员（必须在对象中）
		exports.expObj = {
			name : name,
			add ：add，
			...		
		}


​	  
  `module.exports`
​		
​	 //导出单个成员
​		module.exports.xx = xx;
​		module.exports.b = 'helloB';
​		 ...
​	
​	//导出多个成员（必须在对象中）
​		module.exports.expObj = {
​			name : name,
​			add ：add，
​			...		
​		}

#### 3.2.3  **`exports`**和 **`module.exports`**的区别

```javascript
//部分源码
var exports = {};
var module  ={
  exports:exports,
  
  require: function(id){
    return exports;
  }
};

//...
function require(modelName){};
```



1.  我们需要把导出的成员都挂载到 `module.exports`接口对象中，
也就是`module.exports.xxx=xxx`的方式，
**但是**，node为了方便我们操作，给每一个模块中都提供了一个`exports`的成员，
即：`module.exports.xxx === exports.xxx  //  true`
**所以**，`module.exports.xxx = xxx`也就是` exports.xxx = xxx`
2. 当一个模块导出单个成员的时候
	**必须用**`module.exports.xxx = xxx`
	**不能用**`exports.xxx = xxx`
	因为，每个模块最终向外return的是`moduleexports`,`exports`只是`moduleexports`的一个引用
	**所以**即使 `exports.xxx= xxx`也不会影响`module.exports`
**注意特殊情况：**`exports = module.exports`，这样写会将`exports`与`module.exports`重新建立连接关系



#### 3.2.4 `CommonJS`特点



1. 所有代码都运行在模块作用域，不会污染全局作用域（每一个模块都是私有的，包括里面所有的东西也都是私有的，不会和其它模块产生干扰）
2. 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。（为了保证性能，减少模块代码重复执行的次数）
3.  模块加载的顺序，按照其在代码中出现的顺序。CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。
4. CommonJS加载模块是同步的，只有加载完成，才能执行后边的操作









***

## 四、NPM详解

>npm(node package manage)

`建议`
+ 1.每一个项目都有一个`package.json`文件（这个文件可以通过`npm init`自动生成）
+  2.执行`npm install`的时候都加上`--save`这个选项，目录保存依赖信息（dependencies）

### 4.1 npm网站
作用：查包，发表包

### 4.2  npm 命令行工具
`版本号`
	

	npm --version

`升级`（自己升级自己）

	npm install --global npm

`常用命令`

	//装包
	npm install         ------------   npm i
	npm install 包名     ------------    npm i 包名
	npm install --save 包名     ------------    npm i -S 包名
			//或者
	npm install  包名 --save   ------------    npm i 包名 -S 
	
	//删包
	npm unionstall 包名
	npm uninstall --save 包名

`其他命令`

	npm --help
	npm 命令名 --help

###4.3  安装cnpm
`方式一`

	npm install --global cnpm
	//安装完成后使用
	cnpm install --save 包名

`方式二`太麻烦了

	npm install jquery --registry=https://registry.npm.taobao.org

`方式三`
	将淘宝镜像服务地址配置到配置选项中

	npm config set registry https://registry.npm.taobao.org
	//只要配置成功后，以后的npm install都会默认从淘宝服务器下载包
	
	//验证方式
	npm config list





### 4.4 向npm发布自己的包

+ 1.注册npm账号
+ 2.打开要发布的项目根路径
+ 3.打开命令行，执行`npm addUser`  ，输入用户名和密码登陆
+ 4.执行`npm publish`发布完成
+ 5.进入npm个人主页查看package

********

## 五、`node`中的`Express`


### 5.1 整体感知

> 1.  安包
	-  `npm install --save express	`
> 2. 引包
	- `var express = require ('express');`
> 3.  创建服务器应用程序
	- 3.1 创建服务器应用程序
		+ `var app = express();`
- 3.2处理请求及其做出响应
	 +  `app.get(''path',callback(req.res){});`
- 3.3 指定端口号进行监听，开启服务
	 + ` app.listen(3000,callback(err){});`

### 5.2 `node`中的`Express`使用
#### 5.2.1 安装

	npm install --save express

#### 5.2.2 hello world

	var express = require('express');
	var app = express();
	app.get('/',function(req,res){
		res.send('hello express');
	})
	
	app.listen(3000,function(err){
		console.log('running 3000');
	});
#### 5.2.3 基本路由
#### 5.2.4 开放静态资源
`设置请求静态资源的方式及目录`

	//方式1
	app.use('/public/',express.static('./public/'));
	//将'./public/'这个目录设置为开放目录，以'/public/'的方式访问
	//127.0.0.1:3000/public/login.html
	
	//方式2
	app.use(express.static('./public/'));
	//省略掉第一个参数的时候，访问方式变为  127.0.0.1:3000/login.html
	
	//方式3---配置别名
	app.use('/ahaha/',express.static('./public/'));
	//访问静态资源的方式为  127.0.0.1:3000/ahaha/index.html

#### 5.2.5 静态服务

	//1.
	app.use(express.('public'));
	app.use(express.static('files'));
	
	//2.
	app.use('/static',express.static('public'));
	
	//3
	app.use('/static',express.static(path.jion(__dirname),'public'));

### 5.3 在`Express`中配置使用  `art-template`模板

	//0：安装
		npm install --save art-template
		npm install --save express-art-template
	
	//1：配置
		app.engine('html',require('express-art-template'));
		//'html'这个参数表示，当以.html结尾的文件的时候，使用art-template模板引擎
	
		//express为response响应对象提供了一个render方法，这个方法默认不可以使用，当且仅当配置了模板引擎的时候，这个方法就可以使用了
		res.render('html模板文件'，{模板对象数据})；
		//注意：html模板文件不能写路径，因为express的约定是在项目的views目录中去找，所以，模板文件一般都放在views文件夹中
		
		//如果你实在是闲的蛋疼，觉得views满足不了你，你可以重新配置默认文件夹，方法是
		app.set('views',render函数的默认路径)；



### 5.4 `GET`和`post`请求方式
`GET`
	> req.query

	app.get('/',function(req,res){
		res.send('hello Express');
		
		//在这里，之前http模块的响应数据的格式这里依然可以使用
		//res.write('hello');
		//res.write('Express');
		//res.end();
	
		//res.end(''hello Express);
	
	});

`POST`

	>  在`Express`中没有内置的获取表单post请求的API,这里需要使用一个第三方的包，`body-parser`

> 1. 安装
	+ npm i -S body-parser
> 2. 配置
	+ step1.> 引包
		+ var bodyParser = require('body-parser');
	+ step2>  配置
	**只要加入这个配置，则在req的请求对象上默认增加一个body的属性，这时候就可以通过`req.body`获取请求体的内容了（注意，得到的是字符串）**
		+ app.ues(bodyParser.urlencoded({ extended ：false }))；
		+ app.use(bodyParser.json());


