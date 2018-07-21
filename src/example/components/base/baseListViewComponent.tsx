/*
 * @Author: shenzhiwei
 * @Date: 2018-06-26 10:54:39
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-06-27 18:01:18
 * @Description: ListView基类
 */
import React, { Component } from 'react'
import {
    View,
    ListViewDataSource,
} from 'react-native'
import baseComponent from './index'

export default abstract class BaseListViewComponent<P, S> extends baseComponent<P, S> {
    // 声明图片列表
    public static readonly THUMB_URLS: Array<any> = [
        require('../images/thumbnails/like.png'),
        require('../images/thumbnails/dislike.png'),
        require('../images/thumbnails/call.png'),
        require('../images/thumbnails/fist.png'),
        require('../images/thumbnails/bandaged.png'),
        require('../images/thumbnails/flowers.png'),
        require('../images/thumbnails/heart.png'),
        require('../images/thumbnails/liking.png'),
        require('../images/thumbnails/party.png'),
        require('../images/thumbnails/poke.png'),
        require('../images/thumbnails/superlike.png'),
        require('../images/thumbnails/victory.png'),
    ]
    
    constructor(props: P) {
        super(props);
    }

    /**
     * 渲染单元行的分割线
     * @param sectionID 区域ID
     * @param rowID 行ID
     * @param adjacentRowHighlighted 是否高亮，高亮时线条颜色也需要调整
     */
     protected renderSeparator(
        sectionID: number,
        rowID: number,
        adjacentRowHighlighted: boolean
    ): JSX.Element {
        return (
            <View key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}>
            </View>
        )
    }

    /**
     * 获取默认的datasource实例
     */
    protected abstract getDefaultDatasource(): ListViewDataSource;
}

// 获取原始数据源数据
export function genRows(pressData: { [key: number]: boolean }): Array<string>
// 第一顺位：dataBlob；第二顺位：sectionID数组；第三顺位：rowID数组；
export function genRows(pressData?: any): [{ [key: string]: string }, Array<string>, Array<string>]
export function genRows(pressData: any): any {
    if(typeof pressData === 'object') {
        let dataBlob = []
        for (let i = 0; i < 1000; i++) {
            let pressedText = pressData[i] ? ' (pressed)' : ''
            dataBlob.push(`Item ${i}${pressedText}`)
        }
        return dataBlob
    }
    else {
        // 汇总块和行的所有索引以及索引对应的数据
        let dataBlob: {[key: string]:string} = {}
        // 存放块索引
        let sectionIDs = []
        // 存放行索引
        let rowIDs: Array<Array<string>> = []
        for (let i = 0; i < 100; i ++) {
            let sectionName = `Section${i}`
            sectionIDs.push(sectionName)
            dataBlob[sectionName] = sectionName
            rowIDs[i] = []

            // 每块中放10行
            for (let j = 0; j < 10; j++) {
                const rowName = `S${i}，R${j}`
                rowIDs[i].push(rowName)
                dataBlob[rowName] = rowName
            }
        }
        return [
            dataBlob, sectionIDs, rowIDs
        ]
    }
}