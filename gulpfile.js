/**
 * Gulp build file
 */
var gulp = require('gulp');

/**
 * Load plugins
 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');

/**
 * Define paths.
 * Files will be read in the order found here.
 * So for example, classes.js will be read before controllers.js because
 * the controllers depend on classes.
 */
var paths = {
  scripts: [
    'src/scripts/*.js',
    'src/scripts/**/*.js'
  ],
  styles: [
    'src/styles/*.scss',
    'src/styles/**/*.scss',
  ]
};

/**
 * Build scripts
 */
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist'));
});

/**
 * Build less.
 * The pipe order is significant since style.less depends on mixins.less
 * So we will first concat files, then build with less.
 */
gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(concat('styles.min.css'))
        .pipe(sass({
            compress: true
        }))
        .pipe(gulp.dest('dist'));
});

/**
 * Watch less files for changes
 */
gulp.task('watch-less', function () {
  gulp.watch(paths.styles, ['styles']);
});

/** 
 * Run development tasks
 */
gulp.task('default', ['styles', 'watch-less']);

/** 
 * Build production app
 */
gulp.task('build', ['scripts', 'styles']);
