/************ DEPENDENCIES ************/

import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import sync from 'browser-sync';
import _ from 'lodash';

/************ OPTIONS ************/

const browserifyOptions = {
	debug: true
};
const watchifyOptions = _.extend(
	browserifyOptions, watchify.args
);
const babelifyOptions = {
	presets: ["es2015"]
	//presets: ["es2015", "react"]
};
const eslintOptions = {
	//extends : 'eslint:recommended',
	extends : 'airbnb',
	parser : 'babel-eslint',
  rules : {
		'indent': [2, 'tab']
	}
}
const autoprefixerOptions = {
	browsers: ['last 2 versions'],
	add: true
}
const cssnanoOptions = {
  autoprefixer: autoprefixerOptions
}
const imageminOptions = {
	progressive: true,
	multipass: true,
	interlaced: true,
	optimizationLevel : 3
};
const syncOptions = {
  stream: true,
};

/************ HELPER VARIABLES AND FUNCTIONS ************/

// Location constants
const SRC_HTML = './dist/**/*.html';
const SRC_SASS = './src/sass/**/*.scss';
const SRC_JS = './src/js/**/*.js';
const SRC_IMG	= './src/img/*';

const DEST_JS	= './dist/assets/js/';
const DEST_CSS = './dist/assets/css/';
const DEST_IMG = './dist/assets/img/';

const DIST_CSS = './dist/assets/css/*.css';
const DIST_JS = './dist/assets/js/*.js';

const ENTRY_JS = './src/js/app.js';

// Browserify function
let bundler;
function getBundler(watch) {
  if (!bundler) { // Initialize bundle with conditional 'watch'
		if (watch) {
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
gulp.task('styles', () => {
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
gulp.task('min-styles', ['styles'], () => {
	return gulp.src(DIST_CSS)
		.pipe(cssnano(cssnanoOptions))
    .pipe(gulp.dest(DEST_CSS));
});

/**
 *	Builds JS persistently when needed
 */
gulp.task('scripts-watch', () => {
  return getBundler( true ) // Watchify
    .transform(babelify, babelifyOptions)
		.bundle().on('error', (err) => console.log('Error: ' + err.message))
    .pipe(source('app.js'))	// output name
    .pipe(gulp.dest(DEST_JS))
    .pipe(sync.reload(syncOptions));
});

/**
 *	Builds JS once
 */
gulp.task('scripts', () => {
  return getBundler( false ) // Not watchifying
    .transform(babelify, babelifyOptions)
		.bundle().on('error', (err) => console.log('Error: ' + err.message))
    .pipe(source('app.js'))	// output name
    .pipe(gulp.dest(DEST_JS));
});

/**
 *	Minify JS
 */
gulp.task('min-scripts', ['scripts'], () => {
	return gulp.src(DIST_JS)
		.pipe(uglify())
    .pipe(gulp.dest(DEST_JS));
});

/**
 *	Lint JS
 */
gulp.task('lint-scripts', () => {
  gulp.src(SRC_JS)
    .pipe(eslint(eslintOptions))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 *	Compress and move images
 */
gulp.task('min-img', () => {
	gulp.src(SRC_IMG)
		.pipe(imagemin(imageminOptions))
		.pipe(gulp.dest(DEST_IMG));
});

/**
 *	Auto build and reload
 */
gulp.task('watch', ['styles','scripts-watch'], () => {
  sync({
    server: {
      baseDir: './dist/'
    }
  });

	// Reloads on HTML, CSS, and JS changes
	gulp.watch(SRC_SASS, ['styles']);
	gulp.watch(SRC_HTML).on('change', sync.reload);
  getBundler().on('update', () => gulp.start('scripts-watch'));
});

/**
 *	Production build
 */
gulp.task('prod', ['min-img','lint-scripts','min-styles','min-scripts'], function() {
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
