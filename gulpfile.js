var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');


gulp.task('buildJS', function() {
	// Grabs all files in browser
 return gulp.src('./browser/js/**/*.js')
    		// concats everything together into a main.js file
        .pipe(concat('main.js'))
        // and saves it in the directory
        .pipe(gulp.dest('./browser/'));
});


gulp.task('buildCSS', function() {
	gulp.src('./browser/scss/index.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./browser/'));
});


gulp.task('watch', function() {
	gulp.watch('./browser/js/**/*.js', ['buildJS']);
	gulp.watch('./browser/scss/**/*.scss', ['buildCSS']);
});


gulp.task('default', ['buildJS', 'buildCSS', 'watch']);
