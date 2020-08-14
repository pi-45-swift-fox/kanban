const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
    static async login(req, res, next){
        try {
            const { email, password } = req.body
            const userLogin = await User.findOne({
                where: {
                    email
                }
            })
            const verified = bcrypt.compareSync(password, userLogin.password)
            if (verified) {
                const token = jwt.sign({id: userLogin.id, email: userLogin.email}, process.env.JWT_SECRET)
                const panggilan = userLogin.email.split('@')          
                res.status(200).json({access_token: token, panggilan: panggilan[0]})        
            }else{
                next({name: 'Error Not Found',message: 'Email atau password salah'})
            }
        } catch (error) {
            next({name: 'Error Not Found', message: 'Invalid Request'})          
        }
    }

    static async register(req, res, next){
        try {
            const { email, password } = req.body
            const newUser = await User.create({
                email,
                password
            })
            res.status(201).json(`User with email ${email} created`)
        } catch (error) {
            next({name: 'Invalid Request', message: 'Invalid Request'})
        }
    }
}

module.exports = UserController
