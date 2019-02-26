[TOC]

# AJAX

## 1.`[ajax]`相关概念概念解读

### 1.1 ajax

> **async javascript and xml 异步的JS和XML**
>  在AJAX中的异步不是我们理解的同步异步编程，而是泛指“局部刷新”，但是我们在以后的AJAX请求中尽可能使用异步获取数据（因为异步数据获取不会阻塞下面代码的执行）

### 1.2 XML

> XML是一种文件格式（我们可以把HTML理解为XML的一种）：可扩展的标记语言，它的作用是用自己扩展的一些语义标签来存储一些数据和内容，这样存储的好处是清晰的展示出数据的结构

### 1. 3全局刷新：服务器端渲染

【模型】

![1550851023611](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1550851023611.png)

> 很久以前，AJAX刚刚兴起的时候，客户端从服务器端获取数据，服务器为了清晰的表达数据结构，都是返回XML格式的内容，当下，我们获取的数据一般都是JSON格式的内容，JSON相对于XML来说，也能清晰表达数据结构，而且访问里面数据的时候操作起来比XML更简便（但是现在某些项目中，服务器返回给客户端的数据不单纯是数据，而是数据和需要展示的结构拼接好的结果(类似于我们自己做的字符串拼接)，换句话说，是服务器端把数据和结构拼接好返回给我们，此时返回的数据格式一般都是XML格式的字符串）

![1550851740511](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1550851740511.png)

**服务器端渲染的好处**

+ 有利于SEO优化（服务器渲染好的内容到客户端呈现，在页面源代码中可以看到绑定的内容，有利于引擎的收录），但是在客户端做字符串拼接，呈现出来的内容源代码中没有，不利于SEO优化

+ 只要服务器端并发给力，页面加载速度会比客户端渲染更快

  （很多大型的网站【jd，tb】首屏内容都是基于服务器端渲染的，客户端获取XML数据后直接呈现，增快页面第一次打开的速度，而剩下屏的内容都是基于AJAX获取数据，在客户端进行数据拼接渲染的...）

### 1.4 局部刷新：ajax

【模型】

![1550851823008](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1550851823008.png)

## 2. AJAX操作

```javascript

//=>创建AJAX实例：IE6中是不兼容的，使用的是new ActiveXObject来实现的
let xhr = new XMLHttpRequest();

//=>打开请求：发送请求之前的一些配置项
//1.HTTP METHOD 请求方式
// GET/DELETE/HEAD/OPTIONS/TRACE/CONNECT
// POST/PUT
//2.URL 向服务器端发送请求的API（Application Programming Interface）接口地址
//3.ASYNC 设置AJAX请求的同步异步，默认是异步（写TRUE也是异步），FALSE是同步，项目中都使用异步编程，防止阻塞后续代码执行
//4.USER-NAME/USER-PASS：用户名密码，一般不用
xhr.open([HTTP METHOD],[URL],[ASYNC],[USER-NAME],[USER-PASS]);

//=>3.事件监听：一般监听的都是 READY-STATE-CHANGE 事件（AJAX状态改变事件），基于这个事件可以获取服务器返回的响应头响应主体内容
xhr.onreadystatechange=()=>{
    if(xhr.readyState===4 && xhr.status===200){
       xhr.responseText;
    }
};

//=>4.发送AJAX请求：从这步开始，当前AJAX任务开始，如果AJAX是同步的，后续代码不会执行，要等到AJAX状态成功后在执行，反之异步不会
xhr.send([请求主体内容]);

```

### 2.1 get请求

```javascript
 let xhr = new XMLHttpRequest();
 xhr.open('GET', 'API(URL)接口地址');
//URL的地址中，get请求方式是 基于？传参的方式向服务器发送数据的
//例如 https://www.cnblogs.com/bigspinach/p/9194366.html?id=250&pages=12

/*   
xhr.onreadystatechange =function(){
    if(xhr.readyState === 4 &&xhr.status ===200){
        console.log(JSON.parse(xhr.responseText));
    }
};
*/
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 &&xhr.status ===200){
        console.log(JSON.parse(xhr.responseText));
    }
};


xhr.send(null);
```



