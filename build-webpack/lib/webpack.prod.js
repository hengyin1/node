const { merge } = require('webpack-merge');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base.js');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const prodConfig = smp.wrap({
  mode: 'production',
  plugins: [
    new HTMLInlineCSSWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // include: /\.min\.js$/
      }),
      new CssMinimizerPlugin(),
    ],
  },
});

module.exports = merge(baseConfig, prodConfig);
