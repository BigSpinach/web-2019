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

- progress ：在 接 收 响 应 期 间 持 续 不 断 地 触 发。

- error ：在 请 求 发 生 错 误 时 触 发。 

- abort ：在 因 为 调 用 abort() 方 法 而 终 止 连 接 时 触 发。

- load ：在 接 收 到 完 整 的 响 应 数 据 时 触 发。

- loadend ：在 通 信 完 成 或 者 触 发 error 、abort 或 load 事 件 后 触 发。

  

  


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

CORS（ Cross-Origin Resource Sharing， 跨 源 资 源 共 享）

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







## 7.`jQuery`中的`AJAX`

`$.ajax([URL],[OPTIONS]) 或者 $.ajax([OPTIONS])`

> 在OPTIONS中有一个URL字段代表请求的URL地址
> `$.get / $.post / $.getJSON / $.getScript `这些方法都是基于`$.ajax`构建出来的快捷方法，项目中最常使用的还是`$.ajax`

```javascript
/*
     * URL：请求的API接口地址
     * METHOD：请求的方式
     *
     * DATA：传递给服务器的信息可以放到DATA中
     *   如果是GET请求是基于问号传参传递过去的
     *   如果是POST请求是基于请求主体传递过去的
     *
     *   DATA的值可以是对象也可以是字符串(一般常用对象)
     *     如果是对象类型，JQ会把对象转换为 xxx=xxx&xxx=xxx 的模式(x-www-form-urlencoded)
     *     如果是字符串，我们写的是什么就传递什么
     *
     * DATA-TYPE：预设置获取结果的数据格式 TEXT/JSON/JSONP/HTML/SCRIPT/XML...（服务器返回给客户端的响应主体中的内容一般都是字符串[JSON格式居多]），而设置DATA-TYPE='JSON'，JQ会内部把获取的字符串转为JSON格式的对象 =>“他不会影响服务返回的结果，只是把返回的结果进行了二次处理”
     *
     * ASYNC：设置同步或者异步（TRUE->异步 FALSE->同步）
     * CACHE：设置GET请求下是否建立缓存（默认TRUE->建立缓存 FALSE->不建立缓存），当我们设置FALSE，并且当前请求是GET请求，JQ会在请求的URL地址末尾追加随机数（时间辍）
     *
     * SUCCESS：回调函数，当AJAX请求成功执行，JQ执行回调函数的时候会把从响应主体中获取的结果(可能二次处理了)当做参数传递给回调函数
     * ERROR：请求失败后执行的回调函数
     */


$.ajax({
        url: 'https://www.easy-mock.com/mock/5b0412beda8a195fb0978627/temp/list',
        method: 'GET',
        data: {
            name: 'BigSpinach',
            age: 26
        },
        dataType: 'json',
        async: true,
        cache: false,
        success: (result, textStatus, xhr) => {
            //=>RESULT就是从服务器获取的结果
            console.log(result);
            console.log(textStatus);
            console.log(xhr.getResponseHeader('date')
            );//=>jqXHR
        },
        error: () => {

        }
    });
```

## 8. 使用`Promise`管控`ajax`

```javas
/*
 * Promise是ES6中新增加的内置类：目的是为了管理异步操作的
 *   1.new Promise() 创建类的一个实例，每一个实例都可以管理一个异步操作
 *    ->必须传递一个回调函数进去（回调函数中管理你的异步操作）,不传递会报错
 *    ->回调函数中会有两个参数
 *      resolve：异步操作成功做的事情（代指成功后的事件队列 =>成功后要做的所有的事情都存放到成功这个事件队列中）
 *      reject：异步操作失败做的事情（代指失败后的事件队列）
 *    ->new Promise的时候立即把回调函数执行了（Promise是同步的）
 *
 *  2.基于Promise.prototype.then方法（还有catch/finally两个方法）向成功队列和失败队列中依次加入需要处理的事情
 *
 *  3.如果是多个THEN调用，不是像我们想象的依次把增加的方法执行
 *    异步操作成功或者失败，先把第一个THEN中的方法执行，每当执行一个THEN会返回一个新的Promise实例，这个实例管控的是第一个THEN中方法执行的是成功还是失败
 *
 */
/*let promise1 = new Promise((resolve, reject) => {
    $.ajax({
        url: 'json/data2.json',
        success(result) {
            resolve(result);
        },
        error(msg) {
            reject('no');
        }
    });
});
promise1.then(
    result => {
        console.log('THEN1 OK', result);
        return 100;
    },
    msg => {
        console.log('THEN1 NO', msg);
        return 100;
    }
).then(
    result => {
        console.log('THEN2 OK', result);
    },
    msg => {
        console.log('THEN2 NO', msg);
    }
);*/

//=>建议不要使用THEN中的第二个参数（这样看起来很乱），而是建议我们使用Promise.prototype.catch来管理失败的情况
/*let promise1 = new Promise((resolve, reject) => {
    $.ajax({
        url: 'json/data2.json',
        success(result) {
            resolve(result);
        },
        error(msg) {
            reject('no');
        }
    });
});
promise1.then(result => {
    console.log('THEN1 OK', result);
    100();
    return 100;
}).catch(msg => {
    //=>第一个CATCH
    //1.异步请求失败会执行它
    //2.第一个THEN方法失败也会执行它
    console.log('CATCH1', msg);
}).then(result => {
    console.log('THEN2 OK', result);
}).catch(msg => {
    console.log('CATCH2', msg);
});*/

//=>JS中的异常捕获（目的：把抛出异常的错误捕获到，不让其阻断浏览器的继续执行）
/*
try {
    //=>正常执行的JS代码(可能会报错)
    1();
} catch (e) {
    //=>TRY中的代码报错了会执行CATCH
    console.log(e.message);
} finally {
    //=>不管TRY中的代码成功还是失败都会执行
}
*/


let A = function A() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};

let B = function B() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};

let promise = A();
promise.then(() => {
    console.log(1);
    return B();//=>如果方法中返回的一个具体值，而且执行中没有错误异常，会立即执行下一个THEN中的方法（不写RETURN也是返回的了具体值：undefined），但是如果返回的是一个PROMISR实例（并且管控了一个异步操作），只能等PROMISE完成，把成功后的结果当做具体的值返回，才能进入下一个函数执行
}).then(() => {
    console.log(2);
});
```





