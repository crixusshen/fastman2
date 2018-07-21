/*
 * @Author: shenzhiwei
 * @Date: 2018-06-28 14:13:21
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-12 09:23:57
 * @Description: BasePureListViewComponent
 */
import React, { PureComponent, Component, } from 'react';
import {
    Platform,
    View,
    TextInput,
    Text,
    StyleSheet,
    Switch,
    TouchableHighlight,
    Image,
    Animated,
} from 'react-native'
import BaseComponent from './index'

// 声明元素类型
export interface Item {
    title: string,
    text: string,
    key: string,
    pressed: boolean,
    noImage?: boolean,
}

function hashCode(str: string): number {
    let hash = 15;
    for (let ii = str.length - 1; ii >= 0; ii--) {
        hash = (hash << 5) - hash + str.charCodeAt(ii);
    }
    return hash;
}

const THUMB_URLS = [
    require('../images/thumbnails/like.png'),
    require('../images/thumbnails/dislike.png'),
    require('../images/thumbnails/call.png'),
    require('../images/thumbnails/fist.png'),
    require('../images/thumbnails/bandaged.png'),
    require('../images/thumbnails/flowers.png'),
    require('../images/thumbnails/heart.png'),
    require('../images/thumbnails/liking.png'),
    require('../images/thumbnails/party.png'),
    require('../images/thumbnails/poke.png'),
    require('../images/thumbnails/superlike.png'),
    require('../images/thumbnails/victory.png'),
];

// item默认宽度
const HORIZ_WIDTH = 200
// item默认高度
const ITEM_HEIGHT = 72

export default class BaseListViewComponent<P, S> extends BaseComponent<P, S> {

    // 描述测试文案
    private readonly LOREM_IPSUM: string =
        'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix \
  civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id \
  integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem \
  vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud \
  modus, putant invidunt reprehendunt ne qui.'

    /**
     * 生成测试数据
     * @param count 生成数据的数量
     * @param start 开始的数据检索位置
     */
    protected genItemData(count: number, start: number = 0): Array<Item> {
        let dataBlob = []
        for (let i = start; i < count + start; i++) {
            let itemName = `Item ${i}`
            const itemHash = Math.abs(this.hashCode(itemName))
            dataBlob.push({
                title: itemName,
                text: this.LOREM_IPSUM.substr(0, (itemHash % 301) + 20),
                key: String(i),
                pressed: false,
            })
        }
        return dataBlob
    }

    /**
     * 动态计算内容高度，优化性能
     * @param data 数据集
     * @param index 数据索引
     * @param horizontal 是否横屏
     * 
     * // 注意：如果有分割线，则offset需要考虑分割线的高度
     * getItemLayout={(data, index) => (
     *   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
     * )}
     */
    protected getItemLayout(data: any, index: number, horizontal?: boolean) {
        const [length, separator, header] = horizontal ?
            [HORIZ_WIDTH, 0, HEADER.width] : [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER.height]
        // console.log('getItemLayout')
        return {
            length,     // 单个item高度
            offset: (length + separator) * index,   // 当前item的距离顶部的偏移高度
            index,      // 单个item当前索引位置
        }
    }

}

/**
 * 文本框组件
 * @param props props变量，可灵活传入
 */
export function PlainInput(props: { [key: string]: any }): JSX.Element {
    return (
        <TextInput autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            style={styles.searchTextInput}
            {...props} />
    )
}

/**
 * 小开关组件
 * @param context 上下文this
 * @param key state变量中的key值
 */
export function SmallSwitchOption(context: any, key: string) {
    return (
        <View style={styles.option}>
            <Text>{key}:</Text>
            <Switch
                style={styles.smallSwitch}
                value={context.state[key]}
                onValueChange={value => context.setState({ [key]: value })}
            ></Switch>
        </View>
    )
}

/**
 * 分割线组件
 */
export class SeparatorComponent extends PureComponent<{}> {
    render() {
        return (
            <View style={styles.separator} />
        );
    }
}

/**
 * 行与行之间的分隔线组件
 */
export class ItemSeparatorComponent extends PureComponent<{}> {
    render() {
        return <View style={styles.itemSeparator} />
    }
}

/**
 * 头部组件
 */
export class HeaderComponent extends PureComponent {
    render() {
        return (
            <View style={styles.headerFooterContainer}>
                <View style={styles.headerFooter}>
                    <Text>LIST HEADER</Text>
                </View>
                <SeparatorComponent />
            </View>
        )
    }
}

/**
 * 尾部组件
 */
export class FooterComponent extends PureComponent {
    render() {
        return (
            <View style={styles.headerFooterContainer}>
                <SeparatorComponent />
                <View style={styles.headerFooter}>
                    <Text>LIST FOOTER</Text>
                </View>
            </View>
        )
    }
};

