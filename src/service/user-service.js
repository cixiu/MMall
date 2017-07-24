/*
* @Author: cixiu
* @Date:   2017-07-24 17:50:47
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-25 00:23:52
*/
var _mm = require('util/mm.js');

var _user = {
	// 用户登录
	login: function (userInfo, resolve, reject) {
		_mm.request({
			method: 'POST',
			url: _mm.getServerUrl('/user/login.do'),
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	// 验证用户名
	checkUsername: function (username, resolve, reject) {
		_mm.request({
			method: 'POST',
			url: _mm.getServerUrl('/user/check_valid.do'),
			data: {
				type: 'username',
				str: username
			},
			success: resolve,
			error: reject
		})
	},
	// 用户注册
	register: function (userInfo, resolve, reject) {
		_mm.request({
			method: 'POST',
			url: _mm.getServerUrl('/user/register.do'),
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	// 检查登录状态
	checkLogin: function (resolve, reject) {
		_mm.request({
			method: 'POST',
			url: _mm.getServerUrl('/user/get_user_info.do'),
			success: resolve,
			error: reject
		})
	},
	// 登出
	logout: function (resolve, reject) {
		_mm.request({
			method: 'POST',
			url: _mm.getServerUrl('/user/logout.do'),
			success: resolve,
			error: reject
		})
	}
};

module.exports = _user;