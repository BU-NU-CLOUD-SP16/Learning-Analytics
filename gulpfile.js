var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


var paths = {
    js: ['./public/scripts/*.jsx'],
    app_js: ['./public/app.jsx'],
    teacher_js: ['./public/scripts/graph_app.jsx'],
    student_js: ['./public/scripts/graph_app-student.jsx']
};

//Trasnform jsx files from jsx to js, then bundle them
gulp.task('js', function(){
    browserify(paths.app_js)
        .transform(reactify)
        .bundle().on('error', onError)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public'));
});

gulp.task('teacher_js', function(){
    browserify(paths.teacher_js)
        .transform(reactify)
	.bundle().on('error', onError)
        .pipe(source('teacher_bundle.js'))
        .pipe(gulp.dest('./public'));
        
});

gulp.task('student_js', function(){
    browserify(paths.student_js)
        .transform(reactify)
        .bundle().on('error', onError)
        .pipe(source('student_bundle.js'))
        .pipe(gulp.dest('./public'));

});

//Run the "js" task when files are changed
gulp.task('watch', function(){
    gulp.watch(paths.app_js, ['js']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.teacher_js, ['teacher_js']);
    gulp.watch(paths.student_js, ['student_js']); 
});

gulp.task('default', ['watch']);

function onError(err){
    console.log(err);
    this.emit('end');
};

