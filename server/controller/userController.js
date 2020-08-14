const { User } = require('../models')
const { encode, decode } = require('../helpers/jwt')
const { compareSync } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const user = require('../models/user');

class UserController {
  static async regis(req, res, next) {
    const dataRegis = {
      username: req.body.username,
      password: req.body.password,
      organization: req.body.organization || "Hactiv8"
    }
    try {
      const regisData = await User.create(dataRegis)
      return res.status(201).json({ regisData })
    } catch (error) {
      next(error)
    }
  }
  static async login(req, res, next) {
    const dataLogin = {
      username: req.body.username,
      password: req.body.password
    }
    try {
      const loginData = await User.findOne({ where: { username: dataLogin.username } })
      if (!loginData) {
        next({errorCode:'NOT_FOUND', message:'User or Password Incorrect'})
      } else {
        const password = dataLogin.password
        if (compareSync(password, loginData.password)) {
          const data = {
            id: loginData.id,
            username: loginData.username,
            organization: loginData.organization
          }
          const token = encode(data)
          return res.status(200).json({ access_token: token })
        } else {
          next({errorCode:'NOT_FOUND', message:'User or Password Incorrect'})
        }
      }
    } catch (error) {
      next(error)
    }
  }
  static async googleOauth(req, res, next) {
    const token = req.body.id_token
    console.log(client,'<<<<<<<<')
    const client = new OAuth2Client(process.env.CLIENT_ID);
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        next({errorCode:'Google_Oauth_err', message:'Google Oauth trouble'})        
      } else {
        const userLogin = await User.findOne({ where: { username: payload.email } })
        if (!userLogin) {
          const userData = {
            username: payload.email,
            password: '123321',
            organization: "Hactiv8"
          }
          const user = await User.create(userData)
          if (!user) {
            next({errorCode:'Google_Oauth_err', message:'Google Oauth trouble'})        
          } else {
            const data = {
              id: user.id,
              username: user.username,
              organization: user.organization
            }
            const token = encode(data)
            return res.status(200).json({ access_token: token })
          }
        } else {
          const data = {
            id: userLogin.id,
            username: userLogin.username,
            organization: userLogin.organization
          }
          const token = encode(data)
          return res.status(200).json({ access_token: token })
        }
      }
    } catch (error) {
      next(error)
    }
  }
}
module.exports = UserController