const router = require('express').Router();
const { UserController } = require('../controllers');
const { Auth } = require('../middlewares');

router.get('/', Auth.check, UserController.detail);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);
router.post('/register', UserController.register);

module.exports = router;