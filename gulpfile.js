'use strict';

var gulp = require('gulp')
    , sass = require('gulp-sass')
    , browserSync = require('browser-sync').create()
    , gulpClean = require('gulp-clean');

var pathSass = "./app/**/*.scss"
    , pathHtml = "./app/**/*.html";

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(gulpClean());
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(['app/**/*', '!' + pathSass])
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src(pathSass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app'));
});

gulp.task('server', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch(pathSass, ['sass', browserSync.reload]);
    gulp.watch(pathHtml, [browserSync.reload]);
});