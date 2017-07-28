/*
* @Author: cixiu
* @Date:   2017-07-28 19:44:35
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-28 20:52:53
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
	data: {
		orderNo: _mm.getUrlParam('orderNumber')
	},
	init: function () {
		this.onLoad();
	},
	onLoad: function () {
		// 加载支付详情
		this.loadPayment();
	},
	// 加载支付详情
	loadPayment: function () {
		var _this = this;
		var paymentHtml = '';
		var $pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>')
		_payment.getPaymentInfo(this.data.orderNo, function (res) {
			paymentHtml = _mm.renderHtml(templateIndex, res);
			$pageWrap.html(paymentHtml);
			_this.listenOrderStatus()
		}, function (errMsg) {
			$pageWrap.html('<p class="err-tip">'+ errMsg +'</p>')
		})
	},
	// 监听订单状态
	listenOrderStatus: function () {
		var _this = this;
		this.paymentTimer = setInterval(function () {
			_payment.getPaymentStatus(_this.data.orderNo, function (res) {
				if (res === true) {
					window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNo;
				}
			})
		}, 5000)
	}
};

$(function () {
	page.init();
})