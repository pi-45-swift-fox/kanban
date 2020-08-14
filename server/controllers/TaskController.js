const {User, Task} = require('../models')

class TaskController {
    static async create(req, res, next) {
        try {
            const task = await Task.create({
                title: req.body.title, 
                category: req.body.category,
                UserId: req.userLogin.id
            })

            res.status(201).json({title: task.title, category: task.category})
        }
        catch(err) {
            next(err)
        }
    }

    static async show(req, res, next) {
        try {
            const tasks = await Task.findAll({
                include: User,
                order: [['updatedAt', 'DESC']]
            })
            let data = []
            
            tasks.forEach(el => {
                data.push({
                    id: el.id,
                    title: el.title,
                    category: el.category,
                    User: {
                        id: el.User.id,
                        email: el.User.email,
                        organization: el.User.organization,
                    }
                })
            });

            res.status(200).json(data)
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const task = await Task.update({
                title: req.body.title,
                category: req.body.category
            },{
                where: {
                    id: req.params.id,
                    UserId: req.userLogin.id
                },
                returning: true
            })

            res.status(201).json({title: task[1][0].title, category: task[1][0].category})
        }
        catch(err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const task = await Task.findOne({id: req.params.id, UserId: req.userLogin.id})
            const deleted = await Task.destroy({
                where: {id: req.params.id, UserId: req.userLogin.id}
            })

            if (deleted > 0) {
                res.status(200).json({title: task.title, category: task.category})
            } else {
                next({message: 'error not found'})
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = TaskController
