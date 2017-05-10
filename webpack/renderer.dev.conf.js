const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

const { resolve } = require('path');

const webpackCommon = require('./base.conf');

const outputDir = resolve(__dirname, '..', 'app');
const manifest = resolve(outputDir, 'renderer', 'vendor.json');

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
      new DllReferencePlugin({
        manifest: require(resolve(outputDir, 'renderer', 'vendor.json')),
        sourceType: 'var',
      }),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '..', 'static', 'index.html'),
        inject: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ]
  });
