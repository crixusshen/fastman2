/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:44:52
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-23 16:44:52
 * @Description: WebpackDevServer配置
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const defaultSettings = require('./cfg/defaults');
const open = require('open');

// 启动webpack-dev-server并监听配置端口
new WebpackDevServer(webpack(config), config.devServer)
.listen(defaultSettings.port, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Listening at localhost:' + defaultSettings.port);
  console.log('Opening your system browser...');
  open('http://localhost:' + defaultSettings.port + '/example');
});
