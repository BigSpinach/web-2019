{
  console.dir(Object);
  /*
    ƒ Object()
      arguments: (...)
      assign: ƒ assign()
      caller: (...)
      create: ƒ create()
      defineProperties: ƒ defineProperties()
      defineProperty: ƒ defineProperty()
      entries: ƒ entries()
      freeze: ƒ freeze()
      fromEntries: ƒ fromEntries()
      getOwnPropertyDescriptor: ƒ getOwnPropertyDescriptor()
      getOwnPropertyDescriptors: ƒ getOwnPropertyDescriptors()
      getOwnPropertyNames: ƒ getOwnPropertyNames()
      getOwnPropertySymbols: ƒ getOwnPropertySymbols()
      getPrototypeOf: ƒ getPrototypeOf()
      is: ƒ is()
      isExtensible: ƒ isExtensible()
      isFrozen: ƒ isFrozen()
      isSealed: ƒ isSealed()
      keys: ƒ keys()
      length: 1
      name: "Object"
      preventExtensions: ƒ preventExtensions()
      prototype: {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
      seal: ƒ seal()
      setPrototypeOf: ƒ setPrototypeOf()
      values: ƒ values()
      __proto__: ƒ ()
      [[Scopes]]: Scopes[0]
  */

}


//Object.is(a,b);
{
  //...
}

//Object.assign(obj1,obj2);
{
    let obj1 = "xxx";
		let obj2 = {a:2,b:2};
		let return_assign = Object.assign(obj1,obj2);
		console.log(return_assign);//{a: 2, b: 2}
		console.log(obj1);//{a: 2, b: 2}
		console.log(obj2);//{a: 2, b: 2}
		console.log(obj1===return_assign);//true
		console.log(obj2===return_assign);//false
}
