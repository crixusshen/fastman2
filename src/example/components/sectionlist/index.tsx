/*
 * @Author: shenzhiwei
 * @Date: 2018-07-01 09:33:23
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-12 09:33:26
 * @Description: SectionList - 一个复合示例，不同section渲染相同/不同类型的子组件
 */
import * as React from 'react'
import { View, SectionList, Text, Button, SectionListProperties, SectionListStatic, PixelRatio, } from 'react-native';
import BasePureListViewComponent, {
    Item,
    PlainInput,
    SmallSwitchOption,
    SeparatorComponent,
    renderStackedItem,
    ItemComponent,
    HeaderComponent,
    FooterComponent,
    CustomSeparatorComponent,
} from '../base/basePureListViewComponent'
import styles from '../flatList/styles'
// sectionlist的getItemLayout的统一封装
import sectionListGetItemLayout, { Parameters, } from '../../../shared/helpers/sectionlist/getItemLayout'

export interface AppProps {
}

export interface AppStates {
    data: Array<Item>,
    debug: boolean,
    filterText: string,
    logViewable: boolean,
    inverted: boolean,
}

export default class SectionListComponent extends BasePureListViewComponent<AppProps, AppStates> {
    refs: {
        [key: string]: any,
        sectionList: any,   // 这里使用SectionList<V>会出现类型检查问题，暂时先这么解决
    }

    private getItemLayoutFunc: any

    constructor(props: AppProps) {
        super(props)

        this.state = {
            // 测试数据 {title:string, text:string, key:string, pressed:boolean,}
            data: this.genItemData(50),
            // 是否启动调试模式
            debug: false,
            // 搜索文本框中的用户输入
            filterText: '',
            // 是否启动日志
            logViewable: false,
            // 是否翻转滚动反向进行，容器内的元素也会反过来
            inverted: false,
        }

        this.getItemLayoutFunc = sectionListGetItemLayout({
            getItemHeight: (rowData, sectionIndex, rowIndex) => {
                // console.log(`[getItemHeight] -> sectionIndex:${sectionIndex} rowIndex:${rowIndex} rowData:${rowData.title} `)
                return 72
            },
            getSectionHeaderHeight: (sectionIndex: number) => {
                //console.log(`[getSectionHeaderHeight] -> sectionIndex:${sectionIndex}`)
                return 30 + 10
            },
            getSectionFooterHeight: (sectionIndex: number) => {
                // console.log(`[getSectionFooterHeight] -> sectionIndex:${sectionIndex}`)
                return 30 + 10
            },
            getSeparatorHeight: (sectionIndex: number, rowIndex: number) => {
                // console.log(`[getSeparatorHeight] -> sectionIndex:${sectionIndex} rowIndex:${rowIndex}`)
                // return 1 / PixelRatio.get()
                return 10
            },
            listHeaderHeight: 60,
        })
    }

