/**
 *  @name snail.js
 *  @Date 20170712
 *  @author YouNoFish
 *  
 */

/**
 * @description 事件相关方法
 * @Date 20150730
 * @version 0.2.5
 * @author YouNoFish
 **/
var eventUtil = {
	/**
	 * @description 添加事件
	 * @param {element} 添加事件的元素
	 * @param {type} 事件类型
	 * @param {handler} 绑定的函数
	 * @Date 20150731
	 * @author YouNoFish
	 *  
	 **/
	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	/**
	 * @description 删除事件
	 * @param {element} 删除事件的元素
	 * @param {type} 事件类型
	 * @param {handler} 需要删除的函数
	 * @Date 20150731
	 * @author YouNoFish
	 **/
	removeHandler: function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	/**
	* @description 获取event
	* @param {event} event对象
	* @Date 20150731
	* @author YouNoFish
	**/
	getEvent: function (event) {
		return event ? event : window.event;
	},
	/**
	* @description 获取event.type
	* @param {event} event对象
	* @Date 20150930
	* @author YouNoFish
	**/
	getType: function (event) {
		var e = window.event || event;
		return e.type;
	},
	/**
	* @description 获取事件源
	* @param {event} event对象
	* @Date 20150930
	* @author YouNoFish
	**/
	getElement: function (event) {
		var e = window.event || event;
		return e.target || e.srcElement;
	},
	/**
	* @description 阻止浏览器默认行为
	* @param {event} event对象
	* @Date 20150930
	* @author YouNoFish
	**/
	preventDefault: function (event) {
		var e = window.event || event;
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},
	/**
	* @description 阻止冒泡
	* @param {event} event对象
	* @Date 20150930
	* @author YouNoFish
	**/
	stopPropagation: function (event) {
		var e = window.event || event;
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	/**
	* @description 禁止用F5键 （兼容IE和firefox）
	* @param {e} event对象
	* @Date 20150731
	* @author YouNoFish
	**/
	stopF5: function (e) {
		e = window.event || e;
		var keycode = e.keyCode || e.which;
		if (keycode == 116) {
			if (window.event) {// ie
				try { e.keyCode = 0; } catch (e) { }
				e.returnValue = false;
			} else {// ff
				e.preventDefault();
			}
		}
	},
	/**
	 * @description 事件委托
	 *              给指定的标签（例如 li标签）添加
	 * @param {target} 目标对象
	 * @param {type} 触发的事件 不带'on'
	 * @param {fn} 方法
	 * @Date 20150908
	 * @author YouNoFish
	 *  
	 *
	 * 
	 **/
	delegateEvent: function (target, type, fn) {
		eventUtil.addHandler(document, type, function (e) {
			if (e.target.nodeName == target.toUpperCase()) {
				fn.call(e.target);
			}
		});


	}

}

/**
 * @description cookie相关的方法
 * @author YouNoFish
 * @Date 20150730
 * @version 0.2.5
 * */
var cookieUtil = {
	/**
	* @description 设置cookie
	* @param {name} cookie名称
	* @param {value} cookie值
	* @param {day} 有效期（天）
	* @Date 20150731
	* @author YouNoFish
	**/
	setCookie: function (name, value, day) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + day);
		document.cookie = name + '=' + value + ';expires=' + oDate;
	},
	/**
	 * @description 获取cookie
	* @param {name} cookie名称
	* @Date 20150730
	* @author YouNoFish
	**/
	getCookie: function (name) {
		var oCookie = document.cookie.split('; ');
		for (var i = 0, len = oCookie.length; i < len; i++) {
			var oCookies = oCookie[i].split('=');
			if (oCookies[0] == name) {
				return oCookies[1];
			}
		}
		return '';
	},
	/**
	* @description 删除cookie
	* @param {name} cookie名称
	* @Date 20150731
	* @author YouNoFish
	**/
	delCookie: function (name) {
		setCookie(name, 1, -1);
	}

}
/**
 * @description 通用的一些方法 
 * @author YouNoFish
 * @Date 20161229
 * @version 0.2.8
 * */
