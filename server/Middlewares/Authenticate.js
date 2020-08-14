const jwt = require('jsonwebtoken')
const {verifyToken} = require('../Helpers/JWT')
const {User} = require('../models')

function authenticate(req, res, next){
    
    try{
        
        if(!req.headers.access_token){
            next({errorCode: "INVALID_TOKEN"})
        }

        const check = verifyToken(req.headers.access_token, process.env.SECRET)
        if(!check){
            next({errorCode: "INVALID_TOKEN"})
            
        }else{

            User.findOne({where:{email:check.email}})
            .then(data=>{

                if(data){
                    req.userLogin = {id: data.id, email: data.email}
                    next()

                } else{
                    next({errorCode: "INVALID_USER"})

                }
            })
            .catch(err=>{
                next({errorCode : "INVALID_USER"})
            })
        }

    }catch(error){

        next(error)

    }

}


module.exports = authenticate