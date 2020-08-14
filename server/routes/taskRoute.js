const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const Middleware = require('../middleware/Middleware')

router.post('/', TaskController.create)
router.get('/', TaskController.show)

router.use(Middleware.authorize)

router.patch('/:id', TaskController.update)
router.put('/:id', TaskController.update)
router.delete('/:id', TaskController.delete)

module.exports = router