var commonUtil = {
	/**
      * @description 通过ID获取元素
      * @param {eleId} 元素id
      * @version 20150731
      * @author YouNoFish
      **/
	getById: function (eleId) {
		return document.getElementById(eleId);
	},
	/**
	* @description 通过父级id和类名获取元素
	* @param {fatherId} 查找元素的父元素id
	* @param {className} 查找元素的类名
	* @Date 20150731
	* @author YouNoFish
	**/
	getByClass: function (fatherId, className) {
		var oFather = document.getElementById(fatherId);
		var eles = oFather.getElementsByTagName("*");
		var results = new Array;
		for (var i = 0; i < eles.length; i++) {
			if (className == eles[i].className) {
				results.push(eles[i]);
			}
		}
		return results;
	},
	/**
	 *  @description 从url地址里面获取参数，这个可以用于html之间的传值使用
	 *  @Date 20151208
	 *  @author YouNoFish
	 *  @return {oJson}
	 */
	getParamFromURL: function () {
		var _url = window.location.href;
		var paramArr = _url.substring(_url.lastIndexOf('?') + 1, _url.length).split('&');
		var oJson = {};
		for (var i = 0; i < paramArr.length; i++) {
			var name = paramArr[i].split('=')[0];
			var laue = paramArr[i].split('=')[1];
			oJson[name] = laue;
		}
		return oJson;
	},
	/**
	 *  @description 普通数组排序  list.sort(commonUtil.normalSort('desc'));
	 *  @Date 20160106
	 *  @author YouNoFish
	 *  @return
	 */
	normalSort: function (orderBy) {
		return function (value1, value2) {
			var oper = 1;
			if (orderBy == "desc") {
				oper = -1;
			} else if (orderBy == "asc") {
				oper = 1;
			}
			if (value1 < value2) {
				return oper;
			} else if (value1 > value2) {
				return -oper;
			} else {
				return 0;
			}
		}
	},
	/**
	 *  @description 对象数组排序  list.sort(commonUtil.objectSort('score','desc'));
	 *  @Date 20160106
	 *  @author YouNoFish
	 *  @param {propertyName} 进行排序的对象属性
	 *  @return 
	 */
	objectSort: function (propertyName, orderBy) {
		return function (object1, object2) {
			var value1 = object1[propertyName];
			var value2 = object2[propertyName];
			var oper = 1;
			if (orderBy == "desc") {
				oper = -1;
			} else if (orderBy == "asc") {
				oper = 1;
			}
			if (value2 < value1) {
				return oper;
			}
			else if (value2 > value1) {
				return -oper;
			}
			else {
				return 0;
			}
		}
	},
	/**
	 *  @description 去除字符串左边的空格
	 *  @Date 20160106
	 *  @author YouNoFish
	 *  @param {str} 进行操作的字符串
	 *  @return 
	 */
	trimL: function (str) {
		return str.replace(/(^\s*)/g, "");
	},
	/**
	 *  @description 去除字符串右边的空格
	 *  @Date 20160106
	 *  @author YouNoFish
	 *  @param {str} 进行操作的字符串
	 *  @return 
	 */
	trimR: function (str) {
		return str.replace(/(\s*$)/g, "");
	},
	/**
	 *  @description 去除字符串两边边的空格
	 *  @Date 20160106
	 *  @author YouNoFish
	 *  @param {str} 进行操作的字符串
	 *  @return 
	 */
	trim: function (str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	/**
	 *  @description 通过radio的name获取单选框的值
	 *  @Date 20160108
	 *  @author YouNoFish
	 *  @param {name} 单选框的name
	 *  @return 
	 */
	getRadioValue: function (name) {
		var oRadio = document.getElementsByName(name);
		var result = "";
		for (var i = 0, len = oRadio.length; i < len; i++) {
			if (oRadio[i].checked) {
				result = oRadio[i].value;
			}
		}
		return result;
	},
	/**
	*  @description  在目标节点后插入新元素
	*  @Date 20160122
	*  @author YouNoFish
	*  @param {newElement} 新元素节点
	*  @param {targetElement} 目标节点
	*  @return 
	*/
	insertAfter: function (newElement, targetElement) {
		var parent = targetElement.parentNode;
		if (parent.lastChild == targetElement) {
			// 如果最后的节点是目标元素，则直接添加。因为默认是最后  （注意：如果元素关闭标签之前添加空格则最后一个节点是空白节点）
			parent.appendChild(newElement);
		}
		else {
			//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	},
	/**
	*  @description  字符串格式化
	*  @Date 20160622
	*  @author YouNoFish
	*  @param {str} 字符串
	*  @param {params} 格式化的参数 
	*  @return 
	*/
	strFormat: function () {
		if (arguments == undefined || arguments.length <= 1) {
			console.log("参数非法！");
			return;
		}
		//需要进行参数化的字符串
		var str = arguments[0];
		for (var i = 0, l = arguments.length - 1; i < l; i++) {
			//逐个替换字符串中需要格式化的位置
			str = str.replace('{' + i + '}', arguments[i + 1]);
		}
		return str;
	},

	/**
	*  @description  时间转换器
	*  @Date 20161229
	*  @author YouNoFish
	*  @param {time} 时间(支持时间戳和Date)
	*  @param {format} 转换的格式 eg:yyyy年MM月dd日 HH时mm分ss秒
	*  @return timeStr
	*/
	timeFormat: function (time, format) {
		var _date;
		if (time instanceof Date) { // new Date();
			_date = time;
		}
		else if (typeof time == 'number') {
			_date = new Date();
			_date.setTime(time);
		}
		else {
			console.error("时间参数错误，请传入时间戳或者Date！");
			return false;
		}

		if (typeof format != 'string') {
			console.error("转换的格式类型错误，请传入字符串格式！");
			return false;
		}

		var timeStr = format.replace('yyyy', _date.getFullYear())
			.replace('MM', _date.getMonth() + 1)
			.replace('dd', _date.getDate())
			.replace('HH', _date.getHours())
			.replace('mm', _date.getMinutes())
			.replace('ss', _date.getMinutes());
		return timeStr;
	},

	/**
	*  @description  根据长度截取字符串
	*  @param {_str} 字符串
	*  @param {_length} 截取后剩余的长度
	*  @return timeStr
	*/
	cutStr: function (_str, _length) {
		if (_str.length <= _length) {
			return _str;
		}
		return _str.substring(0, _length) + '...';
	}

}

/**
 * @description 数字计算相关方法
 * @Date 20170712
 * @version 0.0.1
 * @author YouNoFish
 **/
var mathUtil = {
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
	add: function (value1, value2, precision, full) {
		if (!precision && precision !== 0) {
			var i = this.dotIndex(value1);
			if (i == -1) {
				return null;
			}
			var j = this.dotIndex(value2);
			if (j == -1) {
				return null;
			}

			if (i < j) {
				precision = j;
			}
			else {
				precision = i;
			}
		}
		var value = value1 * 1 + value2 * 1;
		value = value.toFixed(precision);
		if (!full) {
			value = value * 1;
		}
		return value;
	},
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
	sub: function (value1, value2, precision, full) {
		if (!precision && precision !== 0) {
			var i = this.dotIndex(value1);
			if (i == -1) {
				return null;
			}
			var j = this.dotIndex(value2);
			if (j == -1) {
				return null;
			}

			if (i < j) {
				precision = j;
			}
			else {
				precision = i;
			}
		}
		var value = value1 * 1 - value2 * 1;
		value = value.toFixed(precision);
		if (!full) {
			value = value * 1;
		}
		return value;
	},
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
	mul: function (value1, value2, precision, full) {
		if (!precision && precision !== 0) {
			var i = this.dotIndex(value1);
			if (i == -1) {
				return null;
			}
			var j = this.dotIndex(value2);
			if (j == -1) {
				return null;
			}

			if (i < j) {
				precision = j;
			}
			else {
				precision = i;
			}
		}
		var value = value1 * value2;
		value = value.toFixed(precision);
		if (!full) {
			value = value * 1;
		}
		return value;
	},
	/**
	 * 精确计算除法
	 * @param {Number} value1
	 * @param {Number} value2
	 * @param {Number} [precision] 计算后的精度，默认为两个操作数中的较大的小数位数
	 * @param {Boolean} [full] 完整精度，默认为false，1.00将显示为1；为true时1.00将显示为1.00
	 * @return {Number} 计算结果
	 */
	div: function (value1, value2, precision, full) {
		if (!precision && precision !== 0) {
			var i = this.dotIndex(value1);
			if (i == -1) {
				return null;
			}
			var j = this.dotIndex(value2);
			if (j == -1) {
				return null;
			}

			if (i < j) {
				precision = j;
			}
			else {
				precision = i;
			}
		}
		var value = value1 / value2;
		value = value.toFixed(precision);
		if (!full) {
			value = value * 1;
		}
		return value;
	},
	/**
	 * 获取小数位数
	 * @param {Number} value 数值，支持科学计数法
	 * @return {Number} 参数非数值时返回-1
	 */
	dotIndex: function (value) {
		var n = new Number(value);
		if (isNaN(n)) {
			return -1;
		}
		n = n.toString();
		var i = n.indexOf(".");
		var j = n.lastIndexOf("e");
		if (i == -1)
			i = 0;
		else
			if (j == -1) {
				i = n.length - i - 1;
			}
			else {
				i = j - i - 1;
			}
		if (j > -1) {
			var k = n.substring(j + 2) * 1;
			var j = n.lastIndexOf("e+");
			if (j > -1) {
				i -= k;
				if (i < 0)
					i = 0;
			}
			else {
				i += k;
			}
		}
		return i;
	}
}


exports.eventUtil = eventUtil;
exports.cookieUtil = cookieUtil;
exports.commonUtil = commonUtil;
exports.mathUtil = mathUtil;
