const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verifyGoogle = require('../helpers/verifyGoogleToken')


class UserController{

    static async register(req,res,next){
        try{
            const {name,email,password} = req.body
            console.log(req.body);
            console.log(name,email,password);
            const checkDouble = await User.findOne({
                where:{
                    email
                }
            })

            if(checkDouble){
                return next({errCode:'INVALID_ACCOUNT', msg:'Your email is already registered'})
            }
            const addUser = await User.create({
                name,
                email,
                password
            })
            console.log(addUser);
            const access_token = jwt.sign({
                id:addUser.id,
                name:addUser.name,
                email:addUser.email,
                organization:addUser.organization
            },process.env.JWT_SECRET)

            res.status(201).json({id:addUser.id,name:addUser.name,email:addUser.email,access_token})

        } catch(err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(req.body);
            const checkUser = await User.findOne({
                where: {
                    email
                }
            })
            if (!checkUser) {
                console.log(checkUser);
                next({ errCode: 'INVALID_ACCOUNT' })
            } else {
                const result = bcrypt.compareSync(password, checkUser.password)
                if (!result) {
                    next({ errCode: 'INVALID_ACCOUNT' })
                } else if (result) {
                    const access_token = jwt.sign({
                        id:checkUser.id,
                        name:checkUser.name,
                        email:checkUser.email,
                        organization:checkUser.organization
                    },process.env.JWT_SECRET)

                    res.status(200).json({ access_token })
                }
            }
        } catch (err) {
            next({ errCode: 'INVALID_ACCOUNT' })
        }
    }

    static async googleLogin(req, res, next) {
        const google_token = req.headers.google_token
        console.log(google_token, 'ini dari controller google_token headers');
        try {
            const payLoad = await verifyGoogle(google_token)
            const email = payLoad.email
            const name = payLoad.name
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const password = process.env.DEFAULT_GOOGLE_USER_PASSWORD
            if (user) {
                // const checkPasswordGoogleUser = bcrypt.hashSync(password,user.password)
                const encryptedPassword = bcrypt.hashSync(password, 10)
                const newPasswordGoogleUser = await User.update({ password: encryptedPassword }, {
                    where: {
                        id: user.id
                    }
                })
                const access_token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
                res.status(200).json({ access_token })
            } else {
                const newUserGoogle = await User.create({
                    email,
                    password: password,
                    name
                })
                const access_token = jwt.sign({ id: newUserGoogle.id, email: newUserGoogle.email }, process.env.JWT_SECRET);
                res.status(201).json({ access_token })
            }
        } catch (err) {
            console.log(err);
            next(err)
        }

    }

}

module.exports = UserController