const path = require('path');
const Webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'largeNumber': './src/largeNumber.js',
    'largeNumber.min': './src/largeNumber.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd'
  },
  mode: 'none',
  optimization: {
    minimize: true,
    // minimizer: [
    //   new TerserPlugin({
    //     include: /\.min\.js$/
    //   })
    // ]
  }
}