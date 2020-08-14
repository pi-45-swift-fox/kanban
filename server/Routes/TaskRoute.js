const route = require('express').Router()
const TaskController = require('../Controller/TaskController')

const authenticate = require('../Middlewares/Authenticate')
const authorize = require('../Middlewares/Authorization')

route.use(authenticate)
route.get('/', TaskController.show)
route.post('/', TaskController.create)
route.put('/:id', authorize, TaskController.update)
route.delete('/:id', authorize, TaskController.delete)


module.exports = route