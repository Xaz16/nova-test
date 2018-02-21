var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var gulpSequence = require('gulp-sequence');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var isProd = process.argv[2] !== '--dev';

var scripts = [
  './node_modules/swiper/dist/js/swiper.min.js',
  './node_modules/lightbox2/dist/js/lightbox-plus-jquery.js',
  './src/js/*.js'
];

var style = [
  './node_modules/bootstrap/scss/bootstrap-grid.scss',
  './node_modules/bootstrap/scss/bootstrap-reboot.scss',
  './node_modules/swiper/dist/css/swiper.min.css',
  './node_modules/lightbox2/dist/css/lightbox.min.css',
  './src/scss/main.scss'
];

gulp.task('clean', function () {
  return gulp.src('./public')
    .pipe(clean());
});

gulp.task('style', function () {
  return gulp.src(style)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(isProd, cssnano()))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('js', function () {
  return gulp.src(scripts)
    .pipe(gulpif(isProd, uglify()))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('assets', function () {
  return gulp.src('./src/assets/fonts/*')
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('images', function () {
  return gulp.src('./src/assets/images/*')
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/scss/*.scss', './src/scss/pages/*.scss', './src/scss/components/*.scss'], ['style']);
  gulp.watch(scripts, ['js']);
  gulp.watch('./src/assets/images/', ['images']);
  gulp.watch('./src/*.html', ['html']);
});

gulp.task('default', gulpSequence('clean', ['style', 'assets', 'js', 'html', 'images']));
