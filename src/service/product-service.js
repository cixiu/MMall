/*
* @Author: cixiu
* @Date:   2017-07-26 09:51:05
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-26 22:42:20
*/

var _mm = require('util/mm.js');

var _product = {
	// 获取商品列表
	getProductList: function (listParam, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/product/list.do'),
			data: listParam,
			success: resolve,
			error: reject
		})
	},
	getProductDetail: function (productId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/product/detail.do'),
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		})
	}
}

module.exports = _product;