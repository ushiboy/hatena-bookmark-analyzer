const host = process.env.ALLOW_ALL ? '0.0.0.0' : '127.0.0.1';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/app.js',
    './src/app.css'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
      }
    ]
  },
  devServer: {
    contentBase: '.',
    inline: true,
    host,
    port: 8080,
    disableHostCheck: true,
    stats: {
      version: false,
      hash: false,
      chunkModules: false
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename:'bundle.css',
      disable: false,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('postcss-easy-import')({
            glob: true
          }),
          require('postcss-nested')
        ]
      }
    })
  ],
  devtool: 'source-map'
};
