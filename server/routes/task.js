const router = require('express').Router()
const TaskController = require('../controller/taskController')
const {authentication,authorization}= require('../middlewares/auth')

router.use(authentication)
router.post('/',TaskController.createTask)
router.get('/',TaskController.readTask)

router.get('/:id',TaskController.readTaskOne)
router.put('/:id',authorization,TaskController.editTask)
router.delete('/:id',authorization,TaskController.deleteTask)


module.exports = router