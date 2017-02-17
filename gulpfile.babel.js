/************ DEPENDENCIES ************/

import gulp from 'gulp';
import changed from 'gulp-changed';
import del from 'del';
import source from 'vinyl-source-stream';
import handlebars from 'gulp-handlebars';
import wrap from 'gulp-wrap';
import declare from 'gulp-declare';
import concat from 'gulp-concat';
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
import deploy from 'gulp-gh-pages';
import _ from 'lodash';

/************ Options ************/

const declareOpts = {
	namespace: 'app.templates',
	noRedeclare: true, // Avoid duplicate declarations
}
const browserifyOpts = {
	debug: true
};
const watchifyOpts = _.extend(
	browserifyOpts, watchify.args
);
const eslintOpts = {
	//"extends": "eslint:recommended",
	//"extends": "airbnb",
	"env": {
		"es6": true,
		"browser": true,
	},
	"globals": [
		"window",
		"document",
		"$",
	],
	"rules": {
		"max-len": ["warn", { "code": 150 }],
		"no-unused-vars": ["warn", { "vars": "all", "args": "after-used" }],
		"prefer-template": "off",
		"camelcase": "warn",
		"no-tabs": "off",
		"no-plusplus": "off",
		"indent": ["error", "tab"],
		"arrow-body-style": ["warn"],
		"import/prefer-default-export": "off",
		"no-mixed-operators": "off",
	}
}
const sassOpts = {
	//includePaths: ["./node_modules/typey/stylesheets"] // include typey
}
const autoprefixerOpts = {
	browsers: ['> 1%'],
	add: true
}
const cssnanoOpts = {
	autoprefixer: autoprefixerOpts
}
const imageminOpts = {
	progressive: true,
	multipass: true,
	interlaced: true,
	optimizationLevel : 3
};
const syncOpts = {
	stream: true,
};
const deployOpts = {
	//branch: 'master', // user page website
};

/************ HELPER VARIABLES AND FUNCTIONS ************/

// Location constants
const SRC_HTML = './src/**/*.html';
const SRC_TEMPLATES = './src/templates/*.*'
const SRC_ASSETS = './src/**/*.*';
const SRC_IMG = './src/img/*.*';
const SRC_SASS = './src/sass/**/*.*';
const SRC_JS = './src/js/**/*.*';
const SRC_VENDORJS = './src/js/vendor/*.js';		// not include in babel build
const ENTRY_JS = './src/js/app.js';					// js entry point for babel

const DEST_HTML = './dist/';
const DEST_ASSETS = './dist/assets/';
const DEST_JS = './dist/assets/js/';
const DEST_VENDORJS = './dist/assets/js/vendor/';
const DEST_CSS = './dist/assets/css/';
const DEST_IMG = './dist/assets/img/';

const DIST_CSS = './dist/assets/css/*.css';
const DIST_JS = './dist/assets/js/*.js';

// Browserify function
let bundler;
function getBundler(watch) {
	if (!bundler) { // Initialize bundle with conditional 'watch'
		if (watch) {
			bundler = watchify(browserify(ENTRY_JS, watchifyOpts));
		} else {
			bundler = browserify(ENTRY_JS, browserifyOpts);
		}
	}
	return bundler;
};

/************ TASKS ************/

/**
 *	Moves HTML
 */
gulp.task('pages', ['templates'], () => {
	gulp.src(SRC_HTML)
		.pipe(gulp.dest(DEST_HTML))
  		.pipe(sync.reload(syncOpts));
});

/**
 *	Compiles templates
 */
gulp.task('templates', () => {
	gulp.src(SRC_TEMPLATES)
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare(declareOpts))
		.pipe(concat('templates.js'))
  		.pipe(gulp.dest(DEST_JS));
});

/**
 *	Compile SASS to CSS
 */
gulp.task('styles', () => {
	return gulp.src(SRC_SASS)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOpts).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOpts))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DEST_CSS))
		.pipe(sync.reload(syncOpts));
});

