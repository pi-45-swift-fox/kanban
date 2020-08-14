const {User} = require('../models')
const {encrypt, decrypt} = require('../Helpers/BCRYPT.js')
const {generateToken, verifyToken} = require('../Helpers/JWT')

class UserController{

    static async register(req, res, next){
        
        try{

            const {email, password} = req.body
            const data = await User.create({email,password})
            res.status(201).json({id: data.id, email: data.email})

        } catch(err){
            next(err)

        }
    }

    static async login(req, res, next){

        try{
            
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})

            if(!user){
                return next({errorCode : "INVALID_USER"})
                
            } else {
                
                const checkPassword = decrypt(password, user.password)

                if(!checkPassword){
                    return next({errorCode : "INVALID_USER"})
                } else {
                    const token = generateToken(user)
                    // res.status(200).json({id:user.id, email: user.email, createdAt: })
                    res.status(200).json({id:user.id, email: user.email, token})
                
                }
            }

        } catch(err){
            next(err)

        }
    }

}

module.exports = UserController