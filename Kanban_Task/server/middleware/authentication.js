const jwt = require('jsonwebtoken')

function authentication(req,res,next){
    if(!req.headers.access_token){
        res.status(500).json(`No access token`)
    }
    else{
        verifiedData=jwt.verify(req.headers.access_token,process.env.SECRET)
        if(verifiedData){
            req.userLogin=verifiedData
            next()
        }
        else{
            console.log('not authenticated')
            res.status(500).json('not Authenticated User')
        }
    }
}

module.exports=authentication