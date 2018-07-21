/*
 * @Author: shenzhiwei
 * @Date: 2018-06-27 16:06:31
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-01 12:27:25
 * @Description: StyleSheet
 */
import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgb(239, 239, 244)',
        flex: 1,
    },
    searchRow: {
        padding: 10,
    },
    options: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    list: {
        backgroundColor: 'white',
        flexGrow: 1,
    },
    scrollToRow: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#e9eaed',
    },
    headerText: {
        height: 30,
        lineHeight: 30,
        paddingHorizontal: 4,
        fontWeight: '600',
    },
})