/**
 * 列表为空时的组件
 */
export class ListEmptyComponent extends PureComponent {
    render() {
        return (
            <View style={styles.listEmpty}>
                <Text>数据变空了^_^</Text>
            </View>
        )
    }
}

/**
 * 列表中的元素组件（item）
 */
export class ItemComponent extends Component<{
    fixedHeight?: boolean,
    horizontal?: boolean,
    item: Item,
    onPress: (key: string) => void,
    onShowUnderlay?: () => void,
    onHideUnderlay?: () => void,
}, {}> {
    /**
     * 点击时触发
     */
    _onPress = () => {
        this.props.onPress(this.props.item.key)
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        console.log(this.props.item.key + '------>' + JSON.stringify(this.props) + '---->' + JSON.stringify(nextState))
        // if (this.props.item.title === nextProps.item.title) {
        //     return false;
        // } else {
        //     return true;
        // }
        return false
    }

    render() {
        console.log(this.props.item.key + ' ItemComponent render ...')
        const { fixedHeight, horizontal, item, } = this.props
        const itemHash = Math.abs(hashCode(item.title));
        const imgSource = THUMB_URLS[itemHash % THUMB_URLS.length];
        console.log(item.title)
        return (
            <TouchableHighlight style={horizontal ? styles.horizItem : styles.item}
                onPress={this._onPress}
                onShowUnderlay={this.props.onShowUnderlay}
                onHideUnderlay={this.props.onHideUnderlay}
            >
                <View style={[styles.row, horizontal && { width: HORIZ_WIDTH }, fixedHeight && { height: ITEM_HEIGHT },]}>
                    {
                        !item.noImage && <Image style={styles.thumb} source={imgSource} />
                    }
                    <Text style={styles.text}
                        numberOfLines={horizontal || fixedHeight ? 3 : undefined}>
                        {item.title} - {item.text}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}
/**
 * 为单独的SectionList中的Section做渲染处理
 *
 * @param {{item: Item}} {item} 当个item数据
 */
export const renderStackedItem = ({ item }: { item: Item }) => {
    const itemHash = Math.abs(hashCode(item.title))
    const imgSource = THUMB_URLS[itemHash % THUMB_URLS.length]
    return (
        <View style={styles.stacked}>
            <Text style={styles.stackedText}>
                {item.title} - {item.text}
            </Text>
            <Image style={styles.thumb} source={imgSource} />
        </View>
    )
}

/**
 * 自定义分割线
 *
 * @param {string} text 显示文字
 * @param {boolean} highlighted 是否高亮
 */
export class CustomSeparatorComponent extends PureComponent<{
    text: string,
    highlighted?: boolean,
}> {
    render() {
        return (
            <View style={[styles.customSeparator, this.props.highlighted && { backgroundColor: 'rgb(217, 217, 217)' }]}>
                <Text style={styles.separatorText}>{this.props.text}</Text>
            </View>
        )
    }
}

const HEADER = { width: 100, height: 60, }
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;

const styles = StyleSheet.create({
    searchTextInput: {
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderRadius: 3,
        borderWidth: 1,
        paddingLeft: 8,
        paddingVertical: 0,
        height: 26,
        fontSize: 14,
        flexGrow: 1,
    },
    option: {
        flexDirection: 'row',
        padding: 8,
        paddingRight: 0,
    },
    smallSwitch: Platform.select({
        android: {
            top: 1,
            margin: -6,
            transform: [{ scale: 0.7 }],
        },
        ios: {
            top: 4,
            margin: -10,
            transform: [{ scale: 0.5 }],
        },
    }),
    separator: {
        height: SEPARATOR_HEIGHT,
        backgroundColor: 'rgb(200, 199, 204)',
    },
    itemSeparator: {
        height: SEPARATOR_HEIGHT,
        backgroundColor: 'rgb(200, 199, 204)',
        marginLeft: 60,
    },
    headerFooter: {
        ...HEADER,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerFooterContainer: {
        backgroundColor: 'rgb(239, 239, 244)',
    },
    listEmpty: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    horizItem: {
        alignSelf: 'flex-start',
    },
    item: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
    },
    thumb: {
        width: 50,
        height: 50,
        left: -5,
    },
    text: {
        flex: 1,
        overflow: 'hidden',
    },
    spindicator: {
        marginLeft: 'auto',
        marginTop: 8,
        width: 2,
        height: 16,
        backgroundColor: 'darkgray',
    },
    stacked: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
    stackedText: {
        padding: 4,
        fontSize: 18,
    },
    customSeparator: {
        height: 10,
        backgroundColor: 'rgb(200, 199, 204)',
    },
    separatorText: {
        color: 'gray',
        alignSelf: 'center',
        fontSize: 7,
    },
})