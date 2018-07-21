/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:47:33
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-23 16:47:33
 * @Description: Webpack主配置
 */
const path = require('path');
const args = require('yargs').argv;

// 允许运行的环境列表
// dev 开发环境；dist 发布环境；test 测试环境
const allowedEnvs = ['dev', 'dist', 'test']

// 根据--dev配置对应的环境变量
let env = args.env
// 根据第一个--define配置对应的参数配置
let config = args.define ? args.define[0] : 'dev'

// base模块中区分当前编译环境时使用
process.env.FASTMAN_WEBPACK_ENV = config

// 根据第二个--define区分所要打包的功能配置
let targetComponents = args.define ? args.define[1] : 'exampleComponent'
process.env.FASTMAN_WEBPACK_TARGET = targetComponents

// 根据第三个--define区分是否API需要支持websocket特性
let isSupportWs = args.define ? args.define[2] : ''
process.env.FASTMAN_WEBPACK_ISSUPPORTWS = isSupportWs

/**
 * 构建webpack配置文件
 * @param  {String} wantedEnv 当前运行的环境
 * @return {Object} Webpack config 不同环境的配置
 */
function buildConfig(wantedEnv) {
    let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1
    let validEnv = isValid ? wantedEnv : 'dev'
    const config = require(path.join(__dirname, 'cfg/' + validEnv))
    return config
}

module.exports = buildConfig(env)