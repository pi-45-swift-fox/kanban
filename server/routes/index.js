const routes = require('express').Router()
const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const authenticate = require('../middlewares/authenticate')
routes.use('/', userRoutes)

routes.use(authenticate)
routes.use('/tasks', taskRoutes)

module.exports = routes