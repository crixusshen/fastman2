/*
 * @Author: shenzhiwei
 * @Date: 2018-06-26 09:47:15
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-04 12:29:28
 * @Description: Text
 */
import React, { PureComponent, } from 'react'
import {
    View,
    Text,
    Image,
    StyleProp,
    TextStyle,
    LayoutAnimation,
} from 'react-native'

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {

}

export default class TextComponent extends Component<propsTypes, stateTypes> {

    // 初始化props
    static defaultProps = {
        // TODO ...
    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量
        this.state = {}
    }

    render() {
        return (
            <Text>333</Text>
        )
    }
}
