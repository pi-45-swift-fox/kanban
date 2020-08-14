const { Kanban } = require('../models')

function authorization(req, res, next) {
    const id = req.params.id
    Kanban.findByPk(id)
        .then(result => {
            if (result) {
                if (result.UserId == req.UserId) {
                    return next()
                } else {
                    next({
                        name: 'Unauthorized'
                    })
                }
            } else {
                return res.status(404).json({
                    name: "NotFound",
                    errors: "User Not Found"
                })
            }
        })
        .catch(err => {
            console.log(err, 'masuk auth');
            return res.status(500).json({
                name: "InternalServer",
                errors: [{ message: "Error" }]
            })
        })

}

module.exports = authorization