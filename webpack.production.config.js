var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'app/main.jsx'),
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
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
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
