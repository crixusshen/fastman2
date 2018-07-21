/*
 * @Author: shenzhiwei
 * @Date: 2018-07-09 11:22:26
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-09 12:06:23
 * @Description: StyleSheets
 */
import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-around',
    },
    rowTitle: {
        fontWeight: 'bold',
    },
})