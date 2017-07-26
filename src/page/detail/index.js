/*
* @Author: cixiu
* @Date:   2017-07-26 19:52:11
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-26 23:37:07
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSlide = require('page/common/nav-slide/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
	data: {
		productId: _mm.getUrlParam('productId') || ''
	},
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		if (!this.data.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent: function () {
		var _this = this;
		// 图片预览
		$(document).on('mouseenter', '.p-img-item', function () {
			var imgUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imgUrl);
		});
		// count加减
		$(document).on('click', '.count-input-btn', function () {
			var type = $(this).hasClass('plus') ? 'plus' : 'minus';
			var $CountInput = $('.count-input');
			var currentCount = parseInt($CountInput.val());
			var minCount = 1;
			var maxCount = _this.data.detailInfo.stock || 1;
			if (type === 'plus') {
				$('.count-input').val(currentCount < maxCount ? currentCount + 1 : maxCount);
			} else if (type === 'minus') {
				$('.count-input').val(currentCount > minCount ? currentCount - 1 : minCount);
			}
		});
		// 加入购物车
		$(document).on('click', '.cart-add', function () {
			_cart.addTocart({
				productId: _this.data.productId,
				count: $('.count-input').val()
			}, function (res) {
				window.location.href = './result.html?type=cart-add';
			}, function (errMsg) {
				_mm.errorTips(errMsg);
			})
		});
	},
	// 加载商品列表
	loadDetail: function () {
		var _this = this;
		var html = '';
		var $pageWrap = $('.page-wrap')
		 $pageWrap.html('<div class="loading"></div>')
		_product.getProductDetail(this.data.productId, function (res) {
			// 处理小图的数据
			res.subImages = res.subImages.split(',')
			// 缓存商品详细信息
			_this.data.detailInfo = res;
			// 渲染模版
			html = _mm.renderHtml(templateIndex, res);
			$pageWrap.html(html);
		}, function (errMsg) {
			$pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
		});
	}
};

$(function () {
	page.init();
})