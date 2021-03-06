const webpack = require('webpack');
const path = require('path');

function sourceMapLoader(loaderName) {
  return {
    loader: loaderName,
    options: {
      sourceMap: true
    }
  }
}

const config = {
  devtool: 'cheap-eval-source-map',

  // context: path.join(__dirname, 'src'),

  entry: "./graphics/normal-maps/cube/cube.js",

  output: {
    path: path.resolve(__dirname, 'graphics/normal-maps/cube/dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [

      {
          test: /\.js|jsx$/,
          exclude: /node_modules/,
          use: [
              'babel-loader',
          ]
      },

      {
          test: /\.css$/,
          use: [
              'style-loader',
              sourceMapLoader('css-loader')
          ]
      },

      {
          test: /\.scss/,
          use: [
              'style-loader',
              sourceMapLoader('css-loader'),
              sourceMapLoader('sass-loader')
          ]
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }

    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],

    modules: ["node_modules"],

  },

  plugins: [

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'graphics/3d-camera/dist'),
    compress: true,
    hot: true,
    port: 9000,
    // index: 'index.html'
  }
}


module.exports = config;
