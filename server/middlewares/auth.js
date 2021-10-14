const { User, Task } = require('../models')
const jwt = require('jsonwebtoken')

class auth {
    static async authentication(req, res, next) {
        try {
            if (!req.headers.access_token) {
                res.status(500).json({
                    message: 'headers need access_token'
                })
            } else {
                const payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
                const user = await User.findOne({
                    where: {
                        email: payload.email
                    }
                })

                if(!user) {
                    res.status(500).json({
                        message: 'jwt token error'
                    })
                } else {
                    req.userLogin = user
                    next()
                }
            }    
        } catch (error) {
            res.status(401).json('Not Authenticated')
        }
    }

    static async authorization(req, res, next){
        console.log('masuk otosasi')
        try {
            const id = +req.params.id
            const task = await Task.findOne({
                where: {
                    id
                }
            })
            if (req.userLogin.id !== task.UserId) {
                res.status(401).json('Not Authorized')
            } else {
                next()
            }
        } catch (error) {
            console.log(error);
            res.status(401).json('Not Authorized')
        }
    }
}

module.exports = auth