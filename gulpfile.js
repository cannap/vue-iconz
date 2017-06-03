var gulp = require('gulp')
var svgscaler = require('svg-scaler')
var imagemin = require('gulp-imagemin')
var icons = [
  './icons/mdi/icons/svg/*.svg',
  './icons/fa/black/svg/*.svg',
  './icons/oct/lib/svg/*.svg',
  './icons/ti/src/svg/*.svg',
  './icons/ion/src/*.svg'
]

gulp.task('default', function () {
  return gulp
    .src(icons, { base: '.' })
    .pipe(svgscaler({ width: 40 }))
    .pipe(imagemin([imagemin.svgo({ plugins: [{ removeTitle: true }] })]))
    .pipe(gulp.dest('./tmpicon/'))
})
