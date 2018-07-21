/*
 * @Author: shenzhiwei
 * @Date: 2018-07-09 09:45:30
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-09 14:11:56
 * @Description: Modal
 */
import React, { Component, } from 'react'
import {
    View,
    Text,
    Button,
} from 'react-native'
import { Modal, } from '@fastman2/component-modal'
import styles from './styles'
import BaseViewComponent from '../base/baseViewComponent';

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {
    // 动画类型
    animationType: 'none' | 'slide' | 'fade',
    // 模态是否显示的状态
    modalVisible: boolean,
    // 阴影层是否透明
    transparent: boolean,
}

export default class ModalComponent extends BaseViewComponent<propsTypes, stateTypes> {

    // 初始化props（创建阶段）
    static defaultProps = {

    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量（实例化阶段）
        this.state = {
            animationType: 'none',
            // 模态是否显示的状态
            modalVisible: false,
            // 阴影层是否透明
            transparent: true,
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
        // 阴影层背景色样式定义
        const modalBackgroundStyle = {
            backgroundColor: this.state.transparent
                ? 'rgba(0, 0, 0, 0.5)'
                : '#f5fcff'
        }
        // 容器包裹层的样式定义
        const innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff', padding: 20, }
            : null

        return this.renderContainer([
            {
                title: 'Modal Demo',
                render: () => (
                    <View>
                        <Modal
                            animationType={this.state.animationType}
                            transparent={this.state.transparent}
                            visible={this.state.modalVisible}
                            onRequestClose={() => this.setState({ modalVisible: false, })}
                            onShow={() => console.log('modal onShow ...')}
                            onDismiss={() => console.log('modal onDismiss ...')}
                        >
                            <View style={[styles.container, modalBackgroundStyle]}>
                                <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                                    <Text>I am a Basic ModalMan ^_^</Text>
                                    <View style={styles.modalButton}>
                                        <Button
                                            title="关闭"
                                            onPress={() => this.setState({ modalVisible: false, })}
                                        ></Button>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/* 动画类型 */}
                        <View style={styles.row}>
                            <Text style={styles.rowTitle}>Animation Type</Text>
                            <Button
                                title="none"
                                color={this.state.animationType === 'none' ? 'rgb(33, 150, 243)' : 'rgb(178, 177, 178)'}
                                onPress={() => this.setState({ animationType: 'none', })}
                            />
                            <Button
                                title="slide"
                                color={this.state.animationType === 'slide' ? 'rgb(33, 150, 243)' : 'rgb(178, 177, 178)'}
                                onPress={() => this.setState({ animationType: 'slide', })}
                            />
                            <Button
                                title="fade"
                                color={this.state.animationType === 'fade' ? 'rgb(33, 150, 243)' : 'rgb(178, 177, 178)'}
                                onPress={() => this.setState({ animationType: 'fade', })}
                            />
                        </View>
                        {/* 阴影背景是否透明 */}
                        <View style={styles.row}>
                            <Text style={styles.rowTitle}>Transparent</Text>
                            <Button
                                title="true"
                                color={this.state.transparent ? 'rgb(33, 150, 243)' : 'rgb(178, 177, 178)'}
                                onPress={() => this.setState({ transparent: true, })}
                            />
                            <Button
                                title="false"
                                color={!this.state.transparent ? 'rgb(33, 150, 243)' : 'rgb(178, 177, 178)'}
                                onPress={() => this.setState({ transparent: false, })}
                            />
                        </View>

                        <Button title="打开" onPress={() => this.setState({ modalVisible: true, })}></Button>
                    </View>
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
     * @param nextProps 新的props
     * @param nextState 新的state
     */
    componentWillUpdate(nextProps: propsTypes, nextState: stateTypes) {

    }

    /**
     * 组件已经跟新（更新阶段）
     * @param prevProps 前一个props
     * @param prevState 前一个state
     */
    componentDidUpdate(prevProps: propsTypes, prevState: stateTypes) {

    }

    /**
     * node被移除时被调用（销毁阶段）
     */
    componentWillUnmount() {

    }
}