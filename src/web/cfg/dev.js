/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:46:44
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-23 16:46:44
 * @Description: dev环境配置
 */
const path = require('path');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');
const pluginSettings = require('./plugins');
const loaderRuleSettings = require('./loader.rules');
// 目标业务组件
const targetComponents = require(`../targets/${process.env.FASTMAN_WEBPACK_TARGET}`);

let config = Object.assign({}, baseConfig, {
    mode: 'development',
    entry: Object.assign({
        // TODO 模块定义 ...

    }, new targetComponents().webComponents),
    output: {
        // 生成文件的目录，该目录相对于当前脚本而言，当前目录地址即：dist/
        path: path.join(defaultSettings.distPath),
        // 可添加hash值，可选配置[hash]
        filename: '[name].js',
        // 资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换
        publicPath: './'
    },
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        // 热替换
        pluginSettings.HotModuleReplacementPlugin,
    ].concat(pluginSettings.getDefaultPlugins(), pluginSettings.getHtmlWebpackPlugins()),
    module: loaderRuleSettings.getDefaultModules()
});

module.exports = config;
