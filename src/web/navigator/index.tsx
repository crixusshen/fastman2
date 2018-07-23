/*
 * @Author: shenzhiwei
 * @Date: 2018-07-10 16:10:29
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-23 12:11:23
 * @Description: Navigator
 */
import * as React from 'react'
// 路由加载标签
import Router, { RouteRuleType, } from './appsNavigator.web'

export default class BaseWebNavigator<P, S> extends React.PureComponent<P, S> {

    /**
     * 路由规则定义
     */
    get routes(): RouteRuleType {
        return {

        }
    }

    render() {
        return (
            <Router routes={this.routes} />
        )
    }

}
