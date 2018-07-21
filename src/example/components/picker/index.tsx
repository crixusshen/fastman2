/*
 * @Author: shenzhiwei
 * @Date: 2018-07-06 08:33:28
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-06 09:42:40
 * @Description: Picker
 */
import React, { Component, } from 'react'
import {
    StyleSheet,
    Picker,
    Button,
} from 'react-native'
import BaseViewComponent from '../base/baseViewComponent';

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {
    selected1: string,
    color: string,
}

const Item = Picker.Item

export default class PickerComponent extends BaseViewComponent<propsTypes, stateTypes> {

    // 初始化props
    static defaultProps = {

    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量
        this.state = {
            selected1: 'key0',
            color: 'red',
        }
    }

    private onValueChange = (key: string, value: string) => {
        console.log(key + '   ' + value)
        const newState: any = {}
        newState[key] = value
        this.setState(newState)
    }

    render() {
        return this.renderContainer([
            {
                title: '基础选择器',
                render: () => (
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this, 'selected1')}
                    >
                        <Item label="hello" value="key0" />
                        <Item label="world" value="key1" />
                    </Picker>
                )
            },
            {
                title: '带颜色的选择器',
                render: () => (
                    <Picker
                        style={[styles.picker, styles.colorful]}
                        selectedValue={this.state.color}
                        onValueChange={this.onValueChange.bind(this, 'color')}
                    >
                        <Item label="red" color="red" value="red" />
                        <Item label="green" color="green" value="green" />
                        <Item label="blue" color="blue" value="blue" />
                    </Picker>
                )
            },
        ])
    }
}

const styles = StyleSheet.create({
    picker: {
        
    },
    colorful: {
        // color: 'white',
        backgroundColor: 'yellow',
    },
})