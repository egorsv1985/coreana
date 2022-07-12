import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие css файла
import webpcss from 'gulp-webpcss'; // Вывод webp изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, {
			sourcemaps: app.isDev
		})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: 'Error: <%= error.message %>'
			})))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(app.plugins.if(
			app.isBuild, groupCssMediaQueries()))
		.pipe(app.plugins.if(
			app.isBuild, webpcss({
				webpClass: ".webp", // Браузер поддерживает изображения webp
				noWebpClass: ".nowebp" // Браузер не поддерживает изображения webp
			})))
		.pipe(app.plugins.if(
			app.isBuild, autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 3 version"],
				cascade: true
			})))
		.pipe(app.gulp.dest(app.path.build.css)) // Не сжатый файл
		.pipe(app.plugins.if(
			app.isBuild, cleanCss())) // Сжатие файла
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}