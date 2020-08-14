const {User} = require('../models')
const Helper = require('../helper/Helper')

class UserController {
    static async register(req, res, next) {
        try {
            const user = await User.create({
                email: req.body.email,
                password: req.body.password
            })

            res.status(201).json({id: user.id, email: user.email})
        }
        catch(err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: {email: req.body.email}
            })
            console.log(user)
            if (user) {
                if (Helper.decoder(req.body.password, user.password)) {
                    const access_token = Helper.sign({id: user.id, email: user.email})

                    res.status(200).json({access_token})
                } else {
                    next({message: 'invalid email or password'})
                }
            } else {
                next({message: 'invalid email or password'})
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = UserController
