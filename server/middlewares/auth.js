const { User, Task } = require('../models');
const jwt = require('jsonwebtoken');

class Auth {
    static async check(req, res, next) {
        try {
            const userToken = jwt.verify(
                req.headers.access_token,
                process.env.JWT_SECRET
            );

            let data = await User.findOne({
                where: {
                    email: userToken.email
                }
            });

            req.userLogin = data;
            next();

        } catch (error) {
            next({
                code: 409,
                type: 'token',
                body: error
            });
        }
    }

    static async checkUser(req, res, next) {
        try {
            const data = await Task.findByPk(+req.params.id);

            if (data) {
                if (data.UserId === req.userLogin.id) {
                    next();
                } else {
                    res.status(403).json('Access denied');
                }
            } else {
                res.status(404).json(`Unable to find the task with this id:${+req.params.id}`)
            }

        } catch (error) {
            next({
                code: 403,
                type: 'token',
                body: error
            });
        }
    }
}

module.exports = Auth;