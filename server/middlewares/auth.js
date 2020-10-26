const { decode } = require('../helpers/jwt')
const { User, Task } = require('../models')


const authentication = async (req, res, next) => {
  const access_token = req.headers.access_token

  if (!access_token) {
    return res.status(400).json({ message: `Token not found` })
  } else {
    try {
      const userData = decode(access_token)
      req.userData = userData
      const user = await User.findOne({ where: { username: userData.username } })
      if (user) {
        next()
      } else {
        next({ errorCode: "Authentication", message: "Invalid Token" })
      }
    } catch (error) {
      next(error)
    }
  }
}

const authorization = async (req, res, next) => {
  try {
    const idTask = req.params.id
    const task = await Task.findOne({ where: { id: idTask } })
    if (task.UserId === req.userData.id) {
      next()
    } else {
      next({ errorCode: "Authorize", message: "Forbidden Access" })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { authentication, authorization }