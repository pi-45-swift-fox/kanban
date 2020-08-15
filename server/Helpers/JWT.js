const jwt = require('jsonwebtoken')

function generateToken(user){
    return jwt.sign({id: user.id, email: user.email}, process.env.SECRET)
}

function verifyToken(headers){
    return jwt.verify(headers, process.env.SECRET)
}

module.exports = {generateToken, verifyToken}