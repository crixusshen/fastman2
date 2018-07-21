/*
 * @Author: shenzhiwei
 * @Date: 2018-06-26 09:47:15
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-05 16:02:20
 * @Description: BaseViewComponent
 */
import React, { ReactNode, ReactElement } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native'
import BaseComponent from './index'

// 每一块单元格的类型，包含必要的标题和渲染函数
export interface Item {
    // 标题
    title: string,
    // 渲染函数
    render(): ReactNode,
    // 描述（可选）
    description?: string,
}

export default class BaseViewComponent<P, S> extends BaseComponent<P, S> {
    // 声明状态变量
    public state: S

    constructor(props: P) {
        super(props);
    }

    /**
     * 渲染容器
     * @param items 成员
     */
    protected renderContainer(items: Array<Item>): JSX.Element {
        return (
            <View style={[styles.container, { paddingTop: this.containerTop, paddingBottom: this.containerBottom, }]}>
                <ScrollView>
                    {
                        items.map((item: Item, i: number) => {
                            return (
                                <View style={styles.section} key={i}>
                                    <View style={styles.title}>
                                        <Text style={{ fontWeight: 'bold', }}>{item.title}</Text>
                                    </View>
                                    {
                                        !!item.description ? 
                                        <View style={styles.description}>
                                            <Text style={{ fontSize: 12, }}>{item.description}</Text>
                                        </View> : <View />
                                    }
                                    <View style={styles.editArea}>
                                        {item.render()}
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(233, 235, 237)',
    },
    section: {
        margin: 5,
    },
    title: {
        height: 30,
        backgroundColor: 'rgb(247, 247, 249)',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(233, 233, 244)',
    },
    description: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: 'rgb(247, 247, 249)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(233, 233, 244)',
    },
    editArea: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
})