### 2.2 post请求

``` javascript
 let xhr = new XMLHttpRequest();
 xhr.open('POST', 'API(URL)接口地址');
 
xhr.onreadystatechange =function(){
    if(xhr.readyState === 4 &&xhr.status ===200){
        console.log(JSON.parse(xhr.responseText));
    }
};

//xhr.send(null);
xhr.send(JSON.stringfy({id=250,page=12}));
//请求主体中传递给服务器的是json格式的字符串
//但是
//真是项目中使用的是 URL-ENCODE 格式的字符串
//xhr.send("id=250&pages=12");
```

### 2.3 GET 和 POST 的区别

[传递给服务器信息的方式不一样]

  GET是基于URL地址“问号传参”的方式把信息传递给服务器，POST是基于“请求主体”把信息传递给服务器

  ```

    [GET]

    xhr.open('GET','/temp/list?xxx=xxx&xxx=xxx')



    [POST]

    xhr.send('xxx=xxx&xxx=xxx')

  ```

  GET一般应用于拿（给服务器的会少一些），而POST给服务器的很多，如果POST是基于问号传参方式来搞会出现一些问题：URL会拼接很长，浏览器对于URL的长度有有最大限度（谷歌8KB 火狐7KB IE2KB ...），超过的部分浏览器就把它截掉了 =>所以GET请求可以基于URL传参，而POST都是使用请求主体传递（请求主体理论上是没有限制的，真实项目中我们会自己做大小限制，防止上传过大信息导致请求迟迟完不成）



 [GET不安全，POST相对安全]

   因为GET是基于“问号传参”把信息传递给服务器的，容易被骇客进行URL劫持，POST是基于请求主体传递的，相对来说不好被劫持；所以登录、注册等涉及安全性的交互操作，我们都应该用POST请求；



 [GET会产生不可控制的缓存,POST不会]

   不可控：不是想要就要，想不要就不要的，这是浏览器自主记忆的缓存，我们无法基于JS控制，真实项目中我们都会把这个缓存干掉

   GET请求产生缓存是因为：连续多次向相同的地址（并且传递的参数信息也是相同的）发送请求，浏览器会把之前获取的数据从缓存中拿到返回，导致无法获取服务器最新的数据（POST不会）



   解决方案：

   ```

     xhr.open('GET',`/temp/list?lx=1000&_=${Math.random()}`); //=>保证每次请求的地址不完全一致：在每一次请求的末尾追加一个随机数即可(使用_作为属性名就是不想和其它的属性名冲突)

   ```

## 3. AJAX状态(READY-STATE)

```javascript
console.dir(new XMLHttpRequest());
/*
XMLHttpRequest
    onabort: null
    onerror: null
    onload: null
    onloadend: null
    onloadstart: null
    onprogress: null
    onreadystatechange: null
    ontimeout: null
    readyState: 0
    response: ""
    responseText: ""
    responseType: ""
    responseURL: ""
    responseXML: null
    status: 0
    statusText: ""
    timeout: 0
    upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
    withCredentials: false
    __proto__: XMLHttpRequest
        DONE: 4
        HEADERS_RECEIVED: 2
        LOADING: 3
        OPENED: 1
        UNSENT: 0
        abort: ƒ abort()
        getAllResponseHeaders: ƒ getAllResponseHeaders()
        getResponseHeader: ƒ getResponseHeader()
        onabort: (...)
        onerror: (...)
        onload: (...)
        onloadend: (...)
        onloadstart: (...)
        onprogress: (...)
        onreadystatechange: (...)
        ontimeout: (...)
        open: ƒ open()
        overrideMimeType: ƒ overrideMimeType()
        readyState: (...)
        response: (...)
        responseText: (...)
        responseType: (...)
        responseURL: (...)
        responseXML: (...)
        send: ƒ send()
        setRequestHeader: ƒ setRequestHeader()
        status: (...)
        statusText: (...)
        timeout: (...)
        upload: (...)
        withCredentials: (...)
        constructor: ƒ XMLHttpRequest()
        Symbol(Symbol.toStringTag): "XMLHttpRequest"
        get onreadystatechange: ƒ onreadystatechange()
        set onreadystatechange: ƒ onreadystatechange()
        get readyState: ƒ readyState()
        get response: ƒ response()
        get responseText: ƒ responseText()
        get responseType: ƒ responseType()
        set responseType: ƒ responseType()
        get responseURL: ƒ responseURL()
        get responseXML: ƒ responseXML()
        get status: ƒ status()
        get statusText: ƒ statusText()
        get timeout: ƒ timeout()
        set timeout: ƒ timeout()
        get upload: ƒ upload()
        get withCredentials: ƒ withCredentials()
        set withCredentials: ƒ withCredentials()
        __proto__: XMLHttpRequestEventTarget

*/
```



