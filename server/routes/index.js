const router = require('express').Router()
const UserController = require('../controller/userController')
const taskRoutes = require('./task')



router.post('/login',UserController.login)
router.post('/register',UserController.regis)
router.post('/googlesignin',UserController.googleOauth)

router.use('/task',taskRoutes)



module.exports = router