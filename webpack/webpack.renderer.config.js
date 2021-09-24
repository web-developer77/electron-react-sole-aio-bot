const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
  target: 'electron-renderer',
  entry: {
    app: ['@babel/polyfill', './src/renderer/App.js'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [['@babel/preset-env', { targets: { browsers: 'last 2 versions ' } }], '@babel/preset-react'],
          plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ title: 'AIO BOT' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
});
