const router = require('express').Router()
const taskController = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', taskController.add)
router.get('/', taskController.show)
router.get('/:id', taskController.showById)
router.put('/:id', authorization,taskController.update)
router.delete('/:id', authorization,taskController.destroy)

module.exports = router