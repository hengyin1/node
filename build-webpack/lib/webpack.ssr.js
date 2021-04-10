const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const ssrConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-server.js',
    libraryTarget: 'umd',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
};

module.exports = merge(baseConfig, ssrConfig);
