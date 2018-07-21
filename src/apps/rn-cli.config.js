/**
 * Copyright (c) 2018-present, ShenZhiWei.
 * All rights reserved.
 *
 * react-native-typescript-transformer配置
 *
 */
module.exports = {
    getTransformModulePath() {
        return require.resolve("react-native-typescript-transformer");
    },
    getSourceExts() {
        return ["ts", "tsx", "js"];
    }
};