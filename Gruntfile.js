module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourceMap: true
      },
      dev: {
        files: {
          'dev/css/gg11.css': 'dev/scss/gg11.scss'
        }
      }
    },

    autoprefixer: {
      dev: {
        options: {
          browsers: ['last 2 versions'],
          map: true
        },
        files: {
          'dev/css/gg11.prefixed.css': 'dev/css/gg11.css'
        }
      }
    },

    cssmin: {
      build: {
        files: {
          'dist/css/gg11.min.css': 'dev/css/gg11.prefixed.css'
        }
      }
    },

    uglify: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          'dev/js/gg11.min.js': [
            'dev/js/plugins/*.js',
            'dev/js/gg11.js'
          ]
        }
      },
      build: {
        files: {
          'dist/js/gg11.min.js': [
            'dev/js/plugins/*.js',
            'dev/js/gg11.js'
          ]
        }
      }
    },

    sync: {
      build: {
        files: [
          {
            cwd: 'dev',
            src: [
              'css/**',
              'fonts/**',
              'js/**',
              'img/**',
              '*'
            ],
            dest: 'dist/'
          }
        ],
        verbose: true,
        failOnError: true,
        updateAndDelete: true
      }
    },

    express: {
      dev: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: ['./dev'],
          livereload: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: ['dev/scss/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      scripts: {
        files: [
          'dev/js/libs/**/*.js',
          'dev/js/plugins/**/*.js',
          'dev/js/gg11.js'
        ],
        tasks: ['uglify:dev']
      },
      test: {
        files: ['dev/**/*']
      }
    }

  });

  grunt.registerTask('serve', ['express', 'watch']);

  grunt.registerTask('build', ['sass:dev', 'autoprefixer:dev', 'cssmin:build', 'uglify:build', 'sync:build']);

};
