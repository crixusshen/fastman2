/*
 * @Author: shenzhiwei
 * @Date: 2018-07-04 16:51:42
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-05 13:08:21
 * @Description: StyleSheet
 */
import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    default: {
        borderWidth: 1,
        borderColor: '#0f0f0f',
        flex: 1,
        fontSize: 13,
        padding: 4,
    },
    rewriteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    remainder: {
        textAlign: 'right',
        width: 24,
    },
    labelContainer: {
        flexDirection: 'row',
        marginVertical: 12,
        flex: 1,
    },
    label: {
        width: 90,
        alignItems: 'flex-end',
        marginRight: 10,
        paddingTop: 4,
    },
    eventLabel: {
        margin: 3,
        fontSize: 12,
    },
    multiline: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#0f0f0f',
        flex: 1,
        fontSize: 13,
        height: 50,
        padding: 4,
        marginBottom: 4,
    },
    multilineWithFontStyles: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Cochin',
        height: 60,
    },
    multilineExpandable: {
        height: 'auto',
        maxHeight: 100,
    },
})