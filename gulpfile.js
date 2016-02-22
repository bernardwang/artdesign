/************ DEPENDENCIES ************/

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var sync = require('browser-sync');
var _ = require('lodash');

/************ OPTIONS ************/
var syncOptions = {
  stream: true,
};
var eslintOptions = {
	extends : 'eslint:recommended',
	//extends : 'airbnb',
	parser : 'babel-eslint',
  rules : {
    'strict' : 0
	}
}
var cssnanoOptions = {
  autoprefixer: {
		browsers: ['last 2 versions'],
		add: true
	}
}
var imageminOptions = {
	progressive: true,
	multipass: true,
	interlaced: true,
	optimizationLevel : 3
};
var browserifyOptions = _.extend({ debug: true }, watchify.args);

/************ HELPER VARIABLES AND FUNCTIONS ************/

// Location constants
var ALL_HTML = './dist/**/*.html';
var ALL_SASS = './src/sass/**/*.scss';
var ALL_JS = './src/js/**/*.js';		// JS ENTRY POINT
var ENTRY_JS = './src/js/app.js';
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
    bundler = watchify(browserify(ENTRY_JS, browserifyOptions));
  }
  return bundler;
};

gulp.task('build-persistent', function() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(ENTRY_JS))	// JS entry point
    .pipe(gulp.dest(DIST_JS))
    .pipe(sync.reload(syncOptions));
});

/************ TASKS ************/

/**
 *	Compile SASS to CSS
 */
gulp.task('sass', function() {
	return gulp.src(ALL_SASS)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano(cssnanoOptions))
		.pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_CSS))
		.pipe(sync.reload(syncOptions));
});

/**
 *	Build JS once
 */
gulp.task('js', ['build-persistent'], function() {
  process.exit(0);
});

/**
 *	Lint JS
 */
gulp.task('lint', function() {
  return gulp.src(ALL_JS)
    .pipe(eslint(eslintOptions))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
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
		.pipe(imagemin(imageminOptions))
		.pipe(gulp.dest(DIST_IMG));
});

/**
 *	Auto build and reload
 */
gulp.task('watch', ['sass','build-persistent'], function() {
  sync({
    server: {
      baseDir: './dist/'
    }
  });

	// Reloads on HTML, CSS, and JS changes
	gulp.watch(ALL_SASS, ['sass']);
	gulp.watch(ALL_HTML).on('change', sync.reload);
  getBundler().on('update', function() {
    gulp.start('build-persistent');
  });
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
