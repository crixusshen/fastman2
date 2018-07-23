/*
 * @Author: shenzhiwei
 * @Date: 2018-07-10 16:10:29
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-23 11:28:31
 * @Description: Navigator
 */
import * as React from 'react'
import {
    Image as RNImage,
    Button as RNButton,
    Platform,
} from 'react-native'
// 路由加载标签
import Router, { RouteRuleType, StackNavigatorConfig, } from './appsNavigator'

/**
 * 导航栏统一后退按钮
 */
class SysBackComponent extends React.PureComponent {
    render() {
        return (
            <RNImage source={require('../images/back.png')} style={{ width: 30, height: 30, marginLeft: 9, }} />
        )
    }
}

export default class BaseAppsNavigator<P, S> extends React.PureComponent<P, S> {

    /**
     * 路由规则定义
     */
    get routes(): RouteRuleType {
        return {

        }
    }

    /**
     * 导航配置定义
     */
    get navigatorConfig(): StackNavigatorConfig {
        // TODO 需要去离子化 ...
        return {
            initialRouteName: 'HomeScreen',
            navigationOptions: {
                headerBackTitle: null,
                headerTruncatedBackTitle: null,
                headerStyle: {
                    backgroundColor: '#DF3A32',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTintColor: '#FFFFFF',
                headerRight: (
                    <RNButton title="Info" onPress={() => alert('Hello Fastman2')
                    } color="#FFF" />
                ),
                headerBackImage: <SysBackComponent />,
                gesturesEnabled: true,
            }
        }
    }

    render() {
        return (
            <Router routes={this.routes} navigatorConfig={this.navigatorConfig} />
        )
    }

}