/*
 * @Author: shenzhiwei
 * @Date: 2018-07-08 09:27:47
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-08 09:39:08
 * @Description: Animations-Definitions
 */
import {
    Dimensions,
} from 'react-native'
const { height, width, } = Dimensions.get('window')

/**
 * 滑动转场
 * @param translationType 动画属性，例如traslateY
 * @param fromValue 起始值
 * @param toValue 终点值
 */
const makeSlideTranslation = (translationType: string, fromValue: number, toValue: number) => ({
    from: {
        [translationType]: fromValue,
    },
    to: {
        [translationType]: toValue,
    },
})

// 从屏幕最上方滑动到元素当前位置
export const slideInDown = makeSlideTranslation('translateY', -height, 0)

// 从屏幕最下方滑动到元素当前位置
export const slideInUp = makeSlideTranslation('translateY', height, 0)

// 从屏幕最左侧滑动到元素当前位置
export const slideInLeft = makeSlideTranslation('translateX', -width, 0)

// 从屏幕最右侧滑动到元素当前位置
export const slideInRight = makeSlideTranslation('translateX', width, 0)

// 从元素当前位置滑动到屏幕最下方
export const slideOutDown = makeSlideTranslation('translateY', 0, height)

// 从元素当前位置滑动到屏幕最上方
export const slideOutUp = makeSlideTranslation('translateY', 0, -height)

// 从元素当前位置滑动到屏幕最左侧
export const slideOutLeft = makeSlideTranslation('translateX', 0, -width)

// 从元素当前位置滑动到屏幕最右侧
export const slideOutRight = makeSlideTranslation('translateX', 0, width)