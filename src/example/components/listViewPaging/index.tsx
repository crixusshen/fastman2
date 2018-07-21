/*
 * @Author: shenzhiwei
 * @Date: 2018-06-27 13:41:04
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-28 10:30:33
 * @Description: ListViewPaging
 */
import React, { Component, } from 'react'
import {
    Platform,
    View,
    Text,
    ListView,
    ListViewDataSource,
    LayoutAnimation,
    TouchableOpacity,
    requireNativeComponent,
} from 'react-native'
import BaseListViewComponent, { genRows, } from '../base/baseListViewComponent'
import ListViewComponent from '../listView'
import { ListViewPropTypes, ListViewStateTypes, } from '../listView/propStateTypes'
import PageItem from '../common/pageItem'
import { layoutAnimationConfigs } from './animation'
import styles from './styles'

export default class ListViewPagingComponent extends ListViewComponent {
    constructor(props: ListViewPropTypes) {
        super(props);
        console.log('ListViewPagingComponent constructor ...')
    }

    render() {
        return (
            <ListView 
                style={[styles.listview, { paddingTop: this.containerTop, paddingBottom: this.containerBottom, }]}
                dataSource={this.state.dataSource}
                renderHeader={this.renderHeader.bind(this)}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                initialListSize={10}
                pageSize={4}
                scrollRenderAheadDistance={500} 
                // TODO: web端不支持
                stickySectionHeadersEnabled={ (Platform.OS !== 'web') ? true : false }
            />
        )
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
        return <PageItem text={rowData} />
    }

    /**
     * 头标题section的视图渲染
     * @param sectionData 块数据
     * @param sectionID 块ID
     */
    protected renderSectionHeader(sectionData: string, sectionID: string) {
        return (
            <View style={styles.section}>
              <Text style={styles.text}>{sectionData}</Text>
            </View>
          )
    }

    /**
     * 整个头部渲染
     */
    protected renderHeader(): JSX.Element {
        var headerLikeText =
            this.state.headerPressCount! % 2 ? (
                <View>
                    <Text style={styles.text}>1 Like</Text>
                </View>
            ) : null;
        return (
            <TouchableOpacity onPress={this.onPressHeader.bind(this)} style={styles.header}>
                {headerLikeText}
                <View>
                    <Text style={styles.text}>Table Header (click me)</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 获取默认的datasource实例
     */
    protected getDefaultDatasource(): ListViewDataSource {
        return new ListView.DataSource({
            rowHasChanged: (oldRow, newRow) => oldRow !== newRow,
            sectionHeaderHasChanged: (oldSectionHeader, newSectionHeader) => oldSectionHeader !== newSectionHeader,
            getRowData: (dataBlob, sectionID, rowID) => {
                console.log(`getRowData [sectionID]:${sectionID}  [rowID]:${rowID}`)
                return dataBlob[rowID]
            },
            getSectionHeaderData: (dataBlob, sectionID) => {
                console.log(`getSectionHeaderData [sectionID]:${sectionID}`)
                return dataBlob[sectionID]
            },
        })
    }

    /**
     * 获取原始数据源数据
     * 使用any暴露接口提供上层进行重写，底层则是使用重载来进行不同实例之间的数据产生逻辑
     * @param pressData 所点击的数据
     */
    protected genRows(data?: any): any {
        return genRows()
    }

    /**
     * 设置数据源状态，初始化
     */
    protected setDatasourceState(): void {
        let stateTunple = this.genRows()
        this.state = {
            dataSource: this.ds.cloneWithRowsAndSections(
                stateTunple[0],
                stateTunple[1],
                stateTunple[2],
            ),
            headerPressCount: 0,
        }
    }

    /**
     * 点击Header时触发
     */
    protected onPressHeader(): void {
        var config =
            layoutAnimationConfigs[
            Math.floor(this.state.headerPressCount! / 2) %
            layoutAnimationConfigs.length
            ];
        LayoutAnimation.configureNext(config);
        this.setState({ headerPressCount: this.state.headerPressCount! + 1 });
    }
}