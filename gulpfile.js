/**
 * Created by Giorgi Parunov @SoxPan on 12/30/16.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');


var files = require('./gulpfile.json');

gulp.task('js:libs', function () {

    gulp.src(files.scripts.libs)
        .pipe(concat('libs.js'))
        .pipe(uglify({mangle: false}))
        .pipe(debug({title: 'Output:'}))
        .pipe(size({title: 'Size:'}))
        .pipe(notify("Created File: <%= file.relative %>!"))
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('js:app', function() {
    gulp.src(files.scripts.app)
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: false}))
        .pipe(debug({title: 'Output:'}))
        .pipe(size({title: 'Size:'}))
        .pipe(notify("Created File: <%= file.relative %>!"))
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('sass', function() {
    gulp.src('./media/scss/**/*.scss')
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(cssnano())
        .pipe(debug({title: 'Output:'}))
        .pipe(size({title: 'Size:'}))
        .pipe(notify("Created File: <%= file.relative %>!"))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('watch', function(){
    gulp.watch('./media/scss/**/*.scss', ['sass']);
    gulp.watch(files.scripts.libs, ['js:libs']);
    gulp.watch(files.scripts.app, ['js:app']);
});