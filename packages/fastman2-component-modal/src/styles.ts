/*
 * @Author: shenzhiwei
 * @Date: 2018-07-07 13:59:26
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-07 13:59:48
 * @Description: StyleSheet
 */
import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    baseStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 9999,
    },
    bgTransparent: {
        backgroundColor: 'transparent',
    },
    bgNotTransparent: {
        backgroundColor: '#C0C0C0',
    },
    hidden: {
        display: 'none',
    },
    visible: {
        display: 'flex',
    },
})