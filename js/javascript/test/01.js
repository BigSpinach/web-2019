{
	if ('m' in window) {
		var m = m && 12;
	}
	console.log(m);

	//1. 条件判断下的变量提升不管条件是否成立，都会变量提升
	//=> step1 : 变量提升 var m
	//=> step2 : 变量赋值 m=undefined
	//=> step3 : 代码自上而下执行
	//	'm' in window  //true
	//	 m = m && 12,
	//	 console.log(m);//undefined
}

/*-------------------*/
{
	let n = 1;
	if (!('n' in window)) {
		let n = n + 2;
	}
	console.log(n);

	//let 定义的变量不存在变量提升
	//let 不允许重复定义
	//let 块级作用域
	// let n=1;// => 这句话是在当前作用域常见一个n，跟window没有关系
	// 所以 'n' in window 返回false，
	// 在
	// 	{
	// 		let n =n+30;
	// 		变量是基于let 创建的，所以，这个作用域中的n是私有的，
	// 		第一步执行 n+30,发现没有n ，所以报错
	// 	}
}


{
	let n = 1;
	let m = 2;
	~ function(n, m) {
		//形参赋值
		//n=2，mudefined
		//此时 arg=[0:2,length:1]  ---注意，此时m没有和arg建立起映射关系，所以后边即使给arg中增加任何值都不会跟m有关系的
		//
		let arg = arguments;

		arg[0] = n || 100;
		//arg[0]=2||100;  => arg[0]=2
		arg[1] = m || 200;
		//arg[1] = undefined||200; => arg[1]=200
		//这里既是操作了arg也不会再跟m建立映射关系了，映射关系的建立是在形参赋值阶段完成的
		console.log(n, m); //2 undefined
	}(m);
	console.log(n, m); //1,2
}

{
	let ary = [1, 2, 3, 4, 5];
	(function(ary) {
		//形参赋值
		//ary =[1,2,3,4,5];//注意：这里给的是全局ary的地址
		ary.pop();
		//ary =[1,2,3,4];//修改的是全局的ary
		ary = ary.slice(0);
		//slice(0);相当于复制一份，返回一个新数组，跟之前的数组没关系
		//
		ary.shift();
		//ary =[2,3,4];
		console.log(ary); //[2,3,4]
	})(ary);
	console.log(ary); //[1,2,3,4];
}

{
	var n = 0;
	var fn = function() {
		this.n *= 2;
		n++;
		return function(m) {
			n += ++m;
			console.log(n);
		}
	};
	var f = fn(2);
	f(3);
	fn(3)(4);
	f(4);
	console.log(n);

	//step1 => 变量提升
	//	var  n ，f;function fn
	//
	//step2 => 赋值
	//	n=0
	//	fn= #FFF000
	//	f = fn(2) 的执行结果也是一个引用类型数据
	//
	//step3 => 代码自上而下执行
	//	f(3);
	//	也就是 
	/*fn = function() {
		this.n *= 2;
		//this=window 
		//n=0
		n++;
		//n=1
		return function(m) {
			//f(3);
			//形参赋值 m=3
			//n还是全局下的n，
			//1+1+3=5
			//全局下的n=5
			n += ++m;
			console.log(n);//5
		}
	};
	*/
	//		
	//f(4)
	//	
}


{
	let i = 2;
	let fn = function(n) {
		i *= 2;
		return function(m) {
			i -= (n--) + (++m);
			console.log(i);
		}
	};
	let f = fn(1);
	f(2);
	fn(3)(4);
	f(5);
	console.log(i);

	//let
	//ES6此法解析
	//f = fn(1)
	/*	
		let fn = function(n) {
			//形参赋值 n=1
			i *= 2;
			//i是上级作用域的i=2
			//修改上级作用域的 i = 4
			return function(m) {
				i -= (n--) + (++m);
				console.log(i);
			}
		};
	*/

	//f(2);
	//
	/*
		function(m) {
		//形参赋值
		// m =2;
		//i是上上级作用域下的i
		//修改上上级作用域下的i,
		//修改上级作用域下的n（n--）,上级作用域下的n变成0
		//			1	+	3
			i -= (n--) + (++m);
			//i=4-(1+3)=0
			console.log(i);//0
		}
	 */
	//fn(3)(4);
	// 0-= (n--)+(++m)
	// 0-(3+5)=-8
	// 全局下i=-8
	
	//f(5);
	//		0--		++5
	//i -= (n--) + (++m);
	//i=-8-(0+6)=-14
}