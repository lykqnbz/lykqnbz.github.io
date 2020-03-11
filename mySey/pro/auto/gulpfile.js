const gulp = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const del = require('del')

gulp.task('clean', () => {
  return new Promise((resolve, reject) => {
    del.sync('build')
    resolve()
  })
})
gulp.task('less', () => {
  return new Promise((resolve, reject) => {
    gulp.src(['src/**/*.less'])
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('build'))
    resolve()
  })
})

gulp.task('default', gulp.series(['clean', 'less'], () => {
  return new Promise((resolve, reject) => {
    console.log('over!')
    resolve()
  })
}))

