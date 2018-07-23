/*
 * @Author: shenzhiwei
 * @Date: 2018-07-23 11:16:57
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-23 12:09:32
 * @Description: example.route.rule
 */
import { AppRegistry } from 'react-native'
import BaseWebNavigator from "../navigator"

// Home
import Home from '../../../src/example/components/home'
// View
import View from '../../../src/example/components/view'
// ScrollView
import ScrollView from '../../../src/example/components/scrollView'
// ListView
import ListView from '../../../src/example/components/listView'
// ListViewGridLayout
import ListViewGridLayout from '../../../src/example/components/listViewGridLayout'
// ListViewPaging
import ListViewPaging from '../../../src/example/components/listViewPaging'
// FlatList
import FlatList from '../../../src/example/components/flatList'
// SectionList
import SectionList from '../../../src/example/components/sectionlist'
// Text
import Text from '../../../src/example/components/text'
// TextInput
import TextInput from '../../../src/example/components/textinput'
// Button
import Button from '../../../src/example/components/button'
// Picker
import Picker from '../../../src/example/components/picker'
// Radio
import Radio from '../../../src/example/components/radio'
// Modal
import Modal from '../../../src/example/components/modal'
// AnimatedModal
import AnimatedModal from '../../../src/example/components/animatedModal'

export interface AppProps {
}

class ExampleApp extends BaseWebNavigator<AppProps, any> {
    
    /**
     * 路由规则定义
     */
    get routes() {
        return {
            HomeScreen: {
                screen: Home,
                path: '/routes',
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
    }

}

AppRegistry.registerComponent('fastman2', () => ExampleApp)
AppRegistry.runApplication('fastman2', {
    initialProps: {},
    rootTag: document.getElementById('page-group') 
})