[TOC]

---



# CSS3

一级学习目标：学习一些样式属性和选择器

二级学习目标： ...





## 1. CSS基础

### 1.1 `css简介`

> CSS （层叠样式表） 编辑
>  层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。

> CSS 能够对网页中元素位置的排版进行像素级精确控制，支持几乎所有的字体字号样式，拥有对网页对象和模型样式编辑的能力。 



### 1.2 基础语法

![1556509355629](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556509355629.png)





### 1.3 命名规范

![1556509374813](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556509374813.png)





### 1.4  css引入方式

#### 1.4.1  行内式

```html
<style>
	p{
		width:250px;
		height:250px;
	}
</style>
```

#### 1.4.2 外链式

```html
<link href="../css/index.css">
```



#### 1.4.3 导入式

![1556509802589](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556509802589.png)

```html
<style>
/*通过 @import url(xxx.css)的方式导入*/
  @import url(xxx.css)

</style>
```





#### 1.4.4 link和import的区别

![1556509909318](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556509909318.png)



## 2. CSS选择器

![1556510081676](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556510081676.png)



### 2.1 基本选择器

- `标签选择器`
- `class（类名）选择器`
- `id选择器`
- `"*"通配符选择器`

### 2.2 并集选择器 “，”

+ 样式相同的标签可以并列写在一起  例如（h1,p,div）

```css
p,div,h2{
  /*共同拥有的样式*/
}
```



### 2.3 交集选择器 “c1c2”

```css
p.class1{
  /*交集选择器，无空格*/
}
```



### 2.4 后代选择器 " 空格" 

```css
.main p{
  /*样式名为main下的 p元素（子子孙孙都算）*/
}
```



### 2.5 子代选择器“>”

```css
.main p{
  /*样式名为main下的 p元素（只是儿子）*/
}
```





### 2.6 相邻兄弟选择器 “+”以及所有兄弟选择器 “~”

```css
/*相邻兄弟选择器*/
p+span{
  /*找到p元素相邻的span元素*/
}
```



```css
/*所有兄弟选择器*/
p~span{
  /*找到p元素所有的同级兄弟元素*/
}
```

### 2.7 属性选择器 [属性名]

### ![1556511000771](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556511000771.png)

```css
input[type='text']{
  /**/
}
```

### 2.8 伪类选择器

![1556511150887](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556511150887.png)

![1556511155642](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556511155642.png)







### 2.9 css3新增的伪类选择器



#### 2.9.1 `:not`

![1556511170402](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556511170402.png)

#### 2.9.2  :last-child

#### 2.9.3  :nth-child(number)

#### 2.2.9.4 :only-child 只有一个子元素的元素



#### 2.2.9.5 :nth-last-child(n) 倒数第几个元素



#### 2.2.9.6 :first-of-type 同级别的第一个元素

#### 2.2.9.7 :last-of-type 同级别的最后一个元素

#### 2.2.9.8 :only-of-type 只有一个兄弟（独苗）的元素

#### 2.2.9.9 :nth-of-type(n)  第n个同级兄弟元素

#### 2.2.9.10 :nth-last-of-type(n)  倒数第n个同级兄弟元素

#### 2.2.9.11 :empty 空内容的元素

#### 2.2.9.12 :checked 被选中 主要用在input的表单元素





### 2.10 伪元素选择器

![1556511485718](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556511485718.png)

####2.10 .1   :first-line  第一行起作用
####2.10 .2  :first-letter  第一个文字内容
####2.10 .3  :before  在元素之前添加
####2.10 .4  :after 在元素之后添加

```css
li:after{
  display:block;/*这个必须写，否则 设置的宽度不起作用*/
  content:'';/*这个必须写，否则 ：after不起作用*/
  width:250px;
  height:20px;
  background:red;
}
```

## 3. css的核心规则

### 3.1 权重

![1556511792550](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1556511792550.png)



修改权重

```css
.class1{
  !import ;
}
```





### 3.2 属性继承

### 3.3 background属性的使用技巧

### 3.4 雪碧图

### 3.5 常见兼容模式的处理







学习一些样式属性和选择器就差不多了

  [选择器]