+ 0 =>UNSENT  刚开始创建XHR，还没有发送
+ 1 =>OPENED  已经执行了OPEN这个操作
+ 2 =>HEADERS_RECEIVED 已经发送AJAX请求（AJAX任务开始），响应头信息已经被客户端接收了（响应头中包含了：服务器的时间、返回的HTTP状态码...）
+ 3 =>LOADING 响应主体内容正在返回
+ 4 =>DONE 响应主体内容已经被客户端接收

## 4. HTTP网络状态码(STATUS)

根据状态码能够清楚的反映出当前交互的结果及原因
- 200  OK 成功(只能证明服务器成功返回信息了，但是信息不一定是你业务需要的)
- 301 Moved Permanently 永久转移（永久重定向）
    =>域名更改，访问原始域名重定向到新的域名
- 302 Move temporarily 临时转移（临时重定向 =>307）
    =>网站现在是基于HTTPS协议运作的，如果访问的是HTTP协议，会基于307重定向到HTTPS协议上
    =>302一般用作服务器负载均衡：当一台服务器达到最大并发数的时候，会把后续访问的用户临时转移到其它的服务器机组上处理
    =>偶尔真实项目中会把所有的图片放到单独的服务器上“图片处理服务器”，这样减少主服务器的压力，当用户向主服务器访问图片的时候，主服务器都把它转移到图片服务器上处理
- 304 Not Modified 设置缓存
    =>对于不经常更新的资源文件，例如：CSS/JS/HTML/IMG等，服务器会结合客户端设置304缓存，第一次加载过这些资源就缓存到客户端了，下次再获取的时候，是从缓存中获取；如果资源更新了，服务器端会通过最后修改时间来强制让客户端从服务器重新拉取；基于CTRL+F5强制刷新页面，304做的缓存就没有用了。
- 400 Bad Request 请求参数错误
- 401 Unauthorized 无权限访问
- 404 Not Found  找不到资源(地址不存在)
- 413 Request Entity Too Large 和服务器交互的内容资源超过服务器最大限制
- 500 Internal Server Error 未知的服务器错误
- 503 Service Unavailable 服务器超负荷

## 5. XHRHttpRequest实例对象的属性和方法详解

```javascript
console.dir(new XMLHttpRequest());
/*
XMLHttpRequest
    onabort: null     	//中止
    onerror: null		//错误
    onload: null		//加载
    onloadend: null		//加载完毕
    onloadstart: null	//开始加载
    onprogress: null	//进行中...
    onreadystatechange: null
    ontimeout: null
    readyState: 0
    response: ""
    responseText: ""
    responseType: ""
    responseURL: ""
    responseXML: null
    status: 0
    statusText: ""
    timeout: 0
    upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
    withCredentials: false
    __proto__: XMLHttpRequest

*/

```

