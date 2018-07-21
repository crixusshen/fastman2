/*
 * @Author: shenzhiwei
 * @Date: 2018-07-08 08:13:39
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-09 14:45:48
 * @Description: AnimatedModal extends Modal
 */
import React, { Component, } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import AnimatedModal from '@fastman2/component-animated-modal'
import BaseViewComponent from '../base/baseViewComponent';
import styles from './styles'

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {
    // 控制多个模态显示的状态标记
    visibleModal: number | null
}

export default class AnimatedModalComponent extends BaseViewComponent<propsTypes, stateTypes> {

    // 初始化props（创建阶段）
    static defaultProps = {

    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量（实例化阶段）
        this.state = {
            visibleModal: null,
        }
    }

    /**
     * 根据业务逻辑可对state进行相应操作（实例化阶段）
     */
    componentDidMount() {

    }

    /**
     * 按钮渲染
     * @param onPress 自定义的点击事件
     */
    private renderButton = (renderModal: JSX.Element, onPress: () => void) => (
        <View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Text>Click Me</Text>
                </View>
            </TouchableOpacity>
            {/* 模态窗口渲染 */}
            {renderModal}
        </View>
    )

    /**
     * 模态内容渲染
     */
    private renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text>Hello Fastman2!</Text>
            {/* 关闭按钮定义 */}
            <TouchableOpacity onPress={() => { this.setState({ visibleModal: null, }) }}>
                <View style={styles.button}>
                    <Text>关闭</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    /**
     * 视图渲染（实例化阶段/更新阶段）
     */
    render() {
        return this.renderContainer([
            {
                title: '从下往上的Modal（默认）',
                render: () => this.renderButton((
                    <AnimatedModal
                        isVisible={this.state.visibleModal === 1}
                    >
                        {this.renderModalContent()}
                    </AnimatedModal>
                ), () => {
                    this.setState({ visibleModal: 1, })
                })
            },
            {
                title: '从左往右的Modal',
                render: () => this.renderButton((
                    <AnimatedModal
                        isVisible={this.state.visibleModal === 2}
                        animationIn="slideInLeft"
                        animationOut="slideOutRight"
                    >
                        {this.renderModalContent()}
                    </AnimatedModal>
                ), () => {
                    this.setState({ visibleModal: 2, })
                })
            },
            {
                title: '慢慢的Modal',
                render: () => this.renderButton((
                    <AnimatedModal
                        isVisible={this.state.visibleModal === 3}
                        animationInTiming={2000}
                        animationOutTiming={2000}
                        backdropTransitionInTiming={2000}
                        backdropTransitionOutTiming={2000}
                    >
                        {this.renderModalContent()}
                    </AnimatedModal>
                ), () => {
                    this.setState({ visibleModal: 3, })
                })
            },
            {
                title: '从内往外的Modal且改变阴影背景色',
                render: () => this.renderButton((
                    <AnimatedModal
                        isVisible={this.state.visibleModal === 4}
                        backdropColor="red"
                        backdropOpacity={1}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                    >
                        {this.renderModalContent()}
                    </AnimatedModal>
                ), () => {
                    this.setState({ visibleModal: 4, })
                })
            },
            {
                title: '在底部的Modal',
                render: () => this.renderButton((
                    <AnimatedModal
                        isVisible={this.state.visibleModal === 5}
                        style={{ justifyContent: 'flex-end', margin: 0, }}
                    >
                        {this.renderModalContent()}
                    </AnimatedModal>
                ), () => {
                    this.setState({ visibleModal: 5, })
                })
            },
            {
                title: '点击阴影也可以隐藏的Modal',
                render: () => this.renderButton((
                    <AnimatedModal
                        isVisible={this.state.visibleModal === 6}
                        onBackdropPress={() => this.setState({ visibleModal: null, })}
                    >
                        {this.renderModalContent()}
                    </AnimatedModal>
                ), () => {
                    this.setState({ visibleModal: 6, })
                })
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