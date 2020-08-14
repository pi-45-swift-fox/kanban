const { Task } = require('../models');

class TaskController {
  static view(req, res, next)
  {
    Task.findAll({include: ['User'], order: [['id', 'ASC']]})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static post(req, res, next)
  {
    const newTask = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      UserId: req.userLogin.id
    }

    Task.create(newTask)
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next)
  {
    const updateTask = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    };

    Task.update(updateTask, {where: {id: +req.params.id}, returning: true})
      .then(data => {
        if (data)
          return res.status(200).json(data[1][0]);
        return next({ errorCode: "NOT_FOUND", message: `Todo list with id ${+req.params.id} not found`});
      })
      .catch(err => next(err));
  }

  static destroy(req, res, next)
  {
    let tempTask;
    console.log('masuk destroy');
    Task.findOne({where: {id: +req.params.id}})
      .then(data => {
        if (!data)
          return next({ errorCode: "NOT_FOUND", message: `Todo list with id ${+req.params.id} not found`});
        tempTask = data;
        return Task.destroy({where: {id: +req.params.id}})
      })
      .then(data => {
        return res.status(200).json(tempTask);
      })
      .catch(err => next(err));
  }
}

module.exports = TaskController;
