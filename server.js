// server.js
// Sets up and initializes the CrystalCoach server.
//-------------------------------------------------------//
exports = module.exports = server
module.exports.create = createServer
module.exports.destroy = destroyServer

// Server Libraries
var express = require('express')
var app = express()
var server

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

	// Listens on Node Environment's exported Port number, or uses passed in config's port value, or uses Port 3023 by default
	// Run command 'export port=[insert port number of choice here]'
	// Run command 'export NODE_ENV=[insert environment name of choice here]'
	server = app.listen(process.env.PORT || config.port || 3023, function(err) {
		if (err) console.log(err)
		else console.log("Listening on Port " + process.env.PORT + " (" + process.env.NODE_ENV || config.port || 3023 + ")")
	});
}

function destroyServer() {
	server ? server.close() : console.log("Server does not exist!")
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