var gulp        = require('gulp')
var sass        = require('gulp-sass')
var del         = require('del')
var browserSync = require('browser-sync').create()
var cachebuster = require('gulp-cachebust')
var cachebust = new cachebuster()

gulp.task('clean', function () {
  return del(['./style.*.css', './main.*.js'])
})

gulp.task('sass', function() {
  return gulp.src("src/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(cachebust.resources())
    .pipe(gulp.dest("./"))
})

gulp.task('js', function() {
  return gulp.src("src/*.js")
    .pipe(cachebust.resources())
    .pipe(gulp.dest("./"))
})

gulp.task('html', ['clean', 'sass', 'js'], function () {
  return gulp.src('src/index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('./'))
})

gulp.task('serve', ['html'], function() {
  browserSync.init({
    server: "./",
    notify: false,
    ghostMode: false
  })
  gulp.watch("src/*", ['html', browserSync.reload])
})

gulp.task('default', ['serve'])