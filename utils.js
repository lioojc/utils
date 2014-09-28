/**
 * [utils 工具函数]
 * @type {Object}
 */
var utils = {
	/**
	 * [getStyle 获取非行间样式]
	 * @param  {[object]} obj  [node节点]
	 * @param  {[string]} attr [属性]
	 * @return {[string]}      [属性值]
	 */
	getStyle: function(obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
	},
	/**
	 * [getByClass 通过className获取DOM节点]
	 * @param  {[string]} sClass [类名]
	 * @param  {[node]} parent [父级节点]
	 * @return {[array]}        [节点数组]
	 */
	getByClass: function(sClass, parent) {
		var aEles = (parent || document).getElementsByTagName('*');
		var arr = [];
		var re = new RegExp('(^|\\s)' + sClass + '(\\s|$)');

		for (var i = 0; i < aEles.length; i++) {
			if (re.test(aEles[i].className)) {
				arr.push(aEles[i]);
			}
		}
		return arr;
	},
	/**
	 * [addClass 添加类名]
	 * @param {[node]} obj    [node节点]
	 * @param {[string]} sClass [类名]
	 */
	addClass: function(obj, sClass) {
		var aClass = obj.className.split(' ');
		if (!aClass[0]) {
			obj.className = sClass;
			return;
		}
		for (var i = 0; i < aClass.length; i++) {
			if (aClass[i] == sClass) return;
		}
		obj.className += ' ' + sClass;
	},
	/**
	 * [removeClass 删除类名]
	 * @param  {[node]} obj    [node节点]
	 * @param  {[string]} sClass [类名]
	 */
	removeClass: function(obj, sClass) {
		var aClass = obj.className.split(' ');

		if (!aClass[0]) return;

		for (var i = 0; i < aClass.length; i++) {
			if (aClass[i] == sClass) {
				aClass.splice(i, 1);
				obj.className = aClass.join(' ');
				return;
			}
		}
	},
	/**
	 * [hasClass 是否含有类名]
	 * @param  {[node]}  obj    [node节点]
	 * @param  {[string]}  sClass [类名]
	 * @return {Boolean}        [true: 包含;false: 不包含]
	 */
	hasClass: function(obj, sClass) {
		var aClass = obj.className.split(' ');

		if (!aClass[0]) return false;

		for (var i = 0; i < aClass.length; i++) {
			if (aClass[i] == sClass) return true;
		}

		return false;
	},
	/**
	 * [view 窗口可视区宽高]
	 * @return {[json]} [w: 窗口宽度, h: 窗口高度]
	 */
	view: function() {
		return {
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	},
	/**
	 * [scrollTop 滚动条高]
	 * @return {[number]} [滚动条高度]
	 */
	scrollTop: function() {
		return document.documentElement.scrollTop || document.body.scrollTop;
	},
	/**
	 * [scrollH 内容高度]
	 * @param  {[node]} obj [node节点]
	 * @return {[number]}     [内容高度]
	 */
	scrollH: function(obj) {
		return obj.scrollHeight;
	},
	/**
	 * [offsetH 文档高]
	 * @return {[number]} [文档高度]
	 */
	offsetH: function() {
		return document.body.offsetHeight;
	},
	/**
	 * [offsetW 文档宽]
	 * @return {[number]} [文档宽度]
	 */
	offsetW: function() {
		return document.body.offsetWidth;
	},
	/**
	 * [posLeft 左边距]
	 * @param  {[node]} obj [node节点]
	 * @return {[number]}     [左边距]
	 */
	posLeft: function(obj) {
		var iLeft = 0;

		while (obj) {
			iLeft += obj.offsetLeft;
			obj = obj.offsetParent;
		}

		return iLeft;
	},
	/**
	 * [posTop 上边距]
	 * @param  {[node]} obj [node节点]
	 * @return {[number]}     [上边距]
	 */
	posTop: function(obj) {
		var iTop = 0;

		while (obj) {
			iTop += obj.offsetTop;
			obj = obj.offsetParent;
		}

		return iTop;
	},
	/**
	 * [isIE6 是否是IE6]
	 * @return {Boolean} [true: 是; false: 不是]
	 */
	isIE6: function() {
		var str = window.navigator.userAgent.toLowerCase();

		if (str.indexOf('msie6') != -1) return true;

		return false;
	},
	/**
	 * [first 第一个DOM节点]
	 * @param  {[node]} obj [node节点]
	 * @return {[node]}     [node节点]
	 */
	first: function(obj) {
		if (!obj.firstChild) return null;
		return obj.firstChild.nodeType == 1 ? obj.firstChild : this.next(obj.firstChild);
	},
	/**
	 * [last 最后的DOM节点]
	 * @param  {[node]} obj [node节点]
	 * @return {[node]}     [node节点]
	 */
	last: function(obj) {
		if (!obj.lastChild) return null;
		return obj.lastChild.nodeType == 1 ? obj.lastChild : this.prev(obj.lastChild);
	},
	/**
	 * [prev 前一个DOM节点]
	 * @param  {[node]} obj [node节点]
	 * @return {[node]}     [node节点]
	 */
	prev: function(obj) {
		if (!obj.previousSibling) return null;
		return obj.previousSibling.nodeType == 1 ? obj.previousSibling : this.prev(obj.previousSibling);
	},
	/**
	 * [next 后一个DOM节点]
	 * @param  {[node]}   obj [node节点]
	 * @return {[node]}       [node节点]
	 */
	next: function(obj) {
		if (!obj.nextSibling) return null;
		return obj.nextSibling.nodeType == 1 ? obj.nextSibling : this.next(obj.nextSibling);
	},
	/**
	 * [bind 事件绑定]
	 * @param  {[node]}   obj    [node节点]
	 * @param  {[string]}   evname [事件名]
	 * @param  {Function} fn     [回调]
	 */
	bind: function(obj, evname, fn) {
		if (obj.addEventListener) {
			obj.addEventListener(evname, fn, false);
		} else {
			obj.attachEvent('on' + evname, function() {
				fn.call(obj);
			});
		}
	},
	/**
	 * [unbind 事件解绑]
	 * @param  {[node]}   obj    [node节点]
	 * @param  {[string]}   evname [事件名]
	 * @param  {Function} fn     [回调]
	 */
	unbind: function(obj, evname, fn) {
		if (obj.removeEventListener) {
			obj.removeEventListener(evname, fn, false);
		} else {
			obj.detachEvent('on' + evname, function() {
				fn.call(obj);
			})
		}
	},
	/**
	 * [shake 抖动]
	 * @param  {[node]} obj [node节点]
	 */
	shake: function(obj) {
		var posX = parseInt(getStyle(obj, 'left')); //当前位置left值
		var arr = [];
		var num = 0;

		for (var i = 22; i > 0; i -= 2) {
			arr.push(i);
		}
		arr.push(0);

		obj.timer = setInterval(function() {

			obj.style.left = posX + arr[num] + 'px';
			num++;

			if (num == arr.length) {
				clearInterval(obj.timer);
			}

		}, 30);
	},
	/**
	 * [toDouble 变为两位数]
	 * @param  {[number]} num [数值]
	 * @return {[number]}     [数值]
	 */
	toDouble: function(num) {
		return num < 10 ? '0' + num : '' + num;
	},
	/**
	 * [drag 拖拽]
	 * @param  {[node]} obj [node节点]
	 * @return {[boolean]}     [取消默认事件]
	 */
	drag: function(obj) {
		obj.onmousedown = function(ev) {
			var ev = ev || window.event;
			var disX = ev.clientX - obj.offsetLeft;
			var disY = ev.clientY - obj.offsetTop;

			if (obj.setCapture) {
				obj.setCapture();
			}

			document.onmousemove = function(ev) {
				var ev = ev || window.event;
				obj.style.left = ev.clientX - disX + 'px';
				obj.style.top = ev.clientY - disY + 'px';
			}

			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
				if (obj.releaseCapture) {
					obj.releaseCapture();
				}
			}

			return false;
		}
	},
	/**
	 * [touch 碰撞]
	 * @param  {[node]} src    [源节点]
	 * @param  {[node]} target [目标节点]
	 * @return {[boolean]}        [取消默认事件]
	 */
	touch: function(src, target) {
		var srcL1 = src.offsetLeft;
		var srcT1 = src.offsetTop;
		var srcL2 = src.offsetLeft + src.offsetWidth;
		var srcT2 = src.offsetTop + src.offsetHeight;

		var targetL1 = target.offsetLeft;
		var targetT1 = target.offsetTop;
		var targetL2 = target.offsetLeft + target.offsetWidth;
		var targetT2 = target.offsetTop + target.offsetHeight;

		if (srcL2 > targetL1 && srcL1 < targetL2 && srcT2 > targetT1 && srcT1 < targetT2) {
			return true;
		}

		return false;
	},
	/**
	 * [setCookie 设置cookie]
	 * @param {[string]} key   [cookie的key]
	 * @param {[string]} value [cookie的value]
	 * @param {[date]} t     [过期时间]
	 */
	setCookie: function(key, value, t) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + t);
		document.cookie = key + '=' + value + ';expires=' + oDate.toUTCString();
	},
	/**
	 * [getCookie 获取cookie]
	 * @param  {[string]} key [cookie的key]
	 * @return {[string]}     [cookie的value]
	 */
	getCookie: function(key) {
		var arr1 = document.cookie.split('; ');
		for (var i = 0; i < arr1.length; i++) {
			var arr2 = arr1[i].split('=');
			if (arr2[0] == key) {
				return arr2[1];
			}
		}
	},
	/**
	 * [removeCookie 删除cookie]
	 * @param  {[string]} key [cookie的key]
	 */
	removeCookie: function(key) {
		this.setCookie(key, '', -1);
	},
	/**
	 * [startMove 运动]
	 * @param  {[node]}   obj  [node节点]
	 * @param  {[json]}   json [运动的属性]
	 * @param  {Function} fn   [回调]
	 */
	startMove: function(obj, json, fn) {
		clearInterval(obj.timer);
		var iSpeed = 0;
		var iCur = 0;

		obj.timer = setInterval(function() {
			var iBtn = true;

			for (var attr in json) {
				if (attr == 'opacity') {
					iCur = Math.round(getStyle(obj, attr) * 100);
				} else {
					iCur = parseInt(getStyle(obj, attr));
				}
				iSpeed = (json[attr] - iCur) / 8;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

				if (iCur != json[attr]) {
					iBtn = false;
					if (attr == 'opacity') {
						obj.style.opacity = (iCur + iSpeed) / 100;
						obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
					} else {
						obj.style[attr] = iCur + iSpeed + 'px';
					}
				}
			}

			if (iBtn) {
				clearInterval(obj.timer);
				fn && fn.call(obj);
			}

		}, 30);
	},
	/**
	 * [addMouseWheel 鼠标滚动]
	 * @param {[node]} obj [node节点]
	 * @param {[function]} fn1 [向上滚动回调]
	 * @param {[function]} fn2 [向下滚动回调]
	 */
	addMouseWheel: function(obj, fn1, fn2) {
		obj.onmousewheel = fn;
		if (obj.addEventListener) {
			obj.addEventListener('DOMMouseScroll', fn, false);
		}

		function fn(ev) {
			var ev = ev || window.event;
			var iBtn = false;
			if (ev.wheelDelta) {
				iBtn = ev.wheelDelta > 0 ? true : false;
			} else {
				iBtn = ev.detail < 0 ? true : false;
			}

			iBtn ? fn1.call(obj) : fn2.call(obj);

			if (ev.preventDefault) {
				ev.preventDefault();
			}

			return false;
		}
	},
	/**
	 * [extend 浅拷贝]
	 * @param  {[object]} obj1 [目标对象]
	 * @param  {[object]} obj2 [源对象]
	 */
	extend: function(obj1, obj2) {
		for (var attr in obj2) {
			obj1[attr] = obj2[attr];
		}
	},
	/**
	 * [bindEvent 自定义事件]
	 * @param  {[node]}   obj    [node节点]
	 * @param  {[string]}   events [事件名]
	 * @param  {Function} fn     [事件函数]
	 */
	bindEvent: function(obj, events, fn) {
		obj.listener = obj.listener || {};
		obj.listener[events] = obj.listener[events] || [];
		obj.listener[events].push(fn);

		if (obj.nodeType == 1) {
			if (obj.addEventListener) {
				obj.addEventListener(events, fn, false);
			} else {
				obj.attachEvent('on' + events, function() {
					fn.call(obj);
				});
			}
		}
	},
	/**
	 * [fireEvent 主动触发事件]
	 * @param  {[node]} obj    [node节点]
	 * @param  {[string]} events [事件名]
	 */
	fireEvent: function(obj, events) {
		if (obj.listener && obj.listener[events]) {
			for (var i = 0; i < obj.listener[events].length; i++) {
				obj.listener[events][i]();
			}
		}
	},
	/**
	 * [ajax ajax]
	 * @param  {[json]} opt [配置参数]
	 */
	ajax: function(opt) {
		var xhr = null;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}

		var defalut = {
			method: opt.method || 'get',
			url: opt.url || '',
			data: opt.data || '',
			dataType: opt.dataType || 'text',
			success: opt.success || function() {},
			fail: opt.fail || function() {}
		}

		if (defalut.method == 'get' && defalut.data) {
			defalut.url += '?' + defalut.data;
		}

		xhr.open(defalut.method, defalut.url, true);
		if (defalut.method == 'get') {
			xhr.send();
		} else {
			xhr.setRquestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send(defalut.data);
		}

		xhr.onreadystatechange = function() {

			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var data = xhr.responseText;

					switch (defalut.dataType) {
						case 'json':
							data = JSON.parse(data);
							break;
						case 'xml':
							data = xml.responseXML;
							break;
					}

					defalut.success(data);
				} else {
					defalut.fail(xhr.status);
				}
			}

		}
	},
	/**
	 * [dateFormat 设置时间]
	 * @param  {[string]} time [时间]
	 * @return {[date]}      [时间]
	 * 例子: time = '2014-01-01';
	 */
	dateFormat: function(time) {
		var time = time.split(/[^\d]/g);
		if (!time) return '';
		var arg = arguments;
		if (arg.length === 3) {
			time = [].slice.call(arg, 0);
		}
		var date = new Date();
		date.setUTCFullYear(time[0], time[1] - 1, time[2]);
		date.setHours(0, 0, 0, 0);
		return date;
	},
	/**
	 * [hasPrototypeProperty 是否是原型链属性]
	 * @param  {[object]}  obj  [对象]
	 * @param  {[string]}  name [属性]
	 * @return {Boolean}      [true: 是;false: 不是]
	 */
	hasPrototypeProperty: function(obj, name) {
		return !obj.hasOwnProperty(name) && (name in obj);
	},
	/**
	 * [winPos 浏览器窗口位置]
	 * @return {[json]} [leftPos: 距离左边距离; topPos: 距离上边距离]
	 * Firefox、Safari 和 Chrome 始终返回页面中每个框架的 top.screenX 和top.screenY 值。
	 * 即使在页面由于被设置了外边距而发生偏移的情况下，相对于 window 对象使用screenX 和 screenY 每次也都会返回相同的值。
	 * 而 IE 和 Opera 则会给出框架相对于屏幕边界的精确坐标值。
	 * 注意：无法在跨浏览器的条件下取得窗口左边和上边的精确坐标值
	 */
	winPos: function() {
		return {
			leftPos: (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX,
			topPos: (typeof window.screenTop == 'number') ? window.screenTop : window.screenY
		}
	},
	/**
	 * [hasPlugin 检测插件]
	 * @param  {[string]}  name [插件名字]
	 * @return {Boolean}      [true: 有; false: 没有]
	 * IE 不支持 Netscape 式的插件
	 */
	hasPlugin: function(name) {
		name = name.toLowerCase();
		for (var i = 0; i < navigator.plugins.length; i++) {
			if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
				return true;
			}
		}
		return false;
	},
	/**
	 * [hasIEPlugin 检测 IE 中的插件]
	 * @param  {[string]}  name [插件名]
	 * @return {Boolean}      [true: 有；false: 没有]
	 */
	hasIEPlugin: function(name) {
		try {
			new ActiveXObject(name);
			return true;
		} catch (ex) {
			return false;
		}
	},
	/**
	 * [client 用户代理字符串检测脚本]
	 * @return {[json]} [engine、browser、system]
	 */
	client: function() {
		//呈现引擎
		var engine = {
			ie: 0,
			gecko: 0,
			webkit: 0,
			khtml: 0,
			opera: 0,

			//完整的版本号
			ver: null
		};
		//浏览器
		var browser = {

			//主要浏览器
			ie: 0,
			firefox: 0,
			safari: 0,
			konq: 0,
			opera: 0,
			chrome: 0,
			//具体的版本号
			ver: null
		};
		//平台、设备和操作系统
		var system = {
			win: false,
			mac: false,
			x11: false,

			//移动设备
			iphone: false,
			ipod: false,
			ipad: false,
			ios: false,
			android: false,
			nokiaN: false,
			winMobile: false,

			//游戏系统
			wii: false,
			ps: false
		};
		//检测呈现引擎和浏览器
		var ua = navigator.userAgent;
		if (window.opera) {
			engine.ver = browser.ver = window.opera.version();
			engine.opera = browser.opera = parseFloat(engine.ver);
		} else if (/AppleWebKit\/(\S+)/.test(ua)) {
			engine.ver = RegExp["$1"];
			engine.webkit = parseFloat(engine.ver);

			//确定是 Chrome 还是 Safari 
			if (/Chrome\/(\S+)/.test(ua)) {
				browser.ver = RegExp["$1"];
				browser.chrome = parseFloat(browser.ver);
			} else if (/Version\/(\S+)/.test(ua)) {
				browser.ver = RegExp["$1"];
				browser.safari = parseFloat(browser.ver);
			} else {
				//近似地确定版本号
				var safariVersion = 1;
				if (engine.webkit < 100) {
					safariVersion = 1;
				} else if (engine.webkit < 312) {
					safariVersion = 1.2;
				} else if (engine.webkit < 412) {
					safariVersion = 1.3;
				} else {
					safariVersion = 2;
				}

				browser.safari = browser.ver = safariVersion;
			}
		} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
			engine.ver = browser.ver = RegExp["$1"];
			engine.khtml = browser.konq = parseFloat(engine.ver);
		} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
			engine.ver = RegExp["$1"];
			engine.gecko = parseFloat(engine.ver);

			//确定是不是 Firefox 
			if (/Firefox\/(\S+)/.test(ua)) {
				browser.ver = RegExp["$1"];
				browser.firefox = parseFloat(browser.ver);
			}
		} else if (/MSIE ([^;]+)/.test(ua)) {
			engine.ver = browser.ver = RegExp["$1"];
			engine.ie = browser.ie = parseFloat(engine.ver);
		}
		//检测浏览器
		browser.ie = engine.ie;
		browser.opera = engine.opera;
		//检测平台
		var p = navigator.platform;
		system.win = p.indexOf("Win") == 0;
		system.mac = p.indexOf("Mac") == 0;
		system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
		//检测 Windows 操作系统
		if (system.win) {
			if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
				if (RegExp["$1"] == "NT") {
					switch (RegExp["$2"]) {
						case "5.0":
							system.win = "2000";
							break;
						case "5.1":
							system.win = "XP";
							break;
						case "6.0":
							system.win = "Vista";
							break;
						case "6.1":
							system.win = "7";
							break;
						default:
							system.win = "NT";
							break;
					}
				} else if (RegExp["$1"] == "9x") {
					system.win = "ME";
				} else {
					system.win = RegExp["$1"];
				}
			}
		}
		//移动设备
		system.iphone = ua.indexOf("iPhone") > -1;
		system.ipod = ua.indexOf("iPod") > -1;
		system.ipad = ua.indexOf("iPad") > -1;
		system.nokiaN = ua.indexOf("NokiaN") > -1;
		//windows mobile 
		if (system.win == "CE") {
			system.winMobile = system.win;
		} else if (system.win == "Ph") {
			if (/Windows Phone OS (\d+.\d+)/.test(ua)) {;
				system.win = "Phone";
				system.winMobile = parseFloat(RegExp["$1"]);
			}
		}

		//检测 iOS 版本
		if (system.mac && ua.indexOf("Mobile") > -1) {
			if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
				system.ios = parseFloat(RegExp.$1.replace("_", "."));
			} else {
				system.ios = 2; //不能真正检测出来，所以只能猜测
			}
		}
		//检测 Android 版本
		if (/Android (\d+\.\d+)/.test(ua)) {
			system.android = parseFloat(RegExp.$1);
		}
		//游戏系统
		system.wii = ua.indexOf("Wii") > -1;
		system.ps = /playstation/i.test(ua);
		//返回这些对象
		return {
			engine: engine,
			browser: browser,
			system: system
		};
	},
	/**
	 * [cutstr 字符串长度截取]
	 * @param  {[string]} str [被截取的字符串]
	 * @param  {[number]} len [长度]
	 * @return {[string]}     [截取的字符串]
	 */
	cutstr: function(str, len) {
		var temp,
			icount = 0,
			patrn = /[^\x00-\xff]/,
			strre = "";
		for (var i = 0; i < str.length; i++) {
			if (icount < len - 1) {
				temp = str.substr(i, 1);
				if (patrn.exec(temp) == null) {
						icount = icount + 1;
				} else {
					icount = icount + 2;
				}
				strre += temp;
			} else {
				break;
			}
		}
		return strre + "...";
	},
	/**
	 * [replaceAll 替换全部]
	 * @param  {[string]} s1 [被替换的字符串]
	 * @param  {[string]} s2 [替换字符串]
	 * @return {[string]}    [新的字符串]
	 */
	replaceAll: function(s1, s2){
		return String.prototype.replace(new RegExp(s1, "gm"), s2);
	},
	/**
	 * [trim 清除空格]
	 * @return {[string]} [新字符串]
	 */
	trim: function(){
		var reExtraSpace = /^\s*(.*?)\s+$/;
		return String.prototype.replace(reExtraSpace, "$1");
	},
	/**
	 * [ltrim 清除左空格]
	 * @param  {[string]} s [要清除的字符串]
	 * @return {[string]}   [清除后的字符串]
	 */
	ltrim: function(s){
		return s.replace(/^(\s*|*)/, "");
	},
	/**
	 * [rtrim 清除右空格]
	 * @param  {[string]} s [要清除的字符串]
	 * @return {[string]}   [清除后的字符串]
	 */
	rtrim: function(s){
		return s.replace(/(\s*|*)$/, "");
	},
	/**
	 * [startWith 判断是否以某个字符串开头]
	 * @param  {[tring]} s [开头字符串]
	 * @return {[boolean]}   [true or false]
	 */
	startWith: function(s){
		return String.prototype.indexOf(s) == 0;
	},
	/**
	 * [endWith 判断是否以某个字符串结束]
	 * @param  {[string]} origin [源字符串]
	 * @param  {[string]} s      [结束字符串]
	 * @return {[boolean]}        [true or false]
	 */
	endWith: function(origin, s){
		var l = origin.length - s.length;
		return String.prototype.lastIndexOf(s) == l;
	},
	/**
	 * [htmlEncode 转义html标签]
	 * @param  {[string]} text [要转义的html字符串]
	 * @return {[string]}      [转义后的字符串]
	 */
	htmlEncode: function(text){
		return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
	},
	/**
	 * [addFavorite 加入收藏夹]
	 * @param {[string]} sUrl   [指定的URL添加到收藏夹]
	 * @param {[string]} sTitle [标题]
	 */
	addFavorite: function(sUrl, sTitle){
		try{
			window.external.addFavorite(sUrl, sTitle);
		}catch(e){
			try{
				window.sidebar.addPanel(sTitle, sUrl, "");
			}catch(e){
				alert("加入收藏失败，请使用Ctrl+D进行添加");
			}
		}
	},
	setHomePage: function(url){
		if(document.all){
			document.body.style.behavior = "url(#default#homepage)";
			document.body.setHomePage(url);
		}else if(window.sidebar){
			if(window.netscape){
				try{
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXpConnect");
				}catch(e){
					alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
				}
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', url);
		}
	}
}