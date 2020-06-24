# CSS



> 常用浏览器
>
> - Chrome  ---------Webkit内核（V8引擎）
> - firfox  ---------Gecko内核
> - IE      ---------Trident内核
> - opera   --------- Presto内核
> - safari等其他浏览器  





## 1 HTML 基础及其实战





### 1.1 HTML标签和标签属性

### 1.2 元素和元素分类

#### 1.2.1 元素

#### 1.2.2 元素分类

行内元素

块级元素

#### 1.2.3 元素之间的转换





### 1.3 标签语义化

> logo标签使用h1标签（h1的权重最大）



#### 1.3.1 标签语义化的好处

1. 利于SEO 优化 
2. 样式丢失时，还可以较好的呈现结构
3. 更好的支持各种终端
4. 利于团队开发和维护

#### 1.3.2  标签语义化的法则

1. 减少无意义标签的使用
2. 不使用含有css样式的标签（b,s,font）
3. 在需要强调的部分，使用strong ，em，但是尽量使用css样式来描述
4. 表格搭建时，
   使用`<thead> `,`<tbody> `,`<tfoot> `
5. 列表搭建时，使用`<ul>`,`<ol>`,`<dl>`



#### 1.3.3 标签语义化的含义

+ 合适的标签干合适的事情
+ 标签语义化为浏览器和搜索引擎服务



### 1.4 网页的基本结构

```html
<!-- html5 的  文档声明   -->
<!DOCTYPE html>
<!-- 根元素lang语言 en英语  ch中文 -->
<html lang="en">
<!-- 网页的头部 -->
<head>
    <!-- 
        mate元信息
        编码 UTF-8
        网页的关关键字 SEO优化
        网页的描述内容
        视口 viewport  meta： vb  tab(移动端手机页面开发必须加的code) 
    -->
    <meta charset="UTF-8">
    <!-- 网页的标题 -->
    <title>01-网页的基本结构</title>
    <!-- 标题前的小图标 -->
    <link rel="shortcut icon" type="text/css" href="https://avatars1.githubusercontent.com/u/31435638?s=460&v=4">
</head>
<!-- 网页的主体 -->
<body>

</body>
</html>
```



## 2 CSS 基础及其实战

**css简介**

>CSS （层叠样式表） 
>编辑层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。
>
>CSS 能够对网页中元素位置的排版进行像素级精确控制，支持几乎所有的字体字号样式，拥有对网页对象和模型样式编辑的能力。

**基础语法**



![](https://www.w3school.com.cn/i/ct_css_selector.gif)

**命名规范**

> 1. 必须使用英文开头，并且开头字幕小写
> 2. 所有命名最好都小写
> 3. 尽量不要使用缩写英文，除非可以一目了然
> 4. 如果遇到相差不大的class或者id ，主功能识别字母在前，位置识别字母在后
> 5. 驼峰命名法



### 2.1 css的引入方式

#### 2.1.1 行内式

```html
<div style="width:250px;height:250px"></div>
```

#### 2.1.2 内嵌式

```html
<style>
  p{
        width:250px;
        height:250px;
   }
</style>
```

#### 2.1.3 外链式

```html
<link rel="stylesheet" type="text/css" href="../css/index.css" />
```



#### 2.1.4 导入式

+ `@import url()` 命令来导入一个独立的css文件

```html
<style>
	@import url("global.css");
	@import url(global.css);
	@import "global.css";
</style>
```



#### 2.1.5 `link`和`import`的区别

本质上：这两种方式都是为了加载外部CSS文件

1. `link` 属于`HTML`标签，`@import`属于`CSS`的命令
2. `link`引入的css样式会同时加载
   `@import`会等待页面加载完毕后再去加载引入的css样式
3. `@import`兼容差（IE5)以上
4. 使用`js`控制`DOM`的时候，只能控制`link`引入的css样式
5. `@import`会对网站服务器产生过多的HTTP请求



### 2.2 css选择器



#### 2.2.1 基本选择器

- `标签选择器`
- `class（类名）选择器`
- `id选择器`
- `"*"通配符选择器`



#### 2.2.2 并集选择器 “，”

> 样式相同的标签可以并列写在一起 例如（h1,p,div）

```css
h1,p,div{
  color:green;
  font-size:28px;
}
```



#### 2.2.3 交集选择器 “p.c1”

