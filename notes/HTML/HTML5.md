[TOC]





----





# HTML5



## 1.HTML5 与HTML4 的区别



### 1.1 推出的理由及目标

![1571880004850](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1571880004850.png)



### 1.2 语法的改变



#### 1.2.1 内容类型

后缀名保持不变

文档依然以<html> 开始



#### 1.2.2 doctype声明

```html
<!doctype html>

```



#### 1.2.3 指定字符编码

```html
<mate charset="utf-8">
```



#### 1.2.4 可以省略的标记的元素

```html
很多...
```



#### 1.2.5  具有boolean值的属性

```html
<input type="checkbox" checked>选中
<input type="checkbox" checked="checked">选中
<input type="checkbox" checked="">选中
<input type="checkbox" >不选中
```



#### 1.2.6 省略引号





### 1.2 新增和废除的元素

![1571880740298](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1571880740298.png)

#### 1.2.1 **新增的结构元素：**
section：页面中的内容块

article元素：表示文档中的一块独立内容

aside：表示article的辅助信息

header：头部，标题

hgroup：一个页面中的 标题集合

nav元素：表示导航链接的部分

footer元素：表示整个页面或页面中一个内容区块的脚注

figure：标签规定独立的流内容（图像、图表、照片、代码等等）。

`<figure> `元素的内容应该与主内容相关，同时元素的位置相对于主内容是独立的。如果被删除，则不应对文档流产生影响。

#### 1.2.2 **新增的块级语义元素：**
1.mark：视觉上向用户呈现突出显示或者高亮显示的文字
2.time元素：表示日期
3.meta元素：表示度量，用于一直最大值和最小值的度量，必须定义度量的范围，既可以在元素的文本中，也可以在min/max属性中定义。

#### 1.2.3 **新增的嵌入多媒体元素和交互元素**
嵌入的多媒体元素有：video和audio元素，分别用来插入视频和声音的
details元素：表示用户可以得到的细节信息，可以与summary配合使用，summary提供标题或图例，是details元素的第一个子元素，标题是可见的，当点击标题时，就会显示details内容
datagrid：表示可选数据的列表，通常用于显示树形表。
menu:表示菜单列表，通常用于列出表单控件



#### 1.2.4 新增的input类型

email 

url

number

range

Date Pickers 





#### 1.2.5 **废除的元素**
+ 可以使用css替代的元素：basefont，big，center，font，s，strike，tt，u等

+ 不再使用frame框架，只支持iframe框架，同时将frameset，frame和noframes三元素废除

+ 只有部分浏览器支持的元素：applet，bgsound，blink，marguee等元素，所以html5中废除。

  （applet可以被embed元素替代，bgsound可以audio元素替代，marquee可以由js编程方式替代。）

+ 其他被废除的元素



### 1.3 新增和废除的属性

+ 新增的属性
  + 表单相关的属性
  + 链接相关的属性
  + 其他属性
+ 废除的属性



### 1.4 全局属性

**全局属性：**可以对任何元素都使用的属性

+ contentEditable

+ designMode：整个页面是否可编辑（只能在js脚本里被修改,值为on、off）

+ hidden

+ spellcheck:针对input和textare文本输入框，功能是对用户输入的内容拼写、语法检查

+ tabindex：控件的访问表示

  ```html
  <a href="#" tabindex="1">1</a>
  <ul tabindex="3">
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
  ```

  

## 2.HTML5 新增的主体结构元素



### 2.1 article元素



### 2.2 section元素



### 2.3 nav元素



### 2.4 aside 元素



### 2.5 time元素与微格式

```html
<time datetime="2019-10-24">2019-10-24</time>
<time datetime="2019-10-24T20:00">2019-10-24</time>
<time datetime="2019-10-24T20:00Z">2019-10-24</time>
z表示 机器编码UTC标准时间
<time datetime="2019-10-24T20:00+09:00">2019-10-24</time>

```



pubdate属性

> 表示文章等的发布时间

```html
<p>发布日期</p>
<time datetime="2019-10-24" pubdate="true">2019-10-24</time>


<p>舞会时间</p>
<time datetime="2019-10-24" >2019-10-24</time>

<!--这里出现了两个时间，此时需要使用pubdate属性明确当前具体的发布时间是哪一个-->
```





## 3. HTML5 新增的的非主体结构元素



### 3.1header



### 3.2 footer、hgroup

```html
<hgroup>
  <h1>主标题</h1>
  <h2>子标题</h2>
</hgroup>
```





### 3.3 address





### 3.4 HTML5的结构

主要说的是大纲编排的规则

1. 显示编排北荣区域块
   明确使用session等元素创建文档结果
2. 隐示编排北荣区域块
   不明确使用session
3. 标题分级
4. 不同区域使用相同的标题



## 4.HTML5 表单新增元素与属性

### 4.1 form属性

```html
<form id="form1">
	<input type="text">
</form>
<textarea form="form1"></textarea>
```



### 4.2 formaction

```html
<form id="textform1" action="http://之前的提交地址.html"> 
	<input type="submit">
  <input type="submit">
  <input type="submit">
</form>

<form id="textform2"> 
	<input type="submit" formaction="提交地址1">
  <input type="submit" formaction="提交地址2">
  <input type="submit" formaction="提交地址3">
</form>
```



### 4.3 formmethod

```html
<input type="submit" formmethod="get" formaction="提交地址1">
<input type="submit" formmethod="post" formaction="提交地址2">
```



### 4.4 formenctype

提交到服务器之前，分别对表单数据进行编码方式

```html
<input type="text" formenctype="text/plain">
<input type="text" formenctype="multipart/form-data">
<input type="text" formenctype="application.x-www-form-urlencode">
```



### 4.5 formtarget

表单打开后，在何处？

```html
<form id="textform2"> 
	<input type="submit" formaction="提交地址1" formtarget="_blank"> 在新的页面打开
  <input type="submit" formaction="提交地址2" formtarget="_self"> 在相同的框架fram中打开
  <input type="submit" formaction="提交地址3" formtarget="_parent"> 在当前的框架的父框架中打开
  <input type="submit" formaction="提交地址3" formtarget="_top"> 在当前窗口中打开
  <input type="submit" formaction="提交地址3" formtarget="framenme">  在指定框架中打开
</form>
```



### 4.6 autofocus

```html
<form id="textform2"> 
	<input type="text" autofocus> 
</form>
```



### 4.7 required



```html
<form id="textform2"> 
	<input type="text" required> 
  <button type="submit"> 提交</button>
</form>
```



### 4.8 labels

```html
<form id="textform2"> 
  <label id="name_label" for="text_name">姓名</label>
	<input type="text" id="text_name"> 
  <button type="submit"> 提交</button>
</form>
```

