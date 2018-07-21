/*
 * @Author: shenzhiwei
 * @Date: 2018-06-26 09:47:15
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-04 12:29:28
 * @Description: Text
 */
import React, { PureComponent, } from 'react'
import {
    View,
    Text,
    Image,
    StyleProp,
    TextStyle,
    LayoutAnimation,
} from 'react-native'
import BaseViewComponent from '../base/baseViewComponent';

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {

}

export default class TextComponent extends BaseViewComponent<propsTypes, stateTypes> {

    // 初始化props
    static defaultProps = {
        // TODO ...
    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量
        this.state = {}
    }

    render() {
        return this.renderContainer([
            {
                title: "自动换行",
                render: () => (
                    <Text onPress={(e) => {
                        console.log(e)
                    }}>The text should wrap if it goes on multiple lines. See, this is going
                        to the next line.</Text>
                ),
            },
            {
                title: "字体填充",
                render: () => (
                    <Text style={{ padding: 15, }}>This text is indented by 15px padding on all sides.</Text>
                ),
            },
            {
                title: "字体",
                render: () => (
                    <View>
                        <Text style={{ fontFamily: 'Cochin' }}>Cochin</Text>
                        <Text style={{ fontFamily: 'Cochin', fontWeight: 'bold', }}>Cochin bold</Text>
                        <Text style={{ fontFamily: 'Helvetica', }}>Helvetica</Text>
                        <Text style={{ fontFamily: 'Helvetica', fontWeight: 'bold', }}>Helvetica bold</Text>
                        <Text style={{ fontFamily: 'Verdana', }}>Verdana</Text>
                        <Text style={{ fontFamily: 'Verdana', fontWeight: 'bold', }}>Verdana bold</Text>
                    </View>
                ),
            },
            {
                title: "字体大小",
                render: () => (
                    <View>
                        <Text style={{ fontSize: 23, }}>Size 23</Text>
                        <Text style={{ fontSize: 8, }}>Size 8</Text>
                    </View>
                ),
            },
            {
                title: "字体颜色",
                render: () => (
                    <View>
                        <Text style={{ color: 'red', }}>Red color</Text>
                        <Text style={{ color: 'blue', }}>Blue color</Text>
                    </View>
                ),
            },
            {
                title: "字体粗细",
                render: () => (
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '100', }}>
                            Move fast and be ultralight
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: '200', }}>
                            Move fast and be light
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'normal', }}>
                            Move fast and be normal
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                            Move fast and be bold
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: '900', }}>
                            Move fast and be ultrabold
                        </Text>
                    </View>
                ),
            },
            {
                title: "字体风格",
                render: () => (
                    <View>
                        <Text style={{ fontStyle: 'normal', }}>Normal text</Text>
                        <Text style={{ fontStyle: 'italic', }}>Italic text</Text>
                    </View>
                ),
            },
            {
                title: "是否允许长按复制粘贴",
                render: () => (
                    <View>
                        <Text selectable={true}>
                            This text is <Text style={{ fontWeight: 'bold', }}>selectable</Text> if
                            you click-and-hold.
                        </Text>
                    </View>
                ),
            },
            {
                title: "字体修饰",
                render: () => (
                    <View>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                textDecorationStyle: 'solid',
                            }}>
                            Solid underline
                            </Text>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                textDecorationStyle: 'double',
                                textDecorationColor: '#ff0000',
                            }}>
                            Double underline with custom color
                            </Text>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                textDecorationStyle: 'dashed',
                                textDecorationColor: '#9CDC40',
                            }}>
                            Dashed underline with custom color
                            </Text>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                textDecorationStyle: 'dotted',
                                textDecorationColor: 'blue',
                            }}>
                            Dotted underline with custom color
                            </Text>
                        <Text style={{ textDecorationLine: 'none', }}>None textDecoration</Text>
                        <Text
                            style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                            }}>
                            Solid line-through
                            </Text>
                        <Text
                            style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'double',
                                textDecorationColor: '#ff0000',
                            }}>
                            Double line-through with custom color
                            </Text>
                        <Text
                            style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'dashed',
                                textDecorationColor: '#9CDC40',
                            }}>
                            Dashed line-through with custom color
                            </Text>
                        <Text
                            style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'dotted',
                                textDecorationColor: 'blue',
                            }}>
                            Dotted line-through with custom color
                            </Text>
                        <Text style={{ textDecorationLine: 'underline line-through', }}>
                            Both underline and line-through
                        </Text>
                    </View>
                ),
            },
            {
                title: "字体嵌套",
                render: () => (
                    <View>
                        <Text>
                            (Normal text,
                                <Text style={{ fontWeight: 'bold', }}>
                                (and bold
                                <Text style={{ fontSize: 11, color: '#527fe4', }}>
                                    (and tiny inherited bold blue)
                                </Text>
                                )
                                </Text>
                            )
                            </Text>
                        <Text style={{ opacity: 0.7, }}>
                            (opacity
                                <Text>
                                (is inherited
                                    <Text style={{ opacity: 0.7, }}>
                                    (and accumulated
                                        <Text style={{ backgroundColor: '#ffaaaa', }}>
                                        (and also applies to the background)
                                        </Text>
                                    )
                                    </Text>
                                )
                                </Text>
                            )
                            </Text>
                    </View>
                ),
            },
            {
                title: "字体对齐",
                render: () => (
                    <View>
                        <Text>auto (default) - english LTR</Text>
                        <Text>
                            {'\u0623\u062D\u0628 \u0627\u0644\u0644\u063A\u0629 ' +
                                '\u0627\u0644\u0639\u0631\u0628\u064A\u0629 auto (default) - arabic ' +
                                'RTL'}
                        </Text>
                        <Text style={{ textAlign: 'left', }}>
                            left left left left left left left left left left left left left
                            left left
                            </Text>
                        <Text style={{ textAlign: 'center', }}>
                            center center center center center center center center center
                            center center
                            </Text>
                        <Text style={{ textAlign: 'right', }}>
                            right right right right right right right right right right right
                            right right
                            </Text>
                        <Text style={{ textAlign: 'justify', }}>
                            justify: this text component{"'"}s contents are laid out with
                            "textAlign: justify" and as you can see all of the lines except the
                            last one span the available width of the parent container.
                        </Text>
                    </View>
                ),
            },
            {
                title: "字体间隔",
                render: () => (
                    <View>
                        <Text style={{ letterSpacing: 0 }}>letterSpacing = 0</Text>
                        <Text style={{ letterSpacing: 2, marginTop: 5 }}>
                            letterSpacing = 2
                            </Text>
                        <Text style={{ letterSpacing: 9, marginTop: 5 }}>
                            letterSpacing = 9
                            </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    letterSpacing: 2,
                                    backgroundColor: 'fuchsia',
                                    marginTop: 5,
                                }}>
                                With size and background color
                                </Text>
                        </View>
                        <Text style={{ letterSpacing: -1, marginTop: 5 }}>
                            letterSpacing = -1
                            </Text>
                        <Text
                            style={{
                                letterSpacing: 3,
                                backgroundColor: '#dddddd',
                                marginTop: 5,
                            }}>
                            [letterSpacing = 3]
                                <Text style={{ letterSpacing: 0, backgroundColor: '#bbbbbb' }}>
                                [Nested letterSpacing = 0]
                                </Text>
                            <Text style={{ letterSpacing: 6, backgroundColor: '#eeeeee' }}>
                                [Nested letterSpacing = 6]
                            </Text>
                        </Text>
                    </View>
                ),
            },
            {
                title: "空格",
                render: () => (
                    <Text>
                        A {'generated'} {'string'} and some &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; spaces
                    </Text>
                ),
            },
            {
                title: "行高",
                render: () => (
                    <Text>
                        <Text style={{ lineHeight: 45, }}>
                            A lot of space between the lines of this long passage that should
                            wrap once.
                        </Text>
                    </Text>
                ),
            },
            {
                title: "切换属性",
                render: () => (<AttributeToggler />),
            },
            {
                title: "字体背景色",
                render: () => (
                    <Text style={{ backgroundColor: 'yellow', }}>
                        Yellow container background,
                        <Text style={{ backgroundColor: '#ffaaaa', }}>
                            {' '}
                            red background,
                            <Text style={{ backgroundColor: '#aaaaff', }}>
                                {' '}
                                blue background,
                            <Text>
                                    {' '}
                                    inherited blue background,
                                <Text style={{ backgroundColor: '#aaffaa', }}>
                                        {' '}
                                        nested green background.
                                </Text>
                                </Text>
                            </Text>
                        </Text>
                    </Text>
                ),
            },
            {
                title: "numberOfLines属性",
                render: () => (
                    <View>
                        <Text numberOfLines={1}>
                            Maximum of one line, no matter how much I write here. If I keep
                            writing, it{"'"}ll just truncate after one line.
                        </Text>
                        <Text numberOfLines={2} style={{ marginTop: 20, }}>
                            Maximum of two lines, no matter how much I write here. If I keep
                            writing, it{"'"}ll just truncate after two lines.
                        </Text>
                        <Text style={{ marginTop: 20, }}>
                            No maximum lines specified, no matter how much I write here. If I
                            keep writing, it{"'"}ll just keep going and going.
                        </Text>
                    </View>
                ),
            },
            {
                title: "根据系统设置的“字体大小”缩放",
                render: () => (
                    <View>
                        <Text>
                            By default, text will respect Text Size accessibility setting on
                            iOS. It means that all font sizes will be increased or descreased
                            depending on the value of Text Size setting in{' '}
                            <Text style={{ fontWeight: 'bold', }}>
                                Settings.app - Display & Brightness - Text Size
                            </Text>
                        </Text>
                        <Text style={{ marginTop: 10, }}>
                            You can disable scaling for your Text component by passing {'"'}allowFontScaling={
                                '{'
                            }false{'}"'} prop.
                        </Text>
                        <Text allowFontScaling={false} style={{ marginTop: 20, }}>
                            This text will not scale.
                        </Text>
                    </View>
                ),
            },
            {
                title: "在<Text />内的内容",
                render: () => (
                    <View>
                        <Text>
                            This text contains an inline blue view{' '}
                            <View
                                style={{ width: 25, height: 25, backgroundColor: 'steelblue', }}
                            />{' '}
                            and an inline image{' '}
                            <Image source={require('../images/small.png')} style={{ width: 34, height: 22, resizeMode: 'cover' }} />. Neat, huh?
                        </Text>
                    </View>
                ),
            },
            {
                title: "文字阴影",
                render: () => (
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                textShadowOffset: { width: 2, height: 2 },
                                textShadowRadius: 1,
                                textShadowColor: '#00cccc',
                            }}>
                            Demo text shadow
                        </Text>
                    </View>
                ),
            },
            {
                title: "文字省略",
                render: () => (
                    <View>
                        <Text numberOfLines={1}>
                            This very long text should be truncated with dots in the end.
                        </Text>
                        <Text ellipsizeMode="middle" numberOfLines={1}>
                            This very long text should be truncated with dots in the middle.
                        </Text>
                        <Text ellipsizeMode="head" numberOfLines={1}>
                            This very long text should be truncated with dots in the beginning.
                        </Text>
                        <Text ellipsizeMode="clip" numberOfLines={1}>
                            This very looooooooooooooooooooooooooooong text should be clipped.
                        </Text>
                    </View>
                ),
            },
            {
                title: "文字大小动态调整",
                render: () => (<AdjustingFontSize />),
            },
        ])
    }
}

