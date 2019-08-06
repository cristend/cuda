/*
plugin: 
	_gulp-deleted
	_gulp-collate
	_gulp-changed
package:
	_gulp -v.3.
	_brower-sync
*/
// import package
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var deleted = require('gulp-deleted');
var collate = require('gulp-collate');
var changed = require('gulp-changed');
// path
var img_src = 'src/images/*', img_dest='build/images/';
var css_src = 'src/styles/*css', css_dst = 'build/styles/';
// Write task
	//Live Reload
gulp.task('browserSync',['image','styles'],function(){
	browserSync.init({
		server: "./"
	});
	//Update styles
	gulp.watch(css_src,['styles']);
	//Update image
	gulp.watch(img_src,['image']);
	//Update HTML
	gulp.watch('./*html').on('change',browserSync.reload);
	//handle delete img-event
	gulp.watch(img_src).on('change',function(event){
		if(event.type === 'deleted'){
			browserSync.reload();
		}
	});
});
	//Reload style
gulp.task('styles',function(){
	gulp.src([css_src])
	.pipe(gulp.dest(css_dst))
	.pipe(browserSync.reload({
		stream: true
	}));
});
	//Update images
gulp.task('image',['update-image'],function(){
	
	gulp.src(img_src)
		.pipe(gulp.dest(img_dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});
	//update delete image
gulp.task('update-image',function(){
	gulp.src(img_src)
		.pipe(collate('images'))
		.pipe(deleted(img_dest,"*"))
		.pipe(changed(img_dest))
		.pipe(gulp.dest(img_dest));
});
	//Default task
gulp.task('default',['browserSync']);