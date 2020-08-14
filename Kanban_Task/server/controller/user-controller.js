const {User}=require('../models')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

class Controller{
    static async register(req,res,next){
        if(req.body.email===''){
            return res.status(500).json('Email is empty')
        }
        const checkUser=await User.findOne({where:{email:req.body.email}})
        
        if(checkUser){
            res.status(500).json('User already exist')
        }else{
            try{
                let password=req.body.password
                if(password.length<6){
                    res.status(500).json('password aleast 6 characters')
                }
                else{
                    let obj={
                        email:req.body.email,
                        password:req.body.password
                     }
                     User.create(obj)
                     .then(data=>{
                         res.status(200).json({
                             id:data.id,
                             email:data.email,
                             password:data.password
                         })
                     })
                }
                
            }catch(err){
                next(err)
                // res.status(400).json(err)
            }
        }
        
        
    }
    static async login(req,res,next){

        try{
            console.log('ini emailll>>>>>>',req.body.email)
            const userData = await User.findOne({
                                            where:{
                                                email:req.body.email,
                                            }
                                        })
            if(!userData){
                console.log('not found')
                res.status(500).json('not found')
                // next({errorCode:'NOT_FOUND', message:`USER DOESN'T EXIST`})
            }
            else{
                //console.log(userData)
                    const verified=  bcrypt.compareSync(req.body.password,userData.password)
                    if(verified){

                    const token=jwt.sign({id:userData.id,email:userData.email,organization:userData.organization},process.env.SECRET)
                    res.status(200).json({email:userData.email,token:token})
                    console.log('verified>>>')
                    }
                    else{
                        res.status(401).json({massage:'Password is Incorrect'})
                    }

                }
        }catch(err){
            console.log(err)
            res.status(500).json({msg:'Error'})

        }
    }
}
module.exports=Controller