const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      inject: 'body',
      template: './src/index.html'
    })
  ],
  resolve: {
    modules: [
        path.resolve('./src'),
        path.resolve('./src/shaders'),
        'node_modules'
    ],
  },
  output: {
    filename: 'bundle.[hash].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, "./src"),
    publicPath: path.resolve(__dirname, '/')
  },
  devtool: 'cheap-module-source-map'
};
