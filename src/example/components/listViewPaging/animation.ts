/*
 * @Author: shenzhiwei
 * @Date: 2018-06-28 08:47:31
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-28 08:58:12
 * @Description: 动画效果
 */
import {
    LayoutAnimation,
} from 'react-native'

// 定义动画轨迹
const animations = {
    layout: {
        spring: {
            duration: 750,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 0.4,
            },
        },
        easeInEaseOut: {
            duration: 300,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                delay: 100,
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        },
    },
};

export const layoutAnimationConfigs = [
    animations.layout.spring,
    animations.layout.easeInEaseOut,
];