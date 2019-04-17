const gulp = require("gulp"),
 sass = require("gulp-sass"),
 browserSync = require("browser-sync"),
 cleanCss = require("gulp-clean-css"),
 concat = require("gulp-concat"),
 terser = require('gulp-terser'),
 autoprefixer = require('gulp-autoprefixer'),
 pngquant = require('imagemin-pngquant'),
 imagemin = require('gulp-imagemin')
 cache = require('gulp-cache'),
 babel = require('gulp-babel'),
 htmlmin = require('gulp-htmlmin'),
 wait = require('gulp-wait')
 
 gulp.task("sass", function() {
    gulp.src("src/scss/*.scss")
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    })
})

gulp.task("cleanCss", function() {
    gulp.src("src/css/*.css")
    .pipe(concat("style.css"))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false}))
    .pipe(cleanCss())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({
        stream: true
    }))
})

 gulp.task('htmlmin', () => {
   return gulp.src('src/*.html')
     .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('dist'))
     .pipe(browserSync.reload({
        stream: true
    }))
 });

gulp.task('imagemin', function()  {
  gulp.src('src/img/*')
    .pipe(cache(imagemin([
      pngquant({ quality: [0.5, 0.5], speed: 4 })
    ])))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task("scripts", function() {
    gulp.src("src/js/assets/*.js")
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("src/js"))
    .pipe(babel({presets: ['babel-preset-es2015']}))
    .pipe(terser())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('watch', ['browserSync', 'sass', 'cleanCss', 'scripts' , 'imagemin', 'htmlmin'], function(){
    gulp.watch("src/scss/**/*.scss", ["sass"]);
    gulp.watch('src/*.html', ['htmlmin']);
    gulp.watch('src/css/**/*.css', ['cleanCss']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/img/*', ['imagemin']);
})

gulp.task('build', ['htmlmin', 'sass', 'cleanCss', 'scripts', 'imagemin']);


