const { Task, User } = require('../models');

class TaskController {
    static add (req, res, next) {
        const addTask = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.UserId
        }
        
        Task.create(addTask)
        .then((task) => {
            return res.status(201).json(task)
        }).catch((err) => {
            next(err)
        });
    }

    static show (req, res, next) {
        // const id = req.UserId

        Task.findAll({include: [User], order: [[`createdAt`, `ASC`]]})
        .then((task) => {
            return res.status(200).json(task)
        }).catch((err) => {
            next(err)
        });
    }

    static showById (req, res, next) {
        const id = req.params.id

        Task.findByPk(id)
        .then((task) => {
            if (!task) {
                throw {status: 404, name: "ErrorValidation", message:"Task not Found"}
            } else {
                return res.status(200).json(task)
            }
        }).catch((err) => {
            next(err)
        });
    }

    static update (req, res, next) {
        const id = req.params.id
        const updateTask = {
            title: req.body.title,
            category: req.body.category
        }

        Task.findByPk(id)
        .then((task) => {
            if (task) {
                return Task.update(updateTask, {
                    where: {
                        id
                    },
                    returning: true
                })
            } else {
                throw {status: 404, name: "ErrorValidation", message: "Todo Not Found"}
            }
        }).then((task) => {
            return res.status(200).json(task[1][0])
        }).catch((err) => {
            next(err)
        });
    }

    static destroy (req, res, next) {
        const id = req.params.id;
        let deleted;

        Task.findByPk(id)
        .then((task) => {
            deleted = task
            if (!task) {
                throw {status: 404, name: "ErrorValidation", message:"Task not Found"}
            } else {
                return task.destroy()
            }
        })
        .then((task) => {
            return res.status(200).json(deleted)
        })
        .catch((err) => {
            next(err)
        });
    }
}

module.exports = TaskController