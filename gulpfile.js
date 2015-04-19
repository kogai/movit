var gulp = require('gulp');
var util = require('gulp-util');
var data = require('gulp-data');
var newer = require('gulp-newer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pngmin = require('gulp-pngmin');
var mifify = require('gulp-minify-css');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var uglifyify = require('uglifyify');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var react = require('gulp-react');
var runSequence = require('run-sequence');

var config = {
  env: 'development',
  src: './asset',
  dest: './public',
  destServer: './component',
  srcReact: './view',
  destReact: './asset/react'
};

gulp.task('sass', function () {
  'use strict';
  return (
    gulp.src(config.src + '/sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(mifify())
    .pipe(sourcemaps.write('./'))
    .pipe(
      gulp.dest(config.dest)
    )
  );
});

gulp.task('react-base', function () {
  'use strict';
  return gulp.src([
      config.srcReact + '/*.jsx',
      config.srcReact + '/**/*.jsx',
      config.srcReact + '/**/**/*.jsx'
    ])
    .pipe(react())
    .pipe(gulp.dest(config.destReact + '/'))
    .on('error', function(err){
      console.log(err);
    });
});

gulp.task('react-client', function() {
  'use strict';
  var opt = {
    entries: [
      config.destReact + '/client.js'
    ],
    extensions: ['.js'],
    debug: true
  };
  if(config.env === 'production'){
    opt.debug = false;
  }
  return browserify(opt)
  .transform('uglifyify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.dest));
});

gulp.task('pngmin', function () {
  'use strict';
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
  'use strict';
  return (
    gulp.src([
      config.src + '/image/*.jpg',
      config.src + '/image/**/*.jpg',
      config.src + '/image/**/**/*.jpg',
      config.src + '/image/*.gif',
      config.src + '/image/**/*.gif',
      config.src + '/image/**/**/*.gif'
    ])
    .pipe(gulp.dest(config.dest + '/image'))
  );
});

gulp.task('img', [
  'pngmin',
  'copy'
]);

gulp.task('react', function (callback) {
  'use strict';
  runSequence(
    'react-base',
    'react-client',
    callback
  );
});

gulp.task('isProduction', function(){
  'use strict';
  config.env = 'production';
});

gulp.task('default', [
  'compile'
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
    config.src + '/sass/**/**/*.sass',
    config.src + '/sass/*.scss',
    config.src + '/sass/**/*.scss',
    config.src + '/sass/**/**/*.scss'
  ], ['sass']);
  gulp.watch([
    config.srcReact + '/*.jsx',
    config.srcReact + '/**/*.jsx',
    config.srcReact + '/**/**/*.jsx'
  ], ['react']);
  gulp.watch([
    config.src + '/image/*',
    config.src + '/image/**/*',
    config.src + '/image/**/**/*'
  ], ['img']);
});

gulp.task('compile', [
  'sass',
  'react',
  'img'
]);

gulp.task('build', [
  'isProduction',
  'compile'
]);