/**
 *	Minify CSS
 */
gulp.task('min-styles', ['styles'], () => {
	gulp.src(DIST_CSS)
		.pipe(cssnano(cssnanoOpts))
		.pipe(gulp.dest(DEST_CSS));
});

/**
 *  Moves vendor js files
 */
gulp.task('scripts-vendor', () => {
	gulp.src(SRC_VENDORJS)
		.pipe(changed(DEST_VENDORJS))
		.pipe(gulp.dest(DEST_VENDORJS));
});

/**
 *	Builds JS once
 */
gulp.task('scripts', ['scripts-vendor'], () => {
	return getBundler( false ) // Not watchifying
		.transform(babelify) // Babelify options in package.json
			.bundle().on('error', (err) => console.log('Error: ' + err.message))
		.pipe(source('app.js'))
		.pipe(gulp.dest(DEST_JS));
});

/**
 *	Builds JS persistently when needed
 */
gulp.task('watch-scripts', ['scripts-vendor'], () => {
	return getBundler( true ) // Watchify
		.transform(babelify) // Babelify options in package.json
			.bundle().on('error', (err) => console.log('Error: ' + err.message))
		.pipe(source('app.js'))	// Output name
		.pipe(gulp.dest(DEST_JS))
		.pipe(sync.reload(syncOpts));
});

/**
 *	Lint JS
 */
gulp.task('lint-scripts', () => {
	gulp.src([SRC_JS, '!'+SRC_VENDORJS, '!'+'./src/js/lib/http.js'])
		.pipe(eslint(eslintOpts))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

/**
 *	Minify js
 */
gulp.task('min-scripts', ['scripts'], () => {
	gulp.src(DIST_JS)
		.pipe(uglify())
		.pipe(gulp.dest(DEST_JS));
});

/**
 *	Move assets
 */
gulp.task('assets', () => {
	gulp.src([SRC_ASSETS, '!'+SRC_HTML, '!'+SRC_TEMPLATES, '!'+SRC_SASS, '!'+SRC_JS]) // fix this string shit
		.pipe(changed(DEST_ASSETS))
		.pipe(gulp.dest(DEST_ASSETS))
		.pipe(sync.reload(syncOpts));
});

/**
 *	Starts browsersync
 */
gulp.task('browsersync', () => {
	sync({
		server: {
			baseDir: './dist/'
		}
	});
});

/**
 *	Reloads on HTML, CSS, ASSET & JS changes
 */
gulp.task('watcher', () => {
	gulp.watch([SRC_HTML, SRC_TEMPLATES], ['pages']);
	gulp.watch(SRC_SASS, ['styles']);
	gulp.watch([SRC_ASSETS, '!'+SRC_SASS, '!'+SRC_JS, '!'+SRC_HTML], ['assets']);
	getBundler().on('update', () => gulp.start('watch-scripts'));
});

/************ USE THESE PLS ************/

/**
 *	dev - auto builds and browsersync
 */
gulp.task('dev', ['pages', 'styles', 'watch-scripts', 'assets', 'watcher', 'browsersync']);

/**
 *	dist - prod build
 */
gulp.task('prod', ['pages', 'min-styles', 'lint-scripts', 'min-scripts', 'assets']);

/**
 *	clean - deletes dist folder
 */
gulp.task('clean', () => {
	return del(DEST_HTML);
});

/**
 *	min-imgs - compress and move images
 */
gulp.task('min-imgs', () => {
	gulp.src(SRC_IMG)
		.pipe(imagemin(imageminOpts))
		.pipe(gulp.dest(DEST_IMG));
});

/**
 *	deploy - prod build once, minified images, then deploys to gh-pages
 */
gulp.task('deploy', ['prod'], () => {
	return gulp.src('./dist/**/*')
		.pipe(deploy(deployOpts));
});