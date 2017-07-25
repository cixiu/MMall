/*
* @Author: cixiu
* @Date:   2017-07-25 12:59:02
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-25 16:51:47
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
		this.bindEvent();
	},
	bindEvent: function () {
		var _this = this;
		$(document).on('click', '.btn-submit', function () {
			var userInfo = {
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val()),
			}
			var validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				_user.updateUserInfo(userInfo, function (res, msg) {
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				}, function (errMsg) {
					_mm.errorTips(errMsg);
				});
			} else {
				_mm.errorTips(validateResult.msg);
			}
		});
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
	},
	validateForm: function (formData) {
		var result = {
			status: false,
			msg: ''
		}
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = '手机格式不正确';
			return result;
		}
		if (!_mm.validate(formData.email, 'email')) {
			result.msg = '邮箱有误';
			return result;
		}
		if (!_mm.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if (!_mm.validate(formData.answer, 'require')) {
			result.msg = '密码提示问题的答案不能为空';
			return result;
		}
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};

$(function () {
	page.init();
})