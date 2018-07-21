/*
 * @Author: shenzhiwei
 * @Date: 2018-07-11 10:42:26
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-13 16:20:05
 * @Description: AppsNavigatorType
 */
import React, { Component, PureComponent, } from 'react'

type ElementType = () => JSX.Element

type RouteScreenType = {
    // 路由单页对应的组件或者代码片段
    screen: typeof Component | typeof PureComponent,
    // 路由路径
    path: string,
    // 导航配置（仅原生端配置才会生效）
    navigationOptions?: {[key: string]: any},
}

// 路由规则表类型
export type RouteRuleType = {
    [key: string]: RouteScreenType,
}

// 路由初始化配置
export type StackNavigatorConfig = {
    // 初始化路由名称（仅原生端使用）
    initialRouteName: string,
    // 控制路由转场的动画效果配置
    transitionConfig?: any,
    // 全局导航参数配置，它会覆盖单个路由上的navigationOptions配置
    navigationOptions: {[key: string]: any},
}

// 导航封装标签传入的类型值
export interface NavigatorProps {
    // 路由列表规则表
    routes: RouteRuleType,
    // 路由初始化配置列表
    navigatorConfig?: StackNavigatorConfig,
}