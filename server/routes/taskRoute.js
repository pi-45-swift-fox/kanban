const route = require('express').Router()
const taskController = require('../Controllers/taskController')
const auth = require('../middlewares/auth')

route.post('/tasks', auth.authentication,taskController.create)
route.get('/tasks', auth.authentication, taskController.showAll)
route.get('/tasks/:id' , auth.authentication, taskController.showOne)
route.delete('/tasks/:id', auth.authentication, auth.authorization, taskController.delete)
route.patch('/tasks/:id/title', auth.authentication, auth.authorization, taskController.updateTitle)
route.patch('/tasks/:id/category', auth.authentication, auth.authorization, taskController.updateCategory)


module.exports = route