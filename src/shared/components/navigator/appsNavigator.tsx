/*
 * @Author: shenzhiwei
 * @Date: 2018-07-10 15:08:32
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-11 10:48:44
 * @Description: AppNavigator
 */
import * as React from 'react'
import {
    Platform,
    Easing,
    Animated,
} from 'react-native'
import { StackNavigator, createStackNavigator, } from 'react-navigation'
import { RouteRuleType, StackNavigatorConfig, NavigatorProps, } from './appsNavigatorType'

export default class App extends React.PureComponent<NavigatorProps, any> {
    render() {
        const { routes, navigatorConfig, } = this.props
        // android平台追加左右滑屏动画效果
        if (Platform.OS === 'android') {
            if(navigatorConfig) {
                navigatorConfig["transitionConfig"] = () => ({
                    transitionSpec: {
                        duration: 300,
                        easing: Easing.out(Easing.poly(4)),
                        timing: Animated.timing,
                    },
                    screenInterpolator: (sceneProps: any) => {
                        const { layout, position, scene } = sceneProps;
                        const { index } = scene;
    
                        const width = layout.initWidth;
                        const translateX = position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [width, 0, 0],
                        });
    
                        const opacity = position.interpolate({
                            inputRange: [index - 1, index - 0.99, index],
                            outputRange: [0, 1, 1],
                        });
    
                        return { opacity, transform: [{ translateX }] };
                    },
                })
            }
        }
        const App = createStackNavigator(routes, navigatorConfig)
        return (
            <App />
        );
    }
}

export type RouteRuleType = RouteRuleType
export type StackNavigatorConfig = StackNavigatorConfig