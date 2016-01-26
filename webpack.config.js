const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  js : path.join(__dirname, 'dev', 'js'),
  scss : path.join(__dirname, 'dev', 'scss'),
  build : path.join(__dirname, 'dev', 'build')
};




const common = {
  entry : PATHS.js,
  resolve : {
    extensions : ['', '.js', '.jsx']
  },
  output : {
    path : PATHS.build,
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
        loader : 'url-loader?limit=100000'
      }
    ]
  }
};

const dev = merge(common, {
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

const devBuild = merge(common, {
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
  module.exports = dev;
}
if (TARGET === 'devbuild') {
  module.exports = devBuild;
}
if (TARGET === 'build') {
  module.exports = build;
}
