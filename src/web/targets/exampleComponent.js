/**
 * Copyright (c) 2018-present, ShenZhiWei.
 * All rights reserved.
 *
 * 自定义业务模块
 *
 */
const baseComponent = require('./baseComponent');

module.exports = class exampleComponent extends baseComponent {
    constructor(){
        super();

        // 业务组件对应的html文件title设置，如果不设置则默认为空title
        this.webComponentsTitle = {
            'example': 'Hello Fastman2',
        }

        // 业务组件逻辑脚本入口文件定义
        this.webComponents = Object.assign(this.webComponents, {
            'example': './navigator/navigator.web',
        })
    }
};
