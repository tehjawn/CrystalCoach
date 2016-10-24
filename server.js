// server.js
// Sets up and initializes the CrystalCoach server.
//-------------------------------------------------------//
exports = module.exports = server
module.exports.create = createServer
module.exports.destroy = destroyServer

// Server Libraries
var express = require('express')
var api = require('./server/api')
// console.log(api.routes.users.getAll)

var app = express()
var app_server

// Import server configuration files
var config = require('./server/config')

function server() {

	// Sets server.create = createServer()
	// Passes config file which determines configuration server will run on
	this.create = function(config) {
		createServer(config)
	}

	// Sets server.destroy = destroyServer()
	this.destroy = function() {
		destroyServer()
	}
}

function createServer(config) {
	// Uses 'public' folder as default route for Express Server
	app.use(express.static('public'))

	// app.get('/', function(req,res){
	// 	res.send('Hello World');
	// });

	// Set Port and Env server variables
	var port = process.env.PORT || config.port || 3023
	var env = process.env.NODE_ENV || config.env || "default"

	// Listens on Node Environment's exported Port number, or uses passed in config's port value, or uses Port 3023 by default
	// Run command 'export port=[insert port number of choice here]'
	// Run command 'export NODE_ENV=[insert environment name of choice here]'
	app_server = app.listen(port, function(err) {
		if (err) console.log(err)
		else console.log("Listening on Port " + port + " (" + env + ")")
	});
}

function destroyServer() {
	app_server ? app_server.close() : console.log("Server does not exist!")
}

//-------------------------------------------------------//

// Firebase
var firebase = require('firebase')
firebase.initializeApp({
	serviceAccount: config.firebase.key,
	databaseURL: config.firebase.databaseURL
})


var db = firebase.database()
var ref = db.ref('/test')
ref.on('value', function(snapshot) {
	console.log(snapshot.val())
})