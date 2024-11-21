const express = require('express')
const cookieParser = require('cookie-parser')

const router = express.Router()


router.get('/logout', (req, res) => {
    let username = req.cookies.username ? req.cookies.username : "anonym"

    res.cookie('username', '', {
        expires: new Date(Date.now() - 1000),
        httpOnly: true
    })
    res.cookie('session_id', '', {
        expires: new Date(Date.now() - 1000),
        httpOnly: true
    })

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


module.exports = router