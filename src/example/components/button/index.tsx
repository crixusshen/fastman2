/*
 * @Author: shenzhiwei
 * @Date: 2018-07-05 15:28:28
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-05 21:50:03
 * @Description: Button
 */
import React, { Component, } from 'react'
import {
    Button,
    View,
} from 'react-native'
import BaseViewComponent from '../base/baseViewComponent';

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {

}

export default class ButtonComponent extends BaseViewComponent<propsTypes, stateTypes> {

    // 初始化props
    static defaultProps = {

    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量
        this.state = {

        }
    }

    private onButtonPress = (text: string) => alert(text)

    render() {
        return this.renderContainer([
            {
                title: '基础按钮',
                render: () => (
                    <Button
                        title="Press Me"
                        onPress={() => {
                            this.onButtonPress('基础按钮被点击')
                        }}
                    />
                )
            },
            {
                title: '带有颜色的按钮(紫色文字)',
                render: () => (
                    <Button
                        title="Press Purple"
                        onPress={() => {
                            this.onButtonPress('颜色按钮被点击')
                        }}
                        color="#841584"
                    />
                )
            },
            {
                title: '适合文本布局',
                description: '这种布局会让按钮的宽度不占满外层容器，而是与文字长度保持等宽',
                render: () => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Button
                            title="This looks great!!!"
                            onPress={() => {
                                this.onButtonPress('左侧按钮被点击')
                            }}
                        />
                        <Button
                            title="Ok, Great!"
                            onPress={() => {
                                this.onButtonPress('右侧按钮被点击')
                            }}
                            color="#841584"
                        />
                    </View>
                )
            },
            {
                title: '禁用按钮',
                description: '所有交互行为都被禁用',
                render: () => (
                    <Button
                        title="I Am Disabled"
                        onPress={() => {
                            this.onButtonPress('点击触发不到')
                        }}
                        disabled
                    />
                )
            },
        ])
    }
}