const { Task } = require('../models');

module.exports = (req, res, next) => {
  Task.findOne({where: {id: +req.params.id}})
    .then(data => {
      if (data.UserId == req.userLogin.id)
        return next();
      return next({ errorCode: "INVALID_ACCOUNT", message: `User ${req.userLogin.email} unauthorized`});
    })
    .catch(err => next(err));
}
