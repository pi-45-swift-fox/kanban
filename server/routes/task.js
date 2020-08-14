const router = require('express').Router();
const { TaskController } = require('../controllers');
const { Auth } = require('../middlewares');

router.get('/', TaskController.main);
router.post('/', Auth.check, TaskController.new);
router.delete('/:id', Auth.check, Auth.checkUser, TaskController.delete);
router.put('/:id', Auth.check, Auth.checkUser, TaskController.edit);

module.exports = router;