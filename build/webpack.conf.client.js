const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge') // 深拷贝 对比
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
})

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 可以使用 localhost， 127.0.0.1， 本机IP访问
    port: '8888',
    contentBase: path.join(__dirname, '../dist'), // 该目录下启动
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public', // 静态资源前加 ‘/public’
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
