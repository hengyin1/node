const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