> 两种属性同属于一个元素的时候

```css
p.c1{
  /*注意：标签名和类名之间没有空格隔开*/
  color:green;
  font-size:28px;
}
```



#### 2.2.4 后代选择器 ” 空格”

```css
li strong {
  /*li下的所以子子孙孙strong标签*/
  font-style:italic;
  font-weight:normal;
}
```

#### 2.2.5 子代选择器“>” 

```css
/*子代选择器只作用于子代元素，孙子以及孙子后边的元素不受影响*/
h1>p{
  /*只作用于h1标签的p标签（儿子级别的p）*/
  color:yellow;
}
```





#### 2.2.6相邻兄弟选择器 “+”以及所有兄弟选择器 “~”



#### 2.2.7 属性选择器[属性名]

```css
[tittle]{
  /*给所有拥有title属性的元素设置样式*/
  font-size:250px;
}

[type="password"]{
  /*给所有拥有type属性并且属性值为 password的元素设置样式*/
  background-color:red;
}
```

+ E[attr=val]
+ E[attr|=val] 等于val 或者以val-开头
+ E[attr*=val] 包含val
+ E[attr~=val] 属性值有多个，其中有一个是val
+ E[attr^=val] 以val开头
+ E[attr$=val]  以val结尾

#### 2.2.8 伪类选择器

权重：10<伪类<11

+ a:link
+ a:visited
+ a:hover
+ a:active
+ a:focus
+ a:first-child   向元素的第一个子元素添加样式
+ a:lang            向带有指定`lang`属性的元素添加样式



`css3`目标为了选择器

+ :target 用来匹配url指向的目标元素

  存在url指向该元素匹配元素时，样式才能生效

  ```html
  <div id="div1"></div>
  <p style="height:1000px"></p>
  <a href="#div1">点击定位到的目标元素div1</a>
  
  
  <style>
    /*点击a标签的时候，更改目标元素div1的样式为*/
    :target{
      background:yellow;
      
    }
  </style>
  ```

  

#### 2.2.9 css3选择器

##### 2.2.9.1` :not`

```css
ul li:not(:last-child){
  /*ul 的所有后代li元素，除了最后一个*/
}
```

##### 2.2.9.2 :last-child

##### 2.2.9.3 :nth-child(number)

##### 2.2.9.4 :only-child 只有一个子元素的元素

##### 2.2.9.5 :nth-last-child(n) 倒数第几个元素



##### 2.2.9.6 :first-of-type 同级别的第一个元素

##### 2.2.9.7 :last-of-type 同级别的最后一个元素





##### 2.2.9.8 :only-of-type 只有一个兄弟（独苗）的元素



##### 2.2.9.9 :nth-of-type(n) 第n个同级兄弟元素 



##### 2.2.9.10 :nth-last-of-type(n) 倒数第n个同级兄弟元素



##### 2.2.9.11 :empty 空内容的元素



##### 2.2.9.12 :checked 被选中 主要用在input的表单元素



#### 2.2.10 伪元素选择器

+ :first-letter        向为本的第一个字母添加特殊样式
+ :first-line           向文本的首行添加特殊样式
+ :before              在元素之间添加内容
+ :after                  在元素之后添加内容

```css
li:after{
  display:block;/*设置宽度*/
  content:"";/*不加这个伪类不生效*/
  
  width:20px;
  height:20px;  
}
```



### 2.3 权重

权重的基本规则

口诀：从0开始

​			行内样式 +1000
​			id   +100
​			属性选择器、class、伪类   +10
  		  元素     +1  		

规则：  权重不同，权重高的生效
			权重相同，覆盖原则



设定高权重

**！important 1000;**


### 2.4 css的属性继承

#### 2.4.1 不可继承的属性

+ display

+ 文本属性

  + vertucal-align ：垂直文本对齐
  + text-decoration : 
  + text-shadow ： 文本阴影
  + white-space： 空白符的处理
  + unicode-bidi: 设置文本方向

+ 盒子你是的属性

+ 背景属性

+ 定位属性

+ 浮动类

+  生成内容属性

+ 轮廓样式属性

+ 页面样式属性

+ 声音样式属性

  + pause-befor  : 

  + pause-after 

  + ...

    

    

#### 2.4.2 可以继承的属性



