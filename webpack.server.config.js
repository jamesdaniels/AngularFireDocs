const path = require('path');
const webpack = require('webpack');

const APP_NAME = 'afdocsite';

module.exports = {
  entry: {  server: './server.ts' },
  resolve: { 
    extensions: ['.js', '.json', '.ts', '.tsx'],
    mainFields: ["main", "module"],
    mainFiles: ['index.node', 'index']
  },
  mode: 'development',
  target: 'node',
  externals: ["grpc"],
  output: {
    path: path.join(__dirname, `dist/${APP_NAME}-webpack`),
    library: 'app',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
}