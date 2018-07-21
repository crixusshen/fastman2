/*
 * @Author: shenzhiwei
 * @Date: 2018-07-10 15:22:18
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-10 15:25:00
 * @Description: AppNavigator Web
 */
import * as React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import AppNavigatorSwitch from "./appsNavigatorSwitch"
import { RouteRuleType, StackNavigatorConfig, NavigatorProps, } from './appsNavigatorType'

export default class App extends React.PureComponent<NavigatorProps, any> {
    render() {
        return (
            <Router>
                <AppNavigatorSwitch {...this.props} />
            </Router>
        )
    }
}

export type RouteRuleType = RouteRuleType
export type StackNavigatorConfig = StackNavigatorConfig