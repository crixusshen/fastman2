/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 16:02:42
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-11 13:37:12
 * @Description: 组件基类，封装一些通用的函数实现和属性
 */

import React, { Component, PureComponent } from 'react'
import {
    Dimensions,
    Platform,
    View,
} from 'react-native'

// 屏幕长宽
const screenW: number = Dimensions.get('window').width
const screenH: number = Dimensions.get('window').height
// IPhoneX
const X_WIDTH: number = 375
const X_HEIGHT: number = 812

export default class BaseComponent<P extends {[key: string]: any}, S> extends PureComponent<P, S> {

    // 根据不同手机系统不同机型选择对应的上边距（如状态栏）
    protected containerTop: number
    // 根据不同手机系统不同机型选择对应的下边距
    protected containerBottom: number

    constructor(prop: P) {
        super(prop)
        this.containerTop = Platform.select({
            ios: !this.props["navigation"] ? (this.isIphoneX() ? 44 : 20) : 0,
            android: 0,
            web: 0,
        })

        this.containerBottom = Platform.select({
            ios: !this.props["navigation"] ? (this.isIphoneX() ? 34 : 0) : 0,
            android: 0,
            web: 0,
        })
    }

    componentWillMount() {
        console.log('componentWillMount ...')
    }

    componentDidMount() {
        console.log('componentDidMount ...')
    }

    componentWillReceiveProps(nextProps: P, nextContext: any) {
        console.log('componentWillReceiveProps ...')
    }

    // shouldComponentUpdate(nextProps: P, nextState: S) {
    //     console.log('shouldComponentUpdate ...')
    //     return true
    // }

    componentWillUpdate(nextProps: P, nextState: S) {
        console.log('componentWillUpdate ...')
    }

    componentDidUpdate(prevProps: P, prevState: S) {
        console.log('componentDidUpdate ...')
    }

    /**
     * 判断是否是IphoneX
     */
    private isIphoneX(): boolean {
        return Platform.OS === 'ios' && 
            (
                (screenH === X_HEIGHT && screenW === X_WIDTH) || 
                (screenH === X_WIDTH && screenW === X_HEIGHT)
            )
    }

    /**
     * 计算字面量的hash值
     * @param str 字面量
     */
    protected hashCode(str: string): number {
        let hash = 15;
        for (let ii = str.length - 1; ii >= 0; ii--) {
            hash = (hash << 5) - hash + str.charCodeAt(ii);
        }
        return hash;
    }
}