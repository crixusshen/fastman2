/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:42:07
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-11 12:29:25
 * @Description: 入口文件
 */

import React from 'react'
import { AppRegistry } from 'react-native'
// 通过路由加载入口
import App from '@fastman2/component-navigator-web'

AppRegistry.registerComponent('fastman2', () => App)
AppRegistry.runApplication('fastman2', {
    initialProps: {},
    rootTag: document.getElementById('page-group') 
})