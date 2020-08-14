const {User, Task} = require('../models')
const Helper = require('../helper/Helper')

class Middleware {    
    static errorHandler(err, req, res, next) {
        let statusCode = 500
        let errorCode = 'INTERNAL_SERVER_ERROR'
        let message = 'internal server error'

        if (err.name == 'SequelizeValidationError') {
            let errors = []

            err.errors.forEach(element => {
                errors.push(element.message)
            });

            statusCode = 400
            errorCode = "BAD_REQUEST"
            message = errors.join(', ')
        } else if (err.name == 'SequelizeUniqueConstraintError') {
            statusCode = 400
            errorCode = "BAD_REQUEST"
            message = 'email already used'
        } else if (err.message == 'invalid email or password' || err.message == 'error not found') {
            statusCode = 404
            errorCode = 'NOT_FOUND'
            message = err.message
        } else if (err.errorCode == 'FORBIDDEN' || err.message == 'invalid token') {
            statusCode = 403
            errorCode = err.errorCode
            message = 'error authentication'
        } else if (err.message == 'unauthorized') {
            statusCode = 401
            errorCode = 'UNAUTHORIZED'
            message = err.message
        }
        
        return res.status(statusCode).json({message, errorCode})
    }

    static authenticate(req, res, next) {
        if (!req.headers.access_token) {
            next({errorCode: 'FORBIDDEN'})
        } else {
            try {
                const userData = Helper.verify(req.headers.access_token)
    
                    User.findOne({
                        where:{email: userData.email}
                    })
                        .then(user=>{
                            req.userLogin = {id: user.id, email: user.email}
                            next()
                        })
                }
                catch(err) {
                    next(err)
                }
        }
    }

    static authorize(req, res, next) {
        try {
            Task.findOne({
                    id: req.params.id,
                    UserId: req.userLogin.id
                })
                .then(task=>{
                    if (task) {
                        next()
                    } else {
                        next({message: 'unauthorized'})
                    }
                })
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = Middleware