+ 字体系列样式

  + font
  + font-family
  + font-weight
  + font-size
  + font-style
  + font-variant :设置小型大写字母的字体显示文本（相对的）
  + font-stretch ：对当前的font-family 进行伸缩变形
  + font-size-adjust : 为某个元素规定一个 aspect值，这样就可以保持首选字体的 x-height

+ 文本系列属性

  + text-indent  : 文本缩进

  + text-align : 文本水平对齐

  + line-height : 行高

  + word-spacing ： 增加或者减少字符间的空白（字间隔）

  + letter-spacing ：字符间距

  + text-transform ： 控制文本大小写

  + direction ： 规定文本的书写方向

  + color

    

+ 元素的可见性 visibility

+ 表格布局属性

+ 列表布局属性

  + list-style-type
  + list-style-image
  + list-style-position

+ 生成内容属性

  + quotes

+ 光标属性

  + cursor

+ 页面样式属性

  + page
  + page-break-inside
  + windows
  + orphans

+ 声音样式属性

  + speak
  + speak-punctuation
  + speak-numeral
  + speal-header
  + ...



### 2.5 css的盒子模型

width  height
padding
border
margin

#### 2.5.1 传统css盒子模型





##### 2.5.1.1`padding`

内边距会影响盒子的大小





##### 2.5.1.2`boder`

边框会影响盒子的大小

+ 边框设置时需要设置 ` border-width`  `border-style` `border-color`,缺少则失效



##### 2.5.1.3 `margin`

不影响盒子大小



- margin重叠规则：取较大的margin的值（不会相加）

  ```html
  <div class="box1"></div>
  <div class="box2"></div>
  
  
  <style>
  	 /*1. margin重叠规则 */
      .box1{
        background-color: aqua;
        margin-bottom: 20px;
      }
  
      .box2{
        background-color:sandybrown;
        margin-top: 50px;
      }
  </style>
  ```

  

  > ![1567653151226](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1567653151226.png)

- margin的兼容处理

  ```html
  <div class="outer">
      <div class="inner"></div>
   </div>
  
  <style>
  	 /*2. margin-top的传递问题*/
      /*大盒子里边嵌套小盒子，给小盒子设置margin，
        效果没实现，
      结果整体盒子下移动
      */
  
  /*解决方案一：overflow:hidden*/
      .outer{
        width: 200px;
        height: 200px;
        background-color:greenyellow;
        /*父级盒子加上overflow:hidden,解决子盒子 margin-top传递的问题，实现父子分离*/
        /*注意：此处并不表示溢出隐藏，表示的是解决margin传递*/
        overflow: hidden;
      }
  
    /*解决方案二：给父级元素设置padding-top值*/
    .outer{
        width: 200px;
        height: 199px;
        background-color:greenyellow;
       	 padding-top:1px;
      }
    
    /*解决方案三：给父级元素设置	 border-top的值*/
    .outer{
        width: 200px;
        height: 199px;
        background-color:greenyellow;
       	 border-top:1px solid transform;/*透明最优，也可设置为跟父元素一样的颜色*/
      }
    
    
    .inner{
        background-color:red;
        margin-top: 10px;
     }
    
    /*解决方案四：给父级元素设置	padding值，撑开，子元素不需要设置margin的值*/
    .outer{
        width: 200px;
        height: 190px;/*缺点*/
        background-color:greenyellow;
       	padding-top:10px;/*缺点*/
      }
  
  
      .inner{
        background-color:red;
        /* margin-top: 10px; */
      }
  </style>
  ```

  

`margin取负值实现特殊需求`





##### 2.5.1.4 css盒子模型的计算

元素实际宽度 = width+padding+border
元素实际高度 = height+padding+border

> 注意：border生效 需要三个条件，单一设置不生效

#### 2.5.2 css3新增的盒子模型

box-sizing:border-box

> width = 内容宽  + padding + border
>
> height = 内容高 + padding + border







### 2.6 background

#### 2.6.1 background-color

> 1. 可简写为 background
> 2. background-color不可继承
> 3. 默认值 transform
> 4. background-color：inherit指定背景颜色（从父元素继承）



#### 2.6.2 background-image

> 1. background-image:url()
> 2. 缩写 background:url()
> 3. 默认值none
> 4. inherit 指定背景图像应该从父元素继承
> 5. background-image属性不能继承
> 6. 可以放多字背景图，从左上角重复



