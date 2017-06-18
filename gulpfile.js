let gulp = require('gulp'),
	browserSync = require('browser-sync'),
	csslint = require('gulp-csslint'),
	cssnano = require('gulp-cssnano'),
	del = require('del'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass');

let csslintConfig = require('./.csslintrc.json'),
	cssNanoConfig = {autoprefixer: {browsers: ['last 2 version', 'ie 10', 'ios 7', 'android 4']}, discardUnused: false, minifyFontValues: false};

gulp.task('clear', function(cb) {
	return del('./build/**/*', cb);
});

gulp.task('css', function(){
	return gulp.src('./styles/styles.scss')
		.pipe(sass())
		.pipe(csslint(csslintConfig))
		.pipe(csslint.formatter())
		.pipe(gulp.dest('./build/styles'))
		.pipe(cssnano(cssNanoConfig))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./build/styles'))
		.pipe(browserSync.stream());
});

gulp.task('js', function(){
	return gulp.src('./scripts/**/*.js')
		.pipe(gulp.dest('./build/scripts'))
		.pipe(browserSync.stream());
});

gulp.task('index', function() {
	return gulp.src('./index.html')
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
});

gulp.task('images', function() {
	return gulp.src('./images/**/*')
		.pipe(gulp.dest('./build/images'))
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
			baseDir: './build'
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
