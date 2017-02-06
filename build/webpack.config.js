var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './src/calendar.vue',
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js',
    library: 'Vue2Calendar',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
            css: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  resolveLoader: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  plugins: [
      new ExtractTextPlugin("styles.css", {
          allChunks: true
      }),
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: '"production"'
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
  ]
}