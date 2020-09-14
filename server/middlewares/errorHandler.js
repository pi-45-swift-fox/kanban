module.exports = (err, req, res, next) => {
  let statuscode = 500,
        message = "INTERNAL SERVER ERROR",
        errorCode = "INTERNAL_SERVER_ERROR";

  if (err.name == "SequelizeValidationError")
  {
    statuscode = 400;
    message = err.errors.map(x => x.message);
    errorCode = "VALIDATION_ERROR";
  }
  else if (err.errorCode == "NOT_FOUND")
  {
    statuscode = 404;
    message = err.message;
    errorCode = err.errorCode;
  }
  else if (err.errorCode == "INVALID_ACCOUNT" || err.name == "JsonWebTokenError")
  {
    statuscode = 401;
    message = err.message;
    errorCode = err.errorCode || "INVALID_SIGNATURE";
  }

  console.log(statuscode);
  return res.status(statuscode).json({errorCode, message});
}
