// 获取非行间样式
// 1、不要获取复合样式
// 2、不要写空格
// 3、获取的值类型：字符串
// 4、能读、不能写
// 5、获取样式之前，必须要设置
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

// 通过className获取DOM节点
/*function getByClass(sClass, parent){
	var aEles = (parent || document).getElementsByTagName('*');
	var arr = [];

	for (var i = 0; i < aEles.length; i++) {
		var aClass = aEles[i].className.split(' ');

		for(var j = 0; j < aClass.length; j++){
			if(aClass[j] == sClass){
				arr.push(aEles[i]);
			}
		}

	}
	return arr;
}*/
// 通过className获取DOM节点(正则版)
function getByClass(sClass, parent){
	var aEles = (parent || document).getElementsByTagName('*');
	var arr = [];
	var re = new RegExp( '(^|\\s)' + sClass + '(\\s|$)' );

	for (var i = 0; i < aEles.length; i++) {
		if( re.test(aEles[i].className ) ){
			arr.push(aEles[i]);
		}
	}
	return arr;
}

// 添加类名
function addClass(obj, sClass){
	var aClass = obj.className.split(' ');

	if(!aClass[0]){
		obj.className = sClass;
		return;
	}

	for (var i = 0; i < aClass.length; i++) {
		if(aClass[i] == sClass)return;
	}

	obj.className += ' '+ sClass;
}

// 删除类名
function removeClass(obj, sClass){
	var aClass = obj.className.split(' ');

	if(!aClass[0])return;

	for (var i = 0; i < aClass.length; i++) {
		if(aClass[i] == sClass){
			aClass.splice(i, 1);
			obj.className = aClass.join(' ');
			return;
		}
	}

}

// 是否含有类名
function hasClass(obj, sClass){
	var aClass = obj.className.split(' ');

	if(!aClass[0])return false;

	for (var i = 0; i < aClass.length; i++) {
		if(aClass[i] == sClass)return true;
	}

	return false;
}

// 窗口可视区宽高
function view(){
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	}
}

// 滚动条高
function scrollTop(){
	return document.documentElement.scrollTop || document.body.scrollTop;
}

// 内容高度
function scrollH(obj){
	return obj.scrollHeight;
}

// 文档高
function offsetH(){
	return document.body.offsetHeight;
}

// 文档宽
function offsetW(){
	return document.body.offsetWidth;
}

// 左边距
function posLeft(obj){
	var iLeft = 0;

	while(obj){
		iLeft += obj.offsetLeft;
		obj = obj.offsetParent;
	}

	return iLeft;
}

// 上边距
function posTop(obj){
	var iTop = 0;

	while(obj){
		iTop += obj.offsetTop;
		obj = obj.offsetParent;
	}

	return iTop;
}

// 是否是IE6
function isIE6(){
	var str = window.navigator.userAgent.toLowerCase();

	if(str.indexOf('msie6') != -1)return true;

	return false;
}

// 第一个DOM节点
function first(obj){

	if(!obj.firstChild) return null;

	return obj.firstChild.nodeType == 1 ? obj.firstChild : next(obj.firstChild);
}

// 最后的DOM节点
function last(obj){

	if(!obj.lastChild) return null;

	return obj.lastChild.nodeType == 1 ? obj.lastChild : prev(obj.lastChild);
}

// 前一个DOM节点
function prev(obj){

	if(!obj.previousSibling) return null;

	return obj.previousSibling.nodeType == 1 ? obj.previousSibling : prev(obj.previousSibling);
}

// 后一个DOM节点
function next(obj){

	if(!obj.nextSibling) return null;

	return obj.nextSibling.nodeType == 1 ? obj.nextSibling : next(obj.nextSibling);
}

// 事件绑定
function bind(obj, evname, fn){
	if(obj.addEventListener){
		obj.addEventListener(evname, fn, false);
	}else{
		obj.attachEvent('on'+evname, function(){
			fn.call(obj);
		});
	}
}

// 事件解绑
function unbind(obj, evname, fn){
	if(obj.removeEventListener){
		obj.removeEventListener(evname, fn, false);
	}else{
		obj.detachEvent('on'+evname, function(){
			fn.call(obj);
		})
	}
}

// 抖动
function shake(obj){
	var posX = parseInt(getStyle(obj, 'left')); //当前位置left值
	var arr = [];
	var num = 0;

	for(var i = 22; i > 0; i-=2){
		arr.push(i);
	}
	arr.push(0);

	obj.timer = setInterval(function(){

		obj.style.left = posX + arr[num] + 'px';
		num++;

		if(num == arr.length){
			clearInterval(obj.timer);
		}

	}, 30);
}

// 变为两位数
function toDouble(num){
	return num<10 ? '0'+num : ''+num;
}