技巧

```html
<h1><a>文字文字，关键字</a></h1>

  <style>
    logo a{
  			display:block;
  			background-image:url(...);
  			text-indent:-9999px;/*让文字内容消失在视野中（文字还存在在html文档中）				*/
			}
  </style>
    

```



#### 2.6.3  background-repeat

> 背景平铺
>
> 1. 默认 repeat-x ,repeat-y
> 2. background-repeat：no-repeat
> 3. background-repeat：repeat-x    | repeat-y
> 4. 符合简写  background：url(...) no-repeat



#### 2.6.4 background-position

> 设置背景图像的起始位置
>
> 1. 左上角为0 0
> 2. background-position:x y
> 3. left top right bottom center(只出现一个位置，效果是center)
> 4. x%,y% （如果值设定了一个值，其他值将是50%，默认是 0% 0%）
> 5. inherit 指定background-position设置应该从父元素继承
> 6. 可以缩写background





#### 2.6.5 background-attachment

> 背景关联
>
> 1. 【默认值】scroll 背景随着页面的滚动而滚动
> 2. fixed 背景固定，不会随着页面的滚动而滚动





#### 2.6.6 background-size

> 设置背景图片的尺寸大小
>
> 1. length （不允许负数）
>
> 2. percentage  百分比（不允许负数值）
>
> 3. auto  背景图片的真实大小
>
> 4. cover 将背景图片等比缩放（撑满盒子大小，背景图可能显示不全）
>
> 5. contain 将背景图 等比缩放到宽度或高度与容器的宽度和高度相等，背景图始终被包含在容器内（背景图始终完全显示）
>





#### 2.6.7 background-clip

>  背景图片的裁剪
>
> 1. context-box;从内容区域之外开始裁剪（从内容区域之外裁剪，裁剪掉的是内边距和边框线）
> 2. padding-box;从内边距之外开始裁剪（不包括内边距，裁剪掉的是边框区域）
> 3. border-box      从边框线之外开始裁剪，不包括边框线



#### 2.6.8 background-origin

> 背景图的起始位置（原点）
>
> 1. context-box   从内容区域开始
> 2. border-box    从边框区域开始
> 3. padding-box   从内边距区域开始



#### 2.6.9 背景图的复合属性 background

> background:background-color background-img background-repeat background-posotion background-attachment



CSS3新增的属性

> background-size  不能简写
>
> background-clip  不能简写
>
> background-origin  不能简写





### 2.7 overflow:hidden的三个作用

#### 2.7.1 内容溢出隐藏

```css
.box{
   /*固定显示区域为 250*30*/
  width:250px;
  height:30px;
  /*超出部分隐藏*/
  overflow:hidden;
}
```



#### 2.7.2 清除浮动带来的影响

```css
.warp{
  /* width:200px;
  height:200px; */
  border: 2px solid red;/*效果不生效*/
  /*注意：
    设置了父元素的宽高，不需要加overflow:hidden
    没有设置父元素的宽高，需要加   overflow:hidden
  */
  overflow: hidden;
}

.box1{
  width:50px;
  height:50px;
  background:green;
  float:left;
}
.box2{
  width:50px;
  height:50px;
  background:yellow;
  float:left;
}
```

#### 2.7.3 解决margin-top传递问题

```css

.outerBox{
  width:200px;
  height:200px;
  background:green;
  /*目的:内外盒子之间有10px的上内边距*/
  overflow: hidden;
}

.innerBox{
  width:50px;
  height:50px;
  background:aquamarine;
  /*目的:内外盒子之间有10px的上内边距*/
  margin-top: 10px;
}
```



### 2.8 float

float的值：`left`、`right`、`none`、`inherit(继承父元素的float的值)`

#### 2.8.1 float元素的特点

> 1. 浮动元素在一行显示
> 2. 设置属性为left时，浮动元素会依次从父级盒子的左侧向右排布，right相反
> 3. 浮动元素自动具有块级元素的属性
> 4. 浮动元素脱离文档流
> 5. 浮动元素内的子元素，不会继承浮动属性
> 6. 浮动元素下面的元素不能识别浮动元素的高度和位置【浮动元素不能识别非浮动元素的高度，所以会漂浮在非浮动元素之上】



#### 2.8.2 文档流和脱离文档流

