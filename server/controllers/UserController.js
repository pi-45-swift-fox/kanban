const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt');
const { verify } = require('../helpers/googleAuth')

class UserController {
    static register (req, res, next) {
        const newData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            organization: 'Hacktiv8'
        }

        User.create(newData)
        .then((user) => {
            res.status(201).json(user)
        }).catch((err) => {
            console.log(err);
            next(err)
        });
    }

    static login (req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: {email}
        })
        .then((user) => {
            if (!user) {
                throw {status: 400, name: "ErrorValidation", message:"email or password incorrect"}
            } else {
                if (checkPassword(password, user.password)) {
                    const token = encode({
                        id: user.id,
                        email: user.email
                    })
                    return res.status(200).json({ access_token: token })
                } else {
                    throw {status: 400, name: "ErrorValidation", message:"email or password incorrect" }
                }
            }
        }).catch((err) => {
            next(err)
        });
    }

    static googleSignIn (req, res, next) {
        const google_token = req.headers.google_token
        let name = null
        let email = null
        let newUser = false
        verify(google_token)
      .then(payload => {
        email = payload.email,
        name = payload.name
        return User.findOne({ where: { email } })
      })
      .then((user) => {
        if (user) {
          return user
        } else {
          newUser = true
          return User.create({ name, email, password: 'googlesecret', organization:"Hacktiv8" })
        }
      })
      .then(user => {
        let code = newUser ? 201 : 200
        const token = encode({
          id: user.id,
          email: user.email
        })
        res.status(code).json({ access_token: token })
      })
      .catch(err => {
        console.log(err);
      })
    }
}

module.exports = UserController