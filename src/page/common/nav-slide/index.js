/*
* @Author: cixiu
* @Date:   2017-07-24 14:53:13
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-24 16:48:27
*/

require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
// 侧边导航
var navSlide = {
	option: {
		name: '',
		navList: [
			{name: 'user-center', desc: '个人中心', href: './user-center.html'},
			{name: 'order-list', desc: '我的订单', href: './order-list.html'},
			{name: 'pass-updata', desc: '修改密码', href: './pass-updata.html'},
			{name: 'about', desc: '关于MMall', href: './about.html'}
		]
	},
	init: function (option) {
		$.extend(this.option, option);
		this.renderNav();
	},
	// 渲染导航菜单
	renderNav: function () {
		var len = this.option.navList.length;
		for (var i = 0; i < len; i++) {
			if (this.option.name === this.option.navList[i].name) {
				this.option.navList[i].isActive = true;
			}
		}
		// 渲染navList数据
		var navHtml = _mm.renderHtml(templateIndex, {
			navList: this.option.navList
		});
		// 把navHtml放入容器
		$('.nav-slide').html(navHtml);
	}
};

module.exports = navSlide;