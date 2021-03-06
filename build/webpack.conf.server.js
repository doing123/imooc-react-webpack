const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
    target: 'node', // 代码的执行环境
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    externals: Object.keys(require('../package.json').dependencies), // 排除 依赖包
    output: {
        filename: 'server-entry.js',
        libraryTarget: 'commonjs2' // 模块的引用方案
    }
})
