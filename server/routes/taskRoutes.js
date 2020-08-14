const routes = require('express').Router()
const TaskController = require('../controllers/taskController')
const authorization = require('../middlewares/authorization')

routes.post('/', TaskController.addTask)
routes.get('/', TaskController.getTasks)
routes.put('/:id', authorization, TaskController.updateTask)
routes.delete('/:id', authorization, TaskController.deleteTask)

module.exports = routes