const router = require('express').Router();
const UserController = require('../Controller/UserController.js');
const TaskController = require('../Controller/TaskController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authentication);
router.get('/dashboard', TaskController.view);
router.post('/dashboard', TaskController.post);
router.put('/dashboard/:id', authorization, TaskController.update);
router.delete('/dashboard/:id', authorization, TaskController.destroy);

module.exports = router;
