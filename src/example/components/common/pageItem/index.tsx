/*
 * @Author: shenzhiwei
 * @Date: 2018-06-27 16:38:45
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-28 09:04:23
 * @Description: pageItem组件
 */
import React, { Component, } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Image,
    Text,
    LayoutAnimation,
} from 'react-native'
import BaseListViewComponent from '../../base/baseListViewComponent'
import { layoutAnimationConfigs } from '../../listViewPaging/animation'

// 定义props类型
interface propsTypes {
    text: string,
}

// 定义state类型
interface stateTypes {
    pageItemIndex: number,
    dir: any,
}

export default class PageItemComponent extends Component<propsTypes, stateTypes> {

    // 初始化props
    static defaultProps = {}

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);
        console.log('PageItemComponent constructor')

        // 初始化状态变量
        this.state = {
            pageItemIndex: this.getPageItemIdx(),
            dir: 'row',
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.buttonContents, { flexDirection: this.state.dir }]}
                onPress={this.onPressPageItem.bind(this)}>
                <Image style={styles.img} source={BaseListViewComponent.THUMB_URLS[this.state.pageItemIndex]} />
                <Image style={styles.img} source={BaseListViewComponent.THUMB_URLS[this.state.pageItemIndex]} />
                <Image style={styles.img} source={BaseListViewComponent.THUMB_URLS[this.state.pageItemIndex]} />
                {this.state.dir === 'column' ? (
                    <Text>
                        Oooo, look at this new text! So awesome it may just be crazy. Let me
                        keep typing here so it wraps at least one line.
                </Text>
                ) : (
                        <Text />
                    )}
            </TouchableOpacity>
        )
    }

    /**
     * 随机获取图片队列中的某张图片索引
     */
    private getPageItemIdx(): number {
        return Math.floor(Math.random() * (BaseListViewComponent.THUMB_URLS.length))
    }

    /**
     * row触摸时的事件
     */
    protected onPressPageItem(): void {
        console.log('onPressPageItem')
        // 随机获取一个动画效果
        let config = layoutAnimationConfigs[
            this.state.pageItemIndex % layoutAnimationConfigs.length
        ]
        LayoutAnimation.configureNext(config)

        this.setState({
            pageItemIndex: this.getPageItemIdx(),
            dir: this.state.dir === 'row' ? 'column' : 'row',
        })
    }
}

const styles = StyleSheet.create({
    buttonContents: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 3,
        padding: 5,
        backgroundColor: '#EAEAEA',
        borderRadius: 3,
        paddingVertical: 10,
    },
    img: {
        width: 64,
        height: 64,
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
})