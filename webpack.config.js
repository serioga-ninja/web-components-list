const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const clientRootFolder = path.dirname(__filename);

module.exports = [
  {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
    optimization: {
      minimizer: [new TerserJSPlugin({})],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.less$/i,
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /(node_modules|bower_components|libs)/,
          use: {
            loader: 'babel-loader',
            options: {
              ...JSON.parse(
                  fs.readFileSync(path.resolve(clientRootFolder, '.babelrc'))
              ),
            },
          },
        }
      ]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'app.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },

  }
];
