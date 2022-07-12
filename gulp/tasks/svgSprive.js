import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: 'Error: <%= error.message %>'
			})))
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../icons/sprite.svg',
					// Создавать страницу с перечнем иконок
					example: true
				}
			},
		}))
		.pipe(app.gulp.dest(`${app.path.build.images}`));
}


function sprite() {
	return src(sourceFolder + '/img/icons/**/*.svg')
		.pipe(svgstore({
			inlineSvg: true
		}))

		.pipe(rename("sprite.svg"))
		.pipe(dest(buildFolder + '/img/icons'))
};