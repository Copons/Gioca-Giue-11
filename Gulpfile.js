var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var chalk = require('chalk');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var merge = require('utils-merge');
var duration = require('gulp-duration');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var config = {
  js : {
    src : './dev/js/main.js',
    watch : './dev/js/**/*',
    outputDir : './dev/build/',
    outputFile : 'gg11.js'
  },
  scss : {
    src : './dev/scss/gg11.scss',
    watch : './dev/scss/**/*',
    outputDir : './dev/build',
    outputFile : 'gg11.css'
  }
};

function mapError (err) {
  if (err.fileName) {
    // Regular error
    gutil.log(
      chalk.red(err.name) + ': ' +
      chalk.yellow(err.fileName).replace(__dirname + '\\dev\\', '') + ' (' +
      chalk.magenta(err.lineNumber) + ':' +
      chalk.magenta(err.columnNumber || err.column) + '): ' +
      chalk.blue(err.description)
    );
  }
  else {
    // Browserify error
    gutil.log(
      chalk.red(err.name) + ': ' +
      chalk.yellow(err.message)
    );
  }
}

function scriptsBuild (build) {
  var buildTimer = duration('Build time');
  build
    .bundle()
    .on('error', mapError)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(rename(config.js.outputFile))
    .pipe(sourcemaps.init({ loadMaps : true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.outputDir))
    .pipe(notify({
      title : 'Browserify',
      message : 'Generated file: <%= file.relative %>'
    }))
    .pipe(buildTimer)
    .pipe(connect.reload())
}

function stylesBuild () {
  var buildTimer = duration('Build time');
  gulp.src(config.scss.watch)
    .pipe(rename(config.scss.outputFile))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write({ includeContent : false }))
    .pipe(sourcemaps.init({ loadMaps : true }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.scss.outputDir))
    .pipe(notify({
      title : 'SCSS',
      message : 'Generated file: <%= file.relative %>'
    }))
    .pipe(buildTimer)
    .pipe(connect.reload())
}




gulp.task('webserver', function () {
  connect.server({
    root : 'dev',
    livereload : true
  });
});

gulp.task('scripts', function () {
  var args = merge(watchify.args, { debug : true });
  var build = browserify(config.js.src, args)
    .plugin(watchify, { ignoreWatch : ['**/node_modules/**'] })
    .transform(babelify, { presets : ['es2015'] });
  scriptsBuild(build);
  build.on('update', function () {
    scriptsBuild(build);
  });
});

gulp.task('styles', function () {
  stylesBuild();
  build.on('update', function () {
    stylesBuild();
  });
});

gulp.task('default', ['webserver', 'scripts', 'styles']);
