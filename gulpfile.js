let project_folder = './dist';
let source_folder = './src';


let paths = {
    build: {
        html: "./index.html",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: "./index.html",
        scss: source_folder + "/**/*.scss",
        js: source_folder + "/**/*.js",
        img: source_folder + "/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/**/*.{ttf,eot,svg,woff,woff2}",
    },
    watch: {
        html: "./index.html",
        scss: source_folder + "/**/*.scss",
        js: source_folder + "/**/*.js",
        img: source_folder + "/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: project_folder
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    concat = require("gulp-concat"),
    browserSync = require("browser-sync").create(),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');


scss.compiler = require("node-sass");

/*** FUNCTIONS ***/

function clean() {
    return del(paths.clean);
}

function fonts() {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.build.fonts))
}


function css() {
    return src(paths.src.scss, {allowEmpty: true})
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(scss().on("error", scss.logError))
        .pipe(concat("index.min.css"))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(cleanCSS())
        .pipe(dest(paths.build.css))
        .pipe(browserSync.stream())
}

function js() {
    return src(paths.src.js, {allowEmpty: true})
        .pipe(uglify())
        .pipe(concat("index.min.js"))
        .pipe(dest(paths.build.js))
        .pipe(browserSync.stream())
}

function images() {
    return src(paths.src.img)
        .pipe(
            imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [
                    {
                        removeViewBox: true
                    }
                ]
            })
        )
        .pipe(dest(paths.build.img))
        .pipe(browserSync.stream())
}

let build = gulp.series(js, css);

function browserSyncWatcher() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000,
        notify: false
    })
    gulp.watch(paths.src.scss, css).on("change", browserSync.reload)
    gulp.watch(paths.src.js, js).on("change", browserSync.reload)
    gulp.watch(paths.src.img, images).on("change", browserSync.reload)
    gulp.watch(paths.src.html, build).on("change", browserSync.reload)

}

gulp.task("default", gulp.series(clean, fonts, gulp.parallel(build, images), browserSyncWatcher))
