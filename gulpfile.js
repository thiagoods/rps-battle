const gulp = require('gulp'),
	babel = require('gulp-babel'),
	browserSync = require('browser-sync'),
	browserify = require('browserify'),
	concat = require('gulp-concat'),
	csslint = require('gulp-csslint'),
	cssnano = require('gulp-cssnano'),
	del = require('del'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	source = require('vinyl-source-stream'),
	uglify = require('gulp-uglify');

const csslintConfig = require('./.csslintrc.json'),
	cssNanoConfig = {autoprefixer: {browsers: ['last 2 version', 'ie 10', 'ios 7', 'android 4']}, discardUnused: false, minifyFontValues: false},
	jshintConfig = require('./.jshintrc.json');

gulp.task('clear', function(cb) {
	return del('./docs/**/*', cb);
});

gulp.task('css', function(){
	return gulp.src('./styles/styles.scss')
		.pipe(sass())
		.pipe(csslint(csslintConfig))
		.pipe(csslint.formatter())
		.pipe(gulp.dest('./docs/styles'))
		.pipe(cssnano(cssNanoConfig))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./docs/styles'))
		.pipe(browserSync.stream());
});

gulp.task('js', function(){
	browserify('./scripts/controller.js')
		.transform('babelify', {'presets': ['babili']})
		.bundle()
		.pipe(source('app.js'))
		.pipe(jshint(jshintConfig))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'))
		.pipe(gulp.dest('./docs/scripts'))

	return browserify('./scripts/controller.js')
		.transform('babelify', { 'presets': ['env', 'babili'] })
		.bundle()
		.pipe(source('app.compat.js'))
		.pipe(gulp.dest('./docs/scripts'))
		.pipe(browserSync.stream());
});

gulp.task('index', function() {
	return gulp.src('./index.html')
		.pipe(gulp.dest('./docs'))
		.pipe(browserSync.stream());
});

gulp.task('images', function() {
	return gulp.src('./images/**/*')
		.pipe(gulp.dest('./docs/images'))
		.pipe(browserSync.stream());
});

gulp.task('browsersync', function() {
	browserSync({
		ghostMode: {
			clicks: true,
			forms: true,
			location: true,
			scroll: true
		},
		server: {
			baseDir: './docs'
		},
		watchTask: true
	});
});

gulp.task('default', ['clear'], function() {
	gulp.start('index', 'images', 'js', 'css');
});

gulp.task('dev', ['index', 'images', 'js', 'css'], function(){
		gulp.start('browsersync');
		gulp.watch('./index.html', { debounceDelay: 400 }, ['index', browserSync.reload])
		gulp.watch('./scripts/*.js', ['js'])
		gulp.watch('./styles/*.scss', ['css'])
		gulp.watch('./images/**/*', ['images'])
	});
