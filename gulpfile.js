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
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var sync = require('browser-sync');
var _ = require('lodash');

/************ OPTIONS ************/

var browserifyOptions = {
	debug: true
};
var watchifyOptions = _.extend(
	browserifyOptions, watchify.args
);
var babelifyOptions = {
	presets: ["es2015", "react"]
};
var eslintOptions = {
	//extends : 'eslint:recommended',
	extends : 'airbnb',
	parser : 'babel-eslint',
  rules : {
		'indent': [2, 'tab']
	}
}
var autoprefixerOptions = {
	browsers: ['last 2 versions'],
	add: true
}
var cssnanoOptions = {
  autoprefixer: autoprefixerOptions
}
var imageminOptions = {
	progressive: true,
	multipass: true,
	interlaced: true,
	optimizationLevel : 3
};
var syncOptions = {
  stream: true,
};

/************ HELPER VARIABLES AND FUNCTIONS ************/

// Location constants
var SRC_HTML = './dist/**/*.html';
var SRC_SASS = './src/sass/**/*.scss';
var SRC_JS = './src/js/**/*.js';
var ENTRY_JS = './src/js/app.js';
var SRC_IMG	= './src/img/*';
var SRC_FONTS	= './src/fonts/**/*.{eot,ttf,woff,eof,svg}';

var DEST_JS	= './dist/assets/js/';
var DEST_CSS = './dist/assets/css/';
var DEST_IMG = './dist/assets/img/';
var DEST_FONTS = './dist/assets/fonts/';

var DIST_CSS = './dist/assets/css/*.css';
var DIST_JS = './dist/assets/js/*.js';

// Browserify function
var bundler;
function getBundler(watch) {
  if (!bundler) {
		if (watch) { // Conditional bundler
    	bundler = watchify(browserify(ENTRY_JS, watchifyOptions));
		} else {
    	bundler = browserify(ENTRY_JS, browserifyOptions);
		}
  }
  return bundler;
};

/************ TASKS ************/

/**
 *	Compile SASS to CSS
 */
gulp.task('sass', function() {
	return gulp.src(SRC_SASS)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_CSS))
		.pipe(sync.reload(syncOptions));
});

/**
 *	Minify CSS
 */
gulp.task('css', ['sass'], function() {
	return gulp.src(DIST_CSS)
		.pipe(cssnano(cssnanoOptions))
    .pipe(gulp.dest(DEST_CSS));
});

/**
 *	Builds JS when needed
 */
gulp.task('build-persistent', function() {
  return getBundler( true ) // Watchify
    .transform(babelify, babelifyOptions)
		.bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source('app.js'))	// output name
    .pipe(gulp.dest(DEST_JS))
    .pipe(sync.reload(syncOptions));
});

/**
 *	Builds JS once
 */
gulp.task('build', function() {
  return getBundler( false ) // Not watchifying
    .transform(babelify, babelifyOptions)
		.bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source('app.js'))	// output name
    .pipe(gulp.dest(DEST_JS));
});

/**
 *	Minify JS
 */
gulp.task('js', ['build'], function() {
	return gulp.src(DIST_JS)
		.pipe(uglify())
    .pipe(gulp.dest(DEST_JS));
});

/**
 *	Lint JS
 */
gulp.task('lint', function() {
  return gulp.src(SRC_JS)
    .pipe(eslint(eslintOptions))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 *	Move Fonts
 */
gulp.task('fonts', function(){
	gulp.src(SRC_FONTS)
  	.pipe(gulp.dest(DEST_FONTS));
});

/**
 *	Compress and move images
 */
gulp.task('img', function(){
	gulp.src(SRC_IMG)
		.pipe(imagemin(imageminOptions))
		.pipe(gulp.dest(DEST_IMG));
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
	gulp.watch(SRC_SASS, ['sass']);
	gulp.watch(SRC_HTML).on('change', sync.reload);
  getBundler().on('update', function() {
    gulp.start('build-persistent');
  });
});

/**
 *	Production build
 */
gulp.task('prod', ['css','js'], function() {
  sync({
    server: {
      baseDir: './dist/'
    }
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
