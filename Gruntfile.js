var JSLIBS = [
  'dev/js/libs/jquery-1.12.0.js',
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
        tasks : ['uglify:libs']
      },
      scripts : {
        files : [
          'dev/js/plugins/**/*.js',
          'dev/js/*.js'
        ],
        tasks : ['uglify:scripts']
      },
    }

  });

  grunt.registerTask('serve', ['express', 'watch']);
};
