{

	let n = 1;
	let x = {
		n: 2,
		y: (function(n) {
			n = n || 3;
			return function(m) {
				m = m || 4;
				this.n += m++;
				n += ++m;
				console.log(n);
			}
		})(window.n) //=>把window下n这个属性的值赋值给私有变量n （window中没有n这个属性，所以传递的是undefined）
	};
	let z = x.y;
	x.y(5);
	z(6);
	console.log(n, x.n, window.n);
}