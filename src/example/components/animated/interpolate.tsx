/*
 * @Author: shenzhiwei
 * @Date: 2018-07-07 15:54:26
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-07 16:43:06
 * @Description: Animated View
 */
import React, { Component, } from 'react'
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Easing,
    Image,
} from 'react-native'

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {
    grassTransY: any,
    bigDogeTransY: any,

    [key: string]: any,
}

export default class YourNameComponent extends Component<propsTypes, stateTypes> {

    // 初始化props（创建阶段）
    static defaultProps = {
        // TODO ...
    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量（实例化阶段）
        this.state = {
            grassTransY: new Animated.Value(0),
            bigDogeTransY: new Animated.Value(0),
        }
    }

    /**
     * 根据业务逻辑可对state进行相应操作（实例化阶段）
     */
    componentDidMount() {
        var timing = Animated.timing;
        Animated.parallel(['grassTransY', 'bigDogeTransY'].map((prop, i) => {
            var _conf = {
                toValue: 1,    //注意这里设置最终value都为1
                duration: 1000 + i * 1000,
                easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
            };

            return timing(this.state[prop], _conf)
        })).start();
    }

    /**
     * 视图渲染（实例化阶段/更新阶段）
     */
    render() {
        return (
            <View style={styles.container}>

                <Animated.View style={[styles.grass, {
                    transform: [{
                        translateY: this.state.grassTransY.interpolate({
                            inputRange: [0, 1],
                            outputRange: [Dimensions.get('window').height / 2, 200]
                        })
                    }]
                }]}></Animated.View>

                <Animated.View style={[styles.doges, {
                    transform: [{
                        translateX: Dimensions.get('window').width / 2 - 139
                    },
                    {
                        translateY: this.state.bigDogeTransY.interpolate({
                            inputRange: [0, 1],  //动画value输入范围
                            outputRange: [298, -200]  //对应的输出范围
                        })
                    }]
                }]}>
                    <Image source={require('../images/thumbnails/flowers.png')} style={{ width: 50, height: 50, }} />
                </Animated.View>

            </View>
        );
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

var styles = StyleSheet.create({
    grass: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        backgroundColor: '#A3D900',
        height: 240
    },
    doges: {
        position: 'absolute'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#73B9FF'
    }
});