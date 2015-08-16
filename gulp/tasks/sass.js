import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import {sass as config} from '../config';


let sassTask = () => {
  return gulp.src(config.src)
    .pipe(sass(config.settings))
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest(config.dest));
};

gulp.task('sass', sassTask);

export default sassTask;