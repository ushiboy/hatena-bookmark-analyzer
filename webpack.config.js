const host = process.env.ALLOW_ALL ? '0.0.0.0' : '127.0.0.1';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

function configureWebpack(environment) {
  environment = environment || 'development';
  const buildDir = process.env.BUILD_DIR || 'build';
  const base = {
    entry: [
      './src/app.js',
      './src/app.css'
    ],
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
  };

  if (environment === 'production') {
    fs.mkdirSync(path.join(__dirname, buildDir));
    fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(__dirname, buildDir, 'index.html'));
    return Object.assign({}, base, {
      output: {
        filename: 'bundle.js',
        path: path.join(__dirname, buildDir)
      },
      plugins: base.plugins.concat([
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin()
      ])
    });
  } else {
    return Object.assign({}, base, {
      output: {
        filename: 'bundle.js',
        path: __dirname
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
      devtool: 'source-map'
    });
  }
}

module.exports = configureWebpack(process.env.ENV);