>  xhr.response  响应主体内容
>  xhr.responseText 响应主体的内容是字符串（JSON或者XML格式字符串都可以）
>  xhr.responseXML 响应主体的内容是XML文档
>  xhr.status 返回的HTTP状态码
>  xhr.statusText 状态码的描述
>  xhr.timeout 设置请求超时的时间
>  xhr.withCredentials 是否允许跨域（FALSE）
>  xhr.abort() 强制中断AJAX请求
>  xhr.getAllResponseHeaders() 获取所有响应头信息
>  xhr.getResponseHeader([key]) 获取KEY对应的响应头信息，例如：xhr.getResponseHeader('date')就是在获取响应有中的服务器时间
>  xhr.open() 打开URL请求
>  xhr.overrideMimeType() 重写MIME类型
>  xhr.send() 发送AJAX请求
>  xhr.setRequestHeader() 设置请求头

### 5.1 进 度 事 件

- loadstart ：在 接 收 到 响 应 数 据 的 第 一 个 字 节 时 触 发。

-  progress ：在 接 收 响 应 期 间 持 续 不 断 地 触 发。

-  error ：在 请 求 发 生 错 误 时 触 发。 

- abort ：在 因 为 调 用 abort() 方 法 而 终 止 连 接 时 触 发。

- load ：在 接 收 到 完 整 的 响 应 数 据 时 触 发。

-  loadend ：在 通 信 完 成 或 者 触 发 error 、abort 或 load 事 件 后 触 发。

  

- 

#### 5.1.1 load 事 件

只 要 浏 览 器 接 收 到 服 务 器 的 响 应， 不 管 其 状 态 如 何， 都 会 触 发 load 事 件。 而 这 意 味 着 你 必 须 要 检 查 status 属 性， 才 能 确 定 数 据 是 否 真 的 已 经 可 用 了。

```javascript
var xhr = createXHR();
xhr.onload = function(){ 
    if (( xhr.status > = 200 && xhr.status < 300) || 	xhr.status = =304){ 
        alert( xhr.responseText);
    } else { 
        alert(" Request was unsuccessful: " + 						xhr.status); 
    }
};

xhr.open(" get", "altevents.php", true);
xhr.send( null);

```

#### 5.1.2 progress事件

**progress事件**会 在 浏 览 器 接 收 新 数 据 期 间 `周 期 性` 地 触 发。 而 onprogress 事 件 处 理 程 序 会 接 收 到 一 个 event 对 象， 其 target 属 性 是 XHR 对 象， 但 包 含 着 三 个 额 外 的 属 性： `lengthComputable ``、position` 和 `totalSize `。其 中，`lengthComputable` 是 一 个 表 示 进 度 信 息 是 否 可 用 的 布 尔 值， `position` 表 示 已 经 接 收 的 字 节 数， `totalSize `表 示 根 据 Content-Length 响 应 头 部 确 定 的 预 期 字 节 数。 有 了 这 些 信 息， 我 们 就 可 以 为 用 户 创 建 一 个 进 度 指 示 器 了。

```javascript
var xhr = createXHR(); 
xhr.onload = function( event){ 
    if (( xhr.status > = 200 && xhr.status < 300) | | xhr.status = = 304){ 
        alert( xhr.responseText);
    } else { 
        alert(
            " Request was unsuccessful: " + 					xhr.status); 
    } 
}; 
xhr.onprogress = function( event){ 
    var divStatus = document.getElementById(" status"); 	if (event.lengthComputable){
		divStatus.innerHTML = "Received " + 				event.position + " of " + event.totalSize +" 		 bytes";
    } 
}; 
xhr.open(" get", "altevents.php", true); 
xhr.send( null);


```



## 6. 跨 源 资 源 共 享

### 6.1 CORS

​CORS（ Cross-Origin Resource Sharing， 跨 源 资 源 共 享）

#### 6.1.1 IE对CORS的支持---XDR类型

IE8中引入了XDR（XDomainRequest）类型



### 6.2 其他跨域技术

#### 6.2.1 利用`<img>`标签

```javascript
var img = new Image();
img.onload = img.onerror = function(){
    alert(" Done!");
}; 
img.src = "http:// www.example.com/ test? name = Nicholas";

```

> 一 是 只 能 发 送 GET 请 求， 二 是 无 法 访 问 服 务 器 的 响 应 文 本。 因 此， 图 像 Ping 只 能 用 于 浏 览 器 与 服 务 器 间 的 单 向 通 信。



#### 6.2.2 JSONP



