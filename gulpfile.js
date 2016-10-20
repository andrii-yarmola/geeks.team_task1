'use strict';

const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const browserSync = require('browser-sync').create();
const webpackConfig = require('./webpack.config');
const mockServer = require('gulp-mock-server');

const buildScripts = (function() {
	const delay = 500;
	let timer;

	return cb => {
		clearTimeout(timer);
		timer = setTimeout(() => webpack(webpackConfig, cb), delay);
	};
}());

const serve = (cb) => (
	browserSync.init({
		server: {
			baseDir: './dist',
			index: 'index.html',
			notify: false
		},
		files: [path.resolve(__dirname, 'dist/**/*.*')]
	}, cb)
);

const watch = () => {
	gulp.watch(
		[path.resolve(__dirname, 'src/**/*.*')],
		buildScripts
	);
};

const mock = () => {
	gulp.src('.')
	.pipe(mockServer({
		port: 8090
	}));
};

gulp.task(
	'default',
	gulp.series(
		buildScripts,
		serve,
		gulp.parallel(mock, watch)
	)
);
