const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base.js');

const smp = new SpeedMeasurePlugin();

const prodConfig = smp.wrap({
  mode: 'production',
  plugins: [
    new HTMLInlineCSSWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('./build/library/library.json')
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // include: /\.min\.js$/,
        parallel: true
      }),
      new CssMinimizerPlugin(),
      new BundleAnalyzerPlugin(),
    ],
  },
});

module.exports = merge(baseConfig, prodConfig);
