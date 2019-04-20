[TOC]

---



# CSS3

一级学习目标：学习一些样式属性和选择器

二级学习目标： ...





学习一些样式属性和选择器就差不多了

  [选择器]
    #ID
    .CLASS
    TAG
    *
    SELECTOR1,SELECTOR1... 群组选择器

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

