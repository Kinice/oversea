var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('styles', function() {
  return gulp.src('./static/less/*.less')
    .pipe(less())
    .pipe(minifycss())
    .pipe(gulp.dest('../public/styles'))
    .pipe(notify({ message: 'styles task complete' }));
});

gulp.task('default', ['styles']);
