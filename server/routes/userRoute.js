const route = require('express').Router()
const userController = require('../Controllers/userController')

route.post('/login', userController.login)
route.post('/register', userController.register)
route.post('/google-login', userController.googleLogin)

module.exports = route