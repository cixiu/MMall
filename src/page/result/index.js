/*
* @Author: cixiu
* @Date:   2017-07-24 17:01:33
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-25 00:55:04
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function () {
	var type = _mm.getUrlParam('type') || 'default';
	var $element = $('.' + type + '-success');
	// 显示对应的提示元素
	$element.show();
})