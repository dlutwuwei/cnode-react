var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './app',
    port: 8080
  },
  entry: {
    'main': path.resolve(__dirname, 'app/main.jsx'),
    'redux': path.resolve(__dirname, 'app/redux_main.jsx')
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', '!css!less')
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, 'app'),
      loader: ExtractTextPlugin.extract('style', '!css')
    }, {
      test: /\.js[x]?$/,
      include: path.resolve(__dirname, 'app'),
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'cnode react app',
      template: 'app/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      title: 'cnode redux app',
      template: 'app/index.html',
      filename: 'redux.html',
      inject: 'body',
      chunks: ['redux']
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: 'https://localhost:8080'
    })
  ]
};