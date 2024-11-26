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
        const result = await User.findOne({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })
        console.log(result)
        if (!result) {
            return res
                .status(401)
                .json({
                    error: 'User not found'
                })
        }
        next()
    }
}

const createUser = () => {
    return async (req, res, next) => {
        const newUser = new User()
        newUser.email = req.body.email
        newUser.username = req.body.username
        newUser.password = bcrypt.hashSync(req.body.password, salt)
        newUser.save()

        res.locals.userId = newUser._id

        if (!res.locals.userId) {
            return res
                .status(500)
                .json({
                    error: "Error saving data"
                })
        }
        next()
    }
}

module.exports = { checkAuth, hasUser, createUser }