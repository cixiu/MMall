/*
* @Author: cixiu
* @Date:   2017-07-23 22:00:21
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-27 00:00:59
*/

var Hogan = require('hogan');

var conf = {
	serverHost: ''
}

var mm = {
	request: function (param) {
		var _this = this;
		// ajax请求
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success: function (res) {
				if (res.status === 0) {  // 请求成功
					typeof param.success === 'function' && param.success(res.data, res.msg);
				} else if (res.status === 10) {  // 没有登录状态，需要强制登录
					_this.doLogin();
				} else if (res.status === 1) {  // 请求数据错误
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error: function (err) {  // 请求失败
				typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},
	// 获取服务器地址
	getServerUrl: function (path) {
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam: function (name) {
		var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模版
	renderHtml: function (htmlTemplate, data) {
		var template = Hogan.compile(htmlTemplate);
		var result = template.render(data);
		return result;
	},
	// 成功提示
	successTips: function (msg) {
		alert(msg || '操作成功');
	},
	// 错误提示
	errorTips: function (msg) {
		alert(msg || '操作失败');
	},
	// 字段验证，支持非空，手机，邮箱的判断
	validate: function (value, type) {
		// 非空验证
		var value = $.trim(value);
		if (type === 'require') {
			return !!value;
		}
		// 手机验证
		if (type === 'phone') {
			return /^1\d{10}$/.test(value);
		}
		// 邮箱验证
		if (type === 'email') {
			return /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/.test(value);
		}
	},
	// 同一登录请求
	doLogin: function () {
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	// 跳转至首页
	goHome: function () {
		window.location.href = './index.html'
	}
};

module.exports = mm;