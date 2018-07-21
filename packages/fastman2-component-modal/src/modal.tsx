/*
 * @Author: shenzhiwei
 * @Date: 2018-07-07 13:42:51
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-09 14:10:55
 * @Description: Modal
 */
import React, { Component, } from 'react'
import {
    Animated,
    Dimensions,
    Easing,
} from 'react-native'
import ModalPortal from './portal'  // modal插槽
import Styles from './styles'

// 定义props类型
interface propsTypes {
    // 动画类型
    animationType?: 'none' | 'slide' | 'fade',
    // 阴影层是否透明
    transparent?: boolean,
    // 模态窗口是否显示，如果设置为true，则一打开就会显示模态窗口
    visible?: boolean,
    // 安卓物理后退键点击时触发，只限于安卓平台
    onRequestClose?: () => void,
    // 模态窗口显示时被触发的回调
    onShow?: () => void,
    // 模态窗口关闭时被触发的回调
    onDismiss?: () => void,
    children?: any,
}

// 定义state类型
interface stateTypes {
    animationSlide: any,
    animationFade: any,
    styleFade: any,
    opacityFade: any,
    slideTranslation: any,
}

export default class ModalComponent extends Component<propsTypes, stateTypes> {
    
    // 初始化props（创建阶段）
    static defaultProps = {
        animationType: 'none',
        transparent: false,
        visible: false,
        onRequestClose: () => { },
        onShow: () => { },
        onDismiss: () => { },
    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量（实例化阶段）
        this.state = {
            animationSlide: null,
            animationFade: null,
            styleFade: { display: props.visible ? 'flex' : 'none', },
            opacityFade: new Animated.Value(0),
            slideTranslation: new Animated.Value(0),
        }
    }

    handleShow() {
        const { animationType, onShow } = this.props;

        if (animationType === 'slide') {
            this.animateSlideIn(onShow)
        } else if (animationType === 'fade') {
            this.animateFadeIn(onShow)
        } else {
            if (onShow) {
                onShow()
            }
        }
    }

    handleClose() {
        const { animationType, onDismiss } = this.props;

        if (animationType === 'slide') {
            this.animateSlideOut(onDismiss)
        } else if (animationType === 'fade') {
            this.animateFadeOut(onDismiss)
        } else {
            if(onDismiss) {
                onDismiss()
            }
        }
    }

    // Fade Animation Implementation
    animateFadeIn = (callback: any) => {
        if (this.state.animationFade) {
            this.state.animationFade.stop();
        }

        const animationFade = Animated.timing(this.state.opacityFade, {
            toValue: 1,
            duration: 300,
        });

        this.setState(
            {
                animationFade,
            },
            () => {
                requestAnimationFrame(() => {
                    this.setState({ styleFade: { display: 'flex' } }, () =>
                        this.state.animationFade.start(callback)
                    );
                });
            }
        );
    };

    animateFadeOut = (callback: any) => {
        if (this.state.animationFade) {
            this.state.animationFade.stop();
        }

        const animationFade = Animated.timing(this.state.opacityFade, {
            toValue: 0,
            duration: 300,
        });

        this.setState(
            {
                animationFade,
            },
            () => {
                requestAnimationFrame(() => {
                    this.state.animationFade.start(() => {
                        this.setState(
                            {
                                styleFade: { display: 'none' },
                            },
                            callback
                        );
                    });
                });
            }
        );
    };
    // End of Fade Animation Implementation

    // Slide Animation Implementation
    animateSlideIn = (callback: any) => {
        if (this.state.animationSlide) {
            this.state.animationSlide.stop()
        }

        const animationSlide = Animated.timing(this.state.slideTranslation, {
            toValue: 1,
            easing: Easing.out(Easing.poly(4)),
            duration: 300,
        });

        this.setState(
            {
                animationSlide,
            },
            () => {
                requestAnimationFrame(() => {
                    this.setState({ styleFade: { display: 'flex' } }, () =>
                        this.state.animationSlide.start(callback)
                    );
                });
            }
        );
    };

    animateSlideOut = (callback: any) => {
        if (this.state.animationSlide) {
            this.state.animationSlide.stop()
        }

        const animationSlide = Animated.timing(this.state.slideTranslation, {
            toValue: 0,
            easing: Easing.in(Easing.poly(4)),
            duration: 300,
        });

        this.setState(
            {
                animationSlide,
            },
            () => {
                requestAnimationFrame(() => {
                    this.state.animationSlide.start(() => {
                        this.setState(
                            {
                                styleFade: { display: 'none' },
                            },
                            callback
                        );
                    });
                });
            }
        );
    };
    // End of Slide Animation Implementation

    getAnimationStyle() {
        const { visible, animationType } = this.props
        const { styleFade } = this.state

        if (animationType === 'slide') {
            return [
                {
                    transform: [
                        {
                            translateY: this.state.slideTranslation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [Dimensions.get('window').height, 0],
                                extrapolate: 'clamp',
                            }),
                        },
                    ],
                },
                styleFade,
            ];
        }
        if (animationType === 'fade') {
            return [{ opacity: this.state.opacityFade }, styleFade]
        }

        return [Styles[visible ? 'visible' : 'hidden']]
    }

    /**
     * 根据业务逻辑可对state进行相应操作（实例化阶段）
     */
    componentDidMount() {
        if (this.props.visible) this.handleShow()
    }

    /**
     * 视图渲染（实例化阶段/更新阶段）
     */
    render() {
        const { transparent, children, } = this.props

        const transparentStyle = transparent
            ? Styles.bgTransparent
            : Styles.bgNotTransparent
        const animationStyle = this.getAnimationStyle()

        return (
            // 将react子元素转化为html后插槽入body内
            <ModalPortal>
                <Animated.View
                    style={[Styles.baseStyle, transparentStyle, animationStyle]}
                >
                    {children}
                </Animated.View>
            </ModalPortal>
        )
    }

    /**
     * 当组件接收到新的props时被调用（更新阶段）
     * @param nextProps 新的props
     * @param nextState 新的state
     */
    componentWillReceiveProps(nextProps: propsTypes, nextState: stateTypes) {
        const { visible, } = nextProps

        // 使用toggle互斥来确定是显示Modal还是关闭Modal
        if (visible && !this.props.visible) this.handleShow()
        if (!visible && this.props.visible) this.handleClose()
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
     */
    componentDidUpdate() {

    }

    /**
     * node被移除时被调用（销毁阶段）
     */
    componentWillUnmount() {

    }
}