/*
 * @Author: shenzhiwei
 * @Date: 2018-06-27 16:07:27
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-28 09:12:51
 * @Description: ListViewPaging样式
 */

import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    listview: {
        backgroundColor: '#B0C4DE',
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,
        backgroundColor: '#5890ff',
    },
    text: {
        color: 'white',
        paddingHorizontal: 8,
    },
    header: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998',
        flexDirection: 'row',
    },
})