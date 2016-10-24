// gulpfile.js
// Stores various tasks to be automated by Gulp task runner

var gulp = require('gulp')
var server = require('./server.js')
var chimp = require('gulp-chimp')
var typescript = require('gulp-tsc')

gulp.task('default', function() {
	console.log("Running Gulp in testing environment...")
	runServer({
		port: 8000
	})
})

gulp.task('help', function() {
	console.log("Available gulp tasks:")
	console.log("--> gulp\t\t:\tServes application in testing environment")
	console.log("--> gulp test:client\t:\tRuns clientside unit tests")
	console.log("--> gulp test:server\t:\tRuns serverside unit tests")
	console.log("--> gulp dev\t\t:\tServes application in development environment")
	console.log("--> gulp deploy\t\t:\tServes application in production environment")
	return
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

function runServer(config) {
	buildAll()

	// If a server already exists within this runtime, destroy it and create a new one
	// Otherwise, proceed with creating a new server
	if (server){
		server.create({ port: config.port })
	} else {
		server.destroy()
		server.create({ port: config.port })
	}

	// Watches public folder and restarts Express server on change
	console.log("Watching ~/public/**...")
	gulp.watch(['public/**'], function() {
		buildTypescript()
		server.destroy()
		console.log("Detected change! Reloading server...")
		server.create({ port: config.port })
	})
}

function buildAll() {
	console.log("Building files...")
	// buildTypescript()
}

// Currently broken. Do not use please
// function buildTypescript() {
// 	gulp.src(['public/**/*.ts'])
// 		.pipe(typescript())
// 		.pipe(gulp.dest('dest/'))
// }