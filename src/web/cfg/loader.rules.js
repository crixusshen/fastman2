/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:47:06
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-08 08:33:35
 * @Description: Webpack预加载器配置
 */
const defaultSettings = require('./defaults');
const args = require('yargs').argv;
const path = require('path');

/**
 * webpack所使用到的Loader列表
 * @return {Object}
 */
const loaderRuleSettings = {
    // babel预加载器
    babelLoader: {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        // 大部分react-native相关库并不会做ES6编译，因此在这里需要按需进行编译，如果对已经编译的文件再进行编译可能会增加文件大小，因此这里最好还是指定
        exclude: /node_modules\/(?!(react-native-animatable)\/).*/,
        query: {
            cacheDirectory: true,
        },
    },
    // css文件预加载器
    cssLoader: {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    // sass文件预加载器
    sassLoader: {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
    },
    // url预加载器(资源小于10240Kb才转化为DataURI)
    urlLoader: {
        test: /^(?!.*(\.nourlloader)+.*$).*\.(png|jpe?g|gif|mp3|wav)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 10240,
                outputPath: '../images',
            },
        }],
    },
    // url预加载器(如果定义xxx.nourlloader.png的资源无论大小都不转化为DataURI)
    noUrlLoader: {
        test: /^(?=.*(\.nourlloader)+.*$).*\.(png|jpe?g|gif|mp3|wav)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 1,
                outputPath: '../images',
            },
        }],
    },
    // file预加载器
    fileLoader: {
        test: /\.(mp4|ogg|ttf)$/,
        loader: 'file-loader'
    },
    // svg预加载器
    svgLoader: {
        test: /\.svg$/,
        loader: 'svg-url-loader'
    },
    // typeloader预加载器
    tsLoader: {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
    },
    // sourceMap预加载器
    sourceMapLoader: {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
    },
};

/**
 * webpack默认的loaders
 * @return {Object}
 */
function getDefaultModules() {
    // 开发环境loader特殊处理
    if (args.env == 'dev') {
        // 资源loader在开发环境下不做md5文件化
        loaderRuleSettings.urlLoader.use[0].options.name = '[name].[ext]'
        loaderRuleSettings.noUrlLoader.use[0].options.name = '[name].[ext]'
    }

    return {
        rules: [
            loaderRuleSettings.babelLoader,
            loaderRuleSettings.cssLoader,
            loaderRuleSettings.sassLoader,
            loaderRuleSettings.urlLoader,
            loaderRuleSettings.noUrlLoader,
            loaderRuleSettings.fileLoader,
            loaderRuleSettings.svgLoader,
            loaderRuleSettings.tsLoader,
            loaderRuleSettings.sourceMapLoader,
        ],
    };
}

module.exports = Object.assign(loaderRuleSettings, {
    getDefaultModules: getDefaultModules,
});