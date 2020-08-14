const {User, Task} = require('../models')

function Authorize(req, res, next){

    try{

        Task.findByPk(req.params.id)
        .then(data=>{
            if(data.userId == req.userLogin.id){
                next()

            }else{
                next({errorCode: "INVALID_AUTHORIZATION"})

            } 
        })
        .catch(err=>{
            next({errorCode: "INVALID_DATA"})
        })

    }catch(err){
        next(err)
    }
}

module.exports = Authorize