const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

class GoogleController {
  static googleSignin (req, res, next) {
    console.log("masuklbro")
    const id_token = req.body.id_token
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let payload = null;
    client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID
    })
    .then( ticket => {
        payload = ticket.getPayload();
        const userid = payload['sub']
        console.log(payload, ">>>> DATA DARI GOOGLE")
        return User.findOne({ where : { email : payload["email"]}})
    })
    .then( user => {
        console.log(user,"useruser")
        if(user){
            return user;
        } else {
            let dataUser = {
                email: payload['email'],
                password: 'admin',
                organization: "Hactiv8",
            }
            return User.create(dataUser)
        }
    })
    .then(data => {
        console.log(data,"datadata")
        const access_token = generateToken({
            id : data.id,
            email: data.email,
        })
        console.log(access_token,"accesstoken")
        return res.status(200).json({access_token, id : data.dataValues.id})
    })
    .catch( err => {
        next(err)
    })
}
}

module.exports = GoogleController