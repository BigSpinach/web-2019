[TOC]

---



# jQuery

> `jQuery `非常优秀的JS“类库”
>
> 基于原生JS封装的一个类库，提供了很多的方法，而且这些方法是兼容所有浏览器的



JQ版本

>  *    V1 (常用) 1.8.3  1.9.3  1.11.3
>  *    V2
>  *    V3

## 1. jQuery 的核心结构

```javascript
(function () {
    var version = "1.11.3";
    var jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);//=>创建了init这个类的实例，也相当于创建了jQuery这个类的实例（因为在后面的时候，让init.prototype=jQuery.prototype）
        };

    //=>JQUERY是一个类，在它的原型上提供了很多的属性和方法，供JQ的实例调取使用
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,//=>当前类的原型重定向后,自己开辟的堆内存中是没有CONSTRUCTOR的，需要手动增加保证它的完整性
        filter:function(){

        },
        ...
    };
         //=>给JQ原型上增加EXTEND方法，同时把JQ当做一个普通对象，给这个对象设置了一个私有的方法
    /!*
     * JQ是一个类（也是一个普通对象）：函数的两种角色，JQ是一个类库提供了很多的方法，其中这些方法有两部分
     *   1.放到JQ原型上的(jQuery.fn/jQuery.prototype)，这里面的方法是供JQ实例调取使用的
     *   2.把JQ当做一个普通的对象，在对象上设置一些私有的属性和方法，这类方法以后用的时候直接的jQuery.xxx()执行即可
     *!/
    jQuery.extend = jQuery.fn.extend = function () {
        //=>EXTEND是把一个对象中的属性和方法扩展到指定的对象上
    };

    jQuery.extend({
        isFunction: function (obj) {

        },
        isArray: function () {

        },
        ...
    });

        
     /**********************************************/
    //jQuery:{extend:...,isFunction:...,isArray:...}

    // jQuery.fn.extend({
    //     find:...
    // });
    // //jQuery.prototype:{...,find:...}

   var init=jQuery.fn.init=function(selector, context){...};
   init.prototype = jQuery.fn;//=>把init当做一个类，但是让这个类的原型指向了jQuery.prototype（init这个类的实例最后找到的也是jQuery这个类原型上的方法 =>init的实例其实也可以理解为jQuery的实例）

    window.jQuery = window.$ = jQuery;
})();
$().filter() //=>创建一个JQUERY类的实例，可以调取JQ.FN中的方法
$.isFunction() //=>把JQ当做一个普通对象，直接的使用对象上扩展的那些私有属性和方法（这些方法和实例没关系）
*/
```

【汇总】

```javascript
(function(){
    var jQuerry = function(selector, context){
         return new jQuery.fn.init(selector, context);
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,//=>当前类的原型重定向后,自己开辟的堆内存中是没有CONSTRUCTOR的，需要手动增加保证它的完整性
        filter:function(){

        },
        ...
    };
    window.jQuery = window.$ =jQuery;
})()
```



## 2.jQuery 核心



###2.1 `jQuery([selector,[context]])`



### 2.2 `jQuery(html,[ownerDocument])`



### 2.3 `jQuery(callback)`





### 2.4 遍历方法`each`

#### 2.4.1  $.each()

> 执行jQuery的私有each方法 ()
>
> 基于for in 遍历
>
> 给JQUERY设置的私有属性  $.each()
>
> 

```javascript
$.each([1,23,4,5,6],(index,item){
       console.log(index,item);
       })
```

​	

```javascript
Object.prototypr.aaa = 250;
	$.each({name:"BigSpinach",age:28},function(key,value){
       	console.log(key,value);
    });
/*
*/
```



#### 2.4.2 $([selector]).each()

> 实例对象调用 原型上的公有方法
>
> 给实例设置的公有属性 $([selector]).each()

```javascript
$(function($){
    $(''#box_ul li').each(function(index,item){
      
      });
      
});
```



#### 2.4.3 each()

##  3.  选择器

> 基于各种选择器创建一个JQ实例(JQ对象)
>
> JQ对象：一个类数组结构(JQ实例)，这个类数组集合中包含了获取到的元素

- selector 选择器的类型(一般都是字符串，但是支持函数或者元素对象)
- context 基于选择器获取元素时候指定的上下文（默认document）



### 3.1 原生js对象和jQuery对象之间的相互转换

获取页面中的元素对象

+ 1.基于原生JS提供的属性和方法获取 =>"原生JS对象"
+ 2.基于JQ选择器获取 =>"JQ对象"

【jQuery对象 --> 原生js】

```javascript
//JQ对象是一个类数组集合，集合中每个索引对应的都是原生JS对象，我们基于索引获取即可
 let $box=$('#box'); 
 let box=$box[0];
 let box=$box.get(0); //=>GET是JQ原型上提供的方法，供JQ实例基于索引获取到指定的JS对象

$box.eq(0)；//它也是基于索引获取集合中的某一项，只不过GET获取的是JS对象，EQ会把获取的结果包裹成一个新的JQ对象(JQ实例返回)
```

【 原生js -->jQuery对象】

```javascript
let tabBox=document.querySelector('.tabBox');
$(tabBox);//直接使用选择器把原生JS对象包裹起来，就会把JS转换为JQ对象（因为$()就是创建JQ的一个实例）
```



### 3.2 jQuery选择器

【部分源码】

```javascript
(function(){
    
    //...
    
    jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},
        
     //...   
        
     init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;
		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}
		//...
		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};
    
    //...
})();

```

分析选择器源码，我们发现`selector`传递的值支持三种类型
 * 1.**string**：基于选择器获取元素

   - 选择器
   - HTML字符串拼接的结构

 * 2.元素对象 selector.nodeType：  把JS对象转换为JQ对象

 * 3.函数：把传递的函数执行，把JQ当做实参传递给函数

   



#### 3.2.1 `typeof selector === “string”`

【selector 是普通选择器】

```javascript
$(fucntion($){
 	$("#box");//获取元素
})();
```

【selector是 HTML结构的字符串】

```javascript
$(fucntion($){
 	$('<div id="AA"></div>').appendTo(document.body);
	//把拼接好的HTML字符串转换为JQ对象，然后可以基于APPEND-TO等方法追加到页面中
})();

```

#### 3.2.2 `if（selector.nodeType ）`

nodeTpe属性存在，说明是一个DOM元素（即原生js对象）

将原生对象转换为一个jQuery对象返回

```javascript
else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} 
```

#### 3.2.3 `if(isFunction(selector))`

```javascript
else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}
```

将这个函数执行。





