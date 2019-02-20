## object对象数据类型



> 普通对象

> - 由大括号包裹起来的

> - 由零到多组属性名和属性值（键值对）组成



`属性是用来描述当前对象特征的，属性名是当前具备这个特征，属性值是对这个特征的描述（专业语法，属性名称为键[key]，属性值称为值[value]，一组属性名和属性值称为一组键值对）`

```javascript
var obj = {

    name:'BigSpinach',

    age:9

};

//=>对象的操作：对键值对的增删改查

语法：对象.属性 / 对象[属性]



[获取]

obj.name 

obj['name']  一般来说，对象的属性名都是字符串格式的（属性值不固定，任何格式都可以）



[增/改]

JS对象中属性名是不允许重复的，是唯一的

obj.name='BigSpinach'; //=>原有对象中存在NAME属性，此处属于修改属性值

obj.sex='男'; //=>原有对象中不存在SEX，此处相当于给当前对象新增加一个属性SEX

obj['age']=26;



[删]

彻底删除：对象中不存在这个属性了

delete obj['age'];



假删除：并没有移除这个属性，只是让当前属性的值为空

obj.sex=null;



----

在获取属性值的时候，如果当前对象有这个属性名，则可以正常获取到值（哪怕是null），但是如果没有这个属性名，则获取的结果是undefined

obj['friends'] =>undefined

```



思考题：

```javascript
var obj = {

    name:'BigSpinach',

    age:26

};

var name = 'liukai';



obj.name  =>'BigSpinach'  获取的是NAME属性的值

obj['name'] =>'liukai' 获取的是NAME属性的值

obj[name] =>此处的NAME是一个变量,我们要获取的属性名不叫做NAME，是NAME存储的值'liukai' =>obj['liukai'] =>没有这个属性,属性值是undefined



----

'name' 和 name 的区别?

  => 'name'是一个字符串值，它代表的是本身

  => name是一个变量，它代表的是本身存储的这个值

```



一个对象中的属性名不仅仅是字符串格式的，还有可能是数字格式的

```javascript
var obj = {

    name:'BigSpinach',

    0:100

};

obj[0] =>100

obj['0'] =>100

obj.0 =>Uncaught SyntaxError: Unexpected number



----

当我们存储的属性名不是字符串也不是数字的时候，浏览器会把这个值转换为字符串（toString），然后再进行存储



obj[{}]=300;  =>先把({}).toString()后的结果作为对象的属性名存储进来 obj['[object Object]']=300



obj[{}] =>获取的时候也是先把对象转换为字符串'[object Object]',然后获取之前存储的300



----

数组对象（对象由键值对组成的）

var oo = {

    a:12

};

var ary = [12,23]; //=>12和23都是属性值，属性名呢？



通过观察结果，我们发现数组对象的属性名是数字（我们把数字属性名称为当前对象的索引）

ary[0]

ary['0']

ary.0  =>报错

```



------

