const router = require('express').Router()

const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', Controller.task)

router.use(authentication)

router.post('/', Controller.new_task)


router.get('/:taskId', authorization, Controller.task_id)
router.put('/:taskId', authorization, Controller.edit_task)
router.delete('/:taskId', authorization, Controller.delete_task)

module.exports = router