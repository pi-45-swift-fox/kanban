const { decode } = require('../helpers/jwt')
const { User, Task } = require('../models')

async function authentication (req, _, next) {
    let { access_token } = req.headers
    
    try {
        const decoded = decode(access_token)
        const { id } = decoded
        const user = await User.findByPk(id)
        
        if (user) {
            req.UserId = user.id
            next()
        } else {
            throw {status: 400, name: "ErrorValidation", message:"Authentication failed User"}
        }
    } catch (err) {
        next(err)
    }
}

async function authorization (req, res, next) {
    try {
        const taskId = req.params.id
        const task = await Task.findByPk(taskId)
        
        if (task){
            if (task.UserId === req.UserId) { next()} 
            else { throw {status: 403, name: "ErrorValidation", message:"Forbidden Access"}}
        } else {
            throw {status: 404, name: "ErrorValidation", message:"task not found"}
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, authorization }