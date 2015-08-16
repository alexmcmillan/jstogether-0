import gulp from 'gulp';
import browserify from 'browserify';
import {browserify as config} from '../config';
import stream from 'vinyl-source-stream';

gulp.task('browserify', () => {
	let b = browserify(config);

	let bundle = () => {
		return b.bundle()
			.pipe(stream(config.outputName))
			.pipe(gulp.dest('./public'));
	};

	b.on('update', bundle);
	return bundle();
});