const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/search/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash:8].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: '/src/search/index.html',
      inject: true
    })
  ]
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       // include: /\.min\.js$/
  //     })
  //   ]
  // }
}