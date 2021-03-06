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
    }),
    new HTMLPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 可以使用 localhost， 127.0.0.1， 本机IP访问
    port: '8888',
    // contentBase: path.join(__dirname, '../dist'), // 该目录下启动
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public', // 静态资源前加 ‘/public’
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
