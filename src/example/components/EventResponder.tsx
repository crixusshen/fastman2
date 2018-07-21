import React, { Component } from 'react'
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    View,
    Button
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

export default class ViewComponent extends Component<{}, {}> {
    render() {
        return (<View
            // containerTop变量根据iphoneX做的适配，这里可不用理解
            style={{ flexDirection: 'column', paddingTop: containerTop, backgroundColor: 'yellow', height: 200, padding: 20, }}
            removeClippedSubviews = {false}
            onStartShouldSetResponderCapture = { gee => { console.log('parent-onStartShouldSetResponderCapture'); return false; } } 
            onStartShouldSetResponder={ gee => { console.log('parent-onStartShouldSetResponder'); return true; } } 
            onResponderGrant = { gee => console.log('parent-onResponderGrant') }
            onResponderReject = { gee => console.log('parent-onResponderReject') }
            onResponderStart = { gee => console.log('parent-onResponderStart') }
            onResponderMove = { gee => console.log('parent-onResponderMove') }
            onResponderRelease = { gee => console.log('parent-onResponderRelease') }
            onResponderEnd = { gee => console.log('parent-onResponderEnd') }
            onTouchStart = { gee => console.log('parent-onTouchStart') }
            onTouchEnd = { gee => console.log('parent-onTouchEnd') }
        >
        <View 
            style={{ backgroundColor: 'blue', flex: 0.5, overflow:'hidden', }}
            onStartShouldSetResponderCapture = { gee => { console.log('child-onStartShouldSetResponderCapture'); return false; } } 
            onStartShouldSetResponder={ gee => { console.log('child-onStartShouldSetResponder'); return true; } } 
            onResponderGrant = { gee => console.log('child-onResponderGrant') }
            onResponderReject = { gee => console.log('child-onResponderReject') }
            onResponderStart = { gee => console.log('child-onResponderStart') }
            onResponderMove = { gee => console.log('child-onResponderMove') }
            onResponderRelease = { gee => console.log('child-onResponderRelease') }
            onResponderEnd = { gee => console.log('child-onResponderEnd') }
            onTouchStart = { gee => console.log('child-onTouchStart') }
            onTouchEnd = { gee => console.log('child-onTouchEnd') }
        />
      </View>)
    }
}

const styles = StyleSheet.create({
    
})