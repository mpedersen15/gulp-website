var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

// File Paths
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';

// Styles
gulp.task('styles', function(){
  console.log('Starting styles task...');
  return gulp.src(['public/css/reset.css', CSS_PATH])
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Scripts
gulp.task('scripts', function(){
  console.log('Starting scripts task...');
  return gulp.src(SCRIPTS_PATH)
  .pipe(uglify())
  .pipe(gulp.dest(DIST_PATH))
  .pipe(livereload());
});

// Images
gulp.task('images', function(){
  console.log('Starting images task...');
});

gulp.task('default', function(){
  console.log('Performing default task...');
});

// Watch
gulp.task('watch', function(){
  console.log('Starting watch task...');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(CSS_PATH, ['styles']);
});