## 9 .axios

> Axios： 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
>
> 1. 提供了对应请求方式的方法（例如：get/post/head/delete/put/options...）
>    axios.get() 向服务器发送一个请求，基于的是GET方式
> 2. 支持的参数配置
>    axios.get([URL],[OPTIONS])
> 3. 基于GET或者POST方法发请求，返回的结果都是PROMISE实例

### 9.1 axios初步使用,基础语法

【get】

```javascript
axios.get('urlAPI地址', {
        params: {//=>GET请求中，会把PARAMS中的键值对拼接成URLENCODE格式的字符串，然后以问号传递参数的方式，传递给服务器，类似于JQ-AJAX中的DATA（或者自己基于URL后面拼接也可以，不用PARAMS）
            name: 'BigSpinach',
            age: 26
        }
    });
```

【post】

```javascript
 axios.post('urlAPI地址', {
        //=>配置项中传递的内容都相当于基于请求主体专递给服务器，但是传递给服务器的内容格式是RAW(JSON格式的子字符串)，不是X-WWW-FORM-URLENCODED
         name: 'BigSpinach',
         age: 26
    });
```

【axios的案例】

```javascript
let promise = axios.get('urlAPI地址', {
        params: {
            lx: 12
        }
    });
promise.then(result => {
        // console.log(result);//=>获取的结果是一个对象
        /!*
         * data：从服务器获取的响应主体内容
         * headers：从服务器获取的响应的头信息
         * request：创建的AJAX实例
         * status：状态码
         * statusText：状态码的描述
         * config：基于AXIOS发送请求的时候做的配置项
         *!/
 }).catch(msg => {
        console.log(msg);//=>请求失败的原因
 });
```

[`axios`解决回调地狱]

```javascript
axios.get('https://www.easy-mock.com/mock/5b0412beda8a195fb0978627/temp/info', {
        params: {
            lx: 12
        }
    }).then(result => {
        let {data} = result;
        //...
        console.log(data);

        return axios.post('https://www.easy-mock.com/mock/5b0412beda8a195fb0978627/temp/add');
    }).then(result => {
        let {data} = result;
        console.log(data);
    });
```





### 9.2 `axios`的请求合并以及参数配置



问题引入

```javascript
//需求：同时满足两个或者多个条件后才能执行后边的代码
//解决思路：定义全局变量接收每一个条件成立所得到的结果

let reuslt = null;//全局变量，用于接收第一次异步操作得到的结果
axios.get('A').then(resultA=>{
	result =  resultA;
  return axios.get('B');//满足A条件后又要满足B条件
  											//（promise的执行机制）
}).then(resultB=>{
  //A和B都成功执行后，这里的代码才会执行
  //resultB是 axios.get('B')成功后的结果，如何得到A呢，全局变量
  //全局变量result 是A 的成功后的结果
});
```



`axios`中的请求合并(一次并发多个请求)

