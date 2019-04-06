{
	var Fn = function(){
		
		//...
		//在这里需要返回Fn的一个实例
		
		//return new Fn.prototype.init();
		return new Fn.prototype.init();
	};

	
	Fn.prototype = {
		constructor: Fn,
		aa:function(){
			console.log('aaa');
		}
		
	};
	Fn.prototype.init = function (){
	};
	
	Fn.prototype.init.prototype= Fn.prototype;

	console.dir(Fn);
	//Fn.prototype.aa();
	//Fn().aa();
	//Fn() 指向 Fn.prototype即可
	Fn().aa();

	//问题 ，这样让aa()执行
	//
	//问题解析，
	//能够让aa方法执行，说明？.aa()  方法前边？是Fn的一个实例
	// 所以...
	// 解决办法就是 Fn()执行，可以创建一个Fn的实例对象
	// 如何解决呢，让Fn这个构造函数返回一个Fn的实例即可
	// 
}

console.log('--------');
{
	var Fn = function(){
		return new Fn.prototype.init()
	};
	Fn.prototype = {
		constructor:Fn,
		aa:function(){
			console.log('aaa');
		},
		init:function(){}
	};
	Fn.prototype.init.prototype = Fn.prototype;


	var f= new Fn();
	f.aa();
	Fn().aa();
}