    render() {
        // 根据交互输入文本来过滤状态变量中的“数据变量”
        const filterRegex = new RegExp(String(this.state.filterText), 'i')
        const filter = (item: Item) => filterRegex.test(item.text) || filterRegex.test(item.title)
        const filteredData = this.state.data.filter(filter)

        const filteredSectionData: Array<{ key: string, data: Array<Item>, }> = []
        let startIndex = 0
        const endIndex = filteredData.length - 1
        // 数据块分组，形成{ key: "0 - 9", data: [...0~9 Items] }的数据结构
        for (let i = 10; i < endIndex + 10; i += 10) {
            filteredSectionData.push({
                key: `${filteredData[startIndex].key} - ${filteredData[Math.min(i - 1, endIndex)].key}`,
                data: filteredData.slice(startIndex, i)
            })
            startIndex = i
        }

        return (
            <View style={[{ paddingTop: this.containerTop, paddingBottom: this.containerBottom, }, styles.container,]}>
                <View style={styles.options}>
                    <PlainInput
                            placeholder="Search..."
                            onChangeText={(filterText: string) => this.setState({ filterText, })}
                            value={this.state.filterText} />
                </View>
                <View style={styles.options}>
                    {SmallSwitchOption(this, 'logViewable')}
                    {SmallSwitchOption(this, 'inverted')}
                    {SmallSwitchOption(this, 'debug')}
                </View>
                <View style={styles.scrollToRow}>
                    <Text>scroll to:</Text>
                    <Button title="Item A" onPress={() => this._scrollToLocation(2, 1)} />
                    <Button title="Item B" onPress={() => this._scrollToLocation(3, 6)} />
                    <Button title="Item C" onPress={() => this._scrollToLocation(6, 3)} />
                </View>
                <SeparatorComponent />
                <SectionList 
                    style={styles.list}
                    ref="sectionList"
                    sections={[
                        // // 模拟一次空数据的情况
                        // {
                        //     key: 'empty section',
                        //     data: [],
                        // },
                        // // 头部部分
                        // {
                        //     key: 's1',
                        //     // 单独类型的块处理（特殊）
                        //     renderItem: renderStackedItem,
                        //     data: [
                        //         {
                        //             key: 'header item',
                        //             title: 'Item in Header Section',
                        //             text: 'Section s1',
                        //         }
                        //     ],
                        // },
                        // // 扩展数据部分
                        // {
                        //     key: 's2',
                        //     data: [
                        //         {
                        //             key: 'noimage0',
                        //             noImage: true,
                        //             title: '1st item',
                        //             text: 'Section s2',
                        //         },
                        //         {
                        //             key: 'noimage1',
                        //             noImage: true,
                        //             title: '2nd item',
                        //             text: 'Section s2',
                        //         },
                        //     ],
                        // },
                        // 自然数据部分
                        ...filteredSectionData,
                    ]}
                    renderItem={({ item, separators, }) => (
                        <ItemComponent
                            item={item}
                            onPress={() => console.log('item onPressed')}
                            onHideUnderlay={separators.unhighlight}
                            onShowUnderlay={separators.highlight}
                            fixedHeight={true}
                        />
                    )}
                    ListHeaderComponent={HeaderComponent}   // height: 60
                    ListFooterComponent={FooterComponent}   // height: 60
                    SectionSeparatorComponent={() => (<CustomSeparatorComponent text="SECTION SEPARATOR" />)}
                    ItemSeparatorComponent={info => (<CustomSeparatorComponent {...info} text="ITEM SEPARATOR" />)}
                    renderSectionHeader={this.renderSectionHeader}  // height: 30
                    renderSectionFooter={this.renderSectionFooter}  // height: 30
                    stickySectionHeadersEnabled={true} 
                    // 包含section/item元素，不包含section/item分割线
                    initialNumToRender={8}
                    // 性能优化点
                    getItemLayout={this.getItemLayoutFunc}
                />
            </View>
        )
    }
    /**
     * 滚动到指定的section和item索引位置
     *
     * @private
     * @param {number} sectionIndex section索引位置
     * @param {number} itemIndex item 索引位置
     * @memberof SectionListComponent
     */
    private _scrollToLocation(sectionIndex: number, itemIndex: number) {
        this.refs.sectionList.scrollToLocation({sectionIndex, itemIndex,})
    }

    /**
     * section header渲染
     *
     * @private
     * @param {{section: {[key: string]: any}}} info 请具体查看.d.ts中的定义
     * @returns
     * @memberof SectionListComponent
     */
    private renderSectionHeader(info: { section: { [key: string]: any } }) {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>SECTION HEADER: {info.section.key}</Text>
                {/* <SeparatorComponent /> */}
            </View>
        )
    }

    /**
     * section footer渲染
     *
     * @private
     * @param {{section: {[key: string]: any}}} info 请具体查看.d.ts中的定义
     * @returns
     * @memberof SectionListComponent
     */
    private renderSectionFooter(info: { section: { [key: string]: any } }) {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>SECTION FOOTER: {info.section.key}</Text>
                <SeparatorComponent />
            </View>
        )
    }
}