const path = require('path');
const { merge } = require('webpack-merge');

const commonConfig = {
  mode: 'production',
  devtool: 'source-map',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'racoon',
    globalObject: 'this',
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

module.exports = [
  // For browser using by `<script src="xxx"></script>`
  merge(commonConfig, {
    output: {
      filename: 'racoon.min.js',
    },
  }),

  // For nodejs or browser useing by webpack.
  merge(commonConfig, {
    output: {
      filename: 'racoon.js',
    },
    optimization: {
      minimize: false,
    },
  }),
];
