const { src, dest, task, series, parallel, watch } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const autoPrefixer = require('gulp-autoprefixer');
const devServer = require('browser-sync').create();
// const pxToRem = require("gulp-smile-px2rem");
const groupMediaQueries = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const sourceMaps = require("gulp-sourcemaps");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => src('dist/**/*', { read: false }).pipe(rm()))

task("copy:scss", () => src('src/**/*.scss').pipe(dest('dist')));
task("copy:html", () => src('src/**/*.html').pipe(dest('dist')).pipe(devServer.reload({ stream: true })));

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/styles/main.scss'
];

task('styles', () => src(styles)
    .pipe(gulpif(env === "dev", sourceMaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(pxToRem())
    .pipe(autoPrefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulpif(env === "prod", groupMediaQueries()))
    .pipe(gulpif(env === "prod", cleanCss()))
    .pipe(gulpif(env === "dev", sourceMaps.write()))
    .pipe(dest('dist/styles'))
    .pipe(devServer.reload({ stream: true }))
);

const jsLibs = [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/jquery-touchswipe/jquery.touchSwipe.min.js",
    "node_modules/mobile-detect/mobile-detect.min.js",
    "src/**/*.js"
]

task("scripts", () => src(jsLibs)
    .pipe(gulpif(env === "dev", sourceMaps.init()))
    .pipe(concat('main.min.js', { newLine: ";" }))
    .pipe(gulpif(env === "prod", babel({
        presets: ['@babel/env']
    })))
    .pipe(gulpif(env === "prod", uglify()))
    .pipe(gulpif(env === "dev", sourceMaps.write()))
    .pipe(dest('dist'))
    .pipe(devServer.reload({ stream: true }))
);

task("icons", () => src("src/img/*.svg")
    .pipe(dest('dist/img'))
)

task("images", () => src("src/img/*.png")
    .pipe(dest('dist/img'))
)

task('devServer', () => {
    devServer.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    })
})

task("watch", () => {
    watch("./src/styles/**/*.scss", series("styles"));
    watch("./src/*.html", series("copy:html"));
    watch("./src/**/*.js", series("scripts"));
})



task('default', series('clean', parallel('copy:html', 'styles', 'scripts', 'icons', 'images'), parallel('watch', 'devServer')));

task('build', series('clean', parallel('copy:html', 'styles', 'scripts', 'icons', 'images')));