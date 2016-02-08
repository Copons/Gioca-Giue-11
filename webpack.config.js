const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  js : path.join(__dirname, 'dev', 'js'),
  scss : path.join(__dirname, 'dev', 'scss'),
  theme : path.join(__dirname, 'dev', 'theme'),
  themeAssets : path.join(__dirname, 'dev', 'theme', 'assets')
};




const common = {
  entry : PATHS.js,
  resolve : {
    extensions : ['', '.js', '.jsx']
  },
  output : {
    path : PATHS.themeAssets,
    filename : 'gg11.js'
  },
  module : {
    loaders : [
      {
        test : /\.js$/,
        loader : 'babel',
        query : {
          cacheDirectory : true,
          presets : ['es2015']
        },
        include : PATHS.js
      },
      {
        test : /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader : 'url-loader?limit=10000'
      }
    ]
  }
};

const live = merge(common, {
  devtool : 'eval-source-map',
  devServer : {
    contentBase : PATHS.theme,
    historyApiFallback : true,
    hot : true,
    inline : true,
    progress : true,
    stats : 'errors-only',
    host : process.env.HOST,
    port : process.env.PORT
  },
  module : {
    loaders : [
      {
        test : /\.scss$/,
        loaders : ['style', 'css?sourceMap', 'autoprefixer', 'sass?sourceMap'],
        include : PATHS.scss
      }
    ]
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin()
  ]
});

const dev = merge(common, {
  devtool : 'eval-source-map',
  module : {
    loaders : [
      {
        test : /\.scss$/,
        loaders : ['style', 'css?sourceMap', 'autoprefixer', 'sass?sourceMap'],
        include : PATHS.scss
      }
    ]
  }
});

const build = merge(common, {
  module : {
    loaders : [
      {
        test : /\.scss$/,
        loader : ExtractTextPlugin.extract('style', 'css!autoprefixer!sass'),
        include : PATHS.scss
      }
    ]
  },
  plugins : [
    new ExtractTextPlugin('gg11.css', {
      allChunks : true
    })
  ]
});


if (TARGET === 'start' || !TARGET) {
  module.exports = live;
}
if (TARGET === 'dev') {
  module.exports = dev;
}
if (TARGET === 'build') {
  module.exports = build;
}
