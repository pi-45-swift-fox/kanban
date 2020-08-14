const router = require('express').Router();
const TaskRouter = require('./task');
const HomeRouter = require('./home');

router.use('/', HomeRouter);
router.use('/tasks', TaskRouter);

module.exports = router;