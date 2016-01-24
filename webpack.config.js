const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app : path.join(__dirname, 'dev', 'webpack-test', 'app'),
  build : path.join(__dirname, 'dev', 'webpack-test', 'build')
};

const common = {
  entry : PATHS.app,
  resolve : {
    extensions : ['', '.js', '.jsx']
  },
  output : {
    path : PATHS.build,
    filename : 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.scss$/,
        loaders : ['style', 'css?sourceMap', 'sass?sourceMap'],
        include : PATHS.app
      },
      {
        test : /\.js$/,
        loader : 'babel',
        query : {
          cacheDirectory : true,
          presets : ['es2015']
        },
        include : PATHS.app
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool : 'eval-source-map',
    devServer : {
      contentBase : PATHS.build,
      historyApiFallback : true,
      hot : true,
      inline : true,
      progress : true,
      stats : 'errors-only',
      host : process.env.HOST,
      port : process.env.PORT
    },
    plugins : [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
