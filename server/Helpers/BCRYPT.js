const bcrypt = require('bcrypt')

function encrypt(password){
    return bcrypt.hashSync(password, 10)
}

function decrypt(hashpassword, password){
    return bcrypt.compareSync(hashpassword, password)
}

module.exports = {encrypt, decrypt}