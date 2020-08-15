const router = require('express').Router()
const user = require('./user')
const task = require('./task')

router.get('/', (req, res) => { res.json({ msg: 'routes here' }) })
router.use('/', user)
router.use('/tasks', task)

module.exports = router