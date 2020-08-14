const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Helper {
    static encoder(password) {
        return bcrypt.hashSync(password, 10)
    }

    static decoder(password, encodedPassword) {
        return bcrypt.compareSync(password, encodedPassword)
    }

    static sign(obj) {
        return jwt.sign(obj, process.env.JWT_KEY)
    }

    static verify(token) {
        return jwt.verify(token, process.env.JWT_KEY)
    }
}

module.exports = Helper
