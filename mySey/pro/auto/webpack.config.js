/*
 * @Descripttion:
 * @Author: AXiang
 * @Date: 2020-03-11 22:38:08
 * @LastEditors: AXiang
 * @LastEditTime: 2020-03-11 23:43:08
 */
const path = require('path')

module.exports = {
  entry: {
    index: './src/script/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/script'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src/script')
      ],
      loader: 'babel-loader'
    },
    {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    }
    ]
  },
  mode: 'development'
}
