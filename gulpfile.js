var gulp = require('gulp');

var concat = require('gulp-concat');
var del = require('del');
var expect = require('gulp-expect-file');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var ngHtml2Js = require('gulp-ng-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var flatten = require('gulp-flatten');

var mapsLocation = './maps/';

function dist() {
    return gulp.dest('./dist/');
}

function web() {
    return gulp.dest('./web/');
}

gulp.task('clean', function (cb) {
    return del(['web/**/*', 'dist/**/*'],
        {force: true},
        cb);
});


gulp.task('js', ['clean'], function () {
    return gulp.src([
        'src/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
        .pipe(concat('bs-dialogue.js'))
        .pipe(ngAnnotate())
        .pipe(dist());


});

gulp.task('views', ['clean'], function () {
    return gulp.src('src/*.html')
        .pipe(flatten())
        .pipe(ngHtml2Js({moduleName: 'bsDialogue'}))
        .pipe(concat("bs-dialogue-views.js"))
        .pipe(dist());
});

gulp.task('bundle', ['js', 'views'], function () {
    return gulp.src([
        'dist/bs-dialogue.js',
        'dist/bs-dialogue-views.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bs-dialogue.min.js'))
        // Note: ugilfy + sourcemaps is bugged (so you'll need to comment this out as needed).
        .pipe(uglify())
        .pipe(sourcemaps.write(mapsLocation))
        .pipe(dist());
});

gulp.task('vendor', ['clean'], function () {

    // Note: Order is important here so don't (do what I did) and change the order...
    var vendor = [
        'bower_components/angular/angular.js',
        'vendor/ui-bootstrap/ui-bootstrap-custom-0.13.0.js',
        'vendor/ui-bootstrap/ui-bootstrap-custom-tpls-0.13.0.js'
    ];

    return gulp.src(vendor)
        .pipe(expect(vendor))
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.min.js"))
        // Note: ugilfy + sourcemaps is bugged (so you'll need to comment this out as needed).
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(web());
});
gulp.task('html', ['bundle', 'vendor'], function () {
    return gulp.src('app/index.html')
        .pipe(inject(
            gulp.src([
                'web/vendor.min.js',
                'bower_components/bootstrap/dist/css/bootstrap.min.css',
                'dist/bs-dialogue.min.js'
            ], {read: false}),
            {ignorePath: 'web/', addRootSlash: false, relative: true}
        ))
        .pipe(web())
        .pipe(notify({
            onLast: true,
            message: 'Build complete'
        }));
});


gulp.task('default', ['html'], function () {
    // place code for your default task here
});