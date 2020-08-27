const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verifyGoolge = require('../helpers/verifyGoogleToken')


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
            next(error)
        }
    }

    static async googleLogin(req, res, next){
        try {
            const google_token = req.headers.google_token
        
            const payload = await verifyGoolge(google_token)
            
            const email = payload.email
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const password = process.env.DEFAULT_PASSWORD_GOOGLE
            if(user) {
                const check = bcrypt.compareSync(password, user.password)

                if(check){
                    const token = jwt.sign({email : user.email}, process.env.JWT_SECRET)
                    const panggilan = user.email.split('@')          
                    res.status(200).json({access_token: token, panggilan: panggilan[0]})
                } else {
                    next({name: 'Invalid Request', message: 'You have registered user in server, please login to server again in page'})
                }

            }else{
                
                const newUser = await User.create({
                    email,
                    password,
                    role: 'reader'
                })
                const token = jwt.sign({email : newUser.email}, process.env.JWT_SECRET)
                const panggilan = newUser.email.split('@')          
                res.status(200).json({access_token: token, panggilan: panggilan[0]})
            }
            res.status(200).json({
                msg: 'Sudah didaftar di server'
            })
        } catch (error) {
            next(error)
        }

    }
}

module.exports = UserController
