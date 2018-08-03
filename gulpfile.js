/**
 *  Created by WebLss on 2018/8/3
 */
var gulp = require('gulp')

var sass = require('gulp-sass')

var minifyCss = require('gulp-minify-css')

var plumber = require('gulp-plumber')

var babel = require('gulp-babel')

var uglify = require('gulp-uglify')

var clearnHtml = require('gulp-cleanhtml')

var imagemin = require('gulp-imagemin')

var copy = require('gulp-contrib-copy')

var browserSync = require('browser-sync').create()

var reload = browserSync.reload

// 定义源代码的目录和编译压缩后的目录
var src = 'public/src'

var dist = 'public/dist'

var viewSrc = 'views/src'
var viewDist = 'views/dist'
// 编译全部scss 并压缩
gulp.task('css', function () {
  gulp.src(src + '/**/*.scss')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest(dist))
})

// 编译全部js 并压缩
gulp.task('js', function () {
  gulp.src(src + '/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dist))
})

// 压缩全部html
gulp.task('html', function () {
  gulp.src(src + '/**/*.+(html|ejs)')
    .pipe(clearnHtml())
    .pipe(gulp.dest(dist))
  // 编译视图文件
  gulp.src(viewSrc + '/**/*.+(html|ejs)')
    .pipe(clearnHtml())
    .pipe(gulp.dest(viewDist))
})

// 压缩全部image
gulp.task('image', function () {
  gulp.src([src + '/**/*.+(jpg|jpeg|png|gif|bmp)'])
    .pipe(imagemin())
    .pipe(gulp.dest(dist))
})

// 其他不编译的文件直接copy
gulp.task('copy', function () {
  gulp.src(src + '/**/*.!(jpg|jpeg|png|gif|bmp|scss|js|html|ejs)')
    .pipe(copy())
    .pipe(gulp.dest(dist))
})

// 自动刷新
gulp.task('server', function () {
  browserSync.init({
    proxy: 'veekergdn.com', // 指定代理url
    notify: false // 刷新不弹出提示
  })
  // 监听scss文件编译
  gulp.watch(src + '/**/*.scss', ['css'])

  // 监听其他不编译的文件 有变化直接copy
  gulp.watch(src + '/**/*.!(jpg|jpeg|png|gif|bmp|scss|js|html)', ['copy'])

  // 监听html文件变化后刷新页面
  gulp.watch(src + '/**/*.js', ['js']).on('change', reload)

  // 监听html文件变化后刷新页面
  gulp.watch(src + '/**/*.+(html|ejs)', ['html']).on('change', reload)

  // 监听css文件变化后刷新页面
  gulp.watch(dist + '/**/*.css').on('change', reload)
})

// 监听事件
gulp.task('default', ['css', 'js', 'image', 'html', 'copy'])