// 拖拽
function drag(obj){
	obj.onmousedown = function(ev){
		var ev = ev || window.event;
		var disX = ev.clientX - obj.offsetLeft;
		var disY = ev.clientY - obj.offsetTop;

		if(obj.setCapture){
			obj.setCapture();
		}

		document.onmousemove = function(ev){
			var ev = ev || window.event;
			obj.style.left = ev.clientX - disX + 'px';
			obj.style.top = ev.clientY - disY + 'px';
		}

		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
			if(obj.releaseCapture){
				obj.releaseCapture();
			}
		}

		return false;
	}
}

// 碰撞
function touch(src, target){
	var srcL1 = src.offsetLeft;
	var srcT1 = src.offsetTop;
	var srcL2 = src.offsetLeft + src.offsetWidth;
	var srcT2 = src.offsetTop + src.offsetHeight;

	var targetL1 = target.offsetLeft;
	var targetT1 = target.offsetTop;
	var targetL2 = target.offsetLeft + target.offsetWidth;
	var targetT2 = target.offsetTop + target.offsetHeight;

	if( srcL2 > targetL1 && srcL1 < targetL2 && srcT2 > targetT1 && srcT1 < targetT2){
		return true;
	}

	return false;
}

// 设置cookie
function setCookie(key, value, t){
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + t);
	document.cookie = key + '=' + value + ';expires=' + oDate.toUTCString();
}

// 获取cookie
function getCookie(key){
	var arr1 = document.cookie.split('; ');
	for(var i = 0; i < arr1.length; i++){
		var arr2 = arr1[i].split('=');
		if (arr2[0] == key) {
			return arr2[1];
		}
	}
}

// 删除cookie
function removeCookie(key){
	setCookie(key, '', -1);
}

// 运动
function startMove(obj, json, fn){
	clearInterval(obj.timer);
	var iSpeed = 0;
	var iCur = 0;

	obj.timer = setInterval(function(){
		var iBtn = true;

		for(var attr in json){
			if(attr == 'opacity'){
				iCur = Math.round(getStyle(obj, attr) * 100);
			}else{
				iCur = parseInt(getStyle(obj, attr));
			}
			iSpeed = (json[attr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if(iCur != json[attr]){
				iBtn = false;
				if(attr == 'opacity'){
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
				}else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		}

		if (iBtn) {
			clearInterval(obj.timer);
			fn && fn.call(obj);
		}

	}, 30);
}

// 鼠标滚动
function addMouseWheel(obj, fn1, fn2){
	obj.onmousewheel = fn;
	if(obj.addEventListener){
		obj.addEventListener('DOMMouseScroll', fn, false);
	}

	function fn(ev){
		var ev = ev || window.event;
		var iBtn = false;
		if(ev.wheelDelta){
			iBtn = ev.wheelDelta > 0 ? true : false;
		}else{
			iBtn = ev.detail < 0 ? true : false;
		}

		iBtn ? fn1.call(obj) : fn2.call(obj);

		if(ev.preventDefault){
			ev.preventDefault();
		}

		return false;
	}
}

// 覆盖配置参数
function extend(obj1, obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}

// 自定义事件
function bindEvent(obj, events, fn){
	obj.listener = obj.listener || {};
	obj.listener[events] = obj.listener[events] || [];
	obj.listener[events].push(fn);

	if(obj.nodeType == 1){
		if(obj.addEventListener){
			obj.addEventListener(events, fn, false);
		}else{
			obj.attachEvent('on'+events, function(){
				fn.call(obj);
			});
		}
	}
}

// 主动触发事件
function fireEvent(obj, events){
	if(obj.listener && obj.listener[events]){
		for (var i = 0; i < obj.listener[events].length; i++) {
			obj.listener[events][i]();
		}
	}
}

function ajax(opt){
	var xhr = null;

	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	var defalut = {
		method :   opt.method || 'get',
		url :      opt.url || '',
		data :     opt.data || '',
		dataType : opt.dataType || 'text',
		success :  opt.success || function (){},
		fail :     opt.fail || function(){}
	}

	if(defalut.method == 'get' && defalut.data){
		defalut.url += '?'+defalut.data;
	}

	xhr.open(defalut.method, defalut.url, true);
	if(defalut.method == 'get'){
		xhr.send();
	}else{
		xhr.setRquestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(defalut.data);
	}

	xhr.onreadystatechange = function(){

		if(xhr.readyState == 4){
			if(xhr.status == 200){
				var data = xhr.responseText;

				switch(defalut.dataType){
					case 'json':
						data = JSON.parse(data);
						break;
					case 'xml':
						data = xml.responseXML;
						break;
				}

				defalut.success(data);
			}else{
				defalut.fail(xhr.status);
			}
		}

	}
}

// 设置时间
/*
	例子: time = 2014-01-01;
*/
function newDate(time){
	if(!time) return '';
	var time = time.split(/[^\d]/g);
	var date = new Date();
	date.setUTCFullYear(time[0], time[1] - 1, time[2]);
	date.setHours(0, 0, 0, 0);
	return date;
}
