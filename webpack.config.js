var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/client/app.js',
  output: {
    path: __dirname+'/public/js',
    filename: 'bundle.js',
    publicPath: './public/js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src/client'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};