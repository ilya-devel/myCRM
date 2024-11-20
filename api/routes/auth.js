const express = require('express')

const router = express.Router()


router.get('/logout', (req, res) => {
    res.json({
        "message": "You log out"
    })
})

router.get('/login', (req, res) => {
    res.json({
        "message": "You log in"
    })
})

router.get('/signin', (req, res) => {
    res.json({
        "message": "You sign in"
    })
})


module.exports = router