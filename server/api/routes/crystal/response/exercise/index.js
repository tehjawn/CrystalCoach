// Exercise calculator
module.exports.calculate = function(user_info, request_info) {
	return "Exercise " + request_info.exercise + " is approximately " + Math.random()*200 + " calories"
}