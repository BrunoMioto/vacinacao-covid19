"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const cp = require("child_process");
const csso = require('gulp-csso');
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const terser = require('gulp-terser');
const sourcemaps = require("gulp-sourcemaps");

// CSS task
function css() {
	return gulp
		.src([
			"node_modules/bootstrap/dist/css/bootstrap.css",
			"node_modules/bootstrap-table/dist/bootstrap-table.css",
			"./assets/sass/*.scss",
		])
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(
			postcss([
				autoprefixer(),
			])
		)
		.pipe(csso({
			restructure: true,
			debug: false
		}))
		.pipe(concat("./style.min.css"))
		.pipe(sourcemaps.write("./assets/maps"))
		.pipe(gulp.dest("./"));
}

// Scripts
// -- Transpile, concatenate and minify scripts
function js() {
	return gulp
		.src([
			"node_modules/jquery/dist/jquery.js",
			"node_modules/bootstrap/dist/js/bootstrap.bundle.js",
			"node_modules/bootstrap-table/dist/bootstrap-table.js",
			"node_modules/bootstrap-table/dist/locale/bootstrap-table-pt-BR.js",
			"node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export.js",
			"node_modules/chroma-js/chroma.js",
			"node_modules/moment/moment.js",
			"node_modules/moment/locale/pt-br.js",
			"node_modules/numeral/numeral.js",
			"node_modules/moment/locale/pt-br.js",
			"./assets/js/*.js",
		])
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(concat("./scripts.min.js"))
		.pipe(terser())
		.pipe(sourcemaps.write("./assets/maps"))
		.pipe(gulp.dest("./"));
}

// Watch files
function watchFiles() {
	gulp.watch(
		[
			"node_modules/bootstrap/dist/css/bootstrap.css",
			"node_modules/bootstrap-table/dist/bootstrap-table.css",
			"./assets/sass/*.scss",
		],
		{ usePolling: true },
		gulp.parallel(css)
	);

	gulp.watch(
		[
			"node_modules/jquery/dist/jquery.js",
			"node_modules/bootstrap/dist/js/bootstrap.bundle.js",
			"node_modules/tableexport.jquery.plugin/tableExport.js",
			"node_modules/tableexport.jquery.plugin/libs/jsPDF/jspdf.min.js",
			"node_modules/tableexport.jquery.plugin/libs/jsPDF-AutoTable/jspdf.plugin.autotable.js",
			"node_modules/bootstrap-table/dist/bootstrap-table.js",
			"node_modules/bootstrap-table/dist/locale/bootstrap-table-pt-BR.js",
			"node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export.js",
			"node_modules/chroma-js/chroma.js",
			"node_modules/moment/moment.js",
			"node_modules/moment/locale/pt-br.js",
			"node_modules/numeral/numeral.js",
			"node_modules/moment/locale/pt-br.js",
			"./assets/js/*.js",
		],
		{ usePolling: true },
		gulp.parallel(js)
	);
}

// Define complex tasks
const build = gulp.series(gulp.parallel(css, js));
const watch = gulp.parallel(watchFiles);

// Export Tasks
exports.build = build;
exports.watch = watch;
exports.default = build;
