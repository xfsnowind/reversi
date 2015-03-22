var gulp = require('gulp'),
    browserify = require("browserify"),
    closureCompiler = require('gulp-closure-compiler'),
    compilerTar = require('superstartup-closure-compiler'),
    del = require("del"),
    transform = require('vinyl-transform'),

    paths = {
        scripts: "src/*.js",
        entryJs: "src/app.js"
    };

gulp.task("prod", function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
      });

    gulp.src(paths.entryJs)
        .pipe(browserified)
        .pipe(closureCompiler({
            compilerPath: compilerTar.getPath(),
            fileName: 'reversi.js',
            compilerFlags: {
                // closure_entry_point: 'app.main',
                // compilation_level: 'SIMPLIY_OPTIMIZATIONS',
                compilation_level: 'ADVANCED_OPTIMIZATIONS',
                // define: [
                //   "goog.DEBUG=false"
                // ],
                // externs: [
                //   'bower_components/este-library/externs/react.js'
                // ],
                // extra_annotation_name: 'jsx',
                // Some compiler flags (like --use_types_for_optimization) don't have value. Use null.
                // use_types_for_optimization: null,
                // only_closure_dependencies: true,
                // output_wrapper: '(function(){%output%})();',
                // warning_level: 'VERBOSE'
            } }))
        .pipe(gulp.dest('deploy/js'));
        // .pipe(gulp.dest('build/js'))
});

gulp.task("dev", function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
      });

    gulp.src([paths.entryJs])
        .pipe(browserified)
        .pipe(closureCompiler({
            compilerPath: compilerTar.getPath(),
            fileName: 'reversi.js',
            compilerFlags: {
                debug: true,
                language_in: "ECMASCRIPT5",
                compilation_level: 'WHITESPACE_ONLY'
            } }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['dev']);
});

gulp.task('scripts', ['clean'], function() {
    del(["deploy/js" /*,"deploy/reversi.css"*/]);
});

gulp.task('default', ['dev', 'watch']);
