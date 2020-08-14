module.exports = function (err, req, res, next) {
  let statusCode = 500
  let message = 'internal server error'
  let errorCode = "INTERNAL_SERVER_ERROR"

  if (err.name === `SequelizeValidationError`) {
    message = err.errors[0].message
    statusCode = 400
    errorCode = 'VALIDATION ERROR'
  } else if (err.errorCode === 'NOT_FOUND' || err.errorCode === "Google Oauth trouble") {
    message = err.message
    errorCode = err.errorCode
    statusCode = 400
  } else if (err.errorCode === "INVALID_ACCOUNT" || err.name === 'JsonWebTokenError' || err.errorCode === "Authentication") {
    message = err.message
    errorCode = err.errorCode || "Encrypt Token Error"
    statusCode = 401
  }else if (err.errorCode === "Authorize"){
    message = err.message
    errorCode = err.errorCode
    statusCode = 403
  }
  res.status(statusCode).json({message, errorCode})
}

