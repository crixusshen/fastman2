/*
 * @Author: shenzhiwei
 * @Date: 2018-07-04 15:23:53
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-04 17:39:12
 * @Description: RewriteTextInput
 */
import React, { PureComponent } from 'react';
import {
    View,
    TextInput,
    Text,
} from 'react-native'
import styles from './styles';

interface PropType {

}

interface StateType {
    text: string,
}

export default class RewriteTextInput extends PureComponent<PropType, StateType> {
    constructor(props: PropType) {
        super(props);

        this.state = {
            text: '',
        }
    }

    render() {
        // 最多可输入的限制数量
        let limit = 20
        let remainder = limit - this.state.text.length
        let remainderColor = remainder > 5 ? 'blue' : 'red'
        return (
            <View style={styles.rewriteContainer}>
                <TextInput
                    style={styles.default}
                    multiline={false}
                    maxLength={limit}
                    onChangeText={text => {
                        // 空格替换为符号_
                        text = text.replace(/\s/g, '_')
                        this.setState({text,})
                    }}
                    value={this.state.text}
                />
                <Text style={[styles.remainder, {color: remainderColor,}]}>
                    {remainder}
                </Text>
            </View>
        )
    }
};