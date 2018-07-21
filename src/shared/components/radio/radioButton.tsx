/*
 * @Author: shenzhiwei
 * @Date: 2018-07-06 11:08:08
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-06 16:57:43
 * @Description: RadioButton
 */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import {
    View,
    TouchableWithoutFeedback,
} from 'react-native'
import styles from './styles'

// 定义props类型
interface propsTypes {
    // 组件值，该值将会在父组件的onSelect事件中回传
    value: any,
    // 与RadioGroup中的color等效，如果设置则此属性的优先级更高
    color?: string,
    // 是否禁用该组件
    disabled?: boolean,
    // 该组件的自定义样式
    style?: {[key: string]: string},
    // 该组件索引
    index?: number,
    // 是否当前组件被选中
    isSelected?: boolean,
}

// 定义state类型
interface stateTypes {
    
}

export default class RadioButtonComponent extends Component<propsTypes, stateTypes> {

    // 初始化props（创建阶段）
    static defaultProps = {
        color: null,
        disabled: false,
        style: null,
        index: 0,
        isSelected: false,
    }

    // 初始化context（创建阶段）
    // 创建消费者，如果不定义this作用域中拿不到
    static contextTypes = {
        size: PropTypes.number.isRequired,
        thickness: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        activeColor: PropTypes.string,
        highlightColor: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
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
        const { children, } = this.props
        return (
            <View style={{ opacity: this.props.disabled ? 0.4 : 1 }}>
                <TouchableWithoutFeedback
                    disabled={this.props.disabled}
                    onPress={() => this.context.onSelect(this.props.index, this.props.value)}
                >
                    <View style={[
                        styles.container, 
                        this.props.style, 
                        this.props.isSelected ? { backgroundColor: this.context.highlightColor, } : null
                    ]}>
                        {/* radio圆点 */}
                        <View style={[styles.radio, this.getRadioStyle()]}>
                            {this.isSelectedRadio()}
                        </View>
                        {/* radio圆点后的内容 */}
                        <View style={styles.item}>
                            {children}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    /**
     * 单选按钮的形状定义
     */
    private getRadioStyle = () => {
        return {
            width: this.context.size,
            height: this.context.size,
            borderRadius: this.context.size / 2,    // 呈现出圆角，因此是size的一半
            borderWidth: this.context.thickness,
            borderColor: this.props.isSelected && this.context.activeColor ? this.context.activeColor : this.context.color
        }
    }

    /**
     * 被选中时的单选按钮形态
     */
    private isSelectedRadio = () => {
        if(this.props.isSelected) {
            return <View style={this.getRadioDotStyle()} />
        }        
    }

    /**
     * 单选按钮中被选中时中间那个实心圆点
     */
    private getRadioDotStyle = () => ({
        width: this.context.size / 2,
        height: this.context.size / 2,
        borderRadius: this.context.size / 4,
        backgroundColor: this.props.isSelected && this.context.activeColor ? this.context.activeColor : this.context.color
    })

    /**
     * 当拦截新的props和state时用于判断是否组件需要更新（更新阶段）
     * @param nextProps 新的props
     * @param nextState 新的state
     * @param nextContext 新的上下文
     */
    shouldComponentUpdate(nextProps: propsTypes, nextState: stateTypes, nextContext: any) {
        return true
    }

    /**
     * 组件将要更新，当shouldComponentUpdate()返回true时候被调用（更新阶段）
     * @param nextProps 新的props
     * @param nextState 新的state
     * @param nextContext 新的上下文
     */
    componentWillUpdate(nextProps: propsTypes, nextState: stateTypes, nextContext: any) {

    }

    /**
     * 组件已经跟新（更新阶段）
     * @param prevProps 上一个props
     * @param prevState 上一个state
     */
    componentDidUpdate(prevProps: propsTypes, prevState: stateTypes) {

    }

    /**
     * node被移除时被调用（销毁阶段）
     */
    componentWillUnmount() {

    }
}