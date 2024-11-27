const express = require('express')
const { checkLogin, checkAuth, hasUser, createUser } = require('../validations/authValid')
const { loginScheme, signInScheme } = require('../schemes/authSchemes')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()
router.use(express.json());


router.get('/logout', (req, res) => {
    let username = req.session.userInfo ? req.session.userInfo.username : "anonym"
    req.session.isAuth = false
    req.session.userInfo = null
    res
        .status(200)
        .json({
            message: `Goodbye ${username}`,
            form: "You log out"
        })
})

router.get('/login', (req, res) => {
    res
        .status(200)
        .json({
            "message": "You need to send next data",
            "form": {
                "email": "email@example.com",
                "password": "some password"
            }
        })
})

router.post('/login', checkAuth(loginScheme), hasUser(), (req, res) => {
    try {
        req.session.isAuth = true
        res.status(202).json({
            message: `Welcome ${req.session.userInfo.username}`,
        })
    } catch (error) {
        res
            .status(500)
            .json({
                error: error.msg
            })
    }
})

router.get('/signin', (req, res) => {
    res
        .status(200)
        .json({
            "message": "You need to send next data",
            "form": {
                "username": "some name",
                "email": "email@example.com",
                "password": "some password",
                "confirmPassword": "confirm password"
            }
        })
})

router.post('/signin', checkAuth(signInScheme), createUser(), (req, res) => {
    try {
        res
            .status(201)
            .json({
                message: "User created",
                id: req.session.userInfo.user_id,
                username: req.session.userInfo.username
            })
    } catch (error) {
        res
            .status(500)
            .json({
                error: error.msg
            })
    }
})


module.exports = router