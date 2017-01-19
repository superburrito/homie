const gulp = require('gulp'); // <-- "pipes" modules
const babel = require('gulp-babel'); // <-- transpiles es6 into es5
const concat = require('gulp-concat');
const sass = require('gulp-sass');


gulp.task('buildJS', function () {
	// Grabs all JS files in browser
	// Grabs app.js FIRST
	return gulp.src(['./browser/app/app.js','./browser/**/*.js',"!./browser/service-worker.js"])
 				// convert into ES6
 				.pipe(babel({
 					// configure babel presets for transpiling
 					presets: ["es2015"]
 				}))
    		// concats everything into a main.js file
        .pipe(concat('main.js'))
        // and saves it in the public dir
        .pipe(gulp.dest('./public/'));
});


gulp.task('buildServiceWorker', function () {
	return gulp.src('./browser/service-worker.js')
		.pipe(babel({ presets: ["es2015"] }))
		.pipe(gulp.dest('./public'));
});

gulp.task('buildManifest', function () {
	return gulp.src('./browser/manifest.json')
		.pipe(gulp.dest('./public'));
});

gulp.task('buildCSS', function () {
	return gulp.src('./browser/sass.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./public/'));
});


gulp.task('transferHTML', function () {
	return gulp.src('./browser/**/*.html')
				 .pipe(gulp.dest('./public/'));
});

gulp.task('transferMedia', function () {
	return gulp.src('./browser/media/*.*')
					.pipe(gulp.dest('./public/media'));
});


gulp.task('watch', function () {
	gulp.watch('./browser/**/*.js', ['buildJS']);
	gulp.watch('./browser/service-worker.js', ['buildServiceWorker']);
	gulp.watch('./browser/manifest.json', ['buildManifest']);
	gulp.watch('./browser/**/*.scss', ['buildCSS']);
	gulp.watch('./browser/**/*.html', ['transferHTML']);
	gulp.watch('./browser/media/*.*', ['transferMedia']);
});

gulp.task('build', ['buildJS', 'buildServiceWorker', 'buildManifest', 'buildCSS','transferHTML','transferMedia']);

gulp.task('default', ['build','watch']);
