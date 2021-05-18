const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');

const output = path.join(__dirname, 'dist');

module.exports = {
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
        type: 'asset/inline',
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
          loader: 'babel-loader'
        },
      }
    ]
  },
  output: {
    path: output,
    filename: 'custom-elements.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: output,
    compress: true,
    port: 9000,
  },

};
