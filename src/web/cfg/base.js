/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:46:11
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-23 16:46:11
 * @Description: Webpack通用配置
 */
const path = require('path');
const defaultSettings = require('./defaults');
const pluginSettings = require('./plugins');

module.exports = {
    output: {
        // 默认的输出path，最终会被覆盖
        path: path.join(path.resolve('.'), 'build/assets'),
        filename: '[name].js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        contentBase: defaultSettings.distPath,
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: defaultSettings.port,
        //publicPath: defaultSettings.publicPath,
        noInfo: false,
    },
    plugins: pluginSettings.getDefaultPlugins(),
    resolve: {
        // 如果存在，优先处理.web.后缀的文件
        extensions: ['.web.js', '.js', '.jsx', '.web.ts', '.ts', '.web.tsx', '.tsx'],
        // 定义引用路径的别名（路径简写）
        alias: {
            fastman: path.resolve(__dirname, '../libs'),
            styles: path.resolve(__dirname, '../styles'),
            config: `${defaultSettings.srcPath}/config/` + process.env.FASTMAN_WEBPACK_ENV,
            components: `${defaultSettings.srcPath}/components`,
            common: `${defaultSettings.srcPath}/common`,
            api: `${defaultSettings.srcPath}/api`,
            'react-native': 'react-native-web',
        },
        modules: ['web_modules', 'node_modules'],
    },
    module: {},
    // 代码块切割优化
    optimization: {
        splitChunks: {
            chunks: 'initial', // 只对入口文件处理
            cacheGroups: {
                vendor: { // split `node_modules`目录下被打包的代码到 `vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
                    test: /node_modules(\/|\\)/,
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                },
                // commons: { // split `common`和`components`目录下被打包的代码到`commons.js && .css`
                //     test: /common\/|components\//,
                //     name: 'commons',
                //     priority: 10,
                //     enforce: true
                // }
            }
        }
    },
};
