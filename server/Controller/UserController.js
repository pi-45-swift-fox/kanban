const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class UserController {
  static login(req, res, next)
  {
    console.log(req.body);
    User.findOne({where: {email: req.body.email}})
      .then(data => {
        if (!data)
          return next({errorCode: "NOT_FOUND", message: "there is no user with that email"});

        if (bcrypt.compareSync(req.body.password, data.password))
        {
          const token = jwt.sign({id: data.id, email: data.email}, process.env.JWT_SECRET);
          return res.status(200).json({access_token: token});
        }
        else
          return next({errorCode: "INVALID_ACCOUNT", message: "email or password is wrong"});
      })
      .catch(err => {
        next(err);
      })
  }

  static async register(req, res, next)
  {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({where: {email: req.body.email}})
      .then(data => {
        if (data)
        {
          return next({errorCode: "INVALID_ACCOUNT", message: "account already exist"});
        }
        return User.create(newUser)
      })
      .then(response => {
        return res.status(201).json({id: response.id, email: response.email, organization: response.organization});
      })
      .catch(err => next(err));
  }
}

module.exports = UserController;
