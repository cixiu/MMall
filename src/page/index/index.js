/*
* @Author: cixiu
* @Date:   2017-07-23 17:35:11
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-26 00:50:03
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/unslider/index.js');
var navSlide = require('page/common/nav-slide/index.js');
var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');

$(function () {
	// 渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	// 初始化banner
    var $unslider = $('.banner').unslider({
    	dots: true
    });
    // 前一张和后一张的事件绑定
    $('.banner-con .banner-arrow').click(function () {
    	var forward = this.className.split(" ")[1];
    	$unslider.data('unslider')[forward]();
    });
});