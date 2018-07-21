/*
 * @Author: shenzhiwei
 * @Date: 2018-07-11 08:19:18
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-13 16:26:31
 * @Description: 路由配置表
 */
import Router, { RouteRuleType, StackNavigatorConfig, } from '../../../shared/components/navigator/appsNavigator'
import React, { Component } from 'react'
import {
    Image as RNImage,
    Button as RNButton,
    Platform,
} from 'react-native'

/**
 * 导航栏统一后退按钮
 */
class SysBackComponent extends Component {
    render() {
        return (
            <RNImage source={require('../images/back.png')} style={{ width: 30, height: 30, marginLeft: 9, }} />
        )
    }
}

// Home
import Home from '../home'
// View
import View from '../view'
// ScrollView
import ScrollView from '../scrollView'
// ListView
import ListView from '../listView'
// ListViewGridLayout
import ListViewGridLayout from '../listViewGridLayout'
// ListViewPaging
import ListViewPaging from '../listViewPaging'
// FlatList
import FlatList from '../flatList'
// SectionList
import SectionList from '../sectionlist'
// Text
import Text from '../text'
// TextInput
import TextInput from '../textinput'
// Button
import Button from '../button'
// Picker
import Picker from '../picker'
// Radio
import Radio from '../radio'
// Modal
import Modal from '../modal'
// AnimatedModal
import AnimatedModal from '../animatedModal'

/**
 * 配置路由规则（建议路由名称采用首字母大写规范+'Screen'）
 */
const routes: RouteRuleType = {
    HomeScreen: {
        screen: Home,
        path: '/demo',
        navigationOptions: () => ({
            headerTitle: 'Hello Fastman2',
        }),
    },
    ViewScreen: {
        screen: View,
        path: '/view',
        navigationOptions: () => ({
            headerTitle: 'View',
        }),
    },
    ScrollViewScreen: {
        screen: ScrollView,
        path: '/scrollview',
        navigationOptions: () => ({
            headerTitle: 'ScrollView',
        }),
    },
    ListViewScreen: {
        screen: ListView,
        path: '/listview',
        navigationOptions: () => ({
            headerTitle: 'ListView',
        }),
    },
    ListViewGridLayoutScreen: {
        screen: ListViewGridLayout,
        path: '/listviewgridlayout',
        navigationOptions: () => ({
            headerTitle: 'ListViewGridLayout',
        }),
    },
    ListViewPagingScreen: {
        screen: ListViewPaging,
        path: '/listviewpaging',
        navigationOptions: () => ({
            headerTitle: 'ListViewPaging',
        }),
    },
    FlatListScreen: {
        screen: FlatList,
        path: '/flatlist',
        navigationOptions: () => ({
            headerTitle: 'FlatList',
        }),
    },
    SectionListScreen: {
        screen: SectionList,
        path: '/sectionlist',
        navigationOptions: () => ({
            headerTitle: 'SectionList',
        }),
    },
    TextScreen: {
        screen: Text,
        path: '/text',
        navigationOptions: () => ({
            headerTitle: 'Text',
        }),
    },
    TextInputScreen: {
        screen: TextInput,
        path: '/textinput',
        navigationOptions: () => ({
            headerTitle: 'TextInput',
        }),
    },
    ButtonScreen: {
        screen: Button,
        path: '/button',
        navigationOptions: () => ({
            headerTitle: 'Button',
        }),
    },
    PickerScreen: {
        screen: Picker,
        path: '/picker',
        navigationOptions: () => ({
            headerTitle: 'Picker',
        }),
    },
    RadioScreen: {
        screen: Radio,
        path: '/radio',
        navigationOptions: () => ({
            headerTitle: 'Radio',
        }),
    },
    ModalScreen: {
        screen: Modal,
        path: '/modal',
        navigationOptions: () => ({
            headerTitle: 'Modal',
        }),
    },
    AnimatedModalScreen: {
        screen: AnimatedModal,
        path: '/animatedmodal',
        navigationOptions: () => ({
            headerTitle: 'AnimatedModal',
        }),
    },
}

// 导航配置
export const navigatorConfig: StackNavigatorConfig = {
    initialRouteName: 'HomeScreen',
    navigationOptions: {
        headerBackTitle: null,
        headerTruncatedBackTitle: null,
        headerStyle: {
            backgroundColor: '#DF3A32',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor: '#FFFFFF',
        headerRight: (
            <RNButton title="Info" onPress={() => alert('Hello Fastman2')} color="#FFF" />
        ),
        headerBackImage: <SysBackComponent />,
        gesturesEnabled: true,
    },
}

export default routes