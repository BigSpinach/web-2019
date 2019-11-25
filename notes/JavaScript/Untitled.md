# 

严格 模式 主要 有 以下 限制。 
	·  变量 必须 声明 后再 使用。

​	·  函数 的 参数 不能 有同 名 属性， 否则 报错。 

​	· 不能 使用 with 语句。 

​	· 不能 对 只读 属性 赋值， 否则 报错。

​	 · 不能 使用 前缀 0 表示 八进制 数， 否则 报错。

​	 · 不能 删除 不可 删除 的 属性， 否则 报错。 

​	· 不能 删除 变量 delete prop， 会 报错， 只能 删除 属性 delete global[ prop]。

 	· eval 不会 在 它的 外层 作用域 引入 变量。

​	 · eval 和 arguments 不能 被 重新 赋值。

 	· arguments 不会 自动 反映 函数 参数 的 变化。

​	 · 不能 使用 arguments. callee。 

​	· 不能 使用 arguments. caller。 

​	· 禁止 this 指向 全局 对象。 

​	· 不能 使用 fn. caller 和 fn. arguments 获取 函数 调用 的 堆栈。

​	 · 增加 了 保留 字（ 比如 protected、 static 和 interface）。

