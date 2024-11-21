const express = require('express')
const cookieParser = require('cookie-parser')

const auth = require('./routes/auth')

let app = express()
app.use(cookieParser())

const PORT = 10666



app.get('/', function (req, res) {
    res
    .status(200)
    .cookie('username', 'Ilya', {
        expires: new Date(Date.now() + 90000),
        httpOnly: true,
    },
    )
    .send("<h1>Hello Test</h1>")
})

app.use('/auth', auth)

app.listen(PORT)