/*
 * @Author: shenzhiwei
 * @Date: 2018-06-28 13:48:23
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-28 13:56:39
 * @Description: FlatList
 */
import React, { Component, } from 'react'
import {
    View,
    FlatList,
    Platform,
} from 'react-native'
import BasePureListViewComponent, {
    Item,
    PlainInput,
    SmallSwitchOption,
    SeparatorComponent,
    ItemSeparatorComponent,
    HeaderComponent,
    FooterComponent,
    ListEmptyComponent,
    ItemComponent,
} from '../base/basePureListViewComponent';
import styles from './styles';

const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
};

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {
    data: Array<Item>,
    debug: boolean,
    horizontal: boolean,
    inverted: boolean,
    fixedHeight: boolean,
    logViewable: boolean,
    empty: boolean,
    filterText: string,
}

export default class FlatListComponent extends BasePureListViewComponent<propsTypes, stateTypes> {

    // 初始化props
    static defaultProps = {}

    // 声明状态变量
    public state: stateTypes

    // 当前flatList的引用
    refs: {
        [key: string]: any,
        flat: FlatList<Item>,
    }

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量
        this.state = {
            // 测试数据 {title:string, text:string, key:string, pressed:boolean,}
            data:  Platform.OS === 'web' ? this.genItemData(100) : this.genItemData(1000),
            // 是否启动调试模式
            debug: false,
            // 是否水平显示
            horizontal: false,
            // 是否翻转滚动反向进行，容器内的元素也会反过来
            inverted: false,
            // 是否固定高度，如果是水平方向，则是指width
            fixedHeight: true,
            // 是否启动日志
            logViewable: false,
            // 是否清空数据，展示ListEmptyComponent组件
            empty: false,
            // 搜索文本框中的用户输入
            filterText: '',
        }
    }

    render() {
        // 根据交互输入文本来过滤状态变量中的“数据变量”
        const filterRegex = new RegExp(String(this.state.filterText), 'i')
        const filter = (item: Item) => filterRegex.test(item.text) || filterRegex.test(item.title)
        const filteredData = this.state.data.filter(filter)

        return (
            <View style={[{ paddingTop: this.containerTop, paddingBottom: this.containerBottom, }, styles.container,]}>
                <View style={styles.searchRow}>
                    <View style={styles.options}>
                        <PlainInput placeholder="Search..."
                            value={this.state.filterText} 
                            onChangeText={this._onChangeFilterText}
                        />
                    </View>
                    <View style={styles.options}>
                        {SmallSwitchOption(this, 'horizontal')}
                        {SmallSwitchOption(this, 'fixedHeight')}
                        {SmallSwitchOption(this, 'logViewable')}
                        {SmallSwitchOption(this, 'inverted')}
                        {SmallSwitchOption(this, 'empty')}
                        {SmallSwitchOption(this, 'debug')}
                    </View>
                </View>
                <SeparatorComponent />
                <FlatList
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    ListHeaderComponent={HeaderComponent}
                    ListFooterComponent={FooterComponent}
                    ListEmptyComponent={ListEmptyComponent}
                    renderItem={this._renderItemComponent}
                    data={this.state.empty ? [] : filteredData}
                    debug={this.state.debug}
                    // 可选优化项，避免动态测量内容尺寸的额外开销，建议开发者自行实现
                    getItemLayout={this.state.fixedHeight ? this._getItemLayout : undefined}
                    // 是否水平布局
                    horizontal={this.state.horizontal}
                    // 翻转滚动方向
                    inverted={this.state.inverted}
                    keyboardShouldPersistTaps="always"
                    legacyImplementation={false}
                    // numColumns={1}
                    // 可模拟一次上拉刷新效果
                    onEndReached={this._onEndReached}
                    onRefresh={this._onRefresh}
                    onViewableItemsChanged={this._onViewableItemsChanged}
                    ref="flat"
                    refreshing={false}
                    viewabilityConfig={VIEWABILITY_CONFIG}
                    // 指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容
                    initialNumToRender={20}
                    onEndReachedThreshold={0.5}
                    // 一次绘制的最大数目
                    maxToRenderPerBatch={Platform.OS === 'web' ? 10: 300}
                    // 限定绘制的最大数目，默认为21
                    windowSize={Platform.OS === 'web'? 21 : 42}
                />
            </View>
        )
    }

    /**
     * 根据输入进行列表数据的筛选
     */
    private _onChangeFilterText = (filterText: string) => {
        this.setState({filterText,})
    }

    /**
     * 计算item元素高度，减少性能开销
     */
    private _getItemLayout = (data: any, index: number) => {
        return this.getItemLayout(data, index, this.state.horizontal)
    }

    /**
     * 快到底部时会触发，这里模拟增加了测试数据
     */
    private _onEndReached = (info: { distanceFromEnd: number, }) => {
        console.log(`onEndReached distanceFromEnd: ${info.distanceFromEnd}`)
        if (this.state.data.length >= 1000) {
            return
        }
        // 继续追加测试数据，直到1000的个数终止
        this.setState({
            data: this.state.data.concat(this.genItemData(100, this.state.data.length))
        })
    }

    /**
     * 下拉刷新时触发
     */
    private _onRefresh = () => {
        console.log('onRefresh callout ...')
    }

    /**
     * 在可见行元素变化时调用
     */
    private _onViewableItemsChanged = (info: {
        viewableItems: Array<{
            item: any
            key: string
            index: number | null
            isViewable: boolean
            section?: any
        }>,
        changed: Array<{
            item: any
            key: string
            index: number | null
            isViewable: boolean
            section?: any
        }>
    }) => {
        if (this.state.logViewable) {
            console.log('_onViewableItemsChanged')
        }
    }

    /**
     * 当个item元素渲染处理函数
     */
    private _renderItemComponent = (info: {
        item: Item,
        index: number,
        // separators: {
        //     highlight: () => void,
        //     unhighlight: () => void,
        // }
    }) => {
        return (
            <ItemComponent
                item={info.item}
                onPress={() => {
                    console.log('item onPressed')
                    // debugger
                    // const myFlatListRef = this.refs.flat
                }}
                horizontal={this.state.horizontal}
                fixedHeight={this.state.fixedHeight}
                // onShowUnderlay={info.separators.highlight}
                // onHideUnderlay={info.separators.unhighlight}
            ></ItemComponent>
        )
    }
}