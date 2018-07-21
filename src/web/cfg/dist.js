/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:46:54
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-23 16:46:54
 * @Description: dist环境配置
 */
const path = require('path');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');
const pluginSettings = require('./plugins');
const loaderRuleSettings = require('./loader.rules');
// 目标业务组件
const targetComponents = require(`../targets/${process.env.FASTMAN_WEBPACK_TARGET}`);

let config = Object.assign({}, baseConfig, {
    mode: 'production',
    entry: Object.assign({
        // TODO 模块定义 ...

    }, new targetComponents().webComponents),
    output: {
        // 生成文件的目录
        path: path.join(defaultSettings.distPath, defaultSettings.publicPath),
        // 可添加hash值，可选配置[hash]
        filename: '[name].[hash].js',
        // 资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换
        publicPath: '..' + defaultSettings.publicPath
    },
    cache: false,
    devtool: 'source-map',
    plugins: [
        // 允许错误不打断程序
        pluginSettings.noEmitOnErrorsPlugin,
    ].concat(pluginSettings.getDefaultPlugins(), pluginSettings.getHtmlWebpackPlugins()),
    module: loaderRuleSettings.getDefaultModules()
});

module.exports = config;
