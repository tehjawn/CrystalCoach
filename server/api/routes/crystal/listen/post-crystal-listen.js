var apiai = require('apiai')
var config = require('../../../../config/apiai.config.js')
var app = apiai(config.client_access_token)

var crystal = require('../response')

module.exports = (req, res) => {
	
	var response

	// Expect req to be a JSON object
	console.log(req.body)
	var request = app.textRequest(req.body.userInput)
	
	request.on('response', function(resp) {
		response = crystal.buildResponse(resp.result.metadata.intentName, resp.result.parameters)
		res.json({
			message: response
		})
	})

	request.on('error', function(err) {
		console.log(err)
		res.json({
			message: "Error connecting to API.AI"
		})
	})

	request.end()
}