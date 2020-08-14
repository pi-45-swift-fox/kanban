const {Task}=require('../models')

function authorization(req,res,next){
    console.log('ini id>>>',req.params.id)
    console.log('ini data usernya>>>',req.userLogin)

    Task.findOne({where:{id:req.params.id}})
    .then(data=>{
        if(!data){
            res.status(400).json('DATA NOT FOUND')
        }
        else{
            if(data.UserId===req.userLogin.id){
                console.log('this is Task Data>>>>>',data.dataValues)
                console.log('authorized user>>')
                next()
            }
            else{
                console.log('not authorized user>>>')
                    res.status(500).json('Not Authorized User')
                
            }
        }
    })
}
module.exports=authorization