const express = require('express')
const { checkLogin, checkAuth, hasUser, createUser } = require('../validations/authValid')
const { loginScheme, signInScheme } = require('../schemes/authSchemes')
const bcrypt = require('bcryptjs')

const router = express.Router()
router.use(express.json());


router.get('/logout', (req, res) => {
    let username = req.session.username ? req.session.username : "anonym"

    // res.cookie('username', '', {
    //     expires: new Date(Date.now() - 1000),
    //     httpOnly: true
    // })
    // res.cookie('session_id', '', {
    //     expires: new Date(Date.now() - 1000),
    //     httpOnly: true
    // })


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
        res.status(202).json({
            message: "All OK",
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
                id: res.locals.userId,
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