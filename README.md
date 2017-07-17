# fish.js
> 一个封装了常用js的node库，包含cookie处理、事件处理、对象排序等等，现在只是封装了工作中常用的方法，其他的还需要完善。。

## API
``` javascript
    
    使用时直接获取 let fish = require('fish.js');
    fish目前封装了几种常用的js，每一种封装成一个对象
    目前有以下几种类型方法
    eventUtil 事件类型相关的
    cookieUtil  cookie相关
    commonUtil  一些基本常用的
    mathUtil  计算相关的，主要是解决js精度计算问题

    具体使用则单独调用各个对象的方法

    /**
	 * @description 添加事件
	 * @param {element} 添加事件的元素
	 * @param {type} 事件类型
	 * @param {handler} 绑定的函数
	 **/
    fish.eventUtil.addHandler(element, type, handler);

    /**
	 * @description 删除事件
	 * @param {element} 删除事件的元素
	 * @param {type} 事件类型
	 * @param {handler} 需要删除的函数
	 **/
    fish.eventUtil.removeHandler(element, type, handler);


    /**
	* @description 获取event
	* @param {event} event对象
	**/
    fish.eventUtil.getEvent(event);

    /**
	* @description 获取event.type
	* @param {event} event对象
	**/
    fish.eventUtil.getType(event);


    /**
	* @description 获取事件源
	* @param {event} event对象
	**/
    fish.eventUtil.getElement(event);

    /**
	* @description 阻止浏览器默认行为
	* @param {event} event对象
	**/
    fish.eventUtil.preventDefault(event);

    /**
	* @description 阻止冒泡
	* @param {event} event对象
	**/
    fish.eventUtil.stopPropagation(event);

    /**
	* @description 禁止用F5键 （兼容IE和firefox）
	* @param {e} event对象
	**/
    fish.eventUtil.stopF5(event);

    /**
	 * @description 事件委托
	 *              给指定的标签（例如 li标签）添加
	 * @param {target} 目标对象
	 * @param {type} 触发的事件 不带'on'
	 * @param {fn} 方法
	 * 
	 **/
    fish.eventUtil.delegateEvent(target, type, fn);







    /**
	* @description 设置cookie
	* @param {name} cookie名称
	* @param {value} cookie值
	* @param {day} 有效期（天）
	**/
    fish.cookieUtil.setCookie(name, value, day);

    /**
	* @description 获取cookie
	* @param {name} cookie名称
	**/
    fish.cookieUtil.getCookie(name);


    /**
	* @description 删除cookie
	* @param {name} cookie名称
	**/
    fish.cookieUtil.delCookie(name);







    /**
    * @description 通过ID获取元素
    * @param {eleId} 元素id
    **/
    fish.commonUtil.getById(id);

    /**
	* @description 通过父级id和类名获取元素
	* @param {fatherId} 查找元素的父元素id
	* @param {className} 查找元素的类名
	* @author YouNoFish
	**/
    fish.commonUtil.getByClass(fatherId, className);

    /**
    *  @description 从url地址里面获取参数，这个可以用于html之间的传值使用
    *  @return {oJson}
    */
    fish.commonUtil.getParamFromURL();

    /**
    *  @description 普通数组排序  list.sort(commonUtil.normalSort('desc'));  list.sort(commonUtil.normalSort('asc'));
    *  @return
    */
    fish.commonUtil.normalSort(orderBy);

    /**
	 *  @description 对象数组排序  list.sort(commonUtil.objectSort('score','desc'));
	 *  @param {propertyName} 进行排序的对象属性
     *  @param {type} 排序类型 desc 或者 asc
	 *  @return 
	 */
    fish.commonUtil.objectSort(propertyName, orderBy);


    /**
	 *  @description 去除字符串左边的空格
	 *  @param {str} 进行操作的字符串
	 *  @return 
	 */
    fish.commonUtil.trimL(str);

    /**
	 *  @description 去除字符串右边的空格
	 *  @param {str} 进行操作的字符串
	 *  @return 
	 */
    fish.commonUtil.trimR(str);

    /**
	 *  @description 去除字符串两边边的空格
	 *  @param {str} 进行操作的字符串
	 *  @return 
	 */
    fish.commonUtil.trim(str);

    /**
	 *  @description 通过radio的name获取单选框的值
	 *  @param {name} 单选框的name
	 *  @return 
	 */
    fish.commonUtil.getRadioValue(name);

    /**
	*  @description  在目标节点后插入新元素
	*  @param {newElement} 新元素节点
	*  @param {targetElement} 目标节点
	*  @return 
	*/
    fish.commonUtil.insertAfter(newElement, targetElement);

    /**
	*  @description  字符串格式化   fish.commonUtil.strFormat('测试替换{0}文字{1}，可以无限长{2}','第一个','第二个','第三个');
	*  @param {str} 字符串
	*  @param {params} 格式化的参数 
	*  @return 
	*/
    fish.commonUtil.strFormat();

	/**
	*  @description  时间转换器
	*  @param {time} 时间(支持时间戳和Date)
	*  @param {format} 转换的格式 eg:yyyy年MM月dd日 HH时mm分ss秒  fish.commonUtil.timeFormat(new Date(), 'yyyy年MM月dd日 HH时mm分ss秒');
	*  @return timeStr
	*/
	fish.commonUtil.timeFormat(time, format);

	/**
	*  @description  根据长度截取字符串
	*  @param {_str} 字符串
	*  @param {_length} 截取后剩余的长度
	*  @return timeStr
	*/
	fish.commonUtil.cutStr(_str, _length);




	/**
	 * 精确计算加法
	 * @param {Number} value1
	 * @param {Number} value2
	 * @param {Number} [precision] 计算后的精度，默认为两个操作数中的较大的小数位数
	 * @param {Boolean} [full] 完整精度，默认为false，1.00将显示为1；为true时1.00将显示为1.00
	 * @example 
	 * var a=8.2;
	 * var b=0.2;
	 * console.log(a+b);//8.399999999998 计算结果有误差
	 * console.log(mathUtil.add(a,b);//8.4
	 * a=0.1;
	 * b=0.2;
	 * console.log(a + b);  //0.30000000000000004
	 * console.log(mathUtil.add(0.1,0.2,2));  //0.3
	 * @return {Number} 计算结果
	 */
	fish.mathUtil.add(value1, value2, precision, full);

	/**
	 * 精确计算减法
	 * @param {Number} value1
	 * @param {Number} value2
	 * @param {Number} [precision] 计算后的精度，默认为两个操作数中的较大的小数位数
	 * @param {Boolean} [full] 完整精度，默认为false，1.00将显示为1；为true时1.00将显示为1.00
	 * @example 
	 * var a=8.2;
	 * var b=0.2;
	 * console.log(a-b);//7.999999999999999 计算结果有误差
	 * console.log(mathUtil.sub(a,b);//8
	 * @return {Number} 计算结果
	 */
	fish.mathUtil.sub(value1, value2, precision, full);

	/**
	 * 精确计算乘法
	 * @param {Number} value1
	 * @param {Number} value2
	 * @param {Number} [precision] 计算后的精度，默认为两个操作数中的较大的小数位数
	 * @param {Boolean} [full] 完整精度，默认为false，1.00将显示为1；为true时1.00将显示为1.00
	 * @example 
	 *  var a = 8888.1;
	 *	var b = 0.0002;
	 *	console.log(a * b); //1.7776200000000002
	 *	console.log(mathUtil.mul(a,b,2)); //1.78
	 *	console.log(mathUtil.mul(a,b,6)); //1.77762
	 *	console.log(mathUtil.mul(a,b,6,true)); //1.777620
	 * @return {Number} 计算结果
	 */
	fish.mathUtil.mul(value1, value2, precision, full);


	/**
	 * 精确计算除法
	 * @param {Number} value1
	 * @param {Number} value2
	 * @param {Number} [precision] 计算后的精度，默认为两个操作数中的较大的小数位数
	 * @param {Boolean} [full] 完整精度，默认为false，1.00将显示为1；为true时1.00将显示为1.00
	 * @return {Number} 计算结果
	 */
	fish.mathUtil.div(value1, value2, precision, full);

```

# 更新

## 2017.07.13
* 第一次提交

## 2017.07.17
* 完善API文档




