const router = require('express').Router()
const userRouter = require('./userRoute')
const taskRouter = require('./taskRoute')
const Middleware = require('../middleware/Middleware')
    
router.use('/', userRouter)

router.use(Middleware.authenticate)

router.use('/tasks', taskRouter)

module.exports = router
