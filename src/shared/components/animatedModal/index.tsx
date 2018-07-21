/*
 * @Author: shenzhiwei
 * @Date: 2018-07-08 08:07:39
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-09 14:25:30
 * @Description: AnimatedModal extends Modal
 */
import React, { Component, } from 'react'
import {
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native'
// 使用第三方动画库来实现复杂的动画效果
import {
    View,
    initializeRegistryWithDefinitions,
    registerAnimation,
    createAnimation,
} from 'react-native-animatable'
// 自定义动画组
import * as ANIMATION_DEFINITIONS from './animations'
// 基础模态组件
import { Modal, } from '../modal'
import styles from './styles'

// 重写动画库中默认的动画
initializeRegistryWithDefinitions(ANIMATION_DEFINITIONS)

// 创建用户自定义动画
const makeAnimation = (name: string, obj: any) => {
    registerAnimation(name, createAnimation(obj) as any)
}

// 是否是对象
const isObject = (obj: any) => obj !== null && typeof obj === 'object'

// 定义props类型
interface propsTypes {
    // 模态窗口显示的动画效果
    animationIn?: string | { [key: string]: any },
    // 模态窗口显示的动画执行时间（单位：毫秒）
    animationInTiming?: number,
    // 模态窗口隐藏的动画效果
    animationOut?: string | { [key: string]: any },
    // 模态窗口隐藏的动画执行时间（单位：毫秒）
    animationOutTiming?: number,
    // 如果键盘打开，则启动向上移动模式（避免模态区域被键盘遮住显示不全）
    avoidKeyboard?: boolean,
    // 阴影层背景色
    backdropColor?: string,
    // 阴影层透明度（0 - 1.0）
    backdropOpacity?: number,
    // 阴影层显示的动画执行时间（单位：毫秒）
    backdropTransitionInTiming?: number,
    // 阴影层隐藏的动画执行时间（单位：毫秒）
    backdropTransitionOutTiming?: number,
    // 通过隐藏模态内容直到动画完成来增强性能
    hideModalContentWhileAnimating?: boolean,
    // 当模态窗口完全显示时触发的回调
    onModalShow?: () => void,
    // 当模态窗口完全隐藏时触发的回调
    onModalHide?: () => void,
    // 安卓端物理后退键被点击时触发的回调
    onBackButtonPress?: () => void,
    // 阴影层被点击时触发的回调
    onBackdropPress?: () => void,
    // 是否启动原生硬件加速
    useNativeDriver?: boolean,
    // 如果模态窗口内容是ScrollView，滚动时可触发该回调
    scrollTo?: (x: number) => void,
    // 当> 0时，禁用swipeto-close，以实现可滚动的内容。
    scrollOffset?: number,
    // 用于实现内容可滚动时的滚动感觉
    scrollOffsetMax?: number,

    // 模态窗口内容
    children: JSX.Element,
    // 是否显示模态
    isVisible: boolean,
    // 样式
    style?: any,
}

// 定义state类型
interface stateTypes {
    showContent: boolean,
    isVisible: boolean,
    deviceWidth: number,
    deviceHeight: number,
}

export default class AnimatedModalComponent extends Component<propsTypes, stateTypes> {

    // 初始化props（创建阶段）
    static defaultProps = {
        animationIn: 'slideInUp',
        animationInTiming: 300,
        animationOut: 'slideOutDown',
        animationOutTiming: 300,
        avoidKeyboard: false,
        backdropColor: 'black',
        backdropOpacity: 0.7,
        backdropTransitionInTiming: 300,
        backdropTransitionOutTiming: 300,
        hideModalContentWhileAnimating: false,
        onModalShow: () => { },
        onModalHide: () => { },
        onBackButtonPress: () => { },
        onBackdropPress: () => { },
        useNativeDriver: false,
        scrollTo: (x: number) => { },
        scrollOffset: 0,
        scrollOffsetMax: 0,
        isVisible: false,
    }

    // 声明状态变量
    public state: stateTypes

    // 动画执行的锁，防止重复执行
    private transitionLock: boolean

    // 模态显示时的动画名
    private animationIn: string

    // 模态隐藏时的动画名
    private animationOut: string

    // 阴影层的引用
    private backdropRef: any

    // 模态引用
    private contentRef: any

    constructor(props: propsTypes) {
        super(props);

        this.transitionLock = false

        // 定义用户自定义动画，如果props中传入的非内置动画，而是用户自定义的动画
        this.buildAnimations(props)

        // 初始化状态变量（实例化阶段）
        this.state = {
            showContent: true,
            isVisible: false,
            deviceWidth: Dimensions.get('window').width,
            deviceHeight: Dimensions.get('window').height,
        }

        // 如果初始化模态就被设置为显示状态，则直接渲染
        if (this.props.isVisible) {
            // 初始化状态变量（实例化阶段）
            this.state = {
                ...this.state,
                isVisible: true,
                showContent: true,
            }
        }
    }

    /**
     * 根据业务逻辑可对state进行相应操作（实例化阶段）
     */
    componentDidMount() {
        if (this.state.isVisible) {
            this.open()
        }
    }

    /**
     * 视图渲染（实例化阶段/更新阶段）
     */
    render() {
        const {
            animationIn,
            animationInTiming,
            animationOut,
            animationOutTiming,
            avoidKeyboard,
            backdropColor,
            backdropOpacity,
            backdropTransitionInTiming,
            backdropTransitionOutTiming,
            children,
            isVisible,
            onModalShow,
            onBackdropPress,
            onBackButtonPress,
            useNativeDriver,
            style,
            ...otherProps
        } = this.props
        const {
            deviceWidth,
            deviceHeight,
        } = this.state

        // 附加后的样式
        const computedStyle = [
            { margin: deviceWidth * 0.05, transform: [{ translateY: 0 }] },
            styles.content,
            style,
        ]

        // 如果启动硬件加速
        const _children = 
            this.props.hideModalContentWhileAnimating && 
            this.props.useNativeDriver && 
            !this.state.showContent ? (
                <View />
            ) : (
                children
            )

        const containerView = (
            <View
                ref={(ref: any) => (this.contentRef = ref)}
                style={[computedStyle]}
                pointerEvents="box-none"
                useNativeDriver={useNativeDriver}
                {...otherProps}
            >
                {_children}
            </View>
        )

        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={this.state.isVisible}
                onRequestClose={onBackButtonPress}
                {...otherProps}
            >
                {/* 模态被绝对定位 */}
                <TouchableWithoutFeedback onPress={onBackdropPress}>
                    <View
                        ref={(ref: any) => (this.backdropRef = ref)}
                        useNativeDriver={useNativeDriver}
                        style={[
                            styles.backdrop,
                            {
                                backgroundColor: this.state.showContent 
                                ? backdropColor : 'transparent',
                                width: deviceWidth,
                                height: deviceHeight,
                            }
                        ]}
                    />
                </TouchableWithoutFeedback>

                {/* avoidKeyboard启动的情况 */}
                {avoidKeyboard && (
                    <KeyboardAvoidingView
                        behavior='padding'
                        pointerEvents="box-none"
                        style={computedStyle.concat([{ margin: 0 }])}
                    >
                        {containerView}
                    </KeyboardAvoidingView>
                )}

                {/* avoidKeyboard未启动的情况 */}
                {!avoidKeyboard && containerView}
            </Modal>
        )
    }

    /**
     * 用户自定义的动画，没有定义则采用内置动画效果
     * @param props 标签属性引用
     */
    private buildAnimations = (props: propsTypes) => {
        let animationIn = props.animationIn
        let animationOut = props.animationOut

        if (isObject(animationIn)) {
            // 自定义动画名采用对象的JSON串来命名，区分唯一性
            const animationName = JSON.stringify(animationIn)
            makeAnimation(animationName, animationIn)
            animationIn = animationName
        }

        if (isObject(animationOut)) {
            const animationName = JSON.stringify(animationOut);
            makeAnimation(animationName, animationOut);
            animationOut = animationName;
        }

        this.animationIn = animationIn as string
        this.animationOut = animationOut as string
    }

    /**
     * 模态显示
     */
    private open = () => {
        // 写保护
        if (this.transitionLock) return
        this.transitionLock = true

        // 阴影层动画处理
        if (this.backdropRef) {
            this.backdropRef.transitionTo({
                opacity: this.props.backdropOpacity,
            }, this.props.backdropTransitionInTiming)
        }

        // 模态动画处理
        if (this.contentRef) {
            this.contentRef[this.animationIn](this.props.animationInTiming).then(
                () => {
                    // 解除保护
                    this.transitionLock = false

                    if (!this.props.isVisible) {
                        this.close()
                    } else {
                        if (this.props.onModalShow) {
                            this.props.onModalShow()
                        }
                    }
                }
            )
        }
    }

    /**
     * 模态隐藏
     */
    private close = () => {
        // 写保护
        if (this.transitionLock) return
        this.transitionLock = true

        // 阴影层动画处理
        if (this.backdropRef) {
            this.backdropRef.transitionTo({
                opacity: 0,
            }, this.props.backdropTransitionOutTiming)
        }

        // 模态动画处理
        if (this.contentRef) {
            this.contentRef[this.animationOut](this.props.animationOutTiming).then(
                () => {
                    // 解除保护
                    this.transitionLock = false

                    if (this.props.isVisible) {
                        this.open()
                    } else {
                        this.setState({
                            showContent: false,
                        },
                            () => {
                                this.setState({
                                    isVisible: false,
                                })
                            })

                        if (this.props.onModalHide) {
                            this.props.onModalHide()
                        }
                    }
                }
            )
        }
    }

    /**
     * 当组件接收到新的props时被调用（更新阶段）
     * @param nextProps 新的props
     * @param nextState 新的state
     */
    componentWillReceiveProps(nextProps: propsTypes, nextState: stateTypes) {
        // 类toggle思想处理
        if (!this.state.isVisible && nextProps.isVisible) {
            this.setState({
                isVisible: true,
                showContent: true,
            })
        }
        // 如果用户通过交互修改了标签属性（如标签属性依赖状态），则需要重新定义用户自定义动画
        if (
            this.props.animationIn !== nextProps.animationIn ||
            this.props.animationOut !== nextProps.animationOut
        ) {
            this.buildAnimations(nextProps)
        }
        // 如果用户通过交互修改了阴影层的透明度属性，则需要重新定义透明度的值
        if (
            this.props.backdropOpacity !== nextProps.backdropOpacity &&
            this.backdropRef
        ) {
            this.backdropRef.transitionTo({
                opacity: nextProps.backdropOpacity,
            }, this.props.backdropTransitionInTiming)
        }
    }

    /**
     * 当拦截新的props和state时用于判断是否组件需要更新（更新阶段）
     * @param nextProps 新的props
     * @param nextState 新的state
     */
    shouldComponentUpdate(nextProps: propsTypes, nextState: stateTypes) {
        return true
    }

    /**
     * 组件将要更新，当shouldComponentUpdate()返回true时候被调用（更新阶段）
     */
    componentWillUpdate() {

    }

    /**
     * 组件已经跟新（更新阶段）
     * @param prevProps 前一个props
     * @param prevState 前一个state
     */
    componentDidUpdate(prevProps: propsTypes, prevState: stateTypes) {
        // 当模态打开请求发出后立即执行动画打开效果
        if (this.props.isVisible && !prevProps.isVisible) {
            this.open();
        } else if (!this.props.isVisible && prevProps.isVisible) {
            // 当模态隐藏请求发出后, 立即执行动画关闭效果
            this.close();
        }
    }

    /**
     * node被移除时被调用（销毁阶段）
     */
    componentWillUnmount() {

    }
}