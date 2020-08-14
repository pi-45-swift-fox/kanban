const router = require('express').Router()
const user = require('./user')
const kanban = require('./kanban')

router.get('/', (req, res, next) => {
  res.send({ msg: 'Success' })
})

router.use('/', user)
router.use('/kanbans', kanban)

module.exports = router