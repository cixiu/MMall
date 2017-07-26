/*
* @Author: cixiu
* @Date:   2017-07-26 16:33:22
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-26 19:37:07
*/

require('./index.css');
var _mm = require('util/mm.js');
var templatePagination = require('./index.string');

var Paginatiion = function () {
	var _this = this;
	this.defaulOption = {
		container: null,
		pageNum: 1,
		pageRange: 3,
		onSelectPage: null
	};
	// 事件处理
	$(document).on('click', '.pg-item', function () {
		var $this = $(this);
		// 有active和disabled的class的元素不能点击
		if ($this.hasClass('active') || $this.hasClass('disabled')) {
			return;
		}
		typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
	})
}

// 渲染分页组件
Paginatiion.prototype.render = function (userOption) {
	// 合并选项
	this.option = $.extend({}, this.defaulOption, userOption);
	// 判断container是否是jQuery对象
	if (!(this.option.container instanceof jQuery)) {
		return;
	}
	// 判断是否只有一页
	if (this.option.pages <= 1) {
		return;
	}
	this.option.container.html(this.getPagination());
}

Paginatiion.prototype.getPagination = function () {
	var html = '';
	var option = this.option;
	var pageArray = [];
	var start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1;
	var end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
	// 上一页按钮的数据
	pageArray.push({
		name: '上一页',
		value: option.prePage,
		disabled: !option.hasPreviousPage
	});
	// 数字按钮
	for (var i = start; i <= end; i++) {
		pageArray.push({
			name: i,
			value: i,
			active: i === option.pageNum
		})
	}
	// 下一页按钮的数据
	pageArray.push({
		name: '下一页',
		value: option.nextPage,
		disabled: !option.hasNextPage
	});
	html = _mm.renderHtml(templatePagination, {
		pageArray: pageArray,
		pageNum: option.pageNum,
		pages: option.pages
	});
	return html;
}

module.exports = Paginatiion;