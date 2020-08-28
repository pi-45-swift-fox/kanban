const routes = require('express').Router()

const UserController = require('../controllers/userController')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/loginGoogle', UserController.googleLogin)

routes.get('/',(req,res)=>{
    res.status(200).json({msg:'welcome to kanban app'})
})
module.exports = routes