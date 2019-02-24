const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: ['./sample/index.js']
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
    new CleanWebpackPlugin(['build']),
    new HtmlwebpackPlugin({
      inject: 'body',
      template: './sample/index.html',
      title: 'Magnify-3d'
    }),
    new CopyWebpackPlugin(
      [
          { from: path.join(__dirname, 'sample/res'), to: 'res' },
      ]
    ),
  ],
  resolve: {
    modules: [
        path.resolve('./src'),
        path.resolve('./src/shaders'),
        path.resolve('./sample'),
        'node_modules'
    ],
  },
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, "./build")
  }
};
