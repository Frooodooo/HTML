var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-gulpif');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runsequence = require('run-sequence');
gulp.task('hello', function () {
    console.log('Hello World!');
})

gulp.task('sass', function () {
    return gulp.scr(('app/scss/**/*.scss')
        .pipe(sass())
        .pipe.gulp.dest('app/css'))
        .pipe.browserSync.require({
            stream: true
        });
})


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
})

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})
gulp.task('useref', function () {
    return gulp.scr('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('dist'))

})
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dest/images'))
})
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})
gulp.task('clean.dist', function () {
    return del.sync('dist');
})
gulp.task('build', function (callback) {
    runsequence('clean.dist', ['sass', 'useref', 'fonts', 'images'],
        callback)
})
gulp.task('default', function () {
    runsequence(['sass', 'browserSync', 'watch'],
        callback)
})