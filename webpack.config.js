// const webpack = require('webpack');
const path = require('path');
const DIRNAME = __dirname;
// console.log(__dirname);

module.exports = {
  entry: path.resolve(DIRNAME,'./src/scripts/app.js'),
  output: {
    path: __dirname,
    filename: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      }
    ]
  },
  // sassLoader: {
  //   includePaths: [path.resolve(__dirname, './src/scss')]
  // },
  resolve:{
    alias: {
      scripts: path.join(__dirname, './src/scripts')
    },
    extensions: ['', '.js']
  }
}
