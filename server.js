// server.js
// Sets up and initializes the CrystalCoach server.
//-------------------------------------------------------//
exports = module.exports = server
module.exports.create = createServer
module.exports.destroy = destroyServer

// Server Libraries
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var api = require('./server/api')
// console.log(api.routes.users.getAll)

var app = express()
app.use(bodyParser.json())
var app_server

// Import server configuration files
// var config = require('./server/config')

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

// // Firebase
// var firebase = require('firebase')
// var FirebaseStore = require('connect-session-firebase')(session)

// var firebase_app = firebase.initializeApp({
// 	serviceAccount: config.firebase.key,
// 	databaseURL: config.firebase.databaseURL
// })

// app.use(session({
// 	store: new FirebaseStore({
// 		database: firebase_app.database()
// 	}),
// 	secret: config.firebase.secret,
// 	resave: true,
// 	saveUninitialized: true
// }))

// // Firebase Test Watcher
// 	var db = firebase_app.database()
// 	var ref = db.ref('/test')
// 	ref.on('value', function(snapshot) {
// 		console.log(snapshot.val())
// 	})

// Test Routes
// app.get('/', function(req, res) {
// 	firebase_app.auth().onAuthStateChanged(function(user) {
// 		if (user) {
// 			res.end("good auth")
// 			console.log(user.email)
// 		} else {
// 			res.end("bad auth")
// 		}
// 	})
// })

// app.post('/signin', function(req, res) {
// 	var username = req.body.username
// 	var password = req.body.password

// 	firebase_app.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
// 		console.log(error)
// 	})

// 	function preSignin() {
// 		console.log("preSignin...")
// 	}

// 	function postSignin() {
// 		console.log("postSignin!")
// 	}

// 	preSignin()
// 	setTimeout(postSignin, 2500)
// })