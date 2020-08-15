const router = require('express').Router()

const Controller = require('../controllers/controller')

const authentication = require('../middlewares/authentication')

router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.post('/g-signin', Controller.google_signin)
router.post('/logged', authentication, Controller.logged)

module.exports = router