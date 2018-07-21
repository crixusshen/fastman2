/*
 * @Author: shenzhiwei
 * @Date: 2018-07-10 16:10:29
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-11 08:39:36
 * @Description: Navigator
 */
import * as React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
// 加载路由规则配置文件
import routes, { navigatorConfig, } from '../constants/routes'
// 路由加载标签
import Router from '../../../../src/components/navigator/appsNavigator'

export interface AppProps {
}

export default class App extends React.PureComponent<AppProps, any> {
    render() {
        return (
            <Router routes={routes} navigatorConfig={navigatorConfig} />
        );
    }
}
