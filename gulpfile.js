var gulp = require('gulp');
//var less = require('gulp-less');
var path = require('path');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
    js: ['./public/scripts/*.jsx'],
    app_js: ['./public/app.jsx'],
    teacher_js: ['./public/scripts/graph_app.jsx'],
    student_js: ['./public/scripts/graph_app-student.jsx'],
    index_less: ['./public/dist/css/index.less'],
    teacher_less: ['./public/dist/css/teacher.less'],
    custom_less: ['./public/dist/css/custom.less']
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

gulp.task('index_less', function () {
  return gulp.src('./public/dist/css/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('teacher_less', function () {
  return gulp.src('./public/dist/css/teacher.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('custom_less', function () {
  return gulp.src('./public/dist/css/custom.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/dist/css'));
});

//Run the "js" task when files are changed
gulp.task('watch', function(){
    gulp.watch(paths.app_js, ['js']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.teacher_js, ['teacher_js']);
    gulp.watch(paths.student_js, ['student_js']);
    gulp.watch(paths.index_less, ['index_less']);
    gulp.watch(paths.teacher_less, ['teacher_less']);
    gulp.watch(paths.custom_less, ['custom_less']);
});

gulp.task('default', ['watch']);

function onError(err){
    console.log(err);
    this.emit('end');
};
