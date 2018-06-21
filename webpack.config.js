const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: './sidebar/app.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'mustache-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $ : 'jquery',
      Backbone : 'backbone',
      _ : 'lodash'
    })
  ]
};
