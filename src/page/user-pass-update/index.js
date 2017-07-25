/*
* @Author: cixiu
* @Date:   2017-07-25 16:57:46
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-25 17:26:37
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSlide = require('page/common/nav-slide/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	bindEvent: function () {
		var _this = this;
		$(document).on('click', '.btn-submit', function () {
			var userInfo = {
				password: $.trim($('#password').val()),
				passwordNew: $.trim($('#password-new').val()),
				passwordConfirm: $.trim($('#password-confirm').val())
			}
			var validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				_user.updatePassword({
					passwordOld: userInfo.password,
					passwordNew: userInfo.passwordNew
				}, function (res, msg) {
					_mm.successTips(msg);
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
			name: 'user-pass-update'
		});
	},
	validateForm: function (formData) {
		var result = {
			status: false,
			msg: ''
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '旧密码不能为空';
			return result;
		}
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '密码长度不能小于6位';
			return result;
		}
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次密码不一致';
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