+ 文档流：指的是元素排版布局的过程中，元素会自动从左至右，从上往下的流式排列。并最终窗体自上而下分成一行行，并在每行中从左至右的顺序排放元素；
+ 每个`非浮动`块级元素都独占一行，浮动元素则按规定浮在行的一段。若当前行内容不下，则另起新行再浮动
+ 内联元素也不会独占一行；几乎所有元素（包括块级，内联和列表元素）均可生成子行，用于摆放子元素
+ 标准文档流等级：分为两个等级，块级元素和行内元素
+ 脱离文档流：文档流内的正常元素识别不到这个元素了（脱离了文档流元素相当于平行漂浮在文档流之上）



#### 2.8.3 float的影响

【脱离文档流不识别高度】

+ 给父元素设置背景颜色不起作用
+ 给父元素设置border属性不起作用
+ 给父元素设置padding属性不起作用



清浮动产生的影响

+ 方式一：给父元素设置高度`height`【不推荐】

+ 方式二：父元素设置 `overflow:hidden`

+ 方式三：浮动元素的父元素结束标签之前加一个具有块级元素特点的空标签，并给这个空标签元素设置样式属性 `clear:both`

  ```html
  <div class="warp">
  	<div class="leftBox"></div>
    <div class="rightBox"></div>
    <!--这个位置-->
    <div style="clear:both"></div>
  </div>
  ```

  

+ 方式四：clearfix 伪元素清除浮动

  ```html
  <div class="warp">
  	<div class="leftBox"></div>
    <div class="rightBox"></div>
    <!--这个位置会生成一个占位的 ：after的标签-->
    
  </div>
  
  <style>
    .warp:after{
      display:block;/*确保是块级元素*/
      clear:both;
      content:"";/*必须写：设置伪元素:befor和:after 天生自带的属性*/  
      
       /*比较齐全的写法*/
    		height:0;/*防止低版本浏览器中height:1px默认效果*/
    		font-size:0;
    		overflow:hidden;
    		visibility:hidden;/*让所有可见性的元素隐藏*/
    } 
  </style>
  ```

  固定代码

  ```css
  clearfix：after{
    display:block;
  	clear:both;
  	content:"";
  	height:0;
  	font-size:0;
  	overflow:hidden;
  	visibility:hidden;
  }
  /*兼容IE低版本hack写法*/
  clearfix{
    *zoom:1;/*css hack*/
  }
  ```

  哪里需要清浮动就往哪里的父元素增加这个样式类即可

  兼容IE低版本hack写法

  ```css
  clearfix{
    *zoom:1;/*css hack*/
  }
  ```








#### 2.8.4 `clear:both`的特点

+ 元素是块级元素
+ 元素不能带有浮动属性
+ 元素必须放在最后一个浮动元素的后面
+ 用户是看不到这个元素的





### 2.9 定位`position`

取值 ：left、right、top、bottom



#### 2.9.1 `position:absolute`

> `position : absolute`绝对定位的特点
>
> + 脱离文档流
> + 可以设置参照物，参照物必须是其父级元素（直系父级），如果直接父级元素没有，就会一直向上查找，直到找到最外层的根元素为止；
> + 有宽高的情况下：
>   + `top`和`bottom`同时有值，`top`生效
>   + `left`和`right`同时有值，`left`生效
> + 没有宽高的情况下：
>   + `top`和`bottom`同时有值，会将这个盒子拉大，上下值都起作用
>   + 左右同理
> + 可以设置层级关系`z-index`属性
> + 相对参照我只要是定位元素就可以（绝对定位，相对定位，固定定位）
>   优先选择相对定位（绝对定位和固定定位都会脱离文档流，不占位）





#### 2.9.2 `position:relative`

`position:relative`相对定位的特点

> 1. 不会脱离文档流
> 2. 可以设置上下左右四个方位，但是同时设置，只听左和上
> 3. 参照物：自己本身
> 4. `z-index`改变层级关系（依赖定位元素，如果不是定位元素不起作用）
> 5. 任何元素都可以设置相对定位属性
> 6. 相对定位元素位移发生变化，但元素原来的位置不会被占用，其他元素还是正常识别这个元素原来的位置

#### 2.9.3 `position:fixed`

 `position:fixed`固定定位的特点

> 1. 脱离文档流
> 2. 可以设置上下左右四个方位值
> 3. 参照物：整个浏览器窗口
> 4. 通过`z-index`改变层级



