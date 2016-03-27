/**
 * Gulp build file
 */
var gulp = require('gulp');

/**
 * Load plugins
 */
var config = require('./gulpconfig.json');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');
var exec   = require('gulp-exec');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var livereload = require('gulp-livereload');

var assets = {
  scripts: [
    'assets/jquery/dist/jquery.min.js',
    'assets/angular/angular.min.js',
    'assets/angular-route/angular-route.min.js',
    'assets/angular-resource/angular-resource.min.js',
    'assets/bootstrap/dist/js/bootstrap.min.js'
  ],
  styles: [
    'assets/bootstrap/dist/css/bootstrap.min.css'
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
  ],
  images: [
    'src/images/*'
  ],
  views: [
    'src/views/*.html',
    'src/views/**/*.html'
  ],
  index: 'src/index.html'
};

/*
 Build assets
*/
gulp.task('assets-scripts', function() {
  return gulp.src(assets.scripts)
    .pipe(concat('assets.min.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('assets-styles', function() {
  return gulp.src(assets.styles)
    .pipe(concat('assets.min.css'))
    .pipe(gulp.dest('dist'))
});

/*
 Build app
 */
gulp.task('app-scripts', function() {
  return gulp.src(app.scripts)
    .pipe(sourcemaps.init())
    // .pipe(ngAnnotate())
    .pipe(uglify({mangle: false}))
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('app-styles', function() {
  return gulp.src(app.styles)
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.css'))
      .pipe(sass({outputStyle: 'compact'}))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest('dist'))
      .pipe(livereload());
});

gulp.task('app-views', function() {
  
  gulp.src(app.views)
    .pipe(templateCache())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());

  gulp.src(app.index)
    .pipe(gulp.dest('dist'))

});

gulp.task('jshint', function() {
  gulp.src(app.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});


gulp.task('assets', ['assets-scripts', 'assets-styles']);

gulp.task('app', ['app-scripts', 'app-styles', 'app-views']);


gulp.task('serve', function(){
  gulp.src('')
    .pipe(exec('caddy -conf Caddyfile', {continueOnError: false}));
});

/*
 Watch for changes
 */
gulp.task('watch', function () {
  gulp.watch([app.scripts], ['app-scripts', 'jshint']);
  gulp.watch([app.styles], ['app-styles']);
  gulp.watch([app.views, app.index], ['app-views']);
});

gulp.task('livereload', function(){
  livereload.listen();
});

/** 
 * Build production app
 */
gulp.task('prod', ['assets', 'app', 'jshint']);


var devTasks = ['assets', 'app', 'watch'];

if(config.enableServe) {
  devTasks.push('serve');
}

if(config.enableLivereload) {
  devTasks.push('livereload');
}

/** 
 * Run development tasks
 */
gulp.task('dev', devTasks);

/*
 Default task
*/
gulp.task('default', ['dev']);
