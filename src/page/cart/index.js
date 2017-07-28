/*
* @Author: cixiu
* @Date:   2017-07-27 09:05:00
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-28 18:09:33
*/

require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		this.loadCart();
	},
	bindEvent: function () {
		var _this = this;
		// 商品的选中和取消
		$(document).on('click', '.cart-select', function () {
			var $this = $(this);
			var productId = $this.parents('.cart-table').data('product-id');
			// 选中
			if ($this.is(':checked')) {
				_cart.selectProduct(productId, function (res) {
					_this.renderCart(res);
				}, function (errMsg) {
					_this.showCarError()
				});
			} else { // 取消选中
				_cart.unselectProduct(productId, function (res) {
					_this.renderCart(res);
				}, function (errMsg) {
					_this.showCarError()
				})
			}
		});
		// 商品的全选和非全选
		$(document).on('click', '.cart-select-all', function () {
			var $this = $(this);
			// 全选
			if ($this.is(':checked')) {
				_cart.selectAllProduct(function (res) {
					_this.renderCart(res);
				}, function (errMsg) {
					_this.showCarError()
				});
			} else { // 取消全选
				_cart.unselectAllProduct(function (res) {
					_this.renderCart(res);
				}, function (errMsg) {
					_this.showCarError()
				})
			}
		});
		// 商品数量的加减
		$(document).on('click', '.count-btn', function () {
			var $this = $(this);
			var $countInput = $this.siblings('.count-input');
			var type = $this.hasClass('plus') ? 'plus' : 'minus';
			var productId = $this.parents('.cart-table').data('product-id');
			var currentCount = parseInt($countInput.val());
			var minCount = 1;
			var maxCount = parseInt($countInput.data('max'));
			var newCount = 0;
			if (type === 'plus') {
				if (currentCount >= maxCount) {
					_mm.errorTips('该商品已达上限');
					return;
				}
				newCount = currentCount + 1;
			} else if (type === 'minus') {
				if (currentCount <= minCount) {
					return;
				}
				newCount = currentCount - 1;			
			}
			_cart.updateProduct({
				productId: productId,
				count: newCount
			}, function (res) {
				_this.renderCart(res);
			}, function (errMsg) {
				_this.showCarError()
			})
		});
		// 删除单个商品
		$(document).on('click', '.cart-delete', function() {
			if (window.confirm('你确定要删除该商品吗?')) {
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		// 删除选中的商品
		$(document).on('click', '.delete-selected', function() {
			if (window.confirm('你确定要删除选中的商品吗?')) {
				var arrProductIds = [];
				var $selectedItem = $('.cart-select:checked');
				for (var i = 0, iLen = $selectedItem.length; i < iLen; i++) {
					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}
				if (arrProductIds.length) {
					_this.deleteCartProduct(arrProductIds.join(','));
				} else {
					_mm.errorTips('您还没有选中商品哦~~');
				}
			}
		});
		// 去结算
		$(document).on('click', '.btn-submit', function() {
			if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0 ) {
				window.location.href = './order-confirm.html';
			} else {
				_mm.errorTips('请先选择商品在进行结算~~');
			}
		});
	},
	// 加载购物车列表
	loadCart: function () {
		var _this = this;
		var html = '';
		// 获取购物车列表
		_cart.getCartList(function (res) {
			_this.renderCart(res);
		}, function (errMsg) {
			$('.page-wrap').html('<p class="err-tip">哪里不对了，请刷新试试~~</p>')
		});
	},
	renderCart: function (data) {
		this.filter(data);
		// 缓存购物车信息
		this.data.cartInfo = data;
		// 生成HTML
		var cartHtml = _mm.renderHtml(templateIndex, data);
		$('.page-wrap').html(cartHtml);
		// 通知导航栏更新购物车数量
		nav.loadCartCount();
	},
	filter: function (data) {
		data.noEmpty = !!data.cartProductVoList.length;
	},
	// 显示错误信息
	showCarError: function () {
		$('.page-wrap').html('<p class="err-tip">哪里不对了，请刷新试试~~</p>');
	},
	// 删除指定的商品，支持批量删除，productId用逗号分开
	deleteCartProduct: function (productIds) {
		var _this = this;
		_cart.deleteProduct(productIds, function (res) {
			_this.renderCart(res);
		}, function (errMsg) {
			_this.showCarError()
		})
	}
};

$(function () {
	page.init();
})