const {Task}=require('../models')

class Controller{
    static async show(req,res){
        try{
            const data= await Task.findAll({where:{UserId:req.userLogin.id}})
            res.status(200).json(data)

        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async addTask(req,res){
        let obj={
            title:req.body.title,
            category:req.body.category,
            UserId:req.userLogin.id
        }
        try{
            const addedData=await Task.create(obj)
            res.status(200).json(addedData)
        }catch(err){
            console.log('catch error>>>>',err)
            res.status(500).json(err)
        }
    }
    static async updateById(req,res){
        let obj={
            title:req.body.title,
            category:req.body.category,
            UserId:req.userLogin.id
        }        
        try{
            const updatedData=await Task.update(obj,{where:{id:req.params.id}})
            res.status(200).json(`success to update Data to:
            ${obj}
            
            `)
        }catch(err){
            console.log('catch Error>>>',err)
        }
    }
    static async delById(req,res){
        try{
            const delData=await Task.destroy({where:{id:req.params.id}})
            if(delData){
                res.status(200).json(delData)
            }else{
                res.status(400).json(delData)
            }
        }catch(err){
            console.log('catch error>>>',err)
            res.status(500).json(err)
        }
    }
}
module.exports=Controller