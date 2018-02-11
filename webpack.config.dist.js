const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const defaultConfig = require('./webpack.config')

module.exports = merge(
  defaultConfig, {
    plugins: [
      new UglifyJSPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: 'production'
        }
      })
    ],
  }
)