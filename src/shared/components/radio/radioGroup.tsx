/*
 * @Author: shenzhiwei
 * @Date: 2018-07-06 13:18:48
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-06 17:20:08
 * @Description: RadioGroup，内部可存放多个RadioButton子组件
 */
import React, { Component, ReactElement, ReactNode, } from 'react'
import {
    View,
} from 'react-native'
import PropTypes from 'prop-types'
import RadioButton from './radioButton'

// 定义props类型
interface propsTypes {
    // 单选按钮的尺寸大小
    size?: number,
    // 单选按钮的线框粗细长度
    thickness?: number,
    // 单选按钮未选中时的颜色
    color?: string,
    // 单选按钮被选中后的颜色
    activeColor?: string,
    // 单选按钮被选中后的背景色
    highlightColor?: string,
    // 自定义样式
    style?: {[key: string]: string},
    // 点击单选按钮时触发的回调函数，可回传获取到当前所点击单选按钮的索引值和返回值
    onSelect?: (index: number, value: any) => void,
    // 默认选中的单选按钮的索引（初始化）
    selectedIndex?: number,  
}

// 定义state类型
interface stateTypes {
    // 组件默认所选中的索引
    selectedIndex?: number,
}

export default class RadioGroupComponent extends Component<propsTypes, stateTypes> {

    // 默认颜色
    private static readonly DEFAULT_COLOR: string = '#007AFF'

    // 记录前一个选择的索引值
    private prevSelected: number

    // 初始化props（创建阶段）
    static defaultProps = {
        size: 20,
        thickness: 1,
        color: RadioGroupComponent.DEFAULT_COLOR,
        activeColor: null,
        highlightColor: null,
        // 默认选中第一个radioButton成员
        selectedIndex: 0,
        style: null,
        onSelect: null,
    }

    // 声明context对象的属性
    static childContextTypes = {
        size: PropTypes.number.isRequired,
        thickness: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        activeColor: PropTypes.string,
        highlightColor: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
    }

    // 创建生产者context
    getChildContext() {
        return {
            size: this.props.size,
            thickness: this.props.thickness,
            color: this.props.color,
            activeColor: this.props.activeColor,
            highlightColor: this.props.highlightColor,
            onSelect: this.onSelect,
        }
    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);
        
        // 初始化状态变量（实例化阶段）
        this.state = {
            selectedIndex: this.props.selectedIndex,
        }
        this.prevSelected = this.props.selectedIndex!
    }

    /**
     * 选择子组件时被触发
     * @param index 当前所选择子组件的索引
     * @param value 当前所选择子组件的值
     */
    private onSelect = (index: number, value: any) => {
        this.setState({
            selectedIndex: index,
        })

        if(this.props.onSelect) {
            this.props.onSelect(index, value)
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
        const radioButtons = React.Children.map(this.props.children, (radioButton: any, index) => {
            // 获取遍历成员中的成员当前是否是选中状态
            const isSelected = this.state.selectedIndex === index
            // 如果定义了选中时的可选颜色参数，则优先使用该颜色
            const color = isSelected && this.props.activeColor ? this.props.activeColor : this.props.color
            return (
                <RadioButton 
                    disabled={radioButton.props.disabled}
                    style={radioButton.props.style}
                    value={radioButton.props.value}
                    index={index}
                    isSelected={isSelected}
                >
                    {radioButton.props.children}
                </RadioButton>
            )
        })

        return (
            <View style={this.props.style}>
                {radioButtons}
            </View>
        )
    }

    /**
     * 当组件接收到新的props时被调用（更新阶段）
     * @param nextProps 新的props
     * @param nextState 新的state
     */
    componentWillReceiveProps(nextProps: propsTypes, nextState: stateTypes) {

    }

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