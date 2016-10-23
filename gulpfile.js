// gulpfile.js
// Stores various tasks to be automated by Gulp task runner

var gulp = require('gulp')
var server = require('./server.js')
var chimp = require('gulp-chimp')

gulp.task('default', function() {
	console.log("Running Gulp!")
})

gulp.task('help', function() {
	console.log("Available gulp tasks:")
	console.log("-->")
})

gulp.task("test:client", function() {
	console.log("Running CrystalCoach Clientside Unit Tests...")
})

gulp.task('test:server', function() {
	console.log("Running CrystalCoach Serverside Unit Tests...")
	return chimp('chimp.conf.js')
})

gulp.task('dev', function() {
	console.log("Serving CrystalCoach for Development...")
})

gulp.task('deploy', function() {
	console.log("Deploying CrystalCoach...")
})