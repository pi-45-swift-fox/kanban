const {User, Task} = require('../models')

class TaskController{

    static async create(req, res, next){
        
        try{

            console.log(req.userLogin)
            const {title, category} = req.body
            const newData = await Task.create({title,category,userId:req.userLogin.id})
            res.status(201).json({title,category})

        }catch(err){

            next(err)

        }

    }

    static async show(req, res, next){
        
        try{

            const data = await Task.findAll({include:{model:User, attributes : {
                exclude : ['password']
            }}})
            if(data){
                res.status(200).json({data})
            }else{
                return next({errorCode : "INVALID_DATA"})
            }

        }catch(err){

            next(err)

        }

    }

    static async update(req, res, next){
        
        try{

                const {title, category} = req.body
                Task.update({title,category}, {where:{id:req.params.id}, returning:true})
                .then(data=>{
                    if(data){
                        res.status(200).json(data)
                    }else{
                        next(err)
                    }
                }).catch(err=>{
                    next(err)
                })
                // res.status(200).json({Message: "Data have been updated", NewData: update})

        } catch(err){
            next(err)

        }

    }

    static async delete(req, res, next){
        
        try{

            Task.destroy({where:{id:req.params.id}})
            res.status(200).json({Message: "Data has been destroyed"})

        }catch(err){
            next(err)

        }
    }


}

module.exports = TaskController