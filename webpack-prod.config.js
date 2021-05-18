const path = require('path');
const config = require('./webpack.config');

const output = path.join(__dirname, 'build');

module.exports = {
  ...config,
  mode: 'production',
  output: {
    path: output,
    filename: 'custom-elements.min.js'
  },
  devServer: {
    contentBase: output,
    compress: true,
    port: 9000,
  },
};
