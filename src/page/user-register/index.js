/*
* @Author: cixiu
* @Date:   2017-07-24 22:56:12
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-25 00:46:31
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
		// 验证用户名
		$('#username').blur(function () {
			var username = $.trim($(this).val());
			if (!username) {
				return;
			}
			_user.checkUsername(username, function (res) {
				formError.hide();
			}, function (errMsg) {
				formError.show(errMsg);
			});
		});
		// 注册按钮点击
		$('#submit').click(function () {
			_this.submit();
		});
		// 按下回车键也进行注册
		$('.user-content').keyup(function (ev) {
			if (ev.keyCode === 13) {
				_this.submit();
			}
		})
	},
	// 注册提交
	submit: function () {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
			passwordConfirm: $.trim($('#password-confirm').val()),
			phone: $.trim($('#phone').val()),
			email: $.trim($('#email').val()),
			question: $.trim($('#question').val()),
			answer: $.trim($('#answer').val())
		};
		var validateResult = this.formValidate(formData);
		// 验证通过
		if (validateResult.status) {
			_user.register(formData, function (res) {
				window.location.href = './result.html?type=register';
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
		if (formData.password.length < 6) {
			result.msg = '密码不能小于6位';
			return result;
		}
		if (formData.password !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
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
});