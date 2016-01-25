module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    browserify : {
      options : {
        transform : [
          ['babelify', {presets : ['es2015']}]
        ],
        extensions : ['.js']
      },
      dev : {
        options : {
          debug : true,
          watch : true,
          keepAlive : true,
          verbose : true
        }
        src : [''],
        dest : ''
      },
      dist : {
        options : { debug : false },
        src : '<%= browserify.dev.src %>',
        dest : ''
      }
    },

    uglify : {
      dist : {
        src : '<%= browserify.dist.dest %>',
        dest : ''
      }
    }

    watch : {
      scripts : {
        files : ['...'],
        tasks : ['browserify']
      }
    }
  });
};
