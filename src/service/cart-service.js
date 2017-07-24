/*
* @Author: cixiu
* @Date:   2017-07-24 18:44:10
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-24 18:47:55
*/
var _mm = require('util/mm.js');

var _cart = {
	// 获取购物车数量
	getCartCount: function (resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		})
	}
};

module.exports = _cart;