### 2.10 `z-index`

 `z-index`属性的特点

> 1. 默认是书写顺序在后的定位元素覆盖在顺序前的定位元素
>2. 可以使用z-index属性修改定位元素的层级关系
> 3. 所有定位元素的z-index默认值都是一样的
>4. z-index值支持负数，没有单位，默认值为0
> 5. 一般都是同级元素进行层级比较
>6. z-index属性不会继承
> 



**z-index属性有作用必须跟定位一起使用**





### 2.11 基线对齐 vertical-align

定义

> vertical-align 属性设置元素的垂直对齐方式。



值

> baseline			默认。元素放置在父元素的基线上。
>
> sub				 垂直对齐文本的下标。
>
> super			   垂直对齐文本的上标
>
> text-top			把元素的顶端与行中最高元素的顶端对齐
>
> middle			  把元素的顶端与父元素字体的顶端对齐
>
> bottom
>
> text-bottom
>
> length
>
> %
>
> inherit



## 3 实战

### 3.1 布局



#### 3.1.1 行布局

1. 水平居中布局效果

```html
<div class="container">内容内容</div>
<style>
	.container{
      margin: 0 auto;/*水平居中*/
      width: 1200px;
      height: 2500px;
      background: cyan;
    }
</style>
```



2. 水平居中并且自适应

```html
<div class="container">内容内容</div>
<style>
	.container{
      margin: 0 auto;
      width: 90%;/*自适应水平居中*/
      max-width: 1000px;
    
      height: 2500px;
      background: cyan;
    }
</style>
```



3. 水平垂直居中

```HTML
<div class="container">内容内容</div>
<style>
	 .container{
      width:1000px;
      height: 200px;
      background: cyan;

      /*使用绝对定位*/
      position: absolute;
      left: 50%;
      top: 50%;
      /*移动container盒子的，使其在居中的位置*/
      margin-top:-100px;
      margin-left: -500px;
    }
</style>
```



4. 行布局之固定宽度

```html
<header>头部</header>
<nav>导航</nav>
<section>内容</section>
<footer>脚部</footer>

 <style>
   body {
      margin: 0;
      padding: 0;
    }

    header {
      margin: 0 auto;
      width: 1000px;/*固定宽度*/
      height: 50px;
      background: darkblue;
    }

    nav {
      margin: 0 auto;
      width: 1000px;/* 固定宽度 */     
      height: 250px;
      background: greenyellow;
    }

    section {
      margin: 0 auto;
      width: 1000px;/*固定宽度*/
      height: 500px;
      background: sandybrown;
    }

    footer {
      margin: 0 auto;
      width: 1000px;/*固定宽度*/
      height: 150px;
      background: green;
    }
  </style>
```

5. 行布局之某部分自适应

```html
<header>头部</header>
<nav>导航</nav>
<section>内容</section>
<footer>脚部</footer>

 <style>
   ...
    nav {
      margin: 0 auto;
      /* width: 1000px;固定宽度 */
      /*固定宽度改为自适应宽度*/
      width: 100%;
      
      height: 250px;
      background: greenyellow;
    }

   ...
  </style>
```

6. 行布局之随屏幕滚动

```html
<header>头部</header>
<nav>导航</nav>
<section>内容</section>
<footer>脚部</footer>

 <style>
   header {
      margin: 0 auto;
      width: 1000px;/*固定宽度*/
      height: 50px;
      background: darkblue;
      
      position:fixed;  
   }
    
   ...
  </style>
```



####  3.1.2 列布局

1. 列布局之**定宽**两列布局

```html
<div class="container">
    <div class="leftBox">左侧</div>
    <div class="rightBox">右侧</div>
 </div>
<style>
 	 ...
    .leftBox{
      width: 600px;
      height: 666px;
      background: #666666;
      float: left;
    }
    .rightBox{
      width: 800px;
      height: 999px;
      background: greenyellow;
      float:right;
    }
  </style>
```



2. 列布局之**自适应**两列布局

```html
<div class="container">
    <div class="leftBox">左侧</div>
    <div class="rightBox">右侧</div>
 </div>
<style>
  	...
    .leftBox{
      /* width: 600px; */
      width: 40%;
      height: 666px;
      background: #666666;
      float: left;
    }
    .rightBox{
     width: 60%;;
      height: 999px;
      background: greenyellow;
      float:right;
    }
```





