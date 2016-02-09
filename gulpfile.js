var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


var paths = {
    js: ['./public/scripts/*.jsx'],
    app_js: ['./public/app.jsx']
};

//Trasnform jsx files from jsx to js, then bundle them
gulp.task('js', function(){
    browserify(paths.app_js)
        .transform(reactify)
        .bundle().on('error', onError)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public'));
});

//Run the "js" task when files are changed
gulp.task('watch', function(){
    gulp.watch(paths.app_js, ['js']);
    gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['watch']);

function onError(err){
    console.log(err);
    this.emit('end');
};

