/**
 * Copyright (c) 2018-present, ShenZhiWei.
 * All rights reserved.
 *
 * 基础目标组件继承类
 *
 */
const path = require('path')
//ployfill Object.entries
if (!Object.entries)
Object.entries = function( obj ){
  var ownProps = Object.keys( obj ),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
  while (i--)
    resArray[i] = [ownProps[i], obj[ownProps[i]]];

  return resArray;
};

module.exports = class baseComponents {
    constructor(){
        // 业务组件对应的html文件title设置，如果不设置则默认为空title
        this.webComponentsTitle = {
            
        }

        // 业务组件逻辑脚本入口文件定义
        this.webComponents = {

        }
    }

    /**
     * 获取webComponent对应的Html路径列表(相对项目根目录)
     */
    componentPathRelativeRoot(){
        let paths = []
        for (let [k, v] of Object.entries(this.webComponents)) {
            let basePath = path.resolve(__dirname, '..', v, '..')
            basePath = path.join(basePath, '/index.html')
            paths.push(basePath)
        }
        return paths
    }

    /**
     * 获取webComponent对应的Html路径列表(相对src)
     * @returns {Array}
     */
    componentPathRelativeSrc(){
        let paths = []
        for (let [k, v] of Object.entries(this.webComponents)) {
            var reg = /.\/src\/((\w|-|\s)+)\/index/ig
            v.replace(reg, function (s, value) {
                paths.push(path.join(value, '/*.html'))
            })
        }
        return paths
    }
}
