import gulp from 'gulp'
import ghPages from 'gulp-gh-pages'

export const deploy = (cb) => {
	gulp.src('./dist/**/*')
		.pipe(ghPages());
	cb();
}

// gulp.task('deploy', function () {
// 	return gulp.src('./dist/**/*')
// 		.pipe(ghPages());
// });