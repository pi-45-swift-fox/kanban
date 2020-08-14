const { Task, User } = require('../models')

class taskController {
    static async showAll(req, res, next){
        try {
            const tasks = await Task.findAll({
                include: [
                    {
                    model: User,
                    attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }
                ]
            })
            res.status(200).json(tasks)
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async create(req, res, next){
        try {
            const { title, category } = req.body
            const UserId = req.userLogin.id
            const newTask = await Task.create({
                title,
                category,
                UserId
            })
            res.status(201).json(newTask)
        } catch (error) {
            next(error)
        }
    }

    static async showOne(req, res, next){
        try {
            const id = +req.params.id
            const oneTask = await Task.findOne({
                where: {
                    id
                },
                include: [
                    {
                    model: User,
                    attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }
                ]
            })
            res.status(200).json(oneTask)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next){
        try {
            const id = +req.params.id
            const {title, category} = req.body
            const willUpdate = await Task.update({
                title, category
            },{
                where: {
                    id
                }
            })
            res.status(200).json('berhasil update')
        } catch (error) {
            next({name: 'Invalid Request', message: 'Invalid Request'})
        }
    }

    static async delete(req, res, next){
        try {
            const id = +req.params.id
            const willDelete = await Task.destroy({
                where: {
                    id
                }
            })
            res.status(200).json('Berhasil delete')
        } catch (error) {
            next(error)
        }
    }

    static async updateCategory(req, res, next){
        try {
            const id = +req.params.id
            const category = req.body
            const newCategory = await Task.update({
                category
            }, {
                where: {
                    id
                }
            })
            res.status(200).json(newCategory)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = taskController