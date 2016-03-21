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

var assets = {
  scripts: [
    'assets/jquery/dist/jquery.min.js',
    'assets/angular/angular.min.js',
    'assets/bootstrap/dist/js/bootstrap.min.js'
  ]
};

var app = {
  scripts: [
    'src/scripts/*.js',
    'src/scripts/**/*.js'
  ],
  styles: [
    'src/styles/*.scss',
    'src/styles/**/*.scss',
  ]
};

/*
 Build assets
*/
gulp.task('assets-scripts', function() {
  return gulp.src(assets.scripts)
    .pipe(concat('assets.min.js'))
    .pipe(gulp.dest('dist'))
});

/**
 * Build app scripts
 */
gulp.task('app-scripts', function() {
  return gulp.src(app.scripts)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist'));
});

/*
 Build styles
*/
gulp.task('assets-styles', function() {
  return gulp.src(assets.styles)
    .pipe(concat('assets.min.css'))
    .pipe(gulp.dest('dist'))
});

gulp.task('app-styles', function() {
    return gulp.src(app.styles)
        .pipe(concat('app.min.css'))
        .pipe(sass({
            compress: true
        }))
        .pipe(gulp.dest('dist'));
});

/**
 * Watch less files for changes
 */
gulp.task('watch-scripts', function () {
  gulp.watch([app.scripts], ['app-scripts']);
});

/** 
 * Run development tasks
 */
gulp.task('default', ['styles', 'watch-less']);

/** 
 * Build production app
 */
gulp.task('build', ['scripts', 'styles']);
