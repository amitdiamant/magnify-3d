const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/Magnify3d.js'
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
  ],
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    modules: [
        path.resolve('./src'),
        path.resolve('./src/shaders'),
        'node_modules'
    ],
  },
  output: {
    filename: 'Magnify3d.js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, "./build")
  }
};
