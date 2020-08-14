require('dotenv').config()
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const jwt=require('jsonwebtoken')

class googleAuth {
    static googleSignin (req, res, next) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            // console.log(">>>>> .then(ticket)",ticket);
            payload = ticket.getPayload();    
            // console.log('ini>>>>>>>>>>>>>',payload['email'])
                    
            return User.findOne({ where: { name: payload["email"] } })
        })
        .then(user => {
            console.log('ini user>>>>>>>',user)
            if (user) {
            console.log(">>>>>>then.user")
            return user;
            } else {
                console.log('masuk else>>>>>>>>>')
            let dataUser = {
                name: payload['email'],
                password: 'admin',
            }
            console.log('ini data userrr>>>>',dataUser)
            return User.create(dataUser)
            }
        })
        .then(data => {
            let access_token = jwt.sign({ name: data.name },process.env.JWT_SECRET)

            console.log(">>>>>>>.then(data)")
            return res.status(200).json({ email:data.name,access_token })
        })
        .catch(err => {

            console.log("error catch >>>>>>",err)
            res.status(400).json(err)
        })
    }
}

module.exports = googleAuth