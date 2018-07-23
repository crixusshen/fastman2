/*
 * @Author: shenzhiwei
 * @Date: 2018-07-11 12:10:22
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-23 12:47:54
 * @Description: APP 首页
 */
import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native";

class HomeScreen extends React.Component<{
    navigation: any,
}> {
    state = {
        text: ""
    };

    render() {
        const iconProps = {
            size: 30,
            color: '#900'
        };
        const menuButtonStyle =
            Platform.OS === "android" ? Styles.menuButtonAndroid : Styles.menuButton;
        return (
            <ScrollView style={Styles.wrapper}>
                <View style={Styles.menu}>
                    <TouchableOpacity style={[menuButtonStyle, {backgroundColor: 'blue',}]} onPress={() => this.props.navigation.navigate('ViewScreen', { name: 'fastman2', })}>
                        <Text style={Styles.menuLabel}>{`View`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('ScrollViewScreen')}>
                        <Text style={Styles.menuLabel}>{`ScrollView`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('ListViewScreen')}>
                        <Text style={Styles.menuLabel}>{`ListView`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('ListViewGridLayoutScreen')}>
                        <Text style={Styles.menuLabel}>{`ListViewGrid`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('ListViewPagingScreen')}>
                        <Text style={Styles.menuLabel}>{`ListViewPaging`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('FlatListScreen')}>
                        <Text style={Styles.menuLabel}>{`FlatList`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('SectionListScreen')}>
                        <Text style={Styles.menuLabel}>{`SectionList`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('TextScreen')}>
                        <Text style={Styles.menuLabel}>{`Text`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('TextInputScreen')}>
                        <Text style={Styles.menuLabel}>{`TextInput`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('ButtonScreen')}>
                        <Text style={Styles.menuLabel}>{`Button`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('PickerScreen')}>
                        <Text style={Styles.menuLabel}>{`Picker`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('RadioScreen')}>
                        <Text style={Styles.menuLabel}>{`Radio`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('ModalScreen')}>
                        <Text style={Styles.menuLabel}>{`Modal`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuButtonStyle} onPress={() => this.props.navigation.navigate('AnimatedModalScreen')}>
                        <Text style={Styles.menuLabel}>{`AnimatedModal`}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const buttonCommonStyle = {
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
};

const Styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#eee",
    },
    space: {
        margin: 5,
    },
    menu: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 60,
    },
    menuLabel: {
        fontSize: 11,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
    },
    menuButtonAndroid: {
        //...buttonCommonStyle,
        margin: 10,
        width: 100,
        height: 100,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ddd",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    menuButton: {
        //...buttonCommonStyle,
        margin: 10,
        width: 100,
        height: 100,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ddd",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#9a9a9a",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
    }
});

export default HomeScreen