var path = require('path');
var webpack = require('webpack');
var WebpackSemverGit = require('webpack-semver-git');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {app: ['./src/client/app.js','./src/client/index.scss'], vendor: ['react']},
  output: {
    path: __dirname + '/public',
    filename: 'js/[name]_[chunkhash].js',
    chunkFilename: 'js/[name]_[chunkhash].js',
    publicPath: './public'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
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
        test: /\.scss$/, // TODO - make ExtractTextPlugin work w/ grommet and app
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['./node_modules', './node_modules/grommet/node_modules', 'src/client']
          }
        }]
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
    new ExtractTextPlugin({filename: 'css/styles_[chunkhash].css', allChunks: true}),
    new CleanWebpackPlugin(['public/js', 'public/css'], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: []
    })]
};