3. 列布局之三列**定宽**布局

```html
<div class="container">
    <div class="leftBox">左侧</div>
    <div class="centerBox">中</div>
    <div class="rightBox">右侧</div>
 </div>
 <style>
   ...

    .leftBox{
      /* width: 600px; */
      width: 400px;
      height: 666px;
      background: #666666;
      float: left;
    }

    .centerBox{
      width: 400px;
      height: 666px;
      background: #335555;
      float: left;
    }

    .rightBox{
      width: 400px;
      height: 999px;
      background: greenyellow;
      float:right;
    }
  </style>
```



4. 列布局之三列**自适应**布局

```html
<div class="container">
    <div class="leftBox">左侧</div>
    <div class="centerBox">中</div>
    <div class="rightBox">右侧</div>
 </div>
<style>
    ...

    .leftBox{
      /* width: 600px; */
      width: 30%;
      height: 666px;
      background: #666666;
      float: left;
    }

    .centerBox{
      width: 50%;
      height: 666px;
      background: #335555;
      float: left;
    }

    .rightBox{
      width: 20%;
      height: 999px;
      background: greenyellow;
      float:right;
    }
  </style>
```



### 3.2 箭头和小三角效果

```css
.box{
  width:10px;
  height:10px;
  
  /*设定边框*/
  border-left:2px solid #ddd;
  border-top:2px solid #ddd;
  
  /*旋转即可*/
  transform:rotate(45deg);
  
}


.triangle{
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: red green yellow paleturquoise;

    /*去掉不需要的边框*/
    border-color: red  transparent transparent transparent; 
  }
```



### 3.3 实现多个元素在一行显示

```css
/*
      面试题：如何让多个元素在一行显示

      1.用display:inline,将元素设置为行内元素，【但是设置宽高不起作用】
      2. 用display:inline-block可以让元素在一行显示，【但是会受空格和换行的影响，产生默认间距】（IE6以下不兼容  需要给设置display:inline-block 同时设置 *display:inline;*zoom:1;）
      3. 使用 浮动  

      解决之道
      1> 去掉空格和换行符，让标签都在一行 【但是代码书写好恶心】
      2> 给display:inline-block的 父元素 增加一个属性 font-size:0;【但是，这个属性有传递性，其子元素的字体需要重新设置】


    */
    .warp {
      font-size: 0;
    }

    .innerBox1 {
      width: 200px;
      height: 200px;
      background: #666;

      display: inline;
      font-size: 20px;

      /*IE低版本的兼容写法*/
      *display: inline;
      /* css hack *IE 浏览器可识别*/
      *zoom: 1;
      /* 触发css hack的layout*/
    }

    .innerBox2 {
      width: 200px;
      height: 200px;
      background: #336963;

      display: inline;
      font-size: 15px;

      /*IE低版本的兼容写法*/
      *display: inline;
      /* css hack *IE 浏览器可识别*/
      *zoom: 1;
      /* 触发css hack的layout*/ 
    }
```





###  3.4 文本出现省略号

#### 3.4.1 单行文本出现省略号...

```css
/*四个必要*/
h2{
  height:30px;
  
  width:200px;
  overflow:hidden;
  white-space:nowrap;/*强制不折行*/
  text-overflow:ellipsis;/*文本隐藏方式*/
}

```



#### 3.4.2 多行文本出现省略号...

```css
/**/
p{
  height:30px;
  width:200px;
  /*多行文本出现...的方式*/
  /*主要应用于手机移动端*/
  display: -webkit-box;/*弹性盒子模型*/
  -webkit-box-orient:vertical/*规定元素的排列方式：垂直排列*/ /*去掉效果也生效*/
  -webki-line-clamp:2;/* 文字的行数*/
  overflow: hidden;
}
```







### 3.5 如何让元素消失在视野中



#### 3.5.1 `transfrom:translate`位移

#### 3.5.2 `opacity:0`

[0~1]

#### 3.5.3 `display:none` 





#### 3.5.4 ` height:0`和`overflow:hidden`



#### 3.5.5 `line-height:0`和`overflow:hidden(前提是height:0)`



#### 3.5.6 `visibility:hidden`



#### 3.5.7 `margin或padding`距设置足够大









