const bcrypt = require('bcrypt')

var salt = bcrypt.genSaltSync(10)

function generate(password) {
    return bcrypt.hashSync(password, salt)
}

function compare(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { generate, compare }