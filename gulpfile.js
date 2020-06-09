const path = {
    docs: {
        html: './docs/',
        js: './docs/js/',
        css: './docs/css/',
        img: './docs/images/',
        fonts: './docs/fonts/',
        libs: './docs/libs/'
    },
    src: {
        html: './src/pug/pages/*.pug',
        js: './src/js/main.js',
        css: './src/styles/*.scss',
        img: './src/images/**/*.*',
        fonts: './src/fonts/**/*.*',
        lib: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/slick-carousel/slick/slick.css',
            './node_modules/slick-carousel/slick/slick-theme.css',
            './node_modules/slick-carousel/slick/slick.min.js',
            './src/libs/**/*.*'
        ]
    },
    watch: {
        html: './src/pug/**/*.pug',
        js: './src/js/main.js',
        css: './src/styles/**/*.scss',
        img: './src/images/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    clean: './docs/*'
};

const gulp = require('gulp');
const scss = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cache');
const rimraf = require('gulp-rimraf');
const pug = require('gulp-pug');
const webserver = require('browser-sync').create();
const rigger = require('gulp-rigger');
const gcmq = require('gulp-group-css-media-queries');
const jpegrecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');


gulp.task('webserver', function () {
    webserver.init({
        server: {
            baseDir: "./docs/"
        }
    });
});

gulp.task('html:docs', function () {
    return gulp.src(path.src.html)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Pug',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(pug())
        .pipe(gulp.dest(path.docs.html))
        .pipe(webserver.stream());
});

gulp.task('css:docs', function () {
    return gulp.src(path.src.css)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'scss',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(autoprefixer('> 2% or last 5 versions'))
        .pipe(gcmq())
        .pipe(gulp.dest(path.docs.css))
        // .pipe(rename({
        //    suffix: '.min'
        // }))
        // .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.docs.css))
        .pipe(webserver.stream());
});

gulp.task('js:docs', function () {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.docs.js))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.docs.js))
        .pipe(webserver.stream());
});

gulp.task('fonts:docs', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.docs.fonts));
});

gulp.task('lib:docs', function () {
    return gulp.src(path.src.lib)
        .pipe(gulp.dest(path.docs.libs));
});

gulp.task('image:docs', function () {
    return gulp.src(path.src.img)
        .pipe(cache(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            // imagemin.jpegtran({
            //    progressive: true
            // }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ])))
        .pipe(gulp.dest(path.docs.img));
});

gulp.task('clean:docs', function () {
    return gulp.src(path.clean, {
        read: false
    })
        .pipe(rimraf());
});

gulp.task('cache:clear', function () {
    cache.clearAll();
});

gulp.task('docs',
    gulp.series('clean:docs',
        gulp.parallel(
            'html:docs',
            'css:docs',
            'js:docs',
            'fonts:docs',
            'lib:docs',
            'image:docs'
        )
    )
);

gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.parallel('html:docs'));
    gulp.watch(path.watch.css, gulp.parallel('css:docs'));
    gulp.watch(path.watch.js, gulp.parallel('js:docs'));
    gulp.watch(path.watch.img, gulp.parallel('image:docs'));
    gulp.watch(path.watch.fonts, gulp.parallel('fonts:docs'));
});

gulp.task('default', gulp.series('docs', gulp.parallel('webserver', 'watch')));