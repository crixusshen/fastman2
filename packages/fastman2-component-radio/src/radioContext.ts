/*
 * @Author: shenzhiwei
 * @Date: 2018-07-06 13:36:24
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-07 09:28:35
 * @Description: Radio Context
 */
import React from 'react'

const {Provider, Consumer} = React.createContext({
    // 单选按钮尺寸
    size: 20,
    // 单选按钮线框粗细
    thickness: 1,
    // 单选按钮未选中时的颜色
    color: '#007AFF',
    // 单选按钮选中后的颜色
    activeColor: '',
    // 单选按钮选中后的背景高亮颜色
    highlightColor: '',
    // 单选按钮被点击时会触发的回调事件
    onSelect: (index: number, value: any) => {},
})

export {
    Provider,
    Consumer,
}