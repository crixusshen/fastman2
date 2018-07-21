/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:47:15
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-23 16:47:15
 * @Description: Webpack插件扩展配置
 */
const path = require('path');
const webpack = require('webpack');
const argv = require('yargs').argv;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require("autoprefixer");

/**
 * webpack所使用到的Plugins列表
 * @return {Object}
 */
const pluginSettings = {
    // 清理目标目录
    cleanWebpackPlugin: new CleanWebpackPlugin(
        // 匹配删除的文件
        ['dist/*'],
        {
            //根目录
            root: path.resolve(__dirname, '..'),
            //开启在控制台输出信息
            verbose: true,
            //启用删除文件
            dry: false
        }
    ),

    // vConsole调试插件
    vConsolePlugin: new vConsolePlugin({enable: !!argv.debug}),

    // postcss预加载插件
    loaderOptionsPlugin: new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function () {
                return [
                    // autoprefixer配置
                    autoprefixer({
                        browsers: [
                            'Android >= 4',
                            'Chrome >= 40',
                            'last 6 Firefox versions',
                            'iOS >= 6',
                            'Safari >= 6'
                        ]
                    }),
                ]
            }
        }
    }),

    // HMR热替换
    HotModuleReplacementPlugin: new webpack.HotModuleReplacementPlugin(),

    // 允许错误不打断程序
    noEmitOnErrorsPlugin: new webpack.NoEmitOnErrorsPlugin(),
};

/**
 * webpack默认的plugins
 * @return {Array}
 */
function getDefaultPlugins() {
    return [
        pluginSettings.cleanWebpackPlugin,
        pluginSettings.vConsolePlugin,
        pluginSettings.loaderOptionsPlugin,
    ];
}

/**
 * 根据当前编译环境对应的targetComponent进行html打包处理
 * @return {Array}
 */
function getHtmlWebpackPlugins() {
    // 目标业务组件
    const targetComponents = require(`../targets/${process.env.FASTMAN_WEBPACK_TARGET}`);
    const instance = new targetComponents();
    const entries = instance.webComponents;
    const entriesTitle = instance.webComponentsTitle;

    let htmlWebpackPlugins = [];
    Object.keys(entries).forEach(function(name) {
        // 入口文件路径
        let entry = entries[name];
        // 取倒数第二层做包名
        let split = entry.split('/');
        let htmlPackage = split[split.length - 2];

        // 每个页面生成一个html(与output.path有关联)
        const plugin = new HtmlWebpackPlugin({
            title: entriesTitle[name] || '',
            // 每个html的模版，这里多个页面使用同一个模版
            template: path.resolve(__dirname, '../', 'template.html'),
            // 生成出来的html文件名
            filename: './' + htmlPackage + '/index.html',
            // 自动将引用插入body标签后
            inject: 'body',
            // 每个html引用的js模块，也可以在这里加上vendor等公用模块
            chunks: [name, 'vendor'],
            // html优化配置
            minify:{
                caseSensitive: false, //是否大小写敏感
                removeComments:true, // 去除注释
                removeEmptyAttributes:true, // 去除空属性
                collapseWhitespace: true //是否去除空格
            },
            // 在chunks脚本文件后追加hash值
            hash: true,
        });
        htmlWebpackPlugins.push(plugin);
    });
    return htmlWebpackPlugins;
}

module.exports = Object.assign(pluginSettings, {
    getDefaultPlugins: getDefaultPlugins,
    getHtmlWebpackPlugins: getHtmlWebpackPlugins,
});