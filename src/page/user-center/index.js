/*
* @Author: cixiu
* @Date:   2017-07-25 12:50:43
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-25 16:05:48
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSlide = require('page/common/nav-slide/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
	init: function () {
		this.onLoad();
	},
	onLoad: function () {
		// 初始化左侧边栏
		navSlide.init({
			name: 'user-center'
		});
		this.loadUserInfo();
	},
	// 加载用户信息
	loadUserInfo: function () {
		var userHtml = '';
		_user.getUserInfo(function (res) {
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function (errMsg) {
			_mm.errorTips(errMsg);
		})
	}
};

$(function () {
	page.init();
})