/*
* @Author: cixiu
* @Date:   2017-07-28 16:23:00
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-28 17:46:51
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSlide = require('page/common/nav-slide/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data: {
		orderNo: _mm.getUrlParam('orderNumber')
	},
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		// 初始化左侧边栏
		navSlide.init({
			name: 'order-list'
		});
		// 加载订单详情
		this.loadDetail();
	},
	bindEvent: function () {
		var _this = this;
		$(document).on('click', '.order-cancel', function () {
			if (window.confirm('您确定要取消订单吗?')) {
				_order.cancelOrder(_this.data.orderNo, function (res) {
					_mm.successTips('该订单取消成功!!!');
					_this.loadDetail();
				}, function (errMsg) {
					_mm.errorTips(errMsg);
				})
			}
		})
	},
	// 加载订单详情
	loadDetail: function () {
		var _this = this;
		var orderDetailHtml = '';
		var $content = $('.content');
		$content.html('<div class="loading"></div>')
		_order.getOrderDetail(this.data.orderNo, function (res) {
			_this.dataFilter(res);
			orderDetailHtml = _mm.renderHtml(templateIndex, res);
			$content.html(orderDetailHtml);
		}, function (errMsg) {
			$content.html('<p class="err-tip">'+ errMsg +'</p>')
		})
	},
	// 数据适配
	dataFilter: function (data) {
		data.needPay = data.status === 10;
		data.isCancelable = data.status === 10;
	}
};

$(function () {
	page.init();
})