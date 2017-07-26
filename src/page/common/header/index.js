/*
* @Author: cixiu
* @Date:   2017-07-24 12:26:36
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-26 09:55:48
*/
require('./index.css');
var _mm = require('util/mm.js');
/* 通用页面头部 */
var header = {
	init: function () {
		this.bindEvent();
		this.onLoad();
	},
	onLoad: function () {
		var keyword = _mm.getUrlParam('keyword');
		// keyword存在，回填到搜索框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function () {
		var _this = this;
		// 点击搜索按钮以后，做搜索提交
		$('#search-btn').click(function () {
			_this.searchSubmit();
		});
		// 按下回车键，也做搜索提交
		$('#search-input').keyup(function (ev) {
			if (ev.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	// 搜索提交
	searchSubmit: function () {
		var keyword = $.trim($('#search-input').val());
		// 如果提交搜索有keyword,则正常跳转到list页面
		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		} else {  // 如果提交搜索keyword为空,则返回到首页
			_mm.goHome();
		}
	}
};

header.init();