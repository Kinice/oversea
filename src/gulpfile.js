var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

var Browsersync = require('browser-sync').create();
var reload      = Browsersync.reload;

gulp.task('styles', function() {
  return gulp.src('./static/less/*.less')
    .pipe(less())
    .pipe(minifycss())
    .pipe(gulp.dest('../public/styles'))
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'styles task complete' }));
});

gulp.task('browser-sync',['styles'], function() {
    Browsersync.init({
        proxy: "http://localhost:63342/oversea/views/index.html",
        baseDir:"./",
        port: 63342,
        uiPort: 63343
    });
    gulp.watch('./static/less/*.less', ['styles']);
    gulp.watch('../views/*.html').on('change', reload);
    gulp.watch('../public/scripts/*.js').on('change', reload);
});
gulp.task('default', ['browser-sync']);
/*
gulp.task('default',['styles']);*/
