const {User} = require('../models')
const Bcrypt = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static login (req,res) {
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                if(!user) {
                    res.status(400).json({msg: 'email or password is incorrect!'})
                } else {
                    const verified = Bcrypt.compare(req.body.password, user.password)
                    if(verified) {
                        const token = jwt.sign({id: user.id}, process.env.SECRET)
                        res.status(200).json({token})
                    } else {
                        res.status(400).json({msg: 'email or password is incorrect!'})
                    }
                }
            })
            .catch(err => res.status(500).json(err))
    }

    static register (req, res) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(user => {
                const token = jwt.sign({id: user.id}, process.env.SECRET)
                res.status(201).json({token})
            })
            .catch(err => res.status(500).json(err))
    }

    static googleSign(req, res) {
        let { id_token } = req.body;
        let name;
        let email;
        const client = new OAuth2Client(process.env.GOOGLE_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_ID
        })
            .then(ticket => {
                email = ticket.getPayload().email;
                name = ticket.getPayload().name;

                return User.findOne({
                    where: { email }
                })
            })
            .then(data => {
                if (data) {
                    return {
                        id: data.id,
                        email: data.email
                    }
                } else {
                    return User.create({ email, password: '123' })
                }
            })
            .then(data => {
                const token = jwt.sign({id: data.id}, process.env.SECRET)
                return res.status(201).json({
                    id: data.id,
                    name,
                    email: data.email,
                    token
                })
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UserController