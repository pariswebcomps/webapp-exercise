"use strict";

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'client/Main.js')
  ],
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=react&presets[]=es2015']
    }]
  },
  devServer: {
    contentBase: '.',
    stats: {
      colors: true
    },
    hot: true
  }
}
