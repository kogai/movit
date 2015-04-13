var gulp = require('gulp');
var util = require('gulp-util');
var data = require('gulp-data');
var newer = require('gulp-newer');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pngmin = require('gulp-pngmin');
var mifify = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var react = require('gulp-react');

var config = {
  env: 'development',
  src: './asset/src',
  dest: './asset/public',
  destServer: './asset/server'
};

gulp.task('jade', function () {
  'use strict';
  var opt = {};
  if(config.env === 'development'){
    opt.pretty = true;
  }
  return (
    gulp.src([
  		config.src + '/jade/!(_)*.jade',
  		config.src + '/jade/**/!(_)*.jade',
  		config.src + '/jade/**/**/!(_)*.jade'
    ])
    .pipe(
      data(function (file) {
        return require(config.src + '/jade/config.json')
      })
    )
    .pipe(newer(config.dest))
    .pipe(jade(opt))
    .pipe(
      gulp.dest(config.dest)
    )
    .on('error', function (error) {
      util.beep();
      console.log(error);
    })
  );
});

gulp.task('sass', function () {
  'use strict';
  return (
    gulp.src('./src/sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(mifify())
    .pipe(sourcemaps.write('./'))
    .pipe(
      gulp.dest(config.dest)
    )
  )
});

gulp.task('react-client', function() {
  var opt = {
    entries: [
      config.src + '/js/client.jsx',
    ],
    extensions: ['.jsx'],
    debug: true
  };
  if(config.env === 'production'){
    opt.debug = false;
  }
  return browserify(opt)
  .transform('reactify')
  .transform('uglifyify')
  .bundle()
  .pipe
    (source(
      'bundle.js'
    )
  )
  .pipe(gulp.dest(config.dest));
});

gulp.task('react-server', function () {
  return gulp.src([
      config.src + '/js/*.jsx',
      config.src + '/js/**/*.jsx',
      config.src + '/js/**/**/*.jsx'
    ])
    .pipe(react())
    .pipe(gulp.dest(config.destServer + '/'))
    .on('error', function(err){
      console.log(err);
    });
});

gulp.task('pngmin', function () {
  return (
    gulp.src([
      config.src + '/image/*.png',
      config.src + '/image/**/*.png',
      config.src + '/image/**/**/*.png'
    ])
    .pipe(newer(config.dest + '/image'))
    .pipe(pngmin())
    .pipe(gulp.dest(config.dest + '/image'))
  );
});

gulp.task('copy', function () {
  return (
    gulp.src([
      config.src + '/image/*.jpg',
      config.src + '/image/**/*.jpg',
      config.src + '/image/**/**/*.jpg',
      config.src + '/image/*.gif',
      config.src + '/image/**/*.gif',
      config.src + '/image/**/**/*.gif',
    ])
    .pipe(gulp.dest(config.dest + '/image'))
  );
});

gulp.task('img', [
  'pngmin',
  'copy'
]);

gulp.task('react', [
  'react-client',
  'react-server',
]);

gulp.task('isProduction', function(){
  config.env = 'production'
});

gulp.task('default', [
  'compile',
], function(){
  'use strict';
  gulp.watch([
    config.src + '/jade/*.jade',
    config.src + '/jade/**/*.jade',
    config.src + '/jade/**/**/*.jade'
  ], ['jade']);
  gulp.watch([
    config.src + '/sass/*.sass',
    config.src + '/sass/**/*.sass',
    config.src + '/sass/**/**/*.sass'
  ], ['sass']);
  gulp.watch([
    config.src + '/js/*.jsx',
    config.src + '/js/**/*.jsx',
    config.src + '/js/**/**/*.jsx',
    config.src + '/js/*.js',
    config.src + '/js/**/*.js',
    config.src + '/js/**/**/*.js'
  ], ['react']);
  gulp.watch([
    config.src + '/image/*',
    config.src + '/image/**/*',
    config.src + '/image/**/**/*'
  ], ['img']);
});

gulp.task('compile', [
  'jade',
  'sass',
  'react',
  'img',
]);

gulp.task('build', [
  'isProduction',
  'compile'
]);
