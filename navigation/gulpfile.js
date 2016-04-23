var gulp = require('gulp'),
	sass = require('gulp-sass'),
	tpl = require('gulp-tpl'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	buildPath = '..';

gulp.task('sass', function () {
  gulp.src('templates/**/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('deploy/'));
});

gulp.task('scripts', function () {
	gulp.src('templates/**/scripts/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(gulp.dest('deploy/'));
});

gulp.task('hbs', function() {
  return gulp.src('templates/**/html/*.hbs')
        .pipe(tpl.html())
        .pipe(gulp.dest('deploy/'));
});

gulp.task('webserver', function() {
	connect.server({
	    root: buildPath
 	});
});
 
gulp.task('dev', ['hbs','scripts','sass','webserver'], function () {
	gulp.watch('templates/**/html/*.hbs', ['hbs']);
	gulp.watch('templates/**/scripts/*.js', ['scripts']);
	gulp.watch('templates/**/scss/*.scss', ['sass']);
});