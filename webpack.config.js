const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        exclude: /node_modules/,
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

    // The last config should run clean.
    plugins: [
      new CleanWebpackPlugin(),
    ],
  }),
];
