/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 17:07:08
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-13 16:14:33
 * @Description: 图片Cell
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
} from 'react-native'

interface ThumbProps{
    // 图片资源路径
    uri: string,
}

export default class Thumb extends Component<ThumbProps, {}> {
    
    shouldComponentUpdate(nextProps: ThumbProps, nextState: any) {
        return false
    }
    
    render() {
        return (
            <View style={styles.button}>
                <Image style={styles.img} source={{uri: this.props.uri}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
    },
    img: {
        width: Dimensions.get('window').width,
        height: 150,
    },
})