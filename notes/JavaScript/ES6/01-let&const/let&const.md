#  let & const

var let const

es6  -> es5 babel





var 声明变量的缺点

1. `var`声明的变量默认到`全局作用域 `， 全局作用域  `函数作用域`

   `{}` 作用域+   `let `实现一个`块级作用域`

2. 用`var `声明的变量会导致变量提升 `var `、`function`、 `import`

   用`let`声明的变量会绑定到`当前作用域`  `暂存死区`

3. `var a = 1` `var a = 2; `使用let 可以保证我的代码命名不重复

4. `var` 声明的变量可以更改 `ar a = 1`、` a =100`

5. 自执行函数可以解决作用域问题

6. js 事件 不要用var





