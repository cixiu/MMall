/*
* @Author: cixiu
* @Date:   2017-07-25 10:45:17
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-25 12:01:05
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
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		this.loadStepUsername();
	},
	bindEvent: function () {
		var _this = this;
		// 用户名下一步点击
		$('#submit-username').click(function () {
			var username = $.trim($('#username').val());
			if (username) {
				_user.getQuestion(username, function (res) {
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				}, function (errMsg) {
					formError.show(errMsg);
				})
			} else {
				formError.show('请输入用户名');
			}
		});
		// 密码提升问题下一步点击
		$('#submit-answer').click(function () {
			var answer = $.trim($('#answer').val());
			if (answer) {
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				}, function (res) {
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				}, function (errMsg) {
					formError.show(errMsg);
				})
			} else {
				formError.show('请输入提升问题答案');
			}
		});
		// 新密码下一步点击
		$('#submit-password').click(function () {
			var password = $.trim($('#password').val());
			if (password && password.length >= 6) {
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				}, function (res) {
					window.location.href = './result.html?type=pass-reset';
				}, function (errMsg) {
					formError.show(errMsg);
				})
			} else {
				formError.show('请输入不少于6位的新密码');
			}
		});
	},
	// 加载用户名第一步
	loadStepUsername: function () {
		$('.step-username').show();
	},
	// 加载密码提示问题
	loadStepQuestion: function () {
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},
	// 加载设置新密码
	loadStepPassword: function () {
		formError.hide();
		$('.step-question').hide().siblings('.step-password').show()
	}
};

$(function () {
	page.init();
});