interface AttributeTogglerProps { }

class AttributeToggler extends PureComponent<AttributeTogglerProps, { fontWeight: string, fontSize: number, }> {
    constructor(props: AttributeTogglerProps) {
        super(props);

        this.state = { fontWeight: 'bold', fontSize: 16, }
    }

    toggleWeight = () => {
        this.setState({
            fontWeight: this.state.fontWeight === 'bold' ? 'normal' : 'bold',
        })
    }

    increaseSize = () => {
        this.setState({
            fontSize: this.state.fontSize + 1,
        })
    }

    render() {
        let curStyle = { fontWeight: this.state.fontWeight, fontSize: this.state.fontSize, }
        return (
            <View>
                <Text style={curStyle as StyleProp<TextStyle>}>
                    Tap the controls below to change attributes.
                </Text>
                <Text>
                    <Text>
                        See how it will even work on{' '}
                        <Text style={curStyle as StyleProp<TextStyle>}>this nested text</Text>
                    </Text>
                </Text>
                <Text
                    style={{ backgroundColor: '#ffaaaa', marginTop: 5, }}
                    onPress={this.toggleWeight}>
                    Toggle Weight (click me)
                </Text>
                <Text
                    style={{ backgroundColor: '#aaaaff', marginTop: 5, }}
                    onPress={this.increaseSize}>
                    Increase Size (click me)
                </Text>
            </View>

        )
    }
}

