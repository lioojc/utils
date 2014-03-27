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

// 滚动条高
function scrollTop(){
	return document.documentElement.scrollTop || document.body.scrollTop;
}

// 滚动条左
function scrollLeft(){
	return document.documentElement.scrollLeft || document.body.scrollLeft;
}

// 内容高度
function scrollH(){
	return document.body.scrollHeight;
}

// 文档高
function offsetH(){
	return document.body.offsetHeight;
}

// 文档宽
function offsetW(){
	return document.body.offsetWidth;
}

// 可视区宽高
function view(){
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	}
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
			obj.style.offsetLeft = ev.clientX - disX + 'px';
			obj.style.offsetTop = ev.clientY - disY + 'px';
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

	}
}