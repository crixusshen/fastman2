/*
 * @Author: shenzhiwei
 * @Date: 2018-06-23 15:20:47
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-13 16:35:58
 * @Description: ScrollView
 */
import React, { Component, } from 'react'
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import BaseComponent from '../base'
import styles from './styles'
import Thumb from '../common/thumb'

export default class ScrollViewComponent extends BaseComponent<{}, {}> {
    // 约束refs的类型
    refs: {
        [key: string]: any
        verticalScrollView: ScrollView
    }

    // 模拟5张图片
    private readonly THUMBS: Array<string> = [
        'https://gw.alicdn.com/tfs/TB12.7IyeuSBuNjy1XcXXcYjFXa-1280-520.jpg_720x720Q30s100.jpg',
        'https://gw.alicdn.com/tfs/TB1NQz6yN9YBuNjy0FfXXXIsVXa-1280-520.jpg_720x720Q30s100.jpg',
        'https://gw.alicdn.com/tfs/TB1b4qhy_tYBeNjy1XdXXXXyVXa-1280-520.jpg_720x720Q30s100.jpg',
        'https://gw.alicdn.com/tfs/TB1UNY1zeuSBuNjy1XcXXcYjFXa-1280-520.jpg_720x720Q30s100.jpg',
        'https://gw.alicdn.com/tfs/TB18eiFzTtYBeNjy1XdXXXXyVXa-1280-520.jpg_720x720Q30s100.jpg',
    ]

    render() {
        return (
            <View style={[{ paddingTop: this.containerTop, paddingBottom: this.containerBottom, }, styles.container, {height: 300,}]}>
                <Text style={styles.title}>Vertical ScrollView</Text>
                <View style={styles.verticalScrollView}>
                    <ScrollView
                    ref="verticalScrollView"
                    showsVerticalScrollIndicator={false} 
                    onScroll={() => {console.log('onScroll ...')}}
                    onContentSizeChange={(contentWidth, contentHeight)=>{console.log(`onContentSizeChange[${contentWidth}][${contentHeight}] ...`)}}
                    >
                        {
                            this.THUMBS.map(this.createThumbRow)
                        }
                    </ScrollView>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={this.scrollTo.bind(this, [true])}>
                        <Text style={styles.buttonText}>click me scroll to top</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={this.scrollTo.bind(this, [false])}>
                        <Text style={styles.buttonText}>click me scroll to bottom</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Horizontal ScrollView</Text>
                <View style={styles.horizontalScrollView}>
                    <ScrollView 
                    horizontal={true} 
                    onScroll={_ => {console.log('onScroll ...')}}
                    onContentSizeChange={_=>{console.log('onContentSizeChange ...')}}
                    >
                        {
                            this.THUMBS.map(this.createThumbRow)
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }

    /**
     * 创建单个thumb
     * @param url 图片资源路径
     * @param i 索引
     */
    private createThumbRow(url: string, i: number): any {
        return <Thumb key={i} uri={url} />
    }

    /**
     * 滚动封装
     * @param param0 是否顶部（true-滚动至顶部 false-滚动至底部）
     */
    private scrollTo([isTop]: Array<boolean>): void {
        // 滚动至顶部
        if(isTop) {
            this.refs.verticalScrollView.scrollTo({
                y: 0,
            })
        }
        // 滚动至底部
        else {
            this.refs.verticalScrollView.scrollToEnd()
        }
    }
}