### 6.3 Comet

`长轮询`和`流`



### 6.4 服务器发送事件（SSE）



### 6.5 Web Sockets

> 只 有 支 持 这 种 协 议 的 专 门 服 务 器 才 能 正 常 工 作。



 Web Sockets 使 用 了 自 定 义 的 协 议，

​	`http:// `		====>                 `ws://`

​	`http://`		 ====>		   `wss://`



【自定义协议的好处】

- 1.是， 能 够 在 客 户 端 和 服 务 器 之 间 发 送 非 常 少 量 的 数 据， 而 不 必 担 心 HTTP 那 样 字 节 级 的 开 销。

  

- 2.销。 由 于 传 递 的 数 据 包 很 小， 因 此 Web Sockets 非 常 适 合 移 动 应 用。

  

【自定义协议的缺点】

-  制 定 协 议 的 时 间 比 制 定 JavaScript API 的 时 间 还 要 长。

【Web Sockets API】

```javascript
var socket = new WebSocket(" ws:// xxx/ server.js");
```

**注意**

- 绝对URL
- 不适用同源策略

```javascript
console.dir(new WebSocket('ws://www.baidu.com'));
/*
	WebSocket
        binaryType: "blob"
        bufferedAmount: 0
        extensions: ""
        onclose: null
        onerror: null
        onmessage: null
        onopen: null
        protocol: ""
        readyState: 3
        url: "ws://www.baidu.com/"
        __proto__: WebSocket
            CLOSED: 3
            CLOSING: 2
            CONNECTING: 0
            OPEN: 1
            binaryType: (...)
            bufferedAmount: (...)
            close: ƒ close()
            extensions: (...)
            onclose: (...)
            onerror: (...)
            onmessage: (...)
            onopen: (...)
            protocol: (...)
            readyState: (...)
            send: ƒ send()
            url: (...)
            constructor: ƒ WebSocket()
            Symbol(Symbol.toStringTag): "WebSocket"
            get binaryType: ƒ binaryType()
            set binaryType: ƒ binaryType()
            get bufferedAmount: ƒ bufferedAmount()
            get extensions: ƒ extensions()
            get onclose: ƒ onclose()
            set onclose: ƒ onclose()
            get onerror: ƒ onerror()
            set onerror: ƒ onerror()
            get onmessage: ƒ onmessage()
            set onmessage: ƒ onmessage()
            get onopen: ƒ onopen()
            set onopen: ƒ onopen()
            get protocol: ƒ protocol()
            get readyState: ƒ readyState()
            get url: ƒ url()
            __proto__: EventTarget
*/
```

#### 6.5.1`【socket的状态码--readyState】`

- WebSocket.CONNECTING (0) ：正 在 建 立 连 接。
-  WebSocket.OPEN (1) ：已 经 建 立 连 接。
-  WebSocket.CLOSING (2) ：正 在 关 闭 连 接。
-  WebSocket.CLOSE (3) ：已 经 关 闭 连 接。

>  readyState的值**永远**从0开始

```javascript
//1.创建socket实例
var socket = new WebSocket(" ws:// xxx/ server.js");

//=>创建完成socket后，浏览器会立马尝试创建连接


```

#### 6.5.2 WebSocket发送和接收数据

​	【发送--send()】

```javascript
var socket = new WebSocket('ws://www.baidu.com');
socket.sen("任何数据")；
//Web Sockets 只 能 通 过 连 接 发 送 纯 文 本 数 据
```

​	[接收---onmessage()]

```javascript
socket.onmessage =function(event){
    var data = event.data;
    //处理数据
}；
```

#### 6.5.3 其他事件

- open ：在 成 功 建 立 连 接 时 触 发。 
- error ：在 发 生 错 误 时 触 发， 连 接 不 能 持 续。 
- close ：在 连 接 关 闭 时 触 发。

>WebSocket 对 象 不 支 持 DOM 2 级 事 件 侦 听 器， 因 此 必 须 使 用 DOM 0 级 语 法 分 别 定 义 每 个 事 件 处 理 程 序。



