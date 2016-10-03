var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('buildJS', function () {
	// Grabs all JS files in browser
	// Grabs app.js FIRST
 return gulp.src(['./browser/app/app.js','./browser/**/*.js'])
    		// concats everything into a main.js file
        .pipe(concat('main.js'))
        // and saves it in the public dir
        .pipe(gulp.dest('./public/'));
});


gulp.task('buildCSS', function () {
	gulp.src('./browser/sass.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./public/'));
});


gulp.task('transferHTML', function() {
	return gulp.src('./browser/**/*.html')
				 .pipe(gulp.dest('./public/'));
})


gulp.task('watch', function () {
	gulp.watch('./browser/**/*.js', ['buildJS']);
	gulp.watch('./browser/**/*.scss', ['buildCSS']);
	gulp.watch('./browser/**/*.html', ['transferHTML']);
});


gulp.task('default', ['buildJS','buildCSS','transferHTML','watch']);
