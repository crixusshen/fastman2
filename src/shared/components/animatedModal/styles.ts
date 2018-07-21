/*
 * @Author: shenzhiwei
 * @Date: 2018-07-08 09:40:07
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-08 09:41:32
 * @Description: AnimationModal StyleSheets
 */
import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    // 阴影层
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0,
        backgroundColor: 'black',
    },
    // 模态内容包裹层
    content: {
        flex: 1,
        justifyContent: 'center',
    },
})