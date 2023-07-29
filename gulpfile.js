const gulp = require('gulp');
const sass  = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
var babel = require("gulp-babel");
var runSequence = require('run-sequence');



gulp.task('sass-compile', function () {
   return gulp.src('./src/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
   //   .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/css'))
      //.pipe(gulp.)
})
gulp.task('watch', function () {
   gulp.watch('./src/**/*.scss', gulp.series('sass-compile'));
   gulp.watch('src/index.js', gulp.series('default'));
   gulp.watch('src/index.html', gulp.series('html-copy'));
})

gulp.task("default", function () {
  return gulp.src("src/index.js")
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("html-copy", function () {
   return gulp.src("src/index.html")
     .pipe(gulp.dest("dist"));
});

// gulp.task('develop', function(done) {
//    runSequence('sass-compile', 'default', 'html-copy', 'watch' );
// });
gulp.task('develop', gulp.series('sass-compile', 'default', 'html-copy', 'watch'))