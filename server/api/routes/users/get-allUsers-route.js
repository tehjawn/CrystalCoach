var router = require('express').Router()

exports = module.exports = getAll()

function getAll() {
	return {
		users: [
			"Bob",
			"Martha",
			"Shay"
		]
	}
}