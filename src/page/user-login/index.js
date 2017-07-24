/*
* @Author: cixiu
* @Date:   2017-07-23 18:04:52
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-24 22:51:01
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
	show: function (errMsg) {
		$('.error-item').show().find('.error-msg').text(errMsg);
	},
	hide: function () {
		$('.error-item').hide().find('.error-msg').text('');
	}
}

var page = {
	init: function () {
		this.bindEvent();
	},
	bindEvent: function () {
		var _this = this;
		// 登录按钮点击
		$('#submit').click(function () {
			_this.submit();
		});
		// 按下回车键也进行登录
		$('.user-content').keyup(function (ev) {
			if (ev.keyCode === 13) {
				_this.submit();
			}
		})
	},
	// 登录提交
	submit: function () {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		var validateResult = this.formValidate(formData);
		// 验证通过
		if (validateResult.status) {
			_user.login(formData, function (res) {
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function (errMsg) {
				formError.show(errMsg);
			})
		} else {
			formError.show(validateResult.msg);
		}
	},
	// 表单字段的验证
	formValidate: function (formData) {
		var result = {
			status: false,
			msg: ''
		}
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};

$(function () {
	page.init();
});