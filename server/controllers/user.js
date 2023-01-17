const { User, Task } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

module.exports = class UserController {

    static async detail(req, res, next) {
        try {
            const data = await User.findOne({
                where: {
                    email: req.userLogin.email
                },
                include: [Task]
            })

            res.status(200).json(data.Tasks);
        } catch (error) {
            next({
                code: 404,
                type: 'login',
                body: error
            });
        }
    }

    static login(req, res, next) {
        let tmp;

        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if (data) {
                    tmp = data;
                    req.userLogin = data;

                    return bcrypt.compare(req.body.password, data.password);
                } else {
                    throw 'No email found';
                }
            })
            .then(chck => {
                if (chck) {
                    const token = jwt.sign({
                        id: tmp.id,
                        username: tmp.username,
                        email: tmp.email
                    }, process.env.JWT_SECRET);

                    res.status(200).json({ username: tmp.username, token: token });
                } else {
                    throw 'Wrong Password';
                }
            })
            .catch(err => {
                next({
                    code: 401,
                    type: 'login',
                    body: err
                });
            })
    }

    static async register(req, res, next) {
        try {
            const data = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }, chck = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (chck) {
                next({
                    code: 409,
                    type: 'register',
                });
            } else {
                await User.create(data);
                res.status(201).json({
                    msg: 'OK'
                });
            }
        } catch (error) {
            next({
                code: 400,
                type: 'register',
                body: error
            });
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const token = req.headers.token;
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
            const payload = ticket.getPayload();

            const result = await User.findOne({
                where: {
                    email: payload.email
                }
            });

            if (result) {
                const token = jwt.sign({
                    id: result.id,
                    username: result.username,
                    email: result.email
                }, process.env.JWT_SECRET);

                res.status(200).json({ username: result.username, token: token });
            } else {
                const newUser = await User.create({
                    username: payload.name,
                    email: payload.email,
                    password: "user created this way should be on different method"
                });

                const token = jwt.sign({
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                }, process.env.JWT_SECRET);

                res.status(200).json({ username: newUser.username, token: token });
            }
        } catch (error) {
            console.log(error);
        }
    }
}