/*
 * @Author: shenzhiwei
 * @Date: 2018-07-05 10:49:18
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-05 11:16:52
 * @Description: EventTextInput
 */
import React, { Component, PureComponent, } from 'react'
import {
    View,
    TextInput,
    Text,
} from 'react-native'
import styles from './styles';

// 定义props类型
interface propsTypes {

}

// 定义state类型
interface stateTypes {
    curText: string,
    prevText: string,
    prev2Text: string,
    prev3Text: string,
}

export default class EventTextInput extends PureComponent<propsTypes, stateTypes> {

    // 初始化props
    static defaultProps = {

    }

    // 声明状态变量
    public state: stateTypes

    constructor(props: propsTypes) {
        super(props);

        // 初始化状态变量
        this.state = {
            curText: '<No Event>',
            prevText: '<No Event>',
            prev2Text: '<No Event>',
            prev3Text: '<No Event>',
        }
    }

    private updateText = (text: string) => {
        this.setState(state => {
            return {
                curText: text,
                prevText: state.curText,
                prev2Text: state.prevText,
                prev3Text: state.prev2Text,
            }
        })
    }

    render() {
        return (
            <View>
                <TextInput
                    autoCapitalize="none"
                    placeholder="Enter text to see events"
                    autoCorrect={false}
                    onFocus={() => this.updateText('onFocus')}
                    onBlur={() => this.updateText('onBlur')}
                    onChange={event =>
                        this.updateText('onChange text: ' + event.nativeEvent.text)
                    }
                    onChangeText={text =>
                        this.updateText('onChangeText text: ' + text)
                    }
                    onEndEditing={event =>
                        this.updateText('onEndEditing text: ' + event.nativeEvent.text)
                    }
                    onSubmitEditing={event =>
                        this.updateText('onSubmitEditing text: ' + event.nativeEvent.text)
                    }
                    onSelectionChange={event =>
                        this.updateText(
                            'onSelectionChange range: ' +
                            event.nativeEvent.selection.start +
                            ',' +
                            event.nativeEvent.selection.end,
                        )
                    }
                    onKeyPress={event => {
                        this.updateText('onKeyPress key: ' + event.nativeEvent.key);
                    }}
                    style={styles.default}
                />
                <Text style={styles.eventLabel}>
                    {this.state.curText}
                    {'\n'}
                    (prev: {this.state.prevText}){'\n'}
                    (prev2: {this.state.prev2Text}){'\n'}
                    (prev3: {this.state.prev3Text})
                </Text>
            </View>
        )
    }
}