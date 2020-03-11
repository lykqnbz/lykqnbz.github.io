const gulp = require('gulp')

gulp.task('default', () => {
  return new Promise(function(resolve, reject) {
    console.log('HTTP Server Started')
    resolve()
  })
})
