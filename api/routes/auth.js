const express = require('express')
const { checkLogin, checkAuth, hasUser, createUser } = require('../validations/authValid')
const { loginScheme, signInScheme } = require('../schemes/authSchemes')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()
router.use(express.json());

router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            username: req.session.userInfo ? req.session.userInfo.username : 'Гость',
            isAuth: req.session.isAuth
        })
})


router.get('/logout', (req, res) => {
    let username = req.session.userInfo ? req.session.userInfo.username : "Гость"
    req.session.isAuth = false
    req.session.userInfo = null
    res
        .status(200)
        .json({
            message: `До свидания ${username}`,
            form: "Вы вышли из системы"
        })
})

router.get('/login', (req, res) => {
    res
        .status(200)
        .json({
            "message": "Вам нужно ввести указанные ниже данные",
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
            message: `Добро пожаловать ${req.session.userInfo.username}`,
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
            "message": "Вам нужно ввести указанные ниже данные",
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
                message: "Пользователь создан",
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