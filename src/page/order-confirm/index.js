/*
* @Author: cixiu
* @Date:   2017-07-27 16:03:28
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-28 10:19:22
*/

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');

var page = {
	data: {
		selectedAddressId: null
	},
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		this.loadAddresList();
		this.loadProductList()
	},
	bindEvent: function () {
		var _this = this;
		// 地址的选择
		$(document).on('click', '.address-item', function () {
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $(this).data('id');
		});
		// 提交订单
		$(document).on('click', '.order-submit', function () {
			var shippingId = _this.data.selectedAddressId;
			if (shippingId) {
				_order.createOrder({
					shippingId: shippingId
				}, function (res) {
					window.location.href = './payment.html?orderNumber=' + res.orderNo;
				}, function (errMsg) {
					_mm.errorTips(errMsg);
				})
			} else {
				_mm.errorTips('请先选择一个收货地址~~');
			}
		});
		// 添加新地址
		$(document).on('click', '.address-add', function () {
			addressModal.show({
				isUpdate: false,
				onSuccess: function () {
					_this.loadAddresList();
				}
			})
		});
		// 地址的编辑
		$(document).on('click', '.address-update', function (ev) {
			var shippingId = $(this).parents('.address-item').data('id');
			ev.stopPropagation();
			_address.getAddress(shippingId, function (res) {
				addressModal.show({
					isUpdate: true,
					data: res,
					onSuccess: function () {
						_this.loadAddresList();
					}
				});
			}, function (errMsg) {
				_mm.errorTips(errMsg);
			});
		});
		// 地址的删除
		$(document).on('click', '.address-delete', function (ev) {
			var shippingId = $(this).parents('.address-item').data('id');
			ev.stopPropagation();
			if (window.confirm('您确定要删除该地址吗?')) {
				_address.deleteAddress(shippingId, function (res) {
					_this.loadAddresList();
				}, function (errMsg) {
					_mm.errorTips(errMsg);
				});
			}
		});
	},
	// 加载地址列表
	loadAddresList: function () {
		var _this = this;
		$('.address-con').html('<div class="loading"></div>');
		// 获取地址列表
		_address.getAddressList(function (res) {
			_this.addressFilter(res);
			var addressHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(addressHtml);
		}, function (errMsg) {
			$('.address-con').html('<p class="err-tip">地址加载失败~~</p>')
		});
	},
	// 处理地址列表的选中状态
	addressFilter: function (data) {
		if (this.data.selectedAddressId) {
			var selectedAddressIdFlag = false;
			for (var i = 0, length = data.list.length; i < length; i++) {
			 	if (data.list[i].id === this.data.selectedAddressId) {
			 		data.list[i].isActive = true;
			 		selectedAddressIdFlag = true;
			 	}
			}
			// 如果以前选中的地址被删除，则将其保存的id也删除
			if (!selectedAddressIdFlag) {
				this.data.selectedAddressId = null;
			}
		}
	},
	// 加载商品列表
	loadProductList: function () {
		var _this = this;
		$('.product-con').html('<div class="loading"></div>');
		// 获取购物车列表
		_order.getProductList(function (res) {
			var productHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(productHtml);
		}, function (errMsg) {
			$('.product-con').html('<p class="err-tip">商品信息加载失败~~</p>')
		});
	}
};

$(function () {
	page.init();
})