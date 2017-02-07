var gulp = require('gulp');
var tsNodeRegister = require("ts-node/register");
var mocha = require("gulp-mocha");
var argv = require("yargs").argv;

gulp.task('test', function () {
    const DEFAULT_TEST_PATH = "test/*.ts";
    return gulp.src(argv.path ? argv.path : DEFAULT_TEST_PATH)
        .pipe(mocha({
            require: tsNodeRegister
        }));
});