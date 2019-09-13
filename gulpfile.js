// подключаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

// порядок подключения css
const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
]
// порядок подключения js
const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js' 
]

// Таск на стили css
function styles() {
    // шаблон для поиска файлов css
    // все файлы по шаблону './src/css/**/*.css
    return gulp.src(cssFiles)
    // Объединение файлов в один
    .pipe(concat('style.css'))
    //добавление префиксов
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    //Минификация CSS
    .pipe(cleanCSS({
        level: 2
    }))
    // выходная папка для стилей
    .pipe(gulp.dest('./bild/css'))
}

// Таск для скриптов JS
function scripts() {
    // шаблон для поиска файлов css
    // все файлы по шаблону './src/js/**/*.js
    return gulp.src(jsFiles)
    //объединение файлов в один
    .pipe(concat('script.js'))
    //минификация js
    .pipe(uglify({
        toplevel: true
    }))
    // выходная папка для скриптов
    .pipe(gulp.dest('./bild/js'))
}
//
function clean(){
    return del(['bild/*'])
}
//
function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}
// Таск вызывающий функцию styles
gulp.task('styles', styles);
// Таск вызывающий функцию scripts
gulp.task('scripts', scripts);
//таска для очистки папкиBild
gulp.task('del', clean);