interface AdjustingFontSizeProps { }

export class AdjustingFontSize extends PureComponent<AdjustingFontSizeProps, { dynamicText: string, shouldRender: boolean, }> {
    constructor(props: AdjustingFontSizeProps) {
        super(props);

        this.state = { dynamicText: '', shouldRender: true, }
    }

    reset = () => {
        LayoutAnimation.easeInEaseOut()
        this.setState({
            shouldRender: false,
        })
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut()
            this.setState({
                dynamicText: '',
                shouldRender: true,
            })
        }, 300)
    }

    addText = () => {
        this.setState({
            dynamicText: this.state.dynamicText + (Math.floor((Math.random() * 10) % 2) ? ' foo' : ' bar'),
        })
    }

    removeText = () => {
        this.setState({
            dynamicText: this.state.dynamicText.slice(
                0,
                this.state.dynamicText.length - 4,
            ),
        })
    }

    render() {
        if (!this.state.shouldRender) {
            return <View />
        }
        return (
            <View>
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{ fontSize: 36, marginVertical: 6, }}>
                    Truncated text is baaaaad.
                </Text>
                <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    style={{ fontSize: 40, marginVertical: 6, }}>
                    Shrinking to fit available space is much better!
                </Text>
                <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{ fontSize: 30, marginVertical: 6, }}>
                    {'Add text to me to watch me shrink!' + ' ' + this.state.dynamicText}
                </Text>
                <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={4}
                    style={{ fontSize: 20, marginVertical: 6, }}>
                    {'Multiline text component shrinking is supported, watch as this reeeeaaaally loooooong teeeeeeext grooooows and then shriiiinks as you add text to me! ioahsdia soady auydoa aoisyd aosdy ' +
                        ' ' +
                        this.state.dynamicText}
                </Text>
                <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{ marginVertical: 6, }}>
                    <Text style={{ fontSize: 14, }}>
                        {'Differently sized nested elements will shrink together. '}
                    </Text>
                    <Text style={{ fontSize: 20, }}>
                        {'LARGE TEXT! ' + this.state.dynamicText}
                    </Text>
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 5,
                        marginVertical: 6,
                    }}>
                    <Text style={{ backgroundColor: '#ffaaaa', }} onPress={this.reset}>
                        Reset
                    </Text>
                    <Text style={{ backgroundColor: '#aaaaff', }} onPress={this.removeText}>
                        Remove Text
                    </Text>
                    <Text style={{ backgroundColor: '#aaffaa', }} onPress={this.addText}>
                        Add Text
                    </Text>
                </View>
            </View>
        )
    }
};
