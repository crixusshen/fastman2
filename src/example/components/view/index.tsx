/*
 * @Author: shenzhiwei
 * @Date: 2018-07-04 11:41:27
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-11 13:25:52
 * @Description: View
 */
import React, { Component } from 'react'
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
} from 'react-native';

// 屏幕长宽
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
// iPhoneX 
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 判断iphoneX
 */
function isIphoneX() {
    return Platform.OS === 'ios' &&
        (
            (screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT)
        )
}

const containerTop = Platform.select({
    ios: isIphoneX() ? 44 : 20,
    android: 0,
    web: 0,
})
const containerBottom = Platform.select({
    ios: isIphoneX() ? 34 : 0,
    android: 0,
    web: 0,
})

export default class ViewComponent extends Component<{
    navigation?: any
}, {}> {
    render() {
        // 获取路由参数
        const { name } = this.props.navigation.state.params
        console.log(`previous router's params: ${name}`)

        return (<ScrollView style={!this.props.navigation ? styles.container : {}}>
            <View style={styles.section}>
                <View style={styles.title}>
                    <Text>Background Color</Text>
                </View>
                <View style={styles.editArea}>
                    <View style={styles.backgroundColorTest}>
                        <Text>Blue backgound</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.title}>
                    <Text>Border</Text>
                </View>
                <View style={styles.editArea}>
                    <View style={styles.borderTest}>
                        <Text>5px blue border</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.title}>
                    <Text>Padding/Margin</Text>
                </View>
                <View style={styles.editArea}>
                    <View style={styles.paddingTest}>
                        <Text style={{ backgroundColor: 'white', }}>5px padding</Text>
                    </View>
                    <View style={styles.marginTest}>
                        <Text>10px margin</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.title}>
                    <Text>Border Radius</Text>
                </View>
                <View style={styles.editArea}>
                    <View style={styles.borderRadiusTest}>
                        <Text>1px blue border radius</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.title}>
                    <Text>Flex</Text>
                </View>
                <View style={styles.editArea}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.flexTest}>
                            <Text>1/4</Text>
                        </View>
                        <View style={styles.flexTest}>
                            <Text>1/4</Text>
                        </View>
                        <View style={styles.flexTest}>
                            <Text>1/4</Text>
                        </View>
                        <View style={styles.flexTest}>
                            <Text>1/4</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: containerTop,
        paddingBottom: containerBottom,
        backgroundColor: 'rgb(233, 234, 237)',
    },
    section: {
        height: 100,
        margin: 20,
        backgroundColor: 'blue',
    },
    title: {
        // 也遵循了border-box的特性
        height: 30,
        backgroundColor: 'rgb(246, 247, 248)',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(233, 233, 244)',
    },
    editArea: {
        height: 70,
        padding: 10,
        backgroundColor: 'white',
    },
    backgroundColorTest: {
        backgroundColor: 'blue',
        height: 50,
    },
    borderTest: {
        borderWidth: 5,
        borderColor: 'blue',
    },
    paddingTest: {
        padding: 5,
        backgroundColor: 'red',
    },
    marginTest: {
        margin: 10,
        backgroundColor: 'red',
    },
    borderRadiusTest: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'blue',
    },
    flexTest: {
        flex: 1,
        height: 30,
        backgroundColor: 'red',
        margin: 10,
    },
})