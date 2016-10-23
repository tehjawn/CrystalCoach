// server.js
// Sets up and initializes the CrystalCoach server.
//-------------------------------------------------------//
// Import server configuration files
var config = require('./server/config')

// EXPRESSJS SETUP
var express = require('express')
var app = express()

// Uses 'public' folder as default route for Express Server
app.use(express.static('public'))

// app.get('/', function(req,res){
// 	res.send('Hello World');
// });

// Listens on Node Environment's exported Port number
// Run command 'export port=[insert port number of choice here]'
// Run command 'export NODE_ENV=[insert environment name of choice here]'
app.listen(process.env.PORT, function(err) {
	if (err) console.log(err)
	else console.log("Listening on Port " + process.env.PORT + " (" + process.env.NODE_ENV + ")")
});

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