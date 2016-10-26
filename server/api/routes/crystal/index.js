const crystal = require('express').Router()

crystal.use('/listen', require('./listen'))
// crystal.use('/respond', require('./respond'))

module.exports = crystal