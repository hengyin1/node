const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.resolve(projectRoot, './src/*/index.jsx'));
  entryFiles.forEach((entryFile) => {
    const match = entryFile.match(/src\/(.*)\//);
    if (match && match[1]) {
      const pageName = match[1];
      entry[pageName] = entryFile;

      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          filename: `${pageName}.html`,
          template: path.resolve(projectRoot, `./src/${pageName}/index.html`),
          chunks: [pageName],
          inject: true,
        }),
      );
    }
  });

  return { entry, htmlWebpackPlugins };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          'babel-loader'
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // 选项
                    },
                  ],
                ],
              },
            },
          },
          'less-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUni: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    ...htmlWebpackPlugins,
    // function () {
    //   this.hooks.done.tap('done', (stats) => {
    //     if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
    //       process.exit(1);
    //     }
    //   });
    // },
  ],
  stats: 'errors-only',
};
