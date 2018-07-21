/*
 * @Author: shenzhiwei
 * @Date: 2018-07-07 13:18:10
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-08 14:06:07
 * @Description: 转化层
 */
import React, { Component, } from 'react'
import ReactDOM from 'react-dom'

// 定义props类型
interface propsTypes {
  el?: string,
  target?: string | Element,
  children: any,
}

// 定义state类型
interface stateTypes {

}

export default class PortalComponent extends Component<propsTypes, stateTypes> {

  public get target() {
    const { target } = this.props
    if(typeof target === 'string') {
      return document.querySelector(target)
    }
    return target
  }

  // 初始化props（创建阶段）
  static defaultProps = {
    el: 'div',
    target: document.body,
  }

  // 声明状态变量
  public state: stateTypes

  private el: HTMLElement

  constructor(props: propsTypes) {
    super(props);

    // 初始化状态变量（实例化阶段）
    this.state = {

    }

    this.el = document.createElement(props.el!)
  }

  /**
   * 根据业务逻辑可对state进行相应操作（实例化阶段）
   */
  componentDidMount() {
    this.target!.appendChild(this.el)
  }

  /**
   * 视图渲染（实例化阶段/更新阶段）
   */
  render() {
    const { children } = this.props
    // 将代码片段children放入容器this.el内
    return ReactDOM.createPortal(children, this.el)
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
    this.target!.removeChild(this.el)
  }
}