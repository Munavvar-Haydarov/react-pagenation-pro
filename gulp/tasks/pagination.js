var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var config = require('../config')

gulp.task('pagination', function() {
    return browserify(config.pagination.src, {'standalone': 'ReactPagination'})
        .transform(reactify)
        .bundle()
        .pipe(source('react-pagination.js'))
        .pipe(gulp.dest(config.pagination.dest));
});