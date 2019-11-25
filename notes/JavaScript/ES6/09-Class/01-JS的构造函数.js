function MathHandle(a,b){
  this.a=a;
  this.b=b;
};
MathHandle.prototype.add = function (){
  return this.a+this.b;
};

var m = new MathHandle(2,3);
console.log(m.add());//5