// const webpack = require('webpack');
const path = require('path');

const DIRNAME = __dirname;
// console.log(__dirname);

module.exports = {
  entry: path.resolve(DIRNAME, './src/scripts/app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(DIRNAME, 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
};

