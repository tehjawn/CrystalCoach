// Drink calculator
module.exports.calculate = function(user_info, request_info) {
	return "Drink " + request_info.drink + " is approximately " + Math.random()*200 + " calories"
}