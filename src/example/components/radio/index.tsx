/*
 * @Author: shenzhiwei
 * @Date: 2018-07-06 11:52:28
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-07 09:44:27
 * @Description: Radio
 */
import React, { Component, } from 'react'
import {
    Text,
} from 'react-native'
import { RadioGroup, RadioButton, } from '../../../shared/components/radio'
import BaseViewComponent from '../base/baseViewComponent'

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {

}

export default class RadioComponent extends BaseViewComponent<propsTypes, stateTypes> {

    // 初始化props（创建阶段）
    static defaultProps = {

    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量（实例化阶段）
        this.state = {
            
        }
    }

    /**
     * 根据业务逻辑可对state进行相应操作（实例化阶段）
     */
    componentDidMount() {

    }

    /**
     * 视图渲染（实例化阶段/更新阶段）
     */
    render() {
        return this.renderContainer([
            {
                title: '单项选择器1',
                render: () => (
                    <RadioGroup>
                        <RadioButton value={1}>
                            <Text>姆巴佩</Text>
                        </RadioButton>
                        <RadioButton value={2}>
                            <Text>奥马尔</Text>
                        </RadioButton>
                        <RadioButton value={'3'}>
                            <Text>梅西</Text>
                        </RadioButton>
                        <RadioButton value={'abc'}>
                            <Text>C罗</Text>
                        </RadioButton>
                    </RadioGroup>
                )
            },
            {
                title: '有颜色的单项选择器',
                render: () => (
                    <RadioGroup
                        color={'red'}
                        activeColor={'rgb(81, 195, 51)'}
                        highlightColor={'#f1f1f1'}
                    >
                        <RadioButton value={1}>
                            <Text>足球</Text>
                        </RadioButton>
                        <RadioButton value={2}>
                            <Text>篮球</Text>
                        </RadioButton>
                        <RadioButton value={'3'}>
                            <Text>羽毛球</Text>
                        </RadioButton>
                    </RadioGroup>
                )
            },
            {
                title: '控制单选按钮大小',
                render: () => (
                    <RadioGroup
                        size={40}
                    >
                        <RadioButton value={1}>
                            <Text>大</Text>
                        </RadioButton>
                        <RadioButton value={2}>
                            <Text>大大</Text>
                        </RadioButton>
                        <RadioButton value={'3'}>
                            <Text>大大大</Text>
                        </RadioButton>
                    </RadioGroup>
                )
            },
            {
                title: '禁用某个选项',
                render: () => (
                    <RadioGroup>
                        <RadioButton value={1}>
                            <Text>点我</Text>
                        </RadioButton>
                        <RadioButton value={2} disabled={true}>
                            <Text>点不到我</Text>
                        </RadioButton>
                        <RadioButton value={'3'}>
                            <Text>点我</Text>
                        </RadioButton>
                    </RadioGroup>
                )
            },
            {
                title: '默认选中某项',
                render: () => (
                    <RadioGroup
                        selectedIndex={2}
                        onSelect={(index, value) => alert(`第${index+1}个图标[${value}]被选中 ..`)}
                    >
                        <RadioButton value={'法国'}>
                            <Text>🇫🇷</Text>
                        </RadioButton>
                        <RadioButton value={'巴西'}>
                            <Text>🇧🇷</Text>
                        </RadioButton>
                        <RadioButton value={'中国'}>
                            <Text>🇨🇳</Text>
                        </RadioButton>
                    </RadioGroup>
                )
            },
        ])
    }

    /**
     * 当组件接收到新的props时被调用（更新阶段）
     * @param nextProps 新的props
     * @param nextState 新的state
     */
    componentWillReceiveProps(nextProps: propsTypes, nextState: stateTypes) {

    }

    // /**
    //  * 当拦截新的props和state时用于判断是否组件需要更新（更新阶段）
    //  * @param nextProps 新的props
    //  * @param nextState 新的state
    //  */
    // shouldComponentUpdate(nextProps: propsTypes, nextState: stateTypes) {
    //     return true
    // }

    /**
     * 组件将要更新，当shouldComponentUpdate()返回true时候被调用（更新阶段）
     */
    componentWillUpdate() {

    }

    /**
     * 组件已经跟新（更新阶段）
     */
    componentDidUpdate() {

    }

    /**
     * node被移除时被调用（销毁阶段）
     */
    componentWillUnmount() {

    }
}