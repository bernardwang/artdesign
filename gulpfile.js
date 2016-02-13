/************ DEPENDENCIES ************/

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var sync = require('browser-sync');
var rimraf = require('rimraf');
var _ = require('lodash');
var fs = require('fs');

/************ HELPER VARIABLES AND FUNCTIONS ************/

// Location constants
var ALL_HTML = './dist/**/*.html';
var ALL_SASS = './src/sass/**/*.scss';
var ALL_JS = './src/js/app.js';
var ALL_IMG	= './src/img/*';
var ALL_FONTS	= './src/fonts/**/*.{eot,ttf,woff,eof,svg}';

var DIST_JS	= './dist/assets/js/';
var DIST_CSS = './dist/assets/css/';
var DIST_IMG = './dist/assets/img/';
var DIST_FONTS = './dist/assets/fonts/';

// Browserify and babel functions
var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(ALL_JS, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source('app.js'))
    .pipe(gulp.dest(DIST_JS))
    .pipe(sync.reload({ stream: true }));
}

gulp.task('build-persistent', function() {
  return bundle();
});

/************ TASKS ************/

/**
 *	Compile SASS to CSS
 */
gulp.task('sass', function() {
	gulp.src(ALL_SASS)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(cssnano({
    	autoprefixer: {browsers: ['last 2 versions'], add: true}
		}))
    .pipe(gulp.dest(DIST_CSS));
});

/**
 *	Build JS bundle
 */
gulp.task('js', ['build-persistent'], function() {
  process.exit(0);
});

/**
 *	Move Fonts
 */
gulp.task('fonts', function(){
	gulp.src(ALL_FONTS)
  	.pipe(gulp.dest(DIST_FONTS));
});

/**
 *	Compress and move images
 */
gulp.task('img', function(){
	gulp.src(ALL_IMG)
		.pipe(imagemin({
			progressive: true,
			multipass: true,
			interlaced: true,
			optimizationLevel : 3
		}))
		.pipe(gulp.dest(DIST_IMG));
});

/**
 *	Auto build and reload
 */
gulp.task('watch', ['sass','build-persistent'], function() {
  sync({
    server: {
      baseDir: './dist/',
			reloadDelay: 1000
    }
  });

	// js watch
  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
	// css watch
	gulp.watch(ALL_SASS, ['sass']).on('change', sync.reload);
	// html watch
	gulp.watch(ALL_HTML).on('change', sync.reload);
});

/**
 *	Web server
 */
gulp.task('serve', function () {
  sync({
    server: {
      baseDir: './dist/'
    }
  });
});
