{
	let m =20;
	let Fn = function(n,m){
		this.n = n;
		this.aa = function(){
			console.log(this.n+(++m));
		}
	}

	Fn.prototype.bb = function(){
		console.log(this.n+m);
	};

	let f1 =new Fn(10,20);
	Fn.prototype = {
		cc: function(){
			console.log(this.n+m);
		}
	};

	let f2 = new Fn(30);
	console.log(f1.constructor === f2.constructor);
	f1.aa();
	f1.bb();
	f1.cc();
	f2.bb();
	f2.cc();
	f2.__proto__.cc();



	/*
		分析：
		
	 */
}