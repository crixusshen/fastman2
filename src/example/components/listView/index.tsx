/*
 * @Author: shenzhiwei
 * @Date: 2018-06-25 13:42:14
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-27 17:37:35
 * @Description: ListView
 */
import React, { Component, } from 'react'
import {
    ListView,
    View,
    Text,
    Image,
    TouchableHighlight,
    ListViewDataSource,
} from 'react-native'
import BaseListViewComponent, { genRows, } from '../base/baseListViewComponent'
import { ListViewPropTypes, ListViewStateTypes, } from './propStateTypes'
import styles from './styles'

export default class ListViewComponent extends BaseListViewComponent<ListViewPropTypes, ListViewStateTypes> {
    // 声明状态变量
    public state: ListViewStateTypes
    // 声明图片描述
    private readonly LOREM_IPSUM: string = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.'
    // 存放被点击过的数据队列
    private pressData: { [key: number]: boolean }
    // 当前ds实例
    protected ds: ListViewDataSource

    constructor(prop: ListViewPropTypes) {
        super(prop);
        console.log('ListViewComponent constructor ...')

        // 声明渲染ListView用的DataSource类型变量为本组件的状态变量
        this.ds = this.getDefaultDatasource()
        this.setDatasourceState()
    }

    render() {
        console.log('render ...')
        return (
            <View style={[{ paddingTop: this.containerTop, paddingBottom: this.containerBottom, },]}>
                <ListView dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this.renderSeparator.bind(this)}
                />
            </View>
        )
    }

    componentWillMount() {
        console.log('componentWillMount ...')
        // 组件即将装载前进行一些内存型变量的初始化工作
        this.pressData = {}
    }

    /**
     * 获取默认的datasource实例
     */
    protected getDefaultDatasource(): ListViewDataSource {
        return new ListView.DataSource({ rowHasChanged: (oldRow, newRow) => oldRow !== newRow })
    }

    /**
     * 获取原始数据源数据
     * 使用any暴露接口提供上层进行重写，底层则是使用重载来进行不同实例之间的数据产生逻辑
     * @param pressData 所点击的数据
     */
    protected genRows(data?: any): any {
        return genRows(data as {})
    }

    /**
     * 设置数据源状态
     */
    protected setDatasourceState(): void{
        this.state = {
            dataSource: this.ds.cloneWithRows(this.genRows({}))
        }
    }

    /**
     * 渲染行数据
     * @param rowData 单行数据
     * @param sectionID 区域ID
     * @param rowID 行ID
     * @param highlightRow 行高亮回调函数，可控制行的高亮 
     */
    protected renderRow(
        rowData: string,
        sectionID: number,
        rowID: number,
        highlightRow: boolean,
    ): JSX.Element {
        let rowHash = Math.abs(this.hashCode(rowData))
        let imgSource = BaseListViewComponent.THUMB_URLS[rowHash % BaseListViewComponent.THUMB_URLS.length]
        // 输出日志，跟踪渲染情况
        console.log(`[第${rowData}行数据][第${rowHash % BaseListViewComponent.THUMB_URLS.length}个图片]被重新装载 ...`)
        return this.renderRowView(rowData, sectionID, rowID, imgSource, rowHash)
    }

    /**
     * 渲染行视图层绘制逻辑
     * @param rowData 单行数据
     * @param sectionID 区域ID
     * @param rowID 行ID
     * @param imgSource 当前所显示的图片引用
     * @param rowHash 行Hash
     */
    protected renderRowView(
        rowData: string,
        sectionID: number,
        rowID: number,
        imgSource: any,
        rowHash?: number,
    ) {
        return (
            <TouchableHighlight onPress={() => {
                this.pressRow(rowID)
            }}>
                <View style={styles.row}>
                    <Image style={styles.thumb} source={imgSource} />
                    <Text style={styles.text}>
                        {rowHash ? rowData + '-' + this.LOREM_IPSUM.substr(0, (rowHash % 301) + 10) : ''}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    /**
     * 点击行时触发
     * @param rowID 行ID
     */
    protected pressRow(rowID: number): void {
        this.pressData[rowID] = !this.pressData[rowID]
        // 数据变化，重置数据
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.genRows(this.pressData))
        })
    }
}