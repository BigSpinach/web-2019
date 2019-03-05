let $box =$('#box');
console.log($box);

console.dir($('.box_ol'));

//=>JQ选择器：基于各种选择器创建一个JQ实例(JQ对象)
//1.selector 选择器的类型(一般都是字符串，但是支持函数或者元素对象)
//2.context 基于选择器获取元素时候指定的上下文（默认document）
//JQ对象：一个类数组结构(JQ实例)，这个类数组集合中包含了获取到的元素
//
/// console.log($('.tabBox'));
/*
 * JQ对象（类数组）=>JQ实例
 *   0: div.tabBox
 *   length: 1
 *   context: document
 *   selector: '.tabBox'
 *
 *   __proto__:jQuery.prototype
 *      add
 *      ...
 *      __proto__:Object.prototype
 *         hasOwnProperty
 *         ...
 */
