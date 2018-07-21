/*
 * @Author: shenzhiwei
 * @Date: 2018-07-04 14:48:59
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-05 13:18:45
 * @Description: TextInput
 */
import React, { Component, PureComponent, } from 'react'
import {
    StyleSheet,
    TextInput,
    View,
    Text,
} from 'react-native'
import BaseViewComponent from '../base/baseViewComponent';
import RewriteTextInput from './rewriteTextInput';
import EventTextInput from './eventTextInput';
import styles from './styles';

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {

}

export default class TextInputComponent extends BaseViewComponent<propsTypes, stateTypes> {

    // 初始化props
    static defaultProps = {}

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量
        this.state = {

        }
    }

    render() {
        return this.renderContainer([
            // {
            //     title: '自动聚焦(autoFocus)',
            //     render: () => (
            //         <TextInput
            //             autoFocus={true}
            //             style={styles.default}
            //         />
            //     )
            // },
            {
                title: '最大20个字符，空格自动替换为_',
                render: () => (<RewriteTextInput />)
            },
            {
                title: '自动将特定字符切换为大写(autoCapitalize)',
                render: () => (
                    <View>
                        <WithLabel label="none">
                            <TextInput autoCapitalize="none" style={styles.default} />
                        </WithLabel>
                        <WithLabel label="sentences">
                            <TextInput autoCapitalize="sentences" style={styles.default} />
                        </WithLabel>
                        <WithLabel label="words">
                            <TextInput autoCapitalize="words" style={styles.default} />
                        </WithLabel>
                        <WithLabel label="characters">
                            <TextInput autoCapitalize="characters" style={styles.default} />
                        </WithLabel>
                    </View>
                )
            },
            {
                title: '是否开启拼写自动修正(autoCorrect)',
                render: () => (
                    <View>
                        <WithLabel label="开启">
                            <TextInput autoCorrect={true} style={styles.default} />
                        </WithLabel>
                        <WithLabel label="关闭">
                            <TextInput autoCorrect={false} style={styles.default} />
                        </WithLabel>
                    </View>
                )
            },
            {
                title: '键盘类型(keyboardType)',
                render: () => {
                    let keyboardTypes: Array<any> = [
                        'default',
                        'ascii-capable',
                        'numbers-and-punctuation',
                        'url',
                        'number-pad',
                        'phone-pad',
                        'name-phone-pad',
                        'email-address',
                        'decimal-pad',
                        'twitter',
                        'web-search',
                        'numeric',
                    ]
                    const examples = keyboardTypes.map(type => {
                        return (
                            <WithLabel key={type} label={type}>
                                <TextInput keyboardType={type} style={styles.default} />
                            </WithLabel>
                        );
                    });
                    return <View>{examples}</View>
                }
            },
            {
                title: '确认按钮显示内容(returnKeyType)',
                render: () => {
                    let returnKeyTypes: Array<any> = [
                        'default',
                        'go',
                        'google',
                        'join',
                        'next',
                        'route',
                        'search',
                        'send',
                        'yahoo',
                        'done',
                        'emergency-call',
                    ]
                    const examples = returnKeyTypes.map(type => {
                        return (
                            <WithLabel key={type} label={type}>
                                <TextInput returnKeyType={type} style={styles.default} />
                            </WithLabel>
                        );
                    });
                    return <View>{examples}</View>
                }
            },
            {
                title: '密码安全模式(secureTextEntry)',
                render: () => (
                    <View>
                        <WithLabel label="true">
                            <TextInput
                                secureTextEntry={true}
                                style={styles.default}
                                defaultValue="abc"
                            />
                        </WithLabel>
                    </View>
                )
            },
            {
                title: '事件处理',
                render: () => (
                    <EventTextInput />
                )
            },
            {
                title: '默认占位文字',
                render: () => (
                    <View>
                        <TextInput
                            style={[styles.default, { color: 'blue' }]}
                            defaultValue="Blue"
                        />
                        <TextInput
                            style={[styles.default, { color: 'green' }]}
                            defaultValue="Green"
                        />
                    </View>
                )
            },
            {
                title: '高亮颜色（在iOS上还包括光标）',
                render: () => (
                    <View>
                        <TextInput
                            style={styles.default}
                            selectionColor={'green'}
                            defaultValue="Highlight me"
                        />
                        <TextInput
                            style={styles.default}
                            selectionColor={'rgba(86, 76, 205, 1)'}
                            defaultValue="Highlight me"
                        />
                    </View>
                )
            },
            {
                title: '失去焦点是否立即提交',
                render: () => (
                    <View>
                        <TextInput
                            style={styles.multiline}
                            placeholder="blurOnSubmit = true"
                            returnKeyType="next"
                            blurOnSubmit={true}
                            multiline={true}
                            onSubmitEditing={event => alert(event.nativeEvent.text)}
                        />
                    </View>
                )
            },
            {
                title: '多行文本框',
                render: () => (
                    <View>
                        <TextInput
                            placeholder="multiline text input"
                            multiline={true}
                            style={styles.multiline}
                        />
                        <TextInput
                            placeholder="multiline text input with font styles and placeholder"
                            multiline={true}
                            clearTextOnFocus={true}
                            autoCorrect={true}
                            autoCapitalize="words"
                            placeholderTextColor="red"
                            keyboardType="url"
                            style={[styles.multiline, styles.multilineWithFontStyles]}
                        />
                        <TextInput
                            placeholder="multiline text input with max length"
                            maxLength={5}
                            multiline={true}
                            style={styles.multiline}
                        />
                        <TextInput
                            placeholder="uneditable multiline text input"
                            editable={false}
                            multiline={true}
                            style={styles.multiline}
                        />
                        <TextInput
                            defaultValue="uneditable multiline text input with phone number detection: 88888888."
                            editable={false}
                            multiline={true}
                            style={styles.multiline}
                            dataDetectorTypes="phoneNumber"
                        />
                    </View>
                )
            },
            {
                title: '固定尺寸',
                render: () => (
                    <View>
                        <View style={{ height: 80 }}>
                            <TextInput
                                style={{
                                    position: 'absolute',
                                    fontSize: 16,
                                    backgroundColor: '#eeeeee',
                                    borderColor: '#666666',
                                    borderWidth: 5,
                                    borderTopWidth: 20,
                                    borderRadius: 10,
                                    borderBottomRightRadius: 20,
                                    padding: 10,
                                    paddingTop: 20,
                                }}
                                testID="singleline_textinput"
                                placeholder="Placeholder defines intrinsic size"
                            />
                        </View>
                        <View style={{ height: 130 }}>
                            <TextInput
                                style={{
                                    position: 'absolute',
                                    fontSize: 16,
                                    backgroundColor: '#eeeeee',
                                    borderColor: '#666666',
                                    borderWidth: 5,
                                    borderTopWidth: 20,
                                    borderRadius: 10,
                                    borderBottomRightRadius: 20,
                                    padding: 10,
                                    paddingTop: 20,
                                    maxHeight: 100,
                                }}
                                testID="multiline_textinput"
                                multiline={true}
                                placeholder="Placeholder defines intrinsic size"
                            />
                        </View>
                        <View>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    backgroundColor: '#eeeeee',
                                    borderColor: '#666666',
                                    borderWidth: 5,
                                    borderTopWidth: 20,
                                    borderRadius: 10,
                                    borderBottomRightRadius: 20,
                                    padding: 10,
                                    paddingTop: 20,
                                }}
                                testID="multiline_textinput_with_flex"
                                multiline={true}
                                placeholder="Placeholder defines intrinsic size"
                            />
                        </View>
                    </View>
                )
            },
            {
                title: '高度自动收缩且最大高度为100',
                render: () => (
                    <View>
                        <TextInput
                            placeholder="height increases with content"
                            defaultValue="enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about - learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native."
                            multiline={true}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType="go"
                            style={[styles.multiline, styles.multilineExpandable]}
                        />
                    </View>
                )
            },
        ])
    }
}

interface WithLabelPropType {
    label: string,
}
class WithLabel extends PureComponent<WithLabelPropType> {
    render() {
        return (
            <View style={styles.labelContainer}>
                <View style={styles.label}>
                    <Text>{this.props.label}</Text>
                </View>
                {this.props.children}
            </View>
        )
    }
}