const {Task} = require('../models')
class TaskController{
  static async createTask(req,res,next){
    const createData = {
      title: req.body.title,
      category:req.body.category,
      UserId:req.userData.id
    }
    console.log(createData,'disini <<<<<<<<<<<<<<<')
    try {
      const dataCreate = await Task.create(createData )
      res.status(201).json({dataCreate})
    } catch (error) {
      next(error)
    }
  }
  static async editTask(req,res,next){
    const id = req.params.id
    const editData = {
      title: req.body.title,
      category:req.body.category,
      UserId:req.userData.id
    }
    try {
      const dataEdit = await Task.update(
        editData,{where:{id}
      })
      res.status(200).json({message:"task berhasil di edit"})
    } catch (error) {
      next(error)
    }
  }

  static async readTask(req,res,next){
    try {
      const dataTask = await Task.findAll()
      res.status(200).json({dataTask})
    } catch (error) {
      next(error)
    }
  }
  static async readTaskOne(req,res,next){
    const taskId = params.id
    try {
      const dataTask = await Task.findOne({where:{id:taskId} })
      res.status(200).json({dataTask})
    } catch (error) {
      next(error)
    }
  }


  static async deleteTask(req,res,next){
    const id = req.params.id
    try {
      const dataTask = await Task.destroy({where:{id}})
      res.status(200).json({message:'task berhasil di delete'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports =TaskController