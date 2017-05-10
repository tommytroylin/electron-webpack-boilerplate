const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const webpackCommon = require('./base.conf');

const outputDir = resolve(__dirname, '..', 'app');

module.exports = webpackMerge(webpackCommon, 
  {
    target: 'electron-renderer',
    devtool: 'cheap-module-eval-source-map',
    entry: {
      app: [
        'babel-polyfill',
        './src/renderer/index.js'
      ],
    },
    output: {
      path: resolve(outputDir, 'renderer'),
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [{
        test: /\.js$/,
        include: resolve(__dirname, '..', 'src'),
        // exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
      }]
    },
    devServer: {
      contentBase: resolve(outputDir, 'renderer'),
      publicPath: '/',
      compress: true,
      historyApiFallback: true,
      hot: true,
      https: false,
      // noInfo: true,
      watchContentBase: true,
      port: 9000
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '..', 'static', 'index.html'),
      }),
      new webpack.HotModuleReplacementPlugin(),
    ]
  });
