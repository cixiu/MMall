/*
* @Author: cixiu
* @Date:   2017-07-23 17:53:02
* @Last Modified by:   cixiu
* @Last Modified time: 2017-07-24 22:58:03
*/

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function (name, title) {
	return {
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		title: title,
		inject: true,
		hash: true,
		chunks: ['common', name]
	}
}

var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'user-login': ['./src/page/user-login/index.js'],
		'user-register': ['./src/page/user-register/index.js'],
		'result': ['./src/page/result/index.js']
	},
	output: {
		path: './dist',
		publicPath: '/dist',
		filename: 'js/[name].js'
	},
	resolve: {
		alias: {
			node_modules: __dirname + '/node_modules',
			util: __dirname + '/src/util',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image'
		}
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
			{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100000&name=resource/[name].[ext]' },
			{ test: /\.(string)$/, loader: 'html-loader'}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
	]
};

if (WEBPACK_ENV === 'dev') {
	config.entry.common.push('webpack-dev-server/client?http://localhost: 8088/');
}

module.exports = config;