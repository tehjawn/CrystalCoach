// api/routes
// Handles API Routing for CrystalCoach Express server
const routes = require('express').Router()

routes.post('/', (req, res) => {
	res.end("Connected!")
})

routes.use('/users', require('./users'))
routes.use('/auth', require('./auth'))

module.exports = routes;