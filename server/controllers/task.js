const { Task } = require('../models');

module.exports = class TaskController {

    static async main(req, res, next) {
        try {
            const tasks = await Task.findAll();

            res.status(200).json({
                tasks
            });
        } catch (error) {
            next({
                code: 500,
                type: 'task',
                body: error
            });
        }
    }

    static async new(req, res, next) {
        let task = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            organization: 'HACKTIV8',
            UserId: req.userLogin.id
        };

        try {
            await Task.create(task);
            res.status(201).json({
                task
            });
        } catch (error) {
            next({
                code: 400,
                type: 'task',
                body: error
            });
        }
    }

    static async delete(req, res, next) {
        try {
            await Task.destroy({
                where: {
                    id: +req.params.id
                }
            });
            res.status(200).json({
                msg: 'delete success'
            });
        } catch (error) {
            next({
                code: 500,
                type: 'task',
                body: error
            });
        }
    }

    static async edit(req, res, next) {
        let task = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        };

        try {
            const oldTask = await Task.findOne({
                where: {
                    id: +req.params.id
                }
            });

            if (!task.title) {

                task.title = oldTask.title;
            } if (!task.description) {
                task.description = oldTask.description;
            }
            
            await Task.update(task, {
                where: {
                    id: +req.params.id
                } 
            });

            res.status(201).json({
                msg: 'OK'
            });
        } catch (error) {
            next({
                code: 404,
                type: 'task',
                body: error
            });
        }
    }
}