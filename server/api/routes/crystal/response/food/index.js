// Food calculator
module.exports.calculate = function(user_info, request_info) {
	return "Food " + request_info.food + " is approximately " + Math.random()*200 + " calories"
}