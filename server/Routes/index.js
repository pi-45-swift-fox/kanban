const UserController = require('../Controller/UserController')
const routes = require('express').Router()

const TaskRoute = require('./TaskRoute.js')

routes.post('/register',UserController.register)
routes.post('/login',UserController.login)

routes.use('/tasks', TaskRoute)

module.exports = routes