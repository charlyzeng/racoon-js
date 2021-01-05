const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    filename: 'racoon.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
