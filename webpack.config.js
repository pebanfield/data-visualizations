var path = require('path');
var webpack = require('webpack');
var WebpackSemverGit = require('webpack-semver-git');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {app:['./src/client/app.js','./src/client/index.scss'], vendor:["react"]},
  output: {
    path: __dirname+'/public',
    filename: 'js/[name]_[chunkhash].js',
    chunkFilename: 'js/[name]_[chunkhash].js',
    publicPath: './public'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src/client'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new WebpackSemverGit(__dirname),
    new ExtractTextPlugin("css/styles_[chunkhash].css"),
    new CleanWebpackPlugin(['public/js', 'public/css'], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: []
    })]
};