```
A .B{} 后代
A.B{} 既具备A也具备.B的（同级二次筛选）
A>B{} 子代
A+B{} 下一个弟弟
A~B{} 兄弟

A[NAME=''] 属性选择器 NAME!='' / NAME^='' / NAME$='' / NAME*='' ...

A:HOVER
A:ACTIVE
A:VISTED
A:AFTER
A:BEFORE

A:NTH-CHILD
A:NTH-LAST-CHILD
A:NTH-OF-TYPE
A:NTH-LAST-OF-TYPE
A:NOT
A:FIRST-CHILD
A:LAST-CHILD

...
```

  [样式属性]
    1.基本常用的
      border-radius
      box-shadow
      text-shadow

```
2.背景的
  background -color / -image / -position / -repeat / -attachment / ...

  background-size：
       100px 100px  宽高具体值
       100% 100%  宽高百分比（相对于所在容器）
       cover  以合适的比例把图片进行缩放(不会变形)，用来覆盖整个容器
       contain 背景图覆盖整个容器（但是会出现，如果一边碰到容器的边缘，则停止覆盖，导致部分区域是没有背景图的）
       ...

  background-clip: 背景图片裁切
      border-box	=> 背景被裁剪到边框盒。
      padding-box	=> 背景被裁剪到内边距框。
      content-box	=> 背景被裁剪到内容框。

  background-origin：设置背景图的起始点
      border-box
      padding-box
      content-box

  ...

  filter

3.CSS3动画和变形(2D/3D)

  //=>变形不是动画
  transform:
     translate(X|Y|Z)  位移
     scale 缩放
     rotate 旋转
     skew 倾斜
     matrix 矩阵(按照自己设定的矩阵公式实现变形)
  transform-style:preserve-3d 实现3D变形
  transform-origin：变形的起点
  transform-origin： left top;//从左上角开始缩放

  //=>过渡动画
  transition:
     transition-property:all/width... 哪些属性样式发生改变执行过渡动画效果，默认ALL，所有样式属性改变都会执行这个过渡效果
     transition-duration:过渡动画的时间，我们一把都用秒，例如：.5s
     transition-timing-function:动画运动的方式 linear(默认) ease ease-in ease-out ease-in-out cubic-bezier(执行自己设定的贝塞尔曲线)
     transition-delay:设置延迟的时间,默认是0s不延迟,立即执行动画
     ...

  //=>帧动画
  animation：
     animation-name 运动轨迹的名称
     animation-duration 运动的时长
     animation-timing-function 运动的方式(默认ease)
     animation-delay 延迟时间
     animation-iteration-count 运动次数(默认1  infinite无限次运动)
     animation-fill-mode 运动完成后的状态（帧动画完成后，元素会默认回到运动的起始位置，如果想让其停留在最后一帧的位置，设置这个属性值为forwards；backwards是当前帧动画如果有延迟时间，在延迟等待时间内，元素处于帧动画的第一帧位置；both是让帧动画同时具备forwards和backwards）
     ...

  //=>设置帧动画的运动轨迹
  @keyframes [运动轨迹名称] {
    from{
       //开始的样式
    }
    to{
       //结束的样式
    }
  }

  @keyframes [运动轨迹名称] {
     0%{
        //开始的样式
     }
     50%{}
     100%{
        //结束的样式
     }
  }

4.CSS3中的新盒子模型
  box-sizing: border-box / padding-box / content-box（默认值） 改变的就是我们在CSS中设置的WIDTH/HEIGHT到底代表啥  border-box让其代表整个盒子的宽高，当我们去修改PADDING或者BORDER，盒子大小不变，只会让内容缩放

  columns：多列布局

  flex：弹性盒子模型

5.一些其它的CSS3属性
  perspective:视距 实现3D动画必用的属性
  @media:媒体查询 实现响应式布局的一种方案
  @font-face:导入字体图标
  ...
```



## 4 CSS3的核心



### 4.1 `transform`  变形



【传统2D变形效果】



> + transrorm-origin 旋转的基准点
>+ translate 位移
> + translate(x,y)
>  
> + translateX()
>  
> + translateY()
>
>     
>
> +  scale 缩放
>
>   + scale(1.5)//整体放大1.5倍
>   + scaleX（）
>   + scaleY（）
>
> + rotate 旋转
>
>   + rotate(45deg);//默认沿着垂直于屏幕的z轴旋转
>   + rotateX()
>   + rotateY()
>
> + skew 倾斜
>
> + metrix 矩阵
>
> + ...