```javascript
let setAry = [
	axios.get('api地址A')，
  axios.get('api地址B')，
  axios.get('api地址C')，
  axios.get('api地址D')
];

axios.all(setAry).then(result=>{
  //当setAry中的所有请求都满足后才执行这里的代码
  //此时的result的结果是一个数组
  //分别存储每一个请求的结果
  console.log(result);
});

//管控all里所有执行成功的结果
axios.all(setAry).then(axios.spread((A,B,C,D)=>{
	console.log(A,B,C,D);//原理？js看源码
}));

/*
	//源码
	moudle.export = function spread(callback){
		return function wrap(arr){
			return callback.apply(null,arr);
		}
	};
	
	//源码解读
	调用axios.spread(callback),
	返回一个函数    warp(arr)
		这个函数中的arr形参就是 axios.all().then(result=>{})
		中的 result【也就是arr】
	然后执行 这个warp函数中的 中return的代码段
		return callback.apply(null,arr);
		
	
	
*/
```



### 9.3 axios起别名



[请求配置]

> 这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get`方法。

```javascript
//config
{
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],
     // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },
   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
       return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  }, // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
 // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default
     // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```



```javascript
axios.request(config);
axios.get(url[, config]);
axios.delete(url[, config]);
axios.head(url[, config]);
axios.options(url[, config]);
axios.post(url[, data[, config]]);
axios.put(url[, data[, config]]);
axios.patch(url[, data[, config]]);
```



### 9.4 默认配置

【一般常用配置项】

初始化常用的配置项

```javascript
//baseConfig
axios.defaults.baseUrl = '基础url地址’；


//使用
axios.get('/list').then(result=>{
  //就相当于向 基础url地址/LIST 这个地址发送请求
  
});

//自定义成功失败的状态码（axios默认是2开头）
axios.defaults.validateStatus = function validateStatus(status){
  //自定义成功失败的规则，200 300 都算成功
 	return /^(2|3)/d{2}$/.test(status);
  //默认是
  //return status>=200 && status<300;
}



//设置响应拦截器
//啥意思呢？就是 在发送请求获得服务器响应信息之前（then（result=>{}）,首先会执行拦截器里的方法
axios.interceptors.response.use(function success(res){
  //分别设置响应成功和失败的拦截信息
  console.log(res);
  //将拦截的信息返回给 then（result=>{}）;
  //如果这里没有返回  没有 return ，返回undefined
  //此时 ，axios.get('urlxxx').then(result=>{conosle.log(result);//undefined})
  
  //如果要 then方法中有值 ，这里就得加上return ，当然我们可以对返回的信息进行处理
  //return res.data;
},function error(){
  
});

//简写拦截器
axios.interceptors.response.use（result=>result.data）;




//设置在post请求中基于请求主体向服务器发送的内容格式，默认是RAW，项目中常用的是url-encoded格式
axios.defaults.headers.post['content-Type']='application/x-www-form-urlencoded';
//改完请求头还不行，还得改发给服务器的数据格式
axios.defaults.transformRequest = data=>{
	//data :这里默认传递的给服务器的是 paw格式的数据 {name:'BigsPinach',age：26}
  //服务器一般要的是 -x-www-form-urlencoded格式的数据
  //也就是 name='BigsPinach'&age=26
  //所以 
  let str=``;
  for(let attr in data ){
    if(data.hasOwnPorperty){
      str+= `${attr} = ${data[attr]}&` ;
    }
  }
  return str.stringfy(0,str.length-1);
}
```





## 10.fetch

>[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 [`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch)方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

`fetch`不是`AJAX`，它诞生的目的是为了代替AJAX，它是JS中内置的API：基于FETCH可以实现客户端和服务器端的信息通信

> 1. `FETCH`是ES2018规范中新增的API，所以浏览器的支持度不是特别好（可以基于BABEL的最新语法解析包，把其进行解析），想要兼容性好一些，需要使用 “fetch polyfill”
>
> 2. 使用`fetch`发送请求
>
>    - GET/HEAD等请求不能设置BODY
>
>    - 不管服务器返回的状态是多少，FETCH都不认为是失败（那怕是4或者5开头的状态码），都执行的是THEN中的方法（需要我们自己进行异常抛出处理）,仅当网络故障时或请求被阻止时，才会标记为 reject。
>
>    - 默认情况下，fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。自从2017年8月25日后，默认的credentials政策变更为same-originFirefox也在61.0b13中改变默认值

```javascript
fetch('urlApiAddress', {
        method: 'GET',
        headers: {
            //=>设置请求头
            'content-type': 'x-www-form-urlencoded'
        },
        //=>不管同源还是跨域请求都带着COOKIE信息
        credentials: 'include'
    }).then(result => {
        console.log(result);
        /*
         * headers：{} 包含响应头信息
         * redirected：false 是否重定向
         * status：状态码
         * statusText
         * type：'basic'/'cors'
         * url：请求的地址
         *
         * __proto__:Response
         *   arrayBuffer()
         *   blob()
         *   json()
         *   text()
         *   ...
         *   基于这些方法可以快速的把从服务器获取的结果找到
         */
    });

```

### 10.1 进行 fetch 请求

```javascript
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

