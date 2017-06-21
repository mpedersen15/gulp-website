var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');

// Less plugins
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new LessAutoprefix({
  browsers: ['last 2 versions']
});

// Handlbars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

// Images plugins
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// File Paths
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var LESS_PATH = 'public/less/**/*.less';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';
var DIST_PATH = 'public/dist';

// Styles (CSS)
/*gulp.task('styles', function(){
  console.log('Starting styles task...');
  return gulp.src(['public/css/reset.css', CSS_PATH])
    .pipe(plumber(function(error){
      console.log('Styles task error')
      console.log(error);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});*/

// Styles (SASS)
gulp.task('styles', function(){
  console.log('Starting styles (SASS) task...');
  return gulp.src('public/scss/styles.scss')
    .pipe(plumber(function(error){
      console.log('Styles task error')
      console.log(error);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Styles (Less)
/*gulp.task('styles', function(){
  console.log('Starting styles (Less) task...');
  return gulp.src('public/less/styles.less')
    .pipe(plumber(function(error){
      console.log('Styles task error')
      console.log(error);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [lessAutoprefix]
    }))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});*/

// Scripts
gulp.task('scripts', function(){
  console.log('Starting scripts task...');
  return gulp.src(SCRIPTS_PATH)
    .pipe(plumber(function(error){
      console.log('Scripts task error')
      console.log(error);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Images
gulp.task('images', function(){
    return gulp.src(IMAGES_PATH)
      .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress()
      ]))
      .pipe(gulp.dest(DIST_PATH + "/images"));

});

// Templates
gulp.task('templates', function(){
  return gulp.src(TEMPLATES_PATH)
    .pipe(handlebars({
      handlebars: handlebarsLib
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task('clean', function(){
  return del.sync([
    DIST_PATH + "/**"
  ]);
});

gulp.task('default', ['clean', 'images', 'templates', 'styles', 'scripts'], function(){
  console.log('Performing default task...');
});

// zip
gulp.task('export', function(){
  return gulp.src("public/**/*")
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'));
})

// Watch
gulp.task('watch', ['default'], function(){
  console.log('Starting watch task...');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  // gulp.watch(CSS_PATH, ['styles']);
  // gulp.watch(SCSS_PATH, ['styles']);
  gulp.watch(LESS_PATH, ['styles']);
  gulp.watch(TEMPLATES_PATH, ['templates']);
});
