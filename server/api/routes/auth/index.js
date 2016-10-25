const auth = require('express').Router()

auth.get('/', require('./generate-token.js'))

module.exports = auth