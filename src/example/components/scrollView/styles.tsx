/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:13:05
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-23 16:22:59
 * @Description: 视图样式
 */
import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(233, 234, 237)',
    },
    title: {
        paddingVertical: 8,
        paddingLeft: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
    verticalScrollView: {
        height: 300,
    },
    horizontalScrollView: {
        height: 150,
    },
    buttonArea: {
        margin: 10,
        backgroundColor: 'rgb(248, 248, 248)',
    },
    button: {
        height: 44,
        justifyContent: 'center',
        backgroundColor: 'rgb(200, 15, 33)',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
})