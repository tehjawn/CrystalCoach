// Crystal Response Builder
module.exports.buildResponse = function(intent, params) {

	console.log("Building a " + intent + " response using parameters " + JSON.stringify(params))

	if(intent == "Record Activity - Drink") {
		var drink = require('./drink')
		return drink.calculate({}, {
			drink: params.drink || "lemonade"
		})
	} else if (intent == "Record Activity - Food") {
		var food = require('./food')
		return food.calculate({}, {
			food: params.food || "banana"
		}, function(resp){
			console.log(resp)
			return resp
		})
	} else if (intent == "Record Activity - General Exercises") {
		var exercise = require('./exercise')
		return exercise.calculate({}, {
			exercise: params.exercise || "pushups"
		})
	} else {
		return "Error - intent not found!"
	}
}
