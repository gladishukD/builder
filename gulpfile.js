var gulp = require ('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    pngquant = require('imagemin-pngquant'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create();

gulp.task('default',['concat','sass','fileinclude', 'imagemin', 'browser-sync']);

gulp.task('make-sprite',['sprite','replace']);

gulp.task('replace', ['sprite'] ,function(){
    gulp.src(['dev/scss/temp/sprite.scss'])
        .pipe(replace('url(#{$sprite-image})', 'url(../img/#{$sprite-image})'))
        .pipe(gulp.dest('dev/scss/abstracts'));
    setTimeout(function(){
        return gulp.src('dev/scss/temp', {
            read: false
        })
            .pipe(clean());
    },1000)
});

gulp.task('sass', function () {
    gulp.src('./dev/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            // errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths,
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('dev/img/**/*', ['imagemin']);
    gulp.watch('dev/scss/*.scss',['sass']);
    gulp.watch('dev/scss/**/*.scss',['sass']);
    gulp.watch('dev/chunks/*.html',['fileinclude']);
    gulp.watch('dev/templates/*.html',['fileinclude']);
    gulp.watch(['index.html']).on('change', browserSync.reload);
});

//Optimize Images
gulp.task('imagemin', function () {
    gulp.src('dev/img/**/*')
        .pipe(newer('img/'))
        .pipe(imagemin({
            svgoPlugins: [{removeViewBox: false}, {removeUselessStrokeAndFill:false}],
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('img/'));
});

//Sprite Generator

gulp.task('sprite', function () {
    var spriteData = gulp.src('img/sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        algorithm: 'binary-tree',
    }));
    spriteData.img.pipe(gulp.dest('img/'));
    spriteData.css.pipe(gulp.dest('dev/scss/temp/'));
});

gulp.task('fileinclude', function() {
    gulp.src(['./dev/templates/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('concat', function() {
    return gulp.src(['./dev/js/jquery-3.2.1.min.js', './dev/js/lib/*.js'])
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});
