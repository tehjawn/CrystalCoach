// gulpfile.js
// Stores various tasks to be automated by Gulp task runner

var gulp = require('gulp')
var chimp = require('gulp-chimp')
var run = require('gulp-run')

var app_server = require('./server.js')
var typescript = require('gulp-tsc')

var server_config

// gulp : Runs the default server configuration for testing and development purposes
gulp.task('default', function() {
	console.log("Running Gulp in testing environment (for more options use 'gulp help')...")
	server_config = {
		port: 8000,
		env: "test"
	}
	runServer()
})

// gulp help : Lists all available gulp tasks
gulp.task('help', function() {
	console.log("Available gulp tasks:")
	console.log("--> gulp\t\t:\tServes application in testing environment")
	console.log("--> gulp build:ts\t:\tCompiles Typescript files to JS [WIP]")
	console.log("--> gulp build:sass\t:\tCompiles Sass files to CSS [WIP]")
	console.log("--> gulp test:client\t:\tRuns clientside unit tests [WIP]")
	console.log("--> gulp test:server\t:\tRuns serverside unit tests")
	console.log("--> gulp dev\t\t:\tServes application in development environment [WIP]")
	console.log("--> gulp deploy\t\t:\tServes application in production environment [WIP]")
	return
})

// gulp test:client : Runs all client-side testing scripts
gulp.task("test:client", function() {
	console.log("Running CrystalCoach Clientside Unit Tests...")
})

// gulp test:server : Runs all server-side testing scripts
gulp.task('test:server', function() {
	console.log("Running CrystalCoach Serverside Unit Tests...")
	return chimp('chimp.conf.js')
})

// gulp dev : Runs development server configuration for development purposes
gulp.task('dev', function() {
	console.log("Serving CrystalCoach for Development...")
})

// gulp deploy : Builds and runs final server configuration for deployment
gulp.task('deploy', function() {
	console.log("Deploying CrystalCoach...")
})

// Logic Functions

// runServer()
// Builds all packages and runs a single server with passed in server configuration details
function runServer(config) {
	// TODO: Runs build function to build all files and compile to run (Sass, Typescript, etc.)
	buildAll()

	// If a server already exists within this runtime, destroy it and create a new one
	// Otherwise, proceed with creating a new server
	singletonServer(server_config)

	// Watches public folder and restarts Express server on change
	// autoReload()
}

// autoReload()
// Observe public folder and refire singleton Server upon seeing a change
function autoReload() {
	console.log("Watching ~/**")
	gulp.watch(['./**/*'], function() {
		singletonServer(server_config)
		console.log("Detected change! Reloading server...")
	})
}

// singletonServer()
// Singleton Server setup function which destroys the existing server (if it exists) before creating a new one
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

// buildAll()
// Automated package builder currently WIP
function buildAll() {
	console.log("Building files...")
	// buildTypescript()
}

// buildTypescript()
// Typescript automated building currently WIP
function buildTypescript(){
	// run("tsc public/**/*.ts").exec()
	// gulp.src(['public/**/*.ts'])
	// 	.pipe(typescript())
}