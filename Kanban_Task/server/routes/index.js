const route =require('express').Router()
const UserController=require('../controller/user-controller')
const TaskController=require('../controller/task-controller')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const googleController=require('../controller/googleSignIncontroller')


route.post('/register',UserController.register)
route.post('/login',UserController.login)
route.post('/googleSignIn', googleController.googleSignin)

route.get('/task',authentication,TaskController.show)
route.post('/task',authentication,TaskController.addTask)
route.delete('/task/:id',authentication,authorization,TaskController.delById)
route.put('/task/:id',authentication,authorization,TaskController.updateById)


module.exports=route