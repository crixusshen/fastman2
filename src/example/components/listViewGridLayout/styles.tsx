/*
 * @Author: shenzhiwei
 * @Date: 2018-06-26 18:25:29
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-26 18:30:36
 * @Description: 视图样式
 */
import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    list: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    row: {
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        width: 100,
        height: 100,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold',
    },
})