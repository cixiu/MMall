/*
* @Author: cixiu
* @Date:   2017-07-28 23:15:05
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-28 23:24:12
*/

require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSlide = require('page/common/nav-slide/index.js');

var page = {
	init: function () {
		this.onLoad();
	},
	onLoad: function () {
		// 初始化左侧边栏
		navSlide.init({
			name: 'about'
		});
	}
};

$(function () {
	page.init();
})