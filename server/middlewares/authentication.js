const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {
  if (!req.headers.access_token)
    return next({errCode: "NOT_FOUND", message: "access_token not found"});

  try
  {
    const userData = jwt.verify(req.headers.access_token, process.env.JWT_SECRET);

    User.findOne({where: {email: userData.email}})
      .then(data => {
        if (!data)
          return next({errCode: "NOT_FOUND", message: "user is not exist"});
        console.log(userData)
        req.userLogin = userData;
        return next();
      })
      .catch(err => next(err));
  }
  catch (err)
  {
    next(err);
  }
}
