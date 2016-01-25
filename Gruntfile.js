var JSLIBS = [
  //'dev/js/libs/jquery-1.12.0.js',
  'dev/js/libs/jquery-3.0.0-beta1.js',
  'dev/js/libs/waves.js',
  'dev/js/libs/hammer.js',
  'dev/js/libs/perfect-scrollbar.js'
];



module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    sass : {
      options : {
        sourceMap : true
      },
      dist : {
        files : {
          'dev/css/gg11.css' : 'dev/scss/gg11.scss'
        }
      }
    },

    autoprefixer : {
      dist : {
        options : {
          browsers : ['last 2 versions'],
          map : true
        },
        files : {
          'dev/css/gg11.prefixed.css' : 'dev/css/gg11.css'
        }
      }
    },

    cssmin : {
      options : {
        sourceMap : true
      },
      dist : {
        files : {
          'dev/css/bundle/gg11.min.css' : 'dev/css/gg11.prefixed.css'
        }
      }
    },

    uglify : {
      options : {
        sourceMap : true
      },
      libs : {
        files : {
          'dev/js/bundle/gg11-libs.min.js' : JSLIBS
        }
      },
      scripts : {
        files : {
          'dev/js/bundle/gg11.min.js' : [
            'dev/js/plugins/*.js',
            'dev/js/*.js'
          ]
        }
      },
      bfy : {
        files : {
          'dev/build/gg11.min.js' : [
            'dev/build/gg11.js'
          ]
        }
      }
    },

    browserify : {
      options : {
        transform : [
          ['babelify', {presets : ['es2015']}]
        ],
        extensions : ['.js']
      },
      dev : {
        options : {
          browserifyOptions : {
            debug : true
          },
          watch : true,
          keepAlive : true,
          verbose : true
        },
        plugins : [
          ['minifyify', {
            minify : true,
            uglify : true,
            output : 'dev/build/'
          }]
        ],
        src : ['dev/js/main.js'],
        dest : 'dev/build/gg11.js'
      },
      dist : {
        options : { debug : false },
        src : '<%= browserify.dev.src %>',
        dest : 'dist/js/gg11.js'
      }
    },

    express : {
      dev : {
        options : {
          port : 3000,
          hostname : 'localhost',
          bases : ['./dev'],
          livereload : true
        }
      }
    },

    watch : {
      options : {
        livereload : true
      },
      styles : {
        files : ['dev/scss/**/*.scss'],
        tasks : ['sass', 'autoprefixer', 'cssmin']
      },
      libs : {
        files : [
          'dev/js/libs/**/*.js',
        ],
        //tasks : ['uglify:libs']
        tasks : ['browserify:dev']
      },
      scripts : {
        files : [
          'dev/js/plugins/**/*.js',
          'dev/js/*.js'
        ],
        //tasks : ['uglify:scripts']
        tasks : ['browserify:dev']
      },
    }

  });

  grunt.registerTask('serve', ['express', 'watch']);
};
