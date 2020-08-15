function errorHandler(err, req, res, next){
    console.log(err)
    console.log(err.errorCode, '<========= errorCode')
    let statusCode = 500
    let Message = ['Internal Server Error']
    if(err.errorCode == 'INVALID_USER'){
        Message = 'Incorrect Username or Password '
        statusCode = 400
    }
    
    return res.status(statusCode).json(Message)
}

module.exports = errorHandler