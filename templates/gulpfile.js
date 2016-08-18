var gulp         = require('gulp')
var stylus       = require('gulp-stylus')
var uglifycss    = require('gulp-uglifycss')
var autoprefixer = require('gulp-autoprefixer')
var plumber      = require('gulp-plumber')
var pug          = require('gulp-pug')
var nodemon      = require('gulp-nodemon')
var browserSync  = require('browser-sync').create();

gulp.task('stylus', function(){
    gulp.src('src/stylus/main.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(plumber.stop())
        .pipe(uglifycss({
          "maxLineLen": 80,
          "uglyComments": true
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./app/css'))
})

gulp.task('pug', function() {
    gulp.src('./src/pug/**/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./app'))
})

gulp.task('nodemon', function (cb) {
    var started = false;    
    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true; 
        } 
    });
});

gulp.task('server',['nodemon'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        browser: "google chrome",
        port: 7000,
    });
})

gulp.task('watch', function(){
    gulp.watch('src/stylus/**/*.styl', ['stylus']);
    gulp.watch('src/pug/**/*.pug', ['pug']);
})

gulp.task('build', ['pug', 'stylus'])