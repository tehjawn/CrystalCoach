const users = require('express').Router()

users.get('/', require('./get-allUsers-route.js'))
users.get('/:uid', require('./get-user-route.js'))

module.exports = users