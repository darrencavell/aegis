const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const dotenv = require('dotenv')

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle[chunkhash:8].js',
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: 'style-loader'
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    port: 1234
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './public'
    }]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/sw-src.js',
      swDest: 'sw.js',
      exclude: [/\.map$/, /manifest.*\.json$/, /_redirects/]
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  devtool: 'source-map'
}