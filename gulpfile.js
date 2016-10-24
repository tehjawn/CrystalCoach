// gulpfile.js
// Stores various tasks to be automated by Gulp task runner

var gulp = require('gulp')
var app_server = require('./server.js')
var chimp = require('gulp-chimp')
var typescript = require('gulp-tsc')

var server_config

gulp.task('default', function() {
	console.log("Running Gulp in testing environment...")
	server_config = {
		port: 8000,
		env: "test"
	}
	runServer()
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

	singletonServer(server_config)

	// Watches public folder and restarts Express server on change
	console.log("Watching ~/public/**...")
	autoReload()
}

function autoReload() {
	gulp.watch(['public/**'], function() {
		buildAll()
		singletonServer(server_config)
		console.log("Detected change! Reloading server...")
	})
}

function singletonServer(config) {
	if (!app_server){
		try {
			app_server.create({ port: config.port })
		} catch(e) {
			console.log("Cannot create server. Is there a server already running on port " + config.port + "?")
			console.log(e)
		}
	} else {
		app_server.destroy()
		app_server.create({ port: config.port })
	}
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