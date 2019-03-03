{
	var a = 0;

	function fun() {
		alert(a);
		var a = 10;
	}

	fun();
	alert(a);

	//分析
	// ====全局作用域下====
	// step1： 变量提升
	// 		   var a, function fun()
	// step2 : 赋值
	// 		   a = 0,fun = #FFF000 
	// step3 : 代码子上而下执行
	// 		fun();
	// 		形成私有函数作用域 #FFF111
	// 		 	形参赋值：无
	// 		 	变量提升： var a
	// 		 	赋值： a =undefined 
	// 		 	代码子上而下执行
	// 		 	aletr(a);//undefined
	// 		 	a=10；
	// 		 	此时如果再次输出 a ,则输出10
	// alert(a);//全局#FFF000 作用域下的a => 0
}

{
	let a = 0;
	let b = 0;

	function A(a) {
		A = function(b) {
			alert(a + b++);
		};
		alert(a++);
	}

	A(1);
	A(2);

	//analyze...
	//基于ES6
	//A(1)执行，形成一个私有函数作用域
	//	形参赋值： a=1
	//	代码自上而下执行
	//	A = 新的函数作用域  => function(b){...}
	//	alert(a++);//1 ,此时修改 A(1)函数作用域的a的值为2
	//	
	//A(2)执行， 形成一个私有函数作用域
	//	形参赋值： a=2
	//	代码自上而下执行
	//	A = 新的函数作用域  => function(b){...}
	//	alert(a++);//2 ,此时修改 A(1)函数作用域的a的值为3
}


{
	window.a = 1;
	let obj = {
		a: 10,
		fun: function() {
			this.a *= 2;
		}
	};

	obj.fun();
	let fun = obj.fun;
	fun();
	obj.fun.call(window);
	alert(window.a, obj.a);
}

{
	(function() {
		let val = 1;
		let json = {
			val: 10, //这个val 是json的属性，不是变量
			dbl: function() {
				val *= 2;
			};
		}
		json.dbl();
		aletr(json.val + val);
	})();

	//anaylze...
	//自执行函数执行，形成一个私有函数作用域
	// 变量赋值
	// 	var = 1
	// 	json = #FFF000
	//代码自上而下执行
	//	json.dbl();
	//		让dbl这个方法执行，函数中的this 是json
	//		val*=2;// 这个val是变量，json中没有这个变量，所以往上级作用域中找
	//		将自执行函数中的val 改为 2 
	//	
	//输出json.val => 10
	//输出val =>2
}