var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

// File Paths
var SCRIPTS_PATH = 'public/scripts/**/*.js';

// Styles
gulp.task('styles', function(){
  console.log('Starting styles task...');
});

// Scripts
gulp.task('scripts', function(){
  console.log('Starting scripts task...');
  return gulp.src(SCRIPTS_PATH)
  .pipe(uglify())
  .pipe(gulp.dest('public/dist'))
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
});