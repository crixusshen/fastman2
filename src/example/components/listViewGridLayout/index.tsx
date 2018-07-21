/*
 * @Author: shenzhiwei
 * @Date: 2018-06-26 18:05:37
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-27 16:19:40
 * @Description: ListViewGridLayout extend ListView
 */
import React, { Component, } from 'react'
import {
    ListView,
    View,
    Text,
    Image,
    TouchableHighlight,
} from 'react-native'
import ListViewComponent from '../listView'
import { ListViewPropTypes, ListViewStateTypes, } from '../listView/propStateTypes'
import styles from './styles'

export default class ListViewGridLayoutComponent extends ListViewComponent {
    constructor(props: ListViewPropTypes) {
        super(props);
        console.log('ListViewGridLayoutComponent constructor ...')
    }

    render() {
        return (
            <View style={[{ paddingTop: this.containerTop, paddingBottom: this.containerBottom, },]}>
                <ListView contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    initialListSize={21}
                    pageSize={3}
                    scrollRenderAheadDistance={500}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        )
    }

    // 重写基类原实现
    protected renderRowView(
        rowData: string,
        sectionID: number,
        rowID: number,
        imgSource: any,
        rowHash?: number,
    ): JSX.Element {
        return (
            <TouchableHighlight onPress={() => this.pressRow(rowID)}>
                <View style={styles.row}>
                    <Image style={styles.thumb} source={imgSource} />
                    <Text style={styles.text}>{rowData}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}