【3D效果】

`transform-style` 如何在3D空间中呈现被嵌套的元素

> + flat[平坦的]: 子元素将不保留其3D 位置(默认值)
> + preserve-3d: 子元素保留其3D位置
>
> 额外设置 transform-style:preserve-3d;

【变形的基准点】

transform-origin

> transform-origin: 设置旋转元素的起始位置
>
> + x-axis: left center right length % (50%)
> + y-axis:top center bottom length % (50%)
> + z-axis:length (0)



【3D效果的实现】

第一步：给要实现3d效果的元素所在的盒子设置视距

```css
.box{
    ...
    /*实现3D效果需要给当前元素所处盒子容器设置视距（1000-2000px）之间。不设置的话效果就相当去人眼睛贴着当前元素观看，看不出3d效果*/
    perspective:1000px;
}
```

第二步：给当前元素设置 3d变形效果

```css
.box img{
    ...
    /*设置3d模式实现效果*/
    transform-style:preserve-3d;
    /*设置3D旋转的角度*/
    transform:rotateX(45deg) reotateY(45deg)；
}
```



### 4.2 `animation` 动画

默认值 animation：none 0 ease 0 1 normal

`animation` 常用属性

> + animation-name:运动轨迹的名称
>
>   ​	(@keyframes 运动名称)
>
> + animation-duration:完成动画的总时间
>
>   ​	1s
>
> + animation-timing-function：运动的动画
>
>   ​	linear
>
>   ​	ease-in :加速运动
>
>   ​	ease-out：减速运动
>
>   ​	ease：非匀速运动
>
> + animation-delay： 延迟运动的时间
>
>   ​	0 :默认值
>
> + animation-iteration-count：动画运动的次数
>
>   ​	number
>
>   ​	infinite
>
> + animation-direction：规定是否应该轮流反向播放动画。
>
>   ​	normal （吹泡泡效果）
>
>   ​	alternate（反弹效果）
>
> + animation-fill-mode:设置动画状态
>
>   ​	none：无任何状态设置（默认值）
>
>   ​	forwards：动画完成后会停留在最后一帧的位置，（如果不设置，动画结束后会回退到其实位置）【oBox设置的是从A->B,不设置这个属性的话，动画到达B位置结束动画后又会自动回到 A位置】
>
>   ​	backwards：只有在动画有延迟时间的时候才有用，当动画在延迟时间内，让运动的元素在运动的第一帧位置等待【元素在0位置，设置动画在 10-100，不设置这个属性，动画会在等待时间结束后直接从0蹦到10，然后开始动画】
>
>   ​	both：同时具备forwards和backwords
>
>   ​	





### 4.3 `transition`  过渡

【语法】

```css
transition: property duration timing-function delay;
```



[定义和用法]

```css
/*默认值*/
transition:all 0 ease 0;
```

> `transition `属性是一个简写属性，用于设置四个过渡属性：
>
> + transition-property     规定设置过渡效果的 CSS 属性的名称。
> + transition-duration     规定完成过渡效果需要多少秒或毫秒。
> + transition-timing-function     规定速度效果的速度曲线。
> + transition-delay     定义过渡效果何时开始。



### 4.4 border-radius

语法

> border-radius: 1-4 length|% / 1-4 length|%;

四个方向的宽高

```css
border-radius: 1px;
/*等价于*/
border-top-left-radius:1px|1px;
border-top-right-radius:1px|1px;
border-bottom-right-radius:1px|1px;
border-bottom-left-radius:1px|1px;
/*上边框的 圆角边框 宽度为1px，高度1px*/
```



### 4.5 linear-gradient

+ linear-gradient（[<起点>|| <角度>，]？<点>，<点>，...）
+ 只能用在背景上
+ 颜色是沿着一条直线轴变化
+ 参数
  + 起点
    left 、top、left top
  + 角度
    xxx deg
  + 点
    red 50%
+ 重复线性渐变 repeating-linear-gradient





### 4.6  radial-gradient 

 ![1569404439632](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1569404439632.png)



### 4.7 box-shadow 盒子阴影

![1569404625391](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1569404625391.png)

### 4.8 text-shadow 文本阴影

![1569404832223](C:\Users\82113\AppData\Roaming\Typora\typora-user-images\1569404832223.png)