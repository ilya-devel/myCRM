const User = require("../models/User")
const bcrypt = require('bcryptjs');

const salt = process.env.SECRET_KEY

const checkAuth = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body)
        if (validationResult.error) {
            return res
                .status(406)
                .json({
                    error: validationResult.error.details
                })
        }
        next()
    }
}

const hasUser = () => {
    return async (req, res, next) => {
        console.log(req.body)
        const result = await User.findOne({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })
        req.session.userInfo = {
            ...req.session.userInfo,
            username: result.username
        }
        if (!result) {
            return res
                .status(401)
                .json({
                    error: 'Пользователь не найден'
                })
        }
        next()
    }
}

const createUser = () => {
    return async (req, res, next) => {
        const tmpUser = await User.findOne({ email: req.body.email })
        if (!tmpUser) {
            const newUser = new User()
            newUser.email = req.body.email
            newUser.username = req.body.username
            newUser.password = bcrypt.hashSync(req.body.password, salt)
            newUser.save()

            req.session.userInfo = {
                ...req.session.userInfo,
                username: newUser.username,
                user_id: newUser._id
            }
        } else {
            return res
            .status(400)
            .json({
                error: 'Пользователь с такой почтой уже существует'
            })
        }

        if (!req.session.userInfo.user_id) {
            return res
                .status(500)
                .json({
                    error: "Ошибка сохранения данных"
                })
        }
        next()
    }
}

module.exports = { checkAuth, hasUser, createUser }