/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:46:31
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-23 16:46:31
 * @Description: Webpack默认配置
 */
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const distPath = path.join(__dirname, '/../../../dist');
const dfltPort = 8080;

module.exports = {
    srcPath,
    distPath,
    publicPath: '/scripts/',
    port: dfltPort,
};