const { Kanban, User } = require('../models')

class KanbanController {

  static show(req, res, next) {
    console.log('masuk findall');
    Kanban.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['email'] }]
    })
      .then((result) => {
        console.log(result);
        return res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }
  static findOne(req, res, next) {
    const id = req.params.id
    Kanban.findByPk(id)
      .then(kanban => {
        res.status(200).json(kanban)
      })
      .catch(err => {
        next(err)
      })
  }
  static add(req, res, next) {
    let UserId = req.UserId
    let tag = ''
    let { title, description } = req.body
    let newdata = {
      title,
      description,
      tag,
      UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    Kanban.create(newdata)
      .then(result => {
        return res.status(201).json({ result })

      })
      .catch(err => {
        next({
          "name": "InternalServer",
          errors: [{ msg: 'Internal Server Error' }]
        })
      })
  }
  static update(req, res, next) {

    let id = +req.params.id
    let { title, description } = req.body
    let updatedData = {
      title,
      description
    }
    console.log(updatedData);
    Kanban.findOne({ where: { id: id } })
      .then(data => {
        if (!data) next({
          "name": "NotFound",
          errors: [{ msg: 'Data not Found' }]
        })
        else {
          data.update(updatedData)
            .then(result => {
              console.log(result, 'ini result');
              return res.status(200).json(result)
            })
        }
      })
      .catch(err => {
        next({
          "name": "InternalServer",
          errors: [{ msg: 'Internal Server Error' }]
        })
      })
  }
  static move(req, res, next) {
    
    let id = +req.params.id
    let { tag } = req.body
    let updatedData = {
      tag
    }

    Kanban.findOne({ where: { id: id } })
      .then(data => {
        if (!data) next({
          "name": "NotFound",
          errors: [{ msg: 'Data not Found' }]
        })
        else {
          data.update(updatedData, { where: { id: data.id } })
            .then(result => {
              console.log('aad');
              return res.status(200).json({ result })
            })
        }
      })
      .catch(err => {
        next({
          "name": "InternalServer",
          errors: [{ msg: 'Internal Server Error' }]
        })
      })
  }
  static delete(req, res, next) {
    let id = req.params.id
    Kanban.destroy({ where: { id: id } })
      .then((result) => {
        return res.status(201).json({ msg: 'Success Delete' })
      })
      .catch((err) => {
        next({ name: 'NotFound', errors: [{ msg: 'Data not Found' }] })
      })
  }
}

module.exports = KanbanController