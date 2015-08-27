var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');

gulp.task('default', function () {
  return browserify({
      entries: path.join(__dirname, 'lib', 'rebounce.js'),
      standalone: 'window.rebounce',
    })
    .bundle()
    .pipe(source('rebounce.js'))
    .pipe(gulp.dest('